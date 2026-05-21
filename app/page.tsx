"use client";

import { useState } from "react";
import Link from "next/link";
import { IconCompliance, IconCRM, IconAI, IconAlerts } from "./components/Icons";
import { FeatureCard } from "./components/FeatureCard";
import { WhoItsFor } from "./components/WhoItsFor";
import { PricingCard, PricingToggle } from "./components/Pricing";
import { SocialProof } from "./components/SocialProof";
import { TrustBadge } from "./components/TrustBadge";
import { FAQ } from "./components/FAQ";
import { BlogHighlights } from "./components/BlogHighlights";
import { EmailCapture } from "./components/EmailCapture";
import { MarketingFooter } from "./components/MarketingFooter";
import { ConsultingPromo } from "./components/ConsultingPromo";
import { SiteNav } from "./components/SiteNav";
import { Hero } from "./components/Hero";

/* ═══════════════════════════ PAGE ═══════════════════════════════ */

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
      >
        <div
          className="mx-auto grid max-w-4xl grid-cols-2
            gap-8 px-6 py-12 sm:grid-cols-4"
        >
          <TrustBadge label="99.9%" sublabel="Uptime SLA" />
          <TrustBadge label="SOC 2" sublabel="Compliant" />
          <TrustBadge label="256-bit" sublabel="Encryption" />
          <TrustBadge
            label="GDPR"
            sublabel="Ready"
          />
        </div>
      </section>

      {/* ─────────────── Social Proof ──────────────── */}
      <SocialProof />

      {/* ─────────────── Features ─────────────────── */}
      <section id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2
              className="font-[family-name:var(--font-poppins)]
                text-3xl font-bold text-white sm:text-4xl"
            >
              Everything your business needs to{" "}
              <span className="gradient-text">
                thrive
              </span>
            </h2>
            <p
              className="mt-4
                font-[family-name:var(--font-poppins)]
                text-lg text-saasy-muted"
            >
              From formation to scaling, SaaSy manages every
              stage of your business lifecycle with intelligent
              guidance.
            </p>
          </div>

          <div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            <FeatureCard
              icon={<IconCompliance />}
              title="Compliance Tracker"
              description="Automated tracking of licenses, permits, and filings. Get reminders before deadlines, not after."
            />
            <FeatureCard
              icon={<IconCRM />}
              title="Built-in CRM"
              description="Manage contacts, deals, and customer relationships from day one. No separate tool needed."
            />
            <FeatureCard
              icon={<IconAI />}
              title="Smart Guidance"
              description="Personalized recommendations for your business at every growth stage. Like having a mentor on call."
            />
            <FeatureCard
              icon={<IconAlerts />}
              title="Proactive Alerts"
              description="Timely notifications about deadlines, opportunities, and risks via email or Slack."
            />
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
            <h2
              className="font-[family-name:var(--font-poppins)]
                text-3xl font-bold text-white sm:text-4xl"
            >
              Simple, transparent pricing
            </h2>
            <p
              className="mt-4
                font-[family-name:var(--font-poppins)]
                text-lg text-saasy-muted"
            >
              14-day free trial on every plan. No credit card
              required.
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
                "Up to 5 businesses",
                "All modules",
                "Smart guidance",
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
                "Unlimited businesses",
                "Unlimited integrations",
                "Priority support",
                "Custom automations",
                "Dedicated onboarding",
                "Advanced analytics",
              ]}
            />
          </div>

          {/* Consulting upsell */}
          <p
            className="mt-10 text-center
              font-[family-name:var(--font-poppins)] text-sm
              text-saasy-muted"
          >
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
      </section>

      {/* ─────────────── FAQ ─────────────────────── */}
      <FAQ />

      {/* ─────────────── Blog Highlights ─────────── */}
      <BlogHighlights />

      {/* ─────────────── Email Capture ────────────── */}
      <EmailCapture />

      {/* ──────── Consulting Cross-Promo ─────────── */}
      <ConsultingPromo />

      {/* ───────────── Final CTA ──────────────────── */}
      <section className="border-t border-saasy-border">
        <div
          className="hero-gradient mx-auto max-w-4xl px-6
            py-24 text-center sm:py-32"
        >
          <h2
            className="font-[family-name:var(--font-poppins)]
              text-3xl font-bold text-white sm:text-5xl"
          >
            Ready to run your business smarter?
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl
              font-[family-name:var(--font-poppins)] text-lg
              text-saasy-muted"
          >
            Join thousands of entrepreneurs using SaaSy to build
            and grow their businesses. Start your 14-day free
            trial today.
          </p>
          <Link
            href="https://app.hellosaasy.ai/signup"
            className="cta-pulse mt-8 inline-flex rounded-full
              bg-saasy-pink px-8 py-4
              font-[family-name:var(--font-poppins)] text-base
              font-semibold uppercase tracking-wider text-white
              transition-colors hover:bg-saasy-rose"
          >
            Start your free trial
          </Link>
        </div>
      </section>

      {/* ─────────────── Footer ─────────────────── */}
      <MarketingFooter />
    </div>
  );
}
