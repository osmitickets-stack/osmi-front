export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { EventCard } from "@/components/ui/EventCard";
import { CATEGORIES } from "@/lib/categories";
import { api } from "@/lib/api";
import { normalizeEvent, type NormalizedEvent, type RawEvent } from "@/modules/events/utils/normalizer";

export const metadata: Metadata = {
  title: "Explorar eventos",
  description: "Descubre conciertos, deportes, teatro, festivales y más eventos disponibles en OSMI.",
  alternates: { canonical: "/events" },
};

async function getEvents(): Promise<NormalizedEvent[] | null> {
  try {
    const response = await api.get<RawEvent[] | { events?: RawEvent[] }>("/v1/events");
    const raw = Array.isArray(response) ? response : response.events ?? [];
    return raw.map(normalizeEvent);
  } catch {
    return null;
  }
}

type EventsPageProps = { searchParams: Promise<{ category?: string; search?: string }> };

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const [params, allEvents] = await Promise.all([searchParams, getEvents()]);
  const category = CATEGORIES.find((item) => item.slug === params.category);
  const query = (params.search ?? "").trim();
  const filtered = allEvents?.filter((event) => {
    const categoryMatch = !category || event.category.toLowerCase() === category.slug || event.tags.some((tag) => tag.toLowerCase().includes(category.slug));
    const searchMatch = !query || `${event.name} ${event.description}`.toLocaleLowerCase("es-MX").includes(query.toLocaleLowerCase("es-MX"));
    return categoryMatch && searchMatch;
  }) ?? [];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="section-inner flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mb-9 rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_85%_20%,rgba(255,43,214,.16),transparent_38%),linear-gradient(120deg,#1a102e,#0c0a1a)] p-7 sm:p-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-primary">La cartelera</p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">{category ? category.label : "Explorar eventos"}</h1>
          <p className="mt-3 text-sm text-muted">{allEvents === null ? "Los eventos no están disponibles temporalmente." : `${filtered.length} ${filtered.length === 1 ? "evento disponible" : "eventos disponibles"}`}</p>
        </div>
        <nav id="categorias" aria-label="Filtrar eventos por categoría" className="mb-8 flex gap-2 overflow-x-auto pb-2 scroll-mt-24 sm:flex-wrap sm:overflow-visible">
          <Link href="/events" aria-current={!category && !query ? "page" : undefined} className={`inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 text-sm font-semibold transition ${!category && !query ? "border-primary/45 bg-primary/15 text-[#ff80e7]" : "border-white/10 bg-white/[.04] text-muted hover:border-primary/35 hover:text-white"}`}>Todos</Link>
          {CATEGORIES.map((item) => <Link key={item.slug} href={`/events?category=${item.slug}`} aria-current={category?.slug === item.slug ? "page" : undefined} className={`inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 text-sm font-semibold transition ${category?.slug === item.slug ? "border-primary/45 bg-primary/15 text-[#ff80e7]" : "border-white/10 bg-white/[.04] text-muted hover:border-primary/35 hover:text-white"}`}>{item.label}</Link>)}
        </nav>
        {query && <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted">Resultados para <span className="text-white">“{query}”</span><Link href="/events" aria-label="Quitar búsqueda" className="inline-flex min-h-10 items-center gap-1 rounded-full border border-white/10 px-3 text-xs font-semibold text-primary hover:border-primary/40"><X size={14} /> Quitar filtro</Link></div>}
        {allEvents === null ? (
          <div className="rounded-3xl border border-white/10 bg-[#111024] px-6 py-12 text-center"><h2 className="text-xl font-bold text-white">No pudimos cargar la cartelera</h2><p className="mt-3 text-sm text-muted">Inténtalo de nuevo en unos momentos.</p></div>
        ) : filtered.length ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">{filtered.map((event) => <EventCard key={event.public_id} event={event} />)}</div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-[#111024] px-6 py-12 text-center"><Search size={30} className="mx-auto text-primary" /><h2 className="mt-4 text-xl font-bold text-white">No encontramos eventos</h2><p className="mt-2 text-sm text-muted">Prueba con otra categoría o búsqueda.</p><Link href="/events" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-[#16051a] transition hover:bg-[#ff78e3]">Ver todos los eventos <ArrowRight size={17} /></Link></div>
        )}
      </main>
      <Footer />
    </div>
  );
}

