"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BadgePercent,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Compass,
  Gamepad2,
  Headphones,
  Heart,
  Home,
  LifeBuoy,
  MapPin,
  Menu,
  Music2,
  Radio,
  Search,
  ShieldCheck,
  Ticket,
  UserRound,
  X,
} from "lucide-react";
import { API_BASE_URL } from "@/lib/api";
import type { NormalizedEvent } from "@/modules/events/utils/normalizer";

type HeroSectionProps = { events: NormalizedEvent[] };

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type ProfileSummary = {
  loggedIn: boolean;
  name: string;
  email: string;
  avatarUrl?: string;
};

const slides = [
  {
    eyebrow: "Tu próxima experiencia",
    title: "Vive momentos que se quedan.",
    description: "Descubre eventos únicos, compra con seguridad y lleva tus boletos contigo.",
    image: "https://res.cloudinary.com/dkasxv8fj/image/upload/v1786533285/ChatGPT_Image_Aug_12_2026_05_13_53_AM_powlhq.png",
    href: "/events",
    action: "Explorar eventos",
  },
  {
    eyebrow: "Crea experiencias",
    title: "Tu evento merece un gran escenario.",
    description: "Publica, organiza y conecta con tu audiencia desde una plataforma creada para crecer.",
    image: "https://res.cloudinary.com/dkasxv8fj/image/upload/v1786533285/ChatGPT_Image_Aug_12_2026_05_08_02_AM_w0cilx.png",
    href: "/para-organizadores",
    action: "Conocer OSMI para organizadores",
  },
  {
    eyebrow: "Todo en un lugar",
    title: "Más cerca de cada momento.",
    description: "Consulta tus compras, encuentra ayuda y descubre las novedades que OSMI prepara para ti.",
    image: "https://res.cloudinary.com/dkasxv8fj/image/upload/v1786533285/ChatGPT_Image_Aug_12_2026_05_11_34_AM_wboxeg.png",
    href: "/ayuda",
    action: "Descubrir novedades",
  },
] as const;

const pageNavigation = [
  { id: "inicio", label: "Inicio", href: "#inicio", icon: Home },
  { id: "categorias", label: "Explorar", href: "#categorias", icon: Compass },
  { id: "conciertos", label: "Conciertos", href: "#conciertos", icon: Music2 },
] as const;

const discoveryNavigation = [
  { label: "Favoritos", href: "/dashboard", icon: Heart },
  { label: "Ofertas", href: "/events", icon: BadgePercent },
  { label: "Ayuda", href: "/ayuda", icon: LifeBuoy },
  { label: "Desfragmentado", href: "/desfragmentado", icon: Radio },
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

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  return document.cookie.split("; ").find((part) => part.startsWith(`${name}=`))?.slice(name.length + 1) ?? null;
}

function profileInitials(profile: ProfileSummary): string {
  const source = profile.name || profile.email || "OSMI";
  return source.split(/\s+|@/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "OS";
}

function IconLink({ href, children, icon, onClick }: { href: string; children: ReactNode; icon: ReactNode; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group flex min-h-11 items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white/66 transition hover:bg-white/[.06] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff2bd6]"
    >
      <span className="shrink-0 text-white/45 transition group-hover:text-[#ff63df]">{icon}</span>
      <span className="min-w-0 leading-5">{children}</span>
    </Link>
  );
}

function SidebarContent({ activeSection, onNavigate, profile }: { activeSection: string; onNavigate?: () => void; profile: ProfileSummary }) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <Link
        href="#inicio"
        onClick={onNavigate}
        aria-label="OSMI, inicio"
        className="mb-7 flex min-h-12 items-center gap-3 rounded-xl px-2 text-2xl font-black tracking-[-.06em] text-white focus-visible:outline-2 focus-visible:outline-[#ff2bd6]"
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-[14px] bg-gradient-to-br from-[#ff36d7] to-[#7c3cff] text-[#100414] shadow-[0_0_30px_rgba(255,43,214,.32)]">
          <Ticket size={22} strokeWidth={2.6} />
        </span>
        OSMI<span className="-ml-2 text-[#ff2bd6]">.</span>
      </Link>

      <nav aria-label="Navegación principal" className="space-y-1">
        {pageNavigation.map(({ id, href, icon: Icon, label }) => {
          const active = activeSection === id;
          return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "location" : undefined}
            onClick={() => onNavigate?.()}
            className={`flex min-h-11 items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff2bd6] ${
              active
                ? "border border-[#ff2bd6]/15 bg-gradient-to-r from-[#ff2bd6]/20 to-[#7b61ff]/10 text-white shadow-[inset_3px_0_0_#ff2bd6]"
                : "text-white/62 hover:bg-white/[.06] hover:text-white"
            }`}
          >
            <Icon size={18} className={`shrink-0 ${active ? "text-[#ff5ddd]" : "text-white/42"}`} />
            <span>{label}</span>
          </Link>
          );
        })}
      </nav>

      <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <nav aria-label="Descubrir OSMI" className="space-y-1">
        {discoveryNavigation.map(({ href, icon: Icon, label }) => (
          <IconLink key={label} href={href} icon={<Icon size={18} />} onClick={onNavigate}>{label}</IconLink>
        ))}
        <span aria-disabled="true" title="Próximamente" className="flex min-h-11 cursor-not-allowed items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white/34">
          <Gamepad2 size={18} className="shrink-0" />
          <span className="min-w-0">Minijuegos</span>
          <span className="ml-auto rounded-full border border-[#9c69ff]/25 bg-[#9c69ff]/10 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider text-[#c4a6ff]">Pronto</span>
        </span>
      </nav>

      <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className="space-y-1">
        <IconLink href="/dashboard" icon={<Ticket size={18} />} onClick={onNavigate}>Mis boletos</IconLink>
        <IconLink href={profile.loggedIn ? "/dashboard" : "/login"} icon={<UserRound size={18} />} onClick={onNavigate}>{profile.loggedIn ? "Mi perfil" : "Mi cuenta"}</IconLink>
      </div>

      <div className="mt-4 rounded-2xl border border-[#ff2bd6]/18 bg-[radial-gradient(circle_at_100%_0%,rgba(255,43,214,.16),transparent_48%),rgba(255,255,255,.025)] p-4 xl:mt-auto">
        <span className="inline-flex rounded-full bg-[#ff2bd6]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.18em] text-[#ff75e4]">OSMI Experience</span>
        <p className="mt-3 text-sm font-bold leading-5 text-white">Experiencias memorables, desde el primer clic.</p>
        {profile.loggedIn ? (
          <Link href="/dashboard" onClick={onNavigate} className="mt-4 flex min-h-14 w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[.055] p-2.5 transition hover:border-[#ff2bd6]/35 hover:bg-white/[.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff2bd6]">
            {profile.avatarUrl ? (
              <span role="img" aria-label="Imagen de perfil" className="size-10 shrink-0 rounded-full border border-[#ff2bd6]/35 bg-cover bg-center" style={{ backgroundImage: `url(${JSON.stringify(profile.avatarUrl)})` }} />
            ) : (
              <span aria-label="Avatar de perfil" className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#ff2bd6] to-[#714bff] text-xs font-black text-white">{profileInitials(profile)}</span>
            )}
            <span className="min-w-0 text-left">
              <span className="block truncate text-xs font-black text-white">{profile.name || "Mi perfil"}</span>
              <span className="mt-0.5 block truncate text-[10px] text-white/46">Ver cuenta y boletos</span>
            </span>
          </Link>
        ) : (
          <Link href="/register" onClick={onNavigate} className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-xl bg-[#ff2bd6] px-3 py-2 text-center text-xs font-black leading-4 text-[#17051b] transition hover:bg-[#ff73e3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            Crear cuenta
          </Link>
        )}
      </div>
    </div>
  );
}

function CountdownGrid({ countdown }: { countdown: Countdown }) {
  const units = [
    [countdown.days, "Días"],
    [countdown.hours, "Horas"],
    [countdown.minutes, "Min"],
    [countdown.seconds, "Seg"],
  ] as const;

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState("inicio");
  const [profile, setProfile] = useState<ProfileSummary>({ loggedIn: false, name: "", email: "" });
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

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    let cancelled = false;
    const frame = window.requestAnimationFrame(() => {
      const token = getCookie("token");
      if (!token) return;

      let tokenEmail = "";
      let tokenName = "";
      try {
        const payload = JSON.parse(atob(token.split(".")[1] ?? "")) as Record<string, unknown>;
        tokenEmail = typeof payload.email === "string" ? payload.email : "";
        tokenName = typeof payload.name === "string" ? payload.name : "";
      } catch {
        // El endpoint autenticado sigue siendo la fuente de verdad.
      }

      setProfile({ loggedIn: true, name: tokenName, email: tokenEmail });
      void (async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/v1/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
          if (!response.ok) return;
          const data = await response.json() as Record<string, unknown>;
          const rawAvatar = [data.avatar_url, data.avatarUrl, data.profile_image_url, data.profileImageUrl].find((value) => typeof value === "string") as string | undefined;
          const avatarUrl = rawAvatar && /^https:\/\//i.test(rawAvatar) ? rawAvatar : undefined;
          const name = [data.name, data.full_name, data.display_name, data.username].find((value) => typeof value === "string" && value.trim()) as string | undefined;
          const email = typeof data.email === "string" ? data.email : tokenEmail;
          if (!cancelled) setProfile({ loggedIn: true, name: name ?? tokenName, email, avatarUrl });
        } catch {
          // Conserva el perfil derivado de la sesión sin bloquear la portada.
        }
      })();
    });
    return () => { cancelled = true; window.cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    let frame = 0;
    const sectionIds = pageNavigation.map((item) => item.id);
    const updateActiveSection = () => {
      frame = 0;
      const threshold = window.innerHeight * 0.35;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= threshold) current = id;
      }
      setActiveSection(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };
    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = search.trim();
    router.push(query ? `/events?search=${encodeURIComponent(query)}` : "/events");
  };

  const previousSlide = () => setSlideIndex((current) => (current + slides.length - 1) % slides.length);
  const nextSlide = () => setSlideIndex((current) => (current + 1) % slides.length);

  return (
    <section id="inicio" aria-label="Portada de OSMI" className="relative isolate scroll-mt-4 border-b border-white/[.06] bg-[#04020b]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_54%_12%,rgba(81,34,171,.2),transparent_28%),radial-gradient(circle_at_88%_34%,rgba(255,43,214,.1),transparent_24%)]" />

      <div className="relative mx-auto min-h-[760px] w-full max-w-[1920px] xl:pl-[224px]">
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-[224px] overflow-y-auto border-r border-white/[.07] bg-[#070510]/[.98] p-4 shadow-[18px_0_55px_rgba(0,0,0,.24)] xl:block">
          <SidebarContent activeSection={activeSection} profile={profile} />
        </aside>

        <div className="min-w-0 p-3 sm:p-5 lg:p-6 xl:p-7">
          <div className="mb-4 flex min-h-14 items-center gap-3 lg:mb-5">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={mobileMenuOpen}
              className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[.04] text-white transition hover:border-[#ff2bd6]/40 hover:text-[#ff65df] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff2bd6] xl:hidden"
            >
              <Menu size={21} />
            </button>

            <Link href="#inicio" aria-label="OSMI, inicio" className="mr-auto flex items-center gap-2 text-xl font-black tracking-[-.06em] text-white xl:hidden">
              <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-[#ff36d7] to-[#7c3cff] text-[#100414]"><Ticket size={20} /></span>
              OSMI<span className="-ml-2 text-[#ff2bd6]">.</span>
            </Link>

            <form onSubmit={submitSearch} role="search" className="hidden h-12 min-w-0 max-w-2xl flex-1 items-center rounded-2xl border border-white/[.09] bg-[#090714]/88 shadow-[0_12px_40px_rgba(0,0,0,.18)] transition focus-within:border-[#ff2bd6]/50 lg:flex">
              <Search size={18} className="ml-4 shrink-0 text-white/42" aria-hidden="true" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Buscar eventos, artistas o lugares"
                placeholder="Buscar eventos, artistas o lugares..."
                className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/35"
              />
              <button type="submit" className="mr-1.5 inline-flex min-h-9 shrink-0 items-center justify-center rounded-xl bg-[#ff2bd6] px-4 text-xs font-black text-[#150418] transition hover:bg-[#ff71e2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Buscar
              </button>
            </form>

            <div className="ml-auto flex shrink-0 items-center gap-2">
              <Link href="/ayuda" aria-label="Ayuda y soporte" title="Ayuda y soporte" className="hidden size-11 place-items-center rounded-xl border border-white/[.07] bg-white/[.025] text-white/65 transition hover:border-[#ff2bd6]/30 hover:text-[#ff65df] focus-visible:outline-2 focus-visible:outline-[#ff2bd6] sm:grid"><Headphones size={19} /></Link>
              <Link href="/dashboard" aria-label="Mis boletos" title="Mis boletos" className="hidden size-11 place-items-center rounded-xl border border-white/[.07] bg-white/[.025] text-white/65 transition hover:border-[#ff2bd6]/30 hover:text-[#ff65df] focus-visible:outline-2 focus-visible:outline-[#ff2bd6] sm:grid"><Ticket size={19} /></Link>
              <Link href="/login" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#ff2bd6]/35 bg-[#ff2bd6]/10 px-4 text-sm font-bold text-white transition hover:bg-[#ff2bd6]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff2bd6]">Entrar</Link>
            </div>
          </div>

          <form onSubmit={submitSearch} role="search" className="mb-4 flex h-12 min-w-0 items-center rounded-2xl border border-white/[.09] bg-[#090714]/88 transition focus-within:border-[#ff2bd6]/50 lg:hidden">
            <Search size={18} className="ml-4 shrink-0 text-white/42" aria-hidden="true" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Buscar eventos, artistas o lugares" placeholder="Buscar eventos..." className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/35" />
            <button type="submit" aria-label="Enviar búsqueda" className="mr-1.5 grid size-9 shrink-0 place-items-center rounded-xl bg-[#ff2bd6] text-[#150418]"><ArrowRight size={17} /></button>
          </form>

          <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_310px] xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="relative isolate min-h-[520px] overflow-hidden rounded-[26px] border border-white/[.09] bg-[#100821] shadow-[0_28px_90px_rgba(0,0,0,.42)] sm:min-h-[590px] lg:min-h-[650px]">
              <Image
                key={slide.image}
                src={slide.image}
                alt=""
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 70vw, 62vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,2,11,.96)_0%,rgba(4,2,11,.83)_33%,rgba(4,2,11,.25)_72%,rgba(4,2,11,.08)_100%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04020b]/90 via-transparent to-[#04020b]/10" />

              <div className="relative z-10 flex min-h-[520px] max-w-[690px] flex-col justify-center px-6 py-16 sm:min-h-[590px] sm:px-10 lg:min-h-[650px] lg:px-12">
                <span className="mb-5 w-fit rounded-full border border-[#ff2bd6]/40 bg-[#ff2bd6]/15 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.18em] text-[#ff7ae5] shadow-[0_0_24px_rgba(255,43,214,.18)]">
                  {slide.eyebrow}
                </span>
                <h1 className="max-w-[620px] text-[clamp(2.5rem,5.3vw,5.25rem)] font-black leading-[.98] tracking-[-.06em] text-white">
                  {slide.title}
                </h1>
                <p className="mt-5 max-w-[530px] text-sm leading-7 text-white/72 sm:text-base sm:leading-8">
                  {slide.description}
                </p>
                <Link href={slide.href} className="mt-8 inline-flex min-h-12 w-full max-w-[320px] items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#ff2bd6] to-[#ff4fba] px-5 py-3 text-center text-sm font-black leading-5 text-[#18051b] shadow-[0_14px_40px_rgba(255,43,214,.3)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(255,43,214,.42)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-fit sm:max-w-none">
                  <span>{slide.action}</span><ArrowRight size={18} className="shrink-0" />
                </Link>

                <div className="mt-9 grid max-w-[610px] grid-cols-1 gap-3 border-t border-white/[.09] pt-6 sm:grid-cols-3">
                  <div className="flex items-center gap-3"><ShieldCheck size={20} className="shrink-0 text-[#ff44d8]" /><span className="text-xs font-semibold leading-5 text-white/78">Pago protegido</span></div>
                  <div className="flex items-center gap-3"><Ticket size={20} className="shrink-0 text-[#9f72ff]" /><span className="text-xs font-semibold leading-5 text-white/78">Entrega inmediata</span></div>
                  <div className="flex items-center gap-3"><Headphones size={20} className="shrink-0 text-[#42ddff]" /><span className="text-xs font-semibold leading-5 text-white/78">Soporte real</span></div>
                </div>
              </div>

              <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2 sm:inset-x-5 sm:bottom-auto sm:right-auto sm:top-1/2 sm:-translate-y-1/2 sm:justify-between">
                <button type="button" onClick={previousSlide} aria-label="Anuncio anterior" className="grid size-11 place-items-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition hover:border-[#ff2bd6]/60 hover:bg-[#ff2bd6]/20 focus-visible:outline-2 focus-visible:outline-[#ff2bd6]"><ChevronLeft size={20} /></button>
                <button type="button" onClick={nextSlide} aria-label="Anuncio siguiente" className="grid size-11 place-items-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition hover:border-[#ff2bd6]/60 hover:bg-[#ff2bd6]/20 focus-visible:outline-2 focus-visible:outline-[#ff2bd6]"><ChevronRight size={20} /></button>
              </div>

              <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 gap-2" aria-label={`Anuncio ${slideIndex + 1} de ${slides.length}`}>
                {slides.map((item, index) => (
                  <button key={item.image} type="button" onClick={() => setSlideIndex(index)} aria-label={`Mostrar anuncio ${index + 1}`} aria-current={index === slideIndex ? "true" : undefined} className={`h-2.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${index === slideIndex ? "w-8 bg-[#ff2bd6] shadow-[0_0_14px_#ff2bd6]" : "w-2.5 bg-white/42 hover:bg-white/75"}`} />
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-[minmax(0,1.15fr)_minmax(0,.85fr)]">
              <article className="group relative min-h-[360px] overflow-hidden rounded-[26px] border border-white/[.09] bg-[#0b0818] shadow-[0_24px_70px_rgba(0,0,0,.32)] lg:min-h-0">
                {featured?.image_url ? (
                  <Image src={featured.image_url} alt="" fill className="object-cover transition duration-700 group-hover:scale-[1.035]" sizes="(max-width: 640px) 100vw, 320px" />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(123,97,255,.6),transparent_35%),radial-gradient(circle_at_70%_48%,rgba(255,43,214,.32),transparent_33%),linear-gradient(150deg,#160b30,#070511)]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05020d] via-[#05020d]/48 to-black/10" />
                <div className="relative flex h-full min-h-[360px] flex-col justify-between p-5 lg:min-h-0">
                  <span className="w-fit rounded-full bg-[#ff2bd6] px-3 py-1.5 text-[9px] font-black uppercase tracking-[.16em] text-[#160318] shadow-[0_0_24px_rgba(255,43,214,.4)]">Evento destacado</span>
                  <div className="pt-24">
                    <h2 className="text-2xl font-black leading-tight tracking-[-.035em] text-white">{featured?.name ?? "Tu próxima experiencia"}</h2>
                    <div className="mt-4 space-y-2 text-xs font-semibold leading-5 text-white/76">
                      {featuredDate && <p className="flex items-start gap-2"><CalendarDays size={15} className="mt-0.5 shrink-0 text-[#ff59dc]" /><span>{new Date(featuredDate).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" })}</span></p>}
                      <p className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 shrink-0 text-[#ff59dc]" /><span>{featured?.location ?? "Próximamente"}</span></p>
                    </div>
                    {featured && <p className="mt-4 text-sm font-black text-white">Desde ${featured.min_price.toLocaleString("es-MX")} MXN</p>}
                    <Link href={featured ? `/events/${featured.public_id}` : "/events"} className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/16 bg-black/38 px-4 py-2 text-center text-sm font-bold leading-5 text-white backdrop-blur-md transition hover:border-[#ff2bd6]/55 hover:bg-[#ff2bd6]/16 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff2bd6]">
                      Ver evento <ArrowRight size={16} className="shrink-0" />
                    </Link>
                  </div>
                </div>
              </article>

              <article className="relative overflow-hidden rounded-[26px] border border-[#963dff]/28 bg-[radial-gradient(circle_at_100%_0%,rgba(255,43,214,.24),transparent_45%),linear-gradient(145deg,#1c0835,#0d071d)] p-5 shadow-[0_20px_60px_rgba(82,24,157,.18)]">
                <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-[#ff2bd6]/20 blur-3xl" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[.2em] text-[#d98cff]">Acceso preferente</span>
                      <h2 className="mt-2 text-xl font-black tracking-tight text-white">Preventa exclusiva</h2>
                    </div>
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-[#ff2bd6]/25 bg-[#ff2bd6]/12 text-[#ff5edf]"><Clock3 size={19} /></span>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-white/62">Tiempo restante para vivir el evento destacado.</p>
                  <div className="my-4 h-px bg-white/[.08]" />
                  <CountdownGrid countdown={countdown} />
                  <Link href={featured ? `/events/${featured.public_id}` : "/events"} className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff2bd6] to-[#b64dff] px-4 py-3 text-center text-sm font-black leading-5 text-white shadow-[0_12px_36px_rgba(255,43,214,.25)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                    Acceder ahora <ArrowRight size={17} className="shrink-0" />
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] xl:hidden" role="dialog" aria-modal="true" aria-label="Menú de navegación">
          <button type="button" aria-label="Cerrar menú" onClick={() => setMobileMenuOpen(false)} className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
          <aside className="relative h-full w-[min(88vw,320px)] overflow-y-auto border-r border-white/10 bg-[#070510] p-5 shadow-2xl">
            <button type="button" onClick={() => setMobileMenuOpen(false)} aria-label="Cerrar menú" className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[.04] text-white"><X size={20} /></button>
            <SidebarContent activeSection={activeSection} profile={profile} onNavigate={() => setMobileMenuOpen(false)} />
          </aside>
        </div>
      )}
    </section>
  );
}

