import Link from "next/link";
import type { Metadata } from "next";
import { SiteNav } from "../components/SiteNav";
import { MarketingFooter } from "../components/MarketingFooter";
import { FeatureShowcase } from "../components/FeatureShowcase";

export const metadata: Metadata = {
  title: "Features — SaaSy",
  description:
    "See SaaSy's customer health scoring, churn alerts, AI co-founder, and integrations in real product screenshots.",
};

export default function FeaturesPage(): React.ReactElement {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <header
        className="hero-gradient grid-pattern relative
          overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16"
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1
            className="font-[family-name:var(--font-poppins)]
              text-4xl leading-[1.1] font-extrabold tracking-tight
              text-white sm:text-6xl"
          >
            What you actually <span className="gradient-text">see</span>
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl
              font-[family-name:var(--font-poppins)] text-lg
              leading-relaxed text-saasy-muted sm:text-xl"
          >
            Real screenshots from a working SaaSy account. No mockups,
            no &ldquo;coming soon&rdquo; placeholders.
          </p>
        </div>
      </header>

      <main>
        <FeatureShowcase
          title="See your whole business at a glance"
          body="One view for customer health, at-risk accounts,
            and expansion opportunities. No more bouncing between
            7 tools to find the one metric that matters this week."
          image="/screenshots/dashboard-hero.png"
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
          alt="Full customer health grid with color-coded scores from critical red to healthy green"
          imageWidth={1195}
          imageHeight={900}
        />

        <FeatureShowcase
          title="Drill into any customer for the full story"
          body="One click from the health view into a complete
            customer record — company info, contacts, activity
            timeline, notes, and MRR. Everything in one place
            instead of six tabs."
          image="/screenshots/customer-detail.png"
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
          alt="Ask SaaSy chat interface with quick-prompt buttons for common business questions"
          imageWidth={1195}
          imageHeight={500}
        />

        <FeatureShowcase
          title="Connect the tools you already use"
          body="Stripe, HubSpot, Salesforce, your help desk —
            connect once and SaaSy pulls the signals into one
            health score per customer. OAuth in 60 seconds, no
            CSV uploads."
          image="/screenshots/integrations.png"
          alt="Integrations page showing Stripe, HubSpot, and Salesforce connector cards"
          imageWidth={1195}
          imageHeight={900}
        />

        <section className="border-t border-saasy-border py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2
              className="font-[family-name:var(--font-poppins)]
                text-3xl font-bold text-white sm:text-4xl"
            >
              See it in your own account
            </h2>
            <p
              className="mx-auto mt-4 max-w-xl
                font-[family-name:var(--font-poppins)]
                text-lg text-saasy-muted"
            >
              14-day free trial on the Growth plan. No credit card
              required.
            </p>
            <Link
              href="https://app.hellosaasy.ai/signup"
              className="cta-pulse mt-8 inline-flex rounded-full
                bg-saasy-pink px-8 py-4
                font-[family-name:var(--font-poppins)] text-base
                font-semibold uppercase tracking-wider text-white
                transition-colors hover:bg-saasy-rose"
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
