import type { Metadata } from "next";
import Link from "next/link";
import { ogImage } from "../components/ogAssets";
import { SiteNav } from "../components/SiteNav";
import { MarketingFooter } from "../components/MarketingFooter";

const DESCRIPTION =
  "The stack SaaSy is built to sit inside: the tools we integrate " +
  "with, the capabilities bundled into every plan, and the " +
  "consulting team behind the platform.";

export const metadata: Metadata = {
  title: "Partners & Recommended Stack — SaaSy",
  description: DESCRIPTION,
  alternates: {
    canonical: "https://hellosaasy.ai/partners",
  },
  openGraph: {
    title: "Partners & Recommended Stack — SaaSy",
    description: DESCRIPTION,
    url: "https://hellosaasy.ai/partners",
    siteName: "SaaSy",
    type: "website",
    images: [ogImage("partners")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partners & Recommended Stack — SaaSy",
    description: DESCRIPTION,
    images: [ogImage("partners").url],
  },
};

interface StackEntry {
  name: string;
  why: string;
}

interface StackGroup {
  heading: string;
  blurb: string;
  items: StackEntry[];
}

const STACK: StackGroup[] = [
  {
    heading: "Money in",
    blurb: "How revenue actually moves.",
    items: [
      {
        name: "Stripe",
        why:
          "Payment links go out on every SaaSy invoice, and revenue " +
          "data flows back onto the customer record automatically.",
      },
      {
        name: "Plaid",
        why:
          "Bank connections for the numbers the AI CFO brief reads " +
          "every week.",
      },
    ],
  },
  {
    heading: "Where work happens",
    blurb: "The channels your team already lives in.",
    items: [
      {
        name: "Slack",
        why:
          "Daily briefings and instant alerts — missed payments, " +
          "compliance deadlines, churn signals — in the place " +
          "people actually read them.",
      },
      {
        name: "Google Workspace / Microsoft 365",
        why:
          "SaaSy sends and reads email through your existing " +
          "account: follow-ups, briefings, and customer threads " +
          "without another inbox.",
      },
      {
        name: "Twilio",
        why:
          "SMS where it belongs — alerts and reminders that need " +
          "to reach someone not sitting at a desk.",
      },
    ],
  },
  {
    heading: "People & payroll",
    blurb: "The HR and payroll plumbing.",
    items: [
      {
        name: "Gusto / ADP / BambooHR / Rippling",
        why:
          "If payroll history lives elsewhere, we connect to it " +
          "rather than making you migrate on day one.",
      },
      {
        name: "LCPtracker",
        why:
          "Certified payroll exports formatted for the compliance " +
          "portal public-works contractors already file into.",
      },
    ],
  },
  {
    heading: "The door's open",
    blurb: "For everything else.",
    items: [
      {
        name: "Webhooks & API",
        why:
          "Every plan above Starter carries API access; webhooks " +
          "push events to whatever else you run.",
      },
    ],
  },
];

const BUNDLED = [
  {
    name: "SaaSy eSign",
    body: "Legally binding e-signature with every version kept — no DocuSign bill on top.",
  },
  {
    name: "SaaSPass",
    body: "Password and secrets management for the team, with breach alerts.",
  },
  {
    name: "Grant discovery",
    body: "Grants your business fits, scored and AI-drafted — a service other vendors sell separately.",
  },
  {
    name: "Certified payroll",
    body: "WH-347 reports for prevailing-wage work, generated from your normal runs.",
  },
];

export default function PartnersPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-saasy-dark">
      <SiteNav />

      {/* ─────────────────── Hero ─────────────────── */}
      <header
        className="hero-gradient relative overflow-hidden
          pt-32 pb-16 sm:pt-40 sm:pb-20"
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div
            className="mb-8 inline-flex items-center gap-2
              rounded-full border border-saasy-pink/20
              bg-saasy-pink/5 px-4 py-1.5"
          >
            <span className="h-2 w-2 rounded-full bg-saasy-pink" />
            <span className="text-sm text-saasy-pink-soft">
              Partners &amp; recommended stack
            </span>
          </div>
          <h1
            className="text-4xl leading-[1.1] font-extrabold
              tracking-tight text-white sm:text-6xl"
          >
            The stack we{" "}
            <span className="accent-word">build against</span>
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-lg
              leading-relaxed text-saasy-muted sm:text-xl"
          >
            SaaSy replaces a pile of point tools — but it sits inside
            an ecosystem, not a walled garden. These are the
            connections live today and the capabilities bundled into
            every plan.
          </p>
        </div>
      </header>

      <main>
        {/* ─────────── The stack ─────────── */}
        <section className="border-t border-saasy-border py-24 sm:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <div className="space-y-16">
              {STACK.map((group) => (
                <div key={group.heading}>
                  <h2 className="text-2xl font-bold text-white">
                    {group.heading}
                  </h2>
                  <p className="mt-1 text-sm text-saasy-muted">
                    {group.blurb}
                  </p>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    {group.items.map((item) => (
                      <div
                        key={item.name}
                        className="rounded-2xl border border-saasy-border
                          bg-saasy-card/50 p-6"
                      >
                        <h3 className="text-base font-semibold text-white">
                          {item.name}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-saasy-muted">
                          {item.why}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-10 text-sm text-saasy-muted">
              HubSpot, Salesforce, Intercom, and Jira connectors are
              in progress — see the{" "}
              <Link
                href="/integrations"
                className="text-saasy-pink-soft underline
                  transition-colors hover:text-white"
              >
                integrations page
              </Link>{" "}
              for current status on each.
            </p>
          </div>
        </section>

        {/* ─────────── Bundled in every plan ─────────── */}
        <section className="border-t border-saasy-border py-24 sm:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Sold separately elsewhere — bundled here
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-saasy-muted">
              These ship as standalone products at other vendors. In
              SaaSy they come with every paid plan, at no extra charge.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {BUNDLED.map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl border border-saasy-border
                    bg-saasy-card/50 p-6"
                >
                  <h3 className="text-base font-semibold text-white">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-saasy-muted">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── The team behind it ─────────── */}
        <section className="border-t border-saasy-border py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Need a hand wiring it together?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-saasy-muted">
              SaaSy is built by{" "}
              <a
                href="https://saasysolutionsllc.com"
                className="text-saasy-pink-soft underline
                  transition-colors hover:text-white"
              >
                SaaSy Solutions LLC
              </a>
              , a woman-owned small business. The same team takes
              consulting engagements for custom automations,
              migrations, and integrations that need a dedicated
              engineering partner.
            </p>
            <div
              className="mt-8 flex flex-col items-center
                justify-center gap-4 sm:flex-row"
            >
              <a
                href="https://saasysolutionsllc.com/consultation"
                className="inline-flex rounded-full bg-saasy-rose
                  px-8 py-4 text-base font-semibold text-white
                  transition-colors hover:bg-saasy-rose-bright"
              >
                Talk to the consulting team
              </a>
              <Link
                href="/affiliate"
                className="text-sm font-medium text-saasy-pink-soft
                  transition-colors hover:text-white"
              >
                Want to refer clients instead? Partner program &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
