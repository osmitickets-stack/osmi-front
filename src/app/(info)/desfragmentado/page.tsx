import { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import {
  Music,
  Mic2,
  PlayCircle,
  Newspaper,
  Handshake,
  Megaphone,
  Mail,
  MessageCircle,
  ExternalLink,
  Target,
  Heart,
  ArrowRight,
  Sparkles,
  Award,
  TrendingUp,
  Globe,
  Users,
  Radio,
  Star,
  Zap,
  Skull,
  Flame,
  Ghost
} from "lucide-react";

export const metadata: Metadata = {
  title: "DESFRAGMENTADO - El MC Legendario | Artista Oficial",
  description: "DESFRAGMENTADO, el MC Legendario del rap y hip hop. Escucha su música, conoce sus colaboraciones, contrataciones y sigue su legado artístico.",
  keywords: "DESFRAGMENTADO, MC Legendario, rap, hip hop, música independiente, artista mexicano, storytelling",
};

export default function DesfragmentadoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black overflow-x-hidden">
      {/* Fondo con textura oscura */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/10 via-black to-black pointer-events-none"></div>
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di2yaDEyek0zNiAyNHYySDI0di2yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20 pointer-events-none"></div>
      
      <Navbar />
      
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-16 w-full relative z-10">
        
        {/* ==================== HERO TÉTRICO - RESPONSIVE ==================== */}
        <section className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-12 sm:mb-16 bg-gradient-to-br from-red-950/40 via-black to-black border border-red-900/30 p-4 sm:p-8 md:p-16 shadow-2xl shadow-red-950/20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di2yaDEyek0zNiAyNHYySDI0di2yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-red-800/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-red-600/30 rounded-full blur-2xl animate-pulse"></div>
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-red-600 via-red-800 to-black p-1 shadow-2xl shadow-red-600/20 relative">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden border border-red-800/30">
                    <span className="text-3xl sm:text-4xl md:text-6xl font-black text-red-600">D</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-600/30">
                  <Skull size={14} className="text-black" />
                </div>
              </div>
            </div>
            
            {/* Texto - RESPONSIVE */}
            <div className="flex-1 text-center md:text-left w-full">
              <div className="inline-block px-3 py-1 rounded-full bg-red-600/20 text-red-500 text-[10px] sm:text-xs font-bold tracking-wider mb-3 border border-red-600/30">
                ⚡ MC LEGENDARIO
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight mb-1 sm:mb-2 tracking-tight break-words">
                DESFRAGMENTADO
              </h1>
              <p className="text-base sm:text-xl md:text-2xl text-gray-400 font-light mb-3 sm:mb-4">
                Rap · Hip Hop · Storytelling
              </p>
              <blockquote className="text-sm sm:text-base md:text-lg text-red-400 italic border-l-4 border-red-600 pl-3 sm:pl-4 mb-4 sm:mb-6">
                "No sigo tendencias. Las convierto en ruinas."
              </blockquote>
              
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start">
                <a 
                  href="https://open.spotify.com/artist/3o9iSbT2VLRof2zLNQJFNO" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#1DB954] text-black font-bold rounded-full hover:scale-105 hover:shadow-lg hover:shadow-[#1DB954]/30 transition-all duration-300 text-xs sm:text-sm"
                >
                  <Music size={16} />
                  Escuchar en Spotify
                </a>
                <a 
                  href="https://youtube.com/@desfragmentadoo" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#FF0000] text-white font-bold rounded-full hover:scale-105 hover:shadow-lg hover:shadow-[#FF0000]/30 transition-all duration-300 text-xs sm:text-sm"
                >
                  <PlayCircle size={16} />
                  Ver YouTube
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== BIOGRAFÍA ==================== */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-600/20 flex items-center justify-center border border-red-600/30 flex-shrink-0">
              <Target size={16} className="text-red-500" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Biografía</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4 text-gray-300 leading-relaxed text-sm sm:text-base">
              <p>
                <span className="text-red-500 font-bold text-base sm:text-lg">DESFRAGMENTADO</span> es un artista independiente mexicano que transforma experiencias reales en historias cargadas de intensidad, crítica y emociones profundas.
              </p>
              <p>
                Su propuesta combina <span className="text-white font-semibold">rap, hip hop y narrativa cinematográfica</span> para construir canciones que no buscan seguir modas, sino dejar una marca imborrable en la escena musical.
              </p>
              <p>
                Cada lanzamiento representa una nueva etapa de un universo musical donde la identidad, el conflicto y la evolución artística son el centro de todo.
              </p>
            </div>
            
            <div className="bg-red-950/20 rounded-2xl p-4 sm:p-6 border border-red-900/30 backdrop-blur-sm">
              <h3 className="text-white font-bold mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                <Flame size={16} className="text-red-500" />
                Datos clave
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0"></span>
                  <span>🎤 Rap con narrativa cinematográfica</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0"></span>
                  <span>🔥 Música independiente mexicana</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0"></span>
                  <span>📖 Historias basadas en experiencias reales</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0"></span>
                  <span>⚡ Evolución constante en su sonido</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ==================== TRAYECTORIA ==================== */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-600/20 flex items-center justify-center border border-red-600/30 flex-shrink-0">
              <Award size={16} className="text-red-500" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Trayectoria</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-red-950/20 rounded-2xl p-4 sm:p-6 text-center border border-red-900/30 hover:border-red-600/50 transition-all duration-300 backdrop-blur-sm">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-red-600/30">
                <Music size={20} className="text-red-500" />
              </div>
              <h3 className="text-white font-bold text-sm sm:text-lg">Música Original</h3>
              <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">Canciones que narran historias reales con intensidad lírica</p>
            </div>
            
            <div className="bg-red-950/20 rounded-2xl p-4 sm:p-6 text-center border border-red-900/30 hover:border-red-600/50 transition-all duration-300 backdrop-blur-sm">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-red-600/30">
                <TrendingUp size={20} className="text-red-500" />
              </div>
              <h3 className="text-white font-bold text-sm sm:text-lg">En Evolución</h3>
              <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">Nuevos sonidos y colaboraciones que expanden el género</p>
            </div>
            
            <div className="bg-red-950/20 rounded-2xl p-4 sm:p-6 text-center border border-red-900/30 hover:border-red-600/50 transition-all duration-300 backdrop-blur-sm col-span-1 sm:col-span-2 md:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-red-600/30">
                <Sparkles size={20} className="text-red-500" />
              </div>
              <h3 className="text-white font-bold text-sm sm:text-lg">Impacto Cultural</h3>
              <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">Dejando huella en el rap independiente latinoamericano</p>
            </div>
          </div>
        </section>

        {/* ==================== NOTICIAS ==================== */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-600/20 flex items-center justify-center border border-red-600/30 flex-shrink-0">
              <Newspaper size={16} className="text-red-500" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Últimas Noticias</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-red-950/20 rounded-2xl p-4 sm:p-6 border border-red-900/30 hover:border-red-600/50 transition-all duration-300 backdrop-blur-sm">
              <div className="flex items-start gap-3 sm:gap-4">
                <span className="text-2xl sm:text-3xl">📰</span>
                <div>
                  <span className="text-[10px] sm:text-xs text-red-500 font-bold uppercase tracking-wider">Nuevo lanzamiento</span>
                  <h3 className="text-white font-bold mt-1 text-sm sm:text-base">Nuevo sencillo disponible</h3>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">Ya está disponible en todas las plataformas digitales.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-950/20 rounded-2xl p-4 sm:p-6 border border-red-900/30 hover:border-red-600/50 transition-all duration-300 backdrop-blur-sm">
              <div className="flex items-start gap-3 sm:gap-4">
                <span className="text-2xl sm:text-3xl">🎤</span>
                <div>
                  <span className="text-[10px] sm:text-xs text-red-500 font-bold uppercase tracking-wider">En producción</span>
                  <h3 className="text-white font-bold mt-1 text-sm sm:text-base">Próximos lanzamientos</h3>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">Nuevas canciones que verán la luz muy pronto.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-950/20 rounded-2xl p-4 sm:p-6 border border-red-900/30 hover:border-red-600/50 transition-all duration-300 backdrop-blur-sm">
              <div className="flex items-start gap-3 sm:gap-4">
                <span className="text-2xl sm:text-3xl">🎬</span>
                <div>
                  <span className="text-[10px] sm:text-xs text-red-500 font-bold uppercase tracking-wider">Visual</span>
                  <h3 className="text-white font-bold mt-1 text-sm sm:text-base">Nuevos videoclips</h3>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">Contenido visual que complementa la música.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-950/20 rounded-2xl p-4 sm:p-6 border border-red-900/30 hover:border-red-600/50 transition-all duration-300 backdrop-blur-sm">
              <div className="flex items-start gap-3 sm:gap-4">
                <span className="text-2xl sm:text-3xl">🔥</span>
                <div>
                  <span className="text-[10px] sm:text-xs text-red-500 font-bold uppercase tracking-wider">Colaboraciones</span>
                  <h3 className="text-white font-bold mt-1 text-sm sm:text-base">Colaboraciones nacionales</h3>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">Alianzas con otros artistas del género.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== MÚSICA ==================== */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-600/20 flex items-center justify-center border border-red-600/30 flex-shrink-0">
              <PlayCircle size={16} className="text-red-500" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Escucha mi música</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            <a 
              href="https://open.spotify.com/artist/3o9iSbT2VLRof2zLNQJFNO" 
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-red-950/20 rounded-2xl p-3 sm:p-4 text-center hover:bg-[#1DB954]/10 border border-red-900/30 hover:border-[#1DB954]/30 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1DB954]/20 flex items-center justify-center mx-auto mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                <Music size={18} className="text-[#1DB954]" />
              </div>
              <span className="text-white font-medium text-[10px] sm:text-sm">Spotify</span>
            </a>
            
            <a 
              href="https://youtube.com/@desfragmentadoo" 
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-red-950/20 rounded-2xl p-3 sm:p-4 text-center hover:bg-[#FF0000]/10 border border-red-900/30 hover:border-[#FF0000]/30 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FF0000]/20 flex items-center justify-center mx-auto mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                <PlayCircle size={18} className="text-[#FF0000]" />
              </div>
              <span className="text-white font-medium text-[10px] sm:text-sm">YouTube</span>
            </a>
            
            <a 
              href="https://www.tiktok.com/@desfragmentado" 
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-red-950/20 rounded-2xl p-3 sm:p-4 text-center hover:bg-white/5 border border-red-900/30 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                <Radio size={18} className="text-white" />
              </div>
              <span className="text-white font-medium text-[10px] sm:text-sm">TikTok</span>
            </a>
            
            <a 
              href="https://www.instagram.com/desfragmentado_el_mc_legendari" 
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-red-950/20 rounded-2xl p-3 sm:p-4 text-center hover:bg-[#E4405F]/10 border border-red-900/30 hover:border-[#E4405F]/30 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E4405F]/20 flex items-center justify-center mx-auto mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                <Globe size={18} className="text-[#E4405F]" />
              </div>
              <span className="text-white font-medium text-[10px] sm:text-sm">Instagram</span>
            </a>
          </div>
        </section>

        {/* ==================== REDES SOCIALES ==================== */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-600/20 flex items-center justify-center border border-red-600/30 flex-shrink-0">
              <Heart size={16} className="text-red-500" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Redes Sociales</h2>
          </div>
          
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <a 
              href="https://www.instagram.com/desfragmentado_el_mc_legendari" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 bg-[#E4405F]/10 rounded-full hover:bg-[#E4405F]/20 border border-[#E4405F]/20 hover:border-[#E4405F]/40 transition-all duration-300 text-xs sm:text-sm"
            >
              <Globe size={14} className="text-[#E4405F]" />
              <span className="text-white font-medium">Instagram</span>
              <ExternalLink size={12} className="text-gray-500" />
            </a>
            
            <a 
              href="https://www.facebook.com/share/1bsG3QuVDs/" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 bg-[#1877F2]/10 rounded-full hover:bg-[#1877F2]/20 border border-[#1877F2]/20 hover:border-[#1877F2]/40 transition-all duration-300 text-xs sm:text-sm"
            >
              <Users size={14} className="text-[#1877F2]" />
              <span className="text-white font-medium">Facebook</span>
              <ExternalLink size={12} className="text-gray-500" />
            </a>
            
            <a 
              href="https://www.tiktok.com/@desfragmentado" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 bg-white/5 rounded-full hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all duration-300 text-xs sm:text-sm"
            >
              <Radio size={14} className="text-white" />
              <span className="text-white font-medium">TikTok</span>
              <ExternalLink size={12} className="text-gray-500" />
            </a>
            
            <a 
              href="https://open.spotify.com/artist/3o9iSbT2VLRof2zLNQJFNO" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 bg-[#1DB954]/10 rounded-full hover:bg-[#1DB954]/20 border border-[#1DB954]/20 hover:border-[#1DB954]/40 transition-all duration-300 text-xs sm:text-sm"
            >
              <Music size={14} className="text-[#1DB954]" />
              <span className="text-white font-medium">Spotify</span>
              <ExternalLink size={12} className="text-gray-500" />
            </a>
            
            <a 
              href="https://youtube.com/@desfragmentadoo" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 bg-[#FF0000]/10 rounded-full hover:bg-[#FF0000]/20 border border-[#FF0000]/20 hover:border-[#FF0000]/40 transition-all duration-300 text-xs sm:text-sm"
            >
              <PlayCircle size={14} className="text-[#FF0000]" />
              <span className="text-white font-medium">YouTube</span>
              <ExternalLink size={12} className="text-gray-500" />
            </a>
          </div>
        </section>

        {/* ==================== COLABORACIONES ==================== */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-600/20 flex items-center justify-center border border-red-600/30 flex-shrink-0">
              <Handshake size={16} className="text-red-500" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Colaboraciones</h2>
          </div>
          
          <div className="bg-red-950/20 rounded-2xl p-4 sm:p-8 border border-red-900/30 backdrop-blur-sm">
            <p className="text-gray-300 mb-4 sm:mb-6 text-center md:text-left text-sm sm:text-base">
              Estoy abierto a colaborar con profesionales apasionados por la música y el arte:
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
              <div className="bg-red-950/30 rounded-xl p-2 sm:p-3 text-center hover:bg-red-600/10 transition-all duration-300 border border-red-900/20 hover:border-red-600/30">
                <span className="text-xl sm:text-2xl block mb-1">🎹</span>
                <span className="text-white text-[10px] sm:text-xs font-medium">Productores</span>
              </div>
              <div className="bg-red-950/30 rounded-xl p-2 sm:p-3 text-center hover:bg-red-600/10 transition-all duration-300 border border-red-900/20 hover:border-red-600/30">
                <span className="text-xl sm:text-2xl block mb-1">🎧</span>
                <span className="text-white text-[10px] sm:text-xs font-medium">Beatmakers</span>
              </div>
              <div className="bg-red-950/30 rounded-xl p-2 sm:p-3 text-center hover:bg-red-600/10 transition-all duration-300 border border-red-900/20 hover:border-red-600/30">
                <span className="text-xl sm:text-2xl block mb-1">🎤</span>
                <span className="text-white text-[10px] sm:text-xs font-medium">Raperos</span>
              </div>
              <div className="bg-red-950/30 rounded-xl p-2 sm:p-3 text-center hover:bg-red-600/10 transition-all duration-300 border border-red-900/20 hover:border-red-600/30">
                <span className="text-xl sm:text-2xl block mb-1">🎬</span>
                <span className="text-white text-[10px] sm:text-xs font-medium">Videógrafos</span>
              </div>
              <div className="bg-red-950/30 rounded-xl p-2 sm:p-3 text-center hover:bg-red-600/10 transition-all duration-300 border border-red-900/20 hover:border-red-600/30">
                <span className="text-xl sm:text-2xl block mb-1">📸</span>
                <span className="text-white text-[10px] sm:text-xs font-medium">Fotógrafos</span>
              </div>
              <div className="bg-red-950/30 rounded-xl p-2 sm:p-3 text-center hover:bg-red-600/10 transition-all duration-300 border border-red-900/20 hover:border-red-600/30">
                <span className="text-xl sm:text-2xl block mb-1">🎨</span>
                <span className="text-white text-[10px] sm:text-xs font-medium">Diseñadores</span>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-400 mt-3 sm:mt-4 text-center italic">
              Si tienes un proyecto serio, podemos trabajar juntos.
            </p>
          </div>
        </section>

        {/* ==================== PUBLICIDAD ==================== */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-600/20 flex items-center justify-center border border-red-600/30 flex-shrink-0">
              <Megaphone size={16} className="text-red-500" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Publicidad y Patrocinios</h2>
          </div>
          
          <div className="bg-red-950/20 rounded-2xl p-4 sm:p-8 border border-red-900/30 backdrop-blur-sm">
            <p className="text-gray-300 mb-4 sm:mb-6 text-center md:text-left text-sm sm:text-base">
              ¿Quieres anunciar tu marca dentro del contenido de DESFRAGMENTADO?
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              <div className="bg-red-950/30 rounded-xl p-2 sm:p-3 text-center border border-red-900/20 hover:border-red-600/30 transition-all duration-300">
                <span className="text-xl sm:text-2xl block mb-1">🎵</span>
                <span className="text-white text-[10px] sm:text-xs font-medium">Música</span>
              </div>
              <div className="bg-red-950/30 rounded-xl p-2 sm:p-3 text-center border border-red-900/20 hover:border-red-600/30 transition-all duration-300">
                <span className="text-xl sm:text-2xl block mb-1">👕</span>
                <span className="text-white text-[10px] sm:text-xs font-medium">Moda Urbana</span>
              </div>
              <div className="bg-red-950/30 rounded-xl p-2 sm:p-3 text-center border border-red-900/20 hover:border-red-600/30 transition-all duration-300">
                <span className="text-xl sm:text-2xl block mb-1">💻</span>
                <span className="text-white text-[10px] sm:text-xs font-medium">Tecnología</span>
              </div>
              <div className="bg-red-950/30 rounded-xl p-2 sm:p-3 text-center border border-red-900/20 hover:border-red-600/30 transition-all duration-300">
                <span className="text-xl sm:text-2xl block mb-1">🎪</span>
                <span className="text-white text-[10px] sm:text-xs font-medium">Eventos</span>
              </div>
              <div className="bg-red-950/30 rounded-xl p-2 sm:p-3 text-center border border-red-900/20 hover:border-red-600/30 transition-all duration-300">
                <span className="text-xl sm:text-2xl block mb-1">🎤</span>
                <span className="text-white text-[10px] sm:text-xs font-medium">Cultura Hip Hop</span>
              </div>
              <div className="bg-red-950/30 rounded-xl p-2 sm:p-3 text-center border border-red-900/20 hover:border-red-600/30 transition-all duration-300">
                <span className="text-xl sm:text-2xl block mb-1">📱</span>
                <span className="text-white text-[10px] sm:text-xs font-medium">Redes Sociales</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== CONTRATACIONES ==================== */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-600/20 flex items-center justify-center border border-red-600/30 flex-shrink-0">
              <Mail size={16} className="text-red-500" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Contrataciones</h2>
          </div>
          
          <div className="bg-red-950/20 rounded-2xl p-4 sm:p-8 border border-red-900/30 backdrop-blur-sm">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-8">
              <div className="bg-red-950/30 rounded-xl p-3 sm:p-4 text-center hover:bg-red-600/5 transition-all duration-300 border border-red-900/20 hover:border-red-600/30">
                <span className="text-2xl sm:text-3xl block mb-1 sm:mb-2">📅</span>
                <h3 className="text-white font-bold text-xs sm:text-sm">Presentaciones</h3>
                <p className="text-gray-400 text-[10px] sm:text-xs mt-1">Eventos, festivales y conciertos</p>
              </div>
              <div className="bg-red-950/30 rounded-xl p-3 sm:p-4 text-center hover:bg-red-600/5 transition-all duration-300 border border-red-900/20 hover:border-red-600/30">
                <span className="text-2xl sm:text-3xl block mb-1 sm:mb-2">🎙️</span>
                <h3 className="text-white font-bold text-xs sm:text-sm">Entrevistas</h3>
                <p className="text-gray-400 text-[10px] sm:text-xs mt-1">Podcasts, medios y contenido</p>
              </div>
              <div className="bg-red-950/30 rounded-xl p-3 sm:p-4 text-center hover:bg-red-600/5 transition-all duration-300 border border-red-900/20 hover:border-red-600/30">
                <span className="text-2xl sm:text-3xl block mb-1 sm:mb-2">🎯</span>
                <h3 className="text-white font-bold text-xs sm:text-sm">Contenido Promocional</h3>
                <p className="text-gray-400 text-[10px] sm:text-xs mt-1">Campañas y colaboraciones</p>
              </div>
              <div className="bg-red-950/30 rounded-xl p-3 sm:p-4 text-center hover:bg-red-600/5 transition-all duration-300 border border-red-900/20 hover:border-red-600/30">
                <span className="text-2xl sm:text-3xl block mb-1 sm:mb-2">🤝</span>
                <h3 className="text-white font-bold text-xs sm:text-sm">Alianzas</h3>
                <p className="text-gray-400 text-[10px] sm:text-xs mt-1">Proyectos conjuntos y sinergias</p>
              </div>
            </div>
            
            <a 
              href="https://wa.me/3345998987" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 sm:gap-3 w-full px-4 sm:px-8 py-3 sm:py-4 bg-[#25D366] text-white font-bold rounded-full hover:scale-105 hover:shadow-lg hover:shadow-[#25D366]/30 transition-all duration-300 text-sm sm:text-base"
            >
              <MessageCircle size={18} />
              Contrataciones por WhatsApp
              <ExternalLink size={14} />
            </a>
            <p className="text-[10px] sm:text-xs text-gray-400 mt-2 sm:mt-3 text-center">
              📱 Contacto directo por WhatsApp
            </p>
          </div>
        </section>

        {/* ==================== FRASE FINAL ==================== */}
        <section className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-red-950/30 via-black to-red-950/30 p-6 sm:p-8 md:p-12 lg:p-16 text-center border border-red-900/30">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di2yaDEyek0zNiAyNHYySDI0di2yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-600/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-red-800/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-red-600/30">
              <Ghost size={24} className="text-red-500" />
            </div>
            
            <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
              "No vine a ser uno más.
              <br />
              <span className="text-red-500">Vine a dejar un legado."</span>
            </blockquote>
            
            <p className="text-gray-400 mt-4 sm:mt-6 text-base sm:text-lg tracking-widest">
              — DESFRAGMENTADO
            </p>
            
            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs text-gray-600">
              <span>© 2026 DESFRAGMENTADO</span>
              <span>•</span>
              <span>Todos los derechos reservados</span>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}