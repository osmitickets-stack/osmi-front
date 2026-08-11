"use client";

import { useState } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";

interface BuyTicketCardProps {
  eventId: string;
  eventName: string;
  formattedDate: string;
  formattedTime: string;
  location: string;
}

// Datos de ejemplo para tickets (esto vendrá de la API en producción)
const TICKET_TYPES = [
  { id: "foto", name: "Sesión de una foto con Desfra", price: 10, available: 1495, max: 1 },
  { id: "composicion", name: "Sesión de Composición", price: 8000, available: 13, max: 1 },
  { id: "estandar", name: "Estándar - Canción", price: 12000, available: 20, max: 1 },
  { id: "feature", name: "Feature en Tema", price: 15000, available: 5, max: 1 },
  { id: "premium", name: "Premium - Canción Completa", price: 25000, available: 9, max: 1 },
];

export default function BuyTicketCard({
  eventId,
  eventName,
  formattedDate,
  formattedTime,
  location,
}: BuyTicketCardProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedTickets, setSelectedTickets] = useState<Record<string, boolean>>({});

  const updateQuantity = (ticketId: string, delta: number, max: number) => {
    setQuantities((prev) => {
      const current = prev[ticketId] || 0;
      const newVal = Math.max(0, Math.min(current + delta, max));
      return { ...prev, [ticketId]: newVal };
    });
  };

  const toggleSelect = (ticketId: string) => {
    setSelectedTickets((prev) => ({ ...prev, [ticketId]: !prev[ticketId] }));
  };

  const total = Object.entries(selectedTickets).reduce((sum, [id, selected]) => {
    if (!selected) return sum;
    const ticket = TICKET_TYPES.find((t) => t.id === id);
    const qty = quantities[id] || 0;
    return sum + (ticket?.price || 0) * qty;
  }, 0);

  return (
    <div className="glass-card p-6 border border-white/10 sticky top-24">
      <h3 className="text-xl font-bold text-white mb-2">Comprar boletos</h3>
      <p className="text-sm text-muted mb-6">
        {formattedDate} · {formattedTime} · {location}
      </p>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {TICKET_TYPES.map((ticket) => (
          <div
            key={ticket.id}
            className={`p-3 rounded-xl border transition-all cursor-pointer ${
              selectedTickets[ticket.id]
                ? "border-primary/50 bg-primary/5"
                : "border-white/5 hover:border-white/10 bg-white/5"
            }`}
            onClick={() => toggleSelect(ticket.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {ticket.name}
                </p>
                <p className="text-xs text-muted">
                  ${ticket.price.toLocaleString("es-MX")} · {ticket.available} disponibles
                </p>
              </div>
              {selectedTickets[ticket.id] && (
                <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(ticket.id, -1, ticket.max);
                    }}
                    className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-white font-bold w-4 text-center">
                    {quantities[ticket.id] || 0}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(ticket.id, 1, ticket.max);
                    }}
                    className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 mt-4 pt-4">
        <div className="flex justify-between text-lg font-bold text-white mb-4">
          <span>Total</span>
          <span className="text-primary">${total.toLocaleString("es-MX")}</span>
        </div>
        <button
          disabled={total === 0}
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-primary to-primary/80 text-white font-bold hover:from-primary/90 hover:to-primary/70 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          {total === 0 ? "Selecciona boletos" : "Pagar ahora"}
        </button>
        <p className="text-xs text-muted-dark text-center mt-3">
          Pago seguro con Stripe
        </p>
      </div>
    </div>
  );
}