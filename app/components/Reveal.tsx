'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Reveals its children with a staggered fade-up when scrolled into view.
 * Content is visible by default (opacity handled by the `.reveal` class so
 * no-JS / reduced-motion render complete). Replaces the single global
 * `fade-up`.
 */
export function Reveal({
  children,
  index = 0,
}: {
  children: React.ReactNode;
  index?: number;
}): React.ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState<boolean>(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal${shown ? ' reveal-play' : ''}`}
      style={{ animationDelay: `${index * 90}ms` }}
    >
      {children}
    </div>
  );
}
