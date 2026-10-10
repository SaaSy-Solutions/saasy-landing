/**
 * Base URL for the platform's public capture endpoints.
 *
 * The marketing site is a static export (GitHub Pages) with no server,
 * so forms POST cross-origin to the operations service, which exposes
 * public, CORS-enabled routes through the current API gateway:
 *   - POST /api/v1/contact/sales
 *   - POST /api/v1/marketing/newsletter
 *   - POST /api/v1/marketing/sms-consent
 */
export const OPS_API_BASE =
  process.env.NEXT_PUBLIC_OPS_API_BASE ?? "https://api.hellosaasy.ai";
