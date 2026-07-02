'use client';

import { useEffect, useRef, useState } from 'react';

export interface UseCountUpOptions {
  /** Animation length in ms. Default 1400. */
  durationMs?: number;
  /** Prepended to the formatted number, e.g. "$". */
  prefix?: string;
  /** Appended to the formatted number, e.g. "%". */
  suffix?: string;
  /** Fraction digits. Default 0. */
  decimals?: number;
  /** Intl locale. Default 'en-US'. */
  locale?: string;
  /** Start when the element scrolls into view (default) vs. on mount. */
  startOnView?: boolean;
}

export interface UseCountUpResult<T extends HTMLElement = HTMLElement> {
  ref: React.RefObject<T | null>;
  value: string;
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Animate a number from 0 up to `target` with an ease-out curve. Starts when
 * the returned ref enters the viewport (unless `startOnView: false`). Honors
 * `prefers-reduced-motion` by rendering the final value immediately. Returns a
 * ref to attach and the formatted display string.
 */
export function useCountUp<T extends HTMLElement = HTMLElement>(
  target: number,
  options: UseCountUpOptions = {}
): UseCountUpResult<T> {
  const {
    durationMs = 1400,
    prefix = '',
    suffix = '',
    decimals = 0,
    locale = 'en-US',
    startOnView = true,
  } = options;

  const ref = useRef<T | null>(null);

  const format = (n: number): string =>
    prefix +
    n.toLocaleString(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) +
    suffix;

  const [display, setDisplay] = useState<string>(() =>
    prefersReducedMotion() ? format(target) : format(0)
  );

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDisplay(format(target));
      return;
    }

    let raf = 0;
    let cancelled = false;

    const run = (): void => {
      const start = performance.now();
      const step = (now: number): void => {
        if (cancelled) return;
        const p = Math.min(1, (now - start) / durationMs);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(format(target * eased));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const node = ref.current;
    if (!startOnView || !node || typeof IntersectionObserver === 'undefined') {
      run();
      return () => {
        cancelled = true;
        cancelAnimationFrame(raf);
      };
    }

    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            io.disconnect();
            run();
            break;
          }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(node);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, durationMs, decimals, prefix, suffix, locale, startOnView]);

  return { ref, value: display };
}
