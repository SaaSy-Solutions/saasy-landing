# Product screenshots

Marketing screenshots for hellosaasy.ai. Captured from the production
demo tenant (Acme Outdoor Co) so they reflect real product behavior
without exposing customer data.

## Re-capture procedure

When the UI drifts (~quarterly), re-capture with these steps:

1. Log in to `https://app.hellosaasy.ai` as
   `abynight2308+saasydemo@gmail.com`. Password is in
   `~/.claude/projects/-home-rclan-code-saas-platform/memory/reference_demo_account.md`
   (or ask the founder).
2. Set browser viewport to **1440x900**.
3. Capture each route below at the listed filename. Wait for all
   spinners to settle before capture.
4. PII-audit each capture: no real customer emails, no real names,
   no internal admin URLs.
5. Crop the sidebar out using ImageMagick:
   ```
   convert <file> -crop 1195x900+245+0 +repage <file>
   ```
   (For `ask-saasy.png`, use `1195x500+245+0` to trim bottom whitespace too.)
6. Optimize with `pngquant --quality=70-85 --speed=1 --force`.

## Files

| Filename               | URL                              | Notes                                                    |
|------------------------|----------------------------------|----------------------------------------------------------|
| `dashboard-hero.png`   | `/dashboard/health`              | Above-the-fold; goes in landing page Hero. Substituted for `/dashboard` (Command Center) which is broken on the demo tenant. |
| `churn-alerts.png`     | `/dashboard/health` (scrolled)   | Full grid of 12 customer cards with color-coded health scores. |
| `customer-detail.png`  | `/dashboard/crm/companies/<id>`  | Sundial Bakery detail view (clicked from companies table). |
| `ask-saasy.png`        | `/dashboard/ask-saasy`           | Welcome state with 3 quick-prompts (the backend prompt-response is broken on the demo tenant — see follow-up issues). |
| `integrations.png`     | `/dashboard/integrations`        | Stripe + HubSpot + Salesforce connector cards. |

## Known demo-tenant gaps

These pages couldn't be captured cleanly because the demo tenant has known wiring issues:

- `/dashboard` (Command Center) shows zeros despite Health page having data.
- `/dashboard/customers/at-risk` returns empty list despite 6 at-risk customers on Health.
- `/dashboard/ask-saasy` returns "Sorry, I had trouble processing that" for prompts.

These are tracked as follow-up issues on the saas-platform repo.

## Annotations

Annotations are JSX overlays in
`app/components/ScreenshotCallout.tsx`, NOT baked into PNGs. This
lets us re-position labels without re-capturing.
