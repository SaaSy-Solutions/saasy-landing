"use client";

import { useEffect, useRef, useState } from "react";

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
 * else gets the autoplaying loop with an always-available pause toggle
 * (WCAG 2.2.2: auto-playing content that lasts more than 5 seconds
 * needs a mechanism to pause it). SSR renders the poster, so the
 * static export never ships a motion-first default.
 */
export function AutoplayVideo({
  src,
  poster,
  label,
  preload = "metadata",
  className = "h-auto w-full rounded-lg",
}: AutoplayVideoProps): React.ReactElement {
  const [allowMotion, setAllowMotion] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = (): void => setAllowMotion(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  function togglePlayback(): void {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  }

  if (!allowMotion) {
    // eslint-disable-next-line @next/next/no-img-element -- poster is a
    // pre-sized screenshot; next/image is bypassed to keep this branch
    // byte-identical with the <video poster> layout.
    return <img src={poster} alt={label} className={className} />;
  }

  return (
    <div className="group relative">
      <video
        ref={videoRef}
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
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={paused ? "Play demo video" : "Pause demo video"}
        className="absolute right-3 bottom-3 flex h-11 w-11
          items-center justify-center rounded-full
          bg-saasy-darker/80 text-white opacity-80
          transition-opacity hover:opacity-100
          focus-visible:opacity-100 focus-visible:outline
          focus-visible:outline-2 focus-visible:outline-saasy-pink"
      >
        {paused ? (
          <svg
            className="ml-0.5 h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        ) : (
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
          </svg>
        )}
      </button>
    </div>
  );
}
