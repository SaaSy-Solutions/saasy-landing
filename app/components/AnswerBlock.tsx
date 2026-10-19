import Link from "next/link";
import { PLAN_PRICES } from "./Pricing";

/**
 * Opening answer block: a 40-60 word, self-contained summary placed
 * directly under the hero so a skimming owner and an AI summary both get
 * what Hello SaaSy is, who it is for, and what it costs in one read.
 * Prices come from PLAN_PRICES; tier claims must match the Pricing cards
 * (payroll and Ask SaaSy AI are Growth and up, not Starter).
 */
export function AnswerBlock(): React.ReactElement {
  const { starter, growth } = PLAN_PRICES.monthly;
  return (
    <section
      aria-labelledby="answer-block-heading"
      className="border-t border-saasy-border bg-saasy-card/30"
    >
      <div className="mx-auto max-w-6xl px-6 py-10 sm:py-12">
        <div className="max-w-3xl">
          <h2
            id="answer-block-heading"
            className="text-sm font-semibold uppercase tracking-wider
              text-saasy-pink-soft"
          >
            Hello SaaSy in one paragraph
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-saasy-text">
            Hello SaaSy is a back-office platform for small and
            mid-sized businesses: contractors, unions, agencies, and
            service firms. A won deal moves through delivery, invoicing,
            and payment on one record. Starter is ${starter}/month with
            CRM and compliance tracking; native payroll and the Ask SaaSy
            AI assistant are on Growth at ${growth}/month. Open beta,
            14-day free trial.
          </p>
          <Link
            href="/pricing"
            className="mt-4 inline-block text-sm font-medium
              text-saasy-pink-soft transition-colors hover:text-white"
          >
            Compare every plan &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
