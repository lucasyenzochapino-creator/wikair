import Link from "next/link";
import { ArrowRight, Database, Radar, ScrollText } from "lucide-react";
import { aircraft } from "@/lib/aircraft";

const cards = [
  {
    href: "/enciclopedia",
    title: "Enciclopedia",
    description: "Explora aviones militares, comerciales, privados e históricos con fichas técnicas completas.",
    icon: Database
  },
  {
    href: "/radar",
    title: "Radar en Vivo",
    description: "Visualiza tráfico aéreo actual con iframe responsivo y una consulta opcional a OpenSky.",
    icon: Radar
  },
  {
    href: "/historia",
    title: "Historia",
    description: "Recorre la línea de tiempo desde los Wright hasta la era espacial y la aviación moderna.",
    icon: ScrollText
  }
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="luxury-panel relative overflow-hidden rounded-[2.5rem] p-8 sm:p-12 lg:p-16">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-amber-200/10 blur-3xl" />
        <div className="relative max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.42em] text-amber-100/80">Dark Luxury Aviation PWA</p>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            WikiAir, la enciclopedia total de aviación.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
            Una base premium para construir una PWA de aviación con Next.js, Tailwind CSS, TypeScript, Firebase y radar en vivo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/enciclopedia" className="inline-flex items-center gap-2 rounded-full bg-cyan-200 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-100">
              Explorar aviones <ArrowRight size={18} />
            </Link>
            <Link href="/radar" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white/80 transition hover:bg-white/10">
              Abrir radar
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.href} href={card.href} className="luxury-panel group rounded-[2rem] p-6 transition hover:-translate-y-1 hover:border-cyan-200/35">
              <div className="mb-6 inline-flex rounded-2xl border border-cyan-200/25 bg-cyan-200/10 p-3 text-cyan-100">
                <Icon size={24} />
              </div>
              <h2 className="text-2xl font-semibold text-white">{card.title}</h2>
              <p className="mt-3 leading-7 text-white/58">{card.description}</p>
            </Link>
          );
        })}
      </section>

      <section className="luxury-panel rounded-[2rem] p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-white/40">Base inicial</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">{aircraft.length} aviones listos para Firestore</h2>
        <p className="mt-3 text-white/58">Incluye F-22 Raptor, Airbus A380, Boeing 747, Supermarine Spitfire y Cessna 172 Skyhawk.</p>
      </section>
    </div>
  );
}
