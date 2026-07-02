import Link from "next/link";
import type { Metadata } from "next";
import { SiteNav } from "../components/SiteNav";
import { MarketingFooter } from "../components/MarketingFooter";
import { ogImage } from "../components/ogAssets";

export const metadata: Metadata = {
  title: "Compare — SaaSy vs Alternatives",
  description:
    "See how SaaSy compares to spreadsheets, hiring, and other " +
    "tools for running your business.",
  openGraph: {
    siteName: "SaaSy",
    type: "website",
    images: [ogImage("compare")],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImage("compare").url],
  },
};

interface ComparisonRow {
  feature: string;
  saasy: string;
  spreadsheets: string;
  hiring: string;
  otherTools: string;
}

const COMPARISONS: ComparisonRow[] = [
  {
    feature: "Monthly cost",
    saasy: "From $49/mo",
    spreadsheets: "Free",
    hiring: "$5,000–$12,000+",
    otherTools: "$200–$800+",
  },
  {
    feature: "Time to value",
    saasy: "Same day",
    spreadsheets: "Weeks of setup",
    hiring: "2–3 months",
    otherTools: "1–4 weeks",
  },
  {
    feature: "Intelligent insights",
    saasy: "Built-in",
    spreadsheets: "None",
    hiring: "Depends on hire",
    otherTools: "Limited / add-on",
  },
  {
    feature: "Compliance tracking",
    saasy: "Automated",
    spreadsheets: "Manual",
    hiring: "Manual",
    otherTools: "Varies",
  },
  {
    feature: "CRM included",
    saasy: "Yes",
    spreadsheets: "No",
    hiring: "Separate tool needed",
    otherTools: "Sometimes",
  },
  {
    feature: "Intelligent business insights",
    saasy: "Built-in intelligent co-pilot",
    spreadsheets: "Not possible",
    hiring: "Custom build required",
    otherTools: "Rare / enterprise only",
  },
  {
    feature: "Proactive alerts",
    saasy: "Email + Slack, before deadlines",
    spreadsheets: "None",
    hiring: "Manual monitoring",
    otherTools: "Basic email",
  },
  {
    feature: "Multi-business support",
    saasy: "Up to unlimited",
    spreadsheets: "Separate files",
    hiring: "Per-hire",
    otherTools: "Usually 1",
  },
  {
    feature: "Setup complexity",
    saasy: "2-minute guided setup",
    spreadsheets: "DIY formulas",
    hiring: "Job posting + onboarding",
    otherTools: "Moderate",
  },
  {
    feature: "Scales with you",
    saasy: "Starter → Growth → Scale",
    spreadsheets: "Breaks at scale",
    hiring: "Hire more people",
    otherTools: "Upgrade / migrate",
  },
];

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-saasy-dark text-white">
      <SiteNav />

      {/* Hero */}
      <section className="border-b border-saasy-border">
        <div
          className="mx-auto max-w-5xl px-6 py-20
            text-center sm:py-28"
        >
          <h1
            className="
              text-3xl font-bold sm:text-5xl"
          >
            How SaaSy{" "}
            <span className="accent-word">compares</span>
          </h1>
          <p
            className="mx-auto mt-4 max-w-2xl
               text-lg
              text-saasy-muted"
          >
            Replace your spreadsheets, your bookkeeper, your
            compliance tracker, and three SaaS subscriptions with
            one intelligent business operating system.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="border-b border-saasy-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr
                  className="border-b border-saasy-border
                    "
                >
                  <th className="py-4 pr-6 font-semibold text-saasy-muted">
                    Feature
                  </th>
                  <th className="py-4 px-4 font-bold text-saasy-pink-soft">
                    SaaSy
                  </th>
                  <th className="py-4 px-4 font-semibold text-saasy-muted">
                    Spreadsheets
                  </th>
                  <th className="py-4 px-4 font-semibold text-saasy-muted">
                    Hiring
                  </th>
                  <th className="py-4 px-4 font-semibold text-saasy-muted">
                    Other Tools
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {COMPARISONS.map((row) => (
                  <tr
                    key={row.feature}
                    className="border-b border-saasy-border/50"
                  >
                    <td className="py-4 pr-6 font-medium">
                      {row.feature}
                    </td>
                    <td className="py-4 px-4 text-saasy-pink-soft font-medium">
                      {row.saasy}
                    </td>
                    <td className="py-4 px-4 text-saasy-muted">
                      {row.spreadsheets}
                    </td>
                    <td className="py-4 px-4 text-saasy-muted">
                      {row.hiring}
                    </td>
                    <td className="py-4 px-4 text-saasy-muted">
                      {row.otherTools}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom line */}
      <section className="border-b border-saasy-border">
        <div
          className="mx-auto max-w-4xl px-6 py-16
            text-center"
        >
          <h2
            className="
              text-2xl font-bold sm:text-3xl"
          >
            The bottom line
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl
               text-lg
              text-saasy-muted"
          >
            SaaSy gives you compliance tracking, CRM, smart guidance,
            and proactive alerts in one platform &mdash; for less than
            the cost of a single part-time hire. Start your 14-day
            free trial and see the difference.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="https://app.hellosaasy.ai/signup"
              className="inline-flex rounded-full bg-saasy-rose px-8
                py-4  text-base
                font-semibold text-white
                transition-colors hover:bg-saasy-rose-bright"
            >
              Start free trial
            </Link>
            <Link
              href="/#pricing"
              className="inline-flex rounded-full border
                border-saasy-pink/40 px-8 py-4
                 text-base
                font-semibold text-saasy-pink-soft
                transition-colors hover:bg-saasy-rose-bright/10"
            >
              View pricing
            </Link>
          </div>

          <p
            className="mt-8
              text-sm text-saasy-muted"
          >
            Need something more custom?{" "}
            <a
              href="https://saasysolutionsllc.com/consultation"
              className="font-medium text-saasy-orange
                transition-colors hover:text-white"
            >
              Talk to our consulting team &rarr;
            </a>
          </p>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
