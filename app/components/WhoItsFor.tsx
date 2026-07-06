import Link from "next/link";

interface Persona {
  title: string;
  description: string;
  benefit: string;
  /** Optional deep link to a vertical landing page. */
  href?: string;
  linkLabel?: string;
}

export function WhoItsFor(): React.ReactElement {
  const personas: Persona[] = [
    {
      title: "Construction & trades",
      description:
        "Public-works GCs and subs living in prevailing-wage paperwork. SaaSy tracks your licenses and filings, runs WH-347 certified payroll, and keeps every bid deadline on your radar.",
      benefit: "Certified payroll without the Sunday spreadsheet",
    },
    {
      title: "Unions & labor organizations",
      description:
        "Dues checkoff, CBA wage scales, and Taft-Hartley fringe remittance are a full-time job. SaaSy calculates them from signed authorizations and cuts the NACHA files for you.",
      benefit: "Dues and fringe, remitted right, every month",
      href: "/unions",
      linkLabel: "See the union compliance add-on →",
    },
    {
      title: "Agencies & service firms",
      description:
        "You bill for your time, so admin is pure loss. Built-in CRM, project tracking, and customer health scores that flag the client who's about to walk while there's still time to save them.",
      benefit: "Know which client is drifting before they ghost you",
    },
  ];

  return (
    <section className="border-t border-saasy-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Built for the people who{" "}
            <span className="accent-word">keep the lights on</span>
          </h2>
          <p className="mt-4 text-lg text-saasy-muted">
            Startup dashboards pitch startups. SaaSy backs the
            contractors bidding public jobs, the unions remitting
            dues, and the agencies keeping clients happy.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {personas.map((persona) => (
            <div
              key={persona.title}
              className="rounded-2xl border border-saasy-border
                bg-saasy-card/50 p-8"
            >
              <h3 className="mb-3 text-xl font-semibold text-white">
                {persona.title}
              </h3>
              <p className="leading-relaxed text-saasy-muted">
                {persona.description}
              </p>
              <p
                className="mt-4 text-sm font-medium
                  text-saasy-pink-soft"
              >
                {persona.benefit}
              </p>
              {persona.href && (
                <Link
                  href={persona.href}
                  className="mt-3 inline-block text-sm font-medium
                    text-saasy-muted underline transition-colors
                    hover:text-white"
                >
                  {persona.linkLabel}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
