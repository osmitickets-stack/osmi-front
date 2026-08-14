import { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { 
  Newspaper, 
  Mail, 
  Download, 
  FileText, 
  Users, 
  Calendar,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Globe,
  MessageCircle,
  ExternalLink,
  FileImage,
  Video,
  Award,
  Star
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Prensa - osmi",
  description: "Recursos de prensa, kit de medios y contacto para periodistas y medios de comunicación sobre osmi.",
  keywords: "prensa, osmi, kit de prensa, medios, comunicación, recursos, periodistas",
};

export default function PrensaPage() {
  const pressReleases = [
    {
      title: "osmi revoluciona el ticketing digital en Latinoamérica",
      date: "15 de agosto, 2026",
      excerpt: "La plataforma de boletos más inteligente del planeta llega a México con tecnología blockchain y pagos seguros.",
      category: "Lanzamiento",
      icon: Sparkles,
    },
    {
      title: "osmi anuncia colaboración con Desfragmentado",
      date: "8 de agosto, 2026",
      excerpt: "El MC Legendario se une a osmi para ofrecer experiencias exclusivas de colaboración musical.",
      category: "Colaboración",
      icon: Users,
    },
    {
      title: "osmi supera los 25,000 eventos realizados en su primer año",
      date: "1 de agosto, 2026",
      excerpt: "La plataforma consolida su posición como líder en ticketing digital con cifras récord.",
      category: "Logro",
      icon: Award,
    },
  ];

  const mediaResources = [
    {
      icon: FileImage,
      title: "Logotipos y marcas",
      description: "Descarga los logotipos oficiales de osmi en alta resolución",
      color: "text-primary",
      bg: "bg-primary/10",
      href: "/downloads/logos.zip",
    },
    {
      icon: Video,
      title: "Videos promocionales",
      description: "Material audiovisual para uso en medios y presentaciones",
      color: "text-secondary",
      bg: "bg-secondary/10",
      href: "/downloads/videos.zip",
    },
    {
      icon: FileText,
      title: "Documentación oficial",
      description: "Fichas técnicas, casos de éxito y documentos informativos",
      color: "text-accent",
      bg: "bg-accent/10",
      href: "/downloads/docs.zip",
    },
  ];

  const mediaContacts = [
    {
      name: "Prensa y comunicaciones",
      email: "prensa@osmi.app",
      phone: "+52 33 1234 5678",
      icon: Mail,
      description: "Consultas generales de prensa",
    },
    {
      name: "Relaciones públicas",
      email: "rp@osmi.app",
      phone: "+52 33 1234 5679",
      icon: Users,
      description: "Eventos y colaboraciones",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 w-full">
        
        {/* ==================== HEADER ==================== */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
            <Newspaper size={32} className="text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-3">
            Centro de <span className="text-gradient">Prensa</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-muted">
            <span className="flex items-center gap-1">
              <Sparkles size={14} className="text-primary" />
              Recursos para medios
            </span>
          </div>
          <p className="text-muted max-w-2xl mx-auto mt-4">
            Bienvenido al centro de prensa de osmi. Aquí encontrarás toda la información y recursos que necesitas para cubrir nuestras noticias.
          </p>
        </div>

        {/* ==================== CONTACTO DE PRENSA ==================== */}
        <div className="glass-card p-6 sm:p-8 mb-8 border border-white/5">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Mail size={20} className="text-secondary" />
            Contacto de prensa
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {mediaContacts.map((contact, index) => (
              <div key={index} className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:border-primary/20 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <contact.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{contact.name}</h3>
                    <p className="text-xs text-muted-dark">{contact.description}</p>
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <p className="text-muted flex items-center gap-1">
                    <Mail size={12} className="text-secondary" />
                    <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors">
                      {contact.email}
                    </a>
                  </p>
                  <p className="text-muted flex items-center gap-1">
                    <MessageCircle size={12} className="text-secondary" />
                    <a href={`tel:${contact.phone}`} className="hover:text-primary transition-colors">
                      {contact.phone}
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== COMUNICADOS DE PRENSA ==================== */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <FileText size={22} className="text-primary" />
            Comunicados de prensa
          </h2>

          <div className="space-y-4">
            {pressReleases.map((release, index) => (
              <div
                key={index}
                className="glass-card p-6 border border-white/5 hover:border-primary/20 transition-all duration-300 hover:glow-primary"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <release.icon size={18} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {release.category}
                      </span>
                      <span className="text-xs text-muted-dark">{release.date}</span>
                    </div>
                    <h3 className="font-bold text-foreground text-lg">{release.title}</h3>
                    <p className="text-sm text-muted mt-1">{release.excerpt}</p>
                    <button className="mt-3 text-sm text-primary hover:text-secondary transition-colors flex items-center gap-1">
                      Leer más
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== KIT DE PRENSA ==================== */}
        <div className="glass-card p-6 sm:p-8 mb-8 border border-white/5">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Download size={20} className="text-accent" />
            Kit de prensa
          </h2>
          <p className="text-muted mb-6">
            Descarga nuestros recursos oficiales para usar en tus publicaciones y coberturas.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {mediaResources.map((resource, index) => (
              <a
                key={index}
                href={resource.href}
                className="bg-white/5 rounded-2xl p-4 text-center border border-white/5 hover:border-primary/20 transition-all duration-300 hover:glow-primary group"
              >
                <div className={`w-12 h-12 rounded-full ${resource.bg} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <resource.icon size={20} className={resource.color} />
                </div>
                <h3 className="font-semibold text-foreground text-sm">{resource.title}</h3>
                <p className="text-xs text-muted-dark mt-1">{resource.description}</p>
                <span className="inline-flex items-center gap-1 text-xs text-primary mt-3 group-hover:text-secondary transition-colors">
                  Descargar
                  <Download size={12} />
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* ==================== PRESENCIA EN MEDIOS ==================== */}
        <div className="glass-card p-6 sm:p-8 mb-8 border border-white/5">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Globe size={20} className="text-secondary" />
            Presencia en medios
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5 hover:border-primary/20 transition-all">
              <span className="text-2xl font-black text-gradient">Forbes</span>
              <p className="text-xs text-muted-dark mt-1">"Revolución digital"</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5 hover:border-primary/20 transition-all">
              <span className="text-2xl font-black text-gradient">TechCrunch</span>
              <p className="text-xs text-muted-dark mt-1">"Innovación en ticketing"</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5 hover:border-primary/20 transition-all">
              <span className="text-2xl font-black text-gradient">El País</span>
              <p className="text-xs text-muted-dark mt-1">"El futuro de los eventos"</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5 hover:border-primary/20 transition-all">
              <span className="text-2xl font-black text-gradient">Billboard</span>
              <p className="text-xs text-muted-dark mt-1">"Música y tecnología"</p>
            </div>
          </div>
        </div>

        {/* ==================== PREGUNTAS FRECUENTES ==================== */}
        <div className="glass-card p-6 sm:p-8 mb-8 border border-white/5">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <CheckCircle size={20} className="text-success" />
            Preguntas frecuentes para prensa
          </h2>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-2xl p-4">
              <h3 className="font-semibold text-foreground text-sm">¿Cómo puedo solicitar una entrevista?</h3>
              <p className="text-sm text-muted mt-1">Escríbenos a prensa@osmi.app con tu propuesta y coordinarémos una sesión.</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4">
              <h3 className="font-semibold text-foreground text-sm">¿Puedo usar el logo de osmi en mi publicación?</h3>
              <p className="text-sm text-muted mt-1">Sí, descarga nuestro kit de prensa que incluye todos los recursos oficiales.</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4">
              <h3 className="font-semibold text-foreground text-sm">¿Dónde puedo encontrar más información?</h3>
              <p className="text-sm text-muted mt-1">Visita nuestra página de recursos o contáctanos directamente.</p>
            </div>
          </div>
        </div>

        {/* ==================== ENLACES RELACIONADOS ==================== */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/sobre-nosotros"
            className="glass-card p-5 border border-white/5 hover:border-primary/20 transition-all duration-300 flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Users size={14} className="text-primary" />
              </div>
              <span className="text-sm font-semibold text-foreground">Sobre osmi</span>
            </div>
            <ChevronRight size={16} className="text-muted-dark group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>
          <Link
            href="/contacto"
            className="glass-card p-5 border border-white/5 hover:border-primary/20 transition-all duration-300 flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                <MessageCircle size={14} className="text-secondary" />
              </div>
              <span className="text-sm font-semibold text-foreground">Contacto general</span>
            </div>
            <ChevronRight size={16} className="text-muted-dark group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* ==================== FOOTER DE PÁGINA ==================== */}
        <div className="mt-8 text-center text-xs text-muted-dark border-t border-white/5 pt-6">
          <p>© 2026 osmi. Todos los derechos reservados.</p>
          <p className="mt-1">
            Recursos actualizados: <span className="text-muted">agosto 2026</span>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}