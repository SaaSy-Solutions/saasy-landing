import Link from "next/link";
import { SiteNav } from "./components/SiteNav";
import { MarketingFooter } from "./components/MarketingFooter";

/**
 * Branded 404 — replaces the default Next.js "404: This page could not
 * be found." A dead end is still a brand moment; give it the voice and
 * a way back.
 */
export default function NotFound(): React.ReactElement {
  return (
    <div className="min-h-screen bg-saasy-dark">
      <SiteNav />
      <main
        className="hero-gradient flex min-h-[70vh] flex-col
          items-center justify-center px-6 pt-24 text-center"
      >
        <p className="text-7xl font-extrabold text-saasy-pink sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
          This page missed its deadline.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-saasy-muted">
          We track everyone else&rsquo;s so this doesn&rsquo;t happen
          to you. The page you&rsquo;re after moved or never existed.
        </p>
        <div
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link
            href="/"
            className="inline-flex rounded-full bg-saasy-rose px-6
              py-3 text-sm font-semibold text-white
              transition-colors hover:bg-saasy-rose-bright"
          >
            Back to the homepage
          </Link>
          <Link
            href="/features"
            className="inline-flex rounded-full border
              border-saasy-border px-6 py-3 text-sm font-semibold
              text-saasy-muted transition-colors
              hover:border-saasy-pink/30 hover:text-white"
          >
            See what SaaSy does
          </Link>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
