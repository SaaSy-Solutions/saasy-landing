import { loadFont } from "@remotion/google-fonts/Poppins";
import { Easing } from "remotion";

// Poppins matches the marketing site (app/globals.css --font-poppins).
const { fontFamily: poppins } = loadFont();

/**
 * Brand tokens lifted verbatim from saasy-landing/app/globals.css so the
 * videos read as the same product as the site.
 */
export const COLORS = {
  dark: "#1A2435",
  darker: "#111827",
  card: "#1e293b",
  cardHover: "#263045",
  border: "#2d3a4e",
  pink: "#E45074",
  rose: "#A4293F",
  orange: "#DB6E36",
  text: "#e2e8f0",
  muted: "#94a3b8",
  white: "#ffffff",
} as const;

export const FONT = poppins;

/** pink → orange, the brand's signature gradient (matches .gradient-text). */
export const BRAND_GRADIENT = `linear-gradient(120deg, ${COLORS.pink}, ${COLORS.orange})`;

/** Smooth ease-out used for most entrances (matches the site's feel). */
export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);

/** Gentle in-out for looping / breathing motion. */
export const EASE_IN_OUT = Easing.bezier(0.45, 0, 0.55, 1);
