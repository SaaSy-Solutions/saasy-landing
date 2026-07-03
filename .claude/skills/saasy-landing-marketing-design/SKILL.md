---
name: saasy-landing-marketing-design
description: Use when redesigning or adding pages/components to the SaaSy marketing site (saasy-landing repo, hellosaasy.ai) so every page stays visually consistent and honest. Static-export Next.js 15 + Tailwind v4, dark-only theme, locked brand tokens, GitHub Pages deploy. Invoke before editing app/**/*.tsx or app/components/* in that repo.
---

# SaaSy Marketing Site Design (saasy-landing)

> Specialization of `design-taste-frontend` (taste) for the **hellosaasy.ai** marketing site.
> First read this; **also apply taste's universal rules** (no AI tells / em-dash discipline, anti-center bias, hero discipline, layout-repetition ban, real images, Pre-Flight Check). This file overrides taste only where the stack or brand differs.

## 0. Stack — NOT a typical Next app

- Repo: `saasy-landing` (GitHub `SaaSy-Solutions/saasy-landing`). Separate from the product app (tenant-portal) and the platform repo.
- **Next.js 15 App Router + React 19 with `output: "export"`** → fully static. **No** API routes, no server data fetching, no Server Actions, no `next/image` optimization server. Interactivity = client components only.
- **Tailwind v4** — tokens live in `app/globals.css` under `@theme`. There is **no `tailwind.config.js`**; add tokens in the CSS, not a JS config.
- Images go through a custom loader (`lib/image-loader.ts`) because of static export — don't rely on `next/image` optimization.
- **Deploy: GitHub Pages** via `.github/workflows/deploy.yml` — `npm run build` emits `./out`, published on push to `main` (`out/` is gitignored). A broken `npm run build` = broken site, so build before pushing.

## 1. Theme: dark-only — design dark, never use `dark:`

The site is a **single dark theme** (`body` is `saasy-dark` `#1A2435`, text `saasy-text` `#e2e8f0`). There is **no light mode and no `.dark` class**.

- **Never add `dark:` variants** — they do nothing here.
- Build depth by alternating `saasy-dark` (page) and `saasy-card` `#1e293b` (elevated) surfaces.
- Borders `saasy-border` `#2d3a4e`; secondary text `saasy-muted` `#94a3b8`.

## 2. Brand tokens & type (`app/globals.css` `@theme`)

- **Single accent gradient: pink → orange.** `saasy-pink` `#E45074` → `saasy-orange` `#DB6E36` (deep `saasy-rose` `#A4293F` for pressed/hover). Use `.gradient-text` for accented words. **Never introduce a second accent family.**
- Surfaces: `saasy-dark` (page), `saasy-darker` `#111827`, `saasy-card` / `saasy-card-hover` (elevated).
- Accent words use the solid `.accent-word` class (the old pink→orange
  `.gradient-text` and glow utilities were **neutralized** in `globals.css` —
  don't reintroduce them). Sanctioned motion/atmosphere utilities: `LivingGeometry`,
  `Reveal`, `useCountUp`, `.breathe-bar`, `.feed-enter`, `.live-dot` (see §6).
- Font: **Poppins** (`next/font/google`, `--font-poppins`), already wired in `app/layout.tsx`.

## 3. Shared components — edit these for site-wide changes

Chrome and repeated blocks live in `app/components/` — **don't inline your own**:

- `SiteNav` (header/nav) and `MarketingFooter` (footer): change them once to update every page.
- Building blocks: `Hero`, `HeroScreenshot`, `FeatureCard`, `FeatureShowcase`, `Pricing`, `FAQ`, `SocialProof`, `TrustBadge`, `WhoItsFor`, `BlogHighlights`, `ConsultingPromo`, `EmailCapture`, `ScreenshotCallout`, `Icons`.
- **Keep the marketing nav in lockstep with the product app's `PublicNav`** (tenant-portal `components/PublicNav.tsx`). They drifted once; change both together.

## 4. SEO & metadata — PRESERVE

- Each page sets Next `metadata` (title/description/canonical/OpenGraph/Twitter) plus a JSON-LD `application/ld+json` script (see `app/layout.tsx` + per page). Keep these **verbatim** unless explicitly changing them — SEO regression is the #1 redesign risk.
- Canonical tagline: **"SaaSy — Your Intelligent Business Co-Founder"** (matches the product app; not "AI").

## 5. HONESTY — non-negotiable

We are in **public beta with no real customers or published metrics yet**. The pass that cleaned this up was saasy-landing **PR #4**. Do NOT reintroduce:

- ❌ Compliance/cert claims we don't hold — **no "SOC 2 Compliant"**, no "audited" / "penetration testing" claims.
- ❌ Uptime/SLA numbers we don't contractually offer — no "99.9% Uptime SLA".
- ❌ Fabricated **testimonials, named customers, logos, or metrics** ("$380K saved", "2,400 accounts", "200+ founders", "thousands of entrepreneurs", "78% precision"). Use private-beta / design-partner framing (`SocialProof` is the reference) and clearly-illustrative use-case scenarios.
- ✅ True/defensible claims OK: encryption in transit & at rest (AES-256 / TLS via Neon/Fly), per-tenant isolation, GDPR-ready (backed by the privacy-policy rights section), real product capabilities (health scoring, churn prediction, proactive alerts, compliance tracking).
- Any number must be true and non-fake-precise, or cut it.

## 6. Motion — the "Living Surface" system

On-brand motion is **CSS-first, zero-dependency**. Two primitives (mirrored
from `@saas-platform/ui-core`; keep them in lockstep):

- **`LivingGeometry`** (`app/components/LivingGeometry.tsx`) — ambient drifting
  geometric shapes + dot-grid at ≤8% opacity. Use `variant="hero"` behind heroes,
  `variant="section"` faintly behind alternating sections. **Geometry whispers:**
  never place it behind dense data.
- **Breathing** — `useCountUp` (`lib/useCountUp.ts`) for numbers, `.breathe-bar`
  for bars, `.feed-enter`/`.live-dot` for live feeds, `<Reveal>` for staggered
  scroll reveals (replaces the old single `fade-up`).

Rules: **no Motion/GSAP or any animation library**; every effect respects
`prefers-reduced-motion` and renders complete without JS. **"Geometric shapes,
not glows" — aurora/glow/mesh-gradient backgrounds stay banned.** Keep it
restrained (technical-buyer audience). Canonical spec:
`saas-platform/docs/brand/MOTION_AND_ATMOSPHERE.md`.

## 7. Per-page checklist

1. `git fetch && git pull --ff-only`; branch; edit `app/**/*.tsx` (page or component).
2. Reuse `SiteNav` / `MarketingFooter` + shared components; don't inline chrome.
3. Design dark (no `dark:`); build on `saasy-dark` / `saasy-card`; single pink→orange accent.
4. Preserve metadata + JSON-LD; keep the canonical tagline.
5. Run the HONESTY check (§5) — zero fabricated metrics/testimonials/compliance claims.
6. Run taste's **Pre-Flight Check** (em-dash / AI tells, hero discipline, no 3-equal-card repetition, real images).
7. `npm run build` succeeds (static export to `out/`); serve and eyeball.
8. Commit `app/*` together; push to `main` (or PR) — GitHub Pages deploys `out/` automatically.
