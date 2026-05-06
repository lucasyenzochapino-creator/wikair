"use client";

import { useMemo, useState } from "react";
import { aircraft, useGroups } from "@/lib/aircraft";
import WikiImage from "@/components/WikiImage";

export default function AircraftExplorer() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<(typeof useGroups)[number]>("Todos");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return aircraft.filter((item) => {
      const matchesGroup = group === "Todos" || item.use === group;
      const haystack = `${item.name} ${item.manufacturer} ${item.country} ${item.use} ${item.category} ${item.era}`.toLowerCase();
      return matchesGroup && (!q || haystack.includes(q));
    });
  }, [query, group]);

  return (
    <section className="container catalogSection">
      <div className="toolbar">
        <div className="searchBox">
          <label>Buscar avión, país, fabricante o uso</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ej: F-22, Airbus, Argentina, caza, carga..."
          />
        </div>

        <div className="filterChips" aria-label="Filtros por uso">
          {useGroups.map((item) => (
            <button
              key={item}
              className={group === item ? "chip active" : "chip"}
              onClick={() => setGroup(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="resultInfo">
        <strong>{filtered.length}</strong> aeronaves visibles · Base inicial ampliable
      </div>

      <div className="aircraftGrid">
        {filtered.map((item) => (
          <article className="aircraftCard" key={item.slug}>
            <a href={`/avion/${item.slug}`} className="imageLink" aria-label={`Ver ficha de ${item.name}`}>
              <WikiImage title={item.wikiTitle} alt={item.name} className="aircraftImage" />
            </a>

            <div className="aircraftContent">
              <div className="cardTopline">
                <span>{item.use}</span>
                <span>{item.firstFlight}</span>
              </div>

              <h2>{item.name}</h2>
              <p className="muted">{item.category}</p>

              <div className="miniSpecs">
                <span>País: {item.country}</span>
                <span>Fabricante: {item.manufacturer}</span>
                <span>Velocidad: {item.maxSpeed}</span>
                <span>Alcance: {item.range}</span>
              </div>

              <p className="summary">{item.summary}</p>

              <a className="detailsButton" href={`/avion/${item.slug}`}>Ver ficha técnica</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
