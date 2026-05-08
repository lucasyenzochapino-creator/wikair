"use client";

import { useEffect, useMemo, useState } from "react";
import { generatedRegistryAircraft } from "./autoRegistry";
import { getEconomics } from "./costs";
import { groups, type Aircraft, type AircraftGroup } from "./types";

const allAircraft: Aircraft[] = generatedRegistryAircraft;

type WikiImage = { url: string; title: string; mime?: string };
type Lightbox = { images: WikiImage[]; index: number };

function cleanName(value: string) {
  return value.replace(/·\s*variante\s*\d+/gi, "").replace(/\s+/g, " ").trim();
}

function dedupeAircraft(items: Aircraft[]) {
  const seen = new Set<string>();
  const result: Aircraft[] = [];
  for (const item of items) {
    const key = cleanName(item.name).toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }
  return result;
}

function isBadImage(item: WikiImage, expectedName: string) {
  const text = `${item.title} ${item.url} ${item.mime || ""}`.toLowerCase();
  const expected = cleanName(expectedName).toLowerCase();
  const banned = [
    ".svg", "image/svg", "roundel", "insignia", "emblem", "badge", "logo", "flag", "map",
    "diagram", "silhouette", "drawing", "3-view", "3 view", "blank", "icon", "patch", "tail flash",
    "coat of arms", "seal", "air force logo", "wikimedia-logo"
  ];
  if (banned.some((word) => text.includes(word))) return true;
  const tokens = expected.split(/[^a-z0-9áéíóúñü-]+/i).filter((token) => token.length >= 3).slice(0, 3);
  return tokens.length ? !tokens.some((token) => text.includes(token)) : false;
}

async function findCommonsImages(query: string): Promise<WikiImage[]> {
  const exact = cleanName(query);
  const searches = [
    `"${exact}" aircraft photo`,
    `"${exact}" airplane`,
    `"${exact}" aviation`
  ];

  const results = await Promise.all(searches.map(async (search) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(search)}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|mime&iiurlwidth=1600&format=json&origin=*`;
    try {
      const res = await fetch(url);
      if (!res.ok) return [] as WikiImage[];
      const data = await res.json();
      return (Object.values(data?.query?.pages || {}) as any[]).map((page: any) => ({
        title: page.title?.replace("File:", "") || exact,
        url: page.imageinfo?.[0]?.thumburl || page.imageinfo?.[0]?.url,
        mime: page.imageinfo?.[0]?.mime
      })) as WikiImage[];
    } catch {
      return [] as WikiImage[];
    }
  }));

  return Array.from(
    new Map(
      results
        .flat()
        .filter((item) => item.url && !isBadImage(item, exact))
        .map((item) => [item.url, item])
    ).values()
  );
}

function AircraftVisual({ plane }: { plane: Aircraft }) {
  return (
    <div className="aircraftVisual">
      <div className="visualLogo">WikiAir</div>
      <div className="visualIcon">✈</div>
      <div className="visualName">{cleanName(plane.name)}</div>
      <div className="visualMeta">{plane.group} · ficha técnica</div>
    </div>
  );
}

function CardImage({ plane, onOpen }: { plane: Aircraft; onOpen: (images: WikiImage[], index: number) => void }) {
  const [images, setImages] = useState<WikiImage[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let active = true;
    setImages([]);
    setDone(false);
    findCommonsImages(plane.wiki || plane.name)
      .then((found) => {
        if (active) setImages(found.slice(0, 4));
      })
      .catch(() => {
        if (active) setImages([]);
      })
      .finally(() => {
        if (active) setDone(true);
      });
    return () => { active = false; };
  }, [plane.wiki, plane.name]);

  if (!images.length) {
    return (
      <div className="realImageFrame noPhoto">
        {done ? <AircraftVisual plane={plane} /> : <span>Buscando imagen...</span>}
      </div>
    );
  }

  const image = images[0];
  return (
    <button className="realImageFrame" type="button" onClick={() => onOpen(images, 0)}>
      <img src={image.url} alt={plane.name} onError={() => setImages(images.slice(1))} />
    </button>
  );
}

function GalleryFromCommons({ query, onOpen }: { query: string; onOpen: (images: WikiImage[], index: number) => void }) {
  const [images, setImages] = useState<WikiImage[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let active = true;
    setImages([]);
    setDone(false);
    findCommonsImages(query)
      .then((found) => { if (active) setImages(found.slice(0, 8)); })
      .catch(() => { if (active) setImages([]); })
      .finally(() => { if (active) setDone(true); });
    return () => { active = false; };
  }, [query]);

  if (!images.length) {
    return <div className="galleryEmpty">{done ? "Sin fotos verificadas por ahora." : "Buscando fotos verificadas..."}</div>;
  }

  return (
    <div className="photoGallery">
      {images.map((image, index) => (
        <figure key={image.url}>
          <button className="galleryButton" type="button" onClick={() => onOpen(images, index)}>
            <img src={image.url} alt={image.title} />
          </button>
          <figcaption>{image.title}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function LightboxView({ box, onClose, onMove }: { box: Lightbox; onClose: () => void; onMove: (nextIndex: number) => void }) {
  const current = box.images[box.index];
  const total = box.images.length;
  const prev = () => onMove((box.index - 1 + total) % total);
  const next = () => onMove((box.index + 1) % total);

  return (
    <div className="lightboxOverlay" role="dialog" aria-modal="true" onClick={onClose}>
      <button className="lightboxClose" type="button" onClick={onClose}>Cerrar</button>
      {total > 1 && <button className="lightboxNav lightboxPrev" type="button" onClick={(e) => { e.stopPropagation(); prev(); }}>‹</button>}
      <img src={current.url} alt={current.title} onClick={(e) => e.stopPropagation()} />
      {total > 1 && <button className="lightboxNav lightboxNext" type="button" onClick={(e) => { e.stopPropagation(); next(); }}>›</button>}
      <div className="lightboxCount">{box.index + 1} / {total}</div>
    </div>
  );
}

function DetailModal({ plane, onClose, onImageOpen }: { plane: Aircraft; onClose: () => void; onImageOpen: (images: WikiImage[], index: number) => void }) {
  const eco = getEconomics(plane);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div className="modalOverlay" role="dialog" aria-modal="true">
      <div className="modalCard">
        <div className="modalHeader">
          <div>
            <p className="gold">Ficha completa · {plane.registryId}</p>
            <h2>{plane.name}</h2>
            <p>{plane.group} · {plane.role} · {plane.maker} · {plane.origin}</p>
          </div>
          <button className="modalClose" type="button" onClick={onClose}>Cerrar</button>
        </div>

        <div className="modalHeroImage">
          <CardImage plane={plane} onOpen={onImageOpen} />
        </div>

        <div className="detailGrid">
          <section>
            <h4>Datos técnicos</h4>
            <p><b>Primer vuelo / época:</b> {plane.firstFlight}</p>
            <p><b>Estado:</b> {plane.status}</p>
            <p><b>Motor:</b> {plane.engine}</p>
            <p><b>Velocidad:</b> {plane.speed}</p>
            <p><b>Alcance:</b> {plane.range}</p>
            <p><b>Capacidad:</b> {plane.capacity}</p>
            <p><b>Licencia:</b> {plane.license}</p>
          </section>

          <section>
            <h4>Costos y fabricación</h4>
            <p><b>Precio en USD:</b> {eco.price}</p>
            <p><b>Fabricación / entrega:</b> {eco.productionTime}</p>
            <p><b>Producción aprox.:</b> {plane.productionApprox?.toLocaleString("es-AR") || "Variable"}</p>
            <p><b>Criterio:</b> {eco.note}</p>
          </section>

          <section>
            <h4>Uso práctico</h4>
            <p><b>Operadores / países:</b> {plane.operators}</p>
            <p><b>Interior / cabina:</b> {plane.interior}</p>
            <p><b>Historia:</b> {plane.history}</p>
            {plane.mission && <p><b>Objetivos de misión:</b> {plane.mission}</p>}
          </section>
        </div>

        <section className="modalSection">
          <h4>Galería dentro de WikiAir</h4>
          <GalleryFromCommons query={plane.wiki} onOpen={onImageOpen} />
        </section>

        <div className="radarActions modalActions">
          <button className="radarLink" type="button" onClick={onClose}>Volver al catálogo</button>
        </div>
      </div>
    </div>
  );
}

export default function Explorer() {
  const [active, setActive] = useState<AircraftGroup>("Militar");
  const [selected, setSelected] = useState<Aircraft | null>(null);
  const [lightbox, setLightbox] = useState<Lightbox | null>(null);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();
  const list = useMemo(() => {
    return allAircraft.filter((item) => {
      const haystack = `${item.name} ${item.maker} ${item.origin} ${item.role} ${item.group} ${item.registryId || ""}`.toLowerCase();
      if (normalizedQuery) return haystack.includes(normalizedQuery);
      return item.group === active;
    });
  }, [active, normalizedQuery]);

  const suggestions = useMemo(() => {
    if (!normalizedQuery || !showSuggestions) return [];
    return dedupeAircraft(
      allAircraft.filter((item) => `${item.name} ${item.maker} ${item.origin} ${item.group}`.toLowerCase().includes(normalizedQuery))
    ).slice(0, 6);
  }, [normalizedQuery, showSuggestions]);

  const openImages = (images: WikiImage[], index: number) => setLightbox({ images, index });
  const chooseSuggestion = (item: Aircraft) => {
    setQuery(item.name);
    setActive(item.group);
    setShowSuggestions(false);
    setSelected(item);
  };

  return (
    <>
      <section className="container categoryNav">
        {groups.map((group) => (
          <button key={group} onClick={() => { setActive(group); setSelected(null); setQuery(""); setShowSuggestions(false); }} className={active === group ? "tabActive" : "tabButton"}>{group}</button>
        ))}
      </section>

      <section className="container" style={{ marginBottom: 18, position: "relative" }}>
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
          onFocus={() => { if (query.trim()) setShowSuggestions(true); }}
          placeholder="Buscar avión por nombre, país, fabricante o código..."
          style={{ width: "100%", borderRadius: 18, border: "1px solid rgba(212,175,55,.35)", background: "rgba(255,255,255,.06)", color: "white", padding: "14px 16px", fontSize: 16, outline: "none" }}
        />
        {suggestions.length > 0 && (
          <div style={{ position: "absolute", zIndex: 200, left: 0, right: 0, top: 54, background: "rgba(5,5,5,.98)", border: "1px solid rgba(212,175,55,.35)", borderRadius: 18, overflow: "hidden", boxShadow: "0 18px 70px rgba(0,0,0,.55)" }}>
            {suggestions.map((item) => (
              <button
                key={item.registryId || item.name}
                type="button"
                onPointerDown={(e) => { e.preventDefault(); chooseSuggestion(item); }}
                onClick={(e) => { e.preventDefault(); chooseSuggestion(item); }}
                style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 16px", color: "white", background: "transparent", border: 0, borderBottom: "1px solid rgba(255,255,255,.08)", cursor: "pointer" }}
              >
                <b>{item.name}</b><br /><span style={{ color: "#bdbdbd", fontSize: 13 }}>{item.group} · {item.maker} · {item.origin}</span>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="container groupBlock">
        <div className="groupTitle">
          <p className="gold">{list.length} aeronaves cargadas · Total WikiAir: {allAircraft.length}</p>
          <h2>{normalizedQuery ? "Resultados de búsqueda" : active}</h2>
        </div>

        <div className="aircraftGrid">
          {list.map((plane) => {
            const eco = getEconomics(plane);
            return (
              <article className="aircraftCard" key={plane.registryId || plane.name}>
                <div className="imageBox"><CardImage plane={plane} onOpen={openImages} /></div>
                <div className="aircraftBody">
                  <span className="pill">{plane.group}</span>
                  <h3>{plane.name}</h3>
                  <p>{plane.maker} · {plane.origin}</p>
                  <div className="specList">
                    <span>Tipo: {plane.role}</span>
                    <span>Motor: {plane.engine}</span>
                    <span>Precio USD: {eco.price}</span>
                    <span>Misión: {plane.mission}</span>
                  </div>
                  <button className="detailButton" onClick={() => setSelected(plane)} type="button">Ver ficha completa</button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {selected && <DetailModal plane={selected} onClose={() => setSelected(null)} onImageOpen={openImages} />}
      {lightbox && <LightboxView box={lightbox} onClose={() => setLightbox(null)} onMove={(index) => setLightbox({ ...lightbox, index })} />}
    </>
  );
}
