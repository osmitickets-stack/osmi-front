"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import {
  Calendar,
  MapPin,
  Clock,
  Image as ImageIcon,
  Plus,
  ArrowLeft,
  Sparkles,
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
  Upload,
  X,
  ArrowRight,
  Zap,
  Settings
} from "lucide-react";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

export default function CrearEventoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [organizerId, setOrganizerId] = useState<string | null>(null);

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
    status: "draft", // draft, pending, published
  });

  // Verificar si el usuario es organizador
  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.user_id;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/organizers?user_id=${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const org = data.organizers?.[0];
        if (org) {
          setIsOrganizer(true);
          setOrganizerId(org.public_uuid);
        } else {
          setError("No tienes perfil de organizador. Regístrate primero.");
        }
      })
      .catch(() => {
        setError("Error al verificar tu perfil de organizador.");
      });
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validaciones básicas
    if (!form.name.trim()) {
      setError("El nombre del evento es obligatorio");
      setLoading(false);
      return;
    }
    if (!form.startDate || !form.endDate) {
      setError("La fecha de inicio y fin son obligatorias");
      setLoading(false);
      return;
    }
    if (new Date(form.startDate) >= new Date(form.endDate)) {
      setError("La fecha de inicio debe ser antes de la fecha de fin");
      setLoading(false);
      return;
    }

    try {
      const token = getCookie("token");
      if (!token) {
        router.push("/login");
        return;
      }

      if (!organizerId) {
        setError("No tienes perfil de organizador. Regístrate primero.");
        setLoading(false);
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/events`, {
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
          cover_image_url: form.coverImageUrl || null,
          venue_name: form.venueName || null,
          city: form.city || null,
          state: form.state || null,
          country: form.country,
          visibility: form.visibility,
          is_featured: form.isFeatured,
          is_free: form.isFree,
          max_attendees: parseInt(String(form.maxAttendees)) || 0,
          age_restriction: parseInt(String(form.ageRestriction)) || 0,
          tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
          status: form.status,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setSuccess("¡Evento creado exitosamente!");
        setTimeout(() => {
          router.push(`/organizador/eventos/${data.public_id || data.publicId || data.id}`);
        }, 1500);
      } else {
        const err = await res.json();
        setError(err.message || "Error al crear el evento");
      }
    } catch (err: any) {
      setError(err.message || "Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, label: "Información básica" },
    { number: 2, label: "Ubicación y fechas" },
    { number: 3, label: "Configuración" },
  ];

  if (!isOrganizer) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar />
        <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-20 w-full">
          <div className="glass-card p-12 text-center border border-white/5">
            <div className="w-20 h-20 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-4 border border-warning/20">
              <AlertCircle size={36} className="text-warning" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">No eres organizador</h2>
            <p className="text-muted mb-6">
              Para crear eventos, primero debes registrarte como organizador.
            </p>
            <Link
              href="/organizador/registro"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-2xl hover:shadow-primary/30 transition-all"
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
      
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        
        {/* ==================== HEADER ==================== */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/organizador")}
                className="p-2 rounded-xl hover:bg-white/5 transition-colors text-muted hover:text-foreground"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-3xl sm:text-4xl font-black text-foreground">
                Crear <span className="text-gradient">Evento</span>
              </h1>
            </div>
            <p className="text-muted mt-1 ml-12 text-sm">
              Completa los datos de tu evento y comienza a vender boletos
            </p>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-dark">
            <span className="flex items-center gap-1">
              <CheckCircle size={12} className="text-success" />
              Publicación gratuita
            </span>
          </div>
        </div>

        {/* ==================== STEPS ==================== */}
        <div className="flex items-center gap-2 mb-8 max-w-md">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center gap-2 flex-1">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm transition-all duration-300 ${
                  step.number <= currentStep
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30"
                    : "bg-white/10 text-muted-dark"
                }`}
              >
                {step.number}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${
                  step.number <= currentStep ? "text-foreground" : "text-muted-dark"
                }`}
              >
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 rounded-full transition-all duration-300 ${
                    step.number < currentStep ? "bg-primary" : "bg-white/10"
                  }`}
                />
              )}
            </div>
          ))}
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
            <div>
              <p className="text-sm text-success font-semibold">{success}</p>
              <p className="text-xs text-muted">Redirigiendo al detalle del evento...</p>
            </div>
          </div>
        )}

        {/* ==================== FORMULARIO ==================== */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* ==================== PASO 1: INFORMACIÓN BÁSICA ==================== */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="glass-card p-6 sm:p-8 border border-white/5 space-y-5">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-white/5 pb-3">
                  <FileText size={20} className="text-primary" />
                  Información básica del evento
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                    Nombre del evento *
                  </label>
                  <div className={`relative transition-all duration-300 ${
                    focusedField === "name" ? "scale-[1.01]" : "scale-100"
                  }`}>
                    <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                      focusedField === "name" ? "bg-primary/5 blur-sm" : ""
                    }`} />
                    <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Ej: Concierto de Rock en la Ciudad"
                      className="relative w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all duration-300 z-10 focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                    Descripción corta
                  </label>
                  <div className={`relative transition-all duration-300 ${
                    focusedField === "shortDescription" ? "scale-[1.01]" : "scale-100"
                  }`}>
                    <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                      focusedField === "shortDescription" ? "bg-primary/5 blur-sm" : ""
                    }`} />
                    <Info size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                    <input
                      type="text"
                      name="shortDescription"
                      value={form.shortDescription}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("shortDescription")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Breve descripción del evento (máx 100 caracteres)"
                      className="relative w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all duration-300 z-10 focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                    Descripción completa
                  </label>
                  <div className={`relative transition-all duration-300 ${
                    focusedField === "description" ? "scale-[1.01]" : "scale-100"
                  }`}>
                    <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                      focusedField === "description" ? "bg-primary/5 blur-sm" : ""
                    }`} />
                    <FileText size={16} className="absolute left-4 top-4 text-muted-dark pointer-events-none z-10" />
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("description")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Descripción detallada del evento. Incluye información sobre el programa, artistas invitados, etc."
                      rows={5}
                      className="relative w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all duration-300 z-10 focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10 resize-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                    Etiquetas (separadas por comas)
                  </label>
                  <div className={`relative transition-all duration-300 ${
                    focusedField === "tags" ? "scale-[1.01]" : "scale-100"
                  }`}>
                    <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                      focusedField === "tags" ? "bg-primary/5 blur-sm" : ""
                    }`} />
                    <Tag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                    <input
                      type="text"
                      name="tags"
                      value={form.tags}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("tags")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="música, concierto, rock, festival"
                      className="relative w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all duration-300 z-10 focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                  <p className="text-xs text-muted-dark mt-1 ml-1">Ejemplo: música, concierto, rock, festival</p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== PASO 2: UBICACIÓN Y FECHAS ==================== */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="glass-card p-6 sm:p-8 border border-white/5 space-y-5">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-white/5 pb-3">
                  <MapPin size={20} className="text-secondary" />
                  Ubicación
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                      Lugar / Venue
                    </label>
                    <div className={`relative transition-all duration-300 ${
                      focusedField === "venueName" ? "scale-[1.01]" : "scale-100"
                    }`}>
                      <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                        focusedField === "venueName" ? "bg-primary/5 blur-sm" : ""
                      }`} />
                      <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                      <input
                        type="text"
                        name="venueName"
                        value={form.venueName}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("venueName")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Nombre del lugar"
                        className="relative w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all duration-300 z-10 focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                      Ciudad
                    </label>
                    <div className={`relative transition-all duration-300 ${
                      focusedField === "city" ? "scale-[1.01]" : "scale-100"
                    }`}>
                      <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                        focusedField === "city" ? "bg-primary/5 blur-sm" : ""
                      }`} />
                      <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                      <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("city")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Guadalajara"
                        className="relative w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all duration-300 z-10 focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                      Estado
                    </label>
                    <div className={`relative transition-all duration-300 ${
                      focusedField === "state" ? "scale-[1.01]" : "scale-100"
                    }`}>
                      <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                        focusedField === "state" ? "bg-primary/5 blur-sm" : ""
                      }`} />
                      <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                      <input
                        type="text"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("state")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Jalisco"
                        className="relative w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all duration-300 z-10 focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                      País
                    </label>
                    <div className={`relative transition-all duration-300 ${
                      focusedField === "country" ? "scale-[1.01]" : "scale-100"
                    }`}>
                      <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                        focusedField === "country" ? "bg-primary/5 blur-sm" : ""
                      }`} />
                      <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                      <select
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("country")}
                        onBlur={() => setFocusedField(null)}
                        className="relative w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 text-sm text-foreground outline-none transition-all duration-300 z-10 focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10 appearance-none cursor-pointer"
                      >
                        <option value="MX">México</option>
                        <option value="US">Estados Unidos</option>
                        <option value="AR">Argentina</option>
                        <option value="CO">Colombia</option>
                        <option value="ES">España</option>
                        <option value="CL">Chile</option>
                        <option value="PE">Perú</option>
                        <option value="BR">Brasil</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 sm:p-8 border border-white/5 space-y-5">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-white/5 pb-3">
                  <Calendar size={20} className="text-accent" />
                  Fecha y hora
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                      Fecha de inicio *
                    </label>
                    <div className={`relative transition-all duration-300 ${
                      focusedField === "startDate" ? "scale-[1.01]" : "scale-100"
                    }`}>
                      <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                        focusedField === "startDate" ? "bg-primary/5 blur-sm" : ""
                      }`} />
                      <CalendarDays size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                      <input
                        type="datetime-local"
                        name="startDate"
                        value={form.startDate}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("startDate")}
                        onBlur={() => setFocusedField(null)}
                        className="relative w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 text-sm text-foreground outline-none transition-all duration-300 z-10 focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                      Fecha de fin *
                    </label>
                    <div className={`relative transition-all duration-300 ${
                      focusedField === "endDate" ? "scale-[1.01]" : "scale-100"
                    }`}>
                      <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                        focusedField === "endDate" ? "bg-primary/5 blur-sm" : ""
                      }`} />
                      <CalendarDays size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                      <input
                        type="datetime-local"
                        name="endDate"
                        value={form.endDate}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("endDate")}
                        onBlur={() => setFocusedField(null)}
                        className="relative w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 text-sm text-foreground outline-none transition-all duration-300 z-10 focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                    Zona horaria
                  </label>
                  <div className={`relative transition-all duration-300 ${
                    focusedField === "timezone" ? "scale-[1.01]" : "scale-100"
                  }`}>
                    <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                      focusedField === "timezone" ? "bg-primary/5 blur-sm" : ""
                    }`} />
                    <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                    <select
                      name="timezone"
                      value={form.timezone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("timezone")}
                      onBlur={() => setFocusedField(null)}
                      className="relative w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 text-sm text-foreground outline-none transition-all duration-300 z-10 focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10 appearance-none cursor-pointer"
                    >
                      <option value="America/Mexico_City">CDMX (UTC-6)</option>
                      <option value="America/Guadalajara">Guadalajara (UTC-6)</option>
                      <option value="America/Chihuahua">Chihuahua (UTC-6)</option>
                      <option value="America/Monterrey">Monterrey (UTC-6)</option>
                      <option value="America/Los_Angeles">Los Ángeles (UTC-8)</option>
                      <option value="America/New_York">Nueva York (UTC-5)</option>
                      <option value="Europe/Madrid">Madrid (UTC+1)</option>
                      <option value="UTC">UTC</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 sm:p-8 border border-white/5 space-y-5">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-white/5 pb-3">
                  <ImageIcon size={20} className="text-primary" />
                  Imagen del evento
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                    URL de la imagen (Cloudinary)
                  </label>
                  <div className={`relative transition-all duration-300 ${
                    focusedField === "coverImageUrl" ? "scale-[1.01]" : "scale-100"
                  }`}>
                    <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                      focusedField === "coverImageUrl" ? "bg-primary/5 blur-sm" : ""
                    }`} />
                    <ImageIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                    <input
                      type="url"
                      name="coverImageUrl"
                      value={form.coverImageUrl}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("coverImageUrl")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="https://res.cloudinary.com/..."
                      className="relative w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all duration-300 z-10 focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                  <p className="text-xs text-muted-dark mt-1 ml-1">
                    Sube tu imagen a Cloudinary y pega el enlace aquí
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== PASO 3: CONFIGURACIÓN ==================== */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="glass-card p-6 sm:p-8 border border-white/5 space-y-5">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-white/5 pb-3">
                  <Settings size={20} className="text-secondary" />
                  Configuración del evento
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                      Tipo de evento
                    </label>
                    <div className={`relative transition-all duration-300 ${
                      focusedField === "eventType" ? "scale-[1.01]" : "scale-100"
                    }`}>
                      <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                        focusedField === "eventType" ? "bg-primary/5 blur-sm" : ""
                      }`} />
                      <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                      <select
                        name="eventType"
                        value={form.eventType}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("eventType")}
                        onBlur={() => setFocusedField(null)}
                        className="relative w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 text-sm text-foreground outline-none transition-all duration-300 z-10 focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10 appearance-none cursor-pointer"
                      >
                        <option value="in_person">Presencial</option>
                        <option value="online">En línea</option>
                        <option value="hybrid">Híbrido</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                      Visibilidad
                    </label>
                    <div className={`relative transition-all duration-300 ${
                      focusedField === "visibility" ? "scale-[1.01]" : "scale-100"
                    }`}>
                      <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                        focusedField === "visibility" ? "bg-primary/5 blur-sm" : ""
                      }`} />
                      <Eye size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                      <select
                        name="visibility"
                        value={form.visibility}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("visibility")}
                        onBlur={() => setFocusedField(null)}
                        className="relative w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 text-sm text-foreground outline-none transition-all duration-300 z-10 focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10 appearance-none cursor-pointer"
                      >
                        <option value="public">Público</option>
                        <option value="private">Privado</option>
                        <option value="unlisted">No listado</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                      Capacidad máxima
                    </label>
                    <div className={`relative transition-all duration-300 ${
                      focusedField === "maxAttendees" ? "scale-[1.01]" : "scale-100"
                    }`}>
                      <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                        focusedField === "maxAttendees" ? "bg-primary/5 blur-sm" : ""
                      }`} />
                      <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                      <input
                        type="number"
                        name="maxAttendees"
                        value={form.maxAttendees}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("maxAttendees")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="100"
                        className="relative w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all duration-300 z-10 focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                      Restricción de edad
                    </label>
                    <div className={`relative transition-all duration-300 ${
                      focusedField === "ageRestriction" ? "scale-[1.01]" : "scale-100"
                    }`}>
                      <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                        focusedField === "ageRestriction" ? "bg-primary/5 blur-sm" : ""
                      }`} />
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                      <input
                        type="number"
                        name="ageRestriction"
                        value={form.ageRestriction}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("ageRestriction")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="18"
                        className="relative w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all duration-300 z-10 focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                    <p className="text-xs text-muted-dark mt-1 ml-1">0 = Sin restricción</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 pt-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`relative w-5 h-5 rounded border transition-all duration-300 ${
                      form.isFree
                        ? "bg-primary border-primary"
                        : "border-white/20 bg-white/5 group-hover:border-white/40"
                    }`}>
                      <input
                        type="checkbox"
                        name="isFree"
                        checked={form.isFree}
                        onChange={handleChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      {form.isFree && (
                        <CheckCircle size={14} className="absolute inset-0 m-auto text-white" />
                      )}
                    </div>
                    <span className="text-sm text-muted group-hover:text-foreground transition-colors flex items-center gap-1">
                      <DollarSign size={14} className="text-success" />
                      Evento gratuito
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`relative w-5 h-5 rounded border transition-all duration-300 ${
                      form.isFeatured
                        ? "bg-primary border-primary"
                        : "border-white/20 bg-white/5 group-hover:border-white/40"
                    }`}>
                      <input
                        type="checkbox"
                        name="isFeatured"
                        checked={form.isFeatured}
                        onChange={handleChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      {form.isFeatured && (
                        <CheckCircle size={14} className="absolute inset-0 m-auto text-white" />
                      )}
                    </div>
                    <span className="text-sm text-muted group-hover:text-foreground transition-colors flex items-center gap-1">
                      <Sparkles size={14} className="text-primary" />
                      Destacado
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`relative w-5 h-5 rounded border transition-all duration-300 ${
                      form.status === "published"
                        ? "bg-success border-success"
                        : "border-white/20 bg-white/5 group-hover:border-white/40"
                    }`}>
                      <input
                        type="checkbox"
                        name="status"
                        checked={form.status === "published"}
                        onChange={(e) => {
                          setForm(prev => ({
                            ...prev,
                            status: e.target.checked ? "published" : "draft"
                          }));
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      {form.status === "published" && (
                        <CheckCircle size={14} className="absolute inset-0 m-auto text-white" />
                      )}
                    </div>
                    <span className="text-sm text-muted group-hover:text-foreground transition-colors flex items-center gap-1">
                      <Eye size={14} className="text-success" />
                      Publicar inmediatamente
                    </span>
                  </label>
                </div>

                <div className="bg-warning/5 border border-warning/20 rounded-2xl p-4 flex items-start gap-3">
                  <Info size={18} className="text-warning flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-warning font-semibold">Publicación en revisión</p>
                    <p className="text-xs text-muted">
                      Los eventos pasan por una revisión rápida antes de ser visibles al público. 
                      Puedes guardar como borrador y publicar después.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== NAVEGACIÓN ENTRE PASOS ==================== */}
          <div className="flex gap-3 pt-4 border-t border-white/5">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-foreground font-semibold hover:bg-white/10 transition-all"
              >
                Anterior
              </button>
            )}
            
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex-1 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Siguiente
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><span className="animate-spin">⏳</span> Creando...</>
                ) : (
                  <>
                    <Zap size={18} />
                    Crear evento
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}