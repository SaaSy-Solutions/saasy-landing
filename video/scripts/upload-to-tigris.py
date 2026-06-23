"""Upload rendered marketing MP4s to the public Tigris bucket.

The site references these by URL (see app/components/videoAssets.ts), so they
are NOT committed to the repo. Re-run after re-rendering.

Usage:
    # creds come from `flyctl storage` output / the Tigris dashboard — never
    # commit them. Render first (npm run render:all -> video/out/*.mp4), then:
    AWS_ACCESS_KEY_ID=... AWS_SECRET_ACCESS_KEY=... \
    AWS_ENDPOINT_URL_S3=https://fly.storage.tigris.dev \
    BUCKET_NAME=saasy-marketing-assets \
    uv run --with boto3 --no-project python scripts/upload-to-tigris.py

Reads MP4s from ./out by default (override with VIDEO_DIR).
"""

import os
import pathlib

import boto3

BUCKET = os.environ["BUCKET_NAME"]
ENDPOINT = os.environ["AWS_ENDPOINT_URL_S3"]
VIDEO_DIR = pathlib.Path(os.environ.get("VIDEO_DIR", "out"))

s3 = boto3.client("s3", endpoint_url=ENDPOINT, region_name="auto")

uploaded = 0
for mp4 in sorted(VIDEO_DIR.glob("*.mp4")):
    key = f"videos/{mp4.name}"
    s3.upload_file(
        str(mp4),
        BUCKET,
        key,
        ExtraArgs={
            "ContentType": "video/mp4",
            "CacheControl": "public, max-age=31536000, immutable",
        },
    )
    url = f"https://{BUCKET}.fly.storage.tigris.dev/{key}"
    print(f"uploaded {mp4.name} ({mp4.stat().st_size // 1024} KB) -> {url}")
    uploaded += 1

if uploaded == 0:
    raise SystemExit(f"no .mp4 files found in {VIDEO_DIR.resolve()} — render first")
print(f"done ({uploaded} files)")
