"use client";

import { useEffect, useMemo, useState } from "react";
import { generatedRegistryAircraft } from "./autoRegistry";
import { getEconomics } from "./costs";
import { groups, type Aircraft, type AircraftGroup } from "./types";

const allAircraft: Aircraft[] = generatedRegistryAircraft;

type WikiImage = { url: string; title: string; mime?: string };
type Lightbox = { images: WikiImage[]; index: number };

function isBadImage(item: WikiImage) {
  const text = `${item.title} ${item.url} ${item.mime || ""}`.toLowerCase();
  const banned = [
    ".svg", "image/svg", "roundel", "insignia", "emblem", "badge", "logo", "flag", "map",
    "diagram", "silhouette", "drawing", "3-view", "3 view", "blank", "icon", "patch", "tail flash",
    "coat of arms", "seal", "air force logo", "wikimedia-logo"
  ];
  return banned.some((word) => text.includes(word));
}

function ImageFromWiki({ title, name, onOpen }: { title: string; name: string; onOpen?: (images: WikiImage[], index: number) => void }) {
  const [img, setImg] = useState<WikiImage | null>(null);

  useEffect(() => {
    let active = true;
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active || !data) return;
        const url = data?.originalimage?.source || data?.thumbnail?.source || null;
        if (url) setImg({ url, title: name });
      })
      .catch(() => setImg(null));
    return () => { active = false; };
  }, [title, name]);

  if (!img || isBadImage(img)) return <div className="imageFallback">WikiAir</div>;

  return (
    <button className="imageButton" type="button" onClick={() => onOpen?.([img], 0)}>
      <img src={img.url} alt={name} onError={() => setImg(null)} />
    </button>
  );
}

function GalleryFromCommons({ query, onOpen }: { query: string; onOpen: (images: WikiImage[], index: number) => void }) {
  const [images, setImages] = useState<WikiImage[]>([]);

  useEffect(() => {
    let active = true;
    const searches = [
      `${query} aircraft photo`,
      `${query} airplane photo`,
      `${query} cockpit photo`,
      `${query} interior aircraft photo`,
      `${query} aviation photo`
    ];

    Promise.all(searches.map((text) => {
      const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(text)}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|mime&iiurlwidth=1400&format=json&origin=*`;
      return fetch(url).then((res) => (res.ok ? res.json() : null)).catch(() => null);
    })).then((results) => {
      if (!active) return;
      const found = results
        .flatMap((data) => Object.values(data?.query?.pages || {}) as any[])
        .map((page: any) => ({
          title: page.title?.replace("File:", "") || "Imagen",
          url: page.imageinfo?.[0]?.thumburl || page.imageinfo?.[0]?.url,
          mime: page.imageinfo?.[0]?.mime
        }))
        .filter((item: WikiImage) => Boolean(item.url) && !isBadImage(item));
      setImages(Array.from(new Map(found.map((item) => [item.url, item])).values()).slice(0, 12));
    }).catch(() => setImages([]));

    return () => { active = false; };
  }, [query]);

  if (!images.length) {
    return <div className="galleryEmpty">Sin fotos reales útiles por ahora. Se ocultaron logos, mapas, diagramas o imágenes vacías.</div>;
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
            <p>{plane.role} · {plane.maker} · {plane.origin}</p>
          </div>
          <button className="modalClose" type="button" onClick={onClose}>Cerrar</button>
        </div>

        <div className="modalHeroImage">
          <ImageFromWiki title={plane.wiki} name={plane.name} onOpen={onImageOpen} />
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
            <p><b>Producción aprox.:</b> {plane.productionApprox?.toLocaleString("es-AR") || "Variable"} unidades</p>
            <p><b>Criterio:</b> {eco.note}</p>
          </section>

          <section>
            <h4>Uso práctico</h4>
            <p><b>Operadores / países:</b> {plane.operators}</p>
            <p><b>Interior / cabina:</b> {plane.interior}</p>
            <p><b>Historia:</b> {plane.history}</p>
            {plane.weapons && <p><b>Armamento / poder de fuego:</b> {plane.weapons}</p>}
            {plane.mission && <p><b>Objetivos de misión:</b> {plane.mission}</p>}
            {plane.rescueRole && <p><b>Rol de rescate:</b> {plane.rescueRole}</p>}
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

  const list = useMemo(() => allAircraft.filter((item) => item.group === active), [active]);
  const openImages = (images: WikiImage[], index: number) => setLightbox({ images, index });

  return (
    <>
      <section className="container categoryNav">
        {groups.map((group) => (
          <button key={group} onClick={() => { setActive(group); setSelected(null); }} className={active === group ? "tabActive" : "tabButton"}>{group}</button>
        ))}
      </section>

      <section className="container groupBlock">
        <div className="groupTitle">
          <p className="gold">{list.length} aeronaves cargadas · Total WikiAir: {allAircraft.length}</p>
          <h2>{active}</h2>
        </div>

        <div className="aircraftGrid">
          {list.map((plane) => {
            const eco = getEconomics(plane);
            return (
              <article className="aircraftCard" key={plane.registryId || plane.name}>
                <div className="imageBox"><ImageFromWiki title={plane.wiki} name={plane.name} onOpen={openImages} /></div>
                <div className="aircraftBody">
                  <span className="pill">{plane.role}</span>
                  <h3>{plane.name}</h3>
                  <p>{plane.maker} · {plane.origin}</p>
                  <div className="specList">
                    <span>Motor: {plane.engine}</span>
                    <span>Precio USD: {eco.price}</span>
                    <span>Producción aprox.: {plane.productionApprox?.toLocaleString("es-AR") || "Variable"}</span>
                    {plane.mission && <span>Misión: {plane.mission}</span>}
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
