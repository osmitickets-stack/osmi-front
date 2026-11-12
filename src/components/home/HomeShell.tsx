"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  BadgePercent,
  BriefcaseBusiness,
  Compass,
  Gamepad2,
  Heart,
  Home,
  LifeBuoy,
  Menu,
  Music2,
  Radio,
  Ticket,
  UserRound,
  X,
} from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

type HomeShellProps = { children: ReactNode };

type ProfileSummary = {
  loggedIn: boolean;
  name: string;
  email: string;
  avatarUrl?: string;
};

const sectionNavigation = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "categorias", label: "Explorar", icon: Compass },
  { id: "conciertos", label: "Conciertos", icon: Music2 },
  { id: "favoritos", label: "Favoritos", icon: Heart },
  { id: "ofertas", label: "Ofertas", icon: BadgePercent },
  { id: "ayuda", label: "Ayuda", icon: LifeBuoy },
  { id: "desfragmentado", label: "Desfragmentado", icon: Radio },
  { id: "minijuegos", label: "Minijuegos", icon: Gamepad2 },
  { id: "organizadores", label: "Organizadores", icon: BriefcaseBusiness },
] as const;

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  return document.cookie.split("; ").find((part) => part.startsWith(`${name}=`))?.slice(name.length + 1) ?? null;
}

function profileInitials(profile: ProfileSummary): string {
  const source = profile.name || profile.email || "OSMI";
  return source.split(/\s+|@/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "OS";
}

function Sidebar({ activeSection, closeMenu, profile }: { activeSection: string; closeMenu?: () => void; profile: ProfileSummary }) {
  return (
    <div className="flex min-h-full flex-col">
      <Link href="#inicio" onClick={closeMenu} aria-label="OSMI, inicio" className="mb-6 flex min-h-12 items-center gap-3 rounded-xl px-2 text-2xl font-black tracking-[-.06em] text-white focus-visible:outline-2 focus-visible:outline-[#ff2bd6]">
        <span className="grid size-10 shrink-0 place-items-center rounded-[14px] bg-gradient-to-br from-[#ff36d7] to-[#7c3cff] text-[#100414] shadow-[0_0_30px_rgba(255,43,214,.32)]"><Ticket size={22} strokeWidth={2.6} /></span>
        OSMI<span className="-ml-2 text-[#ff2bd6]">.</span>
      </Link>

      <nav aria-label="Secciones de la portada" className="space-y-1">
        {sectionNavigation.map(({ id, icon: Icon, label }) => {
          const active = activeSection === id;
          return (
            <Link
              key={id}
              href={`#${id}`}
              onClick={closeMenu}
              aria-current={active ? "location" : undefined}
              className={`group flex min-h-10 items-center gap-3 rounded-xl px-3.5 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff2bd6] ${active ? "border border-[#ff2bd6]/14 bg-gradient-to-r from-[#ff2bd6]/19 to-[#7b61ff]/8 text-white shadow-[inset_3px_0_0_#ff2bd6]" : "text-white/58 hover:bg-white/[.05] hover:text-white"}`}
            >
              <Icon size={17} className={`shrink-0 transition ${active ? "text-[#ff5ddd]" : "text-white/38 group-hover:text-[#ff5ddd]"}`} />
              <span className="min-w-0 truncate">{label}</span>
              {id === "minijuegos" && <span className="ml-auto rounded-full border border-[#9c69ff]/25 bg-[#9c69ff]/10 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider text-[#c4a6ff]">Pronto</span>}
            </Link>
          );
        })}
      </nav>

      <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <Link href={profile.loggedIn ? "/dashboard" : "/login"} onClick={closeMenu} className="group flex min-h-10 items-center gap-3 rounded-xl px-3.5 py-2 text-sm font-semibold text-white/62 transition hover:bg-white/[.05] hover:text-white focus-visible:outline-2 focus-visible:outline-[#ff2bd6]"><Ticket size={17} className="shrink-0 text-white/38 group-hover:text-[#ff5ddd]" />{profile.loggedIn ? "Mis boletos y perfil" : "Mis boletos"}</Link>

      <div className="mt-5 rounded-2xl border border-[#ff2bd6]/18 bg-[radial-gradient(circle_at_100%_0%,rgba(255,43,214,.16),transparent_48%),rgba(255,255,255,.025)] p-4 2xl:mt-auto">
        <span className="inline-flex rounded-full bg-[#ff2bd6]/15 px-2.5 py-1 text-[9px] font-black uppercase tracking-[.17em] text-[#ff75e4]">OSMI Experience</span>
        <p className="mt-3 text-sm font-bold leading-5 text-white">Experiencias memorables, desde el primer clic.</p>
        {profile.loggedIn ? (
          <Link href="/dashboard" onClick={closeMenu} className="mt-4 flex min-h-14 w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[.055] p-2.5 transition hover:border-[#ff2bd6]/35 hover:bg-white/[.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff2bd6]">
            {profile.avatarUrl ? (
              <span role="img" aria-label="Imagen de perfil" className="size-10 shrink-0 rounded-full border border-[#ff2bd6]/35 bg-cover bg-center" style={{ backgroundImage: `url(${JSON.stringify(profile.avatarUrl)})` }} />
            ) : (
              <span aria-label="Avatar de perfil" className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#ff2bd6] to-[#714bff] text-xs font-black text-white">{profileInitials(profile)}</span>
            )}
            <span className="min-w-0 text-left"><span className="block truncate text-xs font-black text-white">{profile.name || "Mi perfil"}</span><span className="mt-0.5 block truncate text-[10px] text-white/46">Ver cuenta y boletos</span></span>
          </Link>
        ) : (
          <Link href="/login" onClick={closeMenu} className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-xl bg-[#ff2bd6] px-3 py-2 text-center text-xs font-black text-[#17051b] transition hover:bg-[#ff73e3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Entrar o crear cuenta</Link>
        )}
      </div>
    </div>
  );
}

export function HomeShell({ children }: HomeShellProps) {
  const [activeSection, setActiveSection] = useState("inicio");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profile, setProfile] = useState<ProfileSummary>({ loggedIn: false, name: "", email: "" });

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
          // La navegación sigue disponible aunque falle el resumen del perfil.
        }
      })();
    });
    return () => { cancelled = true; window.cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    let frame = 0;
    const ids = sectionNavigation.map((item) => item.id);
    const update = () => {
      frame = 0;
      const threshold = window.innerHeight * 0.36;
      let current = ids[0];
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= threshold) current = id;
      }
      setActiveSection(current);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_18%_4%,rgba(104,46,205,.16),transparent_27%),linear-gradient(135deg,#05020e,#090416_55%,#05020e)] xl:grid xl:grid-cols-[224px_minmax(0,1fr)] xl:gap-4 xl:p-3">
      <aside className="relative z-30 hidden min-h-full rounded-[24px] border border-white/[.07] bg-[linear-gradient(180deg,rgba(10,6,22,.96)_0%,rgba(6,3,14,.94)_58%,rgba(11,5,23,.96)_100%)] shadow-[0_24px_80px_rgba(0,0,0,.28)] xl:block">
        <div className="sticky top-3 h-[calc(100vh-1.5rem)] overflow-y-auto p-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"><Sidebar activeSection={activeSection} profile={profile} /></div>
      </aside>

      <div className="min-w-0 xl:overflow-hidden xl:rounded-[24px] xl:border xl:border-white/[.055] xl:bg-[#06030f] xl:shadow-[0_24px_90px_rgba(0,0,0,.22)]">
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/[.07] bg-[#070510]/95 px-4 backdrop-blur-xl xl:hidden">
          <button type="button" onClick={() => setMobileMenuOpen(true)} aria-label="Abrir menú" aria-expanded={mobileMenuOpen} className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[.04] text-white focus-visible:outline-2 focus-visible:outline-[#ff2bd6]"><Menu size={21} /></button>
          <Link href="#inicio" aria-label="OSMI, inicio" className="flex items-center gap-2 text-xl font-black tracking-[-.06em] text-white"><span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-[#ff36d7] to-[#7c3cff] text-[#100414]"><Ticket size={20} /></span>OSMI<span className="-ml-2 text-[#ff2bd6]">.</span></Link>
          <Link href={profile.loggedIn ? "/dashboard" : "/login"} aria-label={profile.loggedIn ? "Abrir perfil" : "Iniciar sesión"} className="grid size-11 place-items-center rounded-xl border border-[#ff2bd6]/25 bg-[#ff2bd6]/10 text-[#ff70e2] focus-visible:outline-2 focus-visible:outline-[#ff2bd6]"><UserRound size={20} /></Link>
        </header>
        {children}
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] xl:hidden" role="dialog" aria-modal="true" aria-label="Menú de navegación">
          <button type="button" aria-label="Cerrar menú" onClick={() => setMobileMenuOpen(false)} className="absolute inset-0 bg-black/78 backdrop-blur-sm" />
          <aside className="relative h-full w-[min(88vw,320px)] overflow-y-auto border-r border-white/10 bg-[linear-gradient(180deg,#080510,#06030e)] p-5 shadow-2xl">
            <button type="button" onClick={() => setMobileMenuOpen(false)} aria-label="Cerrar menú" className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[.04] text-white"><X size={20} /></button>
            <Sidebar activeSection={activeSection} profile={profile} closeMenu={() => setMobileMenuOpen(false)} />
          </aside>
        </div>
      )}
    </div>
  );
}

