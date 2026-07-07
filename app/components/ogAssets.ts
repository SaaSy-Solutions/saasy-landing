/**
 * Open Graph / social share images, rendered by Remotion (video/src/OgCard.tsx)
 * and hosted on the branded asset domain (same Tigris bucket as the videos).
 * One card per marketing page + per blog post; see video/README.md to re-render.
 */
const OG_BASE = "https://assets.hellosaasy.ai/og";

/** Metadata image descriptor for a named card (e.g. "home", "features"). */
export function ogImage(name: string, alt = "SaaSy — the AI-powered back office for small business") {
  return { url: `${OG_BASE}/${name}.png`, width: 1200, height: 630, alt };
}

/** Per-blog-post card (video/src/OgCard.tsx renders `blog-<slug>.png`). */
export function ogImageForPost(slug: string, alt: string) {
  return ogImage(`blog-${slug}`, alt);
}
