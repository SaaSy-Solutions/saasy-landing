'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';

/**
 * Initializes PostHog (same project as app.hellosaasy.ai — the default
 * cross-subdomain cookie on .hellosaasy.ai carries one identity from
 * marketing visit through signup) and tracks CTA clicks via a single
 * delegated listener so CTA components can stay server components.
 *
 * CTA contract: any <a data-cta="<source>"> pointing at /signup or
 * /contact-sales is tracked. `plan` is read from the link's ?plan= param.
 */
export function AnalyticsProvider() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;

    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
      person_profiles: 'identified_only',
      capture_pageview: 'history_change',
      capture_pageleave: true,
      disable_session_recording: true,
    });

    const onClick = (event: MouseEvent) => {
      const node = event.target;
      if (!(node instanceof Element)) return;
      const anchor = node.closest('a[data-cta]');
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const source = anchor.dataset.cta ?? 'unknown';
      const url = new URL(anchor.href, window.location.origin);
      // sendBeacon: the click immediately navigates cross-origin, so a
      // normal batched request would be dropped with the page.
      if (url.pathname.includes('/contact-sales')) {
        posthog.capture('contact_sales_clicked', { source }, { transport: 'sendBeacon' });
      } else if (url.pathname.includes('/signup')) {
        posthog.capture(
          'cta_signup_clicked',
          { source, plan: url.searchParams.get('plan') ?? undefined },
          { transport: 'sendBeacon' }
        );
      }
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
