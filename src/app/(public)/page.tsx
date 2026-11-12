export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  BriefcaseBusiness,
  Drama,
  Gamepad2,
  Headphones,
  Heart,
  Music2,
  PartyPopper,
  Radio,
  Shapes,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import { HomeShell } from "@/components/home/HomeShell";
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
  { label: "Conciertos", slug: "conciertos", icon: Music2, color: "text-[#ff58dc]", glow: "group-hover:shadow-[0_18px_45px_rgba(255,43,214,.12)]" },
  { label: "Deportes", slug: "deportes", icon: Trophy, color: "text-[#57ddff]", glow: "group-hover:shadow-[0_18px_45px_rgba(0,209,255,.11)]" },
  { label: "Teatro", slug: "teatro", icon: Drama, color: "text-[#b992ff]", glow: "group-hover:shadow-[0_18px_45px_rgba(123,97,255,.13)]" },
  { label: "Festivales", slug: "festivales", icon: PartyPopper, color: "text-[#ff77aa]", glow: "group-hover:shadow-[0_18px_45px_rgba(255,70,150,.11)]" },
  { label: "Experiencias", slug: "experiencias", icon: Sparkles, color: "text-[#e9a8ff]", glow: "group-hover:shadow-[0_18px_45px_rgba(212,108,255,.12)]" },
  { label: "Infantiles", slug: "infantiles", icon: Shapes, color: "text-[#71f2c5]", glow: "group-hover:shadow-[0_18px_45px_rgba(80,240,190,.1)]" },
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
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeShell>
        <HeroSection events={events} />

        <main className="min-w-0 overflow-hidden">
          <section id="categorias" aria-labelledby="categories-title" className="scroll-mt-20 bg-[linear-gradient(180deg,#080513_0%,#0b0718_100%)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="mx-auto w-full max-w-[1460px]">
              <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <p className="mb-3 text-xs font-black uppercase tracking-[.24em] text-[#ff60df]">Explora a tu manera</p>
                  <h2 id="categories-title" className="text-3xl font-black tracking-[-.04em] text-white sm:text-5xl">¿Qué quieres vivir?</h2>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-white/58 sm:text-base">Cada experiencia tiene su propio ritmo. Encuentra la tuya sin salir de la portada.</p>
                </div>
                <Link href="/events" className="inline-flex min-h-11 items-center gap-2 self-start rounded-xl border border-white/10 bg-white/[.04] px-4 text-sm font-bold text-white transition hover:border-[#ff2bd6]/40 hover:bg-[#ff2bd6]/10 sm:self-auto">Todos los eventos <ArrowRight size={16} /></Link>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
                {categories.map(({ icon: Icon, label, slug, color, glow }) => (
                  <Link key={slug} href={`/events?category=${slug}`} className={`group flex min-h-36 flex-col justify-between rounded-2xl border border-white/[.08] bg-[linear-gradient(145deg,rgba(255,255,255,.045),rgba(255,255,255,.018))] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#ff2bd6]/30 ${glow}`}>
                    <span className={`grid size-11 place-items-center rounded-xl border border-white/[.07] bg-black/20 ${color}`}><Icon size={21} aria-hidden="true" /></span>
                    <span className="flex items-center justify-between gap-2 text-sm font-bold text-white">{label}<ArrowRight size={15} className="shrink-0 text-white/32 transition group-hover:translate-x-1 group-hover:text-[#ff62df]" /></span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section id="conciertos" aria-labelledby="events-title" className="scroll-mt-20 border-y border-white/[.055] bg-[#06040f] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="mx-auto w-full max-w-[1460px]">
              <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div><p className="mb-3 text-xs font-black uppercase tracking-[.24em] text-[#9d75ff]">En cartelera</p><h2 id="events-title" className="text-3xl font-black tracking-[-.04em] text-white sm:text-5xl">Eventos imperdibles</h2><p className="mt-3 text-sm leading-7 text-white/58 sm:text-base">Boletos disponibles ahora en OSMI.</p></div>
                <Link href="/events" className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-bold text-white underline decoration-[#ff2bd6]/65 underline-offset-8 transition hover:text-[#ff70e2] sm:self-auto">Ver cartelera completa <ArrowRight size={16} /></Link>
              </div>
              {events.length ? (
                <div role="list" aria-label="Eventos en cartelera" className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 [scrollbar-color:#ff2bd6_#171024] [scrollbar-width:thin]">
                  {events.map((event) => <div role="listitem" key={event.public_id} className="w-[min(84vw,350px)] shrink-0 snap-start sm:w-[330px] xl:w-[350px]"><EventCard event={event} /></div>)}
                </div>
              ) : (
                <div className="rounded-3xl border border-white/10 bg-white/[.03] px-6 py-14 text-center"><h3 className="text-xl font-bold text-white">La cartelera está en camino</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">Vuelve pronto para descubrir los próximos eventos.</p></div>
              )}
            </div>
          </section>

          <section id="favoritos" aria-labelledby="favorites-title" className="scroll-mt-20 bg-[linear-gradient(180deg,#0b0718,#080512)] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
            <div className="mx-auto grid min-h-[320px] w-full max-w-[1460px] items-center gap-8 overflow-hidden rounded-[30px] border border-[#ff2bd6]/16 bg-[radial-gradient(circle_at_80%_30%,rgba(255,43,214,.2),transparent_30%),linear-gradient(120deg,#170a2b,#0b0718)] p-7 sm:p-10 lg:grid-cols-[1fr_.8fr] lg:p-14">
              <div><span className="grid size-12 place-items-center rounded-2xl border border-[#ff2bd6]/25 bg-[#ff2bd6]/12 text-[#ff68df]"><Heart size={23} /></span><p className="mt-6 text-xs font-black uppercase tracking-[.24em] text-[#ff68df]">Tu selección personal</p><h2 id="favorites-title" className="mt-3 text-3xl font-black tracking-[-.04em] text-white sm:text-5xl">Guarda lo que no quieres perderte.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-white/62 sm:text-base">Tu cuenta reúne boletos y experiencias en un solo lugar. La colección de favoritos crecerá contigo.</p><Link href="/dashboard" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#ff2bd6] px-6 text-sm font-black text-[#160419] transition hover:bg-[#ff72e2]">Abrir mi cuenta <ArrowRight size={17} /></Link></div>
              <div className="hidden justify-self-center lg:block"><Heart size={210} strokeWidth={1} className="text-[#ff2bd6]/24 drop-shadow-[0_0_45px_rgba(255,43,214,.28)]" /></div>
            </div>
          </section>

          <section id="ofertas" aria-labelledby="offers-title" className="scroll-mt-20 bg-[#080512] px-4 py-14 sm:px-6 lg:px-8">
            <div className="mx-auto flex min-h-[300px] w-full max-w-[1460px] flex-col justify-between gap-8 rounded-[30px] border border-[#7b61ff]/20 bg-[radial-gradient(circle_at_10%_0%,rgba(123,97,255,.2),transparent_32%),linear-gradient(120deg,#0e0a21,#0a0717)] p-7 sm:p-10 lg:flex-row lg:items-center lg:p-14">
              <div className="max-w-3xl"><span className="inline-flex items-center gap-2 rounded-full border border-[#a98cff]/25 bg-[#7b61ff]/12 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.18em] text-[#c2adff]"><BadgePercent size={14} /> Beneficios OSMI</span><h2 id="offers-title" className="mt-5 text-3xl font-black tracking-[-.04em] text-white sm:text-5xl">Ofertas claras, sin letras pequeñas.</h2><p className="mt-4 text-sm leading-7 text-white/60 sm:text-base">Las preventas y beneficios disponibles se mostrarán aquí cuando sean reales y estén vigentes. Nunca inventaremos un descuento para presionarte.</p></div>
              <Link href="/events" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#9d75ff]/35 bg-[#7b61ff]/14 px-6 text-sm font-black text-white transition hover:bg-[#7b61ff]/25">Revisar cartelera <ArrowRight size={17} /></Link>
            </div>
          </section>

          <section id="ayuda" aria-labelledby="help-title" className="scroll-mt-20 bg-[linear-gradient(180deg,#080512,#07040f)] px-4 py-14 sm:px-6 lg:px-8">
            <div className="mx-auto grid min-h-[320px] w-full max-w-[1460px] gap-8 rounded-[30px] border border-[#00d1ff]/15 bg-[radial-gradient(circle_at_85%_25%,rgba(0,209,255,.13),transparent_28%),rgba(255,255,255,.018)] p-7 sm:p-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:p-14">
              <div className="grid size-36 place-items-center justify-self-center rounded-full border border-[#00d1ff]/18 bg-[#00d1ff]/8 text-[#55ddff] shadow-[0_0_70px_rgba(0,209,255,.12)] sm:size-44"><Headphones size={72} strokeWidth={1.3} /></div>
              <div><p className="text-xs font-black uppercase tracking-[.24em] text-[#55ddff]">Soporte humano</p><h2 id="help-title" className="mt-3 text-3xl font-black tracking-[-.04em] text-white sm:text-5xl">La experiencia también incluye acompañarte.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">Boletos, cuenta, acceso, reembolsos, quejas o sugerencias: encuentra el canal correcto sin perderte entre formularios.</p><Link href="/ayuda" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#00d1ff] px-6 text-sm font-black text-[#03131a] transition hover:bg-[#6de7ff]">Ir al centro de ayuda <ArrowRight size={17} /></Link></div>
            </div>
          </section>

          <section id="desfragmentado" aria-labelledby="artist-title" className="scroll-mt-20 bg-[#06030b] px-4 py-14 sm:px-6 lg:px-8">
            <div className="relative mx-auto min-h-[390px] w-full max-w-[1460px] overflow-hidden rounded-[30px] border border-red-700/20 bg-black">
              <Image src="https://res.cloudinary.com/dkasxv8fj/image/upload/v1779219665/WhatsApp_Image_2026-05-09_at_2.02.54_PM_mxqy93.jpg" alt="" fill sizes="(max-width: 1024px) 100vw, 80vw" className="object-cover object-center opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/88 to-black/25" />
              <div className="relative flex min-h-[390px] max-w-3xl flex-col justify-center p-7 sm:p-12 lg:p-16"><span className="inline-flex w-fit items-center gap-2 rounded-full border border-red-500/25 bg-red-600/12 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.2em] text-red-400"><Radio size={14} /> Artista OSMI</span><h2 id="artist-title" className="mt-5 text-4xl font-black tracking-[-.05em] text-white sm:text-6xl">Desfragmentado</h2><p className="mt-4 max-w-xl text-sm leading-7 text-white/64 sm:text-base">Rap, hip hop y storytelling desde una identidad independiente. Conoce su música, trayectoria y próximos proyectos.</p><Link href="/desfragmentado" className="mt-7 inline-flex min-h-12 w-fit items-center gap-2 rounded-xl border border-red-500/35 bg-red-600/16 px-6 text-sm font-black text-white transition hover:bg-red-600/28">Conocer al artista <ArrowRight size={17} /></Link></div>
            </div>
          </section>

          <section id="minijuegos" aria-labelledby="games-title" className="scroll-mt-20 bg-[#07040f] px-4 py-14 sm:px-6 lg:px-8">
            <div className="mx-auto flex min-h-[300px] w-full max-w-[1460px] flex-col items-center justify-center rounded-[30px] border border-dashed border-[#9c69ff]/30 bg-[radial-gradient(circle_at_50%_0%,rgba(123,97,255,.18),transparent_46%),rgba(255,255,255,.015)] p-8 text-center"><span className="grid size-14 place-items-center rounded-2xl border border-[#9c69ff]/25 bg-[#7b61ff]/12 text-[#bc9cff]"><Gamepad2 size={27} /></span><p className="mt-5 text-xs font-black uppercase tracking-[.24em] text-[#bc9cff]">Laboratorio OSMI</p><h2 id="games-title" className="mt-3 text-3xl font-black tracking-[-.04em] text-white sm:text-5xl">Minijuegos, próximamente.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-white/58 sm:text-base">Este espacio tendrá experiencias breves vinculadas con eventos y recompensas. Permanecerá cerrado hasta contar con una versión real y segura.</p></div>
          </section>

          <section id="organizadores" aria-labelledby="organizers-title" className="scroll-mt-20 bg-[#07040f] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="relative mx-auto min-h-[390px] w-full max-w-[1460px] overflow-hidden rounded-[32px] border border-[#ff2bd6]/22 bg-[radial-gradient(circle_at_82%_28%,rgba(255,43,214,.22),transparent_29%),radial-gradient(circle_at_92%_78%,rgba(123,97,255,.18),transparent_28%),linear-gradient(120deg,#1a0b30,#0b0719)] p-8 sm:p-12 lg:p-16">
              <div className="relative max-w-3xl"><span className="grid size-12 place-items-center rounded-2xl border border-[#ff2bd6]/25 bg-[#ff2bd6]/12 text-[#ff68df]"><BriefcaseBusiness size={23} /></span><p className="mt-6 text-xs font-black uppercase tracking-[.24em] text-[#ff68df]">OSMI para organizadores</p><h2 id="organizers-title" className="mt-3 text-4xl font-black leading-tight tracking-[-.05em] text-white sm:text-6xl">Tu próximo evento empieza aquí.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-white/64 sm:text-base">Cuéntanos qué quieres producir. Te ayudamos a preparar la publicación, la venta y el control de acceso con una ruta clara.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/para-organizadores" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#ff2bd6] px-6 text-sm font-black text-[#160419] transition hover:bg-[#ff74e3]">Conocer herramientas <ArrowRight size={17} /></Link><Link href="/ayuda" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[.045] px-6 text-sm font-black text-white transition hover:border-[#ff2bd6]/35 hover:bg-white/[.08]">Contactar a OSMI <ArrowRight size={17} /></Link></div><div className="mt-8 flex items-center gap-3 text-xs font-semibold text-white/45"><ShieldCheck size={17} className="shrink-0 text-[#7ee8ff]" />Publicar un evento requiere revisión y aprobación; no prometemos ventas ni resultados.</div></div>
            </div>
          </section>
        </main>

        <Footer />
      </HomeShell>
    </div>
  );
}

