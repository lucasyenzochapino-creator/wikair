"use client";

import { useEffect, useRef, useState } from "react";

async function fetchWikiImg(wiki: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wiki)}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    const url: string | undefined = data?.originalimage?.source || data?.thumbnail?.source;
    if (!url) return null;
    const low = `${url} ${data?.title || ""}`.toLowerCase();
    const bad = [".svg", "roundel", "insignia", "emblem", "badge", "logo", "flag", "map", "diagram", "symbol"];
    if (bad.some((w) => low.includes(w))) return null;
    return url;
  } catch {
    return null;
  }
}

const _cache = new Map<string, string | null>();

export default function RecordImg({ wiki, alt }: { wiki: string; alt: string }) {
  const [src, setSrc] = useState<string | null | undefined>(
    _cache.has(wiki) ? _cache.get(wiki) ?? null : undefined
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (_cache.has(wiki)) { setSrc(_cache.get(wiki) ?? null); return; }
    const el = ref.current;
    if (!el) return;
    let active = true;
    const obs = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      obs.disconnect();
      fetchWikiImg(wiki).then((url) => {
        _cache.set(wiki, url);
        if (active) setSrc(url);
      });
    }, { rootMargin: "200px" });
    obs.observe(el);
    return () => { active = false; obs.disconnect(); };
  }, [wiki]);

  if (src === undefined) {
    return (
      <div ref={ref} className="recordCardImg">
        <div style={{ width: "100%", height: "100%", background: "rgba(0,200,255,0.04)" }} />
      </div>
    );
  }
  if (!src) return <div ref={ref} />;

  return (
    <div className="recordCardImg" ref={ref}>
      <img src={src} alt={alt} onError={() => setSrc(null)} />
    </div>
  );
}
