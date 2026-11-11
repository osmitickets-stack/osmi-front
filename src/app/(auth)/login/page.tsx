"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, Mail, Sparkles, Ticket } from "lucide-react";
import { api } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await api.post<{ token: string }>("/v1/auth/login", { email, password });
      const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24;
      document.cookie = `token=${result.token}; path=/; max-age=${maxAge}; SameSite=Lax`;
      router.push("/dashboard");
    } catch {
      setError("No pudimos iniciar sesión. Revisa tu correo y contraseña e inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen bg-[#080611] lg:grid-cols-[1fr_1fr]">
      <div className="relative hidden min-h-screen flex-col justify-between overflow-hidden bg-[radial-gradient(circle_at_25%_20%,rgba(255,43,214,.25),transparent_37%),radial-gradient(circle_at_80%_85%,rgba(123,97,255,.28),transparent_42%),linear-gradient(145deg,#1b0d30,#0a071a)] p-12 lg:flex xl:p-16">
        <Link href="/" aria-label="OSMI, inicio" className="relative z-10 inline-flex w-fit items-center gap-2 text-2xl font-black tracking-[-.06em] text-white"><span className="grid size-10 place-items-center rounded-xl bg-primary text-[#17051c]"><Ticket size={23} /></span>OSMI<span className="text-primary">.</span></Link>
        <div className="pointer-events-none absolute left-[18%] top-[22%] size-[420px] rounded-full border border-primary/20 shadow-[0_0_100px_rgba(255,43,214,.13),inset_0_0_100px_rgba(123,97,255,.12)] xl:size-[540px]" />
        <div className="pointer-events-none absolute left-[28%] top-[30%] size-[280px] rotate-12 rounded-[50px] border border-white/10 bg-white/[.03] shadow-[0_30px_100px_rgba(0,0,0,.2)] backdrop-blur xl:size-[340px]" />
        <div className="relative z-10 max-w-lg">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-[#ff80e7]"><Sparkles size={14} /> Tu próxima experiencia</span>
          <p className="mt-6 text-5xl font-black leading-[1.05] tracking-[-.055em] text-white xl:text-6xl">Cada gran momento empieza aquí.</p>
          <p className="mt-5 max-w-md text-base leading-7 text-white/70">Entra a tu cuenta para consultar tus boletos y descubrir lo que viene.</p>
        </div>
        <p className="relative z-10 text-xs text-white/45">OSMI · Eventos para recordar</p>
      </div>

      <div className="flex min-h-screen flex-col px-5 py-6 sm:px-10 lg:px-14">
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted transition hover:text-white"><ArrowLeft size={16} /> Volver al inicio</Link>
          <Link href="/" className="inline-flex items-center gap-1 text-lg font-black tracking-[-.06em] text-white lg:hidden">OSMI<span className="text-primary">.</span></Link>
        </div>
        <main className="mx-auto flex w-full max-w-[440px] flex-1 flex-col justify-center py-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[.22em] text-primary">Bienvenido a OSMI</p>
          <h1 className="text-4xl font-bold tracking-[-.045em] text-white sm:text-5xl">Qué gusto verte de nuevo.</h1>
          <p className="mt-4 text-sm leading-6 text-muted">Inicia sesión para continuar con tus eventos y boletos.</p>

          <form onSubmit={handleSubmit} className="mt-9 space-y-5">
            {error && <p role="alert" className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm leading-6 text-[#ffb4b4]">{error}</p>}
            <div>
              <label htmlFor="login-email" className="mb-2 block text-sm font-semibold text-white">Correo electrónico</label>
              <div className="relative"><Mail size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" /><input id="login-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required placeholder="tu@correo.com" className="h-14 w-full rounded-xl border border-white/15 bg-white/[.04] pl-12 pr-4 text-base text-white placeholder:text-muted-dark outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20" /></div>
            </div>
            <div>
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2"><label htmlFor="login-password" className="text-sm font-semibold text-white">Contraseña</label><Link href="/ayuda" className="text-xs font-semibold text-[#ff80e7] underline-offset-4 hover:underline">¿Necesitas ayuda para entrar?</Link></div>
              <div className="relative"><LockKeyhole size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" /><input id="login-password" type={showPassword ? "text" : "password"} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required placeholder="Tu contraseña" className="h-14 w-full rounded-xl border border-white/15 bg-white/[.04] pl-12 pr-14 text-base text-white placeholder:text-muted-dark outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20" /><button type="button" aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"} onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-lg text-muted transition hover:text-white">{showPassword ? <EyeOff size={19} /> : <Eye size={19} />}</button></div>
            </div>
            <label className="inline-flex min-h-11 cursor-pointer items-center gap-3 text-sm text-muted"><input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} className="size-4 accent-primary" />Recordarme en este dispositivo</label>
            <button type="submit" disabled={loading} className="flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-base font-bold text-[#16051a] transition hover:bg-[#ff78e3] disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{loading ? "Ingresando…" : "Iniciar sesión"}{!loading && <ArrowRight size={18} />}</button>
          </form>
          <p className="mt-8 text-center text-sm text-muted">¿Aún no tienes cuenta? <Link href="/register" className="font-bold text-[#ff80e7] underline-offset-4 hover:underline">Crea una cuenta</Link></p>
        </main>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-xs text-muted">
          <Link href="/ayuda" className="hover:text-white">Ayuda</Link><Link href="/docs/privacidad.pdf" className="hover:text-white">Privacidad</Link><Link href="/docs/terminos.pdf" className="hover:text-white">Términos</Link>
        </div>
      </div>
    </div>
  );
}

