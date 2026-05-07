"use client";

import { useEffect, useMemo, useState } from "react";
import { aircraft } from "./data";
import { extraAircraft } from "./extraData";
import { specialAviation } from "./specialAviation";
import { groups, type Aircraft, type AircraftGroup } from "./types";

const allAircraft = [...aircraft, ...extraAircraft, ...specialAviation];

type WikiImage = { url: string; title: string };
type Economics = { price: string; productionTime: string; note: string };

const economicsByName: Record<string, Economics> = {
  "F-35 Lightning II": { price: "F-35A aprox. US$82,5M; F-35B aprox. US$109M; F-35C aprox. US$102,1M", productionTime: "aprox. 18-36 meses desde contrato a entrega, según lote y país", note: "Valor de adquisición militar; no incluye armas, entrenamiento, soporte ni ciclo de vida." },
  "Airbus A320": { price: "lista histórica aprox. US$101M; A320neo aprox. US$110,6M", productionTime: "aprox. 9-12 meses de ensamble final; entrega según cola de pedidos", note: "Las aerolíneas suelen negociar descuentos importantes." },
  "Airbus A321neo": { price: "lista histórica aprox. US$129,5M", productionTime: "aprox. 9-12 meses de ensamble final; entrega puede demorar años por demanda", note: "Precio real depende de motores, interiores y contrato." },
  "Airbus A350": { price: "A350-900 lista histórica aprox. US$317,4M; A350-1000 aprox. US$366,5M", productionTime: "aprox. 12-18 meses de producción/ensamble", note: "Precio real depende de contrato, soporte y configuración." },
  "Airbus A380": { price: "lista histórica aprox. US$445,6M", productionTime: "aprox. 18-24 meses; programa discontinuado", note: "Ya no se fabrica nuevo; valor actual depende del mercado usado." },
  "Boeing 737": { price: "lista histórica aprox. US$102M a US$130M según versión", productionTime: "aprox. 9-12 meses de ensamble final; entrega según cola", note: "Precio de lista histórico y muy negociado." },
  "Boeing 747": { price: "747-8 lista histórica aprox. US$403M", productionTime: "aprox. 18-24 meses; producción finalizada", note: "Ya no se produce nuevo; valor usado varía mucho." },
  "Boeing 787 Dreamliner": { price: "lista histórica aprox. US$239M a US$326M según versión", productionTime: "aprox. 12-18 meses de producción/ensamble", note: "Precio real depende de contrato y configuración." },
  "Concorde": { price: "sin precio comercial actual; valor patrimonial/museístico", productionTime: "programa de desarrollo de años; 20 aeronaves entre prototipos y serie", note: "Aeronave retirada. No existe mercado nuevo regular." },
  "Cessna 172": { price: "nuevo aprox. US$450k-US$550k; usado desde decenas a cientos de miles", productionTime: "varios meses según configuración y disponibilidad", note: "Depende de año, motor, aviónica y horas." },
  "Cirrus SR22": { price: "nuevo aprox. US$900k-US$1,2M", productionTime: "varios meses según configuración y cola", note: "Valor civil variable por aviónica y equipamiento." },
  "Pilatus PC-12": { price: "nuevo aprox. US$5M-US$7M", productionTime: "aprox. 9-18 meses según configuración", note: "Turbohélice ejecutivo/utilitario." },
  "Gulfstream G650": { price: "nuevo histórico aprox. US$65M-US$75M", productionTime: "aprox. 18-24 meses según interior", note: "El interior personalizado cambia mucho el costo." },
  "Airbus H145": { price: "aprox. US$9M-US$12M según configuración", productionTime: "aprox. 9-18 meses", note: "HEMS/rescate puede aumentar mucho el precio final." },
  "Sikorsky UH-60 Black Hawk": { price: "aprox. US$25M-US$40M según contrato", productionTime: "aprox. 12-24 meses", note: "Contrato militar: soporte, repuestos y entrenamiento cambian el costo total." },
  "Boeing AH-64 Apache": { price: "aprox. US$35M-US$60M según versión/contrato", productionTime: "aprox. 18-36 meses", note: "Sensores, armas y soporte definen el costo real." },
  "CH-47 Chinook": { price: "aprox. US$35M-US$70M según versión", productionTime: "aprox. 18-36 meses", note: "Helicóptero pesado con costo dependiente de configuración militar." },
  "Canadair CL-415": { price: "aprox. US$30M-US$40M; usado depende del estado", productionTime: "aprox. 12-24 meses", note: "Avión anfibio antiincendio especializado." },
  "HC-130 Hercules": { price: "puede superar US$80M-US$100M según versión", productionTime: "aprox. 18-36 meses", note: "Versión SAR con sensores/equipos especiales." }
};

function getEconomics(plane: Aircraft): Economics {
  if (economicsByName[plane.name]) return economicsByName[plane.name];
  if (plane.group === "Comercial") return { price: "decenas a cientos de millones de dólares, según versión y contrato", productionTime: "aprox. 9-24 meses; la entrega puede tardar años por cola", note: "Precio real depende de descuentos, motores, interiores, repuestos y financiamiento." };
  if (plane.group === "Militar") return { price: "decenas a cientos de millones de dólares en contratos completos", productionTime: "aprox. 18-48 meses según versión, país y soporte", note: "En defensa el costo incluye avión, armas, entrenamiento, repuestos y mantenimiento." };
  if (plane.group === "Helicópteros" || plane.group === "Rescate") return { price: "aprox. US$5M-US$60M según tamaño, sensores y misión", productionTime: "aprox. 9-36 meses según configuración", note: "SAR, policía, rescate y militar agregan sensores, grúas, camillas y aviónica." };
  if (plane.group === "Hidroaviones") return { price: "aprox. US$1M-US$40M según tamaño, antigüedad y misión", productionTime: "aprox. 12-36 meses si está en producción; históricos dependen de restauración", note: "Los anfibios antiincendio y SAR son aeronaves especializadas." };
  if (plane.group === "Privada / General") return { price: "desde US$100k usados hasta más de US$70M en jets ejecutivos", productionTime: "aprox. 6-24 meses según fabricante y personalización", note: "Depende de horas, aviónica, motor, interiores y mantenimiento." };
  if (plane.group === "Carga") return { price: "decenas a cientos de millones de dólares; usado o conversión varía mucho", productionTime: "aprox. 12-36 meses, o menos si es conversión", note: "Cargueros nuevos, convertidos y militares tienen precios muy distintos." };
  return { price: "sin precio comercial nuevo estándar", productionTime: "variable: prototipos e históricos pueden tomar años de desarrollo/restauración", note: "En históricos/experimentales el valor suele ser patrimonial, museo o contrato específico." };
}

function ImageFromWiki({ title, name, onOpen }: { title: string; name: string; onOpen?: (src: string, alt: string) => void }) {
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => { if (active && data) setSrc(data?.thumbnail?.source || data?.originalimage?.source || null); })
      .catch(() => setSrc(null));
    return () => { active = false; };
  }, [title]);
  if (!src) return <div className="imageFallback">WikiAir</div>;
  return <button className="imageButton" type="button" onClick={() => onOpen?.(src, name)}><img src={src} alt={name} /></button>;
}

function GalleryFromCommons({ query, onOpen }: { query: string; onOpen: (src: string, alt: string) => void }) {
  const [images, setImages] = useState<WikiImage[]>([]);
  useEffect(() => {
    let active = true;
    const searches = [`${query} aircraft`, `${query} cockpit`, `${query} interior`, `${query} aviation`];
    Promise.all(searches.map((text) => {
      const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(text)}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url&iiurlwidth=1200&format=json&origin=*`;
      return fetch(url).then((res) => (res.ok ? res.json() : null)).catch(() => null);
    })).then((results) => {
      if (!active) return;
      const found = results.flatMap((data) => Object.values(data?.query?.pages || {}) as any[])
        .map((page: any) => ({ title: page.title?.replace("File:", "") || "Imagen", url: page.imageinfo?.[0]?.thumburl || page.imageinfo?.[0]?.url }))
        .filter((item: WikiImage) => Boolean(item.url));
      setImages(Array.from(new Map(found.map((item) => [item.url, item])).values()).slice(0, 12));
    }).catch(() => setImages([]));
    return () => { active = false; };
  }, [query]);
  if (!images.length) return <div className="galleryEmpty">Buscando galería real para esta aeronave...</div>;
  return <div className="photoGallery">{images.map((image) => <figure key={image.url}><button className="galleryButton" type="button" onClick={() => onOpen(image.url, image.title)}><img src={image.url} alt={image.title} /></button><figcaption>{image.title}</figcaption></figure>)}</div>;
}

function DetailModal({ plane, onClose, onImageOpen }: { plane: Aircraft; onClose: () => void; onImageOpen: (src: string, alt: string) => void }) {
  const eco = getEconomics(plane);
  const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(plane.wiki).replaceAll("%20", "_")}`;
  useEffect(() => { const prev = document.body.style.overflow; document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = prev; }; }, []);
  return (
    <div className="modalOverlay" role="dialog" aria-modal="true">
      <div className="modalCard">
        <div className="modalHeader"><div><p className="gold">Ficha completa</p><h2>{plane.name}</h2><p>{plane.role} · {plane.maker} · {plane.origin}</p></div><button className="modalClose" type="button" onClick={onClose}>Cerrar</button></div>
        <div className="modalHeroImage"><ImageFromWiki title={plane.wiki} name={plane.name} onOpen={onImageOpen} /></div>
        <div className="detailGrid">
          <section><h4>Datos técnicos</h4><p><b>Primer vuelo:</b> {plane.firstFlight}</p><p><b>Estado:</b> {plane.status}</p><p><b>Motor:</b> {plane.engine}</p><p><b>Velocidad:</b> {plane.speed}</p><p><b>Alcance:</b> {plane.range}</p><p><b>Capacidad:</b> {plane.capacity}</p><p><b>Licencia:</b> {plane.license}</p></section>
          <section><h4>Costos y fabricación</h4><p><b>Precio estimado:</b> {eco.price}</p><p><b>Tiempo de fabricación/entrega:</b> {eco.productionTime}</p><p><b>Nota:</b> {eco.note}</p></section>
          <section><h4>Uso práctico</h4><p><b>Operadores / países:</b> {plane.operators}</p><p><b>Interior / cabina:</b> {plane.interior}</p><p><b>Historia:</b> {plane.history}</p>{plane.weapons && <p><b>Armamento / poder de fuego:</b> {plane.weapons}</p>}{plane.mission && <p><b>Objetivos de misión:</b> {plane.mission}</p>}{plane.rescueRole && <p><b>Rol de rescate:</b> {plane.rescueRole}</p>}</section>
        </div>
        <section className="modalSection"><h4>Galería dentro de WikiAir</h4><GalleryFromCommons query={plane.wiki} onOpen={onImageOpen} /></section>
        <div className="radarActions modalActions"><a className="radarLink" href={wikiUrl} target="_blank" rel="noreferrer">Fuente Wikipedia</a><button className="radarLink" type="button" onClick={onClose}>Volver al catálogo</button></div>
      </div>
    </div>
  );
}

export default function Explorer() {
  const [active, setActive] = useState<AircraftGroup>("Militar");
  const [selected, setSelected] = useState<Aircraft | null>(null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const list = useMemo(() => allAircraft.filter((item) => item.group === active), [active]);
  const openImage = (src: string, alt: string) => setLightbox({ src, alt });
  return (
    <>
      <section className="container categoryNav">{groups.map((group) => <button key={group} onClick={() => { setActive(group); setSelected(null); }} className={active === group ? "tabActive" : "tabButton"}>{group}</button>)}</section>
      <section className="container groupBlock"><div className="groupTitle"><p className="gold">{list.length} aeronaves cargadas · Total WikiAir: {allAircraft.length}</p><h2>{active}</h2></div><div className="aircraftGrid">{list.map((plane) => { const eco = getEconomics(plane); return <article className="aircraftCard" key={plane.name}><div className="imageBox"><ImageFromWiki title={plane.wiki} name={plane.name} onOpen={openImage} /></div><div className="aircraftBody"><span className="pill">{plane.role}</span><h3>{plane.name}</h3><p>{plane.maker} · {plane.origin}</p><div className="specList"><span>Motor: {plane.engine}</span><span>Precio: {eco.price}</span><span>Fabricación/entrega: {eco.productionTime}</span>{plane.mission && <span>Misión: {plane.mission}</span>}</div><button className="detailButton" onClick={() => setSelected(plane)} type="button">Ver ficha completa</button></div></article>; })}</div></section>
      {selected && <DetailModal plane={selected} onClose={() => setSelected(null)} onImageOpen={openImage} />}
      {lightbox && <div className="lightboxOverlay" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}><button className="lightboxClose" type="button" onClick={() => setLightbox(null)}>Cerrar</button><img src={lightbox.src} alt={lightbox.alt} onClick={(event) => event.stopPropagation()} /></div>}
    </>
  );
}
