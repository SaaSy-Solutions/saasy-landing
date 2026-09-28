import type { Metadata } from "next";
import Link from "next/link";
import { ogImage } from "../components/ogAssets";
import { SiteNav } from "../components/SiteNav";
import { MarketingFooter } from "../components/MarketingFooter";

const DESCRIPTION =
  "For field-service businesses — HVAC, plumbing, electrical, and " +
  "the trades: quote to cash on one record, payroll in all 50 " +
  "states, license and insurance dates watched, and hiring built " +
  "into the same system.";

export const metadata: Metadata = {
  title: "For Field Service — SaaSy",
  description: DESCRIPTION,
  alternates: {
    canonical: "https://hellosaasy.ai/field-service",
  },
  openGraph: {
    title: "For Field Service — SaaSy",
    description: DESCRIPTION,
    url: "https://hellosaasy.ai/field-service",
    siteName: "SaaSy",
    type: "website",
    images: [ogImage("field-service")],
  },
  twitter: {
    card: "summary_large_image",
    title: "For Field Service — SaaSy",
    description: DESCRIPTION,
    images: [ogImage("field-service").url],
  },
};

/** One office job a service shop stops doing by hand. */
interface ServiceJob {
  title: string;
  body: string;
  detail: string;
}

const JOBS: ServiceJob[] = [
  {
    title: "Quote to cash on one record",
    body:
      "The estimate conversation lives in the pipeline, the won " +
      "deal becomes the job, and the finished job becomes the " +
      "invoice — sent with a Stripe payment link so the customer " +
      "can pay from their phone before you leave the driveway.",
    detail: "Deal → job → invoice → paid, one record",
  },
  {
    title: "A briefing, not a dashboard to babysit",
    body:
      "The morning brief reads the business for you — what came in, " +
      "what slipped, what needs a call today — delivered by email " +
      "or Slack. Nobody on the crew has to learn a new screen to " +
      "stay informed.",
    detail: "Daily briefing in email or Slack",
  },
  {
    title: "Licenses, permits, insurance — before they lapse",
    body:
      "Contractor licenses, COIs, permits, and filings sit in a " +
      "tracker with reminders that arrive with enough lead time to " +
      "actually renew. A lapsed COI shouldn't be how you find out " +
      "about a lapsed COI.",
    detail: "Compliance tracker with lead-time reminders",
  },
  {
    title: "Payroll that doesn't fight you",
    body:
      "Native payroll covers all 50 states + DC on Growth — techs, " +
      "office staff, overtime — without exporting to a separate " +
      "payroll vendor and re-importing the journal entries.",
    detail: "50 states + DC, on the Growth plan",
  },
  {
    title: "Hire the next tech without a second tool",
    body:
      "Post the role, track candidates, send the offer, and run " +
      "onboarding inside the same system that runs the rest of the " +
      "shop. No bolt-on ATS bill for a five-person crew.",
    detail: "ATS, offers, and onboarding in one place",
  },
];

const FAQ_ITEMS = [
  {
    q: "Is SaaSy a dispatch board or GPS tracker?",
    a: "No — and we won't pretend to be one. SaaSy is the office side of the shop: the customer record, the job, the invoice, payroll, hiring, and compliance dates. If you need truck routing, keep your dispatch tool; SaaSy replaces the spreadsheet stack behind it.",
  },
  {
    q: "My techs don't sit at computers. How does anyone use this?",
    a: "The owner and office get the daily briefing and alerts by email or Slack — no dashboard babysitting. Time lands on the job, the invoice builds from it, and the customer pays by link from their own phone.",
  },
  {
    q: "We're small — three trucks. Is this overkill?",
    a: "Starter is priced for exactly that size: $49/mo for one business and three seats. The point of the platform is that the office work scales without hiring an office person to run it.",
  },
  {
    q: "Does it do recurring service agreements?",
    a: "Customer records, invoicing, and reminder-driven follow-ups are all there today. Deep maintenance-agreement scheduling is the kind of feature our beta customers shape — tell us what yours look like and it moves up the list.",
  },
];

export default function FieldServicePage(): React.ReactElement {
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
              For field-service businesses
            </span>
          </div>
          <h1
            className="text-4xl leading-[1.1] font-extrabold
              tracking-tight text-white sm:text-6xl"
          >
            Less office.{" "}
            <span className="accent-word">More jobs.</span>
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-lg
              leading-relaxed text-saasy-muted sm:text-xl"
          >
            The customer record, the job, the invoice, the payroll,
            and the license renewals — one system for HVAC, plumbing,
            electrical, and the trades. Built so the office side of
            the shop stops eating your evenings.
          </p>
          <div
            className="mt-10 flex flex-col items-center
              justify-center gap-4 sm:flex-row"
          >
            <a
              href="https://app.hellosaasy.ai/signup"
              className="inline-flex rounded-full bg-saasy-rose
                px-8 py-4 text-base font-semibold text-white
                transition-colors hover:bg-saasy-rose-bright"
            >
              Start free trial
            </a>
            <Link
              href="#the-jobs"
              className="inline-flex items-center gap-2 rounded-full
                border border-saasy-border px-8 py-4 text-base
                font-semibold text-saasy-muted transition-colors
                hover:border-saasy-pink/30 hover:text-white"
            >
              See what it does
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* ─────────── Who this is for ─────────── */}
        <section className="border-t border-saasy-border py-16 sm:py-20">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <p className="text-lg leading-relaxed text-saasy-muted">
              If your shop runs on{" "}
              <span className="font-semibold text-white">
                trucks, techs, and invoices
              </span>{" "}
              and the paperwork happens{" "}
              <span className="font-semibold text-white">
                after dinner
              </span>
              , this page is for you. If you&rsquo;re a public-works
              contractor instead,{" "}
              <Link
                href="/contractors"
                className="text-saasy-pink-soft underline
                  transition-colors hover:text-white"
              >
                the contractors page
              </Link>{" "}
              is the closer fit.
            </p>
          </div>
        </section>

        {/* ─────────── The five jobs ─────────── */}
        <section
          id="the-jobs"
          className="border-t border-saasy-border py-24 sm:py-32"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Five office jobs a service shop stops doing by hand
              </h2>
              <p className="mt-4 text-lg text-saasy-muted">
                One record runs the whole customer loop, so the only
                thing moving between systems is the tech in the truck.
              </p>
            </div>

            <div className="mt-14 space-y-12">
              {JOBS.map((job) => (
                <div
                  key={job.title}
                  className="grid gap-6 border-b border-saasy-border
                    pb-12 last:border-b-0 last:pb-0 lg:grid-cols-12"
                >
                  <div className="lg:col-span-5">
                    <h3 className="text-xl font-semibold text-white">
                      {job.title}
                    </h3>
                  </div>
                  <div className="lg:col-span-5">
                    <p className="leading-relaxed text-saasy-muted">
                      {job.body}
                    </p>
                  </div>
                  <div className="lg:col-span-2">
                    <p className="text-sm font-medium text-saasy-pink-soft">
                      {job.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── How it fits ─────────── */}
        <section className="border-t border-saasy-border py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Priced for a shop, not an enterprise
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-saasy-muted">
              Starter runs $49/mo for one business and three seats.
              A typical service shop pays $320–500 a month stitching
              together CRM, invoicing, payroll, and reminder tools —
              SaaSy replaces that stack at one flat price, and adding
              a tech never raises your software bill.
            </p>
            <div className="mt-8">
              <Link
                href="/pricing"
                className="inline-flex rounded-full bg-saasy-rose
                  px-8 py-4 text-base font-semibold text-white
                  transition-colors hover:bg-saasy-rose-bright"
              >
                See plans
              </Link>
            </div>
          </div>
        </section>

        {/* ─────────── FAQ ─────────── */}
        <section className="border-t border-saasy-border py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-10 text-center text-3xl font-bold text-white">
              The questions shop owners ask first
            </h2>
            <dl className="space-y-8">
              {FAQ_ITEMS.map((item) => (
                <div key={item.q}>
                  <dt className="text-base font-semibold text-white">
                    {item.q}
                  </dt>
                  <dd className="mt-2 max-w-[65ch] text-sm leading-relaxed text-saasy-muted">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ─────────── Where this stands (honest) ─────────── */}
        <section className="border-t border-saasy-border py-16 sm:py-20">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              A straight answer on where this stands
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-saasy-muted">
              SaaSy is in open beta. What&rsquo;s on this page is what
              ships today — and what&rsquo;s missing (deep dispatch
              boards, for one) we say plainly above. You&rsquo;ll
              onboard with the people who built it, and your feedback
              lands in the product in days.
            </p>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
