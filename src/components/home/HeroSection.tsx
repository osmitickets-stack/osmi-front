"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import {
  ArrowRight,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Search,
  Sparkles,
  Users,
  Star,
  Mic2,
} from "lucide-react";

import { api } from "@/lib/api";
import {
  normalizeEvent,
  type NormalizedEvent,
} from "@/modules/events/utils/normalizer";

// ============================================================
// IMÁGENES DE CLOUDINARY
// ============================================================
const CLOUDINARY_BASE = "https://res.cloudinary.com/dkasxv8fj/image/upload";

const AD_SLIDES = [
  {
    id: "beneficios",
    title: "Beneficios osmi",
    description:
      "Regístrate y obtén acceso a preventas exclusivas, descuentos especiales, experiencias VIP y soporte prioritario.",
    link: "/register",
    linkText: "Registrarme ahora",
    color: "from-secondary/40 via-primary/20",
    badge: "EXCLUSIVO",
    image: `${CLOUDINARY_BASE}/v1779219665/WhatsApp_Image_2026-05-09_at_2.02.54_PM_mxqy93.jpg`,
  },
  {
    id: "organizadores",
    title: "Para Organizadores",
    description:
      "Publica tus eventos con nosotros. Dashboard en tiempo real, pagos seguros y mayor alcance.",
    link: "/organizadores",
    linkText: "Saber más",
    color: "from-primary/40 via-secondary/20",
    badge: "ORGANIZADORES",
    image: `${CLOUDINARY_BASE}/v1779177598/studio2.jpg`,
  },
  {
    id: "tienda",
    title: "Tienda Física osmi",
    description:
      "Recoge premios, merchandise exclusivo y conoce nuestra tienda oficial.",
    link: "/tienda",
    linkText: "Cómo llegar",
    color: "from-orange-500/30 via-primary/20",
    badge: "TIENDA",
    image: `${CLOUDINARY_BASE}/v1779219665/WhatsApp_Image_2026-05-09_at_2.02.54_PM_mxqy93.jpg`,
  },
];

export const HeroSection = () => {
  const [events, setEvents] = useState<NormalizedEvent[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await api.get<any>("/v1/events");
        const rawEvents = Array.isArray(data) ? data : data?.events || [];
        const normalized = rawEvents.map(normalizeEvent);
        setEvents(normalized);
      } catch (err) {
        console.error("Error cargando eventos:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const allSlides = [
    ...AD_SLIDES.map((ad) => ({ type: "ad" as const, ...ad })),
    ...events.map((event) => ({ type: "event" as const, event })),
  ];

  // Auto-slide
  useEffect(() => {
    if (allSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [allSlides.length]);

  const goTo = useCallback((index: number) => setCurrentIndex(index), []);
  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % allSlides.length);
  }, [allSlides.length]);
  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + allSlides.length) % allSlides.length);
  }, [allSlides.length]);

  if (loading) {
    return (
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-4">
        <div className="rounded-[40px] border border-white/[0.06] min-h-[400px] sm:min-h-[520px] lg:min-h-[600px] bg-white/[0.02] animate-pulse" />
      </section>
    );
  }

  if (allSlides.length === 0) return null;

  const slide = allSlides[currentIndex];
  const featuredEvent = events.find((e) => e.image_url) || events[0] || null;

  const formattedDate = featuredEvent
    ? new Date(featuredEvent.start_date).toLocaleDateString("es-MX", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "";

  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-4">
      {/* ============================================================
          BUSCADOR - ARREGLADO (lupa y texto bien espaciados)
      ============================================================ */}
      <div className="mb-6 sm:mb-8">
        <div className="glass-card p-1.5 flex items-center gap-2 max-w-2xl mx-auto border border-white/5 hover:border-primary/20 transition-all duration-300">
          <div className="pl-4 text-muted-dark flex-shrink-0">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Buscar eventos, artistas o lugares..."
            className="w-full px-3 py-3 bg-transparent text-foreground placeholder-muted-dark focus:outline-none text-sm sm:text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn-primary px-4 sm:px-6 py-2.5 text-sm rounded-full whitespace-nowrap flex-shrink-0 mr-1">
            Buscar
          </button>
        </div>

        {/* Tags populares */}
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {["Conciertos", "Deportes", "Teatro", "Festivales", "Experiencias"].map((tag) => (
            <Link
              key={tag}
              href={`/events?category=${tag.toLowerCase()}`}
              className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/5 text-muted hover:text-foreground hover:border-primary/20 transition-all duration-300"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* ============================================================
          HERO PRINCIPAL
      ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 sm:gap-8">
        {/* CARRUSEL */}
        <div className="relative overflow-hidden rounded-[30px] sm:rounded-[40px] border border-white/[0.06] min-h-[400px] sm:min-h-[520px] lg:min-h-[600px] flex items-end group">
          {/* Imagen de fondo */}
          <div className="absolute inset-0 transition-opacity duration-700">
            {slide.type === "event" && slide.event?.image_url ? (
              <Image
                src={slide.event.image_url}
                alt={slide.event.name}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : slide.type === "ad" && slide.image ? (
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.type === "ad" ? slide.color : "from-secondary/40 via-primary/20"} to-background`} />
            )}
          </div>

          {/* Gradientes overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

          {/* ============================================================
              FLECHAS DEL CARRUSEL - SIEMPRE VISIBLES EN MÓVIL
          ============================================================ */}
          {allSlides.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-black/80 hover:border-primary/30 transition-all duration-300 opacity-70 sm:opacity-0 sm:group-hover:opacity-100"
                aria-label="Anterior"
              >
                <ChevronLeft size={18} className="sm:size-5" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-black/80 hover:border-primary/30 transition-all duration-300 opacity-70 sm:opacity-0 sm:group-hover:opacity-100"
                aria-label="Siguiente"
              >
                <ChevronRight size={18} className="sm:size-5" />
              </button>
            </>
          )}

          {/* Indicadores del carrusel */}
          {allSlides.length > 1 && (
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 sm:gap-2">
              {allSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-300 ${
                    i === currentIndex
                      ? "w-6 sm:w-8 h-2 bg-primary rounded-full"
                      : "w-2 h-2 rounded-full bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Ir al slide ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* Contenido del slide */}
          <div className="relative z-10 p-6 sm:p-8 lg:p-12 xl:p-16 w-full max-w-2xl">
            <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] mb-4 sm:mb-6">
              {slide.type === "ad" ? slide.badge : slide.event?.min_price > 0 ? "Boletos disponibles" : "Próximamente"}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-[0.95] tracking-tight mb-3 sm:mb-4 text-white">
              {slide.type === "ad" ? slide.title : slide.event?.name}
            </h1>

            <p className="text-sm sm:text-base text-muted max-w-xl leading-relaxed mb-4 sm:mb-6 line-clamp-2">
              {slide.type === "ad" ? slide.description : slide.event?.description}
            </p>

            {slide.type === "event" && (
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="sm:size-4 text-secondary" />
                  <span>{new Date(slide.event.start_date).toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" })}</span>
                </div>
                {slide.event.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="sm:size-4 text-secondary" />
                    <span>{slide.event.location}</span>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link
                href={slide.type === "ad" ? slide.link : `/events/${slide.event?.public_id}`}
                className="inline-flex items-center gap-2 px-5 sm:px-8 py-2.5 sm:py-4 rounded-full bg-primary text-sm font-bold text-white hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
              >
                {slide.type === "ad" ? slide.linkText : "Ver evento"}
                <ArrowRight size={16} className="sm:size-4" />
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-5 sm:px-8 py-2.5 sm:py-4 rounded-full bg-white/[0.04] border border-white/[0.06] text-sm font-semibold text-foreground hover:bg-white/[0.08] transition-all"
              >
                Explorar más
              </Link>
            </div>
          </div>
        </div>

        {/* ============================================================
            PANEL DERECHO
        ============================================================ */}
        {featuredEvent && (
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Evento destacado */}
            <div className="glass-card overflow-hidden relative flex-1 min-h-[200px] sm:min-h-[280px]">
              {featuredEvent.image_url && (
                <div className="absolute inset-0">
                  <Image
                    src={featuredEvent.image_url}
                    alt={featuredEvent.name}
                    fill
                    className="object-cover opacity-30"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] to-secondary/[0.06]" />
              <div className="relative z-10 p-5 sm:p-8 h-full flex flex-col justify-between">
                <div>
                  <span className="badge badge-hot text-[10px] sm:text-xs">DESTACADO</span>
                  <h3 className="text-base sm:text-xl font-black mt-3 sm:mt-4 line-clamp-2">{featuredEvent.name}</h3>
                  <div className="mt-3 sm:mt-4 space-y-2 text-xs sm:text-sm text-muted">
                    <div className="flex items-center gap-2">
                      <Calendar size={12} className="sm:size-4 text-secondary" />
                      <span className="line-clamp-1">{formattedDate}</span>
                    </div>
                    {featuredEvent.location && (
                      <div className="flex items-center gap-2">
                        <MapPin size={12} className="sm:size-4 text-secondary" />
                        <span className="line-clamp-1">{featuredEvent.location}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 sm:mt-6">
                  <div>
                    {featuredEvent.min_price > 0 ? (
                      <>
                        <p className="text-[10px] sm:text-xs text-muted-dark">Desde</p>
                        <p className="text-xl sm:text-2xl font-black text-primary">
                          ${featuredEvent.min_price.toLocaleString("es-MX")}
                        </p>
                      </>
                    ) : (
                      <p className="text-xs sm:text-sm text-muted-dark">Consulta disponibilidad</p>
                    )}
                  </div>
                  <Link
                    href={`/events/${featuredEvent.public_id}`}
                    className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-primary text-xs sm:text-sm font-bold text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                  >
                    Ver
                  </Link>
                </div>
              </div>
            </div>

            {/* Noticias */}
            <div className="glass-card p-5 sm:p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/[0.06] to-primary/[0.04]" />
              <div className="relative z-10">
                <h3 className="text-base sm:text-lg font-black">Noticias osmi</h3>
                <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                  {events.slice(0, 3).map((e, i) => (
                    <Link
                      key={e.public_id}
                      href={`/events/${e.public_id}`}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/[0.04] transition-all group"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-xs font-bold text-primary shrink-0">
                        {i + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-semibold truncate group-hover:text-primary transition-colors">
                          {e.name}
                        </p>
                        <p className="text-[10px] sm:text-xs text-muted-dark truncate">
                          {new Date(e.start_date).toLocaleDateString("es-MX", { day: "numeric", month: "short" })}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/events"
                  className="block w-full text-center mt-4 sm:mt-6 py-2.5 sm:py-3 rounded-full bg-primary text-xs sm:text-sm font-bold text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  Ver todos los eventos
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};