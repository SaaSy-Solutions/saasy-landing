"use client";

import { useState } from "react";
import {
  PLAN_PRICES,
  UNION_ADDON_PRICES,
  getBillingLabel,
  PricingToggle,
  type BillingInterval,
} from "../components/Pricing";

/**
 * Member-band pricing for the union add-on. Uses the same toggle and
 * the same price tables as /pricing, so the numbers can never drift
 * from the main pricing page.
 */
export function UnionPricing(): React.ReactElement {
  const [interval, setInterval] = useState<BillingInterval>("monthly");
  const plan = PLAN_PRICES[interval];
  const addon = UNION_ADDON_PRICES[interval];
  const otherInterval: BillingInterval =
    interval === "annual" ? "monthly" : "annual";
  const otherAddon = UNION_ADDON_PRICES[otherInterval];

  /** All-in monthly cost of Growth + the up-to-50-member band. */
  const allIn = plan.growth + addon.band50;

  const bands = [
    { name: "Up to 50 members", price: addon.band50, other: otherAddon.band50 },
    {
      name: "Up to 250 members",
      price: addon.band250,
      other: otherAddon.band250,
    },
  ];

  return (
    <section
      id="pricing"
      className="border-t border-saasy-border py-24 sm:py-32"
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Priced by active members
          </h2>
          <p className="mt-4 text-lg text-saasy-muted">
            The add-on attaches to a Growth (${plan.growth}/mo) or Scale
            (${plan.scale}/mo) plan, so a 50-member shop runs ${allIn}
            /mo all in
            {interval === "annual" ? ", billed annually" : ""}. No
            per-seat games: you pay for the members you actually remit
            for.
          </p>
        </div>

        <div className="mb-10 flex justify-center">
          <PricingToggle interval={interval} onChange={setInterval} />
        </div>

        <div className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-2">
          {bands.map((band) => (
            <div
              key={band.name}
              className="rounded-2xl border border-saasy-border
                bg-saasy-card/50 p-8"
            >
              <h3 className="text-lg font-semibold text-white">
                {band.name}
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">
                  ${band.price}
                </span>
                <span className="text-saasy-muted">
                  {getBillingLabel(interval)}
                </span>
              </div>
              <p className="mt-1 text-sm text-saasy-muted">
                ${band.other}
                {getBillingLabel(otherInterval)}
              </p>
            </div>
          ))}
        </div>

        <p
          className="mx-auto mt-8 max-w-xl text-center text-sm
            text-saasy-muted"
        >
          Larger rosters (250+) are custom-quoted: tell us your
          headcount and trades and we&rsquo;ll price it same-day.
        </p>

        <div className="mt-8 text-center">
          <a
            href="https://app.hellosaasy.ai/contact-sales?topic=union-add-on"
            className="inline-flex rounded-full bg-saasy-rose
              px-8 py-4 text-base font-semibold text-white
              transition-colors hover:bg-saasy-rose-bright"
          >
            Talk to sales
          </a>
        </div>
      </div>
    </section>
  );
}
