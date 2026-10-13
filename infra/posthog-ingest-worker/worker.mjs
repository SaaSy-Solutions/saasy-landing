// First-party PostHog proxy for hellosaasy.ai, bound to the route
// hellosaasy.ai/ingest/* on the (already Cloudflare-proxied) zone.
// The marketing site is a static GitHub Pages export, so it cannot host the
// Next.js rewrite the app uses; this Worker is the same mapping:
//   /ingest/static/* -> https://us-assets.i.posthog.com/static/*
//   /ingest/*        -> https://us.i.posthog.com/*

const API_HOST = 'us.i.posthog.com';
const ASSET_HOST = 'us-assets.i.posthog.com';
const PREFIX = '/ingest';

export function upstreamUrl(requestUrl) {
  const url = new URL(requestUrl);
  if (url.pathname !== PREFIX && !url.pathname.startsWith(`${PREFIX}/`)) {
    return null;
  }
  const path = url.pathname.slice(PREFIX.length) || '/';
  const host = path.startsWith('/static/') ? ASSET_HOST : API_HOST;
  return `https://${host}${path}${url.search}`;
}

export async function proxy(request, fetchImpl = fetch) {
  const target = upstreamUrl(request.url);
  if (!target) {
    return new Response('Not found', { status: 404 });
  }
  const headers = new Headers(request.headers);
  // PostHog needs no site cookies; never forward them to a third party.
  headers.delete('cookie');
  headers.delete('host');
  const clientIp = request.headers.get('cf-connecting-ip');
  if (clientIp) {
    headers.set('x-forwarded-for', clientIp);
  }
  const hasBody = request.method !== 'GET' && request.method !== 'HEAD';
  return fetchImpl(target, {
    method: request.method,
    headers,
    body: hasBody ? request.body : undefined,
    redirect: 'manual',
  });
}

export default {
  fetch(request) {
    return proxy(request);
  },
};
