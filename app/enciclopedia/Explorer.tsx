"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
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

/* ── Module-level image cache — survives category switches ── */
const _imgCache = new Map<string, WikiImage | null>();

/* ── 4-stage card image resolver ── */
async function resolveCardImage(plane: Aircraft): Promise<WikiImage | null> {
  const key = plane.wiki || plane.name;
  if (_imgCache.has(key)) return _imgCache.get(key) ?? null;

  const wiki = cleanName(key);

  const en = await getWikiSummaryImage(wiki);
  if (en) { _imgCache.set(key, en); return en; }

  const es = await getWikiSummaryImageEs(wiki);
  if (es) { _imgCache.set(key, es); return es; }

  if (wiki !== cleanName(plane.name)) {
    const byName = await getWikiSummaryImage(cleanName(plane.name));
    if (byName) { _imgCache.set(key, byName); return byName; }
  }

  const commons = await fetchCommonsGallery(wiki, plane.group);
  const result = commons[0] ?? null;
  _imgCache.set(key, result);
  return result;
}

/* ────────────────────────── CardImage ────────────────────────── */
function CardImage({
  plane,
  onOpen,
}: {
  plane: Aircraft;
  onOpen: (images: WikiImage[], index: number) => void;
}) {
  const [image, setImage] = useState<WikiImage | null | undefined>(() => {
    const key = plane.wiki || plane.name;
    return _imgCache.has(key) ? (_imgCache.get(key) ?? null) : undefined;
  });
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const key = plane.wiki || plane.name;
    if (_imgCache.has(key)) {
      setImage(_imgCache.get(key) ?? null);
      return;
    }

    const el = rootRef.current;
    if (!el) return;
    let active = true;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        resolveCardImage(plane)
          .then((img) => { if (active) setImage(img); })
          .catch(() => { if (active) setImage(null); });
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => { active = false; observer.disconnect(); };
  }, [plane.wiki, plane.name]);

  if (image === undefined) return <div className="imgSkeleton" ref={rootRef} />;

  if (!image) {
    return (
      <div className="imgFallback" ref={rootRef}>
        <span className="fallbackName">{cleanName(plane.name)}</span>
        <span className="fallbackTag">{plane.role}</span>
        <span className="fallbackSub">Foto no disponible</span>
      </div>
    );
  }

  return (
    <div ref={rootRef} style={{ width: "100%", height: "100%" }}>
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
    </div>
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

/* ────────────────────────── CompareModal ────────────────────────── */
function CompareModal({ a, b, onClose }: { a: Aircraft; b: Aircraft; onClose: () => void }) {
  const ecoA = getEconomics(a);
  const ecoB = getEconomics(b);
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [onClose]);

  const rows: { label: string; valA: string; valB: string }[] = [
    { label: "Categoría", valA: a.group, valB: b.group },
    { label: "Rol", valA: a.role, valB: b.role },
    { label: "Fabricante", valA: a.maker, valB: b.maker },
    { label: "País", valA: a.origin, valB: b.origin },
    { label: "Primer vuelo", valA: a.firstFlight, valB: b.firstFlight },
    { label: "Estado", valA: a.status, valB: b.status },
    { label: "Velocidad máx.", valA: a.speed, valB: b.speed },
    { label: "Alcance", valA: a.range, valB: b.range },
    { label: "Capacidad", valA: a.capacity, valB: b.capacity },
    { label: "Motor", valA: a.engine, valB: b.engine },
    { label: "Precio est. USD", valA: ecoA.price, valB: ecoB.price },
    { label: "Unidades producidas", valA: a.productionApprox?.toLocaleString("es-AR") ?? "Variable", valB: b.productionApprox?.toLocaleString("es-AR") ?? "Variable" },
    { label: "Licencia", valA: a.license, valB: b.license },
  ];

  return (
    <div className="modalOverlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modalCard" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 900 }}>
        <div className="modalHeader">
          <div>
            <p className="gold" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Comparador de aeronaves</p>
            <h2 style={{ fontSize: 20 }}>{a.name} vs {b.name}</h2>
          </div>
          <button className="modalClose" type="button" onClick={onClose}>Cerrar</button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ padding: "12px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", borderBottom: "1px solid var(--border)", width: "30%" }}>Especificación</th>
                <th style={{ padding: "12px 20px", textAlign: "left", fontSize: 14, fontWeight: 800, color: "var(--sky)", borderBottom: "1px solid var(--border)", borderLeft: "1px solid var(--border)" }}>{cleanName(a.name)}</th>
                <th style={{ padding: "12px 20px", textAlign: "left", fontSize: 14, fontWeight: 800, color: "var(--sky-bright)", borderBottom: "1px solid var(--border)", borderLeft: "1px solid var(--border)" }}>{cleanName(b.name)}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.label} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                  <td style={{ padding: "10px 20px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--muted)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{row.label}</td>
                  <td style={{ padding: "10px 20px", fontSize: 13, color: "var(--text)", borderBottom: "1px solid rgba(255,255,255,0.04)", borderLeft: "1px solid var(--border)" }}>{row.valA}</td>
                  <td style={{ padding: "10px 20px", fontSize: 13, color: "var(--text)", borderBottom: "1px solid rgba(255,255,255,0.04)", borderLeft: "1px solid var(--border)" }}>{row.valB}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────── DetailModal ────────────────────────── */
function DetailModal({
  plane,
  isFav,
  onToggleFav,
  onClose,
  onImageOpen,
}: {
  plane: Aircraft;
  isFav: boolean;
  onToggleFav: () => void;
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

  function handleShare() {
    const text = `WikiAir — ${plane.name}\n${plane.role} · ${plane.maker}\n\nhttps://wikair.vercel.app/enciclopedia?open=${encodeURIComponent(plane.name)}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noreferrer");
  }

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
          <button className="radarLink" type="button" onClick={onClose}>← Volver</button>
          <button
            type="button"
            onClick={onToggleFav}
            className="radarLink"
            style={isFav ? { borderColor: "rgba(251,191,36,0.4)", color: "var(--amber)" } : {}}
          >
            {isFav ? "Guardado" : "Guardar"}
          </button>
          <button type="button" onClick={handleShare} className="radarLink">
            Compartir WhatsApp
          </button>
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
  isFav,
  onToggleFav,
  isCompared,
  onToggleCompare,
  compareDisabled,
}: {
  plane: Aircraft;
  onSelect: () => void;
  onImageOpen: (images: WikiImage[], index: number) => void;
  isFav: boolean;
  onToggleFav: () => void;
  isCompared: boolean;
  onToggleCompare: () => void;
  compareDisabled: boolean;
}) {
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
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <span className="pill">{plane.group}</span>
            {plane.status === "Retirado" && (
              <span className="pill" style={{ borderColor: "rgba(255,100,100,0.3)", background: "rgba(255,80,80,0.07)", color: "#f87171" }}>
                Retirado
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onToggleFav(); }}
              style={{
                background: "none", border: "none", cursor: "pointer", padding: "2px 6px",
                fontSize: 11, fontWeight: 700, color: isFav ? "var(--amber)" : "var(--muted)",
                borderRadius: 6, transition: "color 0.15s",
              }}
              title={isFav ? "Quitar de favoritos" : "Guardar en favoritos"}
            >
              {isFav ? "★" : "☆"}
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onToggleCompare(); }}
              disabled={compareDisabled && !isCompared}
              style={{
                background: isCompared ? "var(--sky-dim)" : "none",
                border: isCompared ? "1px solid var(--border-a)" : "none",
                cursor: compareDisabled && !isCompared ? "default" : "pointer",
                padding: "2px 7px", fontSize: 10, fontWeight: 700,
                color: isCompared ? "var(--sky)" : "var(--muted)",
                borderRadius: 6, opacity: compareDisabled && !isCompared ? 0.35 : 1,
                transition: "all 0.15s",
              }}
              title={isCompared ? "Quitar del comparador" : "Agregar al comparador"}
            >
              {isCompared ? "− Comp." : "+ Comp."}
            </button>
          </div>
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
  const [showFavs, setShowFavs] = useState(false);
  const [favs, setFavs] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<Aircraft[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const searchParams = useSearchParams();

  // Load favorites from localStorage on mount
  useEffect(() => {
    try { setFavs(JSON.parse(localStorage.getItem("wf") || "[]")); } catch {}
  }, []);

  function toggleFav(name: string) {
    setFavs((prev) => {
      const next = prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name];
      try { localStorage.setItem("wf", JSON.stringify(next)); } catch {}
      return next;
    });
  }

  function toggleCompare(plane: Aircraft) {
    setCompareList((prev) => {
      if (prev.some((p) => p.name === plane.name)) return prev.filter((p) => p.name !== plane.name);
      if (prev.length >= 2) return prev;
      return [...prev, plane];
    });
  }

  useEffect(() => {
    const open = searchParams.get("open");
    if (open) {
      const target = dedupeAircraft(allAircraft).find(
        (a) => cleanName(a.name).toLowerCase() === open.toLowerCase() ||
               cleanName(a.wiki || "").toLowerCase() === open.toLowerCase()
      );
      if (target) { setActive(target.group); setSelected(target); }
      return;
    }
    try {
      const s = JSON.parse(sessionStorage.getItem("we") || "null");
      if (s?.active) setActive(s.active as AircraftGroup);
      if (s?.query) setQuery(s.query);
    } catch {}
  }, [searchParams]);

  useEffect(() => {
    try { sessionStorage.setItem("we", JSON.stringify({ active, query })); } catch {}
  }, [active, query]);

  const normalizedQuery = query.trim().toLowerCase();

  const list = useMemo(() => {
    const base = dedupeAircraft(allAircraft);
    if (showFavs) return base.filter((item) => favs.includes(cleanName(item.name)));
    if (normalizedQuery) {
      return base.filter((item) =>
        `${item.name} ${item.maker} ${item.origin} ${item.role} ${item.group} ${item.registryId ?? ""}`.toLowerCase().includes(normalizedQuery)
      );
    }
    return base.filter((item) => item.group === active);
  }, [active, normalizedQuery, showFavs, favs]);

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
          <button
            onClick={() => { setShowFavs(true); setSelected(null); setQuery(""); setShowSuggestions(false); }}
            className={showFavs ? "tabActive" : "tabButton"}
            title="Favoritos"
          >
            Favoritos {favs.length > 0 && `(${favs.length})`}
          </button>
          {groups.map((group) => (
            <button
              key={group}
              onClick={() => { setActive(group); setShowFavs(false); setSelected(null); setQuery(""); setShowSuggestions(false); }}
              className={!showFavs && active === group ? "tabActive" : "tabButton"}
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
            onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); if (e.target.value) setShowFavs(false); }}
            onFocus={() => { if (query.trim()) setShowSuggestions(true); }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            placeholder={showFavs ? "Buscar en favoritos…" : `Buscar en ${active} — o cualquier aeronave por nombre, país, fabricante…`}
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

        {/* ── Section header ── */}
        <div className="groupTitle">
          <p className="gold" style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
            {showFavs ? `${list.length} guardados` : normalizedQuery ? `${list.length} resultados` : `${list.length} aeronaves · WikiAir`}
          </p>
          <h2>
            {showFavs ? "Favoritos" : normalizedQuery ? `Resultados para "${query}"` : active}
          </h2>
          {showFavs && list.length === 0 && (
            <p style={{ color: "var(--muted2)", fontSize: 14, marginTop: 8 }}>
              Todavía no guardaste ningún avión. Tocá el icono de estrella en cualquier ficha técnica.
            </p>
          )}
          {!showFavs && !normalizedQuery && catInfo && (
            <div className="catInfoBlock">
              <p className="catDescription">{catInfo.description}</p>
              {catInfo.detail && <p className="catDetail">{catInfo.detail}</p>}
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
              isFav={favs.includes(cleanName(plane.name))}
              onToggleFav={() => toggleFav(cleanName(plane.name))}
              isCompared={compareList.some((p) => p.name === plane.name)}
              onToggleCompare={() => toggleCompare(plane)}
              compareDisabled={compareList.length >= 2}
            />
          ))}
        </div>
      </div>

      {/* ── Compare floating bar ── */}
      {compareList.length > 0 && (
        <div className="compareBar">
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--muted2)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Comparar:
          </span>
          {compareList.map((p) => (
            <div key={p.name} className="comparePlane">
              <span>{cleanName(p.name)}</span>
              <button type="button" onClick={() => toggleCompare(p)} title="Quitar">×</button>
            </div>
          ))}
          {compareList.length === 2 ? (
            <button className="btnPrimary" style={{ padding: "8px 20px", fontSize: 13 }} onClick={() => setShowCompare(true)}>
              Ver comparación
            </button>
          ) : (
            <span style={{ fontSize: 12, color: "var(--muted2)" }}>Seleccioná otro avión para comparar</span>
          )}
        </div>
      )}

      {/* ── Modals ── */}
      {showCompare && compareList.length === 2 && (
        <CompareModal a={compareList[0]} b={compareList[1]} onClose={() => setShowCompare(false)} />
      )}
      {selected && (
        <DetailModal
          plane={selected}
          isFav={favs.includes(cleanName(selected.name))}
          onToggleFav={() => toggleFav(cleanName(selected.name))}
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
