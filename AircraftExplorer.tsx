"use client";

import { useMemo, useState } from "react";
import { aircraft, useGroups, useOrder } from "./aircraft";
import WikiImage from "./WikiImage";

export default function AircraftExplorer() {
  const [query, setQuery] = useState("");
  const [selectedUse, setSelectedUse] = useState("Todos");
  const [visible, setVisible] = useState(60);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return aircraft.filter((item) => {
      const matchesUse = selectedUse === "Todos" || item.use === selectedUse;
      const searchable = `${item.name} ${item.manufacturer} ${item.country} ${item.category} ${item.era}`.toLowerCase();
      const matchesSearch = !normalized || searchable.includes(normalized);
      return matchesUse && matchesSearch;
    });
  }, [query, selectedUse]);

  const shown = filtered.slice(0, visible);

  return (
    <section>
      <div className="toolbar">
        <input
          className="search"
          placeholder="Buscar por avión, fabricante, país, uso o categoría..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setVisible(60);
          }}
        />

        <select
          className="select"
          value={selectedUse}
          onChange={(event) => {
            setSelectedUse(event.target.value);
            setVisible(60);
          }}
        >
          <option>Todos</option>
          {useOrder.map((use) => (
            <option key={use}>{use}</option>
          ))}
        </select>
      </div>

      <div className="chips">
        <button className={`chip ${selectedUse === "Todos" ? "active" : ""}`} onClick={() => setSelectedUse("Todos")}>
          Todos · {aircraft.length}
        </button>
        {useGroups.map((group) => (
          <button
            key={group.use}
            className={`chip ${selectedUse === group.use ? "active" : ""}`}
            onClick={() => setSelectedUse(group.use)}
          >
            {group.use} · {group.count}
          </button>
        ))}
      </div>

      <p className="muted">
        Mostrando {shown.length} de {filtered.length} aeronaves. Las imágenes se cargan desde Wikipedia/Wikimedia cuando están disponibles.
      </p>

      <div className="air-grid">
        {shown.map((item) => (
          <a className="card air-card" href={`/avion/${item.slug}`} key={item.slug}>
            <div className="air-thumb">
              <WikiImage title={item.wikiTitle} alt={item.name} className="air-img soft" />
              <span className="image-label">{item.use}</span>
            </div>
            <div className="air-body">
              <span className="badge">{item.category}</span>
              <div className="air-title">{item.name}</div>
              <div className="air-meta">
                {item.manufacturer}<br />
                {item.country} · {item.era}<br />
                Estado: {item.status}
              </div>
            </div>
          </a>
        ))}
      </div>

      {visible < filtered.length && (
        <button className="btn btn-primary load-more" onClick={() => setVisible((value) => value + 60)}>
          Cargar más aviones
        </button>
      )}
    </section>
  );
}
