export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Music2, Trophy, Drama, PartyPopper, Sparkles, Shapes } from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { EventCard } from "@/components/ui/EventCard";
import { Footer } from "@/components/navigation/Footer";
import { api } from "@/lib/api";
import { normalizeEvent, type NormalizedEvent, type RawEvent } from "@/modules/events/utils/normalizer";

export const metadata: Metadata = {
  title: "Eventos y boletos",
  description: "Descubre conciertos, deportes, teatro y experiencias. Explora los eventos disponibles y consulta tus boletos en OSMI.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "OSMI | Eventos y boletos",
    description: "Encuentra tu próxima experiencia en OSMI.",
    type: "website",
    locale: "es_MX",
    siteName: "OSMI",
  },
};

const categories = [
  { label: "Conciertos", slug: "conciertos", icon: Music2 },
  { label: "Deportes", slug: "deportes", icon: Trophy },
  { label: "Teatro", slug: "teatro", icon: Drama },
  { label: "Festivales", slug: "festivales", icon: PartyPopper },
  { label: "Experiencias", slug: "experiencias", icon: Sparkles },
  { label: "Infantiles", slug: "infantiles", icon: Shapes },
];

async function getEvents(): Promise<NormalizedEvent[]> {
  try {
    const data = await api.get<{ events?: RawEvent[] } | RawEvent[]>("/v1/events");
    const raw = Array.isArray(data) ? data : data.events ?? [];
    return raw.map(normalizeEvent);
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const events = await getEvents();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "OSMI",
    url: "https://myosmi.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://myosmi.com/events?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HeroSection events={events} />

      <div className="xl:pl-[224px]">
      <section id="categorias" aria-labelledby="categories-title" className="section-inner scroll-mt-6 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.22em] text-primary">Descubre</p>
            <h2 id="categories-title" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">¿Qué quieres vivir?</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted sm:text-base">Encuentra el plan que va contigo.</p>
          </div>
          <Link href="/events" className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-white underline decoration-primary/60 underline-offset-8 hover:text-primary sm:self-auto">Todos los eventos <ArrowRight size={16} /></Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map(({ icon: Icon, label, slug }) => (
            <Link key={slug} href={`/events?category=${slug}`} className="group flex min-h-32 flex-col justify-between rounded-2xl border border-white/10 bg-[#111024] p-5 transition hover:-translate-y-1 hover:border-primary/45 hover:bg-[#1b102e] focus-visible:outline-2 focus-visible:outline-primary">
              <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary"><Icon size={21} aria-hidden="true" /></span>
              <span className="flex items-center justify-between gap-2 text-sm font-semibold text-white">{label}<ArrowRight size={15} className="text-muted transition group-hover:translate-x-1 group-hover:text-primary" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section id="conciertos" aria-labelledby="events-title" className="scroll-mt-6 border-t border-white/5 bg-[#0a0717]">
        <div className="section-inner px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[.22em] text-primary">En cartelera</p>
              <h2 id="events-title" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Próximas experiencias</h2>
              <p className="mt-3 text-sm text-muted">Eventos disponibles ahora en OSMI.</p>
            </div>
            <Link href="/events" className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-white underline decoration-primary/60 underline-offset-8 hover:text-primary sm:self-auto">Ver cartelera completa <ArrowRight size={16} /></Link>
          </div>
          {events.length ? (
            <div role="list" aria-label="Eventos en cartelera" className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 [scrollbar-color:#ff2bd6_#171024] [scrollbar-width:thin]">
              {events.map((event) => (
                <div role="listitem" key={event.public_id} className="w-[min(86vw,340px)] shrink-0 snap-start sm:w-[320px] lg:w-[340px]">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/[.03] px-6 py-12 text-center">
              <h3 className="text-xl font-bold text-white">La cartelera está en camino</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">Vuelve pronto para descubrir los próximos eventos.</p>
            </div>
          )}
        </div>
      </section>

      <section className="section-inner px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] border border-primary/20 bg-[radial-gradient(circle_at_85%_20%,rgba(255,43,214,.18),transparent_36%),linear-gradient(120deg,#1b0c30,#0c0b20)] px-7 py-12 sm:px-12 sm:py-16">
          <div className="relative max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[.22em] text-[#ff80e7]">Hazlo posible</p>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">Tu próximo evento empieza aquí.</h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/70 sm:text-base">Si organizas experiencias, conoce las herramientas de OSMI para darles vida.</p>
            <Link href="/para-organizadores" className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-[#16051a] transition hover:bg-[#ff78e3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Conocer OSMI para organizadores <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>
      <Footer />
      </div>
    </div>
  );
}

