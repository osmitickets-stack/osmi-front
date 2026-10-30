"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CameraReader } from "@/modules/scanner/CameraReader";
import { listScannerEvents, scannerTransport, sessionToken, type ScannerEvent } from "@/modules/scanner/api";
import { resultLabels, scannerError, ScannerSession, type ScannerState } from "@/modules/scanner/session";

export default function ScannerPage() {
  const [state, setState] = useState<ScannerState>({ phase: "idle", event: "" });
  const [session] = useState(() => new ScannerSession(scannerTransport, sessionToken, setState));
  const [events, setEvents] = useState<ScannerEvent[]>([]);
  const [cursor, setCursor] = useState("");
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState("");
  const [draft, setDraft] = useState("");
  const busy = state.phase === "confirming" || state.phase === "validating";

  useEffect(() => {
    let mounted = true;
    listScannerEvents().then(page => {
      if (!mounted) return;
      setEvents(page.events); setCursor(page.nextCursor);
    }).catch(error => { if (mounted) setListError(scannerError(error)); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; session.dispose(); };
  }, [session]);

  async function loadMore(retry = false) {
    if (loading) return;
    setLoading(true); setListError("");
    try {
      const page = await listScannerEvents(retry ? "" : cursor);
      setEvents(previous => retry ? page.events : [...new Map([...previous, ...page.events].map(event => [event.publicId, event])).values()]);
      setCursor(page.nextCursor);
      if (retry) { session.selectEvent(""); setDraft(""); }
    } catch (error) { setListError(scannerError(error)); }
    finally { setLoading(false); }
  }

  const selected = events.find(event => event.publicId === state.event);
  const message = state.message ?? (state.result ? resultLabels[state.result] ?? "El servidor no autorizó el acceso. Revisa el boleto con el responsable del evento." : "Valida un boleto para consultar su estado. Todavía no se registrará ningún acceso.");

  return <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-8">
    <div className="mx-auto max-w-5xl space-y-7">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div><p className="text-sm font-semibold tracking-widest text-emerald-300">OSMI · CONTROL DE ACCESO</p><h1 className="mt-2 text-3xl font-bold">Scanner de boletos</h1><p className="mt-2 text-slate-400">Validar primero. Confirmar el acceso después.</p></div>
        <Link href="/dashboard" className="rounded-xl border border-white/15 px-4 py-3">Volver al panel</Link>
      </header>
      <section className="rounded-2xl border border-white/10 bg-white/5 p-5" aria-label="Evento autorizado">
        <label htmlFor="scanner-event" className="mb-2 block font-semibold">1. Selecciona el evento</label>
        <select id="scanner-event" value={state.event} disabled={busy || loading} onChange={e => { session.selectEvent(e.target.value); setDraft(""); }} className="min-h-12 w-full rounded-xl border border-white/20 bg-slate-900 px-3 disabled:opacity-50">
          <option value="">Selecciona un evento autorizado</option>
          {events.map(event => <option key={event.publicId} value={event.publicId}>{event.name}</option>)}
        </select>
        {loading && <p role="status" className="mt-3 text-sm">Consultando permisos y eventos…</p>}
        {!loading && !listError && events.length === 0 && <p className="mt-3 text-sm text-slate-300">{cursor ? "No hay eventos autorizados en esta página. Puedes consultar los siguientes." : "No tienes eventos disponibles para control de acceso. Solicita acceso al responsable del evento."}</p>}
        {listError && <div role="alert" className="mt-3 space-y-3 text-amber-300"><p>{listError}</p><Link href="/login" className="underline">Iniciar sesión</Link><button type="button" disabled={busy || loading} onClick={() => loadMore(true)} className="ml-4 underline">Volver a consultar</button></div>}
        {cursor && <button type="button" disabled={loading || busy} onClick={() => loadMore()} className="mt-3 rounded-lg border border-white/20 px-3 py-2">Consultar más eventos</button>}
        {selected && <p className="mt-3 text-sm text-emerald-200">Evento seleccionado: <strong>{selected.name}</strong></p>}
      </section>
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold">2. Lee el QR o introduce su credencial</h2>
          {!busy && state.phase !== "ready" && state.phase !== "uncertain" && <CameraReader key={state.event} disabled={!state.event} onCredential={value => { setDraft(value); void session.validate(value); }} />}
          <form onSubmit={e => { e.preventDefault(); void session.validate(draft); }} className="space-y-3">
            <label htmlFor="scanner-credential" className="block text-sm">Credencial completa del QR</label>
            <textarea id="scanner-credential" value={draft} onChange={e => { setDraft(e.target.value); session.clear(); }} disabled={busy || state.phase === "uncertain"} rows={3} maxLength={4096} autoComplete="off" spellCheck={false} autoCapitalize="none" className="w-full break-all rounded-xl border border-white/20 bg-slate-900 p-3 text-sm disabled:opacity-50" placeholder="Pega la credencial o usa un lector externo" />
            <button type="submit" disabled={!state.event || !draft.trim() || busy || state.phase === "uncertain"} className="w-full rounded-xl bg-white px-4 py-3 font-semibold text-slate-950 disabled:opacity-40">{state.phase === "validating" ? "Validando…" : "Validar sin consumir"}</button>
          </form>
        </section>
        <section className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-5" aria-label="Resultado y confirmación">
          <h2 className="text-lg font-semibold">3. Revisa el resultado</h2>
          <div role="status" aria-live="polite" aria-atomic="true" className={`rounded-xl border p-5 ${state.result === "CHECKED_IN" ? "border-emerald-400/50 bg-emerald-400/10" : "border-white/15"}`}>
            <p className="text-lg font-medium">{state.phase === "validating" ? "Consultando el boleto…" : state.phase === "confirming" ? "Registrando el acceso. Espera la respuesta…" : message}</p>
            {state.ticketCode && <p className="mt-3 break-all text-sm">Boleto: {state.ticketCode}</p>}
          </div>
          {state.phase === "ready" && <button type="button" onClick={() => void session.confirm()} className="w-full rounded-xl bg-emerald-400 px-4 py-4 font-bold text-slate-950">Confirmar acceso</button>}
          {state.phase === "uncertain" && <button type="button" onClick={() => void session.reconcile()} className="w-full rounded-xl border border-amber-300 px-4 py-3 text-amber-200">Consultar estado del boleto</button>}
          {!busy && state.phase !== "idle" && state.phase !== "uncertain" && <button type="button" onClick={() => { session.clear(); setDraft(""); }} className="w-full rounded-xl border border-white/20 px-4 py-3">Siguiente boleto</button>}
          <p className="text-sm text-slate-400">Solo “Acceso registrado” confirma la entrada. Los permisos y el estado se vuelven a comprobar al confirmar.</p>
        </section>
      </div>
    </div>
  </div>;
}
