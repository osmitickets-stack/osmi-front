import { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import {
  Music,
  Music2,
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
  Radio
} from "lucide-react";

export const metadata: Metadata = {
  title: "DESFRAGMENTADO - El MC Legendario | Artista Oficial",
  description: "DESFRAGMENTADO, el MC Legendario del rap y hip hop. Escucha su música, conoce sus colaboraciones, contrataciones y sigue su legado artístico.",
  keywords: "DESFRAGMENTADO, MC Legendario, rap, hip hop, música independiente, artista mexicano, storytelling",
};

export default function DesfragmentadoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
        {/* HERO - DESFRAGMENTADO */}
        <section className="glass-card p-8 mb-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/5 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center ring-4 ring-primary/20">
                <Mic2 size={36} className="text-primary" />
              </div>
            </div>
            
            <h1 className="text-5xl font-black mb-2 tracking-tight">
              DESFRAGMENTADO
            </h1>
            <p className="text-xl font-semibold text-primary mb-3">
              El MC Legendario
            </p>
            <div className="flex justify-center gap-2 text-sm text-muted mb-4 flex-wrap">
              <span className="px-3 py-1 bg-primary/10 rounded-full">Rap</span>
              <span className="px-3 py-1 bg-secondary/10 rounded-full">Hip Hop</span>
              <span className="px-3 py-1 bg-accent/10 rounded-full">Storytelling</span>
              <span className="px-3 py-1 bg-primary/5 rounded-full">Música Independiente</span>
            </div>
            
            <blockquote className="text-lg italic text-muted mb-6 max-w-2xl mx-auto border-l-4 border-primary pl-4">
              "No sigo tendencias. Las convierto en ruinas."
            </blockquote>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://open.spotify.com/artist/3o9iSbT2VLRof2zLNQJFNO" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1DB954] text-black font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#1DB954]/30"
              >
                <Music size={20} />
                Escuchar en Spotify
                <ExternalLink size={16} />
              </a>
              <a 
                href="https://youtube.com/@desfragmentadoo" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF0000] text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#FF0000]/30"
              >
                <PlayCircle size={20} />
                Ver YouTube
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* ¿QUIÉN ES DESFRAGMENTADO? - Biografía */}
        <section className="glass-card p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Target size={24} className="text-primary" />
            </div>
            <h2 className="text-2xl font-black">¿Quién es DESFRAGMENTADO?</h2>
          </div>
          
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              <span className="text-primary font-bold">DESFRAGMENTADO</span> es un artista independiente mexicano que transforma experiencias reales en historias cargadas de intensidad, crítica y emociones profundas.
            </p>
            <p>
              Su propuesta combina <span className="font-semibold">rap, hip hop y narrativa cinematográfica</span> para construir canciones que no buscan seguir modas, sino dejar una marca imborrable en la escena musical.
            </p>
            <p>
              Cada lanzamiento representa una nueva etapa de un universo musical donde la identidad, el conflicto y la evolución artística son el centro de todo.
            </p>
          </div>
        </section>

        {/* TRAYECTORIA ARTÍSTICA */}
        <section className="glass-card p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
              <Award size={24} className="text-secondary" />
            </div>
            <h2 className="text-2xl font-black">Trayectoria Artística</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-primary/5 rounded-xl text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Music2 size={20} className="text-primary" />
              </div>
              <h3 className="font-bold text-sm">Música Original</h3>
              <p className="text-xs text-muted mt-1">Canciones que narran historias reales</p>
            </div>
            <div className="p-4 bg-secondary/5 rounded-xl text-center">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-2">
                <TrendingUp size={20} className="text-secondary" />
              </div>
              <h3 className="font-bold text-sm">En Evolución</h3>
              <p className="text-xs text-muted mt-1">Nuevos sonidos y colaboraciones</p>
            </div>
            <div className="p-4 bg-accent/5 rounded-xl text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-2">
                <Sparkles size={20} className="text-accent" />
              </div>
              <h3 className="font-bold text-sm">Impacto Cultural</h3>
              <p className="text-xs text-muted mt-1">Dejando huella en el rap independiente</p>
            </div>
          </div>
        </section>

        {/* NOTICIAS */}
        <section className="glass-card p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Newspaper size={24} className="text-accent" />
            </div>
            <h2 className="text-2xl font-black">Últimas Noticias</h2>
          </div>
          
          <ul className="space-y-4">
            <li className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <span className="text-2xl">📰</span>
              <div>
                <h3 className="font-bold">Nuevo sencillo disponible</h3>
                <p className="text-sm text-muted">Ya está disponible en todas las plataformas digitales.</p>
              </div>
            </li>
            <li className="flex items-start gap-4 p-4 bg-secondary/5 rounded-xl border border-secondary/10">
              <span className="text-2xl">🎤</span>
              <div>
                <h3 className="font-bold">Próximos lanzamientos en producción</h3>
                <p className="text-sm text-muted">Nuevas canciones que verán la luz muy pronto.</p>
              </div>
            </li>
            <li className="flex items-start gap-4 p-4 bg-accent/5 rounded-xl border border-accent/10">
              <span className="text-2xl">🎬</span>
              <div>
                <h3 className="font-bold">Nuevos videoclips en desarrollo</h3>
                <p className="text-sm text-muted">Contenido visual que complementa la música.</p>
              </div>
            </li>
            <li className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <span className="text-2xl">🔥</span>
              <div>
                <h3 className="font-bold">Próximamente colaboraciones nacionales</h3>
                <p className="text-sm text-muted">Alianzas con otros artistas del género.</p>
              </div>
            </li>
          </ul>
        </section>

        {/* ESCUCHA MI MÚSICA */}
        <section className="glass-card p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <PlayCircle size={24} className="text-primary" />
            </div>
            <h2 className="text-2xl font-black">Escucha mi música</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <a 
              href="https://open.spotify.com/artist/3o9iSbT2VLRof2zLNQJFNO" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-[#1DB954]/10 rounded-xl hover:bg-[#1DB954]/20 transition-all duration-300 border border-[#1DB954]/20"
            >
              <div className="flex items-center gap-3">
                <Music size={24} className="text-[#1DB954]" />
                <span className="font-semibold">Spotify</span>
              </div>
              <ArrowRight size={20} className="text-[#1DB954]" />
            </a>
            
            <a 
              href="https://youtube.com/@desfragmentadoo" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-[#FF0000]/10 rounded-xl hover:bg-[#FF0000]/20 transition-all duration-300 border border-[#FF0000]/20"
            >
              <div className="flex items-center gap-3">
                <PlayCircle size={24} className="text-[#FF0000]" />
                <span className="font-semibold">YouTube</span>
              </div>
              <ArrowRight size={20} className="text-[#FF0000]" />
            </a>
            
            <a 
              href="https://www.tiktok.com/@desfragmentado" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-black/10 rounded-xl hover:bg-black/20 transition-all duration-300 border border-black/20"
            >
              <div className="flex items-center gap-3">
                <Radio size={24} className="text-black" />
                <span className="font-semibold">TikTok</span>
              </div>
              <ArrowRight size={20} className="text-muted" />
            </a>
            
            <a 
              href="https://www.instagram.com/desfragmentado_el_mc_legendari" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-[#E4405F]/10 rounded-xl hover:bg-[#E4405F]/20 transition-all duration-300 border border-[#E4405F]/20"
            >
              <div className="flex items-center gap-3">
                <Globe size={24} className="text-[#E4405F]" />
                <span className="font-semibold">Instagram</span>
              </div>
              <ArrowRight size={20} className="text-[#E4405F]" />
            </a>
          </div>
        </section>

        {/* REDES SOCIALES */}
        <section className="glass-card p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
              <Heart size={24} className="text-secondary" />
            </div>
            <h2 className="text-2xl font-black">Redes Sociales</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <a 
              href="https://www.instagram.com/desfragmentado_el_mc_legendari" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 justify-center p-3 bg-[#E4405F]/10 rounded-xl hover:bg-[#E4405F]/20 transition-all duration-300 border border-[#E4405F]/20"
            >
              <Globe size={18} className="text-[#E4405F]" />
              <span className="text-sm font-medium">Instagram</span>
            </a>
            
            <a 
              href="https://www.facebook.com/share/1bsG3QuVDs/" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 justify-center p-3 bg-[#1877F2]/10 rounded-xl hover:bg-[#1877F2]/20 transition-all duration-300 border border-[#1877F2]/20"
            >
              <Users size={18} className="text-[#1877F2]" />
              <span className="text-sm font-medium">Facebook</span>
            </a>
            
            <a 
              href="https://www.tiktok.com/@desfragmentado" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 justify-center p-3 bg-black/10 rounded-xl hover:bg-black/20 transition-all duration-300 border border-black/20"
            >
              <Radio size={18} className="text-black" />
              <span className="text-sm font-medium">TikTok</span>
            </a>
            
            <a 
              href="https://open.spotify.com/artist/3o9iSbT2VLRof2zLNQJFNO" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 justify-center p-3 bg-[#1DB954]/10 rounded-xl hover:bg-[#1DB954]/20 transition-all duration-300 border border-[#1DB954]/20"
            >
              <Music size={18} className="text-[#1DB954]" />
              <span className="text-sm font-medium">Spotify</span>
            </a>
            
            <a 
              href="https://youtube.com/@desfragmentadoo" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 justify-center p-3 bg-[#FF0000]/10 rounded-xl hover:bg-[#FF0000]/20 transition-all duration-300 border border-[#FF0000]/20"
            >
              <PlayCircle size={18} className="text-[#FF0000]" />
              <span className="text-sm font-medium">YouTube</span>
            </a>
          </div>
        </section>

        {/* COLABORACIONES */}
        <section className="glass-card p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Handshake size={24} className="text-primary" />
            </div>
            <h2 className="text-2xl font-black">Colaboraciones</h2>
          </div>
          
          <p className="text-muted mb-4">
            Estoy abierto a colaborar con profesionales apasionados por la música y el arte:
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-3 bg-primary/5 rounded-xl text-center">
              <span className="text-sm font-medium">🎹 Productores</span>
            </div>
            <div className="p-3 bg-secondary/5 rounded-xl text-center">
              <span className="text-sm font-medium">🎧 Beatmakers</span>
            </div>
            <div className="p-3 bg-accent/5 rounded-xl text-center">
              <span className="text-sm font-medium">🎤 Raperos</span>
            </div>
            <div className="p-3 bg-primary/5 rounded-xl text-center">
              <span className="text-sm font-medium">🎬 Videógrafos</span>
            </div>
            <div className="p-3 bg-secondary/5 rounded-xl text-center">
              <span className="text-sm font-medium">📸 Fotógrafos</span>
            </div>
            <div className="p-3 bg-accent/5 rounded-xl text-center">
              <span className="text-sm font-medium">🎨 Diseñadores</span>
            </div>
          </div>
          
          <p className="text-sm text-muted mt-4 italic">
            Si tienes un proyecto serio, podemos trabajar juntos.
          </p>
        </section>

        {/* PUBLICIDAD Y PATROCINIOS */}
        <section className="glass-card p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Megaphone size={24} className="text-accent" />
            </div>
            <h2 className="text-2xl font-black">Publicidad y Patrocinios</h2>
          </div>
          
          <p className="text-muted mb-4">
            ¿Quieres anunciar tu marca dentro del contenido de DESFRAGMENTADO?
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-3 bg-primary/5 rounded-xl text-center border border-primary/10">
              <span className="text-sm font-medium">🎵 Música</span>
            </div>
            <div className="p-3 bg-secondary/5 rounded-xl text-center border border-secondary/10">
              <span className="text-sm font-medium">👕 Moda Urbana</span>
            </div>
            <div className="p-3 bg-accent/5 rounded-xl text-center border border-accent/10">
              <span className="text-sm font-medium">💻 Tecnología</span>
            </div>
            <div className="p-3 bg-primary/5 rounded-xl text-center border border-primary/10">
              <span className="text-sm font-medium">🎪 Eventos</span>
            </div>
            <div className="p-3 bg-secondary/5 rounded-xl text-center border border-secondary/10">
              <span className="text-sm font-medium">🎤 Cultura Hip Hop</span>
            </div>
            <div className="p-3 bg-accent/5 rounded-xl text-center border border-accent/10">
              <span className="text-sm font-medium">📱 Redes Sociales</span>
            </div>
          </div>
        </section>

        {/* CONTRATACIONES */}
        <section className="glass-card p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Mail size={24} className="text-primary" />
            </div>
            <h2 className="text-2xl font-black">Contrataciones</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-primary/5 rounded-xl">
              <h3 className="font-bold mb-2">📅 Presentaciones</h3>
              <p className="text-sm text-muted">Eventos, festivales y conciertos</p>
            </div>
            <div className="p-4 bg-secondary/5 rounded-xl">
              <h3 className="font-bold mb-2">🎙️ Entrevistas</h3>
              <p className="text-sm text-muted">Podcasts, medios y contenido</p>
            </div>
            <div className="p-4 bg-accent/5 rounded-xl">
              <h3 className="font-bold mb-2">🎯 Contenido Promocional</h3>
              <p className="text-sm text-muted">Campañas y colaboraciones</p>
            </div>
            <div className="p-4 bg-primary/5 rounded-xl">
              <h3 className="font-bold mb-2">🤝 Alianzas</h3>
              <p className="text-sm text-muted">Proyectos conjuntos y sinergias</p>
            </div>
          </div>
          
          <a 
            href="https://wa.me/3345998987" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#25D366]/30 w-full justify-center"
          >
            <MessageCircle size={24} />
            Contrataciones por WhatsApp
            <ExternalLink size={18} />
          </a>
          <p className="text-xs text-muted mt-2 text-center">
            📱 Contacto directo por WhatsApp
          </p>
        </section>

        {/* FRASE FINAL */}
        <section className="glass-card p-8 text-center border border-primary/20">
          <blockquote className="text-2xl font-bold text-primary italic">
            "No vine a ser uno más. <br />
            <span className="text-3xl">Vine a dejar un legado."</span>
          </blockquote>
          <p className="text-muted mt-4 text-sm tracking-widest">
            — DESFRAGMENTADO
          </p>
          
          <div className="mt-6 flex justify-center gap-4 text-xs text-muted">
            <span>© 2026 DESFRAGMENTADO</span>
            <span>•</span>
            <span>Todos los derechos reservados</span>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}