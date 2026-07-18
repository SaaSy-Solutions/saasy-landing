"use client";

import { useState } from "react";
import Link from "next/link";
import { PricingCard, PricingToggle } from "../components/Pricing";
import { IconCheck } from "../components/Icons";
import { SiteNav } from "../components/SiteNav";
import { MarketingFooter } from "../components/MarketingFooter";
import { FAQ } from "../components/FAQ";

export function PricingPageClient(): React.ReactElement {
  const [interval, setInterval] = useState<"monthly" | "annual">("monthly");

  const monthly = { starter: 49, growth: 199, scale: 399 };
  const annual = { starter: 39, growth: 159, scale: 319 };
  const prices = interval === "annual" ? annual : monthly;
  const billingLabel =
    interval === "annual" ? "/mo billed annually" : "/mo";
  const unionAddon =
    interval === "annual"
      ? { band50: 79, band250: 199 }
      : { band50: 99, band250: 249 };

  return (
    <div className="min-h-screen bg-saasy-dark">
      <SiteNav />

      <section className="border-b border-saasy-border py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h1
              className="
                text-4xl font-bold text-white sm:text-5xl"
            >
              Simple, transparent pricing
            </h1>
            <p
              className="mt-4

                text-lg text-saasy-muted"
            >
              Every trial starts with full Growth access, free for 14
              days. Pick your plan when you're ready and our team gets
              you set up. No credit card up front, and you can switch
              or cancel anytime.
            </p>
          </div>

          <div className="mb-10 flex justify-center">
            <PricingToggle interval={interval} onChange={setInterval} />
          </div>

          <h2 className="sr-only">Plans</h2>
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
                "3 team seats",
                "Compliance tracker",
                "CRM (1,000 contacts)",
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
                "10 team seats",
                "CRM (10,000 contacts)",
                "Native payroll, 50 states + DC (beta perk)",
                "Ask SaaSy AI guidance",
                "Slack alerts",
                "API access",
              ]}
            />
            <PricingCard
              name="Scale"
              price={prices.scale}
              billingLabel={billingLabel}
              features={[
                "Everything in Growth",
                "Unlimited businesses",
                "Unlimited contacts & team seats",
                "Advanced analytics",
                "Priority support",
                "Custom automations",
                "Dedicated onboarding",
              ]}
            />
          </div>

          <p
            className="mx-auto mt-10 max-w-2xl text-center text-sm
              text-saasy-muted"
          >
            For scale: a typical 5-person business pays $320&ndash;500
            a month stitching together CRM, accounting, projects, email
            marketing, payroll, and automation tools. SaaSy replaces
            that stack at one flat price &mdash; and hiring never
            raises your software bill.
          </p>

          <p
            className="mx-auto mt-6 max-w-xl text-center text-sm
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

      <section className="border-b border-saasy-border py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2
            className="mb-3 text-center text-3xl font-bold text-white"
          >
            Included with every plan
          </h2>
          <p
            className="mx-auto mb-10 max-w-2xl text-center
              text-saasy-muted"
          >
            These ship as standalone products elsewhere. In SaaSy they
            come with every paid plan, at no extra charge.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "SaaSy eSign",
                blurb:
                  "Send documents for legally binding e-signature, with every version kept.",
              },
              {
                name: "SaaSPass",
                blurb:
                  "A password and secrets manager for your team, with breach alerts.",
              },
              {
                name: "Grant discovery",
                blurb:
                  "Find grants your business fits, scored by fit, with AI-drafted proposals.",
              },
              {
                name: "Certified payroll",
                blurb:
                  "WH-347 reports for government and prevailing-wage work, generated from your runs.",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-saasy-border
                  bg-saasy-card p-6"
              >
                <h3 className="mb-2 font-semibold text-white">
                  {item.name}
                </h3>
                <p className="text-sm text-saasy-muted">{item.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-saasy-border py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p
              className="mb-3
                text-sm font-semibold text-saasy-pink-soft"
            >
              Add-on
            </p>
            <h2
              className="
                text-3xl font-bold text-white sm:text-4xl"
            >
              Union &amp; Labor Compliance
            </h2>
            <p
              className="mt-4
                text-lg text-saasy-muted"
            >
              Built for unionized employers and contractors on
              prevailing-wage / Davis-Bacon public works. Attaches to a
              Growth or Scale plan.{" "}
              <Link
                href="/unions"
                className="font-medium text-saasy-pink-soft underline
                  transition-colors hover:text-white"
              >
                See the full union page &rarr;
              </Link>
            </p>
          </div>

          <div
            className="grid gap-8 rounded-2xl border border-saasy-border
              bg-saasy-card p-8 sm:p-10 lg:grid-cols-2"
          >
            <div>
              <h3
                className="mb-5
                  text-lg font-semibold text-white"
              >
                What it does
              </h3>
              <ul className="space-y-3">
                {[
                  "Union dues checkoff (flat, % of wages, or cents-per-hour) with signed-authorization tracking",
                  "CBA wage scales, apprentice progression, and retroactive pay",
                  "Taft-Hartley fringe / trust-fund contributions (H&W, pension, apprenticeship), remitted per fund",
                  "WH-347 certified payroll + LCPtracker export for federal-aid public works",
                  "NACHA ACH payment files to remit dues and fund contributions from your own bank",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3

                      text-sm text-saasy-muted"
                  >
                    <IconCheck />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="flex flex-col rounded-xl
                bg-saasy-dark/60 p-6 sm:p-8"
            >
              <h3
                className="mb-5
                  text-lg font-semibold text-white"
              >
                Priced by active members
              </h3>
              <ul
                className="mb-6 flex-1 space-y-3

                  text-sm text-saasy-muted"
              >
                <li className="flex items-center justify-between gap-4">
                  <span>Up to 50 members</span>
                  <span className="font-semibold text-white">
                    ${unionAddon.band50}
                    <span className="text-saasy-muted">
                      {billingLabel}
                    </span>
                  </span>
                </li>
                <li className="flex items-center justify-between gap-4">
                  <span>Up to 250 members</span>
                  <span className="font-semibold text-white">
                    ${unionAddon.band250}
                    <span className="text-saasy-muted">
                      {billingLabel}
                    </span>
                  </span>
                </li>
                <li className="flex items-center justify-between gap-4">
                  <span>250+ members</span>
                  <span className="text-saasy-muted">Custom</span>
                </li>
              </ul>
              <p
                className="mb-6
                  text-sm text-saasy-muted"
              >
                Added to your Growth or Scale plan. Larger rosters
                (250+) are custom-quoted: tell us your headcount
                and trades.
              </p>
              <a
                href="https://app.hellosaasy.ai/contact-sales?topic=union-add-on"
                className="block rounded-full bg-saasy-rose py-3.5
                  text-center
                  text-sm font-semibold text-white transition-all duration-200
                  hover:bg-saasy-rose-bright"
              >
                Talk to sales
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-saasy-border py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p
              className="mb-3
                text-sm font-semibold text-saasy-pink-soft"
            >
              Add-on
            </p>
            <h2
              className="
                text-3xl font-bold text-white sm:text-4xl"
            >
              Payroll processing
            </h2>
            <p
              className="mt-4
                text-lg text-saasy-muted"
            >
              Run payroll natively in all 50 states plus DC — direct deposit,
              W-2s, and withholding computed to the cent. Free on Growth
              and Scale plans during beta.
            </p>
          </div>

          <div
            className="mx-auto grid max-w-3xl gap-8 rounded-2xl border
              border-saasy-border bg-saasy-card p-8 sm:p-10
              lg:grid-cols-2"
          >
            <div>
              <h3
                className="mb-5
                  text-lg font-semibold text-white"
              >
                What it does
              </h3>
              <ul className="space-y-3">
                {[
                  "Gross-to-net with accurate state withholding in every state",
                  "Direct deposit and pay stubs for your whole team",
                  "W-2s at year end, filings tracked on your compliance calendar",
                  "Anomaly scans and overtime audits before you approve a run",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3

                      text-sm text-saasy-muted"
                  >
                    <IconCheck />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="flex flex-col rounded-xl
                bg-saasy-dark/60 p-6 sm:p-8"
            >
              <h3
                className="mb-5
                  text-lg font-semibold text-white"
              >
                Simple per-person pricing
              </h3>
              <ul
                className="mb-6 flex-1 space-y-3

                  text-sm text-saasy-muted"
              >
                <li className="flex items-center justify-between gap-4">
                  <span>During beta (Growth &amp; Scale)</span>
                  <span className="font-semibold text-white">
                    Included
                  </span>
                </li>
                <li className="flex items-center justify-between gap-4">
                  <span>After beta &mdash; base</span>
                  <span className="font-semibold text-white">
                    $29
                    <span className="text-saasy-muted">/mo</span>
                  </span>
                </li>
                <li className="flex items-center justify-between gap-4">
                  <span>After beta &mdash; per employee</span>
                  <span className="font-semibold text-white">
                    $4
                    <span className="text-saasy-muted">/mo</span>
                  </span>
                </li>
              </ul>
              <p
                className="mb-6
                  text-sm text-saasy-muted"
              >
                For comparison: leading standalone payroll starts at
                $49/mo plus $6 per person &mdash; and it doesn&rsquo;t
                talk to your books, CRM, or compliance calendar.
              </p>
              <a
                href="https://app.hellosaasy.ai/signup"
                className="block rounded-full bg-saasy-rose py-3.5
                  text-center
                  text-sm font-semibold text-white transition-all duration-200
                  hover:bg-saasy-rose-bright"
              >
                Start free trial
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-saasy-border py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2
            className="mb-10 text-center

              text-3xl font-bold text-white"
          >
            What's included
          </h2>
          <div
            className="grid gap-6 sm:grid-cols-2
               text-saasy-muted"
          >
            <div>
              <h3 className="mb-2 font-semibold text-white">
                14-day free trial
              </h3>
              <p className="text-sm">
                Full Growth-plan access for every trial. No credit
                card required to start.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-white">
                Cancel anytime
              </h3>
              <p className="text-sm">
                Month-to-month or annual billing. Switch plans or
                cancel without penalty.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-white">
                Annual saves 20%
              </h3>
              <p className="text-sm">
                Pay yearly and save the equivalent of about two months
                versus monthly billing.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-white">
                US-based support
              </h3>
              <p className="text-sm">
                Email support on all plans. Priority Slack and phone
                support on Scale.
              </p>
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/compare"
              className="
                text-sm text-saasy-pink-soft hover:text-white underline"
            >
              See how SaaSy compares to the tools it replaces &rarr;
            </Link>
          </div>
        </div>
      </section>

      <FAQ />

      <MarketingFooter />
    </div>
  );
}
