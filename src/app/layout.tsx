import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Mejora el rendimiento de carga
});

// ============================================================
// METADATA CON SEO PREMIUM
// ============================================================
export const metadata: Metadata = {
  title: {
    default: "osmi — Boletos para conciertos, deportes y eventos",
    template: "%s | osmi",
  },
  description:
    "Compra boletos para conciertos, deportes, teatro y festivales. osmi es la plataforma de ticketing más inteligente con entrega inmediata y soporte 24/7.",
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
  authors: [{ name: "Francisco D Zamora", url: "https://osmi.app" }],
  creator: "Francisco D Zamora",
  publisher: "osmi by Francisco D Zamora",
  metadataBase: new URL("https://osmi.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "osmi — Boletos para conciertos, deportes y eventos",
    description:
      "Compra boletos seguros para los mejores eventos. Entrega inmediata y soporte 24/7.",
    type: "website",
    locale: "es_MX",
    siteName: "osmi",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "osmi - Boletos para eventos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "osmi — Boletos para conciertos, deportes y eventos",
    description: "Compra boletos seguros para los mejores eventos.",
    images: ["/og-image.png"],
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
  verification: {
    google: "tu-codigo-de-verificacion-google", // Reemplaza con tu código
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
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
      <body className={`${inter.variable} antialiased`}>
        <main className="min-h-screen relative flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}