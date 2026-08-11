"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Ticket, LogOut, Menu, X, Search } from "lucide-react";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!getCookie("token"));
  }, [pathname]);

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-background/80 backdrop-blur-2xl">
      <div className="mx-auto flex items-center h-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] gap-4 lg:gap-6">
        
        {/* ======================== LOGO ======================== */}
        <Link href="/" className="text-2xl font-black text-gradient shrink-0 tracking-tight">
          osmi
        </Link>

        {/* ======================== SEARCH ======================== */}
        <div className="hidden lg:flex flex-1 max-w-[420px] relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Buscar eventos, artistas, lugares..."
            className="w-full h-11 rounded-xl border border-white/[0.06] bg-white/[0.03] pl-11 pr-4 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
          />
        </div>

        {/* ======================== NAVEGACIÓN ======================== */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link 
            href="/events" 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname.startsWith("/events") 
                ? "bg-white/[0.06] text-foreground" 
                : "text-muted hover:text-foreground hover:bg-white/[0.03]"
            }`}
          >
            Explorar
          </Link>
          <Link 
            href="/events" 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname === "/categorias" 
                ? "bg-white/[0.06] text-foreground" 
                : "text-muted hover:text-foreground hover:bg-white/[0.03]"
            }`}
          >
            Categorías
          </Link>
          <Link 
            href="/para-organizadores" 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname === "/organizadores" 
                ? "bg-white/[0.06] text-foreground" 
                : "text-muted hover:text-foreground hover:bg-white/[0.03]"
            }`}
          >
            Para Organizadores
          </Link>
        </nav>

        {/* ======================== AUTH ======================== */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {isLoggedIn ? (
            <>
              <Link 
                href="/dashboard" 
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-foreground hover:bg-white/[0.03] transition-colors"
              >
                <Ticket size={16} />
                Mis boletos
              </Link>
              <button 
                onClick={handleLogout} 
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-foreground hover:bg-white/[0.03] transition-colors"
              >
                <LogOut size={16} />
                Salir
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/login" 
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-foreground hover:bg-white/[0.03] transition-colors border border-white/[0.06]"
              >
                Iniciar Sesión
              </Link>
              <Link 
                href="/register" 
                className="px-6 py-2.5 rounded-xl bg-primary text-sm font-bold text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>

        {/* ======================== MOBILE TOGGLE ======================== */}
        <button 
          className="lg:hidden text-foreground p-2 ml-auto" 
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menú"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ======================== MOBILE MENU ======================== */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/[0.06] bg-background/95 backdrop-blur-2xl px-6 py-5 space-y-4 fade-in">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none" />
            <input 
              type="text" 
              placeholder="Buscar eventos..." 
              className="w-full h-11 rounded-xl border border-white/[0.06] bg-white/[0.03] pl-11 pr-4 text-sm text-foreground placeholder:text-muted-dark outline-none focus:border-primary/30 focus:bg-white/[0.05]"
            />
          </div>
          
          <Link 
            href="/events" 
            className="block py-2.5 text-sm font-medium text-muted hover:text-foreground transition-colors" 
            onClick={() => setMobileOpen(false)}
          >
            Explorar
          </Link>
          <Link 
            href="/events" 
            className="block py-2.5 text-sm font-medium text-muted hover:text-foreground transition-colors" 
            onClick={() => setMobileOpen(false)}
          >
            Categorías
          </Link>
          <Link 
            href="/para-organizadores" 
            className="block py-2.5 text-sm font-medium text-muted hover:text-foreground transition-colors" 
            onClick={() => setMobileOpen(false)}
          >
            Para Organizadores
          </Link>
          
          <hr className="border-white/[0.06]" />
          
          {isLoggedIn ? (
            <>
              <Link 
                href="/dashboard" 
                className="block py-2.5 text-sm font-medium text-primary" 
                onClick={() => setMobileOpen(false)}
              >
                Mis boletos
              </Link>
              <button 
                onClick={() => { handleLogout(); setMobileOpen(false); }} 
                className="block py-2.5 text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/login" 
                className="block py-2.5 text-sm font-medium text-muted hover:text-foreground transition-colors" 
                onClick={() => setMobileOpen(false)}
              >
                Iniciar Sesión
              </Link>
              <Link 
                href="/register" 
                className="block w-full text-center py-3.5 rounded-xl bg-primary text-sm font-bold text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/20" 
                onClick={() => setMobileOpen(false)}
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};