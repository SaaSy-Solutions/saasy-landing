import Image from "next/image";

interface ScreenshotFeature {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  badge?: string;
}

const FEATURES: ScreenshotFeature[] = [
  {
    title: "CRM Built for Growth",
    description:
      "Track every customer relationship from first contact to long-term partner. " +
      "Manage companies, contacts, deals, and pipelines in one place — no spreadsheet juggling.",
    imageSrc: "/images/product/customers-list.png",
    imageAlt:
      "SaaSy CRM companies list showing Beacon Veterinary, Clearwater Analytics, Ironforge Metalworks, and other customers with industry tags and stage badges",
    badge: "CRM",
  },
  {
    title: "Customer Health Monitoring",
    description:
      "Know which customers need attention before they churn. " +
      "AI-powered health scoring surfaces at-risk accounts, renewal windows, and expansion signals " +
      "so your team acts early.",
    imageSrc: "/images/product/health-dashboard.png",
    imageAlt:
      "SaaSy health dashboard showing customer health scores and AI-driven risk indicators",
    badge: "AI Insights",
  },
  {
    title: "Proactive Alerts",
    description:
      "Stop firefighting. SaaSy monitors usage patterns, renewal dates, and engagement signals " +
      "24/7 and surfaces only the alerts that matter — so nothing slips through the cracks.",
    imageSrc: "/images/product/alerts-page.png",
    imageAlt:
      "SaaSy alerts page showing renewal risk, value decline, and expansion opportunity alerts",
    badge: "Alerts",
  },
  {
    title: "Deep Integrations",
    description:
      "Connect your existing tools in minutes. Salesforce, HubSpot, Stripe, Jira, and dozens more. " +
      "SaaSy syncs your customer data automatically so your dashboards are always current.",
    imageSrc: "/images/product/integrations.png",
    imageAlt:
      "SaaSy integrations page showing available OAuth connectors including Salesforce, HubSpot, Stripe, and Jira",
    badge: "Integrations",
  },
  {
    title: "Business Roadmap & Checklist",
    description:
      "From formation to scale — SaaSy generates a personalized business roadmap " +
      "and tracks every milestone. Never miss a compliance deadline, renewal, or growth step again.",
    imageSrc: "/images/product/success-plan.png",
    imageAlt:
      "SaaSy business checklist and roadmap showing formation, compliance, and operations milestones",
    badge: "Roadmap",
  },
  {
    title: "Guided Onboarding",
    description:
      "Up and running in minutes. SaaSy's onboarding wizard learns your business, " +
      "detects your current stage, and builds your personalized action plan — no configuration required.",
    imageSrc: "/images/product/onboarding.png",
    imageAlt:
      "SaaSy onboarding wizard step 4 showing a personalized business roadmap with recommended next steps",
    badge: "Setup",
  },
];

export function ProductScreenshots(): React.ReactElement {
  return (
    <section
      id="product"
      className="border-t border-saasy-border py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <h2
            className="font-[family-name:var(--font-poppins)]
              text-3xl font-bold text-white sm:text-4xl"
          >
            See SaaSy in{" "}
            <span className="gradient-text">action</span>
          </h2>
          <p
            className="mt-4 font-[family-name:var(--font-poppins)]
              text-lg text-saasy-muted"
          >
            Real screenshots from a live SaaSy account.
          </p>
        </div>

        {/* Demo screencast */}
        <div className="mb-24">
          <div className="glow-border overflow-hidden rounded-2xl shadow-2xl">
            {/* Title bar */}
            <div className="flex items-center gap-2 border-b border-saasy-border bg-saasy-card/90 px-4 py-2.5">
              <div className="h-3 w-3 rounded-full bg-red-500/60" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
              <div className="h-3 w-3 rounded-full bg-green-500/60" />
              <span className="ml-3 font-[family-name:var(--font-poppins)] text-xs text-saasy-muted">
                app.hellosaasy.ai — Live product tour
              </span>
            </div>
            {/* GIF demo — autoloops, no controls needed */}
            <Image
              src="/images/product/demo-tour.gif"
              alt="SaaSy product tour: Command Center → CRM Companies → Alerts → Integrations → Ask SaaSy AI"
              width={1200}
              height={750}
              className="w-full"
              unoptimized
            />
          </div>
          <p className="mt-4 text-center font-[family-name:var(--font-poppins)] text-sm text-saasy-muted">
            A 15-second tour across the Command Center, CRM, Alerts, Integrations, and AI chat.
          </p>
        </div>

        {/* Alternating feature rows */}
        <div className="space-y-28">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className={`flex flex-col gap-12 lg:flex-row lg:items-center ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Text side */}
              <div className="flex-1 space-y-4">
                {feature.badge && (
                  <span
                    className="inline-block rounded-full
                      border border-saasy-pink/30
                      bg-saasy-pink/10 px-3 py-1
                      font-[family-name:var(--font-poppins)]
                      text-xs font-semibold text-saasy-pink"
                  >
                    {feature.badge}
                  </span>
                )}
                <h3
                  className="font-[family-name:var(--font-poppins)]
                    text-2xl font-bold text-white sm:text-3xl"
                >
                  {feature.title}
                </h3>
                <p
                  className="font-[family-name:var(--font-poppins)]
                    leading-relaxed text-saasy-muted"
                >
                  {feature.description}
                </p>
              </div>

              {/* Screenshot side */}
              <div className="flex-1">
                <div
                  className="glow-border overflow-hidden
                    rounded-xl shadow-2xl"
                >
                  <Image
                    src={feature.imageSrc}
                    alt={feature.imageAlt}
                    width={960}
                    height={600}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
