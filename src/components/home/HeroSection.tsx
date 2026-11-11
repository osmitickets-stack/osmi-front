"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import type { NormalizedEvent } from "@/modules/events/utils/normalizer";

type HeroSectionProps = { events: NormalizedEvent[] };

export function HeroSection({ events }: HeroSectionProps) {
  const [index, setIndex] = useState(0);
  const featured = events.filter((event) => event.image_url).slice(0, 4);
  const current = featured[index] ?? featured[0];

  return (
    <section aria-label="Eventos destacados" className="section-inner px-4 pt-6 sm:px-6 sm:pt-9 lg:px-8">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.8fr)_minmax(290px,.7fr)] lg:gap-5">
        <div className="relative isolate flex min-h-[520px] overflow-hidden rounded-[28px] border border-white/10 bg-[#140b28] sm:min-h-[570px] sm:rounded-[36px] lg:min-h-[610px]">
          {current?.image_url ? (
            <Image src={current.image_url} alt="" fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 68vw" />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,#55227d_0%,transparent_42%),radial-gradient(circle_at_80%_80%,#3b1a68_0%,transparent_38%),linear-gradient(135deg,#110922,#090615)]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080510]/95 via-[#080510]/75 to-[#080510]/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080510]/85 via-transparent to-transparent" />
          <div className="relative z-10 flex w-full flex-col justify-end p-6 sm:p-10 lg:p-12">
            <span className="mb-5 w-fit rounded-full border border-primary/35 bg-primary/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.18em] text-[#ff80e7]">
              {current ? "En cartelera" : "Descubre OSMI"}
            </span>
            <h1 className="max-w-[740px] text-[clamp(2.45rem,5.6vw,5.3rem)] font-black leading-[1.02] tracking-[-.055em] text-white">
              {current ? current.name : <>Momentos que <span className="text-[#ff66de]">se quedan.</span></>}
            </h1>
            <p className="mt-5 max-w-[580px] text-sm leading-7 text-white/80 sm:text-base">
              {current?.description ? `${current.description.slice(0, 145)}${current.description.length > 145 ? "…" : ""}` : "Encuentra tu próximo evento y vive la experiencia desde el primer clic."}
            </p>
            {current && (
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-white/80 sm:text-sm">
                <span className="inline-flex items-center gap-2"><CalendarDays size={16} className="text-[#ff80e7]" />{new Date(current.start_date).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}</span>
                {current.location && <span className="inline-flex items-center gap-2"><MapPin size={16} className="text-[#ff80e7]" />{current.location}</span>}
              </div>
            )}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={current ? `/events/${current.public_id}` : "/events"} className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-[#16051a] shadow-[0_10px_30px_rgba(255,43,214,.25)] transition hover:bg-[#ff78e3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                {current ? "Ver evento y boletos" : "Explorar eventos"}<ArrowRight size={17} />
              </Link>
              {current && <Link href="/events" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Explorar más eventos</Link>}
            </div>
          </div>
          {featured.length > 1 && (
            <div className="absolute right-5 top-5 z-20 flex gap-2 sm:right-8 sm:top-8">
              <button type="button" onClick={() => setIndex((index + featured.length - 1) % featured.length)} aria-label="Evento anterior" className="grid size-11 place-items-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur transition hover:bg-black/65 focus-visible:outline-2 focus-visible:outline-primary"><ChevronLeft size={20} /></button>
              <button type="button" onClick={() => setIndex((index + 1) % featured.length)} aria-label="Evento siguiente" className="grid size-11 place-items-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur transition hover:bg-black/65 focus-visible:outline-2 focus-visible:outline-primary"><ChevronRight size={20} /></button>
            </div>
          )}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="flex min-h-[230px] flex-col justify-between rounded-[28px] border border-primary/20 bg-[radial-gradient(circle_at_90%_10%,rgba(255,43,214,.18),transparent_45%),linear-gradient(145deg,#1b0c2e,#100a22)] p-6 sm:p-7">
            <span className="text-[11px] font-bold uppercase tracking-[.2em] text-[#ff80e7]">Para organizadores</span>
            <div><h2 className="max-w-xs text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">Tu evento merece un gran escenario.</h2><p className="mt-3 text-sm leading-6 text-white/65">Conoce cómo publicar y gestionar tus eventos en OSMI.</p></div>
            <Link href="/para-organizadores" className="inline-flex min-h-11 w-fit items-center gap-2 text-sm font-bold text-white underline decoration-primary/60 underline-offset-8 transition hover:text-[#ff80e7]">Conoce OSMI para organizadores <ArrowRight size={16} /></Link>
          </div>
          <div className="flex min-h-[230px] flex-col justify-between rounded-[28px] border border-white/10 bg-[#111026] p-6 sm:p-7">
            <span className="text-[11px] font-bold uppercase tracking-[.2em] text-accent">Tu experiencia</span>
            <div><h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">Del evento a tus boletos, en un solo lugar.</h2><p className="mt-3 text-sm leading-6 text-white/65">Consulta tus compras desde tu cuenta y encuentra ayuda cuando la necesites.</p></div>
            <Link href="/dashboard" className="inline-flex min-h-11 w-fit items-center gap-2 text-sm font-bold text-white underline decoration-accent/60 underline-offset-8 transition hover:text-accent">Ir a mis boletos <ArrowRight size={16} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

