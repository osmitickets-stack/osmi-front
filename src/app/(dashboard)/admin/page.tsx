"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navigation/Navbar";
import { Shield, CheckCircle, XCircle } from "lucide-react";

interface OrganizerRequest {
  public_uuid: string;
  name: string;
  contact_email: string;
  approval_status: string;
  created_at: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<OrganizerRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = getCookie("token");
      const res = await fetch("http://localhost:8083/v1/organizers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setRequests(data.organizers || []);
      }
    } catch (err) {
      console.error("Error fetching requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (publicUuid: string) => {
    const token = getCookie("token");
    await fetch(`http://localhost:8083/v1/organizers/${publicUuid}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ approval_status: "approved" }),
    });
    fetchRequests();
  };

  const handleReject = async (publicUuid: string) => {
    const token = getCookie("token");
    await fetch(`http://localhost:8083/v1/organizers/${publicUuid}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ approval_status: "rejected" }),
    });
    fetchRequests();
  };

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Shield size={28} className="text-primary" />
            <h1 className="text-3xl font-bold">Panel de Administracion</h1>
          </div>
          <button onClick={handleLogout} className="rounded-full bg-white/10 px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-white/20 transition-all">
            Cerrar sesion
          </button>
        </div>
        
        <h2 className="text-xl font-bold mb-6">Solicitudes de Organizador</h2>

        {loading ? (
          <div className="space-y-4">{[1, 2, 3].map((i) => (<div key={i} className="glass-card h-20 animate-pulse" />))}</div>
        ) : requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((req) => (
              <div key={req.public_uuid} className="glass-card p-6 flex items-center justify-between">
                <div>
                  <p className="font-semibold">{req.name}</p>
                  <p className="text-sm text-muted">{req.contact_email}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
                    req.approval_status === "approved" ? "bg-success/20 text-success" :
                    req.approval_status === "rejected" ? "bg-danger/20 text-danger" : "bg-warning/20 text-warning"
                  }`}>
                    {req.approval_status === "approved" ? "Aprobado" : req.approval_status === "rejected" ? "Rechazado" : "Pendiente"}
                  </span>
                </div>
                {req.approval_status === "pending" && (
                  <div className="flex gap-3">
                    <button onClick={() => handleApprove(req.public_uuid)} className="flex items-center gap-2 rounded-full bg-success/10 px-4 py-2 text-sm font-semibold text-success hover:bg-success/20 transition-all">
                      <CheckCircle size={16} /> Aprobar
                    </button>
                    <button onClick={() => handleReject(req.public_uuid)} className="flex items-center gap-2 rounded-full bg-danger/10 px-4 py-2 text-sm font-semibold text-danger hover:bg-danger/20 transition-all">
                      <XCircle size={16} /> Rechazar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center">
            <Shield size={48} className="mx-auto mb-4 text-muted-dark" />
            <p className="text-muted">No hay solicitudes pendientes</p>
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