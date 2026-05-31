"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const LINKS = [
  { href: "/vuelo",        label: "Cómo vuela",   d: "M12 19V5M5 12l7-7 7 7" },
  { href: "/instrumentos", label: "Instrumentos",  d: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 0v10m0 0l4-4m-4 4l-4-4" },
  { href: "/glosario",     label: "Glosario",      d: "M4 6h16M4 10h16M4 14h8" },
  { href: "/licencias",    label: "Licencias",     d: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
  { href: "/enciclopedia", label: "Enciclopedia",  d: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
  { href: "/records",      label: "Récords",       d: "M5 3l14 9-14 9V3z" },
  { href: "/radar",        label: "Radar",         d: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" },
  { href: "/quiz",         label: "Quiz",          d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m1.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
  { href: "/historia",     label: "Historia",      d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
];

function NavIcon({ d }: { d: string }) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d={d} />
    </svg>
  );
}

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        className="hamburger"
        onClick={() => setOpen(v => !v)}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
      >
        <span className={`hamburgerLine${open ? " open" : ""}`} />
        <span className={`hamburgerLine${open ? " open" : ""}`} />
        <span className={`hamburgerLine${open ? " open" : ""}`} />
      </button>

      {open && (
        <div className="mobileMenuOverlay" onClick={() => setOpen(false)}>
          <nav className="mobileMenu" onClick={e => e.stopPropagation()}>
            <div className="mobileMenuHeader">
              <span className="mobileMenuLogo">WikiAir</span>
              <button className="mobileMenuClose" onClick={() => setOpen(false)} aria-label="Cerrar">
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ul className="mobileMenuList">
              {LINKS.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="mobileMenuLink" onClick={() => setOpen(false)}>
                    <NavIcon d={l.d} />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
