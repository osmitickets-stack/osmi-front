import { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Newspaper } from "lucide-react";

export const metadata: Metadata = {
  title: "Prensa - osmi",
  description: "Recursos de prensa y medios de osmi.",
};

export default function PrensaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-20 w-full">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Newspaper size={24} className="text-primary" />
          </div>
          <h1 className="text-4xl font-black">Prensa</h1>
        </div>
        <div className="glass-card p-8 space-y-6 text-muted leading-relaxed">
          <p>Bienvenido al centro de prensa de osmi.</p>
          <h2 className="text-xl font-bold text-foreground mt-6">Contacto de prensa</h2>
          <p>Para consultas de medios, contactanos en: prensa@osmi.app</p>
          <h2 className="text-xl font-bold text-foreground mt-6">Kit de prensa</h2>
          <p>Descarga nuestro kit de prensa con logotipos, imagenes y recursos de marca.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
