"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navigation/Navbar";
import { Ticket, Calendar, MapPin } from "lucide-react";

interface UserTicket {
  ticket_id: string;
  code: string;
  status: string;
  event_name: string;
  event_location: string;
  start_date: string;
  price: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState<UserTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchUserTickets();
    checkAdminStatus();
  }, []);

  const checkAdminStatus = () => {
    const token = getCookie("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setIsAdmin(payload.is_staff === true || payload.is_superuser === true);
      } catch {}
    }
  };

  const handleConvertToOrganizer = async () => {
    try {
      const token = getCookie("token");
      if (!token) return;
      
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.user_id;

      const checkRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/organizers?user_id=${userId}`);
      const checkData = await checkRes.json();
      
      if (checkData.organizers?.length > 0) {
        const org = checkData.organizers[0];
        if (org.approval_status === "approved") {
          alert("Ya eres organizador aprobado.");
          router.push("/organizador");
        } else if (org.approval_status === "pending") {
          alert("Tu solicitud esta en revision. Te notificaremos cuando sea aprobada.");
        } else {
          alert("Tu solicitud fue rechazada. Contacta a soporte.");
        }
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/organizers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: "Nuevo Organizador",
          contact_email: payload.email,
          user_id: userId,
          approval_status: "pending",
        }),
      });

      if (res.ok) {
        alert("Solicitud enviada. Un administrador la revisara pronto.");
      } else {
        alert("Error al enviar la solicitud.");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const fetchUserTickets = async () => {
    try {
      const token = getCookie("token");
      const res = await fetch("http://localhost:8083/v1/tickets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        const allTickets = Array.isArray(data) ? data : data.tickets || [];
        const filtered = allTickets.filter(
          (t: UserTicket) => t.status === "sold" || t.status === "checked_in" || t.status === "used"
        );
        setTickets(filtered);
      }
    } catch (err) {
      console.error("Error fetching tickets:", err);
    } finally {
      setLoading(false);
    }
  };

const formatDate = (dateStr: string): string => {
  if (!dateStr) return "Fecha por confirmar";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Fecha por confirmar";
    return date.toLocaleDateString("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "Fecha por confirmar";
  }
};

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Mis Boletos</h1>
            <p className="text-muted mt-1">Gestiona tus experiencias</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/organizador")}
              className="rounded-full bg-primary/10 px-6 py-2.5 text-sm font-semibold text-primary hover:bg-primary/20 transition-all border border-primary/20"
            >
              Panel Organizador
            </button>
            {isAdmin && (
              <button
                onClick={() => router.push("/admin")}
                className="rounded-full bg-accent/10 px-6 py-2.5 text-sm font-semibold text-accent hover:bg-accent/20 transition-all border border-accent/20"
              >
                Panel Admin
             </button>
           )}
           <button
              onClick={handleLogout}
              className="rounded-full bg-white/10 px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-white/20 transition-all"
            >
              Cerrar sesion
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (<div key={i} className="glass-card h-48 animate-pulse" />))}
          </div>
        ) : tickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <div key={ticket.ticket_id} className="glass-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    ticket.status === "sold" ? "bg-success/20 text-success" :
                    ticket.status === "checked_in" || ticket.status === "used" ? "bg-muted-dark/20 text-muted-dark" : "bg-primary/20 text-primary"
                  }`}>
                    {ticket.status === "sold" ? "Activo" : ticket.status === "checked_in" || ticket.status === "used" ? "Usado" : ticket.status}
                  </span>
                  <Ticket size={16} className="text-secondary" />
                </div>
                <h3 className="text-lg font-bold">{ticket.event_name || "Evento"}</h3>
                <div className="space-y-2 text-sm text-muted">
                  <div className="flex items-center gap-2"><Calendar size={14} className="text-secondary" /><span>{formatDate(ticket.start_date)}</span></div>
                  <div className="flex items-center gap-2"><MapPin size={14} className="text-secondary" /><span>{ticket.event_location || "Ubicación por confirmar"}</span></div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-xs text-muted-dark">Código: {ticket.code}</span>
                  <span className="text-sm font-bold text-primary">${ticket.price?.toLocaleString("es-MX") || "0"}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center">
            <Ticket size={48} className="mx-auto mb-4 text-muted-dark" />
            <h2 className="text-xl font-bold mb-2">No tienes boletos aún</h2>
            <p className="text-muted mb-6">Explora eventos y compra tus primeros boletos</p>
            <button onClick={() => router.push("/events")} className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all">Explorar eventos</button>
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