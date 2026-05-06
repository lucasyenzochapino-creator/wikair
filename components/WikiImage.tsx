"use client";

import { useEffect, useState } from "react";

const imageCache = new Map<string, string>();

type WikiImageProps = {
  title: string;
  alt: string;
  className?: string;
};

export default function WikiImage({ title, alt, className }: WikiImageProps) {
  const [src, setSrc] = useState<string | null>(() => imageCache.get(title) ?? null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (src || failed) return;

    let cancelled = false;
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;

    fetch(url)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        const image = data?.thumbnail?.source || data?.originalimage?.source;
        if (image) {
          imageCache.set(title, image);
          setSrc(image);
        } else {
          setFailed(true);
        }
      })
      .catch(() => setFailed(true));

    return () => {
      cancelled = true;
    };
  }, [title, src, failed]);

  if (!src || failed) {
    return (
      <div className={`imageFallback ${className ?? ""}`}>
        <span>WikiAir</span>
      </div>
    );
  }

  return <img className={className} src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />;
}
