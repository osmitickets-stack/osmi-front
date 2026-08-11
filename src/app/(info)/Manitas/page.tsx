import { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import {
  Wrench,
  Car,
  Bike,
  Phone,
  MapPin,
  Clock,
  Star,
  Users,
  Shield,
  Award,
  CheckCircle,
  Settings,
  Gauge,
  Fuel,
  Calendar,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Truck,
  Zap,
  ThumbsUp,
  Flame
} from "lucide-react";

export const metadata: Metadata = {
  title: "Manitas - Taller Mecánico Especializado | Motos y Autos en Guadalajara",
  description: "Taller mecánico Manitas, especialistas en reparación de motos y autos. Servicio profesional, confiable y con garantía en Guadalajara, Jalisco.",
  keywords: "taller mecánico, reparación de motos, reparación de autos, mecánica, Guadalajara, taller de motos, taller de autos, mantenimiento vehicular",
};

export default function ManitasPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white overflow-x-hidden">
      <Navbar />
      
      <main className="flex-1 w-full relative z-10">
        
        {/* ==================== MARQUEE DINÁMICO ==================== */}
        <div className="bg-gradient-to-r from-blue-600 via-orange-500 to-blue-600 py-3 overflow-hidden border-y-2 border-white/10">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-12 text-white font-medium text-sm">
            <span className="flex items-center gap-2">
              <Sparkles size={16} className="text-yellow-300" />
              Servicio Profesional
            </span>
            <span className="flex items-center gap-2">
              <Wrench size={16} className="text-yellow-300" />
              Reparación de Motos
            </span>
            <span className="flex items-center gap-2">
              <Car size={16} className="text-yellow-300" />
              Reparación de Autos
            </span>
            <span className="flex items-center gap-2">
              <Shield size={16} className="text-yellow-300" />
              Garantía en Todos los Trabajos
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} className="text-yellow-300" />
              Entrega a Tiempo
            </span>
            <span className="flex items-center gap-2">
              <Star size={16} className="text-yellow-300" />
              Calidad Garantizada
            </span>
            <span className="flex items-center gap-2">
              <Phone size={16} className="text-yellow-300" />
              33 3905 5700
            </span>
          </div>
        </div>

        {/* ==================== HERO ==================== */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-16 md:py-24">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djItSDI0di2yaDEyek0zNiAyNHYySDI0di2yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold tracking-widest mb-4 border border-blue-500/30">
                  TALLER MECÁNICO
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-4 tracking-tight">
                  Manitas
                </h1>
                <p className="text-xl md:text-2xl text-blue-200 font-light mb-3">
                  Especialistas en Motos y Autos
                </p>
                <p className="text-lg text-gray-300 max-w-xl mb-8">
                  Reparación profesional, confiable y con garantía. <br />
                  Tu vehículo en las mejores manos.
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <a 
                    href="tel:3339055700" 
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-2xl hover:scale-105 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300"
                  >
                    <Phone size={20} />
                    Llamar ahora
                  </a>
                  <a 
                    href="https://wa.me/523339055700" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#25D366] to-[#1DA851] text-white font-bold rounded-2xl hover:scale-105 hover:shadow-lg hover:shadow-[#25D366]/30 transition-all duration-300"
                  >
                    <MessageCircle size={20} />
                    WhatsApp
                  </a>
                </div>
                
                <div className="flex items-center gap-6 mt-6 justify-center md:justify-start text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Shield size={16} className="text-blue-400" />
                    Garantía
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-400" />
                    5 Estrellas
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} className="text-blue-400" />
                    Puntualidad
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop" 
                    alt="Reparación de autos" 
                    className="w-full h-48 object-cover rounded-2xl shadow-2xl border-2 border-white/10 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-xs font-medium">
                    <Car size={14} className="inline mr-1" /> Autos
                  </div>
                </div>
                <div className="relative group mt-8">
                  <img 
                    src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=300&fit=crop" 
                    alt="Reparación de motos" 
                    className="w-full h-48 object-cover rounded-2xl shadow-2xl border-2 border-white/10 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-xs font-medium">
                    <Bike size={14} className="inline mr-1" /> Motos
                  </div>
                </div>
                <div className="relative group col-span-2">
                  <img 
                    src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=800&h=200&fit=crop" 
                    alt="Taller mecánico" 
                    className="w-full h-40 object-cover rounded-2xl shadow-2xl border-2 border-white/10 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-xs font-medium">
                    <Wrench size={14} className="inline mr-1" /> Especialistas
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== SERVICIOS ==================== */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-widest mb-4 border border-blue-200">
                NUESTROS SERVICIOS
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-800">
                Lo que hacemos por ti
              </h2>
              <p className="text-slate-600 mt-2 max-w-xl mx-auto">
                Servicios profesionales para mantener tu vehículo en perfectas condiciones
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group bg-gradient-to-b from-slate-50 to-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Car size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Reparación de Autos</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-center gap-3 text-sm">
                    <CheckCircle size={18} className="text-blue-500 flex-shrink-0" />
                    Motor y transmisión
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <CheckCircle size={18} className="text-blue-500 flex-shrink-0" />
                    Frenos y suspensión
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <CheckCircle size={18} className="text-blue-500 flex-shrink-0" />
                    Sistemas eléctricos
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <CheckCircle size={18} className="text-blue-500 flex-shrink-0" />
                    Diagnóstico computarizado
                  </li>
                </ul>
              </div>
              
              <div className="group bg-gradient-to-b from-slate-50 to-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Bike size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Reparación de Motos</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-center gap-3 text-sm">
                    <CheckCircle size={18} className="text-orange-500 flex-shrink-0" />
                    Motor y carburación
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <CheckCircle size={18} className="text-orange-500 flex-shrink-0" />
                    Suspensión y dirección
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <CheckCircle size={18} className="text-orange-500 flex-shrink-0" />
                    Sistema eléctrico
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <CheckCircle size={18} className="text-orange-500 flex-shrink-0" />
                    Ajuste de válvulas
                  </li>
                </ul>
              </div>
              
              <div className="group bg-gradient-to-b from-slate-50 to-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Settings size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Mantenimiento</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-center gap-3 text-sm">
                    <CheckCircle size={18} className="text-emerald-500 flex-shrink-0" />
                    Cambio de aceite
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <CheckCircle size={18} className="text-emerald-500 flex-shrink-0" />
                    Filtros y líquidos
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <CheckCircle size={18} className="text-emerald-500 flex-shrink-0" />
                    Ajuste de componentes
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <CheckCircle size={18} className="text-emerald-500 flex-shrink-0" />
                    Revisión periódica
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== POR QUÉ ELEGIRNOS ==================== */}
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold tracking-widest mb-4 border border-orange-200">
                NUESTRA VENTAJA
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-800">
                ¿Por qué elegirnos?
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Users size={28} className="text-blue-600" />
                </div>
                <h3 className="text-slate-800 font-bold">Experiencia</h3>
                <p className="text-slate-500 text-sm mt-1">Años de trayectoria en el sector</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
                <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                  <Shield size={28} className="text-orange-600" />
                </div>
                <h3 className="text-slate-800 font-bold">Garantía</h3>
                <p className="text-slate-500 text-sm mt-1">Todos los trabajos tienen garantía</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
                <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <Star size={28} className="text-emerald-600" />
                </div>
                <h3 className="text-slate-800 font-bold">Calidad</h3>
                <p className="text-slate-500 text-sm mt-1">Herramientas y piezas de primera</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
                <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Clock size={28} className="text-purple-600" />
                </div>
                <h3 className="text-slate-800 font-bold">Puntualidad</h3>
                <p className="text-slate-500 text-sm mt-1">Entregas a tiempo</p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== CONTACTO ==================== */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-widest mb-4 border border-blue-200">
                CONTACTO
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-800">
                Estamos para ayudarte
              </h2>
              <p className="text-slate-600 mt-2">
                Contáctanos y agenda tu cita
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 shadow-xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-800 mb-6">Información de contacto</h3>
                
                <div className="space-y-5">
                  <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-slate-800 font-bold text-sm">Dirección</h4>
                      <p className="text-slate-600 text-sm">Guadalajara, Jalisco, México</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Phone size={20} className="text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-slate-800 font-bold text-sm">Teléfono</h4>
                      <a href="tel:3339055700" className="text-blue-600 hover:text-blue-800 transition-colors font-semibold">
                        33 3905 5700
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                      <MessageCircle size={20} className="text-[#25D366]" />
                    </div>
                    <div>
                      <h4 className="text-slate-800 font-bold text-sm">WhatsApp</h4>
                      <a 
                        href="https://wa.me/523339055700" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#25D366] hover:text-[#1DA851] transition-colors font-semibold"
                      >
                        Enviar mensaje
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Clock size={20} className="text-orange-600" />
                    </div>
                    <div>
                      <h4 className="text-slate-800 font-bold text-sm">Horario</h4>
                      <p className="text-slate-600 text-sm">Lunes a Viernes: 9:00 - 19:00</p>
                      <p className="text-slate-600 text-sm">Sábados: 10:00 - 16:00</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <a 
                    href="tel:3339055700" 
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300"
                  >
                    <Phone size={18} />
                    Llamar
                  </a>
                  <a 
                    href="https://wa.me/523339055700" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#25D366] to-[#1DA851] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#25D366]/30 transition-all duration-300"
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </a>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 shadow-xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-800 mb-6">Envíanos un mensaje</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-slate-700 text-sm font-medium mb-1">Nombre</label>
                    <input 
                      type="text" 
                      placeholder="Tu nombre" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-sm font-medium mb-1">Teléfono</label>
                    <input 
                      type="tel" 
                      placeholder="Tu teléfono" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-sm font-medium mb-1">Mensaje</label>
                    <textarea 
                      rows={4}
                      placeholder="Describe tu problema o consulta" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none resize-none"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300"
                  >
                    Enviar mensaje
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== FRASE FINAL ==================== */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-20 text-center">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di2yaDEyek0zNiAyNHYySDI0di2yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
          
          <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
            <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-8 border border-blue-500/30">
              <Wrench size={36} className="text-blue-400" />
            </div>
            
            <blockquote className="text-3xl md:text-5xl font-bold text-white leading-tight">
              "Tu vehículo en las mejores manos. <br />
              <span className="bg-gradient-to-r from-blue-400 via-orange-400 to-blue-400 bg-clip-text text-transparent">
                Manitas, confianza que se siente."
              </span>
            </blockquote>
            
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <span>© 2026 Manitas Taller Mecánico</span>
              <span>•</span>
              <span>Tel: 33 3905 5700</span>
              <span>•</span>
              <span>Guadalajara, Jalisco</span>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}