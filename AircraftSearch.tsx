"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { AircraftSpec } from "@/lib/types";

const classes = ["todos", "caza", "bombardero", "transporte", "narrow-body", "wide-body", "privada", "historica"] as const;

export function AircraftSearch({ items }: { items: AircraftSpec[] }) {
  const [query, setQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState<(typeof classes)[number]>("todos");

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesQuery =
        !normalizedQuery ||
        [item.name, item.manufacturer, item.countryOfOrigin, item.countryWithMostOperationalUnits, item.category, item.class]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesClass = selectedClass === "todos" || item.class === selectedClass;
      return matchesQuery && matchesClass;
    });
  }, [items, query, selectedClass]);

  return (
    <section className="space-y-6">
      <div className="luxury-panel rounded-[2rem] p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35" size={20} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por modelo, país, fabricante o clase..."
              className="h-14 w-full rounded-2xl border border-white/10 bg-black/35 pl-12 pr-4 text-white outline-none transition placeholder:text-white/35 focus:border-cyan-200/50 focus:bg-black/45"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {classes.map((aircraftClass) => (
              <button
                key={aircraftClass}
                onClick={() => setSelectedClass(aircraftClass)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  selectedClass === aircraftClass
                    ? "bg-cyan-200 text-slate-950"
                    : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {aircraftClass}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <Link key={item.id} href={`/enciclopedia/${item.slug}`} className="group luxury-panel rounded-[1.8rem] p-6 transition hover:-translate-y-1 hover:border-cyan-200/30">
            <p className="text-xs uppercase tracking-[0.28em] text-amber-100/70">{item.category} · {item.class}</p>
            <h2 className="mt-4 text-2xl font-semibold text-white group-hover:text-cyan-100">{item.name}</h2>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/58">{item.description}</p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <span className="rounded-2xl bg-black/30 p-3 text-white/55">Vel. {item.maxSpeedKmh.toLocaleString("es-AR")} km/h</span>
              <span className="rounded-2xl bg-black/30 p-3 text-white/55">Alc. {item.rangeKm.toLocaleString("es-AR")} km</span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="luxury-panel rounded-[2rem] p-10 text-center text-white/55">No hay aviones que coincidan con tu búsqueda.</div>
      )}
    </section>
  );
}
