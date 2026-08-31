import type { Metadata } from "next";
import Link from "next/link";
import { H, LegalDoc, P } from "../components/LegalDoc";

export const metadata: Metadata = {
  title: "Subprocessors | SaaSy",
  description:
    "Third parties that process customer data for SaaSy Solutions LLC.",
  alternates: { canonical: "https://hellosaasy.ai/subprocessors" },
};

const ROWS: { name: string; purpose: string; data: string; country: string }[] =
  [
    {
      name: "Stripe, Inc.",
      purpose: "Payments, subscriptions, checkout, dunning",
      data: "Name, email, billing address, card token (held by Stripe), subscription metadata",
      country: "USA",
    },
    {
      name: "Fly.io, Inc.",
      purpose: "Application hosting for backend services",
      data: "Application data in transit, IP addresses, request logs",
      country: "USA",
    },
    {
      name: "Neon, Inc.",
      purpose: "Managed PostgreSQL",
      data: "Customer Data at rest: accounts, CRM, billing, health scores",
      country: "USA",
    },
    {
      name: "Cloudflare, Inc.",
      purpose: "DNS, CDN, edge runtime for app.hellosaasy.ai",
      data: "IP addresses, request metadata, TLS handshake data",
      country: "USA (global edge)",
    },
    {
      name: "GitHub, Inc.",
      purpose: "Marketing site hosting (GitHub Pages)",
      data: "Marketing-site visitor IPs and request logs",
      country: "USA",
    },
    {
      name: "Sentry (Functional Software, Inc.)",
      purpose: "Error monitoring",
      data: "Stack traces, browser metadata, user IDs on error events",
      country: "USA",
    },
    {
      name: "PostHog, Inc.",
      purpose: "Product analytics and feature flags",
      data: "Page views, clicks, user IDs, feature-flag evaluations",
      country: "USA",
    },
    {
      name: "Anthropic, PBC",
      purpose: "LLM inference for advisory features",
      data: "Prompt content that may include Customer Data. Not used to train Anthropic models under their API terms.",
      country: "USA",
    },
    {
      name: "OpenAI, L.L.C.",
      purpose: "LLM inference (alternate provider)",
      data: "Prompt content that may include Customer Data",
      country: "USA",
    },
    {
      name: "Microsoft Corporation",
      purpose: "Transactional email via Exchange Online (MX for hellosaasy.ai)",
      data: "Recipient address and transactional email body",
      country: "USA",
    },
    {
      name: "Plaid, Inc.",
      purpose:
        "Bank-account connection and ongoing transaction/balance sync when a tenant connects a bank",
      data: "Account-holder name, account/routing last-4, balances, and full transaction history. Plaid holds its own copy under its retention policy.",
      country: "USA",
    },
  ];

export default function SubprocessorsPage() {
  return (
    <LegalDoc title="Subprocessors" updated="August 28, 2026">
      <section>
        <P>
          SaaSy Solutions LLC uses the processors below to operate the Service.
          This list matches integrations we can prove from production code and
          DNS. We will email workspace owners at least 30 days before adding a
          processor that receives Customer Data, unless the change is required
          to fix a security issue.
        </P>
        <P>
          Aspirational or tenant-supplied connectors (for example a tenant&apos;s
          own SendGrid key) are not SaaSy subprocessors. Vercel is not used.
        </P>
      </section>
      <section>
        <H>Current processors</H>
        <div className="overflow-x-auto rounded-xl border border-saasy-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-saasy-card/60 text-white">
              <tr>
                <th className="px-4 py-3">Processor</th>
                <th className="px-4 py-3">Purpose</th>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-saasy-border text-saasy-muted">
              {ROWS.map((row) => (
                <tr key={row.name}>
                  <td className="px-4 py-3 text-white font-medium">{row.name}</td>
                  <td className="px-4 py-3">{row.purpose}</td>
                  <td className="px-4 py-3">{row.data}</td>
                  <td className="px-4 py-3">{row.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <P>
          Questions:{" "}
          <a
            href="mailto:privacy@hellosaasy.ai"
            className="text-saasy-pink-soft underline"
          >
            privacy@hellosaasy.ai
          </a>
          . Related:{" "}
          <Link href="/privacy" className="text-saasy-pink-soft underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/dpa" className="text-saasy-pink-soft underline">
            DPA
          </Link>
          .
        </P>
      </section>
    </LegalDoc>
  );
}
