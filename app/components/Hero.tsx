import Link from "next/link";
import { LivingGeometry } from "./LivingGeometry";
import { BreathingPanel } from "./BreathingPanel";

/**
 * Asymmetric split hero: value prop on the left, live product panel on
 * the right. The panel is a real component preview (the product "breathing"),
 * not a mock screenshot. Top padding is capped so the CTA sits in the first
 * viewport; the trial terms live in the pricing section, not under the CTAs.
 */
export function Hero(): React.ReactElement {
  return (
    <section
      className="hero-gradient relative overflow-hidden
        pt-28 pb-16 sm:pt-24 sm:pb-20"
    >
      <LivingGeometry variant="hero" />
      <div
        className="relative z-10 mx-auto grid max-w-6xl items-center
          gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
      >
        <div className="text-center lg:text-left">
          {/* Beta status chip — a real state, kept visible per the
              honest-beta rule. */}
          <div
            className="fade-up mb-8 inline-flex items-center gap-2
              rounded-full border border-saasy-pink/20
              bg-saasy-pink/5 px-4 py-1.5"
          >
            <span
              className="live-dot h-2 w-2 rounded-full bg-saasy-pink"
            />
            <span className="text-sm text-saasy-pink-soft">
              Open beta: anyone can sign up
            </span>
          </div>

          <h1
            className="fade-up text-5xl leading-[1.05] font-extrabold
              tracking-tight text-white sm:text-6xl xl:text-7xl"
            style={{ animationDelay: "90ms" }}
          >
            Your entire back office,{" "}
            <span className="accent-word">handled</span>
          </h1>

          <p
            className="fade-up mx-auto mt-6 max-w-xl text-lg
              leading-relaxed text-saasy-muted sm:text-xl lg:mx-0"
            style={{ animationDelay: "180ms" }}
          >
            AI agents run your CRM, payroll, and compliance, and
            flag trouble while it&rsquo;s still cheap to fix. Built
            for contractors, unions, and agencies who&rsquo;d rather
            run the business than the busywork.
          </p>

          {/* CTAs */}
          <div
            className="fade-up mt-10 flex flex-col items-center
              gap-4 sm:flex-row lg:justify-start sm:justify-center"
            style={{ animationDelay: "270ms" }}
          >
            <Link
              href="https://app.hellosaasy.ai/signup"
              data-cta="hero"
              className="inline-flex rounded-full
                bg-saasy-rose px-8 py-4 text-base
                font-semibold text-white
                transition-all hover:bg-saasy-rose-bright
                active:translate-y-[1px]"
            >
              Start free trial
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center gap-2 rounded-full
                border border-saasy-border px-8 py-4 text-base
                font-semibold text-saasy-muted transition-all
                hover:border-saasy-pink/30 hover:text-white
                active:translate-y-[1px]"
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
        </div>

        {/* Live product panel — the product breathing, right in the
            first viewport. */}
        <div
          className="fade-up relative"
          style={{ animationDelay: "360ms" }}
        >
          <BreathingPanel />
        </div>
      </div>
    </section>
  );
}
