"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const markerIcon = L.divIcon({
  className: "osmi-map-marker",
  html: '<span aria-hidden="true"></span>',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

interface EventMapProps {
  location: string;
  latitude?: number;
  longitude?: number;
}

export default function EventMap({ location, latitude, longitude }: EventMapProps) {
  const searchableLocation = location && location !== "Próximamente" && location !== "Ubicación";
  const hasCoordinates =
    typeof latitude === "number" && Number.isFinite(latitude) && latitude >= -90 && latitude <= 90 &&
    typeof longitude === "number" && Number.isFinite(longitude) && longitude >= -180 && longitude <= 180;

  if (!hasCoordinates) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-center">
        <p className="font-semibold text-foreground">Mapa pendiente de ubicación exacta</p>
        <p className="max-w-sm text-sm text-muted">{searchableLocation ? location : "El organizador aún no ha publicado las coordenadas del recinto."}</p>
        {searchableLocation && (
          <a className="text-sm font-semibold text-accent underline-offset-4 hover:underline" href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(location)}`} target="_blank" rel="noopener noreferrer">
            Buscar esta ubicación en OpenStreetMap
          </a>
        )}
      </div>
    );
  }

  const position: [number, number] = [latitude!, longitude!];

  return (
    <div className="w-full h-64 rounded-2xl overflow-hidden border border-white/[0.06]">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ background: "#0b0618" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position} icon={markerIcon}>
          <Popup>{location}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
