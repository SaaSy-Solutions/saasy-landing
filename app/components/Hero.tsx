import Link from "next/link";
import { HeroVideo } from "./HeroVideo";
import { LivingGeometry } from "./LivingGeometry";
import { BreathingPanel } from "./BreathingPanel";

export function Hero(): React.ReactElement {
  return (
    <section
      className="hero-gradient relative
        overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32"
    >
      <LivingGeometry variant="hero" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Badge */}
        <div
          className="mb-8 inline-flex items-center gap-2
            rounded-full border border-saasy-pink/20
            bg-saasy-pink/5 px-4 py-1.5"
        >
          <span
            className="h-2 w-2 rounded-full bg-saasy-pink"
          />
          <span className="text-sm text-saasy-pink-soft">
            Open beta: anyone can sign up
          </span>
        </div>

        <h1
          className="text-5xl leading-[1.1] font-extrabold tracking-tight
            text-white sm:text-7xl"
        >
          Your entire back office,
          <br />
          <span className="accent-word">handled</span>
        </h1>

        <p
          className="mx-auto mt-6 max-w-2xl text-lg
            leading-relaxed text-saasy-muted sm:text-xl"
        >
          AI agents run your CRM, invoicing, and compliance, and
          flag trouble while it&rsquo;s still cheap to fix. Built
          for contractors, unions, and agencies who&rsquo;d rather
          run the business than the busywork.
        </p>

        {/* CTAs */}
        <div
          className="mt-10 flex flex-col items-center
            justify-center gap-4 sm:flex-row"
        >
          <Link
            href="https://app.hellosaasy.ai/signup"
            data-cta="hero"
            className="inline-flex rounded-full
              bg-saasy-rose px-8 py-4 text-base
              font-semibold text-white
              transition-colors hover:bg-saasy-rose-bright"
          >
            Start free trial
          </Link>
          <Link
            href="#features"
            className="inline-flex items-center gap-2 rounded-full
              border border-saasy-border px-8 py-4 text-base
              font-semibold text-saasy-muted transition-colors
              hover:border-saasy-pink/30 hover:text-white"
          >
            See how it works
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Link>
        </div>

        <p className="mt-4 text-sm text-saasy-muted">
          Free for 14 days with full Growth access. No credit
          card required.
        </p>

        {/* Product demo video (Remotion-rendered loop), PNG poster fallback */}
        <HeroVideo />
        <BreathingPanel />
      </div>
    </section>
  );
}
