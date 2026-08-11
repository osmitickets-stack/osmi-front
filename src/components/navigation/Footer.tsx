import Link from "next/link";
import { 
  Instagram, 
  Music, 
  MessageCircle,
  Globe,
  Share2
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-background-secondary/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Grid principal */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          
          {/* ==================== MARCA ==================== */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="text-2xl font-black text-gradient tracking-tight">
              osmi
            </Link>
            <p className="text-sm text-muted-dark leading-relaxed max-w-xs">
              La experiencia de boletos más inteligente del planeta. Seguro, rápido y confiable.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-muted-dark hover:text-primary hover:bg-white/10 transition-all"
              >
                <Instagram size={16} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-muted-dark hover:text-primary hover:bg-white/10 transition-all"
              >
                {/* Icono de X (Twitter) como SVG inline */}
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-muted-dark hover:text-primary hover:bg-white/10 transition-all"
              >
                {/* Icono de YouTube como SVG inline */}
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a 
                href="https://open.spotify.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-muted-dark hover:text-primary hover:bg-white/10 transition-all"
              >
                <Music size={16} />
              </a>
            </div>
          </div>

          {/* ==================== EXPLORAR ==================== */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">Explorar</h4>
            <ul className="space-y-2.5">
              <li><Link href="/events" className="text-sm text-muted-dark hover:text-foreground transition-colors">Conciertos</Link></li>
              <li><Link href="/events" className="text-sm text-muted-dark hover:text-foreground transition-colors">Deportes</Link></li>
              <li><Link href="/events" className="text-sm text-muted-dark hover:text-foreground transition-colors">Teatro</Link></li>
              <li><Link href="/events" className="text-sm text-muted-dark hover:text-foreground transition-colors">Festivales</Link></li>
              <li><Link href="/events" className="text-sm text-muted-dark hover:text-foreground transition-colors">Experiencias</Link></li>
            </ul>
          </div>

          {/* ==================== OSMI ==================== */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">osmi</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/sobre-nosotros" className="text-sm text-muted-dark hover:text-foreground transition-colors">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/para-organizadores" className="text-sm text-muted-dark hover:text-foreground transition-colors">
                  Para organizadores
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/523345998987?text=Hola%20osmi%20quiero%20informacion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-dark hover:text-foreground transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle size={14} className="text-[#25D366]" />
                  Contacto
                </a>
              </li>
              <li>
                <Link href="/prensa" className="text-sm text-muted-dark hover:text-foreground transition-colors">
                  Prensa
                </Link>
              </li>
              <li>
                <Link href="/desfragmentado" className="text-sm text-muted-dark hover:text-foreground transition-colors">
                  Desfragmentado
                </Link>
              </li>
              <li>
                <Link href="/Manitas" className="text-sm text-muted-dark hover:text-foreground transition-colors">
                  Taller Manitas
                </Link>
              </li>
            </ul>
          </div>

          {/* ==================== LEGAL ==================== */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="/docs/privacidad.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-dark hover:text-foreground transition-colors"
                >
                  Privacidad
                </a>
              </li>
              <li>
                <a
                  href="/docs/terminos.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-dark hover:text-foreground transition-colors"
                >
                  Términos y condiciones
                </a>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-muted-dark hover:text-foreground transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ==================== BOTTOM ==================== */}
        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-dark">
          <p>© 2026 osmi. Todos los derechos reservados.</p>
          <p>
            Creado por <span className="text-gradient font-semibold">Francisco D. Zamora</span>
          </p>
        </div>
      </div>
    </footer>
  );
};