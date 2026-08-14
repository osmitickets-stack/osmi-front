// src/app/(public)/events/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Metadata } from "next";
import Link from "next/link";
import { api } from "@/lib/api";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { EventCard } from "@/components/ui/EventCard";
import { normalizeEvent, type NormalizedEvent } from "@/modules/events/utils/normalizer";
import { CATEGORIES, type CategorySlug } from "@/lib/categories";
import { X, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Explorar Eventos - MyOsmi",
  description: "Descubre los mejores eventos, conciertos, festivales y más en MyOsmi.",
};

interface EventsPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const params = await searchParams;
  const categorySlug = params.category || "";
  const searchQuery = params.search || "";

  // Validar que la categoría exista
  const validCategory = CATEGORIES.find(c => c.slug === categorySlug);
  const isValidCategory = !!validCategory;

  try {
    const rawEvents = await api.get<any>("/v1/events");

    let eventList: NormalizedEvent[] = Array.isArray(rawEvents)
      ? rawEvents.map(normalizeEvent)
      : rawEvents?.events
      ? rawEvents.events.map(normalizeEvent)
      : [];

    // ============================================================
    // FILTRAR POR CATEGORÍA
    // ============================================================
    if (categorySlug && isValidCategory) {
      eventList = eventList.filter((event) => {
        // 1. Revisar si tiene el campo 'category' (opción recomendada)
        if (event.category && event.category.toLowerCase() === categorySlug) {
          return true;
        }
        // 2. Revisar si tiene 'tags' (opción flexible)
        if (event.tags && event.tags.length > 0) {
          return event.tags.some((tag: string) =>
            tag.toLowerCase().includes(categorySlug)
          );
        }
        // 3. Fallback: buscar en nombre/descripción
        return (
          event.name?.toLowerCase().includes(categorySlug) ||
          event.description?.toLowerCase().includes(categorySlug)
        );
      });
    }

    // Filtrar por búsqueda
    if (searchQuery) {
      eventList = eventList.filter((event) =>
        event.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const isFilterActive = categorySlug || searchQuery;
    const categoryLabel = validCategory?.label || "Eventos";

    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
          
          {/* ==================== HEADER ==================== */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-black text-foreground">
              {isFilterActive && categorySlug ? categoryLabel : "Explorar eventos"}
            </h1>
            <p className="text-muted mt-1">
              {eventList.length} {eventList.length === 1 ? "evento" : "eventos"} disponibles
            </p>
          </div>

          {/* ==================== CATEGORÍAS ==================== */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Link
              href="/events"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !categorySlug && !searchQuery
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-white/5 text-muted border border-white/10 hover:border-primary/30 hover:text-foreground"
              }`}
            >
              Todos
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/events?category=${cat.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  categorySlug === cat.slug
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "bg-white/5 text-muted border border-white/10 hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>

          {/* ==================== FILTRO ACTIVO ==================== */}
          {isFilterActive && (
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm text-muted">Filtro activo:</span>
              {categorySlug && validCategory && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20">
                  {validCategory.label}
                  <Link href="/events" className="hover:text-white transition-colors">
                    <X size={14} />
                  </Link>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm border border-secondary/20">
                  Buscar: "{searchQuery}"
                  <Link href="/events" className="hover:text-white transition-colors">
                    <X size={14} />
                  </Link>
                </span>
              )}
            </div>
          )}

          {/* ==================== LISTA DE EVENTOS ==================== */}
          {eventList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {eventList.map((event) => (
                <EventCard key={event.public_id} event={event} />
              ))}
            </div>
          ) : (
            <div className="glass-card p-12 text-center border border-white/5">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-muted-dark" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">No hay eventos</h3>
              <p className="text-muted text-sm">
                {searchQuery
                  ? `No encontramos resultados para "${searchQuery}"`
                  : `No hay eventos disponibles en "${categoryLabel}"`}
              </p>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-2xl hover:shadow-primary/30 transition-all"
              >
                Ver todos los eventos
              </Link>
            </div>
          )}
        </main>

        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error cargando eventos:", error);

    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
          <h1 className="text-4xl font-bold mb-4">Explorar eventos</h1>
          <div className="text-center py-20">
            <p className="text-lg text-muted">
              Los eventos no están disponibles temporalmente.
            </p>
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}