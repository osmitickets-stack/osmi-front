"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import {
  Calendar,
  MapPin,
  Clock,
  Image as ImageIcon,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Info,
  Tag,
  Users,
  Globe,
  Lock,
  Eye,
  EyeOff,
  DollarSign,
  CalendarDays,
  FileText,
  Building2,
  ChevronDown,
  Edit,
  Save,
  Trash2,
  Share2,
  Ticket,
  BarChart3,
  Download,
  Printer,
  MessageCircle,
  Mail,
  Sparkles,
  Zap,
  Settings,
  MoreVertical,
  Copy,
  Link as LinkIcon,
  QrCode,
  Star,
  TrendingUp,
  Clock as ClockIcon,
  Check,
  X,
  Pencil,
  Upload,
  Plus
} from "lucide-react";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

interface Event {
  id: string;
  public_id: string;
  name: string;
  description: string;
  short_description: string;
  start_date: string;
  end_date: string;
  location: string;
  venue_name: string;
  city: string;
  state: string;
  country: string;
  cover_image_url: string | null;
  status: "draft" | "pending" | "published" | "cancelled" | "finished";
  tickets_sold: number;
  total_capacity: number;
  revenue: number;
  is_free: boolean;
  is_featured: boolean;
  visibility: string;
  event_type: string;
  tags: string[];
  created_at: string;
  organizer_name: string;
}

export default function EventDetailPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "tickets" | "stats" | "settings">("info");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    short_description: "",
    venue_name: "",
    city: "",
    state: "",
    country: "MX",
    start_date: "",
    end_date: "",
    timezone: "America/Mexico_City",
    cover_image_url: "",
    event_type: "in_person",
    visibility: "public",
    is_featured: false,
    is_free: false,
    max_attendees: 0,
    age_restriction: 0,
    tags: "",
    status: "draft"
  });

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  const fetchEvent = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = getCookie("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/events/${eventId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) {
        throw new Error("Evento no encontrado");
      }

      const data = await res.json();
      
      const eventData: Event = {
        id: data.id || data.public_id,
        public_id: data.public_id || data.id,
        name: data.name || "",
        description: data.description || "",
        short_description: data.short_description || "",
        start_date: data.start_date || "",
        end_date: data.end_date || "",
        location: data.location || data.venue_name || "",
        venue_name: data.venue_name || "",
        city: data.city || "",
        state: data.state || "",
        country: data.country || "MX",
        cover_image_url: data.cover_image_url || null,
        status: data.status || "draft",
        tickets_sold: data.tickets_sold || 0,
        total_capacity: data.max_attendees || 0,
        revenue: data.revenue || 0,
        is_free: data.is_free || false,
        is_featured: data.is_featured || false,
        visibility: data.visibility || "public",
        event_type: data.event_type || "in_person",
        tags: data.tags || [],
        created_at: data.created_at || "",
        organizer_name: data.organizer_name || ""
      };

      setEvent(eventData);

      // Cargar datos al formulario
      setFormData({
        name: eventData.name,
        description: eventData.description,
        short_description: eventData.short_description,
        venue_name: eventData.venue_name,
        city: eventData.city,
        state: eventData.state,
        country: eventData.country,
        start_date: eventData.start_date ? new Date(eventData.start_date).toISOString().slice(0, 16) : "",
        end_date: eventData.end_date ? new Date(eventData.end_date).toISOString().slice(0, 16) : "",
        timezone: "America/Mexico_City",
        cover_image_url: eventData.cover_image_url || "",
        event_type: eventData.event_type,
        visibility: eventData.visibility,
        is_featured: eventData.is_featured,
        is_free: eventData.is_free,
        max_attendees: eventData.total_capacity,
        age_restriction: 0,
        tags: eventData.tags?.join(", ") || "",
        status: eventData.status
      });

    } catch (err: any) {
      setError(err.message || "Error al cargar el evento");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const token = getCookie("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/events/${eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            description: formData.description,
            short_description: formData.short_description,
            venue_name: formData.venue_name,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            start_date: new Date(formData.start_date).toISOString(),
            end_date: new Date(formData.end_date).toISOString(),
            timezone: formData.timezone,
            cover_image_url: formData.cover_image_url || null,
            event_type: formData.event_type,
            visibility: formData.visibility,
            is_featured: formData.is_featured,
            is_free: formData.is_free,
            max_attendees: parseInt(String(formData.max_attendees)) || 0,
            age_restriction: parseInt(String(formData.age_restriction)) || 0,
            tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
            status: formData.status
          }),
        }
      );

      if (res.ok) {
        setSuccess("Evento actualizado exitosamente");
        setIsEditing(false);
        fetchEvent(); // Recargar datos
      } else {
        const err = await res.json();
        setError(err.message || "Error al actualizar el evento");
      }
    } catch (err: any) {
      setError(err.message || "Error de conexión");
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    setSaving(true);
    try {
      const token = getCookie("token");
      if (!token) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/events/${eventId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (res.ok) {
        setSuccess(`Evento ${newStatus === "published" ? "publicado" : "actualizado"}`);
        fetchEvent();
      } else {
        const err = await res.json();
        setError(err.message || "Error al cambiar el estado");
      }
    } catch (err: any) {
      setError(err.message || "Error de conexión");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de que quieres eliminar este evento?")) return;

    try {
      const token = getCookie("token");
      if (!token) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/events/${eventId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        router.push("/organizador");
      } else {
        const err = await res.json();
        setError(err.message || "Error al eliminar el evento");
      }
    } catch (err: any) {
      setError(err.message || "Error de conexión");
    }
  };

  const copyLink = () => {
    const url = `${window.location.origin}/events/${event?.public_id}`;
    navigator.clipboard.writeText(url);
    setSuccess("Enlace copiado al portapapeles");
    setTimeout(() => setSuccess(null), 3000);
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
      case "pending": return <ClockIcon size={14} />;
      case "draft": return <EyeOff size={14} />;
      case "cancelled": return <X size={14} />;
      case "finished": return <Check size={14} />;
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
    if (!dateString) return "Fecha no definida";
    return new Date(dateString).toLocaleDateString("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString("es-MX")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar />
        <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-12 w-full">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-white/5 rounded w-48" />
            <div className="glass-card p-8 h-96 bg-white/5" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar />
        <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-20 w-full text-center">
          <div className="glass-card p-12">
            <div className="w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={32} className="text-danger" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Evento no encontrado</h2>
            <p className="text-muted mb-6">{error || "El evento que buscas no existe"}</p>
            <Link
              href="/organizador"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-2xl hover:shadow-primary/30 transition-all"
            >
              <ArrowLeft size={16} />
              Volver al dashboard
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
      
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        
        {/* ==================== HEADER ==================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <Link
              href="/organizador"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-2"
            >
              <ArrowLeft size={16} />
              Volver al dashboard
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black text-foreground truncate max-w-sm sm:max-w-md">
                {event.name}
              </h1>
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border shrink-0 ${getStatusColor(event.status)}`}>
                {getStatusIcon(event.status)}
                {getStatusLabel(event.status)}
              </span>
            </div>
            <p className="text-muted text-sm mt-1">
              Creado el {new Date(event.created_at).toLocaleDateString("es-MX")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {!isEditing && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-all border border-primary/20"
                >
                  <Edit size={16} />
                  Editar
                </button>
                {event.status !== "published" && event.status !== "finished" && (
                  <button
                    onClick={() => handleStatusChange("published")}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-success/10 text-success font-semibold hover:bg-success/20 transition-all border border-success/20"
                  >
                    <Check size={16} />
                    Publicar
                  </button>
                )}
                {event.status === "published" && (
                  <button
                    onClick={() => handleStatusChange("draft")}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-warning/10 text-warning font-semibold hover:bg-warning/20 transition-all border border-warning/20"
                  >
                    <EyeOff size={16} />
                    Ocultar
                  </button>
                )}
                <Link
                  href={`/events/${event.public_id}`}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/5 text-muted font-semibold hover:bg-white/10 transition-all border border-white/10"
                >
                  <Eye size={16} />
                  Ver público
                </Link>
              </>
            )}
          </div>
        </div>

        {/* ==================== ERROR / SUCCESS ==================== */}
        {error && (
          <div className="flex items-start gap-3 bg-danger/10 border border-danger/20 rounded-2xl px-4 py-3 mb-6 animate-fade-in">
            <AlertCircle size={18} className="text-danger flex-shrink-0 mt-0.5" />
            <p className="text-sm text-danger">{error}</p>
          </div>
        )}
        {success && (
          <div className="flex items-start gap-3 bg-success/10 border border-success/20 rounded-2xl px-4 py-3 mb-6 animate-fade-in">
            <CheckCircle size={18} className="text-success flex-shrink-0 mt-0.5" />
            <p className="text-sm text-success">{success}</p>
          </div>
        )}

        {/* ==================== STATS RÁPIDAS ==================== */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="glass-card p-4 border border-white/5">
            <p className="text-xs text-muted-dark">Boletos vendidos</p>
            <p className="text-xl font-black text-foreground">{event.tickets_sold}</p>
          </div>
          <div className="glass-card p-4 border border-white/5">
            <p className="text-xs text-muted-dark">Capacidad total</p>
            <p className="text-xl font-black text-foreground">{event.total_capacity || "∞"}</p>
          </div>
          <div className="glass-card p-4 border border-white/5">
            <p className="text-xs text-muted-dark">Ingresos</p>
            <p className="text-xl font-black text-gradient">{formatCurrency(event.revenue)}</p>
          </div>
          <div className="glass-card p-4 border border-white/5">
            <p className="text-xs text-muted-dark">Estado</p>
            <p className={`text-xl font-black ${event.status === "published" ? "text-success" : "text-warning"}`}>
              {getStatusLabel(event.status)}
            </p>
          </div>
        </div>

        {/* ==================== CONTENIDO PRINCIPAL ==================== */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* ==================== TABS ==================== */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6 border border-white/5">
              {/* Tabs */}
              <div className="flex gap-1 border-b border-white/5 pb-4 mb-6">
                {[
                  { id: "info", label: "Información", icon: Info },
                  { id: "tickets", label: "Boletos", icon: Ticket },
                  { id: "stats", label: "Estadísticas", icon: BarChart3 },
                  { id: "settings", label: "Configuración", icon: Settings },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    <tab.icon size={16} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* ==================== TAB: INFO ==================== */}
              {activeTab === "info" && (
                <div className="space-y-6">
                  {isEditing ? (
                    // Modo edición
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                          Nombre del evento *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-foreground outline-none focus:border-primary/30"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                          Descripción corta
                        </label>
                        <input
                          type="text"
                          name="short_description"
                          value={formData.short_description}
                          onChange={handleChange}
                          className="w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-foreground outline-none focus:border-primary/30"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                          Descripción completa
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows={5}
                          className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none focus:border-primary/30 resize-none"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                            Lugar
                          </label>
                          <input
                            type="text"
                            name="venue_name"
                            value={formData.venue_name}
                            onChange={handleChange}
                            className="w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-foreground outline-none focus:border-primary/30"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                            Ciudad
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-foreground outline-none focus:border-primary/30"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                            Fecha de inicio *
                          </label>
                          <input
                            type="datetime-local"
                            name="start_date"
                            value={formData.start_date}
                            onChange={handleChange}
                            className="w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-foreground outline-none focus:border-primary/30"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                            Fecha de fin *
                          </label>
                          <input
                            type="datetime-local"
                            name="end_date"
                            value={formData.end_date}
                            onChange={handleChange}
                            className="w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-foreground outline-none focus:border-primary/30"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                          URL de imagen (Cloudinary)
                        </label>
                        <input
                          type="url"
                          name="cover_image_url"
                          value={formData.cover_image_url}
                          onChange={handleChange}
                          placeholder="https://res.cloudinary.com/..."
                          className="w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-foreground outline-none focus:border-primary/30"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                          Etiquetas (separadas por comas)
                        </label>
                        <input
                          type="text"
                          name="tags"
                          value={formData.tags}
                          onChange={handleChange}
                          placeholder="música, concierto, rock"
                          className="w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-foreground outline-none focus:border-primary/30"
                        />
                      </div>

                      <div className="flex gap-3 pt-4 border-t border-white/5">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-foreground font-semibold hover:bg-white/10 transition-all"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={handleSave}
                          disabled={saving}
                          className="flex-1 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-2xl hover:shadow-primary/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {saving ? (
                            <><span className="animate-spin">⏳</span> Guardando...</>
                          ) : (
                            <>
                              <Save size={16} />
                              Guardar cambios
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Modo vista
                    <div className="space-y-6">
                      {event.cover_image_url && (
                        <div className="relative w-full h-48 rounded-2xl overflow-hidden">
                          <img
                            src={event.cover_image_url}
                            alt={event.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div>
                        <h3 className="text-sm font-semibold text-muted-dark">Descripción corta</h3>
                        <p className="text-foreground mt-1">{event.short_description || "Sin descripción corta"}</p>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-muted-dark">Descripción completa</h3>
                        <p className="text-foreground mt-1 whitespace-pre-wrap">{event.description || "Sin descripción"}</p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-semibold text-muted-dark">Ubicación</h3>
                          <p className="text-foreground mt-1">{event.venue_name || "No especificada"}</p>
                          <p className="text-muted text-sm">{event.city}, {event.state}, {event.country}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-muted-dark">Fechas</h3>
                          <p className="text-foreground mt-1">Inicio: {formatDate(event.start_date)}</p>
                          <p className="text-muted text-sm">Fin: {formatDate(event.end_date)}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-muted-dark">Etiquetas</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {event.tags && event.tags.length > 0 ? (
                            event.tags.map((tag) => (
                              <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-xs text-muted border border-white/10">
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className="text-muted text-sm">Sin etiquetas</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ==================== TAB: TICKETS ==================== */}
              {activeTab === "tickets" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-foreground">Tipos de boletos</h3>
                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-all border border-primary/20">
                      <Plus size={16} />
                      Agregar boleto
                    </button>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-6 text-center border border-white/5">
                    <Ticket size={48} className="mx-auto text-muted-dark mb-3" />
                    <h4 className="text-foreground font-semibold">Sin boletos configurados</h4>
                    <p className="text-sm text-muted">Agrega tipos de boletos para empezar a vender</p>
                  </div>

                  <div className="bg-warning/5 border border-warning/20 rounded-2xl p-4 flex items-start gap-3">
                    <Info size={18} className="text-warning flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-warning font-semibold">Próximamente</p>
                      <p className="text-xs text-muted">
                        La gestión de boletos estará disponible en la siguiente actualización.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== TAB: STATS ==================== */}
              {activeTab === "stats" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-foreground">Estadísticas del evento</h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <p className="text-xs text-muted-dark">Boletos vendidos</p>
                      <p className="text-3xl font-black text-foreground">{event.tickets_sold}</p>
                      <p className="text-xs text-muted">
                        de {event.total_capacity || "∞"} disponibles
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <p className="text-xs text-muted-dark">Ingresos totales</p>
                      <p className="text-3xl font-black text-gradient">{formatCurrency(event.revenue)}</p>
                      <p className="text-xs text-muted">En ventas de boletos</p>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <p className="text-xs text-muted-dark">Conversión</p>
                      <p className="text-3xl font-black text-foreground">
                        {event.total_capacity > 0 
                          ? Math.round((event.tickets_sold / event.total_capacity) * 100) 
                          : 0}%
                      </p>
                      <p className="text-xs text-muted">De capacidad total</p>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <p className="text-xs text-muted-dark">Status</p>
                      <p className="text-3xl font-black text-success">{getStatusLabel(event.status)}</p>
                      <p className="text-xs text-muted">Estado actual</p>
                    </div>
                  </div>

                  <div className="bg-warning/5 border border-warning/20 rounded-2xl p-4 flex items-start gap-3">
                    <Info size={18} className="text-warning flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-warning font-semibold">Estadísticas detalladas próximamente</p>
                      <p className="text-xs text-muted">
                        Gráficos y análisis avanzados estarán disponibles pronto.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== TAB: SETTINGS ==================== */}
              {activeTab === "settings" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-foreground">Configuración del evento</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div>
                        <p className="font-semibold text-foreground">Visibilidad</p>
                        <p className="text-sm text-muted">¿Quién puede ver este evento?</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 capitalize">
                        {event.visibility}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div>
                        <p className="font-semibold text-foreground">Tipo de evento</p>
                        <p className="text-sm text-muted">Modalidad del evento</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold border border-secondary/20 capitalize">
                        {event.event_type === "in_person" ? "Presencial" : 
                         event.event_type === "online" ? "En línea" : "Híbrido"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div>
                        <p className="font-semibold text-foreground">Gratuito</p>
                        <p className="text-sm text-muted">Evento sin costo para los asistentes</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        event.is_free 
                          ? "bg-success/10 text-success border-success/20" 
                          : "bg-white/5 text-muted border-white/10"
                      }`}>
                        {event.is_free ? "Sí" : "No"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div>
                        <p className="font-semibold text-foreground">Destacado</p>
                        <p className="text-sm text-muted">Evento destacado en la plataforma</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        event.is_featured 
                          ? "bg-primary/10 text-primary border-primary/20" 
                          : "bg-white/5 text-muted border-white/10"
                      }`}>
                        {event.is_featured ? "Sí" : "No"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div>
                        <p className="font-semibold text-foreground">Capacidad máxima</p>
                        <p className="text-sm text-muted">Límite de asistentes</p>
                      </div>
                      <span className="font-bold text-foreground">
                        {event.total_capacity || "Sin límite"}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-6 space-y-3">
                    <button
                      onClick={copyLink}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5"
                    >
                      <LinkIcon size={18} className="text-muted" />
                      <span className="flex-1 text-left text-sm text-foreground">Copiar enlace público</span>
                      <Copy size={16} className="text-muted" />
                    </button>

                    <Link
                      href={`/events/${event.public_id}`}
                      target="_blank"
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5"
                    >
                      <Eye size={18} className="text-muted" />
                      <span className="flex-1 text-left text-sm text-foreground">Ver evento en la plataforma</span>
                      <ArrowRight size={16} className="text-muted" />
                    </Link>

                    <button
                      onClick={handleDelete}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-danger/5 hover:bg-danger/10 transition-all border border-danger/20 text-danger"
                    >
                      <Trash2 size={18} />
                      <span className="flex-1 text-left text-sm font-semibold">Eliminar evento</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ==================== SIDEBAR ==================== */}
          <div className="lg:col-span-1 space-y-4">
            {/* Acciones rápidas */}
            <div className="glass-card p-5 border border-white/5">
              <h4 className="text-sm font-semibold text-muted-dark mb-3">Acciones rápidas</h4>
              <div className="space-y-2">
                <Link
                  href={`/events/${event.public_id}`}
                  target="_blank"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-sm"
                >
                  <Eye size={16} className="text-primary" />
                  <span>Ver página pública</span>
                </Link>
                <button
                  onClick={copyLink}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-sm w-full"
                >
                  <LinkIcon size={16} className="text-secondary" />
                  <span>Copiar enlace</span>
                </button>
                <button
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-sm w-full"
                >
                  <Share2 size={16} className="text-accent" />
                  <span>Compartir evento</span>
                </button>
                <button
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-sm w-full"
                >
                  <Download size={16} className="text-warning" />
                  <span>Descargar reporte</span>
                </button>
              </div>
            </div>

            {/* QR Code (placeholder) */}
            <div className="glass-card p-5 border border-white/5 text-center">
              <div className="w-32 h-32 mx-auto bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center mb-3">
                <QrCode size={48} className="text-muted-dark" />
              </div>
              <p className="text-xs text-muted-dark">QR para acceso al evento</p>
              <p className="text-[10px] text-muted-dark/60">Próximamente</p>
            </div>

            {/* Soporte */}
            <div className="glass-card p-5 border border-white/5">
              <h4 className="text-sm font-semibold text-muted-dark mb-3">¿Necesitas ayuda?</h4>
              <div className="space-y-2 text-sm">
                <a
                  href="mailto:soporte@osmi.app"
                  className="flex items-center gap-2 text-muted hover:text-foreground transition-colors"
                >
                  <Mail size={16} />
                  soporte@osmi.app
                </a>
                <a
                  href="https://wa.me/523345998987"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted hover:text-foreground transition-colors"
                >
                  <MessageCircle size={16} className="text-[#25D366]" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}