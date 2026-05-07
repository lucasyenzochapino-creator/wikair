"use client";

import { useEffect, useMemo, useState } from "react";
import { aircraft } from "./data";
import { groups, type AircraftGroup } from "./types";

function ImageFromWiki({ title, name }: { title: string; name: string }) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active || !data) return;
        setSrc(data?.thumbnail?.source || data?.originalimage?.source || null);
      })
      .catch(() => setSrc(null));

    return () => {
      active = false;
    };
  }, [title]);

  return src ? <img src={src} alt={name} /> : <div className="imageFallback">WikiAir</div>;
}

export default function Explorer() {
  const [active, setActive] = useState<AircraftGroup>("Militar");
  const [open, setOpen] = useState<string | null>(null);

  const list = useMemo(() => aircraft.filter((item) => item.group === active), [active]);

  return (
    <>
      <section className="container categoryNav">
        {groups.map((group) => (
          <button
            key={group}
            onClick={() => {
              setActive(group);
              setOpen(null);
            }}
            className={active === group ? "tabActive" : "tabButton"}
          >
            {group}
          </button>
        ))}
      </section>

      <section className="container groupBlock">
        <div className="groupTitle">
          <p className="gold">{list.length} aeronaves cargadas</p>
          <h2>{active}</h2>
        </div>

        <div className="aircraftGrid">
          {list.map((plane) => {
            const isOpen = open === plane.name;
            const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(plane.wiki).replaceAll("%20", "_")}`;
            const commonsUrl = `https://commons.wikimedia.org/w/index.php?search=${encodeURIComponent(plane.wiki + " cockpit interior aircraft")}&title=Special:MediaSearch&type=image`;

            return (
              <article className="aircraftCard" key={plane.name}>
                <div className="imageBox">
                  <ImageFromWiki title={plane.wiki} name={plane.name} />
                </div>

                <div className="aircraftBody">
                  <span className="pill">{plane.role}</span>
                  <h3>{plane.name}</h3>
                  <p>{plane.maker} · {plane.origin}</p>

                  <div className="specList">
                    <span>Motor: {plane.engine}</span>
                    <span>Capacidad: {plane.capacity}</span>
                    <span>Licencia: {plane.license}</span>
                  </div>

                  <button className="detailButton" onClick={() => setOpen(isOpen ? null : plane.name)}>
                    {isOpen ? "Cerrar ficha" : "Ver ficha completa"}
                  </button>

                  {isOpen && (
                    <div className="detailPanel">
                      <h4>Ficha completa</h4>
                      <p><b>Primer vuelo:</b> {plane.firstFlight}</p>
                      <p><b>Estado:</b> {plane.status}</p>
                      <p><b>Velocidad:</b> {plane.speed}</p>
                      <p><b>Alcance:</b> {plane.range}</p>
                      <p><b>Principales operadores / países:</b> {plane.operators}</p>
                      <p><b>Interior / cabina:</b> {plane.interior}</p>
                      <p><b>Historia / uso:</b> {plane.history}</p>

                      <div className="radarActions">
                        <a className="radarLink" href={wikiUrl} target="_blank" rel="noreferrer">Wikipedia</a>
                        <a className="radarLink" href={commonsUrl} target="_blank" rel="noreferrer">Fotos reales / interior</a>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
