"use client";

import { useEffect, useState } from "react";

export const COOKIE_CONSENT_KEY = "saasy-cookie-consent";

export function readCookieConsent(): "all" | "essential" | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (value === "all" || value === "essential") return value;
  } catch {
    // Browser privacy settings can make localStorage unavailable.
  }
  return null;
}

export function CookieBanner() {
  const [choice, setChoice] = useState<"all" | "essential" | null | "pending">(
    "pending",
  );

  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    setChoice(readCookieConsent());
  }, []);

  if (choice === "pending" || choice !== null) return null;

  const choose = (next: "all" | "essential") => {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, next);
    } catch {
      setStorageError(true);
      return;
    }
    setStorageError(false);
    setChoice(next);
    window.dispatchEvent(new Event("saasy-cookie-consent"));
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-saasy-border bg-saasy-darker/95 p-5 shadow-2xl backdrop-blur-lg md:flex-row md:items-center">
        <div className="md:flex-1">
          <p className="text-sm leading-relaxed text-saasy-muted">
            We use essential cookies to run the site. Analytics cookies (PostHog)
            stay off until you opt in.{" "}
            <a href="/cookies" className="text-white underline">
              Cookie policy
            </a>
          </p>
          {storageError && (
            <p role="alert" className="mt-2 text-sm leading-relaxed text-white">
              We couldn’t save your cookie choice. Analytics remain off. You can
              keep using the site with essential cookies only, or allow browser
              storage and try your choice again.
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => choose("essential")}
            className="rounded-full border border-saasy-border px-4 py-2 text-sm text-white"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => choose("all")}
            className="rounded-full bg-white px-4 py-2 text-sm text-black"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
