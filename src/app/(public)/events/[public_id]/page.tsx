// src/app/(public)/events/[public_id]/page.tsx

import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import { Calendar, MapPin, Clock, Users, Music, Sparkles, ArrowRight, Share2, Heart } from "lucide-react";

import EventMapWrapper from "@/components/events/EventMapWrapper";
import BuyTicketCard from "@/components/events/BuyTicketCard";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { api } from "@/lib/api";

import {
  normalizeEvent,
  type NormalizedEvent,
} from "@/modules/events/utils/normalizer";

// ============================================================
// FETCH CACHEADO
// ============================================================
const getEvent = cache(
  async (public_id: string): Promise<NormalizedEvent | null> => {
    try {
      const raw = await api.get<any>(`/v1/events/${public_id}`);
      const normalized = normalizeEvent(raw);
      return {
        ...normalized,
        latitude: raw.latitude ?? normalized.latitude,
        longitude: raw.longitude ?? normalized.longitude,
      };
    } catch (error) {
      console.error("Error fetching event:", error);
      return null;
    }
  }
);

// ============================================================
// SEO DINÁMICO
// ============================================================
export async function generateMetadata({
  params,
}: {
  params: Promise<{ public_id: string }>;
}): Promise<Metadata> {
  const { public_id } = await params;

  try {
    const event = await getEvent(public_id);

    if (!event) {
      return {
        title: "Evento no encontrado - osmi",
      };
    }

    return {
      title: `${event.name} - osmi`,
      description:
        event.description?.slice(0, 160) ||
        `Compra boletos para ${event.name} en ${event.location}. ¡Vive la experiencia con osmi!`,
      openGraph: {
        title: `${event.name} - osmi Tickets`,
        description: event.description?.slice(0, 160) || "",
        images: event.image_url ? [event.image_url] : [],
        type: "website",
        locale: "es_MX",
      },
    };
  } catch {
    return {
      title: "Evento no encontrado - osmi",
    };
  }
}

// ============================================================
// PÁGINA PRINCIPAL
// ============================================================
export default async function EventPage({
  params,
}: {
  params: Promise<{ public_id: string }>;
}) {
  const { public_id } = await params;

  const event = await getEvent(public_id);

  if (!event) {
    notFound();
  }

  const formattedDate = new Date(event.start_date).toLocaleDateString(
    "es-MX",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const formattedTime = new Date(event.start_date).toLocaleTimeString(
    "es-MX",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  // Determinar si es el evento de Desfragmentado
  const isDesfragmentado = event.name?.toLowerCase().includes("desfragmentado") ||
                          event.slug?.includes("desfragmentado");

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />

      {/* ============================================================
          HERO - MEJORADO
      ============================================================ */}
      <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
        {event.image_url ? (
          <>
            <Image 
              src={event.image_url}
              alt={event.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
            
            {/* Efecto de brillo */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-secondary via-primary/30 to-background flex items-center justify-center">
            <span className="text-8xl font-bold text-gradient opacity-20">
              OSMI
            </span>
          </div>
        )}

        {/* INFO SOBRE EL HERO - MEJORADA */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12 z-10">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-primary ring-1 ring-primary/30">
                {event.min_price > 0
                  ? `Desde $${event.min_price.toLocaleString("es-MX")} MXN`
                  : "Boletos pronto disponibles"}
              </span>
              {isDesfragmentado && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/20 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-secondary ring-1 ring-secondary/30">
                  <Sparkles size={12} />
                  Colaboración exclusiva
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
              {event.name}
            </h1>

            <div className="flex flex-wrap gap-3 sm:gap-5 text-sm sm:text-base text-gray-300">
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10">
                <Calendar size={16} className="text-secondary flex-shrink-0" />
                <span className="drop-shadow-sm">{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10">
                <Clock size={16} className="text-secondary flex-shrink-0" />
                <span className="drop-shadow-sm">{formattedTime}</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10">
                <MapPin size={16} className="text-secondary flex-shrink-0" />
                <span className="drop-shadow-sm">{event.location || "Ubicación por confirmar"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción flotantes */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/70 hover:border-primary/30 transition-all">
            <Heart size={18} />
          </button>
          <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/70 hover:border-primary/30 transition-all">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* ============================================================
          CONTENIDO PRINCIPAL
      ============================================================ */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* COLUMNA IZQUIERDA */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* DESCRIPCIÓN - MEJORADA */}
            {event.description && (
              <section className="glass-card p-6 sm:p-8 border border-white/10">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles size={20} className="text-primary" />
                  Sobre el evento
                </h2>
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {event.description}
                </div>
              </section>
            )}

            {/* LINEUP - MEJORADO */}
            <section className="glass-card p-6 sm:p-8 border border-white/10">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Users size={20} className="text-secondary" />
                Lineup
              </h2>
              <div className="flex items-center gap-4 p-4 sm:p-5 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
                  {event.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-lg text-white">
                    {event.name}
                  </p>
                  <p className="text-sm text-muted">
                    Artista principal
                  </p>
                </div>
              </div>
            </section>

            {/* UBICACIÓN - MEJORADA */}
            <section className="glass-card p-6 sm:p-8 border border-white/10 overflow-hidden">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-accent" />
                Ubicación
              </h2>
              <div className="flex items-center gap-2 text-muted text-sm mb-4">
                <MapPin size={14} className="text-secondary flex-shrink-0" />
                <span>{event.location || "Ubicación por confirmar"}</span>
              </div>
              <div className="rounded-xl overflow-hidden border border-white/10">
                <EventMapWrapper 
                  location={event.location || "Ubicación"} 
                  latitude={event.latitude ?? 20.7335} 
                  longitude={event.longitude ?? -103.3811}
                />
              </div>
            </section>
          </div>

          {/* COLUMNA DERECHA - TICKETS MEJORADA */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BuyTicketCard
                eventId={event.public_id}
                eventName={event.name}
                formattedDate={formattedDate}
                formattedTime={formattedTime}
                location={event.location}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          EVENTOS RELACIONADOS - MEJORADOS
      ============================================================ */}
      <section className="border-t border-white/5 bg-background-secondary/30 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              También te puede interesar
            </h2>
            <Link href="/events" className="text-sm text-primary hover:text-secondary transition-colors flex items-center gap-1">
              Ver todos
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {/* Tienda Física */}
            <a
              href="/tienda"
              className="glass-card overflow-hidden group hover:glow-primary transition-all border border-white/10 hover:border-primary/20"
            >
              <div className="relative h-48 sm:h-52 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600"
                  alt="Tienda física"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-bold text-white/80 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                  Próximamente
                </span>
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  Tienda Física osmi
                </p>
                <p className="text-xs text-muted-dark mt-1">
                  Recoge premios y compra merchandise exclusivo
                </p>
              </div>
            </a>

            {/* Escuela de Arte */}
            <a
              href="/escuela-arte"
              className="glass-card overflow-hidden group hover:glow-primary transition-all border border-white/10 hover:border-primary/20"
            >
              <div className="relative h-48 sm:h-52 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600"
                  alt="Escuela de arte"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-bold text-white/80 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                  Próximamente
                </span>
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  Escuela de Arte
                </p>
                <p className="text-xs text-muted-dark mt-1">
                  Aprende con los mejores artistas
                </p>
              </div>
            </a>

            {/* Escuela de Tatuaje */}
            <a
              href="/escuela-tatuaje"
              className="glass-card overflow-hidden group hover:glow-primary transition-all border border-white/10 hover:border-primary/20"
            >
              <div className="relative h-48 sm:h-52 overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/dkasxv8fj/image/upload/v1780564936/WhatsApp_Image_2026-03-08_at_7.52.00_PM_cog96f.jpg"
                  alt="Escuela de tatuaje"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-bold text-white/80 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                  Próximamente
                </span>
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  Escuela de Tatuaje
                </p>
                <p className="text-xs text-muted-dark mt-1">
                  Formación profesional en tatuaje
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}