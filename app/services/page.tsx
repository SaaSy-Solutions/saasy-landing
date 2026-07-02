import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "../components/SiteNav";
import { MarketingFooter } from "../components/MarketingFooter";
import { ogImage } from "../components/ogAssets";

export const metadata: Metadata = {
  title: "Services | SaaSy Solutions",
  description:
    "Custom automation, integrations, and systems consulting from " +
    "the team behind SaaSy. 25+ years of senior engineering experience.",
  openGraph: {
    siteName: "SaaSy",
    type: "website",
    images: [ogImage("services")],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImage("services").url],
  },
};

interface Service {
  name: string;
  description: string;
  highlights: string[];
  startingAt: string;
  href: string;
}

const SERVICES: Service[] = [
  {
    name: "Process Automation & Workflow Optimization",
    description:
      "Turn manual, repetitive tasks into reliable automated " +
      "workflows. We map your existing processes, identify " +
      "bottlenecks, and build systems that run without you.",
    highlights: [
      "End-to-end workflow design",
      "Integration with existing tools",
      "Staff training included",
      "Rapid implementation",
    ],
    startingAt: "$4,500",
    href: "https://saasysolutionsllc.com/#services",
  },
  {
    name: "Intelligent Customer Experience",
    description:
      "Deploy intelligent chatbots, automated response systems, " +
      "and sentiment analysis that handle routine interactions " +
      "so your team can focus on high-value conversations.",
    highlights: [
      "24/7 intelligent support",
      "Sentiment analysis & routing",
      "Multi-channel deployment",
      "Rapid implementation",
    ],
    startingAt: "$3,500",
    href: "https://saasysolutionsllc.com/#services",
  },
  {
    name: "Predictive Analytics & Decision Intelligence",
    description:
      "Stop guessing and start knowing. We build dashboards " +
      "and models that forecast demand, flag risks, and surface " +
      "the insights that actually move your business forward.",
    highlights: [
      "Demand forecasting",
      "Risk detection",
      "KPI dashboards",
      "90%+ forecast accuracy",
    ],
    startingAt: "$6,500",
    href: "https://saasysolutionsllc.com/#services",
  },
  {
    name: "Custom Systems Development & Integration",
    description:
      "Need something the off-the-shelf tools can't do? We " +
      "design and build custom AI solutions — machine learning " +
      "models, NLP systems, computer vision, and API integrations " +
      "tailored to your exact needs.",
    highlights: [
      "Custom ML models",
      "API development",
      "Cloud integration",
      "Production-grade delivery",
    ],
    startingAt: "$9,500",
    href: "https://saasysolutionsllc.com/#services",
  },
  {
    name: "Data Intelligence & MLOps",
    description:
      "Transform raw data into a competitive advantage. We build " +
      "data pipelines, train and deploy models, and set up the " +
      "infrastructure to keep everything running reliably.",
    highlights: [
      "Data pipeline architecture",
      "Model training & deployment",
      "Automated monitoring",
      "Scalable infrastructure",
    ],
    startingAt: "$8,000",
    href: "https://saasysolutionsllc.com/#services",
  },
  {
    name: "Intelligent Search & Discovery",
    description:
      "Help your customers and team find exactly what they need. " +
      "We implement semantic search, recommendation engines, and " +
      "intelligent content discovery systems.",
    highlights: [
      "Semantic search",
      "Recommendation engines",
      "Content discovery",
      "Relevance tuning",
    ],
    startingAt: "$5,500",
    href: "https://saasysolutionsllc.com/#services",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-saasy-dark text-white">
      <SiteNav />

      {/* Hero */}
      <section className="border-b border-saasy-border">
        <div
          className="mx-auto max-w-5xl px-6 pt-32 pb-16
            text-center sm:pb-20"
        >
          <p
            className="
              text-sm font-semibold text-saasy-orange"
          >
            SaaSy Solutions &middot; 25+ Years of Experience
          </p>
          <h1
            className="mt-3
              text-3xl font-bold sm:text-5xl"
          >
            Custom AI Systems,{" "}
            <span className="accent-word">
              Built for You
            </span>
          </h1>
          <p
            className="mx-auto mt-4 max-w-2xl
               text-lg
              text-saasy-muted"
          >
            SaaSy the platform handles the day-to-day. But when you
            need custom automations, deep integrations, or a
            dedicated engineering partner &mdash; our consulting team
            at SaaSy Solutions designs, builds, and manages the
            systems that run your business.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://saasysolutionsllc.com/consultation"
              className="inline-flex rounded-full bg-saasy-orange
                px-8 py-4
                text-base font-semibold text-white transition-colors hover:bg-[#c45f2e]"
            >
              Schedule a consultation
            </a>
            <a
              href="https://saasysolutionsllc.com"
              className="inline-flex rounded-full border
                border-saasy-orange/40 px-8 py-4
                 text-base
                font-semibold text-saasy-orange transition-colors
                hover:bg-saasy-orange/10"
            >
              Visit saasysolutionsllc.com
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="border-b border-saasy-border">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <a
                key={service.name}
                href={service.href}
                className="group rounded-2xl border border-saasy-border
                  bg-saasy-card/30 p-6 transition-all
                  hover:border-saasy-orange/40 hover:bg-saasy-card/50"
              >
                <h3
                  className="
                    text-lg font-bold text-white"
                >
                  {service.name}
                </h3>
                <p
                  className="mt-2
                    text-sm leading-relaxed text-saasy-muted"
                >
                  {service.description}
                </p>

                <ul className="mt-4 space-y-1.5">
                  {service.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2

                        text-sm text-saasy-muted"
                    >
                      <span className="text-saasy-orange">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center justify-between">
                  <span
                    className="
                      text-sm text-saasy-muted"
                  >
                    Starting at{" "}
                    <span className="font-semibold text-white">
                      {service.startingAt}/mo
                    </span>
                  </span>
                  <span
                    className="
                      text-sm font-medium text-saasy-orange
                      transition-colors group-hover:text-white"
                  >
                    Learn more &rarr;
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Tiers */}
      <section className="border-b border-saasy-border">
        <div
          className="mx-auto max-w-4xl px-6 py-16 text-center
            sm:py-20"
        >
          <h2
            className="
              text-2xl font-bold sm:text-3xl"
          >
            Engagement tiers
          </h2>
          <p
            className="mx-auto mt-3 max-w-xl
               text-base
              text-saasy-muted"
          >
            Fixed monthly pricing. No hourly billing surprises. No
            long-term contracts required.
          </p>

          <div
            className="mt-10 grid gap-6 text-left sm:grid-cols-3"
          >
            {/* Essentials */}
            <div
              className="rounded-2xl border border-saasy-border
                bg-saasy-card/30 p-6"
            >
              <p
                className="
                  text-sm font-semibold text-saasy-muted"
              >
                Essentials
              </p>
              <p className="mt-1">
                <span
                  className="
                    text-3xl font-bold text-white"
                >
                  $3,500
                </span>
                <span
                  className="
                    text-saasy-muted"
                >
                  /mo
                </span>
              </p>
              <p
                className="mt-3
                  text-sm text-saasy-muted"
              >
                For businesses ready to automate core processes with
                expert guidance.
              </p>
            </div>

            {/* Growth Systems */}
            <div
              className="rounded-2xl border border-saasy-orange/40
                bg-saasy-card/50 p-6 ring-1 ring-saasy-orange/20"
            >
              <p
                className="
                  text-sm font-semibold text-saasy-orange"
              >
                Growth Systems
              </p>
              <p className="mt-1">
                <span
                  className="
                    text-3xl font-bold text-white"
                >
                  $6,500
                </span>
                <span
                  className="
                    text-saasy-muted"
                >
                  /mo
                </span>
              </p>
              <p
                className="mt-3
                  text-sm text-saasy-muted"
              >
                Comprehensive automation and integration for
                businesses ready to scale.
              </p>
            </div>

            {/* Scale */}
            <div
              className="rounded-2xl border border-saasy-border
                bg-saasy-card/30 p-6"
            >
              <p
                className="
                  text-sm font-semibold text-saasy-muted"
              >
                Scale
              </p>
              <p className="mt-1">
                <span
                  className="
                    text-3xl font-bold text-white"
                >
                  $12,000
                </span>
                <span
                  className="
                    text-saasy-muted"
                >
                  /mo
                </span>
              </p>
              <p
                className="mt-3
                  text-sm text-saasy-muted"
              >
                Full-stack systems ownership &mdash; your fractional
                CTO and engineering partner.
              </p>
            </div>
          </div>

          <a
            href="https://saasysolutionsllc.com/pricing"
            className="mt-8 inline-flex rounded-full bg-saasy-orange
              px-8 py-4
              text-base font-semibold text-white transition-colors hover:bg-[#c45f2e]"
          >
            View full pricing details
          </a>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-b border-saasy-border">
        <div
          className="mx-auto max-w-3xl px-6 py-16 text-center
            sm:py-20"
        >
          <h2
            className="
              text-2xl font-bold sm:text-3xl"
          >
            Not sure what you need?
          </h2>
          <p
            className="mx-auto mt-3 max-w-xl
               text-base
              text-saasy-muted"
          >
            Book a free consultation. We&apos;ll assess your current
            systems, identify the biggest opportunities, and
            recommend a path forward &mdash; whether that&apos;s the
            SaaSy platform, a consulting engagement, or both.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://saasysolutionsllc.com/consultation"
              className="inline-flex rounded-full bg-saasy-rose
                px-8 py-4
                text-base font-semibold text-white transition-colors hover:bg-saasy-rose-bright"
            >
              Book free consultation
            </a>
            <Link
              href="/#pricing"
              className="inline-flex rounded-full border
                border-saasy-pink/40 px-8 py-4
                 text-base
                font-semibold text-saasy-pink-soft
                transition-colors hover:bg-saasy-rose-bright/10"
            >
              Or start with the platform
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
