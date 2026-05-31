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
  themeColor: "#0C0C0C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

function NavIcon({ d, size = 14 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d={d} />
    </svg>
  );
}

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
              <Link href="/vuelo"><NavIcon d="M12 19V5M5 12l7-7 7 7" />Cómo vuela</Link>
              <Link href="/instrumentos"><NavIcon d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0v10m0 0l4-4m-4 4l-4-4" />Instrumentos</Link>
              <Link href="/glosario"><NavIcon d="M4 6h16M4 10h16M4 14h8" />Glosario</Link>
              <Link href="/licencias"><NavIcon d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />Licencias</Link>
              <Link href="/enciclopedia"><NavIcon d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />Enciclopedia</Link>
              <Link href="/records"><NavIcon d="M5 3l14 9-14 9V3z" />Récords</Link>
              <Link href="/radar"><NavIcon d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />Radar</Link>
              <Link href="/quiz"><NavIcon d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m1.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />Quiz</Link>
              <Link href="/historia"><NavIcon d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />Historia</Link>
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
