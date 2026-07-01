/**
 * Base URL for the platform's public capture endpoints.
 *
 * The marketing site is a static export (GitHub Pages) with no server,
 * so forms POST cross-origin to the operations service, which exposes
 * public, CORS-enabled routes for exactly these surfaces:
 *   - POST /api/v1/marketing/newsletter
 *   - POST /api/v1/marketing/sms-consent
 */
export const OPS_API_BASE =
  process.env.NEXT_PUBLIC_OPS_API_BASE ?? "https://saasy-operations.fly.dev";
