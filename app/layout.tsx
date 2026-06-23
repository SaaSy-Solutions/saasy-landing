import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ogImage } from "./components/ogAssets";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hellosaasy.ai"),
  title: "SaaSy — Your Intelligent Business Co-Founder",
  description:
    "intelligent business operating system that guides " +
    "entrepreneurs from idea to thriving enterprise. " +
    "Formation, compliance, CRM, and smart guidance — all in one.",
  keywords: [
    "entrepreneur",
    "business formation",
    "compliance",
    "CRM",
    "smart guidance",
    "business operating system",
  ],
  openGraph: {
    title: "SaaSy — Your Intelligent Business Co-Founder",
    description:
      "intelligent business operating system that guides " +
      "entrepreneurs from idea to thriving enterprise.",
    url: "https://hellosaasy.ai",
    siteName: "SaaSy",
    type: "website",
    images: [ogImage("home")],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaSy — Your Intelligent Business Co-Founder",
    description:
      "intelligent business operating system that guides " +
      "entrepreneurs from idea to thriving enterprise.",
    images: [ogImage("home").url],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SaaSy',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'intelligent business operating system that guides ' +
    'entrepreneurs from idea to thriving enterprise.',
  url: 'https://hellosaasy.ai',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '49',
    highPrice: '399',
    priceCurrency: 'USD',
  },
  creator: {
    '@type': 'Organization',
    name: 'SaaSy Solutions LLC',
    url: 'https://saasysolutionsllc.com',
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
