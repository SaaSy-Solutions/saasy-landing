import { PLAN_PRICES } from "./Pricing";

/**
 * Homepage/pricing FAQ copy. Plain data (no "use client") so the server
 * homepage wrapper can emit FAQPage JSON-LD from the exact text the
 * visible FAQ renders. Every answer must be true today: no unverified
 * metrics, customers, or compliance claims (see the design skill, §5).
 */
export interface FaqItem {
  question: string;
  answer: string;
}

const { starter, growth, scale } = PLAN_PRICES.monthly;

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is Hello SaaSy, and who is it for?",
    answer:
      "Hello SaaSy is a back-office platform for small and mid-sized businesses, built by SaaSy Solutions LLC. It is made for owner-operators of contractors and construction GCs, unions and labor organizations, agencies and professional services firms, and field service companies. One record carries a won deal through delivery, invoicing, and payment, with compliance tracking, payroll, and an AI assistant on the same system.",
  },
  {
    question: "What's included at each price?",
    answer:
      `Starter is $${starter}/month: 1 business, 3 team seats, the compliance tracker, CRM for up to 1,000 contacts, the daily briefing, email alerts, and 500 AI credits a month. Growth is $${growth}/month: up to 5 businesses, 10 seats, 10,000 contacts, native payroll in 50 states + DC, Ask SaaSy AI guidance with 2,000 credits, Slack alerts, and API access. Scale is $${scale}/month: unlimited businesses, advanced analytics, priority support, custom automations, dedicated onboarding, and 5,000 credits. Annual billing saves about 20%.`,
  },
  {
    question: "Is Hello SaaSy live, or still in beta?",
    answer:
      "Both. Hello SaaSy is in open beta: the product is live and anyone can sign up for the 14-day trial today. Beta means we are building alongside our first customers and shipping their feedback quickly, and native payroll is offered on Growth as a beta perk.",
  },
  {
    question:
      "How is it different from point tools like QuickBooks or Jobber?",
    answer:
      "Point tools each do one job well: QuickBooks for accounting, Jobber for field service, a separate CRM, a separate payroll provider. Hello SaaSy keeps the deal, the job, the invoice, the payment, and the compliance deadlines on one record, so nothing gets re-typed between tools. It does not do estimating or takeoffs, and whether you keep a separate ledger is a call to make with your accountant.",
  },
  {
    question: "Does the CRM talk to delivery and billing?",
    answer:
      "Yes. A won deal can spin up a delivery project in one click. The deal or project converts to a native invoice with a Stripe payment link. When they pay, Paid writes back onto the CRM record. That loop ships today. It is not a roadmap slide.",
  },
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
    question: "How is AI usage billed?",
    answer:
      "Each plan includes monthly AI credits: 500 on Starter, 2,000 on Growth (and on the 14-day trial), 5,000 on Scale. Interactive features such as Ask SaaSy, agents, and AI drafts use credits. Document embeddings and memory maintenance are on us. When you run out you can buy $25 packs of 2,000 extra credits, or connect your own AI key so those calls don't count. You'll see remaining credits under Billing → Usage.",
  },
  {
    question: "Is my data used to train AI models?",
    answer:
      "No. Your data answers your questions and runs your workflows, full stop. We don't use it to train foundation models, our AI providers process it under API terms that exclude training on it, and every AI call your account makes is metered and visible in your billing settings.",
  },
  {
    question: "Can I manage multiple businesses?",
    answer:
      "Yes, on Growth (up to 5 businesses) and Scale (unlimited); Starter covers 1. Switch between them from a single dashboard; each keeps its own financials, compliance calendar, and records.",
  },
  {
    question: "What happens after my trial ends?",
    answer:
      "Your 14-day trial includes full Growth plan access, no credit card required. When it ends, pick whichever plan fits. If you need longer to decide, your data sits safely for 30 days. We don't hold it hostage.",
  },
  {
    question: "Can I switch plans or cancel anytime?",
    answer:
      "Yes to both: no contracts, no cancellation fees, no retention specialist calling you at dinner. An account owner or billing admin does either one in Settings → Billing. A plan change takes effect right away, and by default the price difference is prorated onto your next invoice. When you cancel you are not charged again, and unused time in the current period is not refunded. Your data stays restorable for 30 days: click Reactivate in Settings → Billing to pick up where you left off.",
  },
  {
    question: "What integrations do you support?",
    answer:
      "Stripe (financials), QuickBooks Online (accounting), Slack (alerts), Gmail and Microsoft 365 email, Twilio SMS, Google and Outlook calendar sync, and payroll providers (ADP, Gusto, BambooHR, Rippling) all connect today. Bank linking through Plaid is coming soon, and HubSpot, Salesforce, and Jira are on the roadmap. Growth plans and above also get an open API, if you'd rather build your own.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Not long. Answer a few questions about your business and SaaSy drafts your action plan on the spot, then you connect the tools you already use.",
  },
];

/** schema.org FAQPage built from FAQ_ITEMS (server-rendered on "/"). */
export function faqPageJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://hellosaasy.ai/#faq",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
