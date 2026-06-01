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

const BAD = ["flag", "map", "diagram", "icon", "logo", "badge", "emblem", "coat", "seal", "blank", "silhouette", ".svg"];

function isGoodImg(url: string) {
  const low = url.toLowerCase();
  return !BAD.some((b) => low.includes(b));
}

async function wikiDirect(wiki: string): Promise<string[]> {
  const [summaryRes, mediaRes] = await Promise.allSettled([
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wiki)}`),
    fetch(`https://en.wikipedia.org/api/rest_v1/page/media-list/${encodeURIComponent(wiki)}`),
  ]);
  const imgs: string[] = [];
  if (summaryRes.status === "fulfilled" && summaryRes.value.ok) {
    const d = await summaryRes.value.json();
    const main = d?.originalimage?.source || d?.thumbnail?.source;
    if (main && isGoodImg(main)) imgs.push(main);
  }
  if (mediaRes.status === "fulfilled" && mediaRes.value.ok) {
    const d = await mediaRes.value.json();
    for (const item of (d?.items ?? []) as any[]) {
      if (item.type !== "image") continue;
      const s: any[] = item.srcset ?? [];
      const raw = s[s.length - 1]?.src || s[0]?.src || item.thumbnail?.source || "";
      const url = raw.startsWith("//") ? `https:${raw}` : raw;
      if (url && isGoodImg(url) && !imgs.includes(url)) imgs.push(url);
      if (imgs.length >= 10) break;
    }
  }
  return imgs;
}

async function fetchWikiImages(wiki: string): Promise<string[]> {
  try {
    // Try the Vercel proxy first (faster, cached, bypasses CORS)
    const res = await fetch(`/api/wiki-images?q=${encodeURIComponent(wiki)}`);
    if (res.ok) {
      const imgs = await res.json();
      if (Array.isArray(imgs) && imgs.length > 0)
        return imgs.filter((u: string) => u && isGoodImg(u));
    }
  } catch {}
  // Fallback: call Wikipedia directly (works on static exports / GitHub Pages)
  try { return await wikiDirect(wiki); } catch { return []; }
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
  // Client-side preview image (used when server-side image is null/missing)
  const [previewImg, setPreviewImg] = useState<string | null>(image ?? null);
  const [previewLoading, setPreviewLoading] = useState(!image && !!wiki);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Load preview image client-side if not provided by server
  useEffect(() => {
    if (image || !wiki) return;
    setPreviewLoading(true);
    fetchWikiImages(wiki).then((imgs) => {
      setPreviewImg(imgs[0] ?? null);
      setPreviewLoading(false);
    });
  }, [wiki, image]);

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

  const displayImg = previewImg ?? image ?? null;
  const allImages = displayImg
    ? [displayImg, ...extraImages.filter((u) => u !== displayImg)]
    : extraImages;

  return (
    <>
      <button
        type="button"
        className={`expandCard ${className}`}
        onClick={() => setOpen(true)}
        aria-label={`Expandir: ${title}`}
      >
        {displayImg ? (
          <div className="expandCardImg">
            <img src={displayImg} alt={title} />
            <div className="expandCardImgOverlay" />
          </div>
        ) : (
          <div className="expandCardImgPlaceholder" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {previewLoading && <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>Cargando…</span>}
          </div>
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
