import type { Metadata } from "next";
import { ogImage } from "../components/ogAssets";
import { PricingPageClient } from "./PricingClient";

const DESCRIPTION =
  "Starter $49, Growth $199, Scale $399 per month. Every trial starts " +
  "with full Growth access, free for 14 days. No credit card up front.";

export const metadata: Metadata = {
  title: "Pricing — SaaSy",
  description: DESCRIPTION,
  alternates: {
    canonical: "https://hellosaasy.ai/pricing",
  },
  openGraph: {
    title: "Pricing — SaaSy",
    description: DESCRIPTION,
    url: "https://hellosaasy.ai/pricing",
    siteName: "SaaSy",
    type: "website",
    images: [ogImage("pricing")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — SaaSy",
    description: DESCRIPTION,
    images: [ogImage("pricing").url],
  },
};

export default function PricingPage(): React.ReactElement {
  return <PricingPageClient />;
}
