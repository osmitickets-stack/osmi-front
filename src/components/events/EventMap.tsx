"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Corregir iconos de Leaflet en Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface EventMapProps {
  location: string;
  latitude?: number;
  longitude?: number;
}

export default function EventMap({ location, latitude, longitude }: EventMapProps) {
  // Coordenadas por defecto (Ciudad de México) si no hay lat/lng
  const defaultLat = 19.4326;
  const defaultLng = -99.1332;
  const zoom = 13;

  return (
    <div className="w-full h-64 rounded-2xl overflow-hidden border border-white/[0.06]">
      <MapContainer
        center={[latitude || defaultLat, longitude || defaultLng]}
        zoom={zoom}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ background: "#0b0618" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={[latitude || defaultLat, longitude || defaultLng]}>
          <Popup>{location}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
