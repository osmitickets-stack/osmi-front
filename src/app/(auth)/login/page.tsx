"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles,
  Shield,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [focusedField, setFocusedField] = useState<"email" | "password" | null>(null);

  // Efecto de entrada
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post<{ token: string }>("/v1/auth/login", {
        email,
        password,
      });
      
      // Guardar token con opción de recordar
      const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24; // 30 días o 1 día
      document.cookie = `token=${res.token}; path=/; max-age=${maxAge}; SameSite=Lax`;
      
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-black">
      
      {/* ==================== FONDOS DECORATIVOS ==================== */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-secondary/5 via-transparent to-transparent pointer-events-none" />
      
      {/* Esferas de neón flotantes */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-secondary/5 blur-3xl animate-float pointer-events-none" style={{ animationDelay: "1.5s" }} />
      
      {/* Grid sutil */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItSDI0di2yaDEyek0zNiAyNHYySDI0di2yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50 pointer-events-none" />

      {/* ==================== CARD PRINCIPAL ==================== */}
      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        
        {/* Logo con efecto neón */}
        <div className="text-center mb-8">
          <Link 
            href="/" 
            className="text-4xl font-black text-gradient tracking-tight inline-block hover:scale-105 transition-transform duration-300"
          >
            osmi
          </Link>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30" />
            <p className="text-muted text-sm font-light tracking-wider">Bienvenido de vuelta</p>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30" />
          </div>
        </div>

        {/* Card con efecto neón */}
        <div className="glass-card p-8 space-y-6 border border-white/5 hover:border-primary/10 transition-all duration-500 glow-primary">
          
          {/* Badge de seguridad */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-dark">
            <Shield size={14} className="text-primary/60" />
            <span>Conexión segura</span>
            <span className="w-1 h-1 rounded-full bg-muted-dark/30" />
            <span className="flex items-center gap-1">
              <CheckCircle size={12} className="text-success" />
              SSL activo
            </span>
          </div>

          {/* ==================== ERROR ==================== */}
          {error && (
            <div className="flex items-start gap-3 bg-danger/10 border border-danger/20 rounded-2xl px-4 py-3 animate-fade-in">
              <AlertCircle size={18} className="text-danger flex-shrink-0 mt-0.5" />
              <p className="text-sm text-danger">{error}</p>
            </div>
          )}

          {/* ==================== FORMULARIO ==================== */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                Correo electrónico
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="tu@email.com"
                  className="relative w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all duration-300 focus:border-primary/40 focus:bg-white/[0.06] focus:ring-2 focus:ring-primary/10 z-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2 ml-1">
                <label className="text-xs font-semibold text-muted uppercase tracking-wider">
                  Contraseña
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-xs text-muted-dark hover:text-primary transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className={`relative transition-all duration-300 ${
                focusedField === "password" ? "scale-[1.01]" : "scale-100"
              }`}>
                <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                  focusedField === "password" ? "bg-primary/5 blur-sm" : ""
                }`} />
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Tu contraseña"
                  className="relative w-full h-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-12 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all duration-300 focus:border-primary/40 focus:bg-white/[0.06] focus:ring-2 focus:ring-primary/10 z-10"
                  required
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

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`relative w-4 h-4 rounded border transition-all duration-300 ${
                  rememberMe 
                    ? "bg-primary border-primary" 
                    : "border-white/20 bg-white/5 group-hover:border-white/40"
                }`}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {rememberMe && (
                    <CheckCircle size={12} className="absolute inset-0 m-auto text-white" />
                  )}
                </div>
                <span className="text-xs text-muted-dark group-hover:text-muted transition-colors">
                  Recordarme
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full h-12 rounded-2xl bg-gradient-to-r from-primary to-secondary text-sm font-bold text-white overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center gap-2 z-10">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Ingresando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Iniciar Sesión
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </span>
            </button>
          </form>

          {/* ==================== DIVIDER ==================== */}
          <div className="relative flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
            <span className="text-xs text-muted-dark tracking-wider">o</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
          </div>

          {/* ==================== REGISTRO ==================== */}
          <div className="text-center">
            <p className="text-sm text-muted-dark">
              ¿No tienes cuenta?{" "}
              <Link 
                href="/register" 
                className="text-secondary hover:text-primary transition-colors font-semibold hover:underline underline-offset-2"
              >
                Regístrate
              </Link>
            </p>
          </div>
        </div>

        {/* ==================== FOOTER ==================== */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <Link 
            href="/" 
            className="text-xs text-muted-dark hover:text-muted transition-colors flex items-center gap-1 group"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
            Volver al inicio
          </Link>
          <span className="w-px h-3 bg-white/5" />
          <Link 
            href="/register" 
            className="text-xs text-muted-dark hover:text-muted transition-colors flex items-center gap-1 group"
          >
            Crear cuenta
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>

        {/* ==================== ANIMACIÓN DE ENTRADA ==================== */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-sm animate-pulse-slow" />
      </div>
    </div>
  );
}