"use client";

import { useEffect, useState } from "react";

interface AutoplayVideoProps {
  /** MP4 URL for the looping clip. */
  src: string;
  /** Poster image shown before load — and instead of the video when the
   * visitor prefers reduced motion. */
  poster: string;
  /** Accessible description of what the clip shows. */
  label: string;
  /** Preload hint; below-the-fold clips should pass "none". */
  preload?: "none" | "metadata";
  className?: string;
}

/**
 * Muted, looping product clip that respects `prefers-reduced-motion`:
 * visitors who ask for less motion get the static poster (the clips are
 * illustrative — the poster carries the same information), everyone
 * else gets the autoplaying loop. SSR renders the poster, so the static
 * export never ships a motion-first default.
 */
export function AutoplayVideo({
  src,
  poster,
  label,
  preload = "metadata",
  className = "h-auto w-full rounded-lg",
}: AutoplayVideoProps): React.ReactElement {
  const [allowMotion, setAllowMotion] = useState<boolean>(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = (): void => setAllowMotion(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!allowMotion) {
    // eslint-disable-next-line @next/next/no-img-element -- poster is a
    // pre-sized screenshot; next/image is bypassed to keep this branch
    // byte-identical with the <video poster> layout.
    return <img src={poster} alt={label} className={className} />;
  }

  return (
    <video
      className={className}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload={preload}
      aria-label={label}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
