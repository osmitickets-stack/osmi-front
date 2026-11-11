"use client";

import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";
import {
  Plus,
  Minus,
  ShoppingCart,
  Ticket,
} from "lucide-react";

import { useCartStore } from "@/store/cart";
import { useEffect, useState } from "react";

interface TicketType {
  id: string;
  name: string;
  basePrice: number;
  currency: string;
  availableQuantity: number;
  maxPerOrder: number;
}

interface BuyTicketCardProps {
  eventId: string;
  eventName: string;
  formattedDate: string;
  formattedTime: string;
  location: string;
}

export default function BuyTicketCard({
  eventId,
  eventName,
  formattedDate,
  formattedTime,
  location,
}: BuyTicketCardProps) {
  const router = useRouter();

  const {
    tickets,
    addTicket,
    removeTicket,
    updateQuantity,
  } = useCartStore();

  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchTicketTypes() {
      try {
        const res = await fetch(
          `${API_BASE_URL}/v1/ticket-types?event_id=${eventId}`
        );

        if (!res.ok)
          throw new Error(
            "No se pudieron cargar boletos"
          );

        const data = await res.json();

        if (mounted) {
          setTicketTypes(data.ticketTypes || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (mounted) {
          setLoadingTypes(false);
        }
      }
    }

    fetchTicketTypes();

    return () => {
      mounted = false;
    };
  }, [eventId]);

  const eventTickets = tickets.filter(
    (t) =>
      t.eventId === eventId &&
      t.quantity > 0
  );

  const total = eventTickets.reduce(
    (sum, t) => sum + t.price * t.quantity,
    0
  );

  const ticketCount = eventTickets.reduce(
    (sum, t) => sum + t.quantity,
    0
  );

  const handleAdd = (type: TicketType) => {
    addTicket({
      eventId,
      eventName,
      ticketTypeId: type.id,
      ticketTypeName: type.name,
      section: type.name,
      price: type.basePrice,
      quantity: 1,
      maxPerOrder: type.maxPerOrder,
      availableQuantity:
        type.availableQuantity,
    });
  };

  const handleQuantity = (
    type: TicketType,
    delta: number
  ) => {
    const existing =
      eventTickets.find(
        (t) =>
          t.ticketTypeId === type.id
      );

    if (!existing) return;

    const newQty =
      existing.quantity + delta;

    if (newQty <= 0) {
      removeTicket(type.id);
      return;
    }

    updateQuantity(
      type.id,
      newQty
    );
  };

  const handleCheckout = async () => {
    if (eventTickets.length === 0)
      return;

    setCheckoutLoading(true);

    try {
      const validation =
        useCartStore
          .getState()
          .validateStock();

      if (!validation.valid) {
        alert(
          validation.errors.join("\n")
        );
        return;
      }

      router.push("/checkout");
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loadingTypes) {
    return (
      <div className="glass-card p-6 space-y-4">
        <div className="h-5 bg-white/5 rounded animate-pulse" />
        <div className="h-16 bg-white/5 rounded animate-pulse" />
        <div className="h-16 bg-white/5 rounded animate-pulse" />
      </div>
    );
  }

  if (!ticketTypes.length) {
    return (
      <div className="glass-card p-6 text-center">
        <Ticket
          className="mx-auto mb-3 opacity-40"
          size={30}
        />
        <p className="text-sm text-muted">
          No hay boletos disponibles
        </p>
      </div>
    );
  }

  return (
    <div className="lg:sticky lg:top-24">
      <div className="rounded-3xl border border-primary/20 bg-[#141026] p-5 shadow-[0_24px_70px_rgba(0,0,0,.24)] sm:p-6 lg:max-h-[calc(100vh-110px)] lg:overflow-y-auto">
        <h3 className="text-xl font-bold">
          Comprar boletos
        </h3>

        {/* Evento */}
        <div className="space-y-1 text-sm text-muted">
          <p>{formattedDate}</p>
          <p>{formattedTime}</p>
          <p>{location}</p>
        </div>

        {/* Ticket types - Scrolleable */}
        <div className="space-y-3 lg:max-h-[360px] lg:overflow-y-auto lg:pr-2 custom-scroll">
          {ticketTypes.map((type) => {
            const selected =
              eventTickets.find(
                (t) =>
                  t.ticketTypeId ===
                  type.id
              );

            const qty =
              selected?.quantity || 0;

            const max =
              Math.min(
                type.maxPerOrder,
                type.availableQuantity
              );

            return (
              <div
                key={type.id}
                className="rounded-2xl border border-white/10 bg-white/[.03] p-4 space-y-3 transition hover:border-primary/30"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">
                      {type.name}
                    </p>
                    <p className="text-primary font-bold text-lg">
                      $
                      {type.basePrice.toLocaleString(
                        "es-MX"
                      )}
                    </p>
                  </div>

                  {qty === 0 ? (
                    <button
                      type="button"
                      onClick={() =>
                        handleAdd(type)
                      }
                      disabled={
                        type.availableQuantity ===
                        0
                      }
                      className="min-h-11 rounded-xl bg-primary/15 px-4 py-2 text-sm font-bold text-[#ff80e7] transition hover:bg-primary/25 disabled:opacity-40"
                    >
                      {type.availableQuantity ===
                      0
                        ? "Agotado"
                        : "Agregar"}
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label={`Quitar un boleto ${type.name}`}
                        onClick={() =>
                          handleQuantity(
                            type,
                            -1
                          )
                        }
                        className="grid size-11 place-items-center rounded-xl bg-white/10 transition-colors hover:bg-white/20"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center font-bold">
                        {qty}
                      </span>
                      <button
                        type="button"
                        aria-label={`Añadir un boleto ${type.name}`}
                        disabled={
                          qty >= max
                        }
                        onClick={() =>
                          handleQuantity(
                            type,
                            1
                          )
                        }
                        className="grid size-11 place-items-center rounded-xl bg-white/10 transition-colors hover:bg-white/20 disabled:opacity-30"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex justify-between text-xs text-muted-dark">
                  <span>
                    {type.availableQuantity} disponibles
                  </span>
                  <span>Máx {type.maxPerOrder}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Resumen - SIEMPRE VISIBLE */}
        {eventTickets.length > 0 && (
          <div className="border-t border-white/10 pt-4 space-y-4">
            <div className="flex justify-between text-sm">
              <span>Boletos</span>
              <span className="font-semibold">
                {ticketCount}
              </span>
            </div>

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">
                $
                {total.toLocaleString(
                  "es-MX"
                )}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-[#16051a] shadow-lg shadow-primary/20 transition hover:bg-[#ff78e3] disabled:opacity-50"
            >
              <ShoppingCart size={18} />
              {checkoutLoading
                ? "Validando..."
                : "Proceder al pago"}
            </button>
          </div>
        )}

        <p className="text-xs text-center text-muted-dark pt-2 border-t border-white/5">
          El pago se procesa de forma segura con Stripe.
        </p>
      </div>
    </div>
  );
}

