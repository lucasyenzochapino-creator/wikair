import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WikiAir",
  description: "Enciclopedia premium de aviación con fichas técnicas y radar en vivo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0, background: "#050505" }}>
        {children}
      </body>
    </html>
  );
}
