import type { Metadata } from "next";
import Link from "next/link";
import { ogImage } from "../components/ogAssets";
import { SiteNav } from "../components/SiteNav";
import { MarketingFooter } from "../components/MarketingFooter";

const DESCRIPTION =
  "For contractors and construction GCs: win the bid, run the job, " +
  "invoice from the work, and get paid by link — with license, " +
  "permit, and insurance deadlines watched for you. Certified " +
  "payroll when the job calls for it.";

export const metadata: Metadata = {
  title: "For Contractors — SaaSy",
  description: DESCRIPTION,
  alternates: {
    canonical: "https://hellosaasy.ai/contractors",
  },
  openGraph: {
    title: "For Contractors — SaaSy",
    description: DESCRIPTION,
    url: "https://hellosaasy.ai/contractors",
    siteName: "SaaSy",
    type: "website",
    images: [ogImage("contractors")],
  },
  twitter: {
    card: "summary_large_image",
    title: "For Contractors — SaaSy",
    description: DESCRIPTION,
    images: [ogImage("contractors").url],
  },
};

/** One office job a contractor stops doing by hand. */
interface ContractorJob {
  title: string;
  body: string;
  detail: string;
}

const JOBS: ContractorJob[] = [
  {
    title: "Bid it, win it, and the record remembers",
    body:
      "Every prospect sits in one pipeline with a deal score and a " +
      "next-best-action on the record — so the follow-up after the " +
      "walkthrough happens this week, not whenever someone remembers " +
      "the folder.",
    detail: "Deal score + next-best-action on every record",
  },
  {
    title: "Won deal to working job in one click",
    body:
      "Close the deal and SaaSy spins up the delivery project " +
      "pre-filled from it. Billable time lives on the job, not in a " +
      "text thread you'll have to reconstruct at invoicing time.",
    detail: "No re-keying the proposal into a job sheet",
  },
  {
    title: "Invoice from the work, paid by link",
    body:
      "Turn the deal or the finished phase into a native invoice and " +
      "send a Stripe payment link. When it clears, the payment writes " +
      "back onto the record — the job shows Paid without a " +
      "spreadsheet reconciliation.",
    detail: "Payment writes back to the deal and the project",
  },
  {
    title: "License and insurance dates, watched",
    body:
      "Contractor licenses, permits, COIs, and filings are tracked " +
      "with reminders that land while you can still renew — not a " +
      "calendar note you find after the lapse.",
    detail: "Reminders arrive before the deadline, not after",
  },
  {
    title: "Certified payroll when the job calls for it",
    body:
      "Prevailing-wage and public-works jobs get WH-347 forms " +
      "generated from the same payroll run, plus LCPtracker export. " +
      "It's the union & labor add-on, and it has its own page.",
    detail: "WH-347 + LCPtracker — see the unions page",
  },
];

const FAQ_ITEMS = [
  {
    q: "We're not a union shop. Is this still for us?",
    a: "Yes. Everything above works without the union add-on — pipeline, projects, invoicing, compliance dates, and payroll in all 50 states + DC. The union add-on is only for employers who remit dues or file certified payroll.",
  },
  {
    q: "Does SaaSy do estimating or takeoffs?",
    a: "No, and we won't pretend it does. SaaSy picks up the moment you win — the record, the job, the billing, the office deadlines. Keep your estimating tool; you'll stop needing the spreadsheet that follows it.",
  },
  {
    q: "Does it replace my accountant or QuickBooks?",
    a: "SaaSy keeps the operational record — deals, jobs, time, invoices, payments — and runs a continuous close that scores how close-ready your books are. Your accountant gets cleaner inputs; whether you keep a separate ledger is a call to make with them.",
  },
  {
    q: "Crews are on the road all day. How does anyone use this?",
    a: "The daily briefing and alerts come to email or Slack — nobody has to live in a dashboard. Time gets entered against the job, and the invoice builds itself from what's already on the record.",
  },
];

export default function ContractorsPage(): React.ReactElement {
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
              For contractors &amp; construction GCs
            </span>
          </div>
          <h1
            className="text-4xl leading-[1.1] font-extrabold
              tracking-tight text-white sm:text-6xl"
          >
            Win the bid. Run the job.{" "}
            <span className="accent-word">Get paid for it.</span>
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-lg
              leading-relaxed text-saasy-muted sm:text-xl"
          >
            One record from proposal to payment: the deal becomes the
            job, the job becomes the invoice, and Stripe pays it back
            onto the record. With the license, permit, and insurance
            deadlines watched in the background.
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
              href="/unions"
              className="inline-flex items-center gap-2 rounded-full
                border border-saasy-border px-8 py-4 text-base
                font-semibold text-saasy-muted transition-colors
                hover:border-saasy-pink/30 hover:text-white"
            >
              Prevailing wage? See the unions page
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* ─────────── Who this is for ─────────── */}
        <section className="border-t border-saasy-border py-16 sm:py-20">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <p className="text-lg leading-relaxed text-saasy-muted">
              If your week runs through{" "}
              <span className="font-semibold text-white">
                bids, jobs, and invoices
              </span>{" "}
              held together by{" "}
              <span className="font-semibold text-white">
                a spreadsheet and somebody&rsquo;s memory
              </span>
              , this page is for you. If you were looking for a lead
              database or an estimating tool, it isn&rsquo;t —{" "}
              <Link
                href="/features"
                className="text-saasy-pink-soft underline
                  transition-colors hover:text-white"
              >
                the features tour
              </Link>{" "}
              will set you straight in two minutes.
            </p>
          </div>
        </section>

        {/* ─────────── The five jobs ─────────── */}
        <section className="border-t border-saasy-border py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Five office jobs a contractor stops doing by hand
              </h2>
              <p className="mt-4 text-lg text-saasy-muted">
                Everything shares one record, so the number on the
                invoice is the number on the job — nobody reconciles
                versions at month end.
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

        {/* ─────────── Evidence: the WH-347, rendered ─────────── */}
        <section className="border-t border-saasy-border py-24 sm:py-32">
          <div
            className="mx-auto grid max-w-6xl items-center gap-12
              px-6 lg:grid-cols-2 lg:gap-16"
          >
            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                On prevailing-wage work, this is a real run
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-saasy-muted">
                Not a mockup: a WH-347 certified payroll run inside
                SaaSy — six workers across four classifications on a
                Caltrans corridor job, with Saturday overtime and dues
                checkoff in the deductions. The compliance panel caught
                an apprentice-ratio violation before it could reach a
                compliance officer.
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-6">
                <a
                  href="/screenshots/wh347-certified-payroll.png"
                  target="_blank"
                  rel="noopener"
                  className="text-sm font-medium text-saasy-pink-soft
                    underline transition-colors hover:text-white"
                >
                  Open the full-size run &rarr;
                </a>
                <a
                  href="/downloads/sample-wh347.csv"
                  download
                  className="text-sm font-medium text-saasy-pink-soft
                    underline transition-colors hover:text-white"
                >
                  Download this run&rsquo;s WH-347 export (CSV) &rarr;
                </a>
              </div>
              <p className="mt-2 max-w-md text-xs text-saasy-muted">
                The CSV is the exact file the Download button produces
                in the app. SSNs are masked in this sample; real runs
                carry the last four digits the WH-347 requires.
              </p>
            </div>
            <a
              href="/screenshots/wh347-certified-payroll.png"
              target="_blank"
              rel="noopener"
              className="relative block overflow-hidden rounded-2xl
                border border-saasy-border bg-saasy-card/80 p-2
                transition-colors hover:border-saasy-pink/30"
              aria-label="Open the full-size WH-347 payroll run screenshot"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/screenshots/wh347-certified-payroll.png"
                alt="SaaSy certified payroll run: WH-347 worker grid for a
                  prevailing-wage highway project with classifications,
                  daily hours, overtime, deductions, and an
                  apprentice-ratio violation flagged by the compliance
                  panel"
                width={1195}
                height={900}
                className="h-auto w-full rounded-lg"
              />
            </a>
          </div>
        </section>

        {/* ─────────── How it fits ─────────── */}
        <section className="border-t border-saasy-border py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              What it costs a small shop
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-saasy-muted">
              Starter runs $49/mo for one business and three seats —
              CRM, compliance tracker, and the daily briefing. Growth
              adds payroll, Slack alerts, and API access. Every trial
              starts on full Growth access for 14 days, no credit
              card up front.
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
              The questions contractors ask first
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
              SaaSy is in open beta. There&rsquo;s no logo wall of
              contractors here yet — what you get instead is founder-led
              onboarding, a real payroll run you can inspect above, and
              a team that ships what you ask for in days, not quarters.
            </p>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
