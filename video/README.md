# SaaSy marketing videos (Remotion)

Programmatic, brand-consistent marketing videos for hellosaasy.ai. Self-contained
Remotion project — its own `package.json` / `node_modules`, isolated from the
Next.js site. Renders MP4s into `../public/videos/`, embedded on the site as
plain `<video>` tags (no `@remotion/player`, so the static GitHub-Pages build
stays lightweight).

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
  Root.tsx          registers every composition
public/screenshots/ real demo-tenant screenshots (copied from ../public)
```

## Preview

```bash
npm run dev          # opens Remotion Studio - scrub/preview every composition
```

## Render (outputs to ../public/videos/)

```bash
npx remotion render HeroLoop       ../public/videos/hero-loop.mp4
npx remotion render FeatureHealth  ../public/videos/feature-health.mp4
npx remotion render FeatureChurn   ../public/videos/feature-churn.mp4
npx remotion render FeatureAsk     ../public/videos/feature-ask.mp4
npx remotion render SocialVertical ../public/videos/social-vertical.mp4
npx remotion render SocialSquare   ../public/videos/social-square.mp4
npx remotion render HowItWorks     ../public/videos/how-it-works.mp4
```

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
