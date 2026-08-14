"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import {
  Building2,
  Mail,
  User,
  Phone,
  MapPin,
  Globe,
  ArrowRight,
  Sparkles,
  Shield,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  FileText,
  Lock,
  Eye,
  EyeOff,
  Users,
  Calendar,
  Star,
  Award,
  Zap,
  ChevronRight,
  ArrowLeft
} from "lucide-react";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

export default function OrganizadorRegistroPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    organization: "",
    description: "",
    website: "",
    city: "",
    state: "",
    country: "MX",
    eventTypes: [] as string[],
    experience: "",
    terms: false,
    newsletter: false,
  });

  const eventTypeOptions = [
    "Conciertos",
    "Deportes",
    "Teatro",
    "Festivales",
    "Experiencias",
    "Infantiles",
    "Gastronomía",
    "Corporativos",
    "Educativos",
    "Otro"
  ];

  useEffect(() => {
    // Verificar si el usuario ya está logueado
    const token = getCookie("token");
    if (token) {
      setIsLoggedIn(true);
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.user_id;
        // Cargar datos del usuario si es necesario
        fetchUserData(token);
      } catch (e) {
        console.error("Error al decodificar token:", e);
      }
    }
  }, []);

  const fetchUserData = async (token: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUserEmail(data.email || "");
        setUserName(data.name || "");
        setFormData(prev => ({
          ...prev,
          email: data.email || "",
          name: data.name || "",
        }));
      }
    } catch (e) {
      console.error("Error cargando datos del usuario:", e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const toggleEventType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      eventTypes: prev.eventTypes.includes(type)
        ? prev.eventTypes.filter(t => t !== type)
        : [...prev.eventTypes, type]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }

    if (!formData.terms) {
      setError("Debes aceptar los términos y condiciones");
      setLoading(false);
      return;
    }

    if (formData.eventTypes.length === 0) {
      setError("Selecciona al menos un tipo de evento");
      setLoading(false);
      return;
    }

    try {
      const token = getCookie("token");
      
      // Si está logueado, usar el token
      if (token) {
        // Obtener el user_id del token
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.user_id;

        // Registrar como organizador (usando endpoint existente)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/organizers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.organization || formData.name,
            email: formData.email,
            phone: formData.phone,
            description: formData.description,
            website: formData.website,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            user_id: userId,
            event_types: formData.eventTypes,
            experience: formData.experience,
          }),
        });

        if (res.ok) {
          setSuccess("¡Te has registrado como organizador exitosamente!");
          setTimeout(() => {
            router.push("/organizador");
          }, 2000);
        } else {
          const err = await res.json();
          setError(err.message || "Error al registrar como organizador");
        }
      } else {
        // Si no está logueado, primero registrar usuario y luego organizador
        // Esto sería un flujo alternativo, pero mejor forzar login primero
        setError("Debes iniciar sesión primero para registrarte como organizador");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || "Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  // Si no está logueado, mostrar mensaje
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar />
        <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-20 w-full">
          <div className="glass-card p-12 text-center border border-white/5">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/20">
              <Lock size={36} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Inicia sesión primero</h2>
            <p className="text-muted mb-6">
              Para registrarte como organizador, primero debes tener una cuenta en osmi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-2xl hover:shadow-primary/30 transition-all"
              >
                Iniciar sesión
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-white/5 border border-white/10 text-foreground font-semibold hover:bg-white/10 transition-all"
              >
                Crear cuenta
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 w-full">
        
        {/* ==================== HEADER ==================== */}
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
            <Building2 size={32} className="text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-3">
            Regístrate como <span className="text-gradient">Organizador</span>
          </h1>
          <p className="text-muted max-w-xl mx-auto">
            Publica tus eventos y llega a miles de asistentes en la plataforma más inteligente.
          </p>
          
          {/* Badge de usuario logueado */}
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-success/10 border border-success/20 text-success text-xs font-medium">
            <CheckCircle size={14} />
            Conectado como <span className="font-semibold">{userEmail || "usuario"}</span>
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

        {/* ==================== FORMULARIO ==================== */}
        <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 border border-white/5 space-y-6">
          
          {/* ==================== PASO 1: DATOS PERSONALES ==================== */}
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-white/5 pb-3">
              <User size={20} className="text-primary" />
              Datos personales
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                  Nombre completo *
                </label>
                <div className={`relative transition-all duration-300 ${
                  focusedField === "name" ? "scale-[1.01]" : "scale-100"
                }`}>
                  <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                    focusedField === "name" ? "bg-primary/5 blur-sm" : ""
                  }`} />
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Tu nombre completo"
                    className="relative w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all duration-300 z-10 focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                  Correo electrónico *
                </label>
                <div className={`relative transition-all duration-300 ${
                  focusedField === "email" ? "scale-[1.01]" : "scale-100"
                }`}>
                  <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                    focusedField === "email" ? "bg-primary/5 blur-sm" : ""
                  }`} />
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="tu@correo.com"
                    className="relative w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all duration-300 z-10 focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                  Teléfono *
                </label>
                <div className={`relative transition-all duration-300 ${
                  focusedField === "phone" ? "scale-[1.01]" : "scale-100"
                }`}>
                  <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                    focusedField === "phone" ? "bg-primary/5 blur-sm" : ""
                  }`} />
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="+52 33 1234 5678"
                    className="relative w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all duration-300 z-10 focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                  Ciudad *
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
                    value={formData.city}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("city")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Guadalajara, Jalisco"
                    className="relative w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all duration-300 z-10 focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contraseña - Solo si el usuario no está logueado */}
            {!isLoggedIn && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                    Contraseña *
                  </label>
                  <div className={`relative transition-all duration-300 ${
                    focusedField === "password" ? "scale-[1.01]" : "scale-100"
                  }`}>
                    <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                      focusedField === "password" ? "bg-primary/5 blur-sm" : ""
                    }`} />
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Mínimo 6 caracteres"
                      className="relative w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-12 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all duration-300 z-10 focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
                      required={!isLoggedIn}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-dark hover:text-muted transition-colors z-10"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                    Confirmar contraseña *
                  </label>
                  <div className={`relative transition-all duration-300 ${
                    focusedField === "confirmPassword" ? "scale-[1.01]" : "scale-100"
                  }`}>
                    <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                      focusedField === "confirmPassword" ? "bg-primary/5 blur-sm" : ""
                    }`} />
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("confirmPassword")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Repite tu contraseña"
                      className="relative w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-12 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all duration-300 z-10 focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
                      required={!isLoggedIn}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-dark hover:text-muted transition-colors z-10"
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ==================== PASO 2: DATOS DEL ORGANIZADOR ==================== */}
          <div className="space-y-5 pt-4 border-t border-white/5">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Building2 size={20} className="text-secondary" />
              Datos del organizador
            </h2>

            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                Nombre de la organización *
              </label>
              <div className={`relative transition-all duration-300 ${
                focusedField === "organization" ? "scale-[1.01]" : "scale-100"
              }`}>
                <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                  focusedField === "organization" ? "bg-primary/5 blur-sm" : ""
                }`} />
                <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("organization")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Nombre de tu empresa o colectivo"
                  className="relative w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all duration-300 z-10 focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                Descripción
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
                  value={formData.description}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("description")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Cuéntanos sobre tu organización y los eventos que organizas"
                  rows={4}
                  className="relative w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all duration-300 z-10 focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10 resize-none"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                  Sitio web
                </label>
                <div className={`relative transition-all duration-300 ${
                  focusedField === "website" ? "scale-[1.01]" : "scale-100"
                }`}>
                  <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                    focusedField === "website" ? "bg-primary/5 blur-sm" : ""
                  }`} />
                  <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("website")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="https://tusitio.com"
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
                    value={formData.state}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("state")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Jalisco"
                    className="relative w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all duration-300 z-10 focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ==================== PASO 3: TIPOS DE EVENTOS ==================== */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-3 ml-1">
                Tipos de eventos que organizas *
              </label>
              <div className="flex flex-wrap gap-2">
                {eventTypeOptions.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleEventType(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      formData.eventTypes.includes(type)
                        ? "bg-primary/20 text-primary border border-primary/30 shadow-lg shadow-primary/10"
                        : "bg-white/5 text-muted border border-white/10 hover:border-white/20 hover:text-foreground"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-dark mt-2">
                Selecciona al menos un tipo de evento
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                Experiencia (opcional)
              </label>
              <div className={`relative transition-all duration-300 ${
                focusedField === "experience" ? "scale-[1.01]" : "scale-100"
              }`}>
                <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                  focusedField === "experience" ? "bg-primary/5 blur-sm" : ""
                }`} />
                <Award size={16} className="absolute left-4 top-4 text-muted-dark pointer-events-none z-10" />
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("experience")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Cuéntanos sobre tu experiencia organizando eventos"
                  rows={2}
                  className="relative w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all duration-300 z-10 focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10 resize-none"
                />
              </div>
            </div>
          </div>

          {/* ==================== PASO 4: TÉRMINOS ==================== */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary/20"
                required
              />
              <div>
                <label className="text-sm text-muted">
                  Acepto los{" "}
                  <Link href="/terminos" className="text-primary hover:text-secondary transition-colors">
                    términos y condiciones
                  </Link>
                  {" "}y la{" "}
                  <Link href="/privacidad" className="text-primary hover:text-secondary transition-colors">
                    política de privacidad
                  </Link>
                  .
                </label>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
                className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary/20"
              />
              <div>
                <label className="text-sm text-muted">
                  Quiero recibir información sobre novedades y oportunidades para organizadores.
                </label>
              </div>
            </div>

            <div className="bg-success/5 border border-success/20 rounded-2xl p-4 flex items-start gap-3">
              <Shield size={18} className="text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-success font-semibold">¡Estás a punto de comenzar!</p>
                <p className="text-xs text-muted">Revisaremos tu solicitud y te contactaremos en menos de 24 horas.</p>
              </div>
            </div>
          </div>

          {/* ==================== BOTÓN DE ENVÍO ==================== */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
          >
            {loading ? (
              <><span className="animate-spin">⏳</span> Registrando...</>
            ) : (
              <>
                <Sparkles size={18} />
                Registrarme como organizador
                <ArrowRight size={18} />
              </>
            )}
          </button>

          {/* ==================== CONTACTO ALTERNATIVO ==================== */}
          <div className="text-center pt-2 border-t border-white/5">
            <p className="text-sm text-muted-dark">
              ¿Prefieres hablar con nosotros?{" "}
              <Link href="/contacto" className="text-primary hover:text-secondary transition-colors font-semibold inline-flex items-center gap-1">
                <MessageCircle size={14} />
                Contáctanos
              </Link>
            </p>
          </div>
        </form>

        {/* ==================== VOLVER ==================== */}
        <div className="mt-6 text-center">
          <Link
            href="/para-organizadores"
            className="text-sm text-muted-dark hover:text-muted transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeft size={14} />
            Volver a la página de organizadores
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}