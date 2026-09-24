"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Gift,
  Loader2,
  Mail,
  Shield,
  Sparkles,
  Ticket,
} from "lucide-react";

import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { useCartStore } from "@/store/cart";
import { api } from "@/lib/api";

type ConfirmationItem = {
  ticketTypeId: string;
  ticketTypeName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  eventName: string;
};

type OrderConfirmation = {
  orderId: string;
  orderStatus: string;
  paymentStatus: string;
  customerEmail: string;
  customerName: string;
  totalAmount: number;
  currency: string;
  items: ConfirmationItem[];
};

type ConfirmationState = "processing" | "completed" | "error";

function normalizeConfirmation(data: any): OrderConfirmation {
  return {
    orderId: data.orderId ?? data.order_id ?? "",
    orderStatus: data.orderStatus ?? data.order_status ?? "",
    paymentStatus: data.paymentStatus ?? data.payment_status ?? "",
    customerEmail: data.customerEmail ?? data.customer_email ?? "",
    customerName: data.customerName ?? data.customer_name ?? "",
    totalAmount: Number(data.totalAmount ?? data.total_amount ?? 0),
    currency: data.currency ?? "MXN",
    items: (data.items ?? []).map((item: any) => ({
      ticketTypeId:
        item.ticketTypeId ??
        item.ticket_type_id ??
        "",
      ticketTypeName:
        item.ticketTypeName ??
        item.ticket_type_name ??
        "",
      quantity: Number(item.quantity ?? 0),
      unitPrice: Number(
        item.unitPrice ??
        item.unit_price ??
        0
      ),
      totalPrice: Number(
        item.totalPrice ??
        item.total_price ??
        0
      ),
      eventName:
        item.eventName ??
        item.event_name ??
        "",
    })),
  };
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: currency || "MXN",
  }).format(amount);
}

function SuccessPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clearCart = useCartStore((state) => state.clearCart);

  const [state, setState] =
    useState<ConfirmationState>("processing");

  const [confirmation, setConfirmation] =
    useState<OrderConfirmation | null>(null);

  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function confirmPurchase() {
      const paymentIntentId =
        searchParams.get("payment_intent") || "";

      const orderIdFromURL =
        searchParams.get("order_id") || "";

      const orderId =
        orderIdFromURL ||
        sessionStorage.getItem("osmi_order_id") ||
        "";

      if (!paymentIntentId || !orderId) {
        if (!cancelled) {
          setState("error");
          setError(
            "No pudimos identificar la compra. Conserva tu comprobante de Stripe y contacta a soporte."
          );
        }
        return;
      }

      const maxAttempts = 40;
      const delayMs = 750;

      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        if (cancelled) return;

        try {
          const response = await api.get<any>(
            `/v1/orders/${encodeURIComponent(
              orderId
            )}/confirmation?payment_intent_id=${encodeURIComponent(
              paymentIntentId
            )}`
          );

          const data = normalizeConfirmation(response);

          if (
            data.orderStatus === "completed" &&
            data.paymentStatus === "paid"
          ) {
            if (cancelled) return;

            setConfirmation(data);
            setState("completed");

            clearCart();

            sessionStorage.removeItem("osmi_order_id");
            sessionStorage.removeItem("osmi_client_secret");

            localStorage.removeItem("osmi_checkout_email");
            localStorage.removeItem("osmi_checkout_name");

            return;
          }

          if (
            data.paymentStatus === "failed" ||
            data.orderStatus === "cancelled"
          ) {
            if (!cancelled) {
              setState("error");
              setError(
                "El pago no pudo confirmarse correctamente."
              );
            }
            return;
          }
        } catch (err) {
          if (attempt === maxAttempts - 1 && !cancelled) {
            console.error(
              "Error consultando confirmación:",
              err
            );

            setState("error");
            setError(
              "No pudimos verificar la compra en este momento. Si Stripe confirmó el cargo, no vuelvas a pagar. Intenta consultar nuevamente en unos momentos."
            );
            return;
          }
        }

        await new Promise((resolve) =>
          setTimeout(resolve, delayMs)
        );
      }

      if (!cancelled) {
        setState("error");
        setError(
          "La compra sigue procesándose. Si Stripe confirmó el cargo, no realices otro pago."
        );
      }
    }

    confirmPurchase();

    return () => {
      cancelled = true;
    };
  }, [searchParams, clearCart]);

  if (state === "processing") {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar />

        <main className="flex-1 flex items-center justify-center px-4">
          <div className="glass-card max-w-xl w-full p-10 text-center border border-white/10">
            <Loader2
              size={48}
              className="animate-spin text-primary mx-auto mb-6"
            />

            <h1 className="text-3xl font-black text-foreground mb-3">
              Confirmando tu compra
            </h1>

            <p className="text-muted">
              Estamos esperando la confirmación final del pago y
              preparando tus boletos.
            </p>

            <p className="text-xs text-muted-dark mt-4">
              No cierres esta ventana y no realices otro pago.
            </p>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (state === "error" || !confirmation) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar />

        <main className="flex-1 flex items-center justify-center px-4">
          <div className="glass-card max-w-xl w-full p-10 text-center border border-danger/20">
            <AlertCircle
              size={48}
              className="text-danger mx-auto mb-6"
            />

            <h1 className="text-3xl font-black text-foreground mb-3">
              No pudimos confirmar la compra todavía
            </h1>

            <p className="text-muted mb-8">{error}</p>

            <button
              onClick={() => window.location.reload()}
              className="btn-primary px-8 py-3"
            >
              Intentar nuevamente
            </button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-success/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-success/5 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 w-full relative z-10">
        <div className="glass-card p-8 sm:p-12 border border-success/20 glow-success animate-fade-in-up relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-success/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-success/10 border-4 border-success/20 mb-6 animate-float">
              <CheckCircle
                size={56}
                className="text-success"
              />
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 text-success text-xs font-bold tracking-widest mb-4">
              <Sparkles size={14} />
              COMPRA CONFIRMADA
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-3">
              ¡Tu compra fue exitosa! 🎉
            </h1>

            <p className="text-muted text-base sm:text-lg max-w-xl mx-auto mb-6">
              Tu pago fue confirmado y tus boletos están
              registrados correctamente.
            </p>

            <div className="bg-white/5 rounded-2xl px-6 py-3 inline-block border border-white/10 mb-6">
              <p className="text-xs text-muted-dark">
                NÚMERO DE ORDEN
              </p>

              <p className="text-sm sm:text-lg font-mono font-bold text-primary tracking-wide break-all">
                {confirmation.orderId}
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-muted mb-8 flex-wrap">
              <Mail
                size={16}
                className="text-secondary"
              />

              <span>Correo de la compra:</span>

              <span className="text-foreground font-semibold">
                {confirmation.customerEmail}
              </span>
            </div>

            {confirmation.customerName && (
              <p className="text-sm text-muted mb-6">
                Compra realizada por{" "}
                <span className="text-foreground font-semibold">
                  {confirmation.customerName}
                </span>
              </p>
            )}

            <div className="text-left mb-8">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Ticket
                  size={20}
                  className="text-primary"
                />
                Boletos adquiridos
              </h3>

              <div className="space-y-4">
                {confirmation.items.map((item, index) => (
                  <div
                    key={`${item.ticketTypeId}-${index}`}
                    className="bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10"
                  >
                    {item.eventName && (
                      <h4 className="font-bold text-foreground text-lg mb-3">
                        {item.eventName}
                      </h4>
                    )}

                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-muted">
                        {item.ticketTypeName} x{item.quantity}
                      </span>

                      <span className="text-foreground font-medium">
                        {formatMoney(
                          item.totalPrice,
                          confirmation.currency
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4 text-xs text-muted-dark mt-2">
                      <span>Precio unitario</span>

                      <span>
                        {formatMoney(
                          item.unitPrice,
                          confirmation.currency
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-lg font-bold mt-5 pt-5 border-t border-white/10">
                <span className="text-foreground">
                  Total
                </span>

                <span className="text-primary">
                  {formatMoney(
                    confirmation.totalAmount,
                    confirmation.currency
                  )}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button
                onClick={() => router.push("/dashboard")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-2xl hover:shadow-primary/30 transition-all"
              >
                <Ticket size={18} />
                Ver mis boletos
                <ChevronRight size={16} />
              </button>

              <button
                onClick={() => router.push("/events")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-foreground font-semibold hover:bg-white/10 transition-all"
              >
                <ArrowRight size={18} />
                Explorar más eventos
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-8 pt-6 border-t border-white/10 text-xs text-muted-dark">
              <span className="flex items-center gap-1.5">
                <Shield
                  size={14}
                  className="text-success"
                />
                Pago verificado
              </span>

              <span className="w-px h-3 bg-white/10" />

              <span className="flex items-center gap-1.5">
                <CheckCircle
                  size={14}
                  className="text-success"
                />
                Orden completada
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors"
          >
            <Gift size={18} />
            Descubrir más eventos
            <ChevronRight size={16} />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col bg-black">
          <Navbar />
          <main className="flex-1 flex items-center justify-center px-4">
            <div className="glass-card max-w-xl w-full p-10 text-center border border-white/10">
              <Loader2
                size={48}
                className="animate-spin text-primary mx-auto mb-6"
              />
              <h1 className="text-3xl font-black text-foreground mb-3">
                Preparando confirmación
              </h1>
              <p className="text-muted">
                Estamos cargando la información de tu compra.
              </p>
            </div>
          </main>
          <Footer />
        </div>
      }
    >
      <SuccessPageContent />
    </Suspense>
  );
}