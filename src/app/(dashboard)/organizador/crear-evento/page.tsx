"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navigation/Navbar";
import { Calendar, MapPin, Clock, Image, Plus, ArrowLeft } from "lucide-react";

export default function CrearEventoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    shortDescription: "",
    venueName: "",
    city: "",
    state: "",
    country: "MX",
    startDate: "",
    endDate: "",
    timezone: "America/Mexico_City",
    coverImageUrl: "",
    eventType: "in_person",
    visibility: "public",
    isFeatured: false,
    isFree: false,
    maxAttendees: 0,
    ageRestriction: 0,
    tags: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = getCookie("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.user_id;

      // Obtener organizer_id
      const orgRes = await fetch(`http://localhost:8083/v1/organizers?user_id=${userId}`);
      const orgData = await orgRes.json();
      const organizerId = orgData.organizers?.[0]?.public_uuid;

      if (!organizerId) {
        setError("No tienes perfil de organizador. Contacta a soporte.");
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:8083/v1/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          short_description: form.shortDescription,
          organizer_id: organizerId,
          start_date: new Date(form.startDate).toISOString(),
          end_date: new Date(form.endDate).toISOString(),
          timezone: form.timezone,
          event_type: form.eventType,
          cover_image_url: form.coverImageUrl,
          venue_name: form.venueName,
          city: form.city,
          state: form.state,
          country: form.country,
          visibility: form.visibility,
          is_featured: form.isFeatured,
          is_free: form.isFree,
          max_attendees: parseInt(String(form.maxAttendees)) || 0,
          age_restriction: parseInt(String(form.ageRestriction)) || 0,
          tags: form.tags,
        }),
      });

      if (res.ok) {
        setSuccess("Evento creado exitosamente!");
        setTimeout(() => router.push("/organizador"), 1500);
      } else {
        const err = await res.json();
        setError(err.message || "Error al crear el evento");
      }
    } catch (err: any) {
      setError(err.message || "Error de conexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <button
          onClick={() => router.push("/organizador")}
          className="flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Volver al panel
        </button>

        <h1 className="text-4xl font-bold mb-2">Crear Evento</h1>
        <p className="text-muted mb-8">Completa los datos de tu evento</p>

        {error && (
          <div className="bg-danger/10 border border-danger/20 rounded-2xl px-4 py-3 text-sm text-danger mb-6">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-success/10 border border-success/20 rounded-2xl px-4 py-3 text-sm text-success mb-6">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Informacion basica</h3>
            
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Nombre del evento</label>
              <input type="text" name="name" value={form.name} onChange={handleChange}
                className="w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-foreground outline-none focus:border-primary/30"
                required />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Descripcion corta</label>
              <input type="text" name="shortDescription" value={form.shortDescription} onChange={handleChange}
                className="w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-foreground outline-none focus:border-primary/30" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Descripcion completa</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={4}
                className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none focus:border-primary/30 resize-none" />
            </div>
          </div>

          <div className="glass-card p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Ubicacion</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Lugar</label>
                <input type="text" name="venueName" value={form.venueName} onChange={handleChange}
                  className="w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-foreground outline-none focus:border-primary/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Ciudad</label>
                <input type="text" name="city" value={form.city} onChange={handleChange}
                  className="w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-foreground outline-none focus:border-primary/30" />
              </div>
            </div>
          </div>

          <div className="glass-card p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Fecha y hora</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Inicio</label>
                <input type="datetime-local" name="startDate" value={form.startDate} onChange={handleChange}
                  className="w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-foreground outline-none focus:border-primary/30"
                  required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Fin</label>
                <input type="datetime-local" name="endDate" value={form.endDate} onChange={handleChange}
                  className="w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-foreground outline-none focus:border-primary/30"
                  required />
              </div>
            </div>
          </div>

          <div className="glass-card p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Imagen</h3>
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">URL de la imagen (Cloudinary)</label>
              <input type="url" name="coverImageUrl" value={form.coverImageUrl} onChange={handleChange}
                placeholder="https://res.cloudinary.com/..."
                className="w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-foreground outline-none focus:border-primary/30" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-primary text-sm font-bold text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            {loading ? "Creando..." : "Crear evento"}
          </button>
        </form>
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
