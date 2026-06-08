"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navigation/Navbar";
import { Ticket, Calendar, MapPin, Users, DollarSign, Plus, BarChart3 } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8083";

interface OrganizerEvent {
  public_id: string;
  name: string;
  venue_name: string;
  starts_at: string;
  status: string;
  image_url: string;
  tickets_sold: number;
  total_tickets: number;
}

export default function OrganizadorDashboardPage() {
  const router = useRouter();
  const [events, setEvents] = useState<OrganizerEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalEvents: 0, totalSold: 0, totalRevenue: 0 });
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    checkApproval();
  }, []);

  const checkApproval = async () => {
    const token = getCookie("token");
    if (!token) { router.push("/login"); return; }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.user_id;
      const res = await fetch(`${API}/v1/organizers?user_id=${userId}`);
      const data = await res.json();
      const org = data.organizers?.[0];
      if (!org || org.approval_status !== "approved") {
        alert("No eres organizador aprobado.");
        router.push("/dashboard");
        return;
      }
      setIsApproved(true);
      fetchOrganizerEvents();
    } catch (err) {
      router.push("/dashboard");
    }
  };

  const fetchOrganizerEvents = async () => {
    try {
      const token = getCookie("token");
      if (!token) { router.push("/login"); return; }
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.user_id;

      const orgRes = await fetch(`${API}/v1/organizers?user_id=${userId}`);
      const orgData = await orgRes.json();
      const organizerId = orgData.organizers?.[0]?.public_uuid;
      if (!organizerId) { setLoading(false); return; }

      const res = await fetch(`${API}/v1/events?organizer_id=${organizerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        const eventList = data.events || [];
        setEvents(eventList);
        const total = eventList.length;
        const sold = eventList.reduce((sum: number, e: OrganizerEvent) => sum + (e.tickets_sold || 0), 0);
        setStats({ totalEvents: total, totalSold: sold, totalRevenue: 0 });
      }
    } catch (err) {
      console.error("Error fetching organizer events:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/");
  };

  if (!isApproved) return null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Panel de Organizador</h1>
            <p className="text-muted mt-1">Gestiona tus eventos y ventas</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => router.push("/organizador/crear-evento")} className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2">
              <Plus size={16} /> Crear evento
            </button>
            <button onClick={handleLogout} className="rounded-full bg-white/10 px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-white/20 transition-all">
              Cerrar sesion
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="glass-card p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center"><Calendar size={24} className="text-primary" /></div>
            <div><p className="text-2xl font-black">{stats.totalEvents}</p><p className="text-xs text-muted-dark">Eventos publicados</p></div>
          </div>
          <div className="glass-card p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-success/10 flex items-center justify-center"><Ticket size={24} className="text-success" /></div>
            <div><p className="text-2xl font-black">{stats.totalSold}</p><p className="text-xs text-muted-dark">Boletos vendidos</p></div>
          </div>
          <div className="glass-card p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center"><DollarSign size={24} className="text-accent" /></div>
            <div><p className="text-2xl font-black">$0</p><p className="text-xs text-muted-dark">Ingresos</p></div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Mis Eventos</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[1, 2, 3].map((i) => (<div key={i} className="glass-card h-48 animate-pulse" />))}</div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.public_id} className="glass-card p-6 space-y-4 hover:glow-primary transition-all cursor-pointer" onClick={() => router.push(`/events/${event.public_id}`)}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${event.status === "published" || event.status === "live" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"}`}>
                    {event.status === "published" || event.status === "live" ? "Activo" : event.status}
                  </span>
                  <BarChart3 size={16} className="text-muted-dark" />
                </div>
                <h3 className="text-lg font-bold">{event.name}</h3>
                <div className="space-y-2 text-sm text-muted">
                  <div className="flex items-center gap-2"><Calendar size={14} className="text-secondary" /><span>{new Date(event.starts_at).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}</span></div>
                  <div className="flex items-center gap-2"><MapPin size={14} className="text-secondary" /><span>{event.venue_name || "Ubicacion por confirmar"}</span></div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs text-muted-dark"><Users size={14} /><span>{event.tickets_sold || 0} / {event.total_tickets || 0} vendidos</span></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center">
            <Plus size={48} className="mx-auto mb-4 text-muted-dark" />
            <h2 className="text-xl font-bold mb-2">No tienes eventos aun</h2>
            <p className="text-muted mb-6">Crea tu primer evento y empieza a vender boletos</p>
            <button onClick={() => router.push("/organizador/crear-evento")} className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all">Crear evento</button>
          </div>
        )}
      </main>
    </div>
  );
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}