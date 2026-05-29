import Link from "next/link";
import { HeroScreenshot } from "./HeroScreenshot";

export function Hero(): React.ReactElement {
  return (
    <section
      className="hero-gradient grid-pattern relative
        overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32"
    >
      <div className="mx-auto max-w-4xl px-6 text-center">
        {/* Badge */}
        <div
          className="mb-8 inline-flex items-center gap-2
            rounded-full border border-saasy-pink/20
            bg-saasy-pink/5 px-4 py-1.5"
        >
          <span
            className="h-2 w-2 rounded-full bg-saasy-pink"
          />
          <span
            className="font-[family-name:var(--font-poppins)]
              text-sm text-saasy-pink"
          >
            Now in beta — early access open
          </span>
        </div>

        <h1
          className="font-[family-name:var(--font-poppins)]
            text-5xl leading-[1.1] font-extrabold tracking-tight
            text-white sm:text-7xl"
        >
          Your intelligent business
          <br />
          <span className="gradient-text">co-founder</span>
        </h1>

        <p
          className="mx-auto mt-6 max-w-2xl
            font-[family-name:var(--font-poppins)] text-lg
            leading-relaxed text-saasy-muted sm:text-xl"
        >
          SaaSy guides you from first idea to thriving
          enterprise. Every stage of your business journey,
          managed by technology that works alongside you.
        </p>

        {/* CTAs */}
        <div
          className="mt-10 flex flex-col items-center
            justify-center gap-4 sm:flex-row"
        >
          <Link
            href="https://app.hellosaasy.ai/signup"
            className="cta-pulse inline-flex rounded-full
              bg-saasy-pink px-8 py-4
              font-[family-name:var(--font-poppins)] text-base
              font-semibold uppercase tracking-wider text-white
              transition-colors hover:bg-saasy-rose"
          >
            Start Free Trial
          </Link>
          <Link
            href="#features"
            className="inline-flex items-center gap-2 rounded-full
              border border-saasy-border px-8 py-4
              font-[family-name:var(--font-poppins)] text-base
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

        <p
          className="mt-4
            font-[family-name:var(--font-poppins)]
            text-sm text-saasy-muted"
        >
          14-day free trial on Growth plan. No credit card
          required.
        </p>

        {/* Real product screenshot */}
        <HeroScreenshot />
      </div>
    </section>
  );
}
