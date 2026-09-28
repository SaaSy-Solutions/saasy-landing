import type { Metadata } from "next";
import Link from "next/link";
import { ogImage } from "../components/ogAssets";
import { SiteNav } from "../components/SiteNav";
import { MarketingFooter } from "../components/MarketingFooter";
import { FounderNote } from "../components/FounderNote";

const DESCRIPTION =
  "SaaSy is built by SaaSy Solutions LLC, a woman-owned small " +
  "business — a founder-led team that started as consultants " +
  "running other companies' back offices. Reach the people who " +
  "write the code.";

export const metadata: Metadata = {
  title: "About — SaaSy",
  description: DESCRIPTION,
  alternates: {
    canonical: "https://hellosaasy.ai/about",
  },
  openGraph: {
    title: "About — SaaSy",
    description: DESCRIPTION,
    url: "https://hellosaasy.ai/about",
    siteName: "SaaSy",
    type: "website",
    images: [ogImage("about")],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — SaaSy",
    description: DESCRIPTION,
    images: [ogImage("about").url],
  },
};

const PRINCIPLES = [
  {
    title: "Software that does the work",
    body:
      "Most tools hand you a chart of the problem. SaaSy's agents " +
      "chase the deadline, score the account, and draft the " +
      "follow-up — then put a number on what it was worth.",
  },
  {
    title: "Honest about where we are",
    body:
      "We're in open beta. No invented logo wall, no rented " +
      "testimonials. You get the real state of the product on a " +
      "call, and real product in the app.",
  },
  {
    title: "Your data stays yours",
    body:
      "Encrypted in transit and at rest, isolated per account, " +
      "and exportable or deletable on request. GDPR-ready by " +
      "design, not by disclaimer.",
  },
  {
    title: "Priced so small teams can win",
    body:
      "Flat plans, no per-seat games. Hiring should grow your " +
      "business, not your software bill.",
  },
];

export default function AboutPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-saasy-dark">
      <SiteNav />

      {/* ─────────────────── Hero ─────────────────── */}
      <header
        className="hero-gradient relative overflow-hidden
          pt-32 pb-16 sm:pt-40 sm:pb-20"
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div
            className="mb-8 inline-flex items-center gap-2
              rounded-full border border-saasy-pink/20
              bg-saasy-pink/5 px-4 py-1.5"
          >
            <span className="h-2 w-2 rounded-full bg-saasy-pink" />
            <span className="text-sm text-saasy-pink-soft">
              About SaaSy
            </span>
          </div>
          <h1
            className="text-4xl leading-[1.1] font-extrabold
              tracking-tight text-white sm:text-6xl"
          >
            The back office shouldn&rsquo;t be{" "}
            <span className="accent-word">a second job</span>
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-lg
              leading-relaxed text-saasy-muted sm:text-xl"
          >
            SaaSy exists because running a five-person company
            shouldn&rsquo;t require five more tools and a spreadsheet
            to hold them together.
          </p>
        </div>
      </header>

      <main>
        {/* ─────────── The story ─────────── */}
        <section className="border-t border-saasy-border py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Consulting first, product second
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-saasy-muted">
              <p>
                SaaSy started inside{" "}
                <a
                  href="https://saasysolutionsllc.com"
                  className="text-saasy-pink-soft underline
                    transition-colors hover:text-white"
                >
                  SaaSy Solutions LLC
                </a>
                , a woman-owned consulting shop that builds and runs
                automation for small businesses. The platform is the
                tooling we kept rebuilding for clients — customer
                records, invoicing, payroll, compliance calendars,
                hiring — finally shipped as one system instead of
                five engagements.
              </p>
              <p>
                That history shapes the product. Every workflow on
                this site was first done by hand for a real company,
                which is why the demo data looks like a Tuesday
                instead of a pitch deck.
              </p>
            </div>
          </div>
        </section>

        {/* ─────────── The people ─────────── */}
        <section className="border-t border-saasy-border py-24 sm:py-32">
          <FounderNote showAboutLink={false} />
        </section>

        {/* ─────────── Principles ─────────── */}
        <section className="border-t border-saasy-border py-24 sm:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              What we hold ourselves to
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {PRINCIPLES.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-saasy-border
                    bg-saasy-card/50 p-8"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-saasy-muted">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── Reach us ─────────── */}
        <section className="border-t border-saasy-border py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Reach a human
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-saasy-muted">
              Product questions, fit questions, or a second opinion on
              your current stack — the same people answer all three.
            </p>
            <div
              className="mt-8 flex flex-col items-center
                justify-center gap-4 sm:flex-row"
            >
              <a
                href="https://cal.com/saasysolutionsllc"
                className="inline-flex rounded-full bg-saasy-rose
                  px-8 py-4 text-base font-semibold text-white
                  transition-colors hover:bg-saasy-rose-bright"
              >
                Book a call
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full
                  border border-saasy-border px-8 py-4 text-base
                  font-semibold text-saasy-muted transition-colors
                  hover:border-saasy-pink/30 hover:text-white"
              >
                Contact page
              </Link>
            </div>
            <p className="mx-auto mt-8 max-w-md text-sm text-saasy-muted">
              <a
                href="mailto:support@hellosaasy.ai"
                className="text-saasy-pink-soft underline
                  transition-colors hover:text-white"
              >
                support@hellosaasy.ai
              </a>{" "}
              ·{" "}
              <a
                href="mailto:sales@hellosaasy.ai"
                className="text-saasy-pink-soft underline
                  transition-colors hover:text-white"
              >
                sales@hellosaasy.ai
              </a>{" "}
              ·{" "}
              <a
                href="https://www.linkedin.com/company/saasy-solutions"
                className="text-saasy-pink-soft underline
                  transition-colors hover:text-white"
              >
                LinkedIn
              </a>
            </p>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
