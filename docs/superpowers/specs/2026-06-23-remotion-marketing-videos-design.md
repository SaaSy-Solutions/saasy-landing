# SaaSy Marketing Video System (Remotion) — Design

**Date:** 2026-06-23
**Repo:** saasy-landing (marketing site, hellosaasy.ai)
**Status:** Approved scope — building all four deliverables.

## Goal

Add motion to the marketing site, which today relies on static PNG screenshots
with JSX callout arrows. Build a small, brand-consistent **video system** in
Remotion that renders MP4s into `public/videos/`, embedded as plain `<video>`
tags. Pre-rendered MP4 (not the live `@remotion/player`) keeps the static
GitHub-Pages site lightweight.

## Where video goes on the site (recommendation map)

1. **Hero demo loop** — replaces/augments `HeroScreenshot`. Highest visibility;
   master asset the other cuts derive from.
2. **Feature micro-loops** — drop into `FeatureShowcase` rows, replacing static
   feature screenshots.
3. **Social ad cuts (9:16 + 1:1)** — downloadable assets for LinkedIn/X/IG.
4. **"How it works" explainer** — destination for the hero's secondary
   `See how it works` CTA.

## Brand kit (from `app/globals.css`)

- Colors: dark `#1A2435`, darker `#111827`, card `#1e293b`, border `#2d3a4e`,
  pink `#E45074`, rose `#A4293F`, orange `#DB6E36`, text `#e2e8f0`, muted `#94a3b8`.
- Gradient: pink → orange (text + accents).
- Font: **Poppins** (loaded via `@remotion/google-fonts`).
- Screenshots (real, from demo tenant): all 1195×900 except `ask-saasy.png`
  (1195×500). Copied into `video/public/screenshots/`.

## Architecture

Standalone Remotion project at `saasy-landing/video/` (own `package.json` /
`node_modules`, isolated from the Next site). Renders MP4s to `../public/videos/`.

### Shared kit — `video/src/brand/`
- `theme.ts` — color tokens, Poppins loader, spacing/easing constants.
- `BrandBackground.tsx` — animated radial-gradient dark bg + subtle grid,
  mirroring `.hero-gradient`.
- `GradientText.tsx` — pink→orange gradient headline text.
- `StatCounter.tsx` — animated number counter via `interpolate`.
- `ScreenshotCard.tsx` — glow-bordered rounded card wrapping `<Img>`, optional
  entrance animation.
- `Callout.tsx` — animated pill + arrow (motion version of `ScreenshotCallout`).
- `Caption.tsx` — fade/slide-up caption line.

### Compositions — `video/src/`
1. **HeroLoop** `1920×1080 @30fps ≈30s` — logo+headline reveal → journey beats →
   dashboard screenshot + animated callout + health counter → churn-alert beat →
   Ask SaaSy typing beat → CTA card. **Silent + on-screen captions**, loop-friendly.
2. **FeatureLoop** `1080×1080 @30fps ≈6s`, **Zod-parameterized** variants
   `health | churn | ask`. Rendered 3×.
3. **SocialAd** `@30fps ≈15s`, **Zod-parameterized** `format = vertical (1080×1920) |
   square (1080×1080)`. Hook → 2 screenshots → CTA. Commented `<Audio>` music hook.
4. **HowItWorks** `1920×1080 @30fps ≈75s` — 4 steps (Connect → Watch → Act →
   Grow). Silent + captions now; clearly-marked optional `<Audio>` voiceover/music
   hook for later.

## Audio decision

Ship **silent + on-screen captions** for all four. Hero/feature/social autoplay
muted by browser policy anyway, so captions carry the story — no TTS or music
licensing blockers, and it looks premium. `HowItWorks` and `SocialAd` include a
commented `<Audio src={staticFile('...')}/>` hook so a music bed or ElevenLabs
voiceover can be dropped in later (noted as an enhancement needing an API key /
licensed track — intentionally not built now to avoid blocking).

## Animation rules (per remotion-best-practices)

`useCurrentFrame()` + `interpolate()` with `Easing.bezier` for all motion.
Individual transform props (`scale`/`translate`), never composed transform
strings. **No CSS transitions/animations, no Tailwind animation classes.**

## Wiring into the site

- Hero: `<video autoPlay muted loop playsInline poster="/screenshots/dashboard-hero.png">`
  with the PNG as poster/fallback, sitting in `HeroScreenshot`.
- Feature rows: optional `video` prop on `FeatureShowcase`.
- Social + explainer: rendered to `public/videos/`, linked from the site / used
  as downloadable assets.
- Render commands documented in `video/README.md`.

## Out of scope (YAGNI)

Live `@remotion/player` embeds, AI voiceover generation, music licensing,
multi-language captions, automated CI rendering.
