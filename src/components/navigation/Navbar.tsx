"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Ticket, LogOut, Menu, X, Search, Building2 } from "lucide-react";

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
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const token = getCookie("token");
    setIsLoggedIn(!!token);

    // Verificar si el usuario es organizador
    if (token) {
      checkIfOrganizer(token);
    } else {
      setIsOrganizer(false);
    }
  }, [pathname]);

  const checkIfOrganizer = async (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.user_id;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/organizers?user_id=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        const data = await res.json();
        const organizer = data.organizers?.[0];
        // Solo considerar organizador si está aprobado
        setIsOrganizer(organizer && organizer.approval_status === "approved");
      } else {
        setIsOrganizer(false);
      }
    } catch (error) {
      setIsOrganizer(false);
    }
  };

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsLoggedIn(false);
    setIsOrganizer(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-background/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* ======================== LOGO ======================== */}
        <Link
          href="/"
          className="shrink-0 whitespace-nowrap text-2xl font-black tracking-tight text-gradient"
        >
          ★ MyOsmi ★
        </Link>

        {/* ======================== SEARCH ======================== */}
        <div className="hidden lg:flex relative max-w-[380px] flex-1 mx-4">
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Buscar eventos, artistas, lugares..."
            className="h-11 w-full rounded-xl border border-white/[0.06] bg-white/[0.03] pl-11 pr-4 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
          />
        </div>

        {/* ======================== CENTRO: NAVEGACIÓN ======================== */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link
            href="/events"
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              pathname.startsWith("/events")
                ? "bg-white/[0.06] text-foreground"
                : "text-muted hover:bg-white/[0.03] hover:text-foreground"
            }`}
          >
            Explorar
          </Link>

          <Link
            href="/categorias"
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              pathname.startsWith("/categorias")
                ? "bg-white/[0.06] text-foreground"
                : "text-muted hover:bg-white/[0.03] hover:text-foreground"
            }`}
          >
            Categorías
          </Link>

          {/* ======================== BOTÓN PARA ORGANIZADORES (SOLO SI ES ORGANIZADOR) ======================== */}
          {isOrganizer && (
            <Link
              href="/organizador"
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1.5 ${
                pathname.startsWith("/organizador")
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted hover:bg-white/[0.03] hover:text-foreground"
              }`}
            >
              <Building2 size={16} />
              Mi Panel
            </Link>
          )}
        </nav>

        {/* ======================== DERECHA: AUTH ======================== */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-white/[0.03] hover:text-foreground"
              >
                <Ticket size={16} />
                Mis boletos
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-white/[0.03] hover:text-foreground"
              >
                <LogOut size={16} />
                Salir
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="whitespace-nowrap rounded-xl border border-white/[0.06] px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-white/[0.03] hover:text-foreground"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/register"
                className="whitespace-nowrap rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>

        {/* ======================== MOBILE TOGGLE ======================== */}
        <button
          className="ml-auto shrink-0 p-2 text-foreground lg:hidden"
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
            href="/categorias"
            className="block py-2.5 text-sm font-medium text-muted hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Categorías
          </Link>

          {/* ======================== BOTÓN PARA ORGANIZADORES EN MÓVIL ======================== */}
          {isOrganizer && (
            <Link
              href="/organizador"
              className="block py-2.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
              onClick={() => setMobileOpen(false)}
            >
              <Building2 size={16} />
              Mi Panel
            </Link>
          )}

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