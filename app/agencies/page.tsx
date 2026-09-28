import type { Metadata } from "next";
import Link from "next/link";
import { ogImage } from "../components/ogAssets";
import { SiteNav } from "../components/SiteNav";
import { MarketingFooter } from "../components/MarketingFooter";

const DESCRIPTION =
  "For agencies and professional-services firms: every client under " +
  "one roof, billable time that becomes the invoice, contracts " +
  "drafted and signed in-house, and client-health scores before " +
  "the renewal conversation.";

export const metadata: Metadata = {
  title: "For Agencies — SaaSy",
  description: DESCRIPTION,
  alternates: {
    canonical: "https://hellosaasy.ai/agencies",
  },
  openGraph: {
    title: "For Agencies — SaaSy",
    description: DESCRIPTION,
    url: "https://hellosaasy.ai/agencies",
    siteName: "SaaSy",
    type: "website",
    images: [ogImage("agencies")],
  },
  twitter: {
    card: "summary_large_image",
    title: "For Agencies — SaaSy",
    description: DESCRIPTION,
    images: [ogImage("agencies").url],
  },
};

/** One office job an agency stops doing by hand. */
interface AgencyJob {
  title: string;
  body: string;
  detail: string;
}

const JOBS: AgencyJob[] = [
  {
    title: "Every client under one roof",
    body:
      "Agency mode nests each client under your org and rolls the " +
      "results up across all of them. Your brand stays on the front " +
      "of it — clients see your firm, not our logo.",
    detail: "Agency mode: multi-client orgs with your branding",
  },
  {
    title: "A pipeline that knows the next move",
    body:
      "Deals carry a score and a next-best-action instead of a stage " +
      "name and a gut feel. The proposal follow-up lands while the " +
      "prospect still remembers the call.",
    detail: "Deal score + next-best-action on every record",
  },
  {
    title: "Time that becomes the invoice",
    body:
      "Billable time is logged on the delivery project, and the " +
      "invoice builds from it — sent with a Stripe payment link. " +
      "When it clears, the payment writes back to the record.",
    detail: "No end-of-month time reconstruction",
  },
  {
    title: "Contracts drafted, signed, kept",
    body:
      "Turn a project checklist into a contract with the drafting " +
      "assistant, send it for legally binding e-signature with SaaSy " +
      "eSign, and keep every version. Included in every plan — no " +
      "separate DocuSign bill.",
    detail: "Drafting + eSign in every plan",
  },
  {
    title: "Client health before the renewal talk",
    body:
      "Each account gets a 0–100 health score from usage, support " +
      "load, and payment behavior. When a client slides toward " +
      "churn, you hear about it in email or Slack while there's " +
      "still time to fix the relationship.",
    detail: "Churn signals in email or Slack",
  },
];

const FAQ_ITEMS = [
  {
    q: "Can my clients log in and see only their own work?",
    a: "Agency mode is built for exactly that: each client's data stays scoped to their org inside your book, and rollups happen only at your level. Your branding goes on the shared surface.",
  },
  {
    q: "Does SaaSy replace my PM tool?",
    a: "It replaces the business-of-the-agency stack: pipeline, contracts, time, invoicing, client health, and the office filings around them. If your team lives in a dedicated PM board for task detail, SaaSy complements it rather than cloning it.",
  },
  {
    q: "Is eSign really included, or a trial?",
    a: "Included. SaaSy eSign ships with every paid plan — send documents for legally binding signature with version history, no per-envelope pricing.",
  },
  {
    q: "We bill retainers, not time. Does invoicing handle that?",
    a: "Invoices are native records you can build from a deal, a project, or directly — retainer amounts don't need time attached. Stripe payment links go out on the invoice either way.",
  },
];

export default function AgenciesPage(): React.ReactElement {
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
              For agencies &amp; professional services
            </span>
          </div>
          <h1
            className="text-4xl leading-[1.1] font-extrabold
              tracking-tight text-white sm:text-6xl"
          >
            One book of clients.{" "}
            <span className="accent-word">One brain.</span>
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-lg
              leading-relaxed text-saasy-muted sm:text-xl"
          >
            Pipeline, contracts, billable time, invoicing, and
            client-health scores — nested per client, rolled up to
            your firm, and wearing your brand instead of ours.
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
              href="#agency-mode"
              className="inline-flex items-center gap-2 rounded-full
                border border-saasy-border px-8 py-4 text-base
                font-semibold text-saasy-muted transition-colors
                hover:border-saasy-pink/30 hover:text-white"
            >
              How agency mode works
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* ─────────── Who this is for ─────────── */}
        <section className="border-t border-saasy-border py-16 sm:py-20">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <p className="text-lg leading-relaxed text-saasy-muted">
              If your firm lives on{" "}
              <span className="font-semibold text-white">
                retainers, proposals, and billable hours
              </span>{" "}
              and the back office is a{" "}
              <span className="font-semibold text-white">
                stack of point tools that don&rsquo;t talk
              </span>
              , this page is for you. Solo consultant to a
              thirty-person shop — the shape is the same.
            </p>
          </div>
        </section>

        {/* ─────────── The five jobs ─────────── */}
        <section className="border-t border-saasy-border py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Five jobs the agency stack stops doing by hand
              </h2>
              <p className="mt-4 text-lg text-saasy-muted">
                The deal, the contract, the time, the invoice, and the
                health of the account share one record — so nothing
                falls out of the gap between tools.
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

        {/* ─────────── Agency mode, spelled out ─────────── */}
        <section
          id="agency-mode"
          className="border-t border-saasy-border py-24 sm:py-32"
        >
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Agency mode, spelled out
            </h2>
            <dl className="mt-10 space-y-8">
              <div>
                <dt className="text-base font-semibold text-white">
                  Nested client orgs
                </dt>
                <dd className="mt-1 max-w-[65ch] text-sm leading-relaxed text-saasy-muted">
                  Each client is its own org inside yours — contacts,
                  deals, projects, invoices, and documents stay scoped
                  to that client. Your team moves between them without
                  juggling logins.
                </dd>
              </div>
              <div>
                <dt className="text-base font-semibold text-white">
                  Rolled-up results
                </dt>
                <dd className="mt-1 max-w-[65ch] text-sm leading-relaxed text-saasy-muted">
                  Outcomes the agents drive — collected revenue,
                  retained accounts, deadlines met — total across the
                  whole book, so firm-level reporting isn&rsquo;t a
                  quarterly spreadsheet exercise.
                </dd>
              </div>
              <div>
                <dt className="text-base font-semibold text-white">
                  Your brand on the surface
                </dt>
                <dd className="mt-1 max-w-[65ch] text-sm leading-relaxed text-saasy-muted">
                  Client-facing surfaces carry your firm&rsquo;s
                  identity. The platform underneath stays ours; the
                  relationship stays yours.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ─────────── How it fits ─────────── */}
        <section className="border-t border-saasy-border py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Flat price, not per-seat
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-saasy-muted">
              Growth runs $199/mo for up to five businesses and ten
              seats — one client book usually fits inside that. Every
              trial starts on full Growth access for 14 days, no
              credit card up front. Hiring more account people never
              raises your software bill.
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
              The questions agencies ask first
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
              SaaSy is in open beta, and agency mode is young — it
              already does the nesting, rollup, and branding described
              above, and we&rsquo;re hardening the client-portal edge
              cases with our first agency cohort. If that edge matters
              to you, we&rsquo;d rather show you the real state on a
              call than paper over it.
            </p>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
