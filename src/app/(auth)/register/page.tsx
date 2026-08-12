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
  User,
  CheckCircle,
  AlertCircle,
  Shield,
  XCircle,
  Sparkles
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<"name" | "email" | "password" | "confirm" | null>(null);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirm: false,
  });

  // Validaciones en tiempo real
  const isNameValid = name.length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6;
  const isConfirmValid = password === confirmPassword && confirmPassword.length > 0;
  
  // Fuerza de la contraseña
  const getPasswordStrength = () => {
    if (password.length === 0) return { score: 0, label: "", color: "" };
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    const levels = [
      { score: 0, label: "Muy débil", color: "text-danger" },
      { score: 1, label: "Débil", color: "text-danger" },
      { score: 2, label: "Regular", color: "text-warning" },
      { score: 3, label: "Buena", color: "text-warning" },
      { score: 4, label: "Fuerte", color: "text-success" },
      { score: 5, label: "Muy fuerte", color: "text-success" },
    ];
    return levels[Math.min(score, 5)];
  };

  const passwordStrength = getPasswordStrength();

  const allValid = isNameValid && isEmailValid && isPasswordValid && isConfirmValid;

  // Efecto de entrada
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Marcar todos los campos como tocados
    setTouched({
      name: true,
      email: true,
      password: true,
      confirm: true,
    });

    if (!allValid) return;

    setLoading(true);
    setError("");

    try {
      await api.post("/v1/users", {
        name,
        email,
        password,
        role: "customer",
      });

      // Auto-login
      const res = await api.post<{ token: string }>("/v1/auth/login", {
        email,
        password,
      });
      document.cookie = `token=${res.token}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  const handleBlur = (field: "name" | "email" | "password" | "confirm") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const getFieldStatus = (field: "name" | "email" | "password" | "confirm") => {
    if (!touched[field]) return null;
    switch (field) {
      case "name": return isNameValid;
      case "email": return isEmailValid;
      case "password": return isPasswordValid;
      case "confirm": return isConfirmValid;
      default: return null;
    }
  };

  const getFieldIcon = (field: "name" | "email" | "password" | "confirm") => {
    const status = getFieldStatus(field);
    if (status === null) return null;
    return status ? <CheckCircle size={16} className="text-success" /> : <XCircle size={16} className="text-danger" />;
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-black">
      
      {/* ==================== FONDOS DECORATIVOS ==================== */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      {/* Esferas de neón flotantes */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-secondary/5 blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-float pointer-events-none" style={{ animationDelay: "1.5s" }} />
      
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
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-secondary/30" />
            <p className="text-muted text-sm font-light tracking-wider">Crea tu cuenta</p>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-secondary/30" />
          </div>
        </div>

        {/* Card con efecto neón */}
        <div className="glass-card p-8 space-y-6 border border-white/5 hover:border-secondary/10 transition-all duration-500 glow-secondary">
          
          {/* Badge de seguridad */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-dark">
            <Shield size={14} className="text-secondary/60" />
            <span>Registro seguro</span>
            <span className="w-1 h-1 rounded-full bg-muted-dark/30" />
            <span className="flex items-center gap-1">
              <CheckCircle size={12} className="text-success" />
              Datos encriptados
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
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Nombre */}
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                Nombre completo
              </label>
              <div className={`relative transition-all duration-300 ${
                focusedField === "name" ? "scale-[1.01]" : "scale-100"
              }`}>
                <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                  focusedField === "name" ? "bg-secondary/5 blur-sm" : ""
                }`} />
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => { setFocusedField(null); handleBlur("name"); }}
                  placeholder="Tu nombre completo"
                  className={`relative w-full h-12 rounded-2xl border bg-white/[0.03] pl-11 pr-10 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all duration-300 z-10 ${
                    touched.name
                      ? isNameValid
                        ? "border-success/40 focus:border-success/60 focus:ring-2 focus:ring-success/10"
                        : "border-danger/40 focus:border-danger/60 focus:ring-2 focus:ring-danger/10"
                      : "border-white/[0.08] focus:border-secondary/40 focus:ring-2 focus:ring-secondary/10"
                  }`}
                  required
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
                  {getFieldIcon("name")}
                </div>
              </div>
              {touched.name && !isNameValid && (
                <p className="text-xs text-danger mt-1 ml-1">El nombre debe tener al menos 2 caracteres</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                Correo electrónico
              </label>
              <div className={`relative transition-all duration-300 ${
                focusedField === "email" ? "scale-[1.01]" : "scale-100"
              }`}>
                <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                  focusedField === "email" ? "bg-secondary/5 blur-sm" : ""
                }`} />
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => { setFocusedField(null); handleBlur("email"); }}
                  placeholder="tu@email.com"
                  className={`relative w-full h-12 rounded-2xl border bg-white/[0.03] pl-11 pr-10 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all duration-300 z-10 ${
                    touched.email
                      ? isEmailValid
                        ? "border-success/40 focus:border-success/60 focus:ring-2 focus:ring-success/10"
                        : "border-danger/40 focus:border-danger/60 focus:ring-2 focus:ring-danger/10"
                      : "border-white/[0.08] focus:border-secondary/40 focus:ring-2 focus:ring-secondary/10"
                  }`}
                  required
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
                  {getFieldIcon("email")}
                </div>
              </div>
              {touched.email && !isEmailValid && (
                <p className="text-xs text-danger mt-1 ml-1">Ingresa un correo electrónico válido</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                Contraseña
              </label>
              <div className={`relative transition-all duration-300 ${
                focusedField === "password" ? "scale-[1.01]" : "scale-100"
              }`}>
                <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                  focusedField === "password" ? "bg-secondary/5 blur-sm" : ""
                }`} />
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => { setFocusedField(null); handleBlur("password"); }}
                  placeholder="Mínimo 6 caracteres"
                  className={`relative w-full h-12 rounded-2xl border bg-white/[0.03] pl-11 pr-12 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all duration-300 z-10 ${
                    touched.password
                      ? isPasswordValid
                        ? "border-success/40 focus:border-success/60 focus:ring-2 focus:ring-success/10"
                        : "border-danger/40 focus:border-danger/60 focus:ring-2 focus:ring-danger/10"
                      : "border-white/[0.08] focus:border-secondary/40 focus:ring-2 focus:ring-secondary/10"
                  }`}
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

              {/* Indicador de fuerza */}
              {touched.password && password.length > 0 && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-dark">Fuerza:</span>
                    <span className={`text-xs font-semibold ${passwordStrength.color}`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i <= passwordStrength.score
                            ? passwordStrength.score <= 2
                              ? "bg-danger"
                              : passwordStrength.score <= 3
                              ? "bg-warning"
                              : "bg-success"
                            : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
              {touched.password && !isPasswordValid && (
                <p className="text-xs text-danger mt-1 ml-1">La contraseña debe tener al menos 6 caracteres</p>
              )}
            </div>

            {/* Confirmar Password */}
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                Confirmar contraseña
              </label>
              <div className={`relative transition-all duration-300 ${
                focusedField === "confirm" ? "scale-[1.01]" : "scale-100"
              }`}>
                <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                  focusedField === "confirm" ? "bg-secondary/5 blur-sm" : ""
                }`} />
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocusedField("confirm")}
                  onBlur={() => { setFocusedField(null); handleBlur("confirm"); }}
                  placeholder="Repite tu contraseña"
                  className={`relative w-full h-12 rounded-2xl border bg-white/[0.03] pl-11 pr-10 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all duration-300 z-10 ${
                    touched.confirm
                      ? isConfirmValid
                        ? "border-success/40 focus:border-success/60 focus:ring-2 focus:ring-success/10"
                        : "border-danger/40 focus:border-danger/60 focus:ring-2 focus:ring-danger/10"
                      : "border-white/[0.08] focus:border-secondary/40 focus:ring-2 focus:ring-secondary/10"
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-dark hover:text-muted transition-colors z-10"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <div className="absolute right-12 top-1/2 -translate-y-1/2 z-10">
                  {getFieldIcon("confirm")}
                </div>
              </div>
              {touched.confirm && !isConfirmValid && confirmPassword.length > 0 && (
                <p className="text-xs text-danger mt-1 ml-1">Las contraseñas no coinciden</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !allValid}
              className="group relative w-full h-12 rounded-2xl bg-gradient-to-r from-secondary to-primary text-sm font-bold text-white overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-secondary/30 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center gap-2 z-10">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creando cuenta...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Registrarse
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

          {/* ==================== LOGIN ==================== */}
          <div className="text-center">
            <p className="text-sm text-muted-dark">
              ¿Ya tienes cuenta?{" "}
              <Link 
                href="/login" 
                className="text-primary hover:text-secondary transition-colors font-semibold hover:underline underline-offset-2"
              >
                Iniciar Sesión
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
            href="/login" 
            className="text-xs text-muted-dark hover:text-muted transition-colors flex items-center gap-1 group"
          >
            Iniciar sesión
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>

        {/* ==================== ANIMACIÓN DE ENTRADA ==================== */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-secondary/20 to-transparent blur-sm animate-pulse-slow" />
      </div>
    </div>
  );
}