import { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { 
  Cookie, 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  Settings, 
  Database,
  Lock,
  Globe,
  RefreshCw,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Cookies - osmi",
  description: "Conoce cómo usamos las cookies en osmi para mejorar tu experiencia de navegación y proteger tus datos.",
  keywords: "cookies, política de cookies, osmi, privacidad, datos, navegación",
};

export default function CookiesPage() {
  const cookieTypes = [
    {
      icon: Shield,
      title: "Cookies Esenciales",
      description: "Necesarias para el funcionamiento básico del sitio. Permiten la autenticación, el carrito de compras y el procesamiento de pagos.",
      examples: "Autenticación, sesión de usuario, carrito de compras",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: Settings,
      title: "Cookies de Preferencias",
      description: "Recuerdan tus preferencias y configuraciones para ofrecerte una experiencia personalizada.",
      examples: "Idioma, región, preferencias de visualización",
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
    {
      icon: Database,
      title: "Cookies de Rendimiento",
      description: "Recopilan información sobre cómo utilizas el sitio para mejorar su funcionamiento y rendimiento.",
      examples: "Páginas visitadas, tiempo de carga, errores",
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      icon: Globe,
      title: "Cookies de Terceros",
      description: "Utilizadas por servicios externos para proporcionar funcionalidades adicionales como analíticas y redes sociales.",
      examples: "Google Analytics, Stripe, redes sociales",
      color: "text-warning",
      bg: "bg-warning/10",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 w-full">
        
        {/* ==================== HEADER ==================== */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
            <Cookie size={32} className="text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-3">
            Política de <span className="text-gradient">Cookies</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-muted">
            <span className="flex items-center gap-1">
              <Shield size={14} className="text-success" />
              Última actualización: agosto 2026
            </span>
          </div>
          <p className="text-muted max-w-2xl mx-auto mt-4">
            En osmi utilizamos cookies para mejorar tu experiencia de navegación y ofrecerte un servicio más personalizado.
          </p>
        </div>

        {/* ==================== INTRODUCCIÓN ==================== */}
        <div className="glass-card p-6 sm:p-8 mb-8 border border-white/5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <AlertCircle size={18} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">¿Qué son las cookies?</h2>
              <p className="text-muted leading-relaxed">
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web. 
                Nos permiten recordar tus preferencias, mejorar el rendimiento del sitio y ofrecerte una experiencia más personalizada.
              </p>
              <p className="text-muted leading-relaxed mt-2">
                En osmi, utilizamos cookies de forma transparente y responsable, siempre priorizando tu privacidad y seguridad.
              </p>
            </div>
          </div>
        </div>

        {/* ==================== TIPOS DE COOKIES ==================== */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Settings size={22} className="text-secondary" />
            Tipos de cookies que utilizamos
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {cookieTypes.map((type, index) => (
              <div
                key={index}
                className="glass-card p-6 border border-white/5 hover:border-primary/20 transition-all duration-300 hover:glow-primary"
              >
                <div className={`w-10 h-10 rounded-full ${type.bg} flex items-center justify-center mb-3`}>
                  <type.icon size={18} className={type.color} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{type.title}</h3>
                <p className="text-sm text-muted leading-relaxed mb-3">{type.description}</p>
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="text-xs text-muted-dark">Ejemplos: <span className="text-foreground">{type.examples}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== GESTIÓN DE COOKIES ==================== */}
        <div className="glass-card p-6 sm:p-8 mb-8 border border-white/5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <Settings size={18} className="text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">¿Cómo gestionar tus cookies?</h2>
              <p className="text-muted leading-relaxed">
                Puedes gestionar tus preferencias de cookies en cualquier momento desde la configuración de tu navegador.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-dark">Chrome</p>
                  <p className="text-xs text-foreground">Configuración → Privacidad → Cookies</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-dark">Firefox</p>
                  <p className="text-xs text-foreground">Opciones → Privacidad → Cookies</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-dark">Safari</p>
                  <p className="text-xs text-foreground">Preferencias → Privacidad → Cookies</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-dark">Edge</p>
                  <p className="text-xs text-foreground">Configuración → Cookies y permisos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== COOKIES DE TERCEROS ==================== */}
        <div className="glass-card p-6 sm:p-8 mb-8 border border-white/5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
              <Globe size={18} className="text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">Cookies de terceros</h2>
              <p className="text-muted leading-relaxed">
                osmi utiliza servicios de terceros que pueden establecer cookies en tu dispositivo. Estos servicios nos ayudan a:
              </p>
              <ul className="space-y-2 mt-3">
                <li className="flex items-start gap-2 text-sm text-muted">
                  <CheckCircle size={14} className="text-success flex-shrink-0 mt-0.5" />
                  <span>Analizar el tráfico y comportamiento de los usuarios (Google Analytics)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted">
                  <CheckCircle size={14} className="text-success flex-shrink-0 mt-0.5" />
                  <span>Procesar pagos de forma segura (Stripe)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted">
                  <CheckCircle size={14} className="text-success flex-shrink-0 mt-0.5" />
                  <span>Ofrecer integración con redes sociales</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ==================== SEGURIDAD ==================== */}
        <div className="glass-card p-6 sm:p-8 mb-8 border border-white/5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-1">
              <Lock size={18} className="text-success" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">Seguridad y privacidad</h2>
              <p className="text-muted leading-relaxed">
                En osmi, nos tomamos muy en serio tu privacidad. Todas las cookies que utilizamos son seguras y no contienen información personal sensible.
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-xs text-muted border border-white/5">
                  <Shield size={12} className="text-success" />
                  Datos encriptados
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-xs text-muted border border-white/5">
                  <Lock size={12} className="text-success" />
                  SSL activo
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-xs text-muted border border-white/5">
                  <RefreshCw size={12} className="text-accent" />
                  Actualizado 2026
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== ENLACES RELACIONADOS ==================== */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/privacidad"
            className="glass-card p-5 border border-white/5 hover:border-primary/20 transition-all duration-300 flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield size={14} className="text-primary" />
              </div>
              <span className="text-sm font-semibold text-foreground">Política de privacidad</span>
            </div>
            <ChevronRight size={16} className="text-muted-dark group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>
          <Link
            href="/terminos"
            className="glass-card p-5 border border-white/5 hover:border-primary/20 transition-all duration-300 flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                <CheckCircle size={14} className="text-secondary" />
              </div>
              <span className="text-sm font-semibold text-foreground">Términos y condiciones</span>
            </div>
            <ChevronRight size={16} className="text-muted-dark group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* ==================== FOOTER DE PÁGINA ==================== */}
        <div className="mt-8 text-center text-xs text-muted-dark border-t border-white/5 pt-6">
          <p>© 2026 osmi. Todos los derechos reservados.</p>
          <p className="mt-1">
            Última actualización: <span className="text-muted">agosto 2026</span>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}