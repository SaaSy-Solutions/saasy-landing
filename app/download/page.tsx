import type { Metadata } from "next";
import Link from "next/link";
import { ogImage } from "../components/ogAssets";
import { SiteNav } from "../components/SiteNav";
import { MarketingFooter } from "../components/MarketingFooter";
import { DesktopSyncDownloads } from "../components/DesktopSyncDownloads";
import { IconCheck } from "../components/Icons";

// OG card: reuses the home card until a dedicated `download.png` is rendered
// (video/src/OgCard.tsx). Placeholder asset slot — swap for `ogImage("download")`
// once the card exists so the social preview matches the page.
const OG = ogImage("home");

export const metadata: Metadata = {
  title: "Download the SaaSy desktop app — SaaSy",
  description:
    "Install the SaaSy desktop app to keep your documents in sync with a " +
    "folder on your computer, on Windows, macOS, and Linux. Or add the " +
    "mobile web app to capture receipts on the go.",
  alternates: {
    canonical: "https://hellosaasy.ai/download",
  },
  openGraph: {
    title: "Download the SaaSy desktop app",
    description:
      "Keep your documents in sync with a folder on your computer. " +
      "Windows, macOS, and Linux — plus a mobile web app.",
    url: "https://hellosaasy.ai/download",
    siteName: "SaaSy",
    type: "website",
    images: [OG],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG.url],
    title: "Download the SaaSy desktop app",
    description:
      "Keep your documents in sync with a folder on your computer. " +
      "Windows, macOS, and Linux — plus a mobile web app.",
  },
};

/** JSON-LD describing the desktop application for rich results. */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SaaSy Desktop",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Windows, macOS, Linux",
  url: "https://hellosaasy.ai/download",
  description:
    "The SaaSy desktop app keeps a folder on your computer in two-way sync " +
    "with your SaaSy documents, so files land where your team already works.",
  isPartOf: {
    "@type": "WebSite",
    name: "SaaSy",
    url: "https://hellosaasy.ai",
  },
};

/** What the desktop app adds on top of the web app. */
const BENEFITS: string[] = [
  "Two-way folder sync — drop a file on your desktop, it's in SaaSy",
  "Works while you're offline; changes reconcile when you reconnect",
  "Stays current on its own with signed, automatic updates",
];

export default function DownloadPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-saasy-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteNav />

      {/* ─────────────────── Hero ─────────────────── */}
      <header
        className="hero-gradient relative overflow-hidden
          pt-32 pb-14 sm:pt-40 sm:pb-16"
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1
            className="text-4xl leading-[1.1] font-extrabold
              tracking-tight text-white sm:text-6xl"
          >
            SaaSy on your <span className="accent-word">desktop</span>
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed
              text-saasy-muted sm:text-xl"
          >
            Keep a folder on your computer in two-way sync with your SaaSy
            documents. Install it once and your files stay where your team
            already works.
          </p>
        </div>
      </header>

      <main>
        {/* ── Download surface (manifest-driven) ── */}
        <section className="pb-20 sm:pb-28">
          <DesktopSyncDownloads />
        </section>

        {/* ── Why the desktop app ── */}
        <section className="border-t border-saasy-border py-20 sm:py-28">
          <div
            className="mx-auto grid max-w-6xl items-center gap-12
              px-6 lg:grid-cols-2 lg:gap-16"
          >
            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Your files, where you already keep them
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-saasy-muted">
                The desktop app mirrors a folder on your machine to SaaSy and
                back. No manual uploads, no &ldquo;which version is current&rdquo;
                — the same document, in both places, always up to date.
              </p>
              <ul className="mt-6 space-y-3">
                {BENEFITS.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-saasy-muted"
                  >
                    <IconCheck />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Product screenshot slot. Placeholder until a real desktop-app
                capture is added under /public/screenshots (note in PR). */}
            <div
              className="relative overflow-hidden rounded-2xl border
                border-saasy-border bg-saasy-card/80 p-2"
            >
              <div
                className="flex aspect-[4/3] items-center justify-center
                  rounded-lg bg-saasy-darker/60 text-center"
              >
                <span className="px-6 text-sm text-saasy-muted">
                  Desktop app screenshot coming soon
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Closing CTA ── */}
        <section className="border-t border-saasy-border">
          <div
            className="hero-gradient mx-auto max-w-3xl px-6 py-24
              text-center sm:py-32"
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Don&rsquo;t have an account yet?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-saasy-muted">
              Start free for 14 days with full Growth access. No credit card
              required — the desktop app is included on every plan.
            </p>
            <Link
              href="https://app.hellosaasy.ai/signup"
              className="mt-8 inline-flex rounded-full bg-saasy-rose px-8
                py-4 text-base font-semibold text-white transition-colors
                hover:bg-saasy-rose-bright"
            >
              Start free trial
            </Link>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
