import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WikiAir",
  description: "Enciclopedia visual de aviación con imágenes reales, fichas técnicas y radar en vivo.",
  manifest: "/manifest.json",
  themeColor: "#050505",
  viewport: "width=device-width, initial-scale=1"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
