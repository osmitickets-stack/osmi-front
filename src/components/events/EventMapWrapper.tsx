"use client";

import dynamic from "next/dynamic";

const EventMap = dynamic(() => import("@/components/events/EventMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 rounded-2xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-center">
      <p className="text-muted-dark text-sm">Cargando mapa...</p>
    </div>
  ),
});

interface EventMapWrapperProps {
  location: string;
  latitude?: number;
  longitude?: number;
}

export default function EventMapWrapper({ location, latitude, longitude }: EventMapWrapperProps) {
  return <EventMap location={location} latitude={latitude} longitude={longitude} />;
}
