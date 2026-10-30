"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function CameraReader({ disabled, onCredential }: { disabled: boolean; onCredential: (credential: string) => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream | null>(null);
  const generation = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [active, setActive] = useState(false);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState("");

  const release = useCallback(() => {
    generation.current++;
    if (timer.current) clearTimeout(timer.current);
    stream.current?.getTracks().forEach(track => track.stop());
    stream.current = null;
    if (video.current) video.current.srcObject = null;
  }, []);
  const stop = useCallback(() => { release(); setActive(false); setStarting(false); }, [release]);

  useEffect(() => {
    function hidden() { if (document.hidden) stop(); }
    document.addEventListener("visibilitychange", hidden);
    return () => { document.removeEventListener("visibilitychange", hidden); release(); };
  }, [release, stop]);

  async function start() {
    if (disabled || starting || active) return;
    setError("");
    setStarting(true);
    const current = ++generation.current;
    try {
      if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
        throw new Error("secure-context");
      }
      const { default: decode } = await import("jsqr");
      if (current !== generation.current) return;
      const media = await navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 } } });
      if (current !== generation.current) { media.getTracks().forEach(track => track.stop()); return; }
      stream.current = media;
      if (!video.current) { stop(); return; }
      video.current.srcObject = media;
      await video.current.play();
      if (current !== generation.current) return;
      setActive(true);
      setStarting(false);
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) throw new Error("canvas unavailable");
      function scan() {
        if (current !== generation.current || !video.current) return;
        try {
          if (video.current.readyState >= 2 && video.current.videoWidth) {
            const scale = Math.min(1, 800 / video.current.videoWidth);
            canvas.width = Math.round(video.current.videoWidth * scale);
            canvas.height = Math.round(video.current.videoHeight * scale);
            context!.drawImage(video.current, 0, 0, canvas.width, canvas.height);
            const frame = context!.getImageData(0, 0, canvas.width, canvas.height);
            const qr = decode(frame.data, frame.width, frame.height, { inversionAttempts: "attemptBoth" });
            if (qr?.data) { stop(); onCredential(qr.data); return; }
          }
          timer.current = setTimeout(scan, 180);
        } catch { stop(); setError("No se pudo leer la cámara. Puedes introducir la credencial manualmente."); }
      }
      scan();
    } catch (failure) {
      if (current !== generation.current) return;
      stop();
      const name = failure instanceof Error ? failure.name : "";
      setError(name === "NotAllowedError" ? "Permite el uso de la cámara en el navegador o utiliza la entrada manual." : "No se pudo abrir la cámara. Revisa que la página use HTTPS (o localhost), que exista una cámara y que no esté ocupada. Puedes usar entrada manual.");
    }
  }

  return <section className="space-y-3" aria-label="Lectura con cámara">
    <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/15 bg-black">
      <video ref={video} playsInline muted className="h-full w-full object-cover" aria-label="Vista de la cámara para leer el QR" />
      {!active && <p className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-slate-400">{starting ? "Abriendo cámara…" : "La cámara se activa solo cuando tú lo indiques."}</p>}
    </div>
    {active || starting ? <button type="button" onClick={stop} className="rounded-xl border border-white/20 px-4 py-3">Detener cámara</button> : <button type="button" disabled={disabled} onClick={start} className="rounded-xl border border-white/20 px-4 py-3 disabled:opacity-40">Activar cámara</button>}
    {error && <p role="alert" className="text-sm text-amber-300">{error}</p>}
    <p className="text-xs text-slate-400">La imagen se procesa en este dispositivo; solo la credencial leída se envía a OSMI.</p>
  </section>;
}
