"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, Clock3, Headphones, MapPin, Search, ShieldCheck, Ticket } from "lucide-react";
import type { NormalizedEvent } from "@/modules/events/utils/normalizer";

type HeroSectionProps = { events: NormalizedEvent[] };
type Countdown = { days: number; hours: number; minutes: number; seconds: number };

const slides = [
  {
    eyebrow: "Tu próxima experiencia",
    title: "Vive momentos que se quedan.",
    description: "Descubre eventos únicos, compra con seguridad y lleva tus boletos contigo.",
    image: "https://res.cloudinary.com/dkasxv8fj/image/upload/v1786533285/ChatGPT_Image_Aug_12_2026_05_13_53_AM_powlhq.png",
    href: "#conciertos",
    action: "Explorar eventos",
  },
  {
    eyebrow: "Crea experiencias",
    title: "Tu evento merece un gran escenario.",
    description: "Publica, organiza y conecta con tu audiencia desde una plataforma creada para crecer.",
    image: "https://res.cloudinary.com/dkasxv8fj/image/upload/v1786533285/ChatGPT_Image_Aug_12_2026_05_08_02_AM_w0cilx.png",
    href: "#organizadores",
    action: "Conocer OSMI para organizadores",
  },
  {
    eyebrow: "Todo en un lugar",
    title: "Más cerca de cada momento.",
    description: "Consulta tus compras, encuentra ayuda y descubre las novedades que OSMI prepara para ti.",
    image: "https://res.cloudinary.com/dkasxv8fj/image/upload/v1786533285/ChatGPT_Image_Aug_12_2026_05_11_34_AM_wboxeg.png",
    href: "#ayuda",
    action: "Descubrir novedades",
  },
] as const;

function calculateCountdown(date: string | undefined): Countdown {
  if (!date) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const difference = Math.max(0, new Date(date).getTime() - Date.now());
  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
}

function CountdownGrid({ countdown }: { countdown: Countdown }) {
  const units = [[countdown.days, "Días"], [countdown.hours, "Horas"], [countdown.minutes, "Min"], [countdown.seconds, "Seg"]] as const;
  return (
    <div className="grid grid-cols-4 gap-2" aria-label="Tiempo restante">
      {units.map(([value, label]) => (
        <div key={label} className="min-w-0 rounded-xl border border-white/[.07] bg-black/25 px-1 py-3 text-center">
          <span className="block text-xl font-black tabular-nums tracking-tight text-white sm:text-2xl">{String(value).padStart(2, "0")}</span>
          <span className="mt-1 block text-[9px] font-bold uppercase tracking-[.12em] text-white/42">{label}</span>
        </div>
      ))}
    </div>
  );
}

export function HeroSection({ events }: HeroSectionProps) {
  const router = useRouter();
  const [slideIndex, setSlideIndex] = useState(0);
  const [search, setSearch] = useState("");
  const featured = events.find((event) => event.image_url) ?? events[0];
  const featuredDate = featured?.start_date;
  const [countdown, setCountdown] = useState<Countdown>(() => calculateCountdown(featuredDate));
  const slide = slides[slideIndex];

  useEffect(() => {
    const update = () => setCountdown(calculateCountdown(featuredDate));
    update();
    const timer = window.setInterval(update, 1_000);
    return () => window.clearInterval(timer);
  }, [featuredDate]);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = search.trim();
    router.push(query ? `/events?search=${encodeURIComponent(query)}` : "/events");
  };

  const previousSlide = () => setSlideIndex((current) => (current + slides.length - 1) % slides.length);
  const nextSlide = () => setSlideIndex((current) => (current + 1) % slides.length);

  return (
    <section id="inicio" aria-label="Portada de OSMI" className="relative isolate scroll-mt-4 overflow-hidden border-b border-white/[.06] bg-[#05020e]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_45%_8%,rgba(93,37,198,.21),transparent_30%),radial-gradient(circle_at_92%_38%,rgba(255,43,214,.11),transparent_25%)]" />
      <div className="relative mx-auto w-full max-w-[1660px] p-3 sm:p-5 lg:p-7">
        <div className="mb-4 hidden min-h-14 items-center gap-3 lg:flex">
          <form onSubmit={submitSearch} role="search" className="h-12 min-w-0 max-w-2xl flex-1 items-center rounded-2xl border border-white/[.09] bg-[#090714]/88 shadow-[0_12px_40px_rgba(0,0,0,.18)] transition focus-within:border-[#ff2bd6]/50 lg:flex">
            <Search size={18} className="ml-4 shrink-0 text-white/42" aria-hidden="true" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Buscar eventos, artistas o lugares" placeholder="Buscar eventos, artistas o lugares..." className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/35" />
            <button type="submit" className="mr-1.5 inline-flex min-h-9 shrink-0 items-center justify-center rounded-xl bg-[#ff2bd6] px-4 text-xs font-black text-[#150418] transition hover:bg-[#ff71e2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Buscar</button>
          </form>
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <Link href="#ayuda" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/[.08] bg-white/[.025] px-4 text-sm font-bold text-white/68 transition hover:border-[#ff2bd6]/30 hover:text-white"><Headphones size={18} />Ayuda</Link>
            <Link href="/dashboard" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/[.08] bg-white/[.025] px-4 text-sm font-bold text-white/68 transition hover:border-[#ff2bd6]/30 hover:text-white"><Ticket size={18} />Mis boletos</Link>
            <Link href="/login" className="inline-flex min-h-11 items-center rounded-xl border border-[#ff2bd6]/35 bg-[#ff2bd6]/10 px-5 text-sm font-bold text-white transition hover:bg-[#ff2bd6]/20">Entrar</Link>
          </div>
        </div>

        <form onSubmit={submitSearch} role="search" className="mb-4 flex h-12 min-w-0 items-center rounded-2xl border border-white/[.09] bg-[#090714]/88 transition focus-within:border-[#ff2bd6]/50 lg:hidden">
          <Search size={18} className="ml-4 shrink-0 text-white/42" aria-hidden="true" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Buscar eventos, artistas o lugares" placeholder="Buscar eventos..." className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/35" />
          <button type="submit" aria-label="Enviar búsqueda" className="mr-1.5 grid size-9 shrink-0 place-items-center rounded-xl bg-[#ff2bd6] text-[#150418]"><ArrowRight size={17} /></button>
        </form>

        <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="relative isolate min-h-[560px] overflow-hidden rounded-[26px] border border-white/[.09] bg-[#100821] shadow-[0_28px_90px_rgba(0,0,0,.42)] sm:min-h-[620px] lg:min-h-[670px]">
            <Image key={slide.image} src={slide.image} alt="" fill priority className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 72vw" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,2,11,.96)_0%,rgba(4,2,11,.82)_34%,rgba(4,2,11,.22)_74%,rgba(4,2,11,.06)_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04020b]/88 via-transparent to-transparent" />
            <div className="relative z-10 flex min-h-[560px] max-w-[720px] flex-col justify-center px-6 pb-28 pt-14 sm:min-h-[620px] sm:px-11 sm:pb-28 sm:pt-16 lg:min-h-[670px] lg:px-14">
              <span className="mb-5 w-fit rounded-full border border-[#ff2bd6]/40 bg-[#ff2bd6]/15 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.18em] text-[#ff7ae5]">{slide.eyebrow}</span>
              <h1 className="max-w-[650px] text-[clamp(2.55rem,5.1vw,5.4rem)] font-black leading-[.98] tracking-[-.06em] text-white">{slide.title}</h1>
              <p className="mt-5 max-w-[540px] text-sm leading-7 text-white/72 sm:text-base sm:leading-8">{slide.description}</p>
              <Link href={slide.href} className="mt-8 inline-flex min-h-12 w-full max-w-[330px] items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#ff2bd6] to-[#ff4fba] px-5 py-3 text-center text-sm font-black leading-5 text-[#18051b] shadow-[0_14px_40px_rgba(255,43,214,.3)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(255,43,214,.42)] sm:w-fit sm:max-w-none"><span>{slide.action}</span><ArrowRight size={18} className="shrink-0" /></Link>
              <div className="mt-9 grid max-w-[630px] grid-cols-1 gap-3 border-t border-white/[.09] pt-6 sm:grid-cols-3">
                <div className="flex items-center gap-3"><ShieldCheck size={20} className="shrink-0 text-[#ff44d8]" /><span className="text-xs font-semibold leading-5 text-white/78">Pago protegido</span></div>
                <div className="flex items-center gap-3"><Ticket size={20} className="shrink-0 text-[#9f72ff]" /><span className="text-xs font-semibold leading-5 text-white/78">Entrega inmediata</span></div>
                <div className="flex items-center gap-3"><Headphones size={20} className="shrink-0 text-[#42ddff]" /><span className="text-xs font-semibold leading-5 text-white/78">Soporte real</span></div>
              </div>
            </div>
            <div className="absolute inset-x-4 bottom-4 z-20 flex items-center gap-2 rounded-2xl border border-white/[.11] bg-[#07040f]/78 p-2 shadow-[0_12px_40px_rgba(0,0,0,.35)] backdrop-blur-xl sm:inset-x-5 sm:gap-3">
              <div className="grid min-w-0 flex-1 grid-cols-3 gap-1.5" aria-label={`Anuncio ${slideIndex + 1} de ${slides.length}`}>
                {slides.map((item, index) => (
                  <button key={item.image} type="button" onClick={() => setSlideIndex(index)} aria-label={`Mostrar anuncio ${index + 1}: ${item.eyebrow}`} aria-current={index === slideIndex ? "true" : undefined} className={`flex min-h-11 min-w-0 items-center gap-2 rounded-xl border px-2 text-left transition sm:px-3 ${index === slideIndex ? "border-[#ff2bd6]/45 bg-[#ff2bd6]/16 text-white shadow-[0_0_20px_rgba(255,43,214,.14)]" : "border-white/[.06] bg-white/[.025] text-white/42 hover:border-white/16 hover:text-white/72"}`}>
                    <span className={`text-[10px] font-black tabular-nums ${index === slideIndex ? "text-[#ff62df]" : "text-white/30"}`}>0{index + 1}</span>
                    <span className="hidden min-w-0 truncate text-[10px] font-bold md:block">{item.eyebrow}</span>
                  </button>
                ))}
              </div>
              <div className="flex shrink-0 gap-1.5">
                <button type="button" onClick={previousSlide} aria-label="Anuncio anterior" className="grid size-11 place-items-center rounded-xl border border-white/12 bg-white/[.045] text-white transition hover:border-[#ff2bd6]/55 hover:bg-[#ff2bd6]/18"><ChevronLeft size={19} /></button>
                <button type="button" onClick={nextSlide} aria-label="Anuncio siguiente" className="grid size-11 place-items-center rounded-xl border border-white/12 bg-white/[.045] text-white transition hover:border-[#ff2bd6]/55 hover:bg-[#ff2bd6]/18"><ChevronRight size={19} /></button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-[minmax(0,1.15fr)_minmax(0,.85fr)]">
            <article className="group relative min-h-[370px] overflow-hidden rounded-[26px] border border-white/[.09] bg-[#0b0818] shadow-[0_24px_70px_rgba(0,0,0,.32)] lg:min-h-0">
              {featured?.image_url ? <Image src={featured.image_url} alt="" fill className="object-cover transition duration-700 group-hover:scale-[1.035]" sizes="(max-width: 640px) 100vw, 320px" /> : <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(123,97,255,.6),transparent_35%),radial-gradient(circle_at_70%_48%,rgba(255,43,214,.32),transparent_33%),linear-gradient(150deg,#160b30,#070511)]" />}
              <div className="absolute inset-0 bg-gradient-to-t from-[#05020d] via-[#05020d]/48 to-black/10" />
              <div className="relative flex h-full min-h-[370px] flex-col justify-between p-5 lg:min-h-0">
                <span className="w-fit rounded-full bg-[#ff2bd6] px-3 py-1.5 text-[9px] font-black uppercase tracking-[.16em] text-[#160318]">Evento destacado</span>
                <div className="pt-24">
                  <h2 className="text-2xl font-black leading-tight tracking-[-.035em] text-white">{featured?.name ?? "Tu próxima experiencia"}</h2>
                  <div className="mt-4 space-y-2 text-xs font-semibold leading-5 text-white/76">
                    {featuredDate && <p className="flex items-start gap-2"><CalendarDays size={15} className="mt-0.5 shrink-0 text-[#ff59dc]" /><span>{new Date(featuredDate).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" })}</span></p>}
                    <p className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 shrink-0 text-[#ff59dc]" /><span>{featured?.location ?? "Próximamente"}</span></p>
                  </div>
                  {featured && <p className="mt-4 text-sm font-black text-white">Desde ${featured.min_price.toLocaleString("es-MX")} MXN</p>}
                  <Link href={featured ? `/events/${featured.public_id}` : "#conciertos"} className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/16 bg-black/38 px-4 py-2 text-sm font-bold text-white backdrop-blur-md transition hover:border-[#ff2bd6]/55 hover:bg-[#ff2bd6]/16">Ver evento <ArrowRight size={16} /></Link>
                </div>
              </div>
            </article>
            <article className="relative overflow-hidden rounded-[26px] border border-[#963dff]/28 bg-[radial-gradient(circle_at_100%_0%,rgba(255,43,214,.24),transparent_45%),linear-gradient(145deg,#1c0835,#0d071d)] p-5 shadow-[0_20px_60px_rgba(82,24,157,.18)]">
              <div className="flex items-start justify-between gap-3"><div><span className="text-[10px] font-black uppercase tracking-[.2em] text-[#d98cff]">Acceso preferente</span><h2 className="mt-2 text-xl font-black tracking-tight text-white">Preventa exclusiva</h2></div><span className="grid size-10 shrink-0 place-items-center rounded-xl border border-[#ff2bd6]/25 bg-[#ff2bd6]/12 text-[#ff5edf]"><Clock3 size={19} /></span></div>
              <p className="mt-3 text-xs leading-5 text-white/62">Tiempo restante para vivir el evento destacado.</p>
              <div className="my-4 h-px bg-white/[.08]" />
              <CountdownGrid countdown={countdown} />
              <Link href={featured ? `/events/${featured.public_id}` : "#conciertos"} className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff2bd6] to-[#b64dff] px-4 py-3 text-sm font-black text-white shadow-[0_12px_36px_rgba(255,43,214,.25)] transition hover:brightness-110">Acceder ahora <ArrowRight size={17} /></Link>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

