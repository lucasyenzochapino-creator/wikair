import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "WikiAir – Enciclopedia de Aviación",
  description: "Más de 500 aeronaves con fichas técnicas completas. Militares, comerciales, históricas, helicópteros, dirigibles y más. Radar en vivo, récords extremos y quiz interactivo.",
  manifest: "/manifest.json",
  applicationName: "WikiAir",
  appleWebApp: {
    capable: true,
    title: "WikiAir",
    statusBarStyle: "black-translucent"
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }]
  }
};

export const viewport: Viewport = {
  themeColor: "#020c1b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <nav className="mainNav">
          <div className="navInner">
            <Link className="navLogo" href="/">WikiAir</Link>
            <div className="navLinks">
              <Link href="/vuelo">Cómo vuela</Link>
              <Link href="/instrumentos">Instrumentos</Link>
              <Link href="/glosario">Glosario</Link>
              <Link href="/licencias">Licencias</Link>
              <Link href="/enciclopedia">Enciclopedia</Link>
              <Link href="/records">Récords</Link>
              <Link href="/radar">Radar</Link>
              <Link href="/quiz">Quiz</Link>
              <Link href="/historia">Historia</Link>
            </div>
          </div>
        </nav>
        {children}
        <Footer />
        <Script id="sw-register" strategy="afterInteractive">{`
          if ('serviceWorker' in navigator) {
            var base = (window.__NEXT_DATA__ && window.__NEXT_DATA__.basePath) || '';
            navigator.serviceWorker.register(base + '/sw.js');
          }
        `}</Script>
      </body>
    </html>
  );
}
