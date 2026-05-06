"use client";

import { useEffect, useState } from "react";

type Props = {
  title: string;
  alt: string;
  className?: string;
};

export default function WikiImage({ title, alt, className }: Props) {
  const [src, setSrc] = useState("/plane-placeholder.svg");

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function loadImage() {
      try {
        const response = await fetch(`/api/wiki/summary?title=${encodeURIComponent(title)}`, {
          signal: controller.signal
        });
        const data = await response.json();
        if (mounted && data.thumbnail) {
          setSrc(data.thumbnail);
        }
      } catch {
        if (mounted) setSrc("/plane-placeholder.svg");
      }
    }

    loadImage();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [title]);

  return (
    <img
      className={className || "air-img"}
      src={src}
      alt={alt}
      loading="lazy"
      onError={(event) => {
        event.currentTarget.src = "/plane-placeholder.svg";
      }}
    />
  );
}
