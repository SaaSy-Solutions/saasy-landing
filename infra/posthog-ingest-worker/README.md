# PostHog `/ingest` Worker for hellosaasy.ai

The marketing site is a static export on GitHub Pages, behind the Cloudflare
proxy for `hellosaasy.ai`. GitHub Pages cannot proxy, so this Worker serves the
same first-party `/ingest` route the app (`app.hellosaasy.ai`) gets from its
Next.js rewrites.

Deploy it **before** a site build that points PostHog at `/ingest`, or analytics
traffic 404s until it is live:

```sh
cd infra/posthog-ingest-worker
npx wrangler@4 deploy
curl -sS -o /dev/null -w '%{http_code}\n' https://hellosaasy.ai/ingest/decide/?v=3
```

The last line should print a PostHog status (200 or 4xx from PostHog), not the
site's 404 page. Deploying needs a Cloudflare token with Workers Scripts:Edit
and Zone Workers Routes:Edit on the `hellosaasy.ai` zone. It is deployed outside
`deploy.yml` on purpose: the release workflow guard forbids Cloudflare there.
