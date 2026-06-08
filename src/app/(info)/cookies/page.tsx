import { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Cookie } from "lucide-react";

export const metadata: Metadata = {
  title: "Politica de Cookies - osmi",
  description: "Conoce como usamos las cookies en osmi.",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-20 w-full">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Cookie size={24} className="text-primary" />
          </div>
          <h1 className="text-4xl font-black">Politica de Cookies</h1>
        </div>
        <div className="glass-card p-8 space-y-6 text-muted leading-relaxed">
          <p>osmi utiliza cookies para mejorar tu experiencia de navegacion.</p>
          <h2 className="text-xl font-bold text-foreground mt-6">Que son las cookies</h2>
          <p>Las cookies son pequenos archivos que se almacenan en tu dispositivo para recordar preferencias y mejorar la funcionalidad del sitio.</p>
          <h2 className="text-xl font-bold text-foreground mt-6">Cookies que utilizamos</h2>
          <p>Utilizamos cookies esenciales para el funcionamiento del carrito de compras, autenticacion y procesamiento de pagos.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
