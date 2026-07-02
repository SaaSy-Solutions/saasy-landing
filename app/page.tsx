"use client";

import { useState } from "react";
import Link from "next/link";
import { IconCompliance, IconCRM, IconAI, IconAlerts } from "./components/Icons";
import { WhoItsFor } from "./components/WhoItsFor";
import { PricingCard, PricingToggle } from "./components/Pricing";
import { SocialProof } from "./components/SocialProof";
import { TrustBadge } from "./components/TrustBadge";
import { FAQ } from "./components/FAQ";
import { BlogHighlights } from "./components/BlogHighlights";
import { MarketingFooter } from "./components/MarketingFooter";
import { SiteNav } from "./components/SiteNav";
import { Hero } from "./components/Hero";
import { ProductDemo } from "./components/ProductDemo";

/* ═══════════════════════════ PAGE ═══════════════════════════════ */

/** Core capabilities — everything listed here is live in the product. */
const CAPABILITIES = [
  {
    icon: <IconAI />,
    title: "Customer health scoring",
    description:
      "Every account scored 0-100 on usage, payments, and support signals. You see who's drifting toward the exit while there's still time to call.",
  },
  {
    icon: <IconCRM />,
    title: "Built-in CRM & invoicing",
    description:
      "Contacts, deals, projects, and billing in one place. No duct tape between four tools that don't talk to each other.",
  },
  {
    icon: <IconCompliance />,
    title: "Compliance tracker",
    description:
      "Licenses, permits, filings, and certified-payroll deadlines tracked automatically. Reminders land before the due date, not after the fine.",
  },
  {
    icon: <IconAlerts />,
    title: "Proactive alerts",
    description:
      "Email or Slack pings when something needs you: a churn risk, a deadline, an invoice going stale. The system watches so you don't have to.",
  },
];

export default function Home(): React.ReactElement {
  const [pricingInterval, setPricingInterval] = useState<
    "monthly" | "annual"
  >("monthly");

  const monthlyPrices = { starter: 49, growth: 149, scale: 399 };
  const annualPrices = { starter: 39, growth: 119, scale: 319 };
  const prices =
    pricingInterval === "annual" ? annualPrices : monthlyPrices;
  const billingLabel =
    pricingInterval === "annual" ? "/mo billed annually" : "/mo";

  return (
    <div className="min-h-screen">
      {/* ─────────────── Navigation ─────────────── */}
      <SiteNav />

      {/* ─────────────────── Hero ─────────────────── */}
      <Hero />

      {/* ─────────────── Trust Bar ─────────────────── */}
      <section
        className="border-y border-saasy-border bg-saasy-card/30"
        aria-label="Security and data practices"
      >
        <div
          className="mx-auto grid max-w-4xl grid-cols-2
            gap-8 px-6 py-12 sm:grid-cols-4"
        >
          <TrustBadge
            label="Encrypted"
            sublabel="At rest and in transit"
          />
          <TrustBadge
            label="Your data stays yours"
            sublabel="Strict per-account isolation"
          />
          <TrustBadge
            label="GDPR-ready"
            sublabel="Export or delete anytime"
          />
          <TrustBadge
            label="Real humans"
            sublabel="US-based support"
          />
        </div>
      </section>

      {/* ─────────────── Social Proof ──────────────── */}
      <SocialProof />

      {/* ─────────────── Features ─────────────────── */}
      <section id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Software that{" "}
              <span className="gradient-text">does the work</span>
            </h2>
            <p className="mt-4 text-lg text-saasy-muted">
              Most tools hand you a chart of the problem and wish
              you luck. SaaSy&rsquo;s agents chase the deadline,
              score the customer, and draft the follow-up. Then
              they tell you what they did.
            </p>
          </div>

          {/* Product walkthrough video — the destination for the hero's
              "See how it works" CTA. */}
          <ProductDemo />

          {/* Plain two-column capability list — deliberately not a wall
              of identical cards. */}
          <div
            className="grid gap-x-16 gap-y-12 sm:grid-cols-2"
          >
            {CAPABILITIES.map((cap) => (
              <div key={cap.title} className="flex gap-5">
                <div className="mt-1 shrink-0">{cap.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {cap.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-saasy-muted">
                    {cap.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/features"
              className="text-sm font-medium text-saasy-pink-soft
                transition-colors hover:text-white"
            >
              See every feature in real screenshots &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────── Who It's For ─────────────── */}
      <WhoItsFor />

      {/* ─────────────── Pricing ─────────────────── */}
      <section
        id="pricing"
        className="border-t border-saasy-border py-24 sm:py-32"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-saasy-muted">
              Every trial starts with full Growth access, free for
              14 days. Pick your plan when you&rsquo;re ready. No
              credit card up front.
            </p>
          </div>

          <div className="mb-10 flex justify-center">
            <PricingToggle
              interval={pricingInterval}
              onChange={setPricingInterval}
            />
          </div>

          <div
            className="mx-auto grid max-w-5xl gap-8
              lg:grid-cols-3"
          >
            <PricingCard
              name="Starter"
              price={prices.starter}
              billingLabel={billingLabel}
              features={[
                "1 business",
                "Compliance tracker",
                "CRM (50 contacts)",
                "Daily briefing",
                "Email alerts",
              ]}
            />
            <PricingCard
              name="Growth"
              price={prices.growth}
              popular
              billingLabel={billingLabel}
              features={[
                "Everything in Starter",
                "Up to 5 businesses",
                "Ask SaaSy AI guidance",
                "Slack alerts",
                "API access",
                "Advanced analytics",
              ]}
            />
            <PricingCard
              name="Scale"
              price={prices.scale}
              billingLabel={billingLabel}
              features={[
                "Everything in Growth",
                "Unlimited businesses",
                "Unlimited integrations",
                "Priority support",
                "Custom automations",
                "Dedicated onboarding",
              ]}
            />
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/compare"
              className="text-sm font-medium text-saasy-pink-soft
                transition-colors hover:text-white"
            >
              See how SaaSy compares to the tools it replaces &rarr;
            </Link>
            <p className="mx-auto mt-4 max-w-xl text-sm text-saasy-muted">
              Need custom automations, integrations, or a dedicated
              engineering partner?{" "}
              <a
                href="https://saasysolutionsllc.com/consultation"
                className="font-medium text-saasy-orange
                  transition-colors hover:text-white"
              >
                Talk to our consulting team &rarr;
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────── FAQ ─────────────────────── */}
      <FAQ />

      {/* ─────────────── Blog Highlights ─────────── */}
      <BlogHighlights />

      {/* ───────────── Final CTA ──────────────────── */}
      <section className="border-t border-saasy-border">
        <div
          className="hero-gradient mx-auto max-w-4xl px-6
            py-24 text-center sm:py-32"
        >
          <h2 className="text-3xl font-bold text-white sm:text-5xl">
            Ready to run your business smarter?
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-lg
              text-saasy-muted"
          >
            We&rsquo;re in open beta, building alongside our first
            customers. Your feedback ships in days, and your first
            two weeks are free.
          </p>
          <Link
            href="https://app.hellosaasy.ai/signup"
            className="mt-8 inline-flex rounded-full
              bg-saasy-rose px-8 py-4 text-base
              font-semibold text-white
              transition-colors hover:bg-saasy-rose-bright"
          >
            Start your free trial
          </Link>
          <p className="mt-4 text-sm text-saasy-muted">
            Want a walkthrough first?{" "}
            <a
              href="https://app.hellosaasy.ai/contact-sales"
              className="font-medium text-saasy-pink-soft
                transition-colors hover:text-white"
            >
              Talk to sales
            </a>
          </p>
        </div>
      </section>

      {/* ─────────────── Footer ─────────────────── */}
      <MarketingFooter />
    </div>
  );
}
