import { HomeClient } from "./HomeClient";
import { faqPageJsonLd } from "./components/faqData";

/**
 * Server wrapper for the homepage. The page body is a client component
 * (pricing toggle state), so structured data that must ship in the static
 * HTML is rendered here. The FAQPage JSON-LD is built from the same
 * FAQ_ITEMS the visible FAQ renders, so markup and copy cannot drift.
 */
export default function Home(): React.ReactElement {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageJsonLd()),
        }}
      />
      <HomeClient />
    </>
  );
}
