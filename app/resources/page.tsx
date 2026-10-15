import type { Metadata } from "next";
import { ogImage } from "../components/ogAssets";
import { SiteNav } from "../components/SiteNav";
import { MarketingFooter } from "../components/MarketingFooter";

// OG card: reuses the home card until a dedicated `resources.png` is rendered
// (video/src/OgCard.tsx). Placeholder asset slot — swap for
// `ogImage("resources")` once the card exists so the social preview matches
// the page.
const OG = ogImage("home");

const DESCRIPTION =
  "Free HR templates from SaaSy: an employee onboarding SOP, an offer " +
  "letter template, and a PTO policy template. Downloadable DOCX files " +
  "for small business teams.";

export const metadata: Metadata = {
  title: "Resources | HelloSaaSy",
  description: DESCRIPTION,
  alternates: {
    canonical: "https://hellosaasy.ai/resources",
  },
  openGraph: {
    title: "Resources | HelloSaaSy",
    description: DESCRIPTION,
    url: "https://hellosaasy.ai/resources",
    siteName: "SaaSy",
    type: "website",
    images: [OG],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources | HelloSaaSy",
    description: DESCRIPTION,
    images: [OG.url],
  },
};

/** HR template downloads offered on the Resources page. */
const TEMPLATES = [
  {
    title: "Employee Onboarding SOP",
    body:
      "A step-by-step SOP taking a new hire from signed offer to fully " +
      "productive, with before-day-one, day-one, week-one, and 30/60/90-day " +
      "checklists.",
    href: "/downloads/employee-onboarding-sop.docx",
  },
  {
    title: "Offer Letter Template",
    body:
      "A fill-in-the-blank employment offer letter with key terms, " +
      "contingency clause, at-will language, and an acceptance signature " +
      "block.",
    href: "/downloads/offer-letter-template.docx",
  },
  {
    title: "PTO Policy Template",
    body:
      "A PTO policy template with accrual options, requesting time off, " +
      "carryover, separation, holidays, and sick leave.",
    href: "/downloads/pto-policy-template.docx",
  },
];

export default function ResourcesPage(): React.ReactElement {
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
            <span className="text-sm text-saasy-pink-soft">Resources</span>
          </div>
          <h1
            className="text-4xl leading-[1.1] font-extrabold
              tracking-tight text-white sm:text-6xl"
          >
            Resources
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-lg
              leading-relaxed text-saasy-muted sm:text-xl"
          >
            Free templates and guides to help your small business run
            smoother.
          </p>
        </div>
      </header>

      <main>
        {/* ─────────── HR templates ─────────── */}
        <section className="border-t border-saasy-border py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <h2
              className="text-center text-3xl font-bold text-white
                sm:text-4xl"
            >
              HR Templates
            </h2>
            <p
              className="mx-auto mt-4 max-w-2xl text-center text-lg
                leading-relaxed text-saasy-muted"
            >
              Downloadable DOCX files you can edit for your team.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {TEMPLATES.map((template) => (
                <div
                  key={template.href}
                  className="flex flex-col rounded-2xl border
                    border-saasy-border bg-saasy-card/50 p-8"
                >
                  <h3 className="text-xl font-bold text-white">
                    {template.title}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-saasy-muted">
                    {template.body}
                  </p>
                  <a
                    href={template.href}
                    download
                    className="mt-8 inline-flex w-fit rounded-full
                      bg-saasy-rose px-6 py-3 text-sm font-semibold
                      text-white transition-colors
                      hover:bg-saasy-rose-bright"
                  >
                    Download DOCX
                  </a>
                </div>
              ))}
            </div>
            <p
              className="mx-auto mt-12 max-w-3xl text-center text-sm
                leading-relaxed text-saasy-muted"
            >
              These templates are provided as general resources and are not
              legal advice. Have them reviewed by your attorney before use.
            </p>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
