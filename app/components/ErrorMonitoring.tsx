'use client';

import { useEffect } from 'react';

let initialized = false;

/**
 * Browser-only Sentry error reporting. The site is a static export
 * (`output: 'export'`), so there is no server/edge runtime to instrument and
 * @sentry/nextjs build hooks are not used. Does nothing unless
 * NEXT_PUBLIC_SENTRY_DSN is set at build time (only main deploy builds get it).
 * The SDK is loaded lazily so pages built without a DSN never download it.
 * No session replay, tracing or default PII; Sentry sets no cookies.
 */
export function ErrorMonitoring() {
  useEffect(() => {
    const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
    if (!dsn || initialized) return;
    initialized = true;
    void import('@sentry/browser')
      .then((Sentry) => {
        Sentry.init({
          dsn,
          environment: 'production',
          dataCollection: { userInfo: false },
          tracesSampleRate: 0,
        });
      })
      .catch(() => {
        // Error reporting must never break the page (e.g. chunk blocked).
      });
  }, []);

  return null;
}
