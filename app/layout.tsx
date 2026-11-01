import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ogImage } from "./components/ogAssets";
import { AnalyticsProvider } from "./components/AnalyticsProvider";
import { CookieBanner } from "./components/CookieBanner";
import { ErrorMonitoring } from "./components/ErrorMonitoring";

/**
 * Poppins is the brand's designated web font (the style guide's primary,
 * Sofia Pro, is Adobe-licensed and not held — Poppins is its sanctioned
 * fallback). Weight roles: 400 body · 500 medium labels · 600 semibold
 * headings/buttons · 700 bold · 800 display. Applied on <body> via
 * globals.css; components should not restate the family.
 */
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const DESCRIPTION =
  "The CRM that closes the loop: win the deal, deliver the work, " +
  "invoice, and see payment land back on the record. Plus payroll, " +
  "compliance, and customer intelligence for contractors, unions, " +
  "and service firms.";

export const metadata: Metadata = {
  metadataBase: new URL("https://hellosaasy.ai"),
  title: "Hello SaaSy: Your entire back office, handled",
  alternates: {
    // Homepage canonical. The homepage is a client component and cannot
    // export metadata itself; every other page overrides this via its own
    // alternates.canonical so it never leaks beyond "/".
    canonical: "https://hellosaasy.ai",
  },
  description: DESCRIPTION,
  keywords: [
    "small business software",
    "business operating system",
    "CRM",
    "compliance",
    "certified payroll",
    "union dues",
    "customer health scoring",
  ],
  openGraph: {
    title: "Hello SaaSy: Your entire back office, handled",
    description: DESCRIPTION,
    url: "https://hellosaasy.ai",
    siteName: "Hello SaaSy",
    type: "website",
    images: [ogImage("home")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hello SaaSy: Your entire back office, handled",
    description: DESCRIPTION,
    images: [ogImage("home").url],
  },
};

const PUBLISHER = {
  "@type": "Organization",
  "@id": "https://saasysolutionsllc.com/#organization",
  name: "SaaSy Solutions LLC",
  url: "https://saasysolutionsllc.com",
  parentOrganization: {
    "@type": "Organization",
    "@id": "https://saasierinc.com/#organization",
    name: "SaaSier Inc",
    url: "https://saasierinc.com",
  },
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
  // Official profiles (same set as the footer) so search and AI tools
  // resolve the company as one entity, not the unrelated older "SaaSy".
  sameAs: [
    "https://linkedin.com/company/saasysolutions",
    "https://x.com/SaaSyLLC",
    "https://github.com/saasy-solutions",
    "https://facebook.com/saasysolutionsllc",
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://hellosaasy.ai/#software",
  name: "Hello SaaSy",
  alternateName: ["HelloSaaSy", "Hello Saasy"],
  // The product's own brand, so "Hello SaaSy" resolves to this site rather
  // than only to its publisher, SaaSy Solutions LLC.
  brand: {
    "@type": "Brand",
    "@id": "https://hellosaasy.ai/#brand",
    name: "Hello SaaSy",
    alternateName: ["HelloSaaSy", "Hello Saasy"],
    url: "https://hellosaasy.ai",
  },
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: DESCRIPTION,
  url: "https://hellosaasy.ai",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "49",
    highPrice: "399",
    priceCurrency: "USD",
  },
  // Entity graph: the app is made and published by SaaSy Solutions LLC,
  // a subsidiary of SaaSier Inc. Stable @ids let search and AI tools join
  // this node with the same organizations described on their own sites.
  creator: PUBLISHER,
  publisher: PUBLISHER,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <ErrorMonitoring />
        <AnalyticsProvider />
        <CookieBanner />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        {children}
      </body>
    </html>
  );
}
