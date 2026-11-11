import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "OSMI | Eventos y boletos",
    template: "%s | OSMI",
  },
  description:
    "Descubre eventos, consulta sus detalles y compra boletos en OSMI.",
  keywords: [
    "boletos",
    "conciertos",
    "deportes",
    "teatro",
    "festivales",
    "ticketing",
    "eventos",
    "osmi",
    "compra de boletos",
    "experiencias",
    "Desfragmentado",
    "Francisco D Zamora",
  ],
  publisher: "OSMI",
  metadataBase: new URL("https://myosmi.com"),
  openGraph: {
    title: "OSMI | Eventos y boletos",
    description:
      "Encuentra tu próxima experiencia en OSMI.",
    type: "website",
    locale: "es_MX",
    siteName: "OSMI",
  },
  twitter: {
    card: "summary",
    title: "OSMI | Eventos y boletos",
    description: "Encuentra tu próxima experiencia en OSMI.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

// ============================================================
// LAYOUT
// ============================================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className="antialiased">
        <main className="min-h-screen relative flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}

