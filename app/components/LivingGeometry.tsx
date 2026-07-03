import * as React from 'react';

export type LivingGeometryVariant = 'hero' | 'section' | 'chrome' | 'auth';

export interface LivingGeometryProps {
  /** Preset controlling shape count, opacity and scale. Default 'section'. */
  variant?: LivingGeometryVariant;
  /** 0..1 multiplier on the preset opacity for fine control. */
  intensity?: number;
  className?: string;
}

/**
 * Ambient, on-brand background: a fine dot-grid plus a few slow-drifting
 * outlined geometric shapes at very low opacity. Pure CSS (see globals.css
 * `.lg-*`), zero JS, SSR/Worker-safe. Decorative only — `aria-hidden` and
 * `pointer-events-none`. Freezes under `prefers-reduced-motion`.
 *
 * "Geometry whispers, data breathes": never place this behind dense data.
 */
export function LivingGeometry({
  variant = 'section',
  intensity,
  className = '',
}: LivingGeometryProps): React.ReactElement {
  const style =
    intensity != null
      ? ({ '--lg-intensity': String(intensity) } as React.CSSProperties)
      : undefined;

  return (
    <div
      aria-hidden="true"
      data-variant={variant}
      className={`lg-root lg-${variant} ${className}`.trim()}
      style={style}
    >
      <span className="lg-grid" />
      <span className="lg-shape lg-shape-1" />
      <span className="lg-shape lg-shape-2" />
      <span className="lg-shape lg-shape-3" />
      <span className="lg-shape lg-shape-4" />
    </div>
  );
}
