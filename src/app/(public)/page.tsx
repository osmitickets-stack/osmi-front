export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { EventCard } from "@/components/ui/EventCard";
import { Footer } from "@/components/navigation/Footer";
import { Music, Trophy, Theater, PartyPopper, Sparkles, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";
import { normalizeEvent, type NormalizedEvent } from "@/modules/events/utils/normalizer";

// ============================================================
// METADATA MEJORADA PARA SEO PREMIUM
// ============================================================
export const metadata = {
  title: "osmi | Boletos para conciertos, deportes y eventos | Compra segura",
  description: "Compra boletos para conciertos, deportes, teatro y festivales. osmi es la plataforma de ticketing más inteligente con entrega inmediata y soporte 24/7.",
  keywords: "boletos, conciertos, deportes, teatro, festivales, ticketing, eventos, osmi, compra de boletos, experiencias",
  openGraph: {
    title: "osmi | Boletos para conciertos, deportes y eventos",
    description: "Compra boletos seguros para los mejores eventos. Entrega inmediata y soporte 24/7.",
    type: "website",
    locale: "es_MX",
    siteName: "osmi",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "osmi - Boletos para eventos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "osmi | Boletos para eventos",
    description: "Compra boletos seguros para los mejores eventos.",
    images: ["/og-image.png"],
  },
};

// ============================================================
// DATOS
// ============================================================

async function getEvents(): Promise<NormalizedEvent[]> {
  try {
    const data = await api.get<any>("/v1/events");
    const rawEvents = Array.isArray(data) ? data : data?.events || [];
    return rawEvents.map(normalizeEvent);
  } catch { return []; }
}

const categories = [
  { icon: Music, label: "Conciertos", color: "text-primary", href: "/events?category=conciertos" },
  { icon: Trophy, label: "Deportes", color: "text-accent", href: "/events?category=deportes" },
  { icon: Theater, label: "Teatro", color: "text-secondary", href: "/events?category=teatro" },
  { icon: PartyPopper, label: "Festivales", color: "text-warning", href: "/events?category=festivales" },
  { icon: Sparkles, label: "Experiencias", color: "text-primary", href: "/events?category=experiencias" },
  { icon: Star, label: "Infantiles", color: "text-success", href: "/events?category=infantiles" },
];

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

export default async function HomePage() {
  const events = await getEvents();

  // Schema.org markup para eventos (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "osmi",
    description: "Plataforma de ticketing para conciertos, deportes, teatro y festivales.",
    url: "https://osmi.app",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://osmi.app/events?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      {/* JSON-LD para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="flex flex-col min-h-screen bg-black">
        <Navbar />
        <HeroSection />

        {/* ============================================================
            CATEGORÍAS - CON EFECTO NEÓN MEJORADO
        ============================================================ */}
        <section className="section-full bg-transparent py-16">
          <div className="section-inner">
            {/* Encabezado con gradiente */}
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest border border-primary/20 mb-4">
                DESCUBRE
              </span>
              <h2 className="text-3xl md:text-5xl font-black title-gradient">
                ¿Qué quieres vivir hoy?
              </h2>
              <p className="text-muted mt-3 text-sm max-w-md mx-auto">
                Explora miles de eventos y encuentra tu próxima experiencia inolvidable
              </p>
            </div>

            {/* Grid de categorías con efecto neón */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {categories.map(({ icon: Icon, label, color, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="glass-card p-6 flex flex-col items-center gap-3 text-center hover:glow-primary transition-all duration-300 group border-neon"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:shadow-glow">
                    <Icon size={26} className={`${color} group-hover:scale-110 transition-transform`} />
                  </div>
                  <span className="text-xs font-semibold text-foreground/80 group-hover:text-foreground transition-colors">
                    {label}
                  </span>
                  <div className="w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500"></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            EVENTOS DESTACADOS - CON EFECTO NEÓN
        ============================================================ */}
        {events.length > 0 && (
          <section className="section-full bg-transparent py-16 border-t border-white/5">
            <div className="section-inner">
              {/* Encabezado con efecto */}
              <div className="flex flex-col md:flex-row items-center justify-between mb-10">
                <div>
                  <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-bold tracking-widest border border-secondary/20 mb-3">
                    EVENTOS
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-foreground">
                    Próximos <span className="text-gradient">eventos</span>
                  </h2>
                </div>
                <Link
                  href="/events"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-primary transition-colors mt-4 md:mt-0"
                >
                  Ver todos
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Grid de eventos con efecto hover mejorado */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {events.slice(0, 4).map((event) => (
                  <div key={event.public_id} className="animate-fade-in-up" style={{ animationDelay: `${Math.random() * 0.3}s` }}>
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================================
            CONFIANZA - CON EFECTO NEÓN
        ============================================================ */}
        <section className="section-full bg-transparent py-16 border-t border-white/5">
          <div className="section-inner text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-1 h-1 rounded-full bg-primary animate-pulse"></div>
              <span className="text-xs text-muted-dark uppercase tracking-[0.3em] font-semibold">
                Confían en nosotros
              </span>
              <div className="w-1 h-1 rounded-full bg-primary animate-pulse"></div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {/* Marcas con efecto glow en hover */}
              {["Alas Wings", "Desfragmentado", "El País", "TechCrunch", "Forbes"].map((brand) => (
                <span
                  key={brand}
                  className="text-lg md:text-2xl font-bold text-muted-dark/50 hover:text-muted hover:scale-105 transition-all duration-300 cursor-default"
                >
                  {brand}
                </span>
              ))}
            </div>

            {/* Estadísticas de confianza */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="glass-card p-6 text-center">
                <div className="text-3xl md:text-4xl font-black text-gradient">25K+</div>
                <p className="text-xs text-muted mt-1">Eventos realizados</p>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-3xl md:text-4xl font-black text-gradient">4.9★</div>
                <p className="text-xs text-muted mt-1">Calificación promedio</p>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-3xl md:text-4xl font-black text-gradient">100%</div>
                <p className="text-xs text-muted mt-1">Seguridad garantizada</p>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-3xl md:text-4xl font-black text-gradient">24/7</div>
                <p className="text-xs text-muted mt-1">Soporte disponible</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            CALL TO ACTION - CON EFECTO NEÓN
        ============================================================ */}
        <section className="section-full bg-transparent py-16 border-t border-white/5">
          <div className="section-inner">
            <div className="glass-card p-12 md:p-16 text-center relative overflow-hidden border-neon">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5"></div>
              <div className="relative z-10">
                <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest border border-primary/20 mb-6">
                  COMUNIDAD
                </div>
                <h2 className="text-3xl md:text-5xl font-black title-gradient mb-4">
                  Únete a la comunidad
                </h2>
                <p className="text-muted max-w-lg mx-auto mb-8">
                  Sé parte de los primeros en enterarte de nuevos eventos y experiencias exclusivas.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <input
                    type="email"
                    placeholder="Tu correo electrónico"
                    className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-foreground placeholder-muted-dark focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all min-w-[280px]"
                  />
                  <button className="btn-primary px-8 py-3">
                    Suscribirme
                  </button>
                </div>
                <p className="text-xs text-muted-dark mt-4">
                  No enviamos spam. Puedes cancelar cuando quieras.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}