import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WikiAir",
  description: "Enciclopedia premium de aviación con fichas técnicas y radar en vivo.",
  manifest: "/manifest.json"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
