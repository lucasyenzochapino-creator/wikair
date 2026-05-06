import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WikiAir",
  description: "Enciclopedia visual de aviación con aviones militares, comerciales, privados, históricos, carga, entrenamiento y radar en vivo.",
  manifest: "/manifest.json",
  themeColor: "#050505"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
