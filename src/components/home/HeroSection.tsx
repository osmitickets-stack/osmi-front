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
  Clock,
  Users,
} from "lucide-react";

import { api } from "@/lib/api";
import {
  normalizeEvent,
  type NormalizedEvent,
} from "@/modules/events/utils/normalizer";

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

  // Buscar el evento de Desfragmentado específicamente
  const desfragmentadoEvent = events.find(
    (e) => e.name?.toLowerCase().includes("desfragmentado") || 
           e.slug?.includes("desfragmentado") ||
           e.organizer?.toLowerCase().includes("desfragmentado")
  );

  // Usar el evento de Desfragmentado como destacado si existe, si no el primero
  const featuredEvent = desfragmentadoEvent || events.find((e) => e.image_url) || events[0] || null;

  const allSlides = [
    ...AD_SLIDES.map((ad) => ({ type: "ad" as const, ...ad })),
    ...events.map((event) => ({ type: "event" as const, event })),
  ];

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

  const formattedDate = featuredEvent
    ? new Date(featuredEvent.start_date).toLocaleDateString("es-MX", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "";

  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-4">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 sm:gap-8">

        {/* ============================================================
            CARRUSEL
        ============================================================ */}
        <div className="relative overflow-hidden rounded-[30px] sm:rounded-[40px] border border-white/[0.06] min-h-[400px] sm:min-h-[520px] lg:min-h-[600px] flex items-end group">
          
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

          {/* Gradientes mejorados para legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {/* Indicadores arriba */}
          {allSlides.length > 1 && (
            <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 sm:gap-2">
              {allSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-300 ${
                    i === currentIndex
                      ? "w-6 sm:w-8 h-1.5 bg-primary rounded-full shadow-lg shadow-primary/40"
                      : "w-1.5 h-1.5 rounded-full bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Ir al slide ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* Flechas - MÁS GRANDES Y VISIBLES */}
          {allSlides.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/70 backdrop-blur-xl border border-white/15 flex items-center justify-center text-white hover:bg-black/90 hover:border-primary/40 transition-all duration-300 hover:scale-105 active:scale-95"
                aria-label="Anterior"
              >
                <ChevronLeft size={20} className="sm:size-6" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/70 backdrop-blur-xl border border-white/15 flex items-center justify-center text-white hover:bg-black/90 hover:border-primary/40 transition-all duration-300 hover:scale-105 active:scale-95"
                aria-label="Siguiente"
              >
                <ChevronRight size={20} className="sm:size-6" />
              </button>
            </>
          )}

          {/* CONTENIDO - CENTRADO CON BUEN ESPACIO */}
          <div className="relative z-10 p-6 sm:p-8 lg:p-10 xl:p-14 w-full max-w-2xl">
            {/* Badge con borde neón */}
            <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] mb-3 sm:mb-4">
              {slide.type === "ad" ? slide.badge : slide.event?.min_price > 0 ? "Boletos disponibles" : "Próximamente"}
            </span>

            {/* Título con sombra para legibilidad */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-[0.95] tracking-tight mb-3 sm:mb-4 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {slide.type === "ad" ? slide.title : slide.event?.name}
            </h1>

            {/* Descripción - CON FONDO OSCURO Y BLUR */}
            <div className="bg-black/50 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-white/10 mb-3 sm:mb-4">
              <p className="text-sm sm:text-base text-gray-200 max-w-xl leading-relaxed drop-shadow-sm">
                {slide.type === "ad" 
                  ? slide.description 
                  : slide.event?.description?.length > 120 
                    ? slide.event?.description?.slice(0, 120) + "..." 
                    : slide.event?.description
                }
              </p>
            </div>

            {/* Fecha y ubicación - CON FONDO OSCURO */}
            {slide.type === "event" && (
              <div className="bg-black/50 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-white/10 mb-4 sm:mb-6">
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="sm:size-4 text-secondary" />
                    <span className="drop-shadow-sm">
                      {new Date(slide.event.start_date).toLocaleDateString("es-MX", { 
                        weekday: "long", 
                        day: "numeric", 
                        month: "long",
                        year: "numeric"
                      })}
                    </span>
                  </div>
                  {slide.event.location && (
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="sm:size-4 text-secondary" />
                      <span className="drop-shadow-sm">{slide.event.location}</span>
                    </div>
                  )}
                  {slide.event.start_time && (
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="sm:size-4 text-secondary" />
                      <span className="drop-shadow-sm">{slide.event.start_time}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Botones - MÁS GRANDES Y CON MEJOR UX */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link
                href={slide.type === "ad" ? slide.link : `/events/${slide.event?.public_id}`}
                className="inline-flex items-center gap-2 px-7 sm:px-9 py-4 sm:py-4.5 rounded-full bg-gradient-to-r from-primary to-primary/80 text-sm sm:text-base font-bold text-white hover:from-primary/90 hover:to-primary/70 transition-all shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 active:scale-95 min-h-[52px] sm:min-h-[56px]"
              >
                {slide.type === "ad" ? slide.linkText : "Comprar boletos"}
                <ArrowRight size={18} className="sm:size-5" />
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-7 sm:px-9 py-4 sm:py-4.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-sm sm:text-base font-semibold text-white hover:bg-white/20 hover:border-primary/30 transition-all hover:scale-105 active:scale-95 min-h-[52px] sm:min-h-[56px]"
              >
                Explorar más
              </Link>
            </div>
          </div>
        </div>

        {/* ============================================================
            PANEL DERECHO - EVENTO DESTACADO MEJORADO
        ============================================================ */}
        {featuredEvent && (
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Evento destacado - CON BOTONES MÁS GRANDES Y TEXTO LEGIBLE */}
            <div className="glass-card overflow-hidden relative flex-1 min-h-[200px] sm:min-h-[280px] border border-white/10 hover:border-primary/20 transition-all duration-300">
              {featuredEvent.image_url && (
                <div className="absolute inset-0">
                  <Image
                    src={featuredEvent.image_url}
                    alt={featuredEvent.name}
                    fill
                    className="object-cover opacity-25"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] to-secondary/[0.04]" />
              <div className="relative z-10 p-5 sm:p-7 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="badge badge-hot text-[10px] sm:text-xs">DESTACADO</span>
                    {featuredEvent.min_price > 0 && (
                      <span className="text-[10px] sm:text-xs text-primary font-bold">
                        ${featuredEvent.min_price.toLocaleString("es-MX")}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white line-clamp-2 drop-shadow-md">
                    {featuredEvent.name}
                  </h3>
                  <div className="mt-2 space-y-1.5 text-xs sm:text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <Calendar size={12} className="sm:size-3.5 text-secondary flex-shrink-0" />
                      <span className="line-clamp-1 drop-shadow-sm">{formattedDate}</span>
                    </div>
                    {featuredEvent.location && (
                      <div className="flex items-center gap-2">
                        <MapPin size={12} className="sm:size-3.5 text-secondary flex-shrink-0" />
                        <span className="line-clamp-1 drop-shadow-sm">{featuredEvent.location}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Botón más grande */}
                <div className="mt-4 sm:mt-5">
                  <Link
                    href={`/events/${featuredEvent.public_id}`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-primary to-primary/80 text-sm font-bold text-white hover:from-primary/90 hover:to-primary/70 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] active:scale-95 min-h-[44px] sm:min-h-[48px]"
                  >
                    Ver evento
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Noticias - CON BOTÓN MÁS GRANDE */}
            <div className="glass-card p-5 sm:p-7 relative overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/[0.04] to-primary/[0.02]" />
              <div className="relative z-10">
                <h3 className="text-base sm:text-lg font-black text-white">Noticias osmi</h3>
                <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                  {events.slice(0, 3).map((e, i) => (
                    <Link
                      key={e.public_id}
                      href={`/events/${e.public_id}`}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/[0.04] transition-all group"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-xs font-bold text-primary shrink-0 group-hover:bg-primary/10 transition-colors">
                        {i + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-semibold truncate group-hover:text-primary transition-colors text-white">
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
                  className="block w-full text-center mt-4 sm:mt-5 py-3 sm:py-3.5 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-white hover:bg-white/10 hover:border-primary/30 transition-all hover:scale-[1.02] active:scale-95"
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