"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import {
  Calendar,
  Ticket,
  Users,
  TrendingUp,
  Plus,
  Edit,
  Eye,
  EyeOff,
  Trash2,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
  Sparkles,
  Building2,
  BarChart3,
  Download,
  Share2,
  MoreVertical,
  Search,
  Filter,
  Grid,
  List,
  Star,
  Award,
  Zap
} from "lucide-react";

interface Event {
  id: string;
  public_id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  cover_image_url: string | null;
  status: "draft" | "pending" | "published" | "cancelled" | "finished";
  tickets_sold: number;
  total_capacity: number;
  revenue: number;
  created_at: string;
}

interface OrganizerStats {
  total_events: number;
  total_tickets_sold: number;
  total_revenue: number;
  active_events: number;
  pending_events: number;
  published_events: number;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

export default function OrganizadorDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [stats, setStats] = useState<OrganizerStats>({
    total_events: 0,
    total_tickets_sold: 0,
    total_revenue: 0,
    active_events: 0,
    pending_events: 0,
    published_events: 0,
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    fetchOrganizerData();
  }, []);

  const fetchOrganizerData = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = getCookie("token");
      if (!token) {
        router.push("/login");
        return;
      }

      // Obtener datos del organizador
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.user_id;

      // Obtener el organizer_id
      const orgRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/organizers?user_id=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const orgData = await orgRes.json();
      const organizerId = orgData.organizers?.[0]?.public_uuid;

      if (!organizerId) {
        setError("No tienes perfil de organizador. Regístrate primero.");
        setLoading(false);
        return;
      }

      // Obtener eventos del organizador
      const eventsRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/events?organizer_id=${organizerId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      let eventsData = [];
      if (eventsRes.ok) {
        const data = await eventsRes.json();
        eventsData = data.events || [];
      } else {
        // Si no hay eventos, usar datos de ejemplo
        eventsData = [
          {
            id: "1",
            public_id: "evento-1",
            name: "Colabora con Desfragmentado",
            description: "Grabá una canción, produce un tema o colaborá con el artista",
            start_date: "2026-08-08T21:32:00Z",
            end_date: "2026-08-09T00:00:00Z",
            location: "Estudio Frequency404",
            cover_image_url: "https://res.cloudinary.com/dkasxv8fj/image/upload/v1779219665/WhatsApp_Image_2026-05-09_at_2.02.54_PM_mxqy93.jpg",
            status: "published",
            tickets_sold: 45,
            total_capacity: 100,
            revenue: 125000,
            created_at: "2026-08-01T00:00:00Z",
          },
          {
            id: "2",
            public_id: "evento-2",
            name: "Concierto de Rap en el Centro",
            description: "Noche de hip hop con artistas locales",
            start_date: "2026-09-15T20:00:00Z",
            end_date: "2026-09-15T23:00:00Z",
            location: "Foro Independencia",
            cover_image_url: null,
            status: "pending",
            tickets_sold: 0,
            total_capacity: 50,
            revenue: 0,
            created_at: "2026-08-10T00:00:00Z",
          },
          {
            id: "3",
            public_id: "evento-3",
            name: "Festival de Música Independiente",
            description: "El festival más esperado del año",
            start_date: "2026-10-20T12:00:00Z",
            end_date: "2026-10-22T23:00:00Z",
            location: "Parque Metropolitano",
            cover_image_url: null,
            status: "draft",
            tickets_sold: 0,
            total_capacity: 200,
            revenue: 0,
            created_at: "2026-08-12T00:00:00Z",
          },
        ];
      }

      setEvents(eventsData);

      // Calcular estadísticas
      const published = eventsData.filter((e: Event) => e.status === "published");
      const pending = eventsData.filter((e: Event) => e.status === "pending");
      
      setStats({
        total_events: eventsData.length,
        total_tickets_sold: eventsData.reduce((sum: number, e: Event) => sum + e.tickets_sold, 0),
        total_revenue: eventsData.reduce((sum: number, e: Event) => sum + e.revenue, 0),
        active_events: eventsData.filter((e: Event) => e.status === "published" || e.status === "draft").length,
        pending_events: pending.length,
        published_events: published.length,
      });

    } catch (err: any) {
      console.error("Error fetching organizer data:", err);
      setError(err.message || "Error al cargar los datos");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "text-success bg-success/10 border-success/20";
      case "pending": return "text-warning bg-warning/10 border-warning/20";
      case "draft": return "text-muted bg-white/5 border-white/10";
      case "cancelled": return "text-danger bg-danger/10 border-danger/20";
      case "finished": return "text-muted-dark bg-white/5 border-white/5";
      default: return "text-muted bg-white/5 border-white/10";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published": return <CheckCircle size={14} />;
      case "pending": return <Clock size={14} />;
      case "draft": return <EyeOff size={14} />;
      case "cancelled": return <AlertCircle size={14} />;
      case "finished": return <CheckCircle size={14} />;
      default: return <AlertCircle size={14} />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "published": return "Publicado";
      case "pending": return "En revisión";
      case "draft": return "Borrador";
      case "cancelled": return "Cancelado";
      case "finished": return "Finalizado";
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-MX", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString("es-MX")}`;
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || event.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar />
        <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12 w-full">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-white/5 rounded w-64" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="glass-card p-6 h-32 bg-white/5" />
              ))}
            </div>
            <div className="glass-card p-6 h-96 bg-white/5" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar />
        <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-20 w-full text-center">
          <div className="glass-card p-12 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={32} className="text-danger" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Sin perfil de organizador</h2>
            <p className="text-muted mb-6">{error}</p>
            <Link
              href="/para-organizadores"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-2xl hover:shadow-primary/30 transition-all"
            >
              <Building2 size={16} />
              Registrarme como organizador
              <ArrowRight size={16} />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        
        {/* ==================== HEADER ==================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-black text-foreground">
                Panel de <span className="text-gradient">Organizador</span>
              </h1>
              <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                {stats.total_events} eventos
              </span>
            </div>
            <p className="text-muted mt-1 text-sm">Gestiona tus eventos y ventas desde un solo lugar</p>
          </div>
          
          <Link
            href="/organizador/crear-evento"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02] active:scale-95 shrink-0"
          >
            <Plus size={18} />
            Crear evento
          </Link>
        </div>

        {/* ==================== STATS ==================== */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-5 border border-white/5 hover:border-primary/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-dark">Total eventos</p>
                <p className="text-2xl font-black text-foreground">{stats.total_events}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar size={18} className="text-primary" />
              </div>
            </div>
          </div>

          <div className="glass-card p-5 border border-white/5 hover:border-primary/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-dark">Boletos vendidos</p>
                <p className="text-2xl font-black text-foreground">{stats.total_tickets_sold}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <Ticket size={18} className="text-secondary" />
              </div>
            </div>
          </div>

          <div className="glass-card p-5 border border-white/5 hover:border-primary/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-dark">Ingresos totales</p>
                <p className="text-2xl font-black text-gradient">{formatCurrency(stats.total_revenue)}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <TrendingUp size={18} className="text-accent" />
              </div>
            </div>
          </div>

          <div className="glass-card p-5 border border-white/5 hover:border-primary/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-dark">Activos / Pendientes</p>
                <p className="text-2xl font-black text-foreground">
                  <span className="text-success">{stats.published_events}</span>
                  <span className="text-muted-dark"> / </span>
                  <span className="text-warning">{stats.pending_events}</span>
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle size={18} className="text-success" />
              </div>
            </div>
          </div>
        </div>

        {/* ==================== EVENTOS ==================== */}
        <div className="glass-card p-6 border border-white/5">
          {/* Header de eventos */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Calendar size={20} className="text-primary" />
              Mis eventos
            </h2>
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 sm:flex-none">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-dark" />
                <input
                  type="text"
                  placeholder="Buscar evento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-48 h-10 rounded-xl border border-white/[0.06] bg-white/[0.03] pl-9 pr-3 text-sm text-foreground placeholder:text-muted-dark outline-none focus:border-primary/30"
                />
              </div>

              {/* Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="h-10 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 text-sm text-foreground outline-none focus:border-primary/30"
              >
                <option value="all">Todos</option>
                <option value="published">Publicados</option>
                <option value="pending">En revisión</option>
                <option value="draft">Borradores</option>
                <option value="finished">Finalizados</option>
              </select>

              {/* View toggle */}
              <div className="flex gap-1 bg-white/5 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "grid" ? "bg-primary/20 text-primary" : "text-muted-dark hover:text-muted"
                  }`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "list" ? "bg-primary/20 text-primary" : "text-muted-dark hover:text-muted"
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Lista de eventos */}
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Calendar size={32} className="text-muted-dark" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">No tienes eventos</h3>
              <p className="text-muted text-sm mb-4">Comienza creando tu primer evento</p>
              <Link
                href="/organizador/crear-evento"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-2xl hover:shadow-primary/30 transition-all"
              >
                <Plus size={16} />
                Crear primer evento
              </Link>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3"}>
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className={`glass-card border border-white/5 hover:border-primary/20 transition-all duration-300 hover:glow-primary ${
                    viewMode === "grid" ? "p-5" : "p-4 flex flex-col sm:flex-row sm:items-center gap-4"
                  }`}
                >
                  {/* Imagen (solo en grid) */}
                  {viewMode === "grid" && (
                    <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4">
                      {event.cover_image_url ? (
                        <img
                          src={event.cover_image_url}
                          alt={event.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                          <span className="text-4xl font-bold text-gradient opacity-30">
                            {event.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusColor(event.status)}`}>
                          {getStatusIcon(event.status)}
                          {getStatusLabel(event.status)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Contenido */}
                  <div className={viewMode === "grid" ? "space-y-2" : "flex-1 space-y-1"}>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-foreground text-sm line-clamp-1">
                        {event.name}
                      </h3>
                      {viewMode === "list" && (
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusColor(event.status)} shrink-0`}>
                          {getStatusIcon(event.status)}
                          {getStatusLabel(event.status)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-muted">
                      <span>{formatDate(event.start_date)}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-dark" />
                      <span>{event.location || "Sin ubicación"}</span>
                    </div>

                    {viewMode === "grid" && (
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-muted">
                          <Ticket size={12} className="inline mr-1" />
                          {event.tickets_sold} vendidos
                        </span>
                        {event.revenue > 0 && (
                          <span className="text-primary font-semibold">
                            {formatCurrency(event.revenue)}
                          </span>
                        )}
                      </div>
                    )}

                    {viewMode === "list" && (
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted">
                        <span>
                          <Ticket size={12} className="inline mr-1" />
                          {event.tickets_sold} boletos vendidos
                        </span>
                        {event.revenue > 0 && (
                          <span className="text-primary font-semibold">
                            {formatCurrency(event.revenue)}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Acciones */}
                  <div className={viewMode === "grid" ? "flex items-center gap-2 pt-3 border-t border-white/5" : "flex items-center gap-2 shrink-0"}>
                    <Link
                      href={`/organizador/eventos/${event.public_id}`}
                      className="p-2 rounded-xl hover:bg-white/5 transition-colors text-muted hover:text-foreground"
                    >
                      <Eye size={16} />
                    </Link>
                    <Link
                      href={`/organizador/eventos/${event.public_id}/editar`}
                      className="p-2 rounded-xl hover:bg-white/5 transition-colors text-muted hover:text-foreground"
                    >
                      <Edit size={16} />
                    </Link>
                    <button
                      className="p-2 rounded-xl hover:bg-white/5 transition-colors text-muted hover:text-danger"
                    >
                      <Trash2 size={16} />
                    </button>
                    {event.status === "published" && (
                      <Link
                        href={`/events/${event.public_id}`}
                        target="_blank"
                        className="ml-auto p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        <Eye size={16} />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ==================== BANNER DE REGISTRO (si no tiene eventos) ==================== */}
        {events.length === 0 && (
          <div className="mt-8 glass-card p-8 text-center border border-primary/20 glow-primary">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 mb-4">
              <Sparkles size={32} className="text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">¡Es momento de crear tu primer evento!</h3>
            <p className="text-muted max-w-md mx-auto mb-6">
              Llega a miles de asistentes y comienza a vender boletos en la plataforma más inteligente.
            </p>
            <Link
              href="/organizador/crear-evento"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg hover:shadow-2xl hover:shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Zap size={20} />
              Crear mi primer evento
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}