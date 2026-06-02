import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Konex 360 | Conectando culturas, construyendo comunidad",
  description:
    "Noticias, recursos de integracion, eventos y campanas sociales para inmigrantes y comunidades inclusivas en Alemania.",
  applicationName: "Konex 360",
  manifest: "/manifest.webmanifest",
  keywords: [
    "Konex 360",
    "inmigrantes Alemania",
    "Leipzig",
    "integracion",
    "accesibilidad",
    "noticias",
    "LOTSE"
  ],
  openGraph: {
    title: "Konex 360",
    description:
      "Una plataforma multilingue para noticias locales, integracion y campanas de inclusion en Alemania.",
    type: "website",
    locale: "es_ES",
    images: ["/konex360-hero.png"]
  }
};

export const viewport: Viewport = {
  themeColor: "#0B3C5D",
  colorScheme: "light"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
