import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, HeartHandshake, MessageCircle, ShieldCheck, Ticket, Undo2 } from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";

export const metadata: Metadata = {
  title: "Ayuda y atención",
  description: "Encuentra ayuda para tus boletos, compras y solicitudes de reembolso en OSMI.",
};

const contact = (subject: string) =>
  `https://wa.me/523345998987?text=${encodeURIComponent(`Hola OSMI, necesito ayuda con: ${subject}.`)}`;

export default function HelpPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-16">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-accent">Estamos contigo</p>
          <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">Ayuda que acompaña tu experiencia</h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            Si tienes una duda sobre tu compra, tus boletos o un evento, elige el tema para contactar al equipo de OSMI.
            Conserva tu número de orden para que podamos ubicar tu caso. Nunca compartas contraseñas ni datos completos de tu tarjeta.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <article className="glass-card p-6 sm:p-8">
            <Ticket className="mb-5 text-primary" size={28} aria-hidden="true" />
            <h2 className="text-xl font-bold">Mis boletos y mi cuenta</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">Consulta tus boletos desde tu cuenta. Si compraste como invitado, ten a mano el correo y número de orden usados en la compra.</p>
            <Link href="/dashboard" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              Ir a mis boletos <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </article>

          <article className="glass-card p-6 sm:p-8">
            <Undo2 className="mb-5 text-secondary" size={28} aria-hidden="true" />
            <h2 className="text-xl font-bold">Solicitar revisión de reembolso</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">Cuéntanos el evento, número de orden y motivo. Revisaremos las condiciones de tu compra y el estado del evento antes de confirmar si procede una devolución.</p>
            <a href={contact("una solicitud de reembolso")} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/20 px-5 py-2.5 text-sm font-bold text-foreground hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary">
              Solicitar revisión <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </article>

          <article className="glass-card p-6 sm:p-8">
            <MessageCircle className="mb-5 text-accent" size={28} aria-hidden="true" />
            <h2 className="text-xl font-bold">Atención y seguimiento</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">¿No llegó tu confirmación o tienes un problema de acceso? Escríbenos para revisar tu caso con el equipo.</p>
            <a href={contact("mi compra o mis boletos")} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/20 px-5 py-2.5 text-sm font-bold text-foreground hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
              Contactar soporte <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </article>

          <article className="glass-card p-6 sm:p-8">
            <HeartHandshake className="mb-5 text-success" size={28} aria-hidden="true" />
            <h2 className="text-xl font-bold">Quejas y sugerencias</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">Tu opinión nos ayuda a mejorar. Describe qué ocurrió y cómo podemos ayudarte; si ya tienes una conversación, indícanos su referencia.</p>
            <a href={contact("una queja o sugerencia")} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/20 px-5 py-2.5 text-sm font-bold text-foreground hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success">
              Enviar comentario <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </article>
        </div>

        <aside className="mt-8 flex items-start gap-3 rounded-2xl border border-accent/20 bg-accent/5 p-5 text-sm text-muted">
          <ShieldCheck className="shrink-0 text-accent" size={20} aria-hidden="true" />
          <p>Una solicitud no cancela automáticamente la orden ni garantiza un reembolso. Si el evento cambió o fue cancelado, contacta al equipo para revisar las opciones que correspondan.</p>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
