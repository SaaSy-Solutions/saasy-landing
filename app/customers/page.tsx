import Link from "next/link";
import type { Metadata } from "next";
import { SiteNav } from "../components/SiteNav";
import { MarketingFooter } from "../components/MarketingFooter";

export const metadata: Metadata = {
  title: "How Founders Use SaaSy — SaaSy",
  description:
    "See how SaaSy is built to help founders save time, cut " +
    "costs, and stay on top of every business they run.",
};

interface UseCase {
  persona: string;
  headline: string;
  description: string;
}

// Illustrative use cases — what SaaSy is built to do, framed around the
// founders we build for. Deliberately NOT presented as named customer
// testimonials with hard metrics: we're in beta and won't fabricate
// results. Swap to real, named stories once design partners agree to be
// featured (see follow-ups against #711).
const USE_CASES: UseCase[] = [
  {
    persona: "First-time founders",
    headline: "Never miss a deadline",
    description:
      "Track every license renewal, tax filing, and regulatory " +
      "deadline automatically, with proactive alerts before " +
      "anything is due — so a forgotten filing never becomes a " +
      "penalty.",
  },
  {
    persona: "Agency owners",
    headline: "One dashboard, every business",
    description:
      "Run multiple ventures from a single place, each with its " +
      "own financials, compliance calendar, and insights. Less " +
      "tool-switching, fewer things slipping through the cracks.",
  },
  {
    persona: "Serial entrepreneurs",
    headline: "Spot wasted spend",
    description:
      "Surface redundant software subscriptions and creeping " +
      "operational costs across your stack, so you can cut what " +
      "you're no longer using.",
  },
];

export default function CustomersPage() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-20">
        <div className="text-center">
          <p
            className="font-[family-name:var(--font-poppins)]
              text-sm font-medium text-saasy-pink"
          >
            Now in public beta
          </p>
          <h1
            className="mt-2 font-[family-name:var(--font-poppins)]
              text-4xl font-bold tracking-tight text-white"
          >
            How founders use SaaSy
          </h1>
          <p
            className="mt-4 font-[family-name:var(--font-poppins)]
              text-lg text-saasy-muted"
          >
            SaaSy is built for founders who run the business and the
            back office. Here&rsquo;s how it&rsquo;s designed to help
            at every stage.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {USE_CASES.map(useCase => (
            <div
              key={useCase.headline}
              className="glow-border flex flex-col rounded-xl
                bg-saasy-card p-8"
            >
              <p
                className="font-[family-name:var(--font-poppins)]
                  text-sm font-medium text-saasy-pink"
              >
                {useCase.persona}
              </p>
              <h2
                className="mt-2 font-[family-name:var(--font-poppins)]
                  text-xl font-semibold text-white"
              >
                {useCase.headline}
              </h2>
              <p
                className="mt-3 flex-1
                  font-[family-name:var(--font-poppins)]
                  text-sm leading-relaxed text-saasy-text"
              >
                {useCase.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2
            className="font-[family-name:var(--font-poppins)]
              text-xl font-semibold text-white"
          >
            Ready to put SaaSy to work?
          </h2>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="https://app.hellosaasy.ai/signup"
              className="rounded-full bg-saasy-pink px-6 py-2.5
                font-[family-name:var(--font-poppins)] text-sm
                font-semibold uppercase tracking-wider text-white
                transition-colors hover:bg-saasy-rose"
            >
              Start Free Trial
            </Link>
            <Link
              href="https://app.hellosaasy.ai/contact-sales"
              className="rounded-full border border-saasy-border px-6
                py-2.5 font-[family-name:var(--font-poppins)] text-sm
                font-semibold text-saasy-text transition-colors
                hover:border-saasy-muted hover:text-white"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </div>
      <MarketingFooter />
    </div>
  );
}
