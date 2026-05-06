import Link from "next/link";
import { Plane } from "lucide-react";

const links = [
  { href: "/enciclopedia", label: "Enciclopedia" },
  { href: "/historia", label: "Historia" },
  { href: "/radar", label: "Radar en Vivo" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/55 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 text-cyan-200 shadow-lg shadow-cyan-950/40">
            <Plane size={20} />
          </span>
          <span>
            <span className="block text-lg font-semibold tracking-[0.22em] text-white">WIKIAIR</span>
            <span className="block text-xs uppercase tracking-[0.32em] text-white/45">Aviation Intelligence</span>
          </span>
        </Link>
        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
