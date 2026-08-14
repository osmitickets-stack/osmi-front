import { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import Link from "next/link";
import {
  Calendar,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Smartphone,
  CreditCard,
  BarChart3,
  Target,
  Rocket,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Mail,
  MessageCircle,
  Star,
  Award,
  Clock,
  Globe,
  Fingerprint,
  Headphones,
  Gift,
  PartyPopper,
  Building2,
  Megaphone,
  Ticket,
  ChevronRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Para Organizadores - osmi | Publica tus eventos",
  description: "Publica tus eventos en osmi y llega a miles de asistentes. Dashboard en tiempo real, pagos seguros y mayor alcance.",
  keywords: "organizadores, publicar eventos, osmi, ticketing, boletos, eventos, promocionar",
};

export default function ParaOrganizadoresPage() {
  const benefits = [
    {
      icon: Rocket,
      title: "Visibilidad inmediata",
      description: "Tu evento llegará a miles de usuarios activos en nuestra plataforma",
      color: "text-primary",
      bg: "bg-primary/10",
      delay: "0s"
    },
    {
      icon: CreditCard,
      title: "Pagos seguros",
      description: "Cobros protegidos con Stripe y transferencias en tiempo real",
      color: "text-secondary",
      bg: "bg-secondary/10",
      delay: "0.1s"
    },
    {
      icon: BarChart3,
      title: "Dashboard en tiempo real",
      description: "Monitorea ventas, asistentes y estadísticas al instante",
      color: "text-accent",
      bg: "bg-accent/10",
      delay: "0.2s"
    },
    {
      icon: Shield,
      title: "Anti-fraude",
      description: "Protección avanzada contra bots y compras fraudulentas",
      color: "text-success",
      bg: "bg-success/10",
      delay: "0.3s"
    },
    {
      icon: Smartphone,
      title: "Acceso móvil",
      description: "Gestiona tu evento desde cualquier dispositivo",
      color: "text-warning",
      bg: "bg-warning/10",
      delay: "0.4s"
    },
    {
      icon: Headphones,
      title: "Soporte 24/7",
      description: "Asistencia dedicada para organizadores en todo momento",
      color: "text-primary",
      bg: "bg-primary/10",
      delay: "0.5s"
    },
  ];

  const steps = [
    {
      icon: Calendar,
      title: "Crea tu evento",
      description: "Completa los detalles: nombre, fecha, ubicación y descripción",
      color: "text-primary",
    },
    {
      icon: Ticket,
      title: "Define tus boletos",
      description: "Establece precios, categorías y cantidades disponibles",
      color: "text-secondary",
    },
    {
      icon: Megaphone,
      title: "Promociona",
      description: "Comparte tu evento en redes y llega a más asistentes",
      color: "text-accent",
    },
    {
      icon: Users,
      title: "Vende y gestiona",
      description: "Monitorea ventas y administra asistentes desde tu dashboard",
      color: "text-success",
    },
  ];

  const stats = [
    { value: "25K+", label: "Eventos realizados" },
    { value: "500K+", label: "Boletos vendidos" },
    { value: "4.9★", label: "Calificación promedio" },
    { value: "98%", label: "Satisfacción" },
  ];

  const testimonials = [
    {
      name: "Desfragmentado",
      role: "Artista musical",
      quote: "osmi me ha permitido conectar con mi audiencia de una manera increíble. La plataforma es intuitiva y el soporte es excepcional.",
      image: "D",
      rating: 5,
    },
    {
      name: "María Gómez",
      role: "Organizadora de festivales",
      quote: "Desde que uso osmi, mis eventos tienen mayor alcance y las ventas han aumentado un 40%. Es la mejor decisión que he tomado.",
      image: "M",
      rating: 5,
    },
  ];

  const faqs = [
    {
      q: "¿Cuánto cuesta publicar un evento?",
      a: "La publicación es gratuita. Solo pagas una comisión por boleto vendido, a partir del 5% del valor del boleto."
    },
    {
      q: "¿Cómo recibo el pago de mis ventas?",
      a: "Los pagos se procesan a través de Stripe y se transfieren a tu cuenta bancaria en un plazo de 3 a 5 días hábiles."
    },
    {
      q: "¿Puedo gestionar múltiples eventos?",
      a: "Sí, desde tu dashboard puedes crear y gestionar todos tus eventos de forma centralizada."
    },
    {
      q: "¿Qué tipo de eventos puedo publicar?",
      a: "Conciertos, deportes, teatro, festivales, experiencias y cualquier otro evento que requiera venta de boletos."
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      <main className="flex-1 w-full">
        
        {/* ============================================================
            HERO - CON PSICOLOGÍA DE VENTAS
        ============================================================ */}
        <section className="relative overflow-hidden py-16 sm:py-24">
          {/* Fondo */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-secondary/5 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItSDI0di2yaDEyek0zNiAyNHYySDI0di2yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest mb-6 animate-pulse-glow">
              <Sparkles size={14} />
              NUEVO
            </div>

            {/* Título principal */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-tight mb-4">
              Lleva tus eventos al
              <br />
              <span className="text-gradient">siguiente nivel</span>
            </h1>

            {/* Subtítulo */}
            <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-8">
              Publica tus eventos en la plataforma de ticketing más inteligente del planeta. 
              Llega a miles de asistentes y gestiona tus ventas en tiempo real.
            </p>

            {/* CTA Principal */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/organizador/registro"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <Rocket size={20} className="group-hover:translate-y-[-2px] transition-transform" />
                Registra tu evento
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#como-funciona"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-foreground font-semibold hover:bg-white/10 hover:border-primary/30 transition-all duration-300"
              >
                Ver cómo funciona
              </Link>
            </div>

            {/* Estadísticas sociales */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-12 mt-10">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-gradient">{stat.value}</div>
                  <div className="text-xs text-muted-dark mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Badges de confianza */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-xs text-muted border border-white/5">
                <Shield size={12} className="text-success" />
                Pago seguro
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-xs text-muted border border-white/5">
                <CheckCircle size={12} className="text-success" />
                Comisión justa
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-xs text-muted border border-white/5">
                <Clock size={12} className="text-accent" />
                Soporte 24/7
              </span>
            </div>
          </div>
        </section>

        {/* ============================================================
            BENEFICIOS - PSICOLOGÍA DE VENTAS
        ============================================================ */}
        <section className="py-16 sm:py-20 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="text-xs text-muted-dark uppercase tracking-[0.3em] font-semibold">Por qué osmi</span>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2">
                Todo lo que necesitas para
                <br />
                <span className="text-gradient">tener éxito</span>
              </h2>
              <p className="text-muted max-w-xl mx-auto mt-4">
                Descubre las herramientas que te ayudarán a vender más boletos y gestionar tus eventos de forma profesional.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="glass-card p-6 border border-white/5 hover:border-primary/20 transition-all duration-300 hover:glow-primary group animate-fade-in-up"
                  style={{ animationDelay: benefit.delay }}
                >
                  <div className={`w-12 h-12 rounded-2xl ${benefit.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon size={22} className={benefit.color} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            CÓMO FUNCIONA - UX CENTRADO
        ============================================================ */}
        <section id="como-funciona" className="py-16 sm:py-20 border-t border-white/5 bg-white/[0.02]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="text-xs text-muted-dark uppercase tracking-[0.3em] font-semibold">3 pasos simples</span>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2">
                Comienza en <span className="text-gradient">minutos</span>
              </h2>
              <p className="text-muted max-w-xl mx-auto mt-4">
                Publicar tu evento es más fácil de lo que piensas. Sigue estos pasos y empieza a vender.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div key={index} className="relative group">
                  {/* Línea conectora */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-[60%] w-[40%] h-0.5 bg-gradient-to-r from-primary/20 to-transparent" />
                  )}
                  
                  <div className="glass-card p-6 text-center border border-white/5 hover:border-primary/20 transition-all duration-300 hover:glow-primary group-hover:-translate-y-1">
                    <div className="relative inline-block">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4 border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                        <step.icon size={24} className="text-primary" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA intermedio */}
            <div className="text-center mt-10">
              <Link
                href="/organizador/registro"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <Zap size={18} />
                Quiero publicar mi evento
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================
            TESTIMONIALS - PRUEBA SOCIAL
        ============================================================ */}
        <section className="py-16 sm:py-20 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="text-xs text-muted-dark uppercase tracking-[0.3em] font-semibold">Testimonios</span>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2">
                Lo que dicen los <span className="text-gradient">organizadores</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="glass-card p-6 sm:p-8 border border-white/5 hover:border-primary/20 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {testimonial.image}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-foreground">{testimonial.name}</h3>
                        <div className="flex gap-0.5">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} size={14} className="fill-warning text-warning" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-dark">{testimonial.role}</p>
                      <p className="text-sm text-muted mt-2 leading-relaxed">"{testimonial.quote}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            PREGUNTAS FRECUENTES
        ============================================================ */}
        <section className="py-16 sm:py-20 border-t border-white/5 bg-white/[0.02]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="text-xs text-muted-dark uppercase tracking-[0.3em] font-semibold">Preguntas frecuentes</span>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2">
                Resolvemos tus <span className="text-gradient">dudas</span>
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="glass-card p-5 sm:p-6 border border-white/5 hover:border-primary/20 transition-all duration-300">
                  <h3 className="font-bold text-foreground text-sm flex items-start gap-2">
                    <span className="text-primary">Q:</span>
                    {faq.q}
                  </h3>
                  <p className="text-sm text-muted mt-2 pl-6">
                    <span className="text-secondary">R:</span> {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            CTA FINAL - CON PSICOLOGÍA DE URGENCIA
        ============================================================ */}
        <section className="py-16 sm:py-20 border-t border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
          
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="glass-card p-8 sm:p-12 border border-primary/20 glow-primary">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <PartyPopper size={32} className="text-primary" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
                ¿Listo para <span className="text-gradient">empezar?</span>
              </h2>
              <p className="text-muted text-lg max-w-lg mx-auto mb-8">
                Únete a miles de organizadores que ya confían en osmi para vender sus boletos y hacer crecer sus eventos.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/organizador/registro"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02] active:scale-95"
                >
                  <Rocket size={20} className="group-hover:translate-y-[-2px] transition-transform" />
                  Registra tu evento ahora
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-foreground font-semibold hover:bg-white/10 hover:border-primary/30 transition-all duration-300"
                >
                  <MessageCircle size={18} />
                  Hablar con un asesor
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-muted-dark">
                <span className="flex items-center gap-1">
                  <CheckCircle size={12} className="text-success" />
                  Comisión desde 5%
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle size={12} className="text-success" />
                  Sin costos ocultos
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle size={12} className="text-success" />
                  Pagos rápidos
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}