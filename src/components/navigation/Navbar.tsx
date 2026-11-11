"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, LogOut, Menu, Search, Ticket, X } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  return document.cookie.split("; ").find((part) => part.startsWith(`${name}=`))?.slice(name.length + 1) ?? null;
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [organizer, setOrganizer] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;
    const frame = requestAnimationFrame(() => {
      const token = getCookie("token");
      setLoggedIn(Boolean(token));
      if (!token) { setOrganizer(false); return; }
      void (async () => {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          const response = await fetch(`${API_BASE_URL}/v1/organizers?user_id=${encodeURIComponent(payload.user_id)}`, { headers: { Authorization: `Bearer ${token}` } });
          const data = response.ok ? await response.json() : null;
          if (!cancelled) setOrganizer(data?.organizers?.[0]?.approval_status === "approved");
        } catch { if (!cancelled) setOrganizer(false); }
      })();
    });
    return () => { cancelled = true; cancelAnimationFrame(frame); };
  }, [pathname]);

  const navigateSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = search.trim();
    router.push(query ? `/events?search=${encodeURIComponent(query)}` : "/events");
    setOpen(false);
  };

  const logout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setLoggedIn(false); setOrganizer(false); setOpen(false);
    router.push("/");
  };

  const linkClass = (active: boolean) => `inline-flex min-h-11 items-center rounded-xl px-4 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-primary ${active ? "bg-primary/15 text-[#ff86e8]" : "text-white/70 hover:bg-white/[.06] hover:text-white"}`;
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080611]/95 backdrop-blur-xl">
      <div className="section-inner flex h-[72px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="OSMI, inicio" className="inline-flex shrink-0 items-center gap-2 text-xl font-black tracking-[-.06em] text-white focus-visible:outline-2 focus-visible:outline-primary"><span className="grid size-9 place-items-center rounded-xl bg-primary text-[#17051c]"><Ticket size={21} strokeWidth={2.5} /></span>OSMI<span className="text-primary">.</span></Link>
        <nav aria-label="Navegación principal" className="ml-4 hidden items-center gap-1 xl:flex">
          <Link href="/events" className={linkClass(pathname.startsWith("/events"))}>Explorar</Link>
          <Link href="/events#categorias" className={linkClass(false)}>Categorías</Link>
          <Link href="/para-organizadores" className={linkClass(pathname.startsWith("/para-organizadores"))}>Organizadores</Link>
          <Link href="/ayuda" className={linkClass(pathname.startsWith("/ayuda"))}>Ayuda</Link>
        </nav>
        <form onSubmit={navigateSearch} role="search" className="ml-auto hidden min-w-0 max-w-xs flex-1 items-center rounded-xl border border-white/10 bg-white/[.04] focus-within:border-primary/50 md:flex">
          <Search size={17} className="ml-3 shrink-0 text-muted" aria-hidden="true" />
          <input aria-label="Buscar eventos" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar eventos..." className="h-10 min-w-0 flex-1 bg-transparent px-3 text-sm text-white placeholder:text-muted outline-none" />
          <button type="submit" aria-label="Enviar búsqueda" className="mr-1 grid size-9 shrink-0 place-items-center rounded-lg text-muted transition hover:bg-primary/20 hover:text-white"><ArrowRight size={16} /></button>
        </form>
        <div className="ml-auto hidden shrink-0 items-center gap-2 md:flex">
          {loggedIn ? (
            <>
              <Link href="/dashboard" className={linkClass(pathname.startsWith("/dashboard"))}><Ticket size={16} className="mr-2" />Mis boletos</Link>
              {organizer && <Link href="/organizador" className={linkClass(pathname.startsWith("/organizador"))}>Mi panel</Link>}
              <button type="button" onClick={logout} aria-label="Cerrar sesión" title="Cerrar sesión" className="grid size-11 place-items-center rounded-xl text-muted transition hover:bg-white/[.06] hover:text-white"><LogOut size={18} /></button>
            </>
          ) : (
            <>
              <Link href="/login" className={linkClass(pathname === "/login")}>Entrar</Link>
              <Link href="/register" className="inline-flex min-h-11 items-center rounded-xl bg-primary px-5 text-sm font-bold text-[#16051a] transition hover:bg-[#ff78e3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Crear cuenta</Link>
            </>
          )}
        </div>
        <button type="button" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)} className="ml-auto grid size-11 place-items-center rounded-xl border border-white/10 text-white md:hidden">{open ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
      {open && <div id="mobile-navigation" className="border-t border-white/10 bg-[#0b0819] px-4 pb-5 pt-4 md:hidden">
        <form onSubmit={navigateSearch} role="search" className="mx-auto mb-4 flex max-w-xl items-center rounded-xl border border-white/10 bg-white/[.05] px-3"><Search size={17} className="text-muted" /><input aria-label="Buscar eventos" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar eventos..." className="h-12 min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none" /><button type="submit" aria-label="Buscar" className="grid size-10 place-items-center text-primary"><ArrowRight size={18} /></button></form>
        <nav aria-label="Navegación móvil" className="mx-auto grid max-w-xl gap-1">
          {[["Explorar eventos","/events"],["Categorías","/events#categorias"],["Para organizadores","/para-organizadores"],["Ayuda y reembolsos","/ayuda"]].map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-white/85 hover:bg-white/[.06]">{label}</Link>)}
          <div className="mt-2 border-t border-white/10 pt-3">
            {loggedIn ? <><Link href="/dashboard" onClick={() => setOpen(false)} className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-white">Mis boletos</Link>{organizer && <Link href="/organizador" onClick={() => setOpen(false)} className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-white">Mi panel</Link>}<button type="button" onClick={logout} className="flex min-h-11 w-full items-center rounded-xl px-3 text-left text-sm text-muted">Cerrar sesión</button></> : <div className="grid grid-cols-2 gap-3"><Link href="/login" onClick={() => setOpen(false)} className="flex min-h-11 items-center justify-center rounded-xl border border-white/20 text-sm font-semibold text-white">Entrar</Link><Link href="/register" onClick={() => setOpen(false)} className="flex min-h-11 items-center justify-center rounded-xl bg-primary text-sm font-bold text-[#16051a]">Crear cuenta</Link></div>}
          </div>
        </nav>
      </div>}
    </header>
  );
}

