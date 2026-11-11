import Link from "next/link";
import { ArrowUpRight, Mail, Ticket } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";

const links = [
  { title: "Explora", items: [{ label: "Todos los eventos", href: "/events" }, ...CATEGORIES.slice(0, 4).map(({ label, slug }) => ({ label, href: `/events?category=${slug}` }))] },
  { title: "OSMI", items: [{ label: "Para organizadores", href: "/para-organizadores" }, { label: "Sobre nosotros", href: "/sobre-nosotros" }, { label: "Mis boletos", href: "/dashboard" }, { label: "Prensa", href: "/prensa" }] },
  { title: "Ayuda", items: [{ label: "Centro de ayuda", href: "/ayuda" }, { label: "Reembolsos", href: "/ayuda" }, { label: "Privacidad", href: "/docs/privacidad.pdf" }, { label: "Términos", href: "/docs/terminos.pdf" }, { label: "Cookies", href: "/cookies" }] },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#090713]">
      <div className="section-inner px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_2fr] lg:gap-16">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-black tracking-[-.06em] text-white focus-visible:outline-2 focus-visible:outline-primary"><span className="grid size-9 place-items-center rounded-xl bg-primary text-[#17051c]"><Ticket size={21} strokeWidth={2.5} /></span>OSMI<span className="text-primary">.</span></Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-muted">Experiencias para recordar. Encuentra eventos, compra tus boletos y consúltalos desde tu cuenta.</p>
            <Link href="/ayuda" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white underline decoration-primary/60 underline-offset-8 transition hover:text-primary"><Mail size={17} /> ¿Necesitas ayuda? <ArrowUpRight size={15} /></Link>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {links.map((group) => (
              <div key={group.title}>
                <h2 className="mb-5 text-xs font-bold uppercase tracking-[.18em] text-white">{group.title}</h2>
                <ul className="space-y-3">
                  {group.items.map(({ label, href }) => <li key={`${label}-${href}`}><Link href={href} className="inline-flex min-h-7 items-center text-sm leading-5 text-muted transition hover:text-primary focus-visible:outline-2 focus-visible:outline-primary">{label}</Link></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} OSMI. Todos los derechos reservados.</p>
          <p>Hecho para vivir experiencias.</p>
        </div>
      </div>
    </footer>
  );
}

