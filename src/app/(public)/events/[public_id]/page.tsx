import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { ArrowLeft, CalendarDays, Clock3, MapPin } from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import EventMapWrapper from "@/components/events/EventMapWrapper";
import BuyTicketCard from "@/components/events/BuyTicketCard";
import { api } from "@/lib/api";
import { normalizeEvent, type NormalizedEvent, type RawEvent } from "@/modules/events/utils/normalizer";

const getEvent = cache(async (publicId: string): Promise<NormalizedEvent | null> => {
  try {
    const raw = await api.get<RawEvent>(`/v1/events/${publicId}`);
    const event = normalizeEvent(raw);
    return { ...event, latitude: raw.latitude ?? event.latitude, longitude: raw.longitude ?? event.longitude };
  } catch { return null; }
});

export async function generateMetadata({ params }: { params: Promise<{ public_id: string }> }): Promise<Metadata> {
  const { public_id } = await params;
  const event = await getEvent(public_id);
  if (!event) return { title: "Evento no encontrado", robots: { index: false } };
  return {
    title: event.name,
    description: event.description?.slice(0, 160) || `Consulta los detalles y boletos para ${event.name} en OSMI.`,
    alternates: { canonical: `/events/${public_id}` },
    openGraph: { title: event.name, description: event.description?.slice(0, 160), images: event.image_url ? [event.image_url] : [] },
  };
}

export default async function EventPage({ params }: { params: Promise<{ public_id: string }> }) {
  const { public_id } = await params;
  const event = await getEvent(public_id);
  if (!event) notFound();
  const date = new Date(event.start_date);
  const formattedDate = date.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const formattedTime = date.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
  const hasMap = typeof event.latitude === "number" && typeof event.longitude === "number" && Number.isFinite(event.latitude) && Number.isFinite(event.longitude) && Math.abs(event.latitude) <= 90 && Math.abs(event.longitude) <= 180 && (event.latitude !== 0 || event.longitude !== 0);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="section-inner px-4 pt-6 sm:px-6 lg:px-8">
          <Link href="/events" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted transition hover:text-white"><ArrowLeft size={16} /> Volver a eventos</Link>
        </div>
        <section className="section-inner px-4 pt-4 sm:px-6 lg:px-8">
          <div className="relative isolate flex min-h-[440px] items-end overflow-hidden rounded-[28px] border border-white/10 bg-[#180e2e] sm:min-h-[500px] sm:rounded-[36px]">
            {event.image_url ? <Image src={event.image_url} alt="" fill priority sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover" /> : <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#602483,transparent_45%),linear-gradient(120deg,#261440,#0b0918)]" />}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080510]/95 via-[#080510]/60 to-[#080510]/10" />
            <div className="relative z-10 max-w-4xl p-6 sm:p-10 lg:p-12">
              {event.min_price > 0 && <p className="mb-4 w-fit rounded-full border border-primary/35 bg-primary/15 px-3 py-1.5 text-xs font-bold text-[#ff80e7]">Desde ${event.min_price.toLocaleString("es-MX")} MXN</p>}
              <h1 className="text-[clamp(2.3rem,5vw,4.8rem)] font-black leading-[1.05] tracking-[-.05em] text-white">{event.name}</h1>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/85">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-2 backdrop-blur"><CalendarDays size={16} className="text-primary" />{formattedDate}</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-2 backdrop-blur"><Clock3 size={16} className="text-primary" />{formattedTime}</span>
                {event.location && <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-2 backdrop-blur"><MapPin size={16} className="text-primary" />{event.location}</span>}
              </div>
            </div>
          </div>
        </section>
        <div className="section-inner grid gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1.7fr)_minmax(300px,.8fr)] lg:gap-10 lg:px-8">
          <div className="min-w-0 space-y-6">
            {event.description && <section className="rounded-3xl border border-white/10 bg-[#111024] p-6 sm:p-8"><p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-primary">La experiencia</p><h2 className="text-2xl font-bold tracking-tight text-white">Sobre el evento</h2><p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-white/75 sm:text-base">{event.description}</p></section>}
            <section className="rounded-3xl border border-white/10 bg-[#111024] p-6 sm:p-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-primary">Cómo llegar</p>
              <h2 className="text-2xl font-bold tracking-tight text-white">Ubicación</h2>
              <p className="mt-4 flex items-start gap-2 text-sm leading-6 text-muted"><MapPin size={17} className="mt-0.5 shrink-0 text-primary" />{event.location || "Ubicación por confirmar"}</p>
              {hasMap && <div className="mt-6 overflow-hidden rounded-2xl border border-white/10"><EventMapWrapper location={event.location || "Lugar del evento"} latitude={event.latitude} longitude={event.longitude} /></div>}
              {!hasMap && <p className="mt-5 rounded-xl border border-white/10 bg-white/[.03] p-4 text-sm leading-6 text-muted">El mapa estará disponible cuando el organizador confirme las coordenadas del lugar.</p>}
            </section>
          </div>
          <div className="min-w-0"><BuyTicketCard eventId={event.public_id} eventName={event.name} formattedDate={formattedDate} formattedTime={formattedTime} location={event.location} /></div>
        </div>
        <div className="section-inner px-4 pb-16 sm:px-6 lg:px-8"><Link href="/events" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:text-white">Explorar más eventos <ArrowLeft size={16} className="rotate-180" /></Link></div>
      </main>
      <Footer />
    </div>
  );
}

