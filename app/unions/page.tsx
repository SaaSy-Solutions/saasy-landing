import type { Metadata } from "next";
import Link from "next/link";
import { ogImage } from "../components/ogAssets";
import { SiteNav } from "../components/SiteNav";
import { MarketingFooter } from "../components/MarketingFooter";

const DESCRIPTION =
  "Union dues checkoff, CBA wage scales, Taft-Hartley fringe remittance, " +
  "WH-347 certified payroll, and NACHA payment files. Built for unionized " +
  "employers and prevailing-wage contractors.";

export const metadata: Metadata = {
  title: "Union & Labor Compliance — SaaSy",
  description: DESCRIPTION,
  alternates: {
    canonical: "https://hellosaasy.ai/unions",
  },
  openGraph: {
    title: "Union & Labor Compliance — SaaSy",
    description: DESCRIPTION,
    url: "https://hellosaasy.ai/unions",
    siteName: "SaaSy",
    type: "website",
    images: [ogImage("unions")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Union & Labor Compliance — SaaSy",
    description: DESCRIPTION,
    images: [ogImage("unions").url],
  },
};

/** One compliance job the add-on takes off the payroll desk. */
interface UnionCapability {
  title: string;
  body: string;
  detail: string;
}

const CAPABILITIES: UnionCapability[] = [
  {
    title: "Dues checkoff, calculated and remitted",
    body:
      "Flat amount, percent of wages, or cents-per-hour — computed per " +
      "member per pay period, with signed-authorization tracking so every " +
      "deduction is backed by a card on file.",
    detail: "Authorization records retained for audit",
  },
  {
    title: "CBA wage scales that keep themselves current",
    body:
      "Classification and step rates straight from the agreement, apprentice " +
      "progression handled automatically, and retroactive pay computed when " +
      "a new CBA lands mid-period.",
    detail: "Retro pay runs in one pass, not a weekend",
  },
  {
    title: "Taft-Hartley fringe, remitted per fund",
    body:
      "Health & welfare, pension, and apprenticeship contributions " +
      "calculated per hour worked and reported per trust fund — each fund " +
      "gets its own remittance, not a lump you have to split by hand.",
    detail: "Per-fund remittance reports, every period",
  },
  {
    title: "WH-347 certified payroll, ready to file",
    body:
      "Federal-aid public works paperwork generated from the same payroll " +
      "run — WH-347 forms plus LCPtracker export, with prevailing-wage and " +
      "Davis-Bacon classifications applied.",
    detail: "LCPtracker export included",
  },
  {
    title: "NACHA files from your own bank",
    body:
      "Dues and fund contributions move as ACH payment files you upload to " +
      "your own bank. SaaSy never touches the money — you keep control of " +
      "every disbursement.",
    detail: "Your bank, your accounts, your sign-off",
  },
];

const FAQ_ITEMS = [
  {
    q: "Does SaaSy hold or move the money?",
    a: "No. SaaSy calculates what's owed and generates the NACHA files; you upload them to your own bank and approve every disbursement. The money never passes through us.",
  },
  {
    q: "We have multiple CBAs across trades. Does that work?",
    a: "Yes. Each agreement carries its own classifications, wage scales, fringe schedules, and dues rules. Members are assigned per-CBA, and a payroll run applies the right agreement to the right person.",
  },
  {
    q: "We've run dues on the same desktop program for 20 years. How does our data get in?",
    a: "You don't retype anything. Send us whatever your current system exports (a spreadsheet, a report, anything that prints to CSV) and we load your member roster, classifications, dues rules, and authorization records for you during onboarding. You review the loaded roster against your own records before the first run.",
  },
  {
    q: "What about non-federal prevailing-wage jobs?",
    a: "State prevailing-wage classifications work the same way as Davis-Bacon: set the job's wage determination and certified payroll picks it up.",
  },
];

export default function UnionsPage(): React.ReactElement {
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
              Union &amp; Labor Compliance add-on
            </span>
          </div>
          <h1
            className="text-4xl leading-[1.1] font-extrabold
              tracking-tight text-white sm:text-6xl"
          >
            Certified payroll without the{" "}
            <span className="accent-word">Sunday spreadsheet</span>
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-lg
              leading-relaxed text-saasy-muted sm:text-xl"
          >
            Dues checkoff, CBA wage scales, Taft-Hartley fringe, and
            WH-347 forms, computed from the same payroll run. For the
            employers and contractors who remit, and the locals who
            have to reconcile what arrives.
          </p>
          <div
            className="mt-10 flex flex-col items-center
              justify-center gap-4 sm:flex-row"
          >
            <a
              href="https://app.hellosaasy.ai/contact-sales?topic=union-add-on"
              className="inline-flex rounded-full bg-saasy-rose
                px-8 py-4 text-base font-semibold text-white
                transition-colors hover:bg-saasy-rose-bright"
            >
              Talk to sales
            </a>
            <Link
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-full
                border border-saasy-border px-8 py-4 text-base
                font-semibold text-saasy-muted transition-colors
                hover:border-saasy-pink/30 hover:text-white"
            >
              See member pricing
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* ─────────── Who this is for ─────────── */}
        <section className="border-t border-saasy-border py-16 sm:py-20">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <p className="text-lg leading-relaxed text-saasy-muted">
              If your payroll involves{" "}
              <span className="font-semibold text-white">
                signed dues authorizations
              </span>
              ,{" "}
              <span className="font-semibold text-white">
                trust-fund remittances
              </span>
              , or a{" "}
              <span className="font-semibold text-white">
                wage determination stapled to the bid
              </span>
              , this page is for you. Everyone else can head back to{" "}
              <Link
                href="/features"
                className="text-saasy-pink-soft underline
                  transition-colors hover:text-white"
              >
                the features tour
              </Link>
              .
            </p>
          </div>
        </section>

        {/* ─────────── The five jobs ─────────── */}
        <section className="border-t border-saasy-border py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Five jobs your payroll desk stops doing by hand
              </h2>
              <p className="mt-4 text-lg text-saasy-muted">
                Every calculation comes from the same payroll run, so
                the dues, the fringe, and the certified payroll always
                agree with each other.
              </p>
            </div>

            <div className="mt-14 space-y-12">
              {CAPABILITIES.map((cap, i) => (
                <div
                  key={cap.title}
                  className="grid gap-6 border-b border-saasy-border
                    pb-12 last:border-b-0 last:pb-0 lg:grid-cols-12"
                >
                  <div className="lg:col-span-5">
                    <h3 className="text-xl font-semibold text-white">
                      {cap.title}
                    </h3>
                  </div>
                  <div className="lg:col-span-5">
                    <p className="leading-relaxed text-saasy-muted">
                      {cap.body}
                    </p>
                  </div>
                  <div className="lg:col-span-2">
                    <p className="text-sm font-medium text-saasy-pink-soft">
                      {cap.detail}
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
                This is a real payroll run
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-saasy-muted">
                Not a mockup: a WH-347 certified payroll run inside
                SaaSy — six workers across four classifications on a
                Caltrans corridor job, with Saturday overtime and dues
                checkoff in the deductions. And look closely at the
                bottom panel: SaaSy caught an apprentice-ratio
                violation on this run before it could reach a
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
                in the app &mdash; open it in Excel and check the math.
                SSNs are masked in this sample; real runs carry the
                last four digits the WH-347 requires.
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

        {/* ─────────── Pricing ─────────── */}
        <section
          id="pricing"
          className="border-t border-saasy-border py-24 sm:py-32"
        >
          <div className="mx-auto max-w-4xl px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Priced by active members
              </h2>
              <p className="mt-4 text-lg text-saasy-muted">
                The add-on attaches to a Growth ($149/mo) or Scale
                ($399/mo) plan, so a 50-member shop runs $248/mo all
                in — or $198/mo on annual billing. No per-seat games:
                you pay for the members you actually remit for.
              </p>
            </div>

            <div
              className="mx-auto grid max-w-3xl gap-8
                sm:grid-cols-2"
            >
              <div
                className="rounded-2xl border border-saasy-border
                  bg-saasy-card/50 p-8"
              >
                <h3 className="text-lg font-semibold text-white">
                  Up to 50 members
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">
                    $99
                  </span>
                  <span className="text-saasy-muted">/mo</span>
                </div>
                <p className="mt-1 text-sm text-saasy-muted">
                  $79/mo billed annually
                </p>
              </div>
              <div
                className="rounded-2xl border border-saasy-border
                  bg-saasy-card/50 p-8"
              >
                <h3 className="text-lg font-semibold text-white">
                  Up to 250 members
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">
                    $249
                  </span>
                  <span className="text-saasy-muted">/mo</span>
                </div>
                <p className="mt-1 text-sm text-saasy-muted">
                  $199/mo billed annually
                </p>
              </div>
            </div>

            <p className="mx-auto mt-8 max-w-xl text-center text-sm text-saasy-muted">
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

        {/* ─────────── FAQ ─────────── */}
        <section className="border-t border-saasy-border py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-10 text-center text-3xl font-bold text-white">
              The questions payroll admins ask first
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
              SaaSy is in open beta and we&rsquo;re onboarding union
              employers one at a time, founder-led. You won&rsquo;t
              find a logo wall here yet &mdash; you&rsquo;ll find the
              engineers who built the dues engine on your onboarding
              calls, and a payroll run you can inspect line by line
              above. If that trade works for you, we&rsquo;ll earn the
              logo wall together.
            </p>
          </div>
        </section>

        {/* ─────────── Closing CTA ─────────── */}
        <section className="border-t border-saasy-border">
          <div
            className="hero-gradient mx-auto max-w-3xl px-6 py-24
              text-center sm:py-32"
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Bring us your CBA
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-saasy-muted">
              Attach your agreement right on the form, add your
              headcount, and we&rsquo;ll return a same-day quote with
              your own dues, fringe, and certified payroll mapped out.
            </p>
            <a
              href="https://app.hellosaasy.ai/contact-sales?topic=union-add-on"
              className="mt-8 inline-flex rounded-full bg-saasy-rose
                px-8 py-4 text-base font-semibold text-white
                transition-colors hover:bg-saasy-rose-bright"
            >
              Talk to sales
            </a>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
