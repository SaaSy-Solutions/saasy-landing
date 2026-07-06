"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "How does SaaSy handle compliance tracking?",
    answer:
      "SaaSy watches your regulatory deadlines, tax filings, and license renewals for you. When something's coming due, you hear about it early enough to actually do something about it. Late fees fund other people's software.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, and we're happy to bore you with specifics: AES-256 encryption at rest, TLS 1.2+ in transit, and strict per-account isolation. Your data never mingles with anyone else's, and you can export or delete it whenever you like.",
  },
  {
    question: "Is my data used to train AI models?",
    answer:
      "No. Your data answers your questions and runs your workflows, full stop. The AI providers we use are contractually barred from training on your data, we don't build models on it either, and every AI call your account makes is metered and visible in your billing settings.",
  },
  {
    question: "Can I manage multiple businesses?",
    answer:
      "Yes. Plenty of our customers run more than one company. Switch between them from a single dashboard; each keeps its own financials, compliance calendar, and health scores.",
  },
  {
    question: "What happens after my trial ends?",
    answer:
      "Your 14-day trial includes full Growth plan access, no credit card required. When it ends, pick whichever plan fits. If you need longer to decide, your data sits safely for 30 days. We don't hold it hostage.",
  },
  {
    question: "Can I switch plans or cancel anytime?",
    answer:
      "Yes to both. Switch or cancel whenever you like — no contracts, no cancellation fees, no retention specialist calling you at dinner. Tell us the change and our team makes it, effective at the start of your next billing cycle.",
  },
  {
    question: "What integrations do you support?",
    answer:
      "Stripe (financials), Slack (alerts), Gmail and Microsoft 365 email, Twilio SMS, Google and Outlook calendar sync, bank feeds through Plaid, and payroll providers (ADP, Gusto, BambooHR, Rippling) all connect today. HubSpot, Salesforce, and Jira are on the roadmap. Growth plans and above also get an open API, if you'd rather build your own.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Under 10 minutes for most owners. Answer a few questions about your business and SaaSy drafts your action plan on the spot.",
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
