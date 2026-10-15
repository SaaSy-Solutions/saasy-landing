/**
 * Marketing videos are hosted on Cloudflare R2 (S3-compatible object storage),
 * not committed to this repo — keeps ~20MB of binaries out of the GitHub Pages
 * build. Bucket: `saasy-marketing-assets` (public). Source + render pipeline
 * live in `video/`; re-upload after re-rendering (see video/README.md).
 *
 * Served via the branded custom domain `assets.hellosaasy.ai`, an R2 custom
 * domain on the bucket (Cloudflare-managed DNS and TLS). Moved off Tigris on
 * 2026-10-05; the domain stayed the same, so no site edits were needed. The
 * R2 S3 API endpoint is not a public URL: it requires auth.
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
 * overwriting a filename in place never propagates past the CDN edge —
 * stale footage keeps playing under the fresh poster (learned the hard way
 * when the demo-tenant reshoot shipped but the old $0-MRR clips kept
 * serving). Bump `video/media-rev.json` on every reshoot; the render
 * pipeline stamps the uploaded filenames with the same rev.
 */
export function revVideoUrl(base: string): string {
  return `${VIDEO_BASE}/${base.replace(/\.mp4$/, `-${mediaRev.rev}.mp4`)}`;
}
