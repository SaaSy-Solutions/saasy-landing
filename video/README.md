# SaaSy marketing videos (Remotion)

Programmatic, brand-consistent marketing videos for hellosaasy.ai. Self-contained
Remotion project — its own `package.json` / `node_modules`, isolated from the
Next.js site. Renders MP4s that are **hosted on Tigris** (Fly's S3-compatible
object storage, bucket `saasy-marketing-assets`, public) and referenced by URL on
the site via plain `<video>` tags — so the binaries stay out of the GitHub Pages
repo and the static build stays small. The site's URL base lives in
`app/components/videoAssets.ts`.

Design spec: `../docs/superpowers/specs/2026-06-23-remotion-marketing-videos-design.md`

> **Licensing:** Remotion is free for individuals and small teams but requires a
> paid **company license** for organizations above a size threshold. Review the
> terms before using these renders commercially: https://remotion.dev/license

## Structure

```
src/
  brand/            shared brand kit (colors, Poppins, gradient text, counters,
                    screenshot cards, callouts, captions) — lifted from the
                    site's app/globals.css so videos read as the same product
  HeroLoop.tsx      30s hero demo loop (1920x1080)        -> HeroLoop
  FeatureLoop.tsx   6s feature micro-loop (1080x1080)     -> FeatureHealth/Churn/Ask
  SocialAd.tsx      15s social ad (vertical + square)     -> SocialVertical/Square
  HowItWorks.tsx    75s explainer (1920x1080)             -> HowItWorks
  OgCard.tsx        1200x630 share-card still (per page)  -> OgCard  (--props)
  BlogTeaser.tsx    10s per-post teaser (1080x1080)       -> BlogTeaser (--props)
  FeatureClip.tsx   6s text-free feature clip (1200x900)  -> FeatureClip (--props)
  WhatsNew.tsx      12s release clip (1280x720)           -> WhatsNew
  ConnectLoop.tsx   8s integrations loop (1280x720)       -> ConnectLoop
  data/posts.ts     blog metadata mirror (OG + teasers)
  Root.tsx          registers every composition
scripts/
  render-all.mjs        render every still + clip into out/ (per-variant --props)
  upload-to-tigris.py   upload out/ to the bucket (og/ -> og/, rest -> videos/)
public/screenshots/ real demo-tenant screenshots (copied from ../public)
```

Where these land on the site:
- OG cards → `<page>` `metadata.openGraph.images` via `app/components/ogAssets.ts`
  (one per marketing page + per blog post; served at `assets.hellosaasy.ai/og/`).
- FeatureClip → `/features` rows (`FeatureShowcase video=` prop).
- WhatsNew → `/changelog`; ConnectLoop → `/integrations`.
- BlogTeaser → distribution assets (post on X/LinkedIn) at `…/videos/blog/`.

## Preview

```bash
npm run dev          # opens Remotion Studio - scrub/preview every composition
```

## Render + publish

Render into the gitignored `out/` folder, then upload to Tigris. The site picks
up the new files automatically (same URLs; `immutable` cache, so re-renders are
overwrites — hard-refresh to bust a browser cache during review).

**All OG cards + clips at once** (then upload):

```bash
node scripts/render-all.mjs      # -> out/og/*.png, out/blog/*.mp4, out/*.mp4
# then the upload command below (uploads og/ + videos/ in one pass)
```

**The core marketing videos individually:**

```bash
mkdir -p out
npx remotion render HeroLoop       out/hero-loop.mp4
npx remotion render FeatureHealth  out/feature-health.mp4
npx remotion render FeatureChurn   out/feature-churn.mp4
npx remotion render FeatureAsk     out/feature-ask.mp4
npx remotion render SocialVertical out/social-vertical.mp4
npx remotion render SocialSquare   out/social-square.mp4
npx remotion render HowItWorks     out/how-it-works.mp4

# Upload (creds from `flyctl storage` output / Tigris dashboard — never commit):
AWS_ACCESS_KEY_ID=... AWS_SECRET_ACCESS_KEY=... \
AWS_ENDPOINT_URL_S3=https://fly.storage.tigris.dev \
BUCKET_NAME=saasy-marketing-assets \
uv run --with boto3 --no-project python scripts/upload-to-tigris.py
```

The bucket was provisioned with `flyctl storage create -n saasy-marketing-assets
-o personal --public`. Public reads are served over the branded custom domain:
`https://assets.hellosaasy.ai/videos/<file>.mp4`

That's a **DNS-only** (un-proxied) Cloudflare CNAME
`assets` → `saasy-marketing-assets.t3.tigrisbucket.io`, registered on the bucket
via `flyctl storage update saasy-marketing-assets --custom-domain
assets.hellosaasy.ai`; Tigris issues/renews the TLS cert through that CNAME, so
it must stay DNS-only (orange-cloud proxying breaks cert renewal). The raw Tigris
public domain (`saasy-marketing-assets.t3.tigrisfiles.io`) also works; the
`fly.storage.tigris.dev` S3 API endpoint does NOT (it requires auth, 403s in a
browser).

Quick one-frame sanity check (no full render):

```bash
npx remotion still HeroLoop /tmp/check.png --frame=360 --scale=0.4
```

## Where each video is used

| Video               | Site placement                                              |
| ------------------- | ----------------------------------------------------------- |
| `hero-loop.mp4`     | Hero - `app/components/HeroVideo.tsx` (autoplay/muted/loop)  |
| `feature-*.mp4`     | Feature rows - optional `video` prop on `FeatureShowcase`    |
| `social-*.mp4`      | Downloadable ad assets for LinkedIn / X / IG                |
| `how-it-works.mp4`  | Destination for the hero's "See how it works" CTA           |

## Re-capturing screenshots

The compositions read screenshots from `public/screenshots/`. When the product
UI changes, re-capture from the demo tenant into `../public/screenshots/`, then:

```bash
cp ../public/screenshots/*.png public/screenshots/
```

and re-render.

## Audio (optional, not shipped)

All videos ship **silent + on-screen captions** (hero/feature/social autoplay
muted anyway). To add a music bed or voiceover:

- **SocialAd** / **HowItWorks** have a commented `<Audio>` hook - drop an mp3 in
  `public/`, uncomment, and re-render.
- Voiceover can be generated with ElevenLabs (see the remotion-best-practices
  `voiceover` rule); needs an API key.
