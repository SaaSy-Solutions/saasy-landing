import { loadFont } from "@remotion/google-fonts/Poppins";
import { Easing } from "remotion";

// Poppins matches the marketing site (app/globals.css --font-poppins).
const { fontFamily: poppins } = loadFont();

/**
 * Brand tokens lifted verbatim from saasy-landing/app/globals.css so the
 * videos read as the same product as the site. The AA tints (rose-bright,
 * pink-soft) come from the site's @theme block.
 */
export const COLORS = {
  dark: "#1A2435",
  darker: "#111827",
  card: "#1e293b",
  cardHover: "#263045",
  border: "#2d3a4e",
  pink: "#E45074",
  pinkSoft: "#F07E9B",
  rose: "#A4293F",
  roseBright: "#B93A52",
  orange: "#DB6E36",
  text: "#e2e8f0",
  muted: "#94a3b8",
  white: "#ffffff",
} as const;

export const FONT = poppins;

/** Smooth ease-out used for most entrances (matches the site's feel). */
export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);

/** Gentle in-out for looping / breathing motion. */
export const EASE_IN_OUT = Easing.bezier(0.45, 0, 0.55, 1);
