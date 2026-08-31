import type { Metadata } from "next";
import Link from "next/link";
import { H, LegalDoc, P } from "../components/LegalDoc";

export const metadata: Metadata = {
  title: "Cookie Policy | SaaSy",
  description: "How SaaSy uses cookies on hellosaasy.ai and app.hellosaasy.ai.",
  alternates: { canonical: "https://hellosaasy.ai/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalDoc title="Cookie Policy" updated="August 28, 2026">
      <section>
        <P>
          This page expands{" "}
          <Link href="/privacy" className="text-saasy-pink-soft underline">
            Privacy Policy
          </Link>{" "}
          cookie language. Marketing pages ask before analytics cookies are
          set.
        </P>
      </section>
      <section>
        <H>Essential</H>
        <P>
          Session and authentication cookies on app.hellosaasy.ai keep you
          signed in and enforce CSRF protections. These are required for the
          product to work.
        </P>
      </section>
      <section>
        <H>Analytics (optional)</H>
        <P>
          PostHog measures product usage. On hellosaasy.ai it initializes only
          after you choose &quot;Accept analytics&quot; on the cookie banner.
          Choose &quot;Essential only&quot; to keep it off. You can clear the
          choice by deleting site data for hellosaasy.ai.
        </P>
      </section>
      <section>
        <H>What we do not set</H>
        <P>
          We do not use advertising pixels or third-party ad cookies. Cloudflare
          Web Analytics, when enabled, is cookieless.
        </P>
      </section>
    </LegalDoc>
  );
}
