"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { useCartStore } from "@/store/cart";
import { api } from "@/lib/api";
import {
  AlertCircle,
  Lock,
  Loader2,
  Mail,
  ArrowRight,
  Shield,
  CheckCircle,
  Sparkles,
  ShoppingBag,
  Ticket,
  Calendar,
  MapPin,
  CreditCard,
  Building2,
  User,
  Clock,
  ArrowLeft,
  Wallet,
  Zap
} from "lucide-react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
const API = process.env.NEXT_PUBLIC_API_URL!;

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

// ============================================================
// CUSTOMER - Busca antes de crear para evitar duplicados
// ============================================================
async function resolveCustomerId(customerEmail: string) {
  if (!customerEmail || !customerEmail.trim()) {
    throw new Error("Customer email is required");
  }
  const cleanEmail = customerEmail.trim().toLowerCase();
  const token = getCookie("token");

  // Usuario logueado
  if (token) {
    try {
      const userRes = await fetch(`${API}/v1/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      let userId = null;
      if (userRes.ok) {
        const userData = await userRes.json();
        userId = userData.user_id || userData.id;
      }
      if (!userId) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          userId = payload.user_id;
        } catch (e) { /* ignorar */ }
      }
      if (userId) {
        const customerRes = await fetch(`${API}/v1/customers?user_id=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (customerRes.ok) {
          const data = await customerRes.json();
          const customers = data.customers || [];
          if (customers.length > 0) {
            return customers[0].publicId || customers[0].public_id || String(customers[0].id);
          }
        }
        const createRes = await fetch(`${API}/v1/customers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: "Usuario Osmi",
            email: cleanEmail,
            customer_type: "registered",
            user_id: userId,
          }),
        });
        if (createRes.ok) {
          const customer = await createRes.json();
          return customer.publicId || customer.public_id || String(customer.id);
        }
      }
    } catch (err) {
      console.error("Error resolviendo customer:", err);
    }
  }

  // Invitado: buscar primero por email
  try {
    const searchRes = await fetch(
      `${API}/v1/customers?email=${encodeURIComponent(cleanEmail)}`
    );
    if (searchRes.ok) {
      const data = await searchRes.json();
      const customers = data.customers || [];
      if (customers.length > 0) {
        return customers[0].publicId || customers[0].public_id || String(customers[0].id);
      }
    }

    const guestRes = await fetch(`${API}/v1/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Invitado",
        email: cleanEmail,
        customer_type: "guest",
      }),
    });
    if (guestRes.ok) {
      const guest = await guestRes.json();
      return guest.publicId || guest.public_id || String(guest.id);
    }
  } catch (err) {
    console.error("Error con customer invitado:", err);
  }

  return null;
}

// ============================================================
// PASO 1: INFO
// ============================================================
function CheckoutInfoStep({
  onContinue,
  isCreatingPayment,
  error,
}: {
  onContinue: (email: string) => void;
  isCreatingPayment: boolean;
  error: string | null;
}) {
  const { tickets } = useCartStore();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [focusedField, setFocusedField] = useState<"name" | "email" | null>(null);

  useEffect(() => {
    const savedEmail = localStorage.getItem("osmi_checkout_email") || "";
    const savedName = localStorage.getItem("osmi_checkout_name") || "";
    setEmail(savedEmail);
    setName(savedName);
  }, []);

  const total = tickets.reduce((sum, t) => sum + t.price * t.quantity, 0);
  const itemCount = tickets.reduce((sum, t) => sum + t.quantity, 0);

  const grouped = useMemo(() => {
    return tickets.reduce((acc, ticket) => {
      if (!acc[ticket.eventName]) acc[ticket.eventName] = [];
      acc[ticket.eventName].push(ticket);
      return acc;
    }, {} as Record<string, typeof tickets>);
  }, [tickets]);

  function validateEmail(e: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }

  function validateName(n: string): boolean {
    return n.trim().length >= 2;
  }

  function handleContinue() {
    let hasError = false;

    if (!name.trim()) {
      setNameError("Ingresa tu nombre completo");
      hasError = true;
    } else if (!validateName(name)) {
      setNameError("El nombre debe tener al menos 2 caracteres");
      hasError = true;
    } else {
      setNameError("");
    }

    if (!email.trim()) {
      setEmailError("Ingresa tu correo para recibir el boleto");
      hasError = true;
    } else if (!validateEmail(email.trim())) {
      setEmailError("Ingresa un correo válido");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (hasError) return;

    localStorage.setItem("osmi_checkout_email", email.trim().toLowerCase());
    localStorage.setItem("osmi_checkout_name", name.trim());
    onContinue(email.trim().toLowerCase());
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-bold border border-primary/30">
            1
          </div>
          <span className="text-sm font-semibold text-foreground">Información</span>
        </div>
        <div className="h-px flex-1 bg-white/10" />
        <div className="flex items-center gap-2 opacity-40">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-muted-dark font-bold border border-white/10">
            2
          </div>
          <span className="text-sm font-semibold text-muted-dark">Pago</span>
        </div>
        <div className="h-px flex-1 bg-white/10" />
        <div className="flex items-center gap-2 opacity-40">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-muted-dark font-bold border border-white/10">
            3
          </div>
          <span className="text-sm font-semibold text-muted-dark">Confirmación</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Formulario */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-foreground">Checkout</h1>
            <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              {itemCount} {itemCount === 1 ? "boleto" : "boletos"}
            </span>
          </div>
          <p className="text-muted text-sm">Completa tus datos para recibir tus boletos</p>

          {/* Formulario */}
          <div className="glass-card p-6 sm:p-8 space-y-5 border border-white/5">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <User size={18} className="text-primary" />
              Datos personales
            </h3>

            {/* Nombre */}
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                Nombre completo
              </label>
              <div className={`relative transition-all duration-300 ${
                focusedField === "name" ? "scale-[1.01]" : "scale-100"
              }`}>
                <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                  focusedField === "name" ? "bg-primary/5 blur-sm" : ""
                }`} />
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setNameError(""); }}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Tu nombre completo"
                  className={`relative w-full h-12 rounded-2xl border bg-white/[0.03] pl-11 pr-4 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all duration-300 z-10 ${
                    nameError
                      ? "border-danger/50 focus:border-danger focus:ring-2 focus:ring-danger/10"
                      : "border-white/[0.08] focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
                  }`}
                  required
                />
              </div>
              {nameError && (
                <p className="text-danger text-xs flex items-center gap-1 mt-1 ml-1">
                  <AlertCircle size={12} /> {nameError}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2 ml-1">
                Correo electrónico
              </label>
              <div className={`relative transition-all duration-300 ${
                focusedField === "email" ? "scale-[1.01]" : "scale-100"
              }`}>
                <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                  focusedField === "email" ? "bg-primary/5 blur-sm" : ""
                }`} />
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark pointer-events-none z-10" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="tu@correo.com"
                  className={`relative w-full h-12 rounded-2xl border bg-white/[0.03] pl-11 pr-4 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all duration-300 z-10 ${
                    emailError
                      ? "border-danger/50 focus:border-danger focus:ring-2 focus:ring-danger/10"
                      : "border-white/[0.08] focus:border-primary/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
                  }`}
                  required
                />
              </div>
              {emailError && (
                <p className="text-danger text-xs flex items-center gap-1 mt-1 ml-1">
                  <AlertCircle size={12} /> {emailError}
                </p>
              )}
              <p className="text-xs text-muted-dark mt-2 flex items-center gap-1">
                <Mail size={12} /> Enviaremos tu boleto con código QR a este correo
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-danger/10 border border-danger/30 rounded-2xl p-4 text-sm flex items-start gap-3">
              <AlertCircle size={18} className="text-danger flex-shrink-0 mt-0.5" />
              <span className="text-danger">{error}</span>
            </div>
          )}

          <button
            disabled={isCreatingPayment}
            onClick={handleContinue}
            className="group w-full rounded-2xl bg-gradient-to-r from-primary to-secondary px-6 py-4 text-white font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30"
          >
            {isCreatingPayment ? (
              <><Loader2 className="animate-spin" size={18} /> Preparando pago...</>
            ) : (
              <>
                Continuar al pago
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

        {/* Resumen */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-24">
            <div className="glass-card p-6 border border-white/5">
              <h3 className="font-bold text-foreground flex items-center gap-2 mb-4">
                <ShoppingBag size={18} className="text-primary" />
                Resumen
              </h3>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scroll">
                {Object.entries(grouped).map(([event, items]) => (
                  <div key={event} className="bg-white/5 rounded-xl p-3">
                    <p className="text-xs font-semibold text-primary mb-2 truncate">{event}</p>
                    {items.map((ticket) => (
                      <div key={ticket.ticketTypeId} className="flex justify-between text-sm py-1">
                        <span className="text-muted">{ticket.ticketTypeName} x{ticket.quantity}</span>
                        <span className="text-foreground font-medium">
                          ${(ticket.price * ticket.quantity).toLocaleString("es-MX")}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-muted">
                  <span>Subtotal</span>
                  <span>${total.toLocaleString("es-MX")}</span>
                </div>
                <div className="flex justify-between text-sm text-muted">
                  <span>Cargos por servicio</span>
                  <span className="text-success">Gratis</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-primary">${total.toLocaleString("es-MX")}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-muted-dark">
                <Shield size={14} className="text-success" />
                <span>Pago seguro con Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// ============================================================
// PASO 2: PAYMENT
// ============================================================
function PaymentStep({
  clientSecret,
  onBack,
  email,
  name,
}: {
  clientSecret: string;
  onBack: () => void;
  email: string;
  name: string;
}) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "night",
          variables: {
            colorPrimary: "#ff2bd6",
            colorBackground: "#05010f",
            colorText: "#f0edf6",
            borderRadius: "16px",
          },
        },
      }}
    >
      <PaymentForm onBack={onBack} email={email} name={name} />
    </Elements>
  );
}

function PaymentForm({ onBack, email, name }: { onBack: () => void; email: string; name: string }) {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const { tickets, validateStock, clearCart } = useCartStore();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const total = tickets.reduce((sum, t) => sum + t.price * t.quantity, 0);
  const itemCount = tickets.reduce((sum, t) => sum + t.quantity, 0);

  async function pay() {
    if (!stripe || !elements) return;
    const validation = validateStock();
    if (!validation.valid) {
      setError(validation.errors.join("\n"));
      return;
    }
    setProcessing(true);
    setError(null);

    const result = await stripe.confirmPayment({
      elements,
      redirect: "always",
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (result.error) {
      setError(result.error.message || "Pago fallido");
      setProcessing(false);
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-2 opacity-40">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-muted-dark font-bold border border-white/10">
            1
          </div>
          <span className="text-sm font-semibold text-muted-dark">Información</span>
        </div>
        <div className="h-px flex-1 bg-white/10" />
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-bold border border-primary/30">
            2
          </div>
          <span className="text-sm font-semibold text-foreground">Pago</span>
        </div>
        <div className="h-px flex-1 bg-white/10" />
        <div className="flex items-center gap-2 opacity-40">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-muted-dark font-bold border border-white/10">
            3
          </div>
          <span className="text-sm font-semibold text-muted-dark">Confirmación</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-foreground">Pago seguro</h1>
            <span className="text-xs px-3 py-1 rounded-full bg-success/10 text-success border border-success/20">
              <Lock size={12} className="inline mr-1" />
              Cifrado
            </span>
          </div>
          <p className="text-muted text-sm">Tus datos están protegidos por Stripe</p>

          <div className="glass-card p-6 sm:p-8 border border-white/5">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/5">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold border border-secondary/30">
                <CreditCard size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{name}</p>
                <p className="text-xs text-muted-dark">{email}</p>
              </div>
            </div>
            <PaymentElement />
            <div className="flex items-center gap-2 mt-4 text-xs text-muted-dark">
              <Lock size={12} /> Pago seguro cifrado con SSL
            </div>
          </div>

          {error && (
            <div className="bg-danger/10 border border-danger/30 rounded-2xl p-4 text-sm flex items-start gap-3">
              <AlertCircle size={18} className="text-danger flex-shrink-0 mt-0.5" />
              <span className="text-danger">{error}</span>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="flex-1 rounded-2xl bg-white/5 border border-white/10 px-6 py-4 text-sm font-semibold text-foreground hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              Volver
            </button>
            <button
              disabled={processing || !stripe}
              onClick={pay}
              className="flex-1 rounded-2xl bg-gradient-to-r from-primary to-secondary px-6 py-4 text-sm font-bold text-white hover:shadow-2xl hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {processing ? (
                <><Loader2 className="animate-spin" size={18} /> Procesando...</>
              ) : (
                <>
                  <Lock size={16} />
                  Pagar ${total.toLocaleString("es-MX")}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Resumen */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-24">
            <div className="glass-card p-6 border border-white/5">
              <h3 className="font-bold text-foreground flex items-center gap-2 mb-4">
                <Wallet size={18} className="text-secondary" />
                Resumen de compra
              </h3>

              <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Ticket size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{itemCount} boletos</p>
                  <p className="text-xs text-muted-dark">Seleccionados</p>
                </div>
              </div>

              <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scroll">
                {tickets.map((ticket, index) => (
                  <div key={index} className="flex justify-between text-sm py-1 border-b border-white/5 last:border-0">
                    <span className="text-muted">{ticket.ticketTypeName} x{ticket.quantity}</span>
                    <span className="text-foreground font-medium">
                      ${(ticket.price * ticket.quantity).toLocaleString("es-MX")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-muted">
                  <span>Subtotal</span>
                  <span>${total.toLocaleString("es-MX")}</span>
                </div>
                <div className="flex justify-between text-sm text-muted">
                  <span>Cargos por servicio</span>
                  <span className="text-success">Gratis</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-primary">${total.toLocaleString("es-MX")}</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-dark">
                <span className="flex items-center gap-1">
                  <Shield size={12} className="text-success" /> Stripe
                </span>
                <span className="w-px h-3 bg-white/10" />
                <span className="flex items-center gap-1">
                  <Lock size={12} /> Cifrado SSL
                </span>
                <span className="w-px h-3 bg-white/10" />
                <span className="flex items-center gap-1">
                  <CheckCircle size={12} className="text-success" /> Confirmación inmediata
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// ============================================================
// PAGE PRINCIPAL
// ============================================================
export default function CheckoutPage() {
  const { tickets } = useCartStore();
  const [step, setStep] = useState<"info" | "payment">("info");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isCreatingPayment, setIsCreatingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const router = useRouter();

  // Recuperar estado al refrescar
  useEffect(() => {
    const savedSecret = sessionStorage.getItem("osmi_client_secret");
    const savedOrderId = sessionStorage.getItem("osmi_order_id");
    const savedEmail = localStorage.getItem("osmi_checkout_email") || "";
    const savedName = localStorage.getItem("osmi_checkout_name") || "";
    if (savedSecret && savedOrderId) {
      setClientSecret(savedSecret);
      setOrderId(savedOrderId);
      setStep("payment");
      setCustomerEmail(savedEmail);
      setCustomerName(savedName);
    }
  }, []);

  useEffect(() => {
    if (!tickets.length) {
      router.push("/events");
    }
  }, [tickets, router]);

  const handleContinue = async (email: string) => {
    setIsCreatingPayment(true);
    setError(null);

    try {
      const customerId = await resolveCustomerId(email);
      if (!customerId) {
        setError("No se pudo crear el comprador. Intenta de nuevo.");
        setIsCreatingPayment(false);
        return;
      }

      const order = await api.post("/v1/orders", {
        customer_id: customerId,
        items: tickets.map((t) => ({
          ticket_type_id: t.ticketTypeId,
          quantity: t.quantity,
        })),
        customer_email: email,
        customer_name: "Invitado",
      });

      const newOrderId = order.public_id || order.publicId || order.id;

      const payment = await api.post("/v1/payments/intent", {
        order_id: newOrderId,
        currency: "MXN",
      });

      const secret = payment.client_secret || payment.clientSecret;
      if (!secret) {
        setError("Error al crear el pago. Intenta de nuevo.");
        setIsCreatingPayment(false);
        return;
      }

      sessionStorage.setItem("osmi_order_id", newOrderId);
      sessionStorage.setItem("osmi_client_secret", secret);

      setOrderId(newOrderId);
      setClientSecret(secret);
      setStep("payment");
    } catch (err: any) {
      setError(err.message || "Error al crear el pago");
    } finally {
      setIsCreatingPayment(false);
    }
  };

  if (!tickets.length) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="glass-card p-12">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={36} className="text-muted-dark" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Carrito vacío</h1>
            <p className="text-muted mb-6">No tienes boletos seleccionados</p>
            <button
              onClick={() => router.push("/events")}
              className="rounded-2xl bg-gradient-to-r from-primary to-secondary px-8 py-4 text-white font-bold hover:shadow-2xl hover:shadow-primary/30 transition-all"
            >
              Explorar eventos
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      {step === "info" && (
        <CheckoutInfoStep
          onContinue={handleContinue}
          isCreatingPayment={isCreatingPayment}
          error={error}
        />
      )}
      {step === "payment" && clientSecret && (
        <PaymentStep
          clientSecret={clientSecret}
          onBack={() => setStep("info")}
          email={customerEmail}
          name={customerName}
        />
      )}
      <Footer />
    </div>
  );
}