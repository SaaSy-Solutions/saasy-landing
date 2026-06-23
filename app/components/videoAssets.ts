/**
 * Marketing videos are hosted on Tigris (Fly's S3-compatible object storage),
 * not committed to this repo — keeps ~20MB of binaries out of the GitHub Pages
 * build. Bucket: `saasy-marketing-assets` (public). Source + render pipeline
 * live in `video/`; re-upload after re-rendering (see video/README.md).
 */
const VIDEO_BASE =
  "https://saasy-marketing-assets.fly.storage.tigris.dev/videos";

export function videoUrl(name: string): string {
  return `${VIDEO_BASE}/${name}`;
}
