"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "How does SaaSy handle compliance tracking?",
    answer:
      "SaaSy monitors your regulatory deadlines, tax filings, and license renewals automatically. You get proactive alerts before anything is due — so you never miss a deadline or pay a late fee.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use enterprise-grade encryption (AES-256 at rest, TLS 1.2+ in transit) and strict tenant isolation, so your business data is never shared across accounts.",
  },
  {
    question: "Can I manage multiple businesses?",
    answer:
      "Yes. SaaSy is built for founders who run more than one venture. Switch between businesses from a single dashboard — each with its own financials, compliance calendar, and intelligent insights.",
  },
  {
    question: "What happens after my trial ends?",
    answer:
      "Your 14-day trial includes full Growth plan access — no credit card required. When it ends, choose any plan to continue. Your data is preserved for 30 days if you need more time to decide.",
  },
  {
    question: "Can I switch plans or cancel anytime?",
    answer:
      "Yes to both. Upgrade, downgrade, or cancel from your billing settings with one click. No long-term contracts, no cancellation fees. Changes take effect at the start of your next billing cycle, prorated automatically.",
  },
  {
    question: "What integrations do you support?",
    answer:
      "Connect Stripe for automatic financial tracking and Slack for real-time business alerts — no manual data entry. HubSpot, Salesforce, and Jira connectors are rolling out to beta customers now, and Growth plans and above include an open API.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most owners are up and running in under 10 minutes. Answer a few questions about your business, and SaaSy builds your personalized action plan immediately.",
  },
];

export function FAQ(): React.ReactElement {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="border-t border-saasy-border py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <h2
          className="mb-12 text-center

            text-3xl font-bold text-white sm:text-4xl"
        >
          Frequently asked questions
        </h2>

        <dl>
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question}>
                <dt>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="text-left w-full flex items-center
                      justify-between py-4
                      border-b border-saasy-border"
                  >
                    <span
                      className="text-white

                        text-base font-medium"
                    >
                      {item.question}
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className={`ml-4 h-5 w-5 shrink-0
                        text-saasy-muted transition-transform
                        ${isOpen ? "rotate-180" : ""}`}
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </dt>
                {isOpen && (
                  <dd>
                    <p
                      className="max-w-[65ch] text-saasy-muted
                        text-sm pb-4 pt-3"
                    >
                      {item.answer}
                    </p>
                  </dd>
                )}
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
