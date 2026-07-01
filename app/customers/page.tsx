import Link from "next/link";
import type { Metadata } from "next";
import { SiteNav } from "../components/SiteNav";
import { MarketingFooter } from "../components/MarketingFooter";
import { ogImage } from "../components/ogAssets";

export const metadata: Metadata = {
  title: "Customers — SaaSy",
  description:
    "SaaSy is in beta. Real, named customer stories will live " +
    "here as our first founders hit their milestones.",
  openGraph: {
    siteName: "SaaSy",
    type: "website",
    images: [ogImage("customers")],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImage("customers").url],
  },
};

/** What SaaSy is built to help founders do (capability, not testimonial). */
interface Outcome {
  title: string;
  body: string;
}

const OUTCOMES: Outcome[] = [
  {
    title: "Never miss a deadline",
    body:
      "Track licenses, permits, and filings with reminders ahead " +
      "of each due date — not a scramble after one passes.",
  },
  {
    title: "Get hours back",
    body:
      "One dashboard in place of spreadsheets, manual check-ins, " +
      "and constant tool-switching across every business you run.",
  },
  {
    title: "Cut wasted spend",
    body:
      "Surface redundant subscriptions and costs you forgot you " +
      "were paying, so your stack stops quietly eating your margin.",
  },
];

export default function CustomersPage() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-20">
        <div className="text-center">
          <p
            className="
              text-sm font-medium text-saasy-pink-soft"
          >
            Now in beta
          </p>
          <h1
            className="mt-2
              text-4xl font-bold tracking-tight text-white"
          >
            Customer Stories
          </h1>
          <p
            className="mx-auto mt-4 max-w-2xl

              text-lg text-saasy-muted"
          >
            SaaSy is brand new and we&rsquo;re building alongside
            our first founders. Real, named stories will live here
            as our early customers hit their milestones — no stock
            photos, no invented quotes.
          </p>
        </div>

        <div className="mt-16 text-center">
          <h2
            className="
              text-sm font-semibold text-saasy-muted"
          >
            What SaaSy is built to do
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {OUTCOMES.map(outcome => (
            <div
              key={outcome.title}
              className="glow-border flex flex-col rounded-xl
                bg-saasy-card p-8"
            >
              <h3
                className="
                  text-xl font-semibold text-white"
              >
                {outcome.title}
              </h3>
              <p
                className="mt-3 flex-1

                  text-sm leading-relaxed text-saasy-muted"
              >
                {outcome.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2
            className="
              text-xl font-semibold text-white"
          >
            Want to be one of our first stories?
          </h2>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="https://app.hellosaasy.ai/signup"
              className="rounded-full bg-saasy-rose px-6 py-2.5
                 text-sm
                font-semibold text-white
                transition-colors hover:bg-saasy-rose-bright"
            >
              Start free trial
            </Link>
            <Link
              href="https://app.hellosaasy.ai/contact-sales"
              className="rounded-full border border-saasy-border px-6
                py-2.5  text-sm
                font-semibold text-saasy-text transition-colors
                hover:border-saasy-muted hover:text-white"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </div>
      <MarketingFooter />
    </div>
  );
}
