/**
 * Marketing videos are hosted on Tigris (Fly's S3-compatible object storage),
 * not committed to this repo — keeps ~20MB of binaries out of the GitHub Pages
 * build. Bucket: `saasy-marketing-assets` (public). Source + render pipeline
 * live in `video/`; re-upload after re-rendering (see video/README.md).
 *
 * NOTE: anonymous reads must use Tigris's public domain (`*.t3.tigrisfiles.io`),
 * NOT the `fly.storage.tigris.dev` S3 API endpoint — the latter requires auth
 * and returns 403 to browsers.
 */
const VIDEO_BASE =
  "https://saasy-marketing-assets.t3.tigrisfiles.io/videos";

export function videoUrl(name: string): string {
  return `${VIDEO_BASE}/${name}`;
}
