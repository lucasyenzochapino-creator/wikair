"use client";
import { useEffect, useState } from "react";

const BAD = ["flag", "map", "diagram", "icon", "logo", "badge", "emblem", "coat", "seal", "blank", "silhouette", ".svg"];
function isGood(url: string) {
  return !BAD.some(b => url.toLowerCase().includes(b));
}

async function loadImg(wiki: string): Promise<string | null> {
  try {
    const res = await fetch(`/api/wiki-images?q=${encodeURIComponent(wiki)}`);
    if (res.ok) {
      const imgs = await res.json();
      const first = Array.isArray(imgs) && imgs.find((u: string) => u && isGood(u));
      if (first) return first;
    }
  } catch {}
  try {
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wiki)}`);
    if (res.ok) {
      const d = await res.json();
      const url = d?.originalimage?.source || d?.thumbnail?.source;
      if (url && isGood(url)) return url;
    }
  } catch {}
  return null;
}

export default function WikiClientImg({
  src,
  wiki,
  alt,
  style,
  className,
}: {
  src?: string | null;
  wiki?: string;
  alt: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  const [imgSrc, setImgSrc] = useState<string | null>(src ?? null);

  useEffect(() => {
    if (src) return;
    if (!wiki) return;
    loadImg(wiki).then(url => { if (url) setImgSrc(url); });
  }, [src, wiki]);

  if (!imgSrc) return null;
  return (
    <img
      src={imgSrc}
      alt={alt}
      style={style}
      className={className}
      onError={() => setImgSrc(null)}
    />
  );
}
