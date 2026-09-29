import type { Metadata } from "next";
import Link from "next/link";
import { ogImage } from "../components/ogAssets";
import { SiteNav } from "../components/SiteNav";
import { MarketingFooter } from "../components/MarketingFooter";

const DESCRIPTION =
  "The SaaSy partner program: recurring commission for the " +
  "consultants, bookkeepers, agencies, and creators who send " +
  "small businesses our way. Early cohort open now.";

export const metadata: Metadata = {
  title: "Partner Program — SaaSy",
  description: DESCRIPTION,
  alternates: {
    canonical: "https://hellosaasy.ai/affiliate",
  },
  openGraph: {
    title: "Partner Program — SaaSy",
    description: DESCRIPTION,
    url: "https://hellosaasy.ai/affiliate",
    siteName: "SaaSy",
    type: "website",
    images: [ogImage("affiliate")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partner Program — SaaSy",
    description: DESCRIPTION,
    images: [ogImage("affiliate").url],
  },
};

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Apply",
    body:
      "Tell us who you are and who you reach. We're onboarding the " +
      "first partner cohort one at a time — a short email is all it " +
      "takes to start the conversation.",
  },
  {
    step: "02",
    title: "Share your link",
    body:
      "Approved partners get a tracked referral link. When someone " +
      "signs up through it and becomes a paying customer, the " +
      "referral is attributed to you — no cookies-and-pray guessing.",
  },
  {
    step: "03",
    title: "Earn while they stay",
    body:
      "You earn 30% of the referred account's subscription fees for " +
      "their first 12 months of paid membership — paid on what they " +
      "actually pay, not sticker price. Terms go in writing when you " +
      "join.",
  },
];

const WHO_ITS_FOR = [
  {
    title: "Consultants & bookkeepers",
    body:
      "You already tell clients which tools to run their business " +
      "on. If SaaSy fits, get paid for the recommendation instead " +
      "of giving it away.",
  },
  {
    title: "Agencies serving SMBs",
    body:
      "Your clients need a back office, not another dashboard. " +
      "Refer them — or ask about running SaaSy for them under " +
      "agency mode with your own branding.",
  },
  {
    title: "Creators in the SMB space",
    body:
      "Audience of owners and operators? A tracked link plus a " +
      "product that demonstrably works beats another ad slot.",
  },
];

const FAQ_ITEMS = [
  {
    q: "What commission does it pay?",
    a: "30% of the referred account's subscription fees for their first 12 months of paid membership. It pays on what the customer actually pays, and it's confirmed in writing when you're approved — before you share a single link.",
  },
  {
    q: "How are referrals tracked?",
    a: "By a tracked link issued when you're approved — it looks like app.hellosaasy.ai/signup?ref=your-code. Signups through it are attributed to you on the account record, through their trial and into the paying period.",
  },
  {
    q: "Can I refer a client and get SaaSy for myself instead?",
    a: "Ask us. If your clients could use SaaSy, refer them and we'll talk about crediting the referrals against your own plan — the same kind of deal, shaped to fit.",
  },
  {
    q: "Is there a minimum audience or sales quota?",
    a: "No quota. We'd rather have five partners who send one great-fit customer each than a hundred links in the wild. If a referral isn't a fit, we'd rather tell you than take the signup.",
  },
];

export default function AffiliatePage(): React.ReactElement {
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
              Partner program — early cohort
            </span>
          </div>
          <h1
            className="text-4xl leading-[1.1] font-extrabold
              tracking-tight text-white sm:text-6xl"
          >
            Earn recurring revenue for sending owners{" "}
            <span className="accent-word">our way</span>
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-lg
              leading-relaxed text-saasy-muted sm:text-xl"
          >
            If you advise, serve, or create for small businesses,
            the SaaSy partner program pays you while your referrals
            stay customers. We&rsquo;re building the first cohort
            now — in the open, with terms in writing.
          </p>
          <div
            className="mt-10 flex flex-col items-center
              justify-center gap-4 sm:flex-row"
          >
            <a
              href="mailto:sales@hellosaasy.ai?subject=Partner%20program%20application"
              className="inline-flex rounded-full bg-saasy-rose
                px-8 py-4 text-base font-semibold text-white
                transition-colors hover:bg-saasy-rose-bright"
            >
              Apply — email us
            </a>
            <Link
              href="#how"
              className="inline-flex items-center gap-2 rounded-full
                border border-saasy-border px-8 py-4 text-base
                font-semibold text-saasy-muted transition-colors
                hover:border-saasy-pink/30 hover:text-white"
            >
              How it works
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* ─────────── How it works ─────────── */}
        <section
          id="how"
          className="border-t border-saasy-border py-24 sm:py-32"
        >
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              How it works
            </h2>
            <div className="mt-12 space-y-10">
              {HOW_IT_WORKS.map((item) => (
                <div
                  key={item.step}
                  className="grid gap-4 sm:grid-cols-12"
                >
                  <div className="sm:col-span-2">
                    <span className="text-sm font-bold text-saasy-pink-soft">
                      {item.step}
                    </span>
                  </div>
                  <div className="sm:col-span-10">
                    <h3 className="text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-saasy-muted">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── Who it's for ─────────── */}
        <section className="border-t border-saasy-border py-24 sm:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Who makes a good partner
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {WHO_ITS_FOR.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-saasy-border
                    bg-saasy-card/50 p-8"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-saasy-muted">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── The honest bit ─────────── */}
        <section className="border-t border-saasy-border py-16 sm:py-20">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Why there&rsquo;s no % on this page
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-saasy-muted">
              Because the program is being set with its first cohort
              right now. Publishing a number today and revising it in
              a month is how programs lose trust — so we&rsquo;d
              rather share the current terms directly with every
              applicant. If that sounds overly careful for a partner
              page, good: that&rsquo;s the same instinct we bring to
              your referrals.
            </p>
          </div>
        </section>

        {/* ─────────── FAQ ─────────── */}
        <section className="border-t border-saasy-border py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-10 text-center text-3xl font-bold text-white">
              Partner questions, answered
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

        {/* ─────────── Final CTA ─────────── */}
        <section className="border-t border-saasy-border">
          <div
            className="hero-gradient mx-auto max-w-4xl px-6
              py-24 text-center sm:py-32"
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to partner?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-saasy-muted">
              One email starts it. Tell us who you reach and we&rsquo;ll
              send the current terms.
            </p>
            <a
              href="mailto:sales@hellosaasy.ai?subject=Partner%20program%20application"
              className="mt-8 inline-flex rounded-full bg-saasy-rose
                px-8 py-4 text-base font-semibold text-white
                transition-colors hover:bg-saasy-rose-bright"
            >
              sales@hellosaasy.ai
            </a>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
