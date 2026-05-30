"use client";

import { useEffect, useMemo, useState } from "react";
import { aircraft as dataAircraft } from "./data";
import { getEconomics } from "./costs";
import { groups, type Aircraft, type AircraftGroup } from "./types";

const allAircraft: Aircraft[] = dataAircraft;

type WikiImage = { url: string; title: string; mime?: string };
type Lightbox = { images: WikiImage[]; index: number };

function cleanName(value: string) {
  return value.replace(/·\s*variante\s*\d+/gi, "").replace(/\s+/g, " ").trim();
}

function shortHistory(text: string, maxChars = 130): string {
  if (!text) return "";
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxChars) return clean;
  const cut = clean.lastIndexOf(" ", maxChars);
  return clean.slice(0, cut > 0 ? cut : maxChars) + "…";
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

function isBadImage(item: WikiImage) {
  const text = `${item.title} ${item.url} ${item.mime || ""}`.toLowerCase();
  const banned = [
    ".svg", "image/svg", "roundel", "insignia", "emblem", "badge", "logo",
    "flag", "map", "diagram", "silhouette", "drawing", "3-view", "3 view",
    "blank", "icon", "patch", "tail flash", "coat of arms", "seal",
    "air force logo", "wikimedia-logo", "symbol",
  ];
  return banned.some((w) => text.includes(w));
}

/* ── Wikipedia summary image (EN) ── */
async function getWikiSummaryImage(wiki: string): Promise<WikiImage | null> {
  const title = cleanName(wiki);
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    const url = data?.originalimage?.source || data?.thumbnail?.source || null;
    if (!url) return null;
    const item: WikiImage = { url, title: data?.title || title, mime: "image" };
    return isBadImage(item) ? null : item;
  } catch {
    return null;
  }
}

/* ── Wikipedia summary image (ES) ── */
async function getWikiSummaryImageEs(wiki: string): Promise<WikiImage | null> {
  const title = cleanName(wiki);
  try {
    const res = await fetch(
      `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    const url = data?.originalimage?.source || data?.thumbnail?.source || null;
    if (!url) return null;
    const item: WikiImage = { url, title: data?.title || title, mime: "image" };
    return isBadImage(item) ? null : item;
  } catch {
    return null;
  }
}

/* ── Wikimedia Commons search ── */
function buildSearchTerms(query: string, group?: string): string[] {
  const exact = cleanName(query);
  const g = (group || "").toLowerCase();
  if (g.includes("helic")) return [`${exact} helicopter`, `${exact} rotorcraft`, exact];
  if (g.includes("planeador") || g.includes("glider")) return [`${exact} glider`, `${exact} sailplane`, exact];
  if (g.includes("dirigib") || g.includes("globo")) return [`${exact} airship`, `${exact} zeppelin`, `${exact} balloon`, exact];
  if (g.includes("hidro")) return [`${exact} seaplane`, `${exact} flying boat`, `${exact} amphibian`, exact];
  if (g.includes("autogir")) return [`${exact} autogyro`, `${exact} gyrocopter`, exact];
  return [`${exact} aircraft`, `${exact} airplane`, exact];
}

async function fetchCommonsGallery(query: string, group?: string): Promise<WikiImage[]> {
  const searches = buildSearchTerms(query, group);
  const results = await Promise.all(
    searches.map(async (search) => {
      const url =
        `https://commons.wikimedia.org/w/api.php?action=query&generator=search` +
        `&gsrsearch=${encodeURIComponent(search)}&gsrnamespace=6&gsrlimit=12` +
        `&prop=imageinfo&iiprop=url|mime&iiurlwidth=1600&format=json&origin=*`;
      try {
        const res = await fetch(url);
        if (!res.ok) return [] as WikiImage[];
        const data = await res.json();
        return (Object.values(data?.query?.pages || {}) as any[]).map((page: any) => ({
          title: (page.title as string)?.replace("File:", "") || search,
          url: page.imageinfo?.[0]?.thumburl || page.imageinfo?.[0]?.url,
          mime: page.imageinfo?.[0]?.mime,
        })) as WikiImage[];
      } catch {
        return [] as WikiImage[];
      }
    })
  );
  return Array.from(
    new Map(
      results.flat().filter((item) => item.url && !isBadImage(item)).map((item) => [item.url, item])
    ).values()
  ).slice(0, 12);
}

/* ── 3-stage card image resolver: EN Wiki → ES Wiki → Commons ── */
async function resolveCardImage(plane: Aircraft): Promise<WikiImage | null> {
  const wiki = cleanName(plane.wiki || plane.name);
  const en = await getWikiSummaryImage(wiki);
  if (en) return en;
  const es = await getWikiSummaryImageEs(wiki);
  if (es) return es;
  const commons = await fetchCommonsGallery(wiki, plane.group);
  return commons[0] ?? null;
}

/* ────────────────────────── CardImage ────────────────────────── */
function CardImage({
  plane,
  onOpen,
}: {
  plane: Aircraft;
  onOpen: (images: WikiImage[], index: number) => void;
}) {
  const [image, setImage] = useState<WikiImage | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let active = true;
    setImage(null);
    setDone(false);
    resolveCardImage(plane)
      .then((img) => { if (active) { setImage(img); setDone(true); } })
      .catch(() => { if (active) setDone(true); });
    return () => { active = false; };
  }, [plane.wiki, plane.name]);

  if (!done) return <div className="imgSkeleton" />;

  if (!image) {
    return (
      <div className="imgFallback">
        <span className="fallbackName">{cleanName(plane.name)}</span>
        <span className="fallbackTag">{plane.role}</span>
        <span className="fallbackSub">Foto no disponible</span>
      </div>
    );
  }

  return (
    <button
      style={{ width: "100%", height: "100%", border: 0, padding: 0, display: "block", cursor: "zoom-in", background: "none" }}
      type="button"
      onClick={() => onOpen([image], 0)}
    >
      <img
        src={image.url}
        alt={plane.name}
        onError={() => setImage(null)}
        style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
      />
    </button>
  );
}

/* ────────────────────────── GalleryFromCommons ────────────────────────── */
function GalleryFromCommons({
  query,
  group,
  onOpen,
}: {
  query: string;
  group?: string;
  onOpen: (images: WikiImage[], index: number) => void;
}) {
  const [images, setImages] = useState<WikiImage[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let active = true;
    setImages([]);
    setDone(false);

    const wiki = cleanName(query);
    Promise.all([
      getWikiSummaryImage(wiki),
      getWikiSummaryImageEs(wiki),
      fetchCommonsGallery(wiki, group),
    ]).then(([en, es, commons]) => {
      if (!active) return;
      const combined = [en, es, ...commons].filter(Boolean) as WikiImage[];
      const deduped = Array.from(new Map(combined.map((i) => [i.url, i])).values());
      setImages(deduped.slice(0, 12));
      setDone(true);
    }).catch(() => { if (active) setDone(true); });

    return () => { active = false; };
  }, [query, group]);

  if (!images.length) {
    return (
      <div className="galleryEmpty">
        {done ? "Sin fotos verificadas disponibles." : "Buscando fotos…"}
      </div>
    );
  }

  return (
    <div className="photoGallery">
      {images.map((img, idx) => (
        <figure key={img.url}>
          <button className="galleryButton" type="button" onClick={() => onOpen(images, idx)}>
            <img src={img.url} alt={img.title} style={{ objectFit: "cover" }} />
          </button>
          <figcaption>{img.title}</figcaption>
        </figure>
      ))}
    </div>
  );
}

/* ────────────────────────── LightboxView ────────────────────────── */
function LightboxView({
  box,
  onClose,
  onMove,
}: {
  box: Lightbox;
  onClose: () => void;
  onMove: (i: number) => void;
}) {
  const current = box.images[box.index];
  const total = box.images.length;
  return (
    <div className="lightboxOverlay" role="dialog" aria-modal="true" onClick={onClose}>
      <button className="lightboxClose" type="button" onClick={onClose}>Cerrar</button>
      {total > 1 && (
        <button className="lightboxNav lightboxPrev" type="button"
          onClick={(e) => { e.stopPropagation(); onMove((box.index - 1 + total) % total); }}>‹</button>
      )}
      <img src={current.url} alt={current.title} onClick={(e) => e.stopPropagation()} />
      {total > 1 && (
        <button className="lightboxNav lightboxNext" type="button"
          onClick={(e) => { e.stopPropagation(); onMove((box.index + 1) % total); }}>›</button>
      )}
      <div className="lightboxCaption">
        <span>{current.title}</span>
        <span style={{ opacity: 0.5 }}>{box.index + 1} / {total}</span>
      </div>
    </div>
  );
}

/* ────────────────────────── DetailModal ────────────────────────── */
function DetailModal({
  plane,
  onClose,
  onImageOpen,
}: {
  plane: Aircraft;
  onClose: () => void;
  onImageOpen: (images: WikiImage[], index: number) => void;
}) {
  const eco = getEconomics(plane);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <div className="modalOverlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modalCard" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <div>
            <p className="gold" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {plane.group} · Ficha técnica completa
            </p>
            <h2>{plane.name}</h2>
            <p className="headerSub">{plane.role} · {plane.maker} · {plane.origin}</p>
          </div>
          <button className="modalClose" type="button" onClick={onClose}>Cerrar</button>
        </div>

        <div className="modalHeroImage" style={{ minHeight: 280, position: "relative" }}>
          <CardImage plane={plane} onOpen={onImageOpen} />
          <div className="modalImageCaption">
            <span>{plane.name}</span>
            <span style={{ opacity: 0.7 }}>{plane.role}</span>
          </div>
        </div>

        <div className="detailGrid">
          <section>
            <h4>Datos técnicos</h4>
            <p><b>Primer vuelo:</b> {plane.firstFlight}</p>
            <p><b>Estado:</b> {plane.status}</p>
            <p><b>Motor:</b> {plane.engine}</p>
            <p><b>Velocidad máx.:</b> {plane.speed}</p>
            <p><b>Alcance:</b> {plane.range}</p>
            <p><b>Capacidad:</b> {plane.capacity}</p>
            <p><b>Licencia requerida:</b> {plane.license}</p>
          </section>
          <section>
            <h4>Económico y fabricación</h4>
            <p><b>Precio estimado USD:</b> {eco.price}</p>
            <p><b>Tiempo de fabricación:</b> {eco.productionTime}</p>
            <p><b>Unidades producidas:</b> {plane.productionApprox?.toLocaleString("es-AR") ?? "Variable"}</p>
            <p><b>Nota:</b> {eco.note}</p>
          </section>
          <section>
            <h4>Operadores e historia</h4>
            <p><b>Operadores:</b> {plane.operators}</p>
            <p style={{ lineHeight: 1.65 }}>{plane.history}</p>
            {plane.mission && <p style={{ marginTop: 8 }}><b>Misión:</b> {plane.mission}</p>}
            {plane.rescueRole && <p><b>Rescate:</b> {plane.rescueRole}</p>}
          </section>
        </div>

        {(plane.interior || plane.weapons) && (
          <div className="detailGrid" style={{ borderTop: "none" }}>
            {plane.interior && (
              <section>
                <h4>Interior y cabina</h4>
                <p style={{ lineHeight: 1.65 }}>{plane.interior}</p>
              </section>
            )}
            {plane.weapons && (
              <section>
                <h4>Armamento</h4>
                <p style={{ lineHeight: 1.65 }}>{plane.weapons}</p>
              </section>
            )}
          </div>
        )}

        <section className="modalSection">
          <h4>Galería de fotos</h4>
          <GalleryFromCommons query={plane.wiki || plane.name} group={plane.group} onOpen={onImageOpen} />
        </section>

        <div className="modalActions">
          <button className="radarLink" type="button" onClick={onClose}>← Volver al catálogo</button>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────── AircraftCard ────────────────────────── */
function AircraftCard({
  plane,
  onSelect,
  onImageOpen,
}: {
  plane: Aircraft;
  onSelect: () => void;
  onImageOpen: (images: WikiImage[], index: number) => void;
}) {
  const eco = getEconomics(plane);
  const desc = shortHistory(plane.history, 130);

  return (
    <article className="aircraftCard">
      <div className="imageBox" style={{ height: 220, position: "relative" }}>
        <CardImage plane={plane} onOpen={onImageOpen} />
        <div className="cardImageCaption">
          <span className="captionRole">{plane.role}</span>
          <span className="captionOrigin">{plane.origin} · {plane.firstFlight}</span>
        </div>
      </div>
      <div className="aircraftBody">
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <span className="pill">{plane.group}</span>
          {plane.status === "Retirado" && (
            <span className="pill" style={{ borderColor: "rgba(255,100,100,0.3)", background: "rgba(255,80,80,0.07)", color: "#f87171" }}>
              Retirado
            </span>
          )}
        </div>
        <h3>{cleanName(plane.name)}</h3>
        <p style={{ fontSize: 13, color: "var(--muted2)", marginBottom: 6 }}>{plane.maker}</p>
        {desc && (
          <p style={{
            fontSize: 13, color: "var(--muted2)", lineHeight: 1.6,
            marginTop: 4, display: "-webkit-box",
            WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            {desc}
          </p>
        )}
        <div style={{ display: "flex", gap: 12, marginTop: 10, flexWrap: "wrap" }}>
          <span className="statBadge">Vel. {plane.speed}</span>
          <span className="statBadge">Alcance {plane.range}</span>
        </div>
        <button className="detailButton" onClick={onSelect} type="button">
          Ver ficha técnica completa →
        </button>
      </div>
    </article>
  );
}

/* ────────────────────────── Explorer ────────────────────────── */
export default function Explorer() {
  const [active, setActive] = useState<AircraftGroup>("Militar");
  const [selected, setSelected] = useState<Aircraft | null>(null);
  const [lightbox, setLightbox] = useState<Lightbox | null>(null);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();

  const list = useMemo(() => {
    const base = dedupeAircraft(allAircraft);
    if (normalizedQuery) {
      return base.filter((item) =>
        `${item.name} ${item.maker} ${item.origin} ${item.role} ${item.group} ${item.registryId ?? ""}`.toLowerCase().includes(normalizedQuery)
      );
    }
    return base.filter((item) => item.group === active);
  }, [active, normalizedQuery]);

  const suggestions = useMemo(() => {
    if (!normalizedQuery || !showSuggestions) return [];
    return dedupeAircraft(
      allAircraft.filter((item) =>
        `${item.name} ${item.maker} ${item.origin} ${item.group}`.toLowerCase().includes(normalizedQuery)
      )
    ).slice(0, 6);
  }, [normalizedQuery, showSuggestions]);

  const openImages = (images: WikiImage[], index: number) => setLightbox({ images, index });

  const chooseSuggestion = (item: Aircraft) => {
    setQuery(item.name);
    setActive(item.group);
    setShowSuggestions(false);
    setSelected(item);
  };

  const catInfo = getCategoryInfo(active);

  return (
    <>
      {/* ── Sticky category tabs ── */}
      <nav className="categoryNav">
        <div className="categoryNavInner">
          {groups.map((group) => (
            <button
              key={group}
              onClick={() => { setActive(group); setSelected(null); setQuery(""); setShowSuggestions(false); }}
              className={active === group ? "tabActive" : "tabButton"}
              title={group}
            >
              {group}
            </button>
          ))}
        </div>
      </nav>

      <div className="groupBlock">
        {/* ── Search ── */}
        <div className="searchWrap">
          <input
            className="searchInput"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
            onFocus={() => { if (query.trim()) setShowSuggestions(true); }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            placeholder={`Buscar en ${active} — o cualquier aeronave por nombre, país, fabricante…`}
          />
          {suggestions.length > 0 && showSuggestions && (
            <div className="suggestions">
              {suggestions.map((item) => (
                <button
                  key={item.registryId || item.name}
                  className="suggestionItem"
                  type="button"
                  onPointerDown={(e) => { e.preventDefault(); chooseSuggestion(item); }}
                >
                  <b>{item.name}</b><br />
                  <span>{item.group} · {item.role} · {item.maker} · {item.origin}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Section header with category explanation ── */}
        <div className="groupTitle">
          <p className="gold" style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
            {normalizedQuery ? `${list.length} resultados` : `${list.length} aeronaves · WikiAir`}
          </p>
          <h2>
            {normalizedQuery ? `Resultados para "${query}"` : active}
          </h2>
          {!normalizedQuery && catInfo && (
            <div className="catInfoBlock">
              <p className="catDescription">{catInfo.description}</p>
              {catInfo.detail && (
                <p className="catDetail">{catInfo.detail}</p>
              )}
            </div>
          )}
        </div>

        {/* ── Grid ── */}
        <div className="aircraftGrid">
          {list.map((plane) => (
            <AircraftCard
              key={plane.registryId || plane.name}
              plane={plane}
              onSelect={() => setSelected(plane)}
              onImageOpen={openImages}
            />
          ))}
        </div>
      </div>

      {/* ── Modals ── */}
      {selected && (
        <DetailModal
          plane={selected}
          onClose={() => setSelected(null)}
          onImageOpen={openImages}
        />
      )}
      {lightbox && (
        <LightboxView
          box={lightbox}
          onClose={() => setLightbox(null)}
          onMove={(i) => setLightbox({ ...lightbox, index: i })}
        />
      )}
    </>
  );
}

type CatInfo = { description: string; detail?: string };

function getCategoryInfo(group: AircraftGroup): CatInfo {
  const map: Record<AircraftGroup, CatInfo> = {
    "Militar": {
      description: "Aviones diseñados para la guerra y la defensa de un país.",
      detail: "Incluye cazas (para combatir otros aviones), bombarderos (para atacar objetivos en tierra), aviones de reconocimiento (para espiar sin ser detectado) y aviones de ataque (para apoyar tropas desde el aire). Son los aviones más veloces y tecnológicamente avanzados del mundo.",
    },
    "Comercial": {
      description: "Los aviones que usás cuando viajás en avión.",
      detail: "Son las aeronaves que operan las aerolíneas para llevar pasajeros de una ciudad a otra. Van desde aviones pequeños de rutas cortas hasta gigantes como el Airbus A380 que puede llevar más de 800 personas. Están diseñados para ser seguros, económicos y cómodos.",
    },
    "Privada / General": {
      description: "Aviones pequeños para uso personal, deportivo o empresarial.",
      detail: "Incluye desde avionetas de dos asientos que usan los pilotos aficionados para volar por hobby, hasta lujosos jets privados que usan ejecutivos y celebridades. También son los aviones que se usan para aprender a volar.",
    },
    "Carga": {
      description: "Aviones que transportan mercancías en lugar de pasajeros.",
      detail: "Son los camiones del cielo. Llevan desde paquetes de Amazon hasta autos, animales y ayuda humanitaria en emergencias. Algunos, como el Antonov An-124, pueden cargar más de 150 toneladas — el equivalente a más de 100 autos.",
    },
    "Entrenamiento": {
      description: "Aviones usados para enseñar a los nuevos pilotos.",
      detail: "Todo piloto, ya sea civil o militar, empieza en un avión de entrenamiento. Son robustos, fáciles de controlar y tienen doble mando para que el instructor pueda intervenir en cualquier momento. Los militares también usan versiones avanzadas para preparar a sus pilotos de combate.",
    },
    "Histórica": {
      description: "Aeronaves que cambiaron el mundo o marcaron un hito en la historia de la aviación.",
      detail: "Incluye los primeros aviones que cruzaron el Atlántico, los cazas que decidieron la Segunda Guerra Mundial, los aviones que batieron récords de velocidad y altitud, y los diseños que revolucionaron la forma en que entendemos el vuelo.",
    },
    "Experimental": {
      description: "Prototipos y aviones de investigación que prueban tecnologías nuevas.",
      detail: "Son los laboratorios volantes de la aviación. Muchos nunca llegan a producción masiva, pero los descubrimientos que generan terminan aplicándose en aviones comerciales y militares años después. El X-15 de NASA, por ejemplo, llegó casi al espacio y sentó las bases para los transbordadores espaciales.",
    },
    "Hidroaviones": {
      description: "Aviones que despegan y aterrizan sobre el agua.",
      detail: "En lugar de ruedas, tienen flotadores o un casco diseñado como un bote. Son ideales para llegar a lugares sin pistas de aterrizaje, como islas remotas, lagos y ríos. También se usan para combatir incendios forestales, cargando agua directamente de los lagos.",
    },
    "Helicópteros": {
      description: "Aeronaves que vuelan usando aspas giratorias en lugar de alas fijas.",
      detail: "A diferencia de los aviones, los helicópteros pueden despegar y aterrizar en cualquier lugar, volar hacia los costados, hacia atrás, y quedarse quietos en el aire (vuelo estacionario). Por eso son fundamentales en rescates de montaña, emergencias médicas, construcción en altura y operaciones militares.",
    },
    "Rescate": {
      description: "Aeronaves especializadas en salvar vidas en situaciones de emergencia.",
      detail: "Están equipadas con camillas, desfibriladores, equipos de buceo y todo lo necesario para rescatar personas en el mar, la montaña o zonas de desastre. Son los primeros en responder ante naufragios, terremotos e inundaciones.",
    },
    "Deportivos / Ultraligeros": {
      description: "Aviones ligeros para volar por placer, deporte y competencia.",
      detail: "Son pequeños, económicos y divertidos de volar. Los ultraligeros pesan menos de 600 kg y se pueden comprar por el precio de un auto. Se usan para vuelos recreativos, acrobacia, carreras aéreas y fotografía. Muchos no requieren una licencia de piloto completa.",
    },
    "Planeadores": {
      description: "Aviones sin motor que se sostienen en el aire usando corrientes de viento.",
      detail: "No tienen motor propio — son remolcados por un avión hasta cierta altitud y luego liberados. Una vez en el aire, el piloto usa corrientes térmicas (columnas de aire caliente) para ganar altura y mantenerse volando durante horas y recorrer cientos de kilómetros. Es una de las formas más puras de volar.",
    },
    "Autogiros": {
      description: "Una combinación única entre helicóptero y avión tradicional.",
      detail: "Tienen un rotor libre en la parte superior (como un helicóptero) y una hélice delantera (como un avión). El rotor gira solo por el paso del viento, sin motor. Esto los hace muy estables y difíciles de hacer caer en barrena. Son populares para uso recreativo y como aviones de entrenamiento.",
    },
    "Dirigibles / Globos": {
      description: "Aeronaves que flotan en el aire gracias a gases más ligeros que el aire.",
      detail: "Los globos aerostáticos usan aire caliente para elevarse, mientras que los dirigibles (zepelines) usan gas helio o hidrógeno y pueden ser guiados. Fueron los primeros transportes aéreos de pasajeros de la historia. Hoy se usan en publicidad, investigación y turismo.",
    },
  };
  return map[group] ?? { description: "" };
}
