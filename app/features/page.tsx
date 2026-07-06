import Link from "next/link";
import type { Metadata } from "next";
import { ogImage } from "../components/ogAssets";
import { revVideoUrl } from "../components/videoAssets";
import { SiteNav } from "../components/SiteNav";
import { MarketingFooter } from "../components/MarketingFooter";
import { FeatureShowcase } from "../components/FeatureShowcase";
import {
  IconCompliance,
  IconAlerts,
  IconAI,
  IconCheck,
} from "../components/Icons";

export const metadata: Metadata = {
  title: "Features — SaaSy",
  description:
    "See SaaSy's customer health scoring, churn alerts, AI answers " +
    "grounded in your data, and integrations in real product " +
    "screenshots from a working account.",
  alternates: {
    canonical: "https://hellosaasy.ai/features",
  },
  openGraph: {
    title: "Features — SaaSy",
    description:
      "Customer health scoring, churn alerts, Ask SaaSy AI answers, " +
      "and integrations, shown in real product screenshots.",
    url: "https://hellosaasy.ai/features",
    siteName: "SaaSy",
    type: "website",
    images: [ogImage("features")],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImage("features").url],
    title: "Features — SaaSy",
    description:
      "Customer health scoring, churn alerts, Ask SaaSy AI answers, " +
      "and integrations, shown in real product screenshots.",
  },
};

/** JSON-LD describing the feature set for rich results. */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Features — SaaSy",
  url: "https://hellosaasy.ai/features",
  description:
    "Customer health scoring, churn alerts, an AI co-founder, and " +
    "one-click integrations, shown in real product screenshots.",
  isPartOf: {
    "@type": "WebSite",
    name: "SaaSy",
    url: "https://hellosaasy.ai",
  },
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "SaaSy",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://hellosaasy.ai",
    featureList: [
      "Customer health scoring",
      "Churn risk alerts",
      "Ask SaaSy AI answers grounded in your data",
      "Stripe and Slack integrations",
    ],
  },
};

/**
 * Connector logo wall. Only entries without `comingSoon` ship today;
 * the rest are labeled so the grid never reads as live.
 */
interface Connector {
  slug: string;
  name: string;
  comingSoon?: boolean;
}

const CONNECTORS: Connector[] = [
  { slug: "stripe", name: "Stripe" },
  { slug: "slack", name: "Slack" },
  { slug: "hubspot", name: "HubSpot", comingSoon: true },
  { slug: "salesforce", name: "Salesforce", comingSoon: true },
];

/** A capability shown in the "under the hood" grid. */
interface Capability {
  icon: React.ReactElement;
  title: string;
  body: string;
}

const CAPABILITIES: Capability[] = [
  {
    icon: <IconAI />,
    title: "Health scoring",
    body:
      "Every account scored 0-100 on usage, support load, payment " +
      "behavior, and expansion signals, recalculated as new data lands.",
  },
  {
    icon: <IconAlerts />,
    title: "Proactive alerts",
    body:
      "Get pinged by email or Slack when an account slips toward churn, " +
      "so you reach out before the renewal conversation goes sideways.",
  },
  {
    icon: <IconCompliance />,
    title: "Compliance tracking",
    body:
      "Licenses, permits, and filings tracked with reminders that " +
      "arrive while you can still do something about them.",
  },
];

export default function FeaturesPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-saasy-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <SiteNav />

      {/* ─────────────────── Hero ─────────────────── */}
      <header
        className="hero-gradient relative
          overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20"
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1
            className="
              text-4xl leading-[1.1] font-extrabold tracking-tight
              text-white sm:text-6xl"
          >
            What you actually <span className="accent-word">get</span>
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl
               text-lg
              leading-relaxed text-saasy-muted sm:text-xl"
          >
            Real screenshots from a working SaaSy account. No mockups,
            no &ldquo;coming soon&rdquo; placeholders.
          </p>
        </div>
      </header>

      <main>
        {/* ── Showcase pair (zigzag, max 2 in a row) ── */}
        <FeatureShowcase
          title="See your whole business at a glance"
          body="One view for customer health, at-risk accounts,
            and expansion opportunities. The metric that matters
            this week is on the first screen you open."
          image="/screenshots/dashboard-hero.png"
          video={revVideoUrl("feature-clip-health.mp4")}
          alt="SaaSy health dashboard overview with stats and critical customer cards"
          imageWidth={1195}
          imageHeight={900}
        />

        <FeatureShowcase
          reverse
          title="Score every customer on signals that matter"
          body="Every account scored 0-100 on usage frequency,
            support tickets, payment behavior, and expansion
            patterns. Sorted so the ones who need attention show
            up first."
          image="/screenshots/churn-alerts.png"
          video={revVideoUrl("feature-clip-churn.mp4")}
          alt="Full customer health grid with color-coded scores from critical red to healthy green"
          imageWidth={1195}
          imageHeight={900}
        />

        {/* ── Layout break: capability grid (asymmetric) ── */}
        <section className="border-t border-saasy-border py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <h2
                className="
                  text-3xl font-bold text-white sm:text-4xl"
              >
                Under the hood
              </h2>
              <p
                className="mt-4

                  text-lg leading-relaxed text-saasy-muted"
              >
                The signals SaaSy watches so you don&rsquo;t have to. Each
                one feeds the same health score, so nothing lives in a
                silo you forget to check.
              </p>
            </div>

            <div
              className="mt-12 grid gap-5
                lg:grid-cols-3"
            >
              {CAPABILITIES.map((cap) => (
                <div
                  key={cap.title}
                  className="flex flex-col rounded-2xl border
                    border-saasy-border bg-saasy-card p-8
                    transition-colors hover:border-saasy-pink/30"
                >
                  <div className="mb-5">{cap.icon}</div>
                  <h3
                    className="
                      text-xl font-semibold text-white"
                  >
                    {cap.title}
                  </h3>
                  <p
                    className="mt-3

                      leading-relaxed text-saasy-muted"
                  >
                    {cap.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Showcase pair resumes after the break ── */}
        <FeatureShowcase
          title="Drill into any customer for the full story"
          body="One click from the health view into a complete
            customer record. Company info, contacts, activity
            timeline, notes, and MRR, all in one place instead
            of six tabs."
          image="/screenshots/customer-detail.png"
          video={revVideoUrl("feature-clip-customer.mp4")}
          alt="Customer detail page for Sundial Bakery with company info card and activity sidebar"
          imageWidth={1195}
          imageHeight={900}
        />

        <FeatureShowcase
          reverse
          title="Ask anything. Grounded in your data."
          body="Ask SaaSy in plain English: which accounts grew
            last quarter, which support tickets correlate with
            churn, what's worth doing today. Answers cite the
            actual records they came from."
          image="/screenshots/ask-saasy.png"
          video={revVideoUrl("feature-clip-ask.mp4")}
          alt="Ask SaaSy answering 'Which customers are at risk?' with tables of critical and high-risk customers, health scores, and MRR, grounded in live account data"
          imageWidth={1195}
          imageHeight={500}
        />

        {/* ── Integrations: split statement + connector wall ── */}
        <section className="border-t border-saasy-border py-24 sm:py-32">
          <div
            className="mx-auto grid max-w-6xl items-center gap-12
              px-6 lg:grid-cols-2 lg:gap-16"
          >
            <div>
              <h2
                className="
                  text-3xl font-bold text-white sm:text-4xl"
              >
                Connect the tools you already use
              </h2>
              <p
                className="mt-4

                  text-lg leading-relaxed text-saasy-muted"
              >
                Connect Stripe, Slack, Gmail or Microsoft 365 email,
                payroll providers, and your bank via Plaid today.
                HubSpot, Salesforce, and Jira are on the roadmap.
                Every connected source feeds the same per-customer
                health score. OAuth in about a minute, no CSV uploads.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "One health score from every connected source",
                  "Read-only scopes; revoke access anytime",
                  "Encrypted in transit and at rest",
                ].map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3

                      text-saasy-muted"
                  >
                    <IconCheck />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-saasy-card/40 p-8">
              <p
                className="
                  text-xs font-semibold text-saasy-muted"
              >
                Works with
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {CONNECTORS.map((brand) => (
                  <div
                    key={brand.slug}
                    className="relative flex items-center justify-center
                      rounded-xl bg-white px-5 py-5 ring-1 ring-black/5"
                  >
                    <img
                      src={`/connectors/${brand.slug}.svg`}
                      alt={brand.name}
                      className={
                        brand.comingSoon
                          ? "h-6 w-auto opacity-40"
                          : "h-6 w-auto"
                      }
                      loading="lazy"
                    />
                    {brand.comingSoon && (
                      <span
                        className="absolute right-2 top-2 rounded-full
                          bg-saasy-dark/80 px-2 py-0.5 text-[10px]
                          font-semibold text-white"
                      >
                        Coming soon
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <Link
                href="/integrations"
                className="mt-6 inline-flex
                   text-sm
                  font-medium text-saasy-orange transition-colors
                  hover:text-white"
              >
                See all integrations &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* ── Closing CTA ── */}
        <section className="border-t border-saasy-border">
          <div
            className="hero-gradient mx-auto max-w-3xl px-6 py-24
              text-center sm:py-32"
          >
            <h2
              className="
                text-3xl font-bold text-white sm:text-4xl"
            >
              See it in your own account
            </h2>
            <p
              className="mx-auto mt-4 max-w-xl

                text-lg text-saasy-muted"
            >
              Free for 14 days with full Growth access. No credit card
              required.
            </p>
            <Link
              href="https://app.hellosaasy.ai/signup"
              className="mt-8 inline-flex rounded-full
                bg-saasy-rose px-8 py-4
                 text-base
                font-semibold text-white
                transition-colors hover:bg-saasy-rose-bright"
            >
              Start free trial
            </Link>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
