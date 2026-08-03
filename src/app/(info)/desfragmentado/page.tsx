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
  Ghost,
  Clock,
  MapPin,
  Calendar,
  Volume2,
  Headphones,
  Link as LinkIcon
} from "lucide-react";

export const metadata: Metadata = {
  title: "DESFRAGMENTADO - El MC Legendario | Artista Oficial",
  description: "DESFRAGMENTADO, el MC Legendario del rap y hip hop. Escucha su música, conoce sus colaboraciones, contrataciones y sigue su legado artístico.",
  keywords: "DESFRAGMENTADO, MC Legendario, rap, hip hop, música independiente, artista mexicano, storytelling",
};

export default function DesfragmentadoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black overflow-x-hidden">
      {/* Fondo elegante */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/5 via-black to-black pointer-events-none"></div>
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItSDI0di2yaDEyek0zNiAyNHYySDI0di2yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20 pointer-events-none"></div>
      
      <Navbar />
      
      <main className="flex-1 max-w-6xl mx-auto px-6 md:px-12 py-8 md:py-16 w-full relative z-10">
        
        {/* ==================== HERO ==================== */}
        <section className="relative rounded-3xl overflow-hidden mb-20 bg-gradient-to-br from-red-950/20 via-black to-black border border-red-900/20 p-8 md:p-16 shadow-2xl shadow-red-950/10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djItSDI0di2yaDEyek0zNiAyNHYySDI0di2yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-red-800/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            {/* Imagen del artista desde Cloudinary */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-red-600/20 rounded-2xl blur-2xl animate-pulse"></div>
                <img 
                  src="https://res.cloudinary.com/dkasxv8fj/image/upload/v1779219665/WhatsApp_Image_2026-05-09_at_2.02.54_PM_mxqy93.jpg" 
                  alt="DESFRAGMENTADO" 
                  className="w-48 h-48 md:w-64 md:h-64 rounded-2xl object-cover border-2 border-red-900/30 shadow-2xl shadow-red-900/20"
                />
              </div>
            </div>
            
            {/* Texto */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-block px-4 py-1.5 rounded-full bg-red-600/20 text-red-400 text-xs font-bold tracking-widest mb-4 border border-red-600/30">
                MC LEGENDARIO
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-3 tracking-tight">
                DESFRAGMENTADO
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 font-light mb-4">
                Rap · Hip Hop · Storytelling
              </p>
              <blockquote className="text-lg text-red-400/80 italic border-l-4 border-red-600 pl-4 mb-6 max-w-xl">
                "Interferencia en tu algoritmo"
              </blockquote>
              
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <a 
                  href="https://open.spotify.com/artist/3o9iSbT2VLRof2zLNQJFNO" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1DB954] text-black font-bold rounded-xl hover:scale-105 hover:shadow-lg hover:shadow-[#1DB954]/30 transition-all duration-300"
                >
                  <Music size={18} />
                  Escuchar en Spotify
                </a>
                <a 
                  href="https://youtube.com/@desfragmentadoo" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF0000] text-white font-bold rounded-xl hover:scale-105 hover:shadow-lg hover:shadow-[#FF0000]/30 transition-all duration-300"
                >
                  <PlayCircle size={18} />
                  Ver YouTube
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== BIOGRAFÍA ==================== */}
        <section className="mb-20">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center border border-red-600/30">
                  <Target size={18} className="text-red-500" />
                </div>
                <h2 className="text-3xl font-black text-white">Biografía</h2>
              </div>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  <span className="text-red-500 font-bold">DESFRAGMENTADO</span> es un artista independiente mexicano que transforma experiencias reales en historias cargadas de intensidad, crítica y emociones profundas.
                </p>
                <p>
                  Cada lanzamiento representa una nueva etapa de un universo musical donde la identidad, el conflicto y la evolución artística son el centro de todo.
                </p>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="bg-red-950/20 rounded-2xl p-6 border border-red-900/30 backdrop-blur-sm h-full">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Ghost size={16} className="text-red-500" />
                  Esencia
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-red-600"></span>
                    <span>narrativa cinematográfica</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span>Música independiente</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-red-400"></span>
                    <span>experiencias reales</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-red-600"></span>
                    <span>Evolución constante</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== TRAYECTORIA ==================== */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center border border-red-600/30">
              <Award size={18} className="text-red-500" />
            </div>
            <h2 className="text-3xl font-black text-white">Trayectoria</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-red-950/20 rounded-2xl p-8 text-center border border-red-900/30 hover:border-red-600/40 transition-all duration-300 backdrop-blur-sm">
              <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-4 border border-red-600/30">
                <Music size={28} className="text-red-500" />
              </div>
              <h3 className="text-white font-bold text-xl">Música Original</h3>
              <p className="text-gray-400 mt-2">historias reales</p>
            </div>
            
            <div className="bg-red-950/20 rounded-2xl p-8 text-center border border-red-900/30 hover:border-red-600/40 transition-all duration-300 backdrop-blur-sm">
              <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-4 border border-red-600/30">
                <TrendingUp size={28} className="text-red-500" />
              </div>
              <h3 className="text-white font-bold text-xl">En Evolución</h3>
              <p className="text-gray-400 mt-2">Experimentando Frecuencias en colaboraciones</p>
            </div>
            
            <div className="bg-red-950/20 rounded-2xl p-8 text-center border border-red-900/30 hover:border-red-600/40 transition-all duration-300 backdrop-blur-sm">
              <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-4 border border-red-600/30">
                <Sparkles size={28} className="text-red-500" />
              </div>
              <h3 className="text-white font-bold text-xl">Impacto Cultural</h3>
              <p className="text-gray-400 mt-2">Dejando huella</p>
            </div>
          </div>
        </section>

        {/* ==================== MÚSICA ==================== */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center border border-red-600/30">
              <PlayCircle size={18} className="text-red-500" />
            </div>
            <h2 className="text-3xl font-black text-white">Música</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a 
              href="https://open.spotify.com/artist/3o9iSbT2VLRof2zLNQJFNO" 
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/5 rounded-2xl p-6 text-center hover:bg-[#1DB954]/10 border border-white/10 hover:border-[#1DB954]/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-[#1DB954]/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Music size={26} className="text-[#1DB954]" />
              </div>
              <span className="text-white font-medium">Spotify</span>
            </a>
            
            <a 
              href="https://youtube.com/@desfragmentadoo" 
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/5 rounded-2xl p-6 text-center hover:bg-[#FF0000]/10 border border-white/10 hover:border-[#FF0000]/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-[#FF0000]/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <PlayCircle size={26} className="text-[#FF0000]" />
              </div>
              <span className="text-white font-medium">YouTube</span>
            </a>
            
            <a 
              href="https://www.tiktok.com/@desfragmentado" 
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/5 rounded-2xl p-6 text-center hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Radio size={26} className="text-white" />
              </div>
              <span className="text-white font-medium">TikTok</span>
            </a>
            
            <a 
              href="https://soundcloud.com/desfragmentado-music" 
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/5 rounded-2xl p-6 text-center hover:bg-[#FF5500]/10 border border-white/10 hover:border-[#FF5500]/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-[#FF5500]/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Volume2 size={26} className="text-[#FF5500]" />
              </div>
              <span className="text-white font-medium">SoundCloud</span>
            </a>
          </div>
        </section>

        {/* ==================== REDES SOCIALES ==================== */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center border border-red-600/30">
              <Heart size={18} className="text-red-500" />
            </div>
            <h2 className="text-3xl font-black text-white">Redes Sociales</h2>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <a 
              href="https://www.instagram.com/desfragmentado_el_mc_legendari" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-[#E4405F]/10 rounded-xl hover:bg-[#E4405F]/20 border border-[#E4405F]/20 hover:border-[#E4405F]/40 transition-all duration-300"
            >
              <Globe size={18} className="text-[#E4405F]" />
              <span className="text-white font-medium">Instagram</span>
            </a>
            
            <a 
              href="https://www.facebook.com/Desfragmentado1405" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-[#1877F2]/10 rounded-xl hover:bg-[#1877F2]/20 border border-[#1877F2]/20 hover:border-[#1877F2]/40 transition-all duration-300"
            >
              <Users size={18} className="text-[#1877F2]" />
              <span className="text-white font-medium">Facebook</span>
            </a>
            
            <a 
              href="https://www.tiktok.com/@desfragmentado" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-white/5 rounded-xl hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all duration-300"
            >
              <Radio size={18} className="text-white" />
              <span className="text-white font-medium">TikTok</span>
            </a>
            
            <a 
              href="https://open.spotify.com/artist/3o9iSbT2VLRof2zLNQJFNO" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-[#1DB954]/10 rounded-xl hover:bg-[#1DB954]/20 border border-[#1DB954]/20 hover:border-[#1DB954]/40 transition-all duration-300"
            >
              <Music size={18} className="text-[#1DB954]" />
              <span className="text-white font-medium">Spotify</span>
            </a>
            
            <a 
              href="https://youtube.com/@desfragmentadoo" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-[#FF0000]/10 rounded-xl hover:bg-[#FF0000]/20 border border-[#FF0000]/20 hover:border-[#FF0000]/40 transition-all duration-300"
            >
              <PlayCircle size={18} className="text-[#FF0000]" />
              <span className="text-white font-medium">YouTube</span>
            </a>
          </div>
        </section>

        {/* ==================== FRASE FINAL ==================== */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-950/20 via-black to-red-950/20 p-12 md:p-20 text-center border border-red-900/20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di2yaDEyek0zNiAyNHYySDI0di2yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-8 border border-red-600/30">
              <Star size={32} className="text-red-500" />
            </div>
            
            <blockquote className="text-3xl md:text-5xl font-black text-white leading-tight">
              "No vine a ser uno más.
              <br />
              <span className="text-red-500">Vine a dejar un legado."</span>
            </blockquote>
            
            <p className="text-gray-400 mt-6 text-lg tracking-widest">
              — DESFRAGMENTADO
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}