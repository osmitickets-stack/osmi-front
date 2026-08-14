// src/lib/categories.ts
// Categorías centralizadas

export const CATEGORIES = [
  { slug: "conciertos", label: "Conciertos", icon: "Music", color: "text-primary" },
  { slug: "deportes", label: "Deportes", icon: "Trophy", color: "text-accent" },
  { slug: "teatro", label: "Teatro", icon: "Theater", color: "text-secondary" },
  { slug: "festivales", label: "Festivales", icon: "PartyPopper", color: "text-warning" },
  { slug: "experiencias", label: "Experiencias", icon: "Sparkles", color: "text-primary" },
  { slug: "infantiles", label: "Infantiles", icon: "Star", color: "text-success" },
] as const;

export type CategorySlug = typeof CATEGORIES[number]["slug"];