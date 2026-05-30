import type { Metadata, Viewport } from "next";
import Link from "next/link";
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
  themeColor: "#07080f",
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <nav className="mainNav">
          <div className="navInner">
            <Link className="navLogo" href="/">WikiAir</Link>
            <div className="navLinks">
              <Link href="/enciclopedia">Enciclopedia</Link>
              <Link href="/historia">Historia</Link>
              <Link href="/radar">Radar</Link>
              <Link href="/records">Récords</Link>
              <Link href="/quiz">Quiz</Link>
            </div>
          </div>
        </nav>
        {children}
        <Footer />
      </body>
    </html>
  );
}
