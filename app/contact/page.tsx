import type { Metadata } from "next";
import { ogImage } from "../components/ogAssets";
import { SiteNav } from "../components/SiteNav";
import { MarketingFooter } from "../components/MarketingFooter";
import { ContactForm } from "../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — SaaSy",
  description:
    "Questions about SaaSy, pricing, a vertical workflow, or a " +
    "partnership? Send us a message — a real person replies within " +
    "one business day.",
  alternates: {
    canonical: "https://hellosaasy.ai/contact",
  },
  openGraph: {
    title: "Contact — SaaSy",
    description:
      "Send us a message — a real person replies within one " +
      "business day.",
    url: "https://hellosaasy.ai/contact",
    siteName: "SaaSy",
    type: "website",
    images: [ogImage("contact")],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImage("contact").url],
    title: "Contact — SaaSy",
    description:
      "Send us a message — a real person replies within one " +
      "business day.",
  },
};

/** JSON-LD so "contact saasy" searches resolve the official channels. */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact — SaaSy",
  url: "https://hellosaasy.ai/contact",
  description:
    "Contact SaaSy with product, pricing, support, or partnership " +
    "questions.",
  isPartOf: {
    "@type": "WebSite",
    name: "SaaSy",
    url: "https://hellosaasy.ai",
  },
  publisher: {
    "@type": "Organization",
    name: "SaaSy Solutions LLC",
    url: "https://hellosaasy.ai",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "sales@hellosaasy.ai",
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@hellosaasy.ai",
      },
    ],
  },
};

/** A direct channel in the "skip the form" rail. */
interface DirectChannel {
  label: string;
  detail: string;
  href: string;
  linkText: string;
}

const DIRECT_CHANNELS: DirectChannel[] = [
  {
    label: "Sales",
    detail: "Pricing, demos, and partnerships.",
    href: "mailto:sales@hellosaasy.ai",
    linkText: "sales@hellosaasy.ai",
  },
  {
    label: "Support",
    detail: "Already a customer? Jump the line.",
    href: "mailto:support@hellosaasy.ai",
    linkText: "support@hellosaasy.ai",
  },
  {
    label: "Docs",
    detail: "Self-serve answers, any hour of the night.",
    href: "https://docs.hellosaasy.ai",
    linkText: "docs.hellosaasy.ai",
  },
];

export default function ContactPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-saasy-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <SiteNav />

      <header className="hero-gradient overflow-hidden pt-32 pb-4 sm:pt-40">
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Talk to a <span className="accent-word">human</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-saasy-muted">
            Question about the product, pricing, a vertical workflow, or
            a partnership? Send it over. Our agents run the back office
            &mdash; humans still read the mail.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pt-10 pb-24 sm:pt-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,20rem)] lg:gap-14">
          <ContactForm />

          <aside aria-labelledby="direct-channels-heading">
            <h2
              id="direct-channels-heading"
              className="text-sm font-semibold text-white"
            >
              Prefer to skip the form?
            </h2>
            <ul className="mt-4 divide-y divide-saasy-border/60">
              {DIRECT_CHANNELS.map((channel) => (
                <li key={channel.label} className="py-4 first:pt-0">
                  <p className="text-sm font-medium text-white">
                    {channel.label}
                  </p>
                  <p className="mt-1 text-sm text-saasy-muted">
                    {channel.detail}
                  </p>
                  <a
                    href={channel.href}
                    className="mt-1 inline-block text-sm
                      text-saasy-pink-soft underline transition-colors
                      hover:text-saasy-rose"
                  >
                    {channel.linkText}
                  </a>
                </li>
              ))}
            </ul>
            <p
              className="mt-6 border-t border-saasy-border/60 pt-5
                text-sm leading-relaxed text-saasy-muted"
            >
              SaaSy Solutions LLC is fully remote &mdash; no lobby, no
              hold music. Email is the fastest way to reach us, and we
              reply within one business day.
            </p>
          </aside>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
