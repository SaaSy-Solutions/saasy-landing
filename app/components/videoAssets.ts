/**
 * Marketing videos are hosted on Tigris (Fly's S3-compatible object storage),
 * not committed to this repo — keeps ~20MB of binaries out of the GitHub Pages
 * build. Bucket: `saasy-marketing-assets` (public). Source + render pipeline
 * live in `video/`; re-upload after re-rendering (see video/README.md).
 *
 * Served via the branded custom domain `assets.hellosaasy.ai`, a DNS-only
 * (un-proxied) Cloudflare CNAME → `saasy-marketing-assets.t3.tigrisbucket.io`
 * with a Tigris-issued TLS cert. This is vendor-neutral: moving off Tigris later
 * is a one-line DNS change, no site edits. (The raw `*.t3.tigrisfiles.io` public
 * domain also works; the `fly.storage.tigris.dev` S3 endpoint does NOT — it
 * requires auth and 403s in a browser.)
 */
import mediaRev from "../../video/media-rev.json";

const VIDEO_BASE = "https://assets.hellosaasy.ai/videos";

/** Raw URL for a self-versioned filename (e.g. the stamped whats-new clip). */
export function videoUrl(name: string): string {
  return `${VIDEO_BASE}/${name}`;
}

/**
 * URL for a core marketing video, stamped with the current media rev.
 *
 * Objects are uploaded with `Cache-Control: immutable, max-age=1y`, so
 * overwriting a filename in place never propagates past the Tigris edge —
 * stale footage keeps playing under the fresh poster (learned the hard way
 * when the demo-tenant reshoot shipped but the old $0-MRR clips kept
 * serving). Bump `video/media-rev.json` on every reshoot; the render
 * pipeline stamps the uploaded filenames with the same rev.
 */
export function revVideoUrl(base: string): string {
  return `${VIDEO_BASE}/${base.replace(/\.mp4$/, `-${mediaRev.rev}.mp4`)}`;
}
