import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ogImage } from "./components/ogAssets";

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
  "The AI-powered back office for small business — CRM, invoicing, " +
  "compliance, and customer intelligence that flags problems before " +
  "they cost you. Built for contractors, unions, and service firms.";

export const metadata: Metadata = {
  metadataBase: new URL("https://hellosaasy.ai"),
  title: "SaaSy — Your entire back office, handled",
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
    title: "SaaSy — Your entire back office, handled",
    description: DESCRIPTION,
    url: "https://hellosaasy.ai",
    siteName: "SaaSy",
    type: "website",
    images: [ogImage("home")],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaSy — Your entire back office, handled",
    description: DESCRIPTION,
    images: [ogImage("home").url],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SaaSy",
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
  creator: {
    "@type": "Organization",
    name: "SaaSy Solutions LLC",
    url: "https://saasysolutionsllc.com",
  },
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
