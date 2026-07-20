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
  Zap
} from "lucide-react";

export const metadata: Metadata = {
  title: "DESFRAGMENTADO - El MC Legendario | Artista Oficial",
  description: "DESFRAGMENTADO, el MC Legendario del rap y hip hop. Escucha su música, conoce sus colaboraciones, contrataciones y sigue su legado artístico.",
  keywords: "DESFRAGMENTADO, MC Legendario, rap, hip hop, música independiente, artista mexicano, storytelling",
};

export default function DesfragmentadoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-gray-950 to-black">
      <Navbar />
      
      <main className="flex-1 max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-16 w-full">
        
        {/* ==================== HERO ==================== */}
        <section className="relative rounded-3xl overflow-hidden mb-16 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/5 p-8 md:p-16">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Avatar / Imagen */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1 shadow-2xl shadow-primary/20">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                  <span className="text-4xl md:text-6xl font-black text-white">D</span>
                </div>
              </div>
            </div>
            
            {/* Texto */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold tracking-wider mb-4 border border-primary/30">
                MC LEGENDARIO
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-2">
                DESFRAGMENTADO
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 font-light mb-4">
                Rap · Hip Hop · Storytelling
              </p>
              <blockquote className="text-lg text-gray-400 italic border-l-4 border-primary pl-4 mb-6">
                "No sigo tendencias. Las convierto en ruinas."
              </blockquote>
              
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <a 
                  href="https://open.spotify.com/artist/3o9iSbT2VLRof2zLNQJFNO" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1DB954] text-black font-bold rounded-full hover:scale-105 hover:shadow-lg hover:shadow-[#1DB954]/30 transition-all duration-300"
                >
                  <Music size={20} />
                  Escuchar en Spotify
                </a>
                <a 
                  href="https://youtube.com/@desfragmentadoo" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF0000] text-white font-bold rounded-full hover:scale-105 hover:shadow-lg hover:shadow-[#FF0000]/30 transition-all duration-300"
                >
                  <PlayCircle size={20} />
                  Ver YouTube
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== BIOGRAFÍA ==================== */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Target size={20} className="text-primary" />
            </div>
            <h2 className="text-3xl font-black text-white">Biografía</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                <span className="text-primary font-bold text-lg">DESFRAGMENTADO</span> es un artista independiente mexicano que transforma experiencias reales en historias cargadas de intensidad, crítica y emociones profundas.
              </p>
              <p>
                Su propuesta combina <span className="text-white font-semibold">rap, hip hop y narrativa cinematográfica</span> para construir canciones que no buscan seguir modas, sino dejar una marca imborrable en la escena musical.
              </p>
              <p>
                Cada lanzamiento representa una nueva etapa de un universo musical donde la identidad, el conflicto y la evolución artística son el centro de todo.
              </p>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Zap size={18} className="text-primary" />
                Datos clave
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span>🎤 Rap con narrativa cinematográfica</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span>🔥 Música independiente mexicana</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent"></span>
                  <span>📖 Historias basadas en experiencias reales</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span>⚡ Evolución constante en su sonido</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ==================== TRAYECTORIA ==================== */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
              <Award size={20} className="text-secondary" />
            </div>
            <h2 className="text-3xl font-black text-white">Trayectoria</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-2xl p-6 text-center border border-white/10 hover:border-primary/30 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Music2 size={28} className="text-primary" />
              </div>
              <h3 className="text-white font-bold text-lg">Música Original</h3>
              <p className="text-gray-400 text-sm mt-2">Canciones que narran historias reales con intensidad lírica</p>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-6 text-center border border-white/10 hover:border-secondary/30 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={28} className="text-secondary" />
              </div>
              <h3 className="text-white font-bold text-lg">En Evolución</h3>
              <p className="text-gray-400 text-sm mt-2">Nuevos sonidos y colaboraciones que expanden el género</p>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-6 text-center border border-white/10 hover:border-accent/30 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Sparkles size={28} className="text-accent" />
              </div>
              <h3 className="text-white font-bold text-lg">Impacto Cultural</h3>
              <p className="text-gray-400 text-sm mt-2">Dejando huella en el rap independiente latinoamericano</p>
            </div>
          </div>
        </section>

        {/* ==================== NOTICIAS ==================== */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Newspaper size={20} className="text-accent" />
            </div>
            <h2 className="text-3xl font-black text-white">Últimas Noticias</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-2xl p-6 border border-primary/20 hover:border-primary/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📰</span>
                <div>
                  <span className="text-xs text-primary font-bold uppercase tracking-wider">Nuevo lanzamiento</span>
                  <h3 className="text-white font-bold mt-1">Nuevo sencillo disponible</h3>
                  <p className="text-gray-400 text-sm mt-1">Ya está disponible en todas las plataformas digitales.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-6 border border-secondary/20 hover:border-secondary/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🎤</span>
                <div>
                  <span className="text-xs text-secondary font-bold uppercase tracking-wider">En producción</span>
                  <h3 className="text-white font-bold mt-1">Próximos lanzamientos</h3>
                  <p className="text-gray-400 text-sm mt-1">Nuevas canciones que verán la luz muy pronto.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-6 border border-accent/20 hover:border-accent/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🎬</span>
                <div>
                  <span className="text-xs text-accent font-bold uppercase tracking-wider">Visual</span>
                  <h3 className="text-white font-bold mt-1">Nuevos videoclips</h3>
                  <p className="text-gray-400 text-sm mt-1">Contenido visual que complementa la música.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-6 border border-primary/20 hover:border-primary/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🔥</span>
                <div>
                  <span className="text-xs text-primary font-bold uppercase tracking-wider">Colaboraciones</span>
                  <h3 className="text-white font-bold mt-1">Colaboraciones nacionales</h3>
                  <p className="text-gray-400 text-sm mt-1">Alianzas con otros artistas del género.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== MÚSICA ==================== */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <PlayCircle size={20} className="text-primary" />
            </div>
            <h2 className="text-3xl font-black text-white">Escucha mi música</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <a 
              href="https://open.spotify.com/artist/3o9iSbT2VLRof2zLNQJFNO" 
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/5 rounded-2xl p-4 text-center hover:bg-[#1DB954]/10 border border-white/10 hover:border-[#1DB954]/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-[#1DB954]/20 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <Music size={24} className="text-[#1DB954]" />
              </div>
              <span className="text-white font-medium text-sm">Spotify</span>
            </a>
            
            <a 
              href="https://youtube.com/@desfragmentadoo" 
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/5 rounded-2xl p-4 text-center hover:bg-[#FF0000]/10 border border-white/10 hover:border-[#FF0000]/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-[#FF0000]/20 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <PlayCircle size={24} className="text-[#FF0000]" />
              </div>
              <span className="text-white font-medium text-sm">YouTube</span>
            </a>
            
            <a 
              href="https://www.tiktok.com/@desfragmentado" 
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/5 rounded-2xl p-4 text-center hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <Radio size={24} className="text-white" />
              </div>
              <span className="text-white font-medium text-sm">TikTok</span>
            </a>
            
            <a 
              href="https://www.instagram.com/desfragmentado_el_mc_legendari" 
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/5 rounded-2xl p-4 text-center hover:bg-[#E4405F]/10 border border-white/10 hover:border-[#E4405F]/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-[#E4405F]/20 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <Globe size={24} className="text-[#E4405F]" />
              </div>
              <span className="text-white font-medium text-sm">Instagram</span>
            </a>
          </div>
        </section>

        {/* ==================== REDES SOCIALES ==================== */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
              <Heart size={20} className="text-secondary" />
            </div>
            <h2 className="text-3xl font-black text-white">Redes Sociales</h2>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <a 
              href="https://www.instagram.com/desfragmentado_el_mc_legendari" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-[#E4405F]/10 rounded-full hover:bg-[#E4405F]/20 border border-[#E4405F]/20 hover:border-[#E4405F]/40 transition-all duration-300"
            >
              <Globe size={18} className="text-[#E4405F]" />
              <span className="text-white text-sm font-medium">Instagram</span>
              <ExternalLink size={14} className="text-gray-400" />
            </a>
            
            <a 
              href="https://www.facebook.com/share/1bsG3QuVDs/" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-[#1877F2]/10 rounded-full hover:bg-[#1877F2]/20 border border-[#1877F2]/20 hover:border-[#1877F2]/40 transition-all duration-300"
            >
              <Users size={18} className="text-[#1877F2]" />
              <span className="text-white text-sm font-medium">Facebook</span>
              <ExternalLink size={14} className="text-gray-400" />
            </a>
            
            <a 
              href="https://www.tiktok.com/@desfragmentado" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-white/5 rounded-full hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all duration-300"
            >
              <Radio size={18} className="text-white" />
              <span className="text-white text-sm font-medium">TikTok</span>
              <ExternalLink size={14} className="text-gray-400" />
            </a>
            
            <a 
              href="https://open.spotify.com/artist/3o9iSbT2VLRof2zLNQJFNO" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-[#1DB954]/10 rounded-full hover:bg-[#1DB954]/20 border border-[#1DB954]/20 hover:border-[#1DB954]/40 transition-all duration-300"
            >
              <Music size={18} className="text-[#1DB954]" />
              <span className="text-white text-sm font-medium">Spotify</span>
              <ExternalLink size={14} className="text-gray-400" />
            </a>
            
            <a 
              href="https://youtube.com/@desfragmentadoo" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-[#FF0000]/10 rounded-full hover:bg-[#FF0000]/20 border border-[#FF0000]/20 hover:border-[#FF0000]/40 transition-all duration-300"
            >
              <PlayCircle size={18} className="text-[#FF0000]" />
              <span className="text-white text-sm font-medium">YouTube</span>
              <ExternalLink size={14} className="text-gray-400" />
            </a>
          </div>
        </section>

        {/* ==================== COLABORACIONES ==================== */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Handshake size={20} className="text-primary" />
            </div>
            <h2 className="text-3xl font-black text-white">Colaboraciones</h2>
          </div>
          
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <p className="text-gray-300 mb-6 text-center md:text-left">
              Estoy abierto a colaborar con profesionales apasionados por la música y el arte:
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="bg-white/5 rounded-xl p-3 text-center hover:bg-primary/10 transition-all duration-300 border border-white/5 hover:border-primary/20">
                <span className="text-2xl block mb-1">🎹</span>
                <span className="text-white text-xs font-medium">Productores</span>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center hover:bg-secondary/10 transition-all duration-300 border border-white/5 hover:border-secondary/20">
                <span className="text-2xl block mb-1">🎧</span>
                <span className="text-white text-xs font-medium">Beatmakers</span>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center hover:bg-accent/10 transition-all duration-300 border border-white/5 hover:border-accent/20">
                <span className="text-2xl block mb-1">🎤</span>
                <span className="text-white text-xs font-medium">Raperos</span>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center hover:bg-primary/10 transition-all duration-300 border border-white/5 hover:border-primary/20">
                <span className="text-2xl block mb-1">🎬</span>
                <span className="text-white text-xs font-medium">Videógrafos</span>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center hover:bg-secondary/10 transition-all duration-300 border border-white/5 hover:border-secondary/20">
                <span className="text-2xl block mb-1">📸</span>
                <span className="text-white text-xs font-medium">Fotógrafos</span>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center hover:bg-accent/10 transition-all duration-300 border border-white/5 hover:border-accent/20">
                <span className="text-2xl block mb-1">🎨</span>
                <span className="text-white text-xs font-medium">Diseñadores</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-400 mt-4 text-center italic">
              Si tienes un proyecto serio, podemos trabajar juntos.
            </p>
          </div>
        </section>

        {/* ==================== PUBLICIDAD ==================== */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Megaphone size={20} className="text-accent" />
            </div>
            <h2 className="text-3xl font-black text-white">Publicidad y Patrocinios</h2>
          </div>
          
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <p className="text-gray-300 mb-6 text-center md:text-left">
              ¿Quieres anunciar tu marca dentro del contenido de DESFRAGMENTADO?
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-white/5 rounded-xl p-3 text-center border border-primary/10 hover:border-primary/30 transition-all duration-300">
                <span className="text-2xl block mb-1">🎵</span>
                <span className="text-white text-xs font-medium">Música</span>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center border border-secondary/10 hover:border-secondary/30 transition-all duration-300">
                <span className="text-2xl block mb-1">👕</span>
                <span className="text-white text-xs font-medium">Moda Urbana</span>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center border border-accent/10 hover:border-accent/30 transition-all duration-300">
                <span className="text-2xl block mb-1">💻</span>
                <span className="text-white text-xs font-medium">Tecnología</span>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center border border-primary/10 hover:border-primary/30 transition-all duration-300">
                <span className="text-2xl block mb-1">🎪</span>
                <span className="text-white text-xs font-medium">Eventos</span>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center border border-secondary/10 hover:border-secondary/30 transition-all duration-300">
                <span className="text-2xl block mb-1">🎤</span>
                <span className="text-white text-xs font-medium">Cultura Hip Hop</span>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center border border-accent/10 hover:border-accent/30 transition-all duration-300">
                <span className="text-2xl block mb-1">📱</span>
                <span className="text-white text-xs font-medium">Redes Sociales</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== CONTRATACIONES ==================== */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Mail size={20} className="text-primary" />
            </div>
            <h2 className="text-3xl font-black text-white">Contrataciones</h2>
          </div>
          
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/5 rounded-xl p-4 text-center hover:bg-primary/5 transition-all duration-300">
                <span className="text-3xl block mb-2">📅</span>
                <h3 className="text-white font-bold text-sm">Presentaciones</h3>
                <p className="text-gray-400 text-xs mt-1">Eventos, festivales y conciertos</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center hover:bg-secondary/5 transition-all duration-300">
                <span className="text-3xl block mb-2">🎙️</span>
                <h3 className="text-white font-bold text-sm">Entrevistas</h3>
                <p className="text-gray-400 text-xs mt-1">Podcasts, medios y contenido</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center hover:bg-accent/5 transition-all duration-300">
                <span className="text-3xl block mb-2">🎯</span>
                <h3 className="text-white font-bold text-sm">Contenido Promocional</h3>
                <p className="text-gray-400 text-xs mt-1">Campañas y colaboraciones</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center hover:bg-primary/5 transition-all duration-300">
                <span className="text-3xl block mb-2">🤝</span>
                <h3 className="text-white font-bold text-sm">Alianzas</h3>
                <p className="text-gray-400 text-xs mt-1">Proyectos conjuntos y sinergias</p>
              </div>
            </div>
            
            <a 
              href="https://wa.me/3345998987" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 bg-[#25D366] text-white font-bold rounded-full hover:scale-105 hover:shadow-lg hover:shadow-[#25D366]/30 transition-all duration-300"
            >
              <MessageCircle size={24} />
              Contrataciones por WhatsApp
              <ExternalLink size={18} />
            </a>
            <p className="text-xs text-gray-400 mt-3 text-center">
              📱 Contacto directo por WhatsApp
            </p>
          </div>
        </section>

        {/* ==================== FRASE FINAL ==================== */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10 p-12 md:p-16 text-center border border-white/5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di2yaDEyek0zNiAyNHYySDI0di2yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <Star size={32} className="text-primary" />
            </div>
            
            <blockquote className="text-3xl md:text-5xl font-black text-white leading-tight">
              "No vine a ser uno más.
              <br />
              <span className="text-primary">Vine a dejar un legado."</span>
            </blockquote>
            
            <p className="text-gray-400 mt-6 text-lg tracking-widest">
              — DESFRAGMENTADO
            </p>
            
            <div className="mt-8 flex justify-center gap-6 text-xs text-gray-500">
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