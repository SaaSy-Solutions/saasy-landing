"""Upload rendered marketing assets to the public Tigris bucket.

The site references these by URL (see app/components/videoAssets.ts and
ogAssets.ts), so they are NOT committed to the repo. Re-run after re-rendering.

Usage:
    # creds come from `flyctl storage` output / the Tigris dashboard — never
    # commit them. Render first (node scripts/render-all.mjs -> video/out/),
    # then:
    AWS_ACCESS_KEY_ID=... AWS_SECRET_ACCESS_KEY=... \
    AWS_ENDPOINT_URL_S3=https://fly.storage.tigris.dev \
    BUCKET_NAME=saasy-marketing-assets \
    uv run --with boto3 --no-project python scripts/upload-to-tigris.py

Maps the ./out tree to bucket keys (override the root dir with VIDEO_DIR):
    out/og/*.png        -> og/<file>           (image/png)
    out/blog/*.mp4      -> videos/blog/<file>  (video/mp4)
    out/*.mp4           -> videos/<file>       (video/mp4)
Public reads are served via the branded custom domain (assets.hellosaasy.ai).
"""

import os
import pathlib

import boto3

BUCKET = os.environ["BUCKET_NAME"]
ENDPOINT = os.environ["AWS_ENDPOINT_URL_S3"]
ROOT = pathlib.Path(os.environ.get("VIDEO_DIR", "out"))
CACHE = "public, max-age=31536000, immutable"

s3 = boto3.client("s3", endpoint_url=ENDPOINT, region_name="auto")


def upload(path: pathlib.Path, key: str, content_type: str) -> None:
    s3.upload_file(
        str(path), BUCKET, key,
        ExtraArgs={"ContentType": content_type, "CacheControl": CACHE},
    )
    print(f"  {path}  ->  https://assets.hellosaasy.ai/{key}")


def collect():
    """Yield (path, key, content_type) for every asset under ROOT."""
    for png in sorted((ROOT / "og").glob("*.png")):
        yield png, f"og/{png.name}", "image/png"
    for mp4 in sorted((ROOT / "blog").glob("*.mp4")):
        yield mp4, f"videos/blog/{mp4.name}", "video/mp4"
    for mp4 in sorted(ROOT.glob("*.mp4")):
        yield mp4, f"videos/{mp4.name}", "video/mp4"


count = 0
for path, key, ctype in collect():
    upload(path, key, ctype)
    count += 1

if count == 0:
    raise SystemExit(f"no assets found under {ROOT.resolve()} — render first")
print(f"done ({count} assets)")
