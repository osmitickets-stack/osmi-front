// src/modules/events/utils/normalizer.ts

export interface RawEvent {
  id?: string;
  publicId?: string;
  public_id?: string;
  name?: string;
  description?: string;
  location?: string;
  venueName?: string;
  venue_name?: string;
  city?: string;
  state?: string;
  startDate?: string;
  start_date?: string;
  imageUrl?: string;
  image_url?: string;
  coverImageUrl?: string;
  cover_image_url?: string;
  minPrice?: number;
  min_price?: number;
  latitude?: number;
  longitude?: number;
}

export interface NormalizedEvent {
  public_id: string;
  name: string;
  description: string;
  location: string;
  start_date: string;
  image_url: string;
  min_price: number;
  latitude?: number;
  longitude?: number;
}

export function normalizeEvent(event: RawEvent): NormalizedEvent {
  let location = "Proximamente";
  const venue = event.venueName || event.venue_name || "";
  const city = event.city || "";
  const state = event.state || "";

  if (venue) {
    location = [venue, city, state].filter(Boolean).join(", ");
  } else if (event.location) {
    location = event.location;
  }

  return {
    public_id: event.public_id || event.publicId || event.id || "",
    name: event.name || "Evento sin nombre",
    description: event.description || "",
    location: location,
    start_date: event.start_date || event.startDate || new Date().toISOString(),
    image_url: event.imageUrl || event.image_url || event.coverImageUrl || event.cover_image_url || "",
    min_price: event.min_price || event.minPrice || 0,
    latitude: event.latitude,
    longitude: event.longitude,
  };
}