import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import type { NormalizedEvent } from "@/modules/events/utils/normalizer";

export function EventCard({ event }: { event: NormalizedEvent }) {
  const date = new Date(event.start_date);
  const validDate = !Number.isNaN(date.getTime());
  return (
    <Link href={`/events/${event.public_id}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#131026] transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_45px_rgba(0,0,0,.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#23113d]">
        {event.image_url ? (
          <Image src={event.image_url} alt={event.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw" />
        ) : (
          <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_70%_20%,#62217c,transparent_50%),linear-gradient(135deg,#170d2b,#0a0919)]"><span className="text-3xl font-bold tracking-tight text-white/50">OSMI</span></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090613]/70 via-transparent to-transparent" />
        {event.min_price > 0 && <span className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">Desde ${event.min_price.toLocaleString("es-MX")} MXN</span>}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-xl font-bold leading-snug tracking-tight text-white transition group-hover:text-[#ff80e7]">{event.name}</h3>
        <div className="mt-4 space-y-2 text-sm text-muted">
          {validDate && <p className="flex items-start gap-2"><CalendarDays size={16} className="mt-0.5 shrink-0 text-primary" /><span>{date.toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}</span></p>}
          {event.location && <p className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-primary" /><span className="line-clamp-2">{event.location}</span></p>}
        </div>
        <span className="mt-auto flex items-center justify-between border-t border-white/10 pt-5 text-sm font-semibold text-white"><span>Ver evento</span><span className="grid size-9 place-items-center rounded-full bg-primary/15 text-primary transition group-hover:bg-primary group-hover:text-[#16051a]"><ArrowUpRight size={17} /></span></span>
      </div>
    </Link>
  );
}

