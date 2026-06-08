import { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Target, Eye, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre Nosotros - osmi",
  description: "Conoce la misión, visión y objetivos de osmi, la plataforma de ticketing más inteligente.",
};

export default function SobreNosotrosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-4xl mx-auto px-6 py-20 w-full">
        <h1 className="text-4xl font-black mb-4">Sobre Nosotros</h1>
        <p className="text-muted text-lg mb-16 leading-relaxed">
          En osmi creemos que cada evento es un momento inolvidable. Nuestra plataforma conecta a personas con experiencias únicas de forma segura, rápida y confiable.
        </p>

        {/* Misión */}
        <section className="glass-card p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Target size={24} className="text-primary" />
            </div>
            <h2 className="text-2xl font-black">Mision</h2>
          </div>
          <p className="text-muted leading-relaxed">
            Democratizar el acceso a eventos en todo el mundo mediante una plataforma tecnologica que garantice transacciones seguras, entrega inmediata de boletos digitales y una experiencia de usuario excepcional.
          </p>
        </section>

        {/* Visión */}
        <section className="glass-card p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
              <Eye size={24} className="text-secondary" />
            </div>
            <h2 className="text-2xl font-black">Vision</h2>
          </div>
          <p className="text-muted leading-relaxed">
            Ser la plataforma lider de ticketing digital en Latinoamerica, reconocida por nuestra innovacion, seguridad y compromiso con la satisfaccion de nuestros usuarios y organizadores de eventos.
          </p>
        </section>

        {/* Objetivos */}
        <section className="glass-card p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Heart size={24} className="text-accent" />
            </div>
            <h2 className="text-2xl font-black">Objetivos</h2>
          </div>
          <ul className="space-y-3 text-muted leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-0.5">01.</span>
              <span>Procesar mas de 1 millon de transacciones seguras en los proximos 2 años.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-0.5">02.</span>
              <span>Expandir nuestra presencia a 10 paises de Latinoamerica.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-0.5">03.</span>
              <span>Reducir el fraude en ticketing mediante tecnologia blockchain y codigos QR dinamicos.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-0.5">04.</span>
              <span>Ofrecer la mejor experiencia de usuario con soporte 24/7 en español, ingles y portugues.</span>
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
