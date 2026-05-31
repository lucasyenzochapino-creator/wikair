"use client";
import { useState, useEffect, useRef } from "react";

interface ExpandableCardProps {
  title: string;
  badge?: string;
  image?: string | null;
  summary: string;
  detail: string;
  wiki?: string;
  accentColor?: string;
  className?: string;
}

async function fetchWikiImages(wiki: string): Promise<string[]> {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wiki)}`
    );
    if (!res.ok) return [];
    const data = await res.json();
    const main = data?.originalimage?.source || data?.thumbnail?.source;

    const res2 = await fetch(
      `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(wiki)}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|mime&format=json&origin=*`
    );
    const data2 = res2.ok ? await res2.json() : null;
    const commons: string[] = [];
    if (data2?.query?.pages) {
      for (const page of Object.values(data2.query.pages) as any[]) {
        const url: string = page?.imageinfo?.[0]?.url ?? "";
        const mime: string = page?.imageinfo?.[0]?.mime ?? "";
        if (url && mime.startsWith("image/") && !mime.includes("svg")) {
          const low = url.toLowerCase();
          const bad = ["flag", "map", "diagram", "icon", "logo", "badge", "emblem", "coat", "seal", "blank", "silhouette"];
          if (!bad.some((b) => low.includes(b))) commons.push(url);
        }
      }
    }
    const all = [main, ...commons].filter(Boolean) as string[];
    return [...new Set(all)].slice(0, 8);
  } catch {
    return [];
  }
}

export default function ExpandableCard({
  title,
  badge,
  image,
  summary,
  detail,
  wiki,
  accentColor,
  className = "",
}: ExpandableCardProps) {
  const [open, setOpen] = useState(false);
  const [extraImages, setExtraImages] = useState<string[]>([]);
  const [loadingImgs, setLoadingImgs] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    if (wiki && extraImages.length === 0 && !loadingImgs) {
      setLoadingImgs(true);
      fetchWikiImages(wiki).then((imgs) => {
        setExtraImages(imgs);
        setLoadingImgs(false);
      });
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const allImages = image
    ? [image, ...extraImages.filter((u) => u !== image)]
    : extraImages;

  return (
    <>
      <button
        type="button"
        className={`expandCard ${className}`}
        onClick={() => setOpen(true)}
        aria-label={`Expandir: ${title}`}
      >
        {image ? (
          <div className="expandCardImg">
            <img src={image} alt={title} />
            <div className="expandCardImgOverlay" />
          </div>
        ) : (
          <div className="expandCardImgPlaceholder" />
        )}
        {badge && (
          <span className="expandCardBadge" style={accentColor ? { color: accentColor } : undefined}>
            {badge}
          </span>
        )}
        <div className="expandCardBody">
          <h3>{title}</h3>
          <p>{summary}</p>
          <span className="expandCardCta">Ver más →</span>
        </div>
      </button>

      {open && (
        <div className="expandOverlay" onClick={() => setOpen(false)}>
          <div
            className="expandSheet"
            ref={sheetRef}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="expandSheetHandle" />
            <button
              className="expandSheetClose"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cerrar
            </button>

            {allImages[0] && (
              <button
                type="button"
                className="expandSheetHero"
                onClick={() => setLightbox(0)}
                style={{ cursor: "zoom-in" }}
              >
                <img src={allImages[0]} alt={title} />
                <div className="expandSheetHeroOverlay" />
                <span className="expandSheetZoomHint">Toca para ampliar</span>
              </button>
            )}

            <div className="expandSheetContent">
              {badge && (
                <span className="expandCardBadge" style={accentColor ? { color: accentColor } : undefined}>
                  {badge}
                </span>
              )}
              <h2>{title}</h2>
              <p>{detail}</p>

              {allImages.length > 1 && (
                <div className="expandSheetGallery">
                  {allImages.slice(1).map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      className="expandSheetThumb"
                      onClick={() => setLightbox(i + 1)}
                    >
                      <img src={src} alt={`${title} ${i + 2}`} />
                    </button>
                  ))}
                </div>
              )}

              {loadingImgs && <p style={{ color: "var(--muted2)", fontSize: 13 }}>Cargando fotos…</p>}
            </div>
          </div>
        </div>
      )}

      {open && lightbox !== null && (
        <div
          className="lightboxOverlay"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button className="lightboxClose" type="button" onClick={() => setLightbox(null)}>Cerrar</button>
          {allImages.length > 1 && (
            <button
              className="lightboxNav lightboxPrev"
              type="button"
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + allImages.length) % allImages.length); }}
            >‹</button>
          )}
          <img
            src={allImages[lightbox]}
            alt={`${title} ${lightbox + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
          {allImages.length > 1 && (
            <button
              className="lightboxNav lightboxNext"
              type="button"
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % allImages.length); }}
            >›</button>
          )}
          <div className="lightboxCaption">
            {title} · {lightbox + 1} / {allImages.length}
          </div>
        </div>
      )}
    </>
  );
}
