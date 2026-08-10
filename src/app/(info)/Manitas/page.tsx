import { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import {
  Wrench,
  Car,
  Bike,
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  Users,
  Shield,
  Award,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  Settings,
  Gauge,
  Fuel,
  AlertTriangle,
  Calendar,
  MessageCircle
} from "lucide-react";

export const metadata: Metadata = {
  title: "Manitas - Taller Mecánico Especializado | Motos y Autos",
  description: "Taller mecánico Manitas, especialistas en reparación de motos y autos. Servicio profesional, confiable y con garantía en Guadalajara.",
  keywords: "taller mecánico, reparación de motos, reparación de autos, mecánica, Guadalajara, taller de motos, taller de autos",
};

export default function ManitasPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 overflow-x-hidden">
      <Navbar />
      
      <main className="flex-1 max-w-6xl mx-auto px-6 md:px-12 py-8 md:py-16 w-full relative z-10">
        
        {/* ==================== HERO ==================== */}
        <section className="relative rounded-3xl overflow-hidden mb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 md:p-16 shadow-2xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di2yaDEyek0zNiAyNHYySDI0di2yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-800/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold tracking-widest mb-4 border border-blue-600/30">
                TALLER MECÁNICO
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-4 tracking-tight">
                Manitas
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 font-light mb-4">
                Especialistas en Motos y Autos
              </p>
              <p className="text-lg text-gray-400 max-w-xl mb-6">
                Reparación profesional, confiable y con garantía. <br />
                Tu vehículo en las mejores manos.
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <a 
                  href="tel:3339055700" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:scale-105 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300"
                >
                  <Phone size={18} />
                  Llamar ahora
                </a>
                <a 
                  href="https://wa.me/523339055700" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-bold rounded-xl hover:scale-105 hover:shadow-lg hover:shadow-[#25D366]/30 transition-all duration-300"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </a>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-2xl p-6 text-center backdrop-blur-sm border border-white/10">
                  <Car size={40} className="text-blue-400 mx-auto mb-2" />
                  <span className="text-white font-bold text-sm">Autos</span>
                </div>
                <div className="bg-white/10 rounded-2xl p-6 text-center backdrop-blur-sm border border-white/10">
                  <Bike size={40} className="text-blue-400 mx-auto mb-2" />
                  <span className="text-white font-bold text-sm">Motos</span>
                </div>
                <div className="bg-white/10 rounded-2xl p-6 text-center backdrop-blur-sm border border-white/10 col-span-2">
                  <Wrench size={40} className="text-blue-400 mx-auto mb-2" />
                  <span className="text-white font-bold text-sm">Reparación Especializada</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== SERVICIOS ==================== */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
              <Settings size={18} className="text-blue-600" />
            </div>
            <h2 className="text-3xl font-black text-slate-800">Servicios</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-full bg-blue-600/10 flex items-center justify-center mb-4">
                <Car size={28} className="text-blue-600" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Reparación de Autos</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  Motor y transmisión
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  Frenos y suspensión
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  Sistemas eléctricos
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  Diagnóstico computarizado
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-full bg-blue-600/10 flex items-center justify-center mb-4">
                <Bike size={28} className="text-blue-600" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Reparación de Motos</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  Motor y carburación
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  Suspensión y dirección
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  Sistema eléctrico
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  Ajuste de válvulas
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-full bg-blue-600/10 flex items-center justify-center mb-4">
                <Gauge size={28} className="text-blue-600" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Mantenimiento</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  Cambio de aceite
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  Filtros y líquidos
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  Ajuste de componentes
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  Revisión periódica
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ==================== POR QUÉ ELEGIRNOS ==================== */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
              <Award size={18} className="text-blue-600" />
            </div>
            <h2 className="text-3xl font-black text-slate-800">¿Por qué elegirnos?</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-slate-100">
              <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center mx-auto mb-3">
                <Users size={24} className="text-blue-600" />
              </div>
              <h3 className="text-white font-bold">Experiencia</h3>
              <p className="text-slate-600 text-sm mt-1">Años de trayectoria en el sector</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-slate-100">
              <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center mx-auto mb-3">
                <Shield size={24} className="text-blue-600" />
              </div>
              <h3 className="text-white font-bold">Garantía</h3>
              <p className="text-slate-600 text-sm mt-1">Todos los trabajos tienen garantía</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-slate-100">
              <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center mx-auto mb-3">
                <Star size={24} className="text-blue-600" />
              </div>
              <h3 className="text-white font-bold">Calidad</h3>
              <p className="text-slate-600 text-sm mt-1">Herramientas y piezas de primera</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-slate-100">
              <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center mx-auto mb-3">
                <Clock size={24} className="text-blue-600" />
              </div>
              <h3 className="text-white font-bold">Puntualidad</h3>
              <p className="text-slate-600 text-sm mt-1">Entregas a tiempo</p>
            </div>
          </div>
        </section>

        {/* ==================== CONTACTO ==================== */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
              <MapPin size={18} className="text-blue-600" />
            </div>
            <h2 className="text-3xl font-black text-slate-800">Contacto</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-bold">Dirección</h4>
                    <p className="text-slate-600">Guadalajara, Jalisco, México</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-bold">Teléfono</h4>
                    <a href="tel:3339055700" className="text-blue-600 hover:text-blue-800 transition-colors">
                      33 3905 5700
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MessageCircle size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-bold">WhatsApp</h4>
                    <a 
                      href="https://wa.me/523339055700" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:text-[#1DA851] transition-colors"
                    >
                      Enviar mensaje
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-bold">Horario</h4>
                    <p className="text-slate-600">Lunes a Viernes: 9:00 - 19:00</p>
                    <p className="text-slate-600">Sábados: 10:00 - 16:00</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-3">
                <a 
                  href="tel:3339055700" 
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <Phone size={18} />
                  Llamar
                </a>
                <a 
                  href="https://wa.me/523339055700" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1DA851] transition-colors"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
              <h3 className="text-white font-bold text-xl mb-4">Envíanos un mensaje</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-slate-700 text-sm font-medium mb-1">Nombre</label>
                  <input 
                    type="text" 
                    placeholder="Tu nombre" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 text-sm font-medium mb-1">Teléfono</label>
                  <input 
                    type="tel" 
                    placeholder="Tu teléfono" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 text-sm font-medium mb-1">Mensaje</label>
                  <textarea 
                    rows={4}
                    placeholder="Describe tu problema o consulta" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ==================== FRASE FINAL ==================== */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-12 md:p-20 text-center">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djItSDI0di2yaDEyek0zNiAyNHYySDI0di2yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center mx-auto mb-6 border border-blue-600/30">
              <Wrench size={32} className="text-blue-400" />
            </div>
            
            <blockquote className="text-3xl md:text-4xl font-bold text-white leading-tight">
              "Tu vehículo en las mejores manos. <br />
              <span className="text-blue-400">Manitas, confianza que se siente."</span>
            </blockquote>
            
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <span>© 2026 Manitas Taller Mecánico</span>
              <span>•</span>
              <span>Tel: 33 3905 5700</span>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}