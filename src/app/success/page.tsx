"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { useCartStore } from "@/store/cart";
import {
  CheckCircle,
  Ticket,
  Mail,
  Calendar,
  MapPin,
  Clock,
  Download,
  Share2,
  ArrowRight,
  Sparkles,
  Star,
  Gift,
  ChevronRight,
  Music,
  Users,
  Shield,
  Printer
} from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Limpiar carrito y datos temporales
    clearCart();
    sessionStorage.removeItem("osmi_order_id");
    sessionStorage.removeItem("osmi_client_secret");

    // Recuperar datos
    const savedOrder = sessionStorage.getItem("osmi_order_id") || "";
    const savedEmail = localStorage.getItem("osmi_checkout_email") || "";
    
    // Generar número de orden si no existe
    if (!savedOrder) {
      const randomOrder = "OSMI-" + Math.random().toString(36).substring(2, 10).toUpperCase();
      setOrderNumber(randomOrder);
    } else {
      setOrderNumber(savedOrder);
    }
    setEmail(savedEmail);

    // Activar confeti después de un momento
    setTimeout(() => setShowConfetti(true), 500);

    // Limpiar datos de checkout
    localStorage.removeItem("osmi_checkout_email");
    localStorage.removeItem("osmi_checkout_name");
  }, [clearCart]);

  // Eventos de ejemplo (simulados)
  const purchasedEvents = [
    {
      name: "Colabora con Desfragmentado",
      date: "sábado, 8 de agosto de 2026",
      time: "09:32 p.m.",
      location: "Estudio Frequency404",
      tickets: [
        { type: "Sesión de una foto con Desfra", quantity: 1, price: 10 },
        { type: "Sesión de Composición", quantity: 1, price: 8000 },
      ]
    }
  ];

  const total = purchasedEvents.reduce((sum, event) => 
    sum + event.tickets.reduce((s, t) => s + t.price * t.quantity, 0), 0
  );

  return (
    <div className="min-h-screen flex flex-col bg-black overflow-hidden">
      
      {/* ==================== FONDO DE CELEBRACIÓN ==================== */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-success/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-success/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* ==================== CONFETI ANIMADO ==================== */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: Math.random() * 100 + "%",
                top: "-10%",
                width: Math.random() * 8 + 4 + "px",
                height: Math.random() * 8 + 4 + "px",
                background: ["#ff2bd6", "#7b61ff", "#00d1ff", "#22c55e", "#f59e0b", "#ef4444"][Math.floor(Math.random() * 6)],
                borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                animationDuration: Math.random() * 3 + 2 + "s",
                animationDelay: Math.random() * 2 + "s",
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      )}

      {/* ==================== ESTRELLAS FLOTANTES ==================== */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-success/20 animate-float"
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDuration: Math.random() * 4 + 3 + "s",
              animationDelay: Math.random() * 3 + "s",
              fontSize: Math.random() * 20 + 10 + "px",
            }}
          >
            ✦
          </div>
        ))}
      </div>

      <Navbar />

      {/* ==================== CONTENIDO PRINCIPAL ==================== */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 w-full relative z-10">
        
        {/* Card de éxito */}
        <div className="glass-card p-8 sm:p-12 border border-success/20 glow-success animate-fade-in-up relative overflow-hidden">
          
          {/* Efecto de brillo de éxito */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-success/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

          <div className="relative z-10 text-center">
            
            {/* Icono de éxito con animación */}
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-success/10 border-4 border-success/20 mb-6 animate-float">
              <CheckCircle size={56} className="text-success animate-pulse-glow" />
            </div>

            {/* Badge de confirmación */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 text-success text-xs font-bold tracking-widest mb-4">
              <Sparkles size={14} />
              COMPRA CONFIRMADA
            </div>

            {/* Título */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-3">
              ¡Tu compra fue exitosa! 🎉
            </h1>

            {/* Subtítulo */}
            <p className="text-muted text-base sm:text-lg max-w-xl mx-auto mb-6">
              Tus boletos han sido enviados a tu correo. Revisa tu bandeja de entrada.
            </p>

            {/* Número de orden */}
            <div className="bg-white/5 rounded-2xl px-6 py-3 inline-block border border-white/10 mb-6">
              <p className="text-xs text-muted-dark">NÚMERO DE ORDEN</p>
              <p className="text-lg font-mono font-bold text-primary tracking-wider">
                {orderNumber || "OSMI-XXXXXX"}
              </p>
            </div>

            {/* Email de confirmación */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted mb-8">
              <Mail size={16} className="text-secondary" />
              <span>Recibirás un correo en</span>
              <span className="text-foreground font-semibold">{email || "tu@correo.com"}</span>
            </div>

            {/* ==================== BOLETOS COMPRADOS ==================== */}
            <div className="text-left mb-8">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Ticket size={20} className="text-primary" />
                Boletos adquiridos
              </h3>

              <div className="space-y-4">
                {purchasedEvents.map((event, index) => (
                  <div key={index} className="bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-primary/20 transition-all">
                    <h4 className="font-bold text-foreground text-lg mb-2">
                      {event.name}
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-secondary" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-secondary" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 sm:col-span-2">
                        <MapPin size={14} className="text-secondary" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="border-t border-white/10 pt-3 space-y-1">
                      {event.tickets.map((ticket, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-muted">{ticket.type} x{ticket.quantity}</span>
                          <span className="text-foreground font-medium">
                            ${(ticket.price * ticket.quantity).toLocaleString("es-MX")}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between text-sm font-bold pt-2 border-t border-white/5">
                        <span className="text-foreground">Total</span>
                        <span className="text-primary">
                          ${event.tickets.reduce((s, t) => s + t.price * t.quantity, 0).toLocaleString("es-MX")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ==================== ACCIONES ==================== */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button
                onClick={() => router.push("/dashboard")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <Ticket size={18} />
                Ver mis boletos
                <ChevronRight size={16} />
              </button>
              <button
                onClick={() => router.push("/events")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-foreground font-semibold hover:bg-white/10 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <ArrowRight size={18} />
                Explorar más eventos
              </button>
            </div>

            {/* ==================== ACCIONES SECUNDARIAS ==================== */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-dark">
              <button className="flex items-center gap-1.5 hover:text-muted transition-colors px-3 py-2 rounded-lg hover:bg-white/5">
                <Download size={14} />
                Descargar comprobante
              </button>
              <span className="w-px h-4 bg-white/10" />
              <button className="flex items-center gap-1.5 hover:text-muted transition-colors px-3 py-2 rounded-lg hover:bg-white/5">
                <Printer size={14} />
                Imprimir
              </button>
              <span className="w-px h-4 bg-white/10" />
              <button className="flex items-center gap-1.5 hover:text-muted transition-colors px-3 py-2 rounded-lg hover:bg-white/5">
                <Share2 size={14} />
                Compartir
              </button>
            </div>

            {/* ==================== BADGES DE SEGURIDAD ==================== */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8 pt-6 border-t border-white/10 text-xs text-muted-dark">
              <span className="flex items-center gap-1.5">
                <Shield size={14} className="text-success" />
                Pago seguro
              </span>
              <span className="w-px h-3 bg-white/10" />
              <span className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-success" />
                Confirmación inmediata
              </span>
              <span className="w-px h-3 bg-white/10" />
              <span className="flex items-center gap-1.5">
                <Mail size={14} className="text-secondary" />
                Boletos por email
              </span>
            </div>
          </div>
        </div>

        {/* ==================== RECOMENDACIONES ==================== */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Gift size={22} className="text-primary" />
              También te puede interesar
            </h2>
            <Link href="/events" className="text-sm text-primary hover:text-secondary transition-colors flex items-center gap-1">
              Ver todos
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: "Tienda Física osmi",
                description: "Recoge premios y compra merchandise exclusivo",
                image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=200&fit=crop",
                href: "/tienda",
                badge: "Próximamente"
              },
              {
                name: "Escuela de Arte",
                description: "Aprende con los mejores artistas",
                image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=200&fit=crop",
                href: "/escuela-arte",
                badge: "Próximamente"
              },
              {
                name: "Escuela de Tatuaje",
                description: "Formación profesional en tatuaje",
                image: "https://res.cloudinary.com/dkasxv8fj/image/upload/v1780564936/WhatsApp_Image_2026-03-08_at_7.52.00_PM_cog96f.jpg",
                href: "/escuela-tatuaje",
                badge: "Próximamente"
              }
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="glass-card overflow-hidden group hover:glow-primary transition-all border border-white/10 hover:border-primary/20"
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white/80 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-dark mt-0.5">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      {/* ==================== ESTILOS DEL CONFETI ==================== */}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti-fall linear forwards;
        }
      `}</style>
    </div>
  );
}