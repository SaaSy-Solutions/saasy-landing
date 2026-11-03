# Small Business Saturday 2026

The campaign route is `/small-business-saturday`. The static export presents the
exact eligibility dates before JavaScript runs; the browser then shows upcoming,
active, or ended messaging without requiring another deployment. These UI dates
never grant eligibility: the app decides from the persisted signup timestamp.

The window is November 28, 2026 at 00:00 Eastern through December 1 at 00:00
Eastern, exclusive. Each qualifying signup's offer ends exactly 90 days later,
including the normal 14-day trial. The campaign is monthly only.

The three tagged links use `src=macon-linkedin`, `src=company-linkedin`, and
`src=company-facebook`. Plan links carry `plan=starter|growth|scale`,
`billing=monthly`, and a recognized source to `app.hellosaasy.ai/signup`.
Unknown sources are omitted. Consent-gated `cta_signup_clicked` analytics include
`campaign_source`; standard pageviews retain the tagged URL. No source is needed
for eligibility.

## Verification

Run `pnpm --dir tests/cookie-ui install --frozen-lockfile`, then
`pnpm --dir tests/cookie-ui test` and `pnpm --dir tests/cookie-ui typecheck`.
The campaign tests cover the exact Eastern boundaries, selected plan/source
handoff, the Friday warning, active prices, and expired-offer removal. The
analytics test checks tagged attribution after consent.

Run `pnpm build` and serve `out` with a static server on port 4182. Then run
`node scripts/check-small-business-saturday.mjs` with Playwright installed.
`CAMPAIGN_BASE_URL` selects another local or deployed artifact URL;
`PLAYWRIGHT_MODULE` can name an existing Playwright module path and
`PLAYWRIGHT_CHROMIUM_EXECUTABLE` can select an installed Chromium. The script
checks 24 browser scenarios and writes desktop/mobile captures under
`.impeccable/review/`.

## Release

Do not merge/publish this page until the app's eligibility, Starter access, and
Stripe discounts are verified. After required PR checks pass, merging to `main`
triggers `.github/workflows/deploy.yml`, which builds the static export and
publishes it to GitHub Pages. Verify all three tagged URLs on hellosaasy.ai after
deployment, then verify the app signup and Stripe subscription end to end.

This landing-page change does not configure Stripe or certify the billing flow.
