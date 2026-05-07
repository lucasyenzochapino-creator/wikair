"use client";

import { useEffect, useMemo, useState } from "react";
import { aircraft } from "./data";
import { extraAircraft } from "./extraData";
import { specialAviation } from "./specialAviation";
import { groups, type AircraftGroup } from "./types";

const allAircraft = [...aircraft, ...extraAircraft, ...specialAviation];

type WikiImage = { url: string; title: string };

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

    return () => { active = false; };
  }, [title]);

  return src ? <img src={src} alt={name} /> : <div className="imageFallback">WikiAir</div>;
}

function GalleryFromCommons({ query }: { query: string }) {
  const [images, setImages] = useState<WikiImage[]>([]);

  useEffect(() => {
    let active = true;
    const searches = [`${query} aircraft`, `${query} cockpit`, `${query} interior`, `${query} aviation`];

    Promise.all(searches.map((text) => {
      const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(text)}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url&iiurlwidth=900&format=json&origin=*`;
      return fetch(url).then((res) => (res.ok ? res.json() : null)).catch(() => null);
    })).then((results) => {
      if (!active) return;
      const found = results
        .flatMap((data) => Object.values(data?.query?.pages || {}) as any[])
        .map((page: any) => ({ title: page.title?.replace("File:", "") || "Imagen", url: page.imageinfo?.[0]?.thumburl || page.imageinfo?.[0]?.url }))
        .filter((item: WikiImage) => Boolean(item.url));
      const unique = Array.from(new Map(found.map((item) => [item.url, item])).values()).slice(0, 12);
      setImages(unique);
    }).catch(() => setImages([]));

    return () => { active = false; };
  }, [query]);

  if (!images.length) return <div className="galleryEmpty">Buscando galería real para esta aeronave...</div>;

  return (
    <div className="photoGallery">
      {images.map((image) => (
        <figure key={image.url}>
          <img src={image.url} alt={image.title} />
          <figcaption>{image.title}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function Explorer() {
  const [active, setActive] = useState<AircraftGroup>("Militar");
  const [open, setOpen] = useState<string | null>(null);

  const list = useMemo(() => allAircraft.filter((item) => item.group === active), [active]);

  return (
    <>
      <section className="container categoryNav">
        {groups.map((group) => (
          <button key={group} onClick={() => { setActive(group); setOpen(null); }} className={active === group ? "tabActive" : "tabButton"}>
            {group}
          </button>
        ))}
      </section>

      <section className="container groupBlock">
        <div className="groupTitle">
          <p className="gold">{list.length} aeronaves cargadas · Total WikiAir: {allAircraft.length}</p>
          <h2>{active}</h2>
        </div>

        <div className="aircraftGrid">
          {list.map((plane) => {
            const isOpen = open === plane.name;
            const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(plane.wiki).replaceAll("%20", "_")}`;
            return (
              <article className="aircraftCard" key={plane.name}>
                <div className="imageBox"><ImageFromWiki title={plane.wiki} name={plane.name} /></div>
                <div className="aircraftBody">
                  <span className="pill">{plane.role}</span>
                  <h3>{plane.name}</h3>
                  <p>{plane.maker} · {plane.origin}</p>
                  <div className="specList">
                    <span>Motor: {plane.engine}</span>
                    <span>Capacidad: {plane.capacity}</span>
                    <span>Licencia: {plane.license}</span>
                    {plane.mission && <span>Misión: {plane.mission}</span>}
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
                      {plane.weapons && <p><b>Armamento / poder de fuego:</b> {plane.weapons}</p>}
                      {plane.mission && <p><b>Objetivos de misión:</b> {plane.mission}</p>}
                      {plane.rescueRole && <p><b>Rol de rescate:</b> {plane.rescueRole}</p>}

                      <h4>Galería dentro de WikiAir</h4>
                      <GalleryFromCommons query={plane.wiki} />

                      <div className="radarActions">
                        <a className="radarLink" href={wikiUrl} target="_blank" rel="noreferrer">Fuente Wikipedia</a>
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
