import Link from "next/link";

/**
 * Honest social-proof block for the pre-launch period.
 *
 * Replaces fabricated testimonials and metrics with a "private
 * beta" framing. Swap back to a logo bar + real testimonials
 * once 3+ design partners agree to be named (see follow-up
 * issues filed against #711).
 */
export function SocialProof(): React.ReactElement {
  return (
    <section className="border-t border-saasy-border py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div
          className="inline-flex items-center gap-2 rounded-full
            border border-saasy-pink/20 bg-saasy-pink/5 px-4
            py-1.5"
        >
          <span
            className="h-2 w-2 rounded-full bg-saasy-pink"
          />
          <span
            className="font-[family-name:var(--font-poppins)]
              text-sm text-saasy-pink"
          >
            Currently in private beta
          </span>
        </div>

        <h2
          className="mt-6 font-[family-name:var(--font-poppins)]
            text-3xl font-bold text-white sm:text-4xl"
        >
          Help shape SaaSy from day one
        </h2>

        <p
          className="mx-auto mt-4 max-w-xl
            font-[family-name:var(--font-poppins)] text-lg
            leading-relaxed text-saasy-muted"
        >
          We&rsquo;re working with a small group of early design
          partners. You get hands-on access, your feedback ships
          in days not quarters, and your logo goes on this page
          when we&rsquo;re ready to launch.
        </p>

        <Link
          href="https://app.hellosaasy.ai/signup?source=beta"
          className="mt-8 inline-flex rounded-full bg-saasy-pink
            px-8 py-4 font-[family-name:var(--font-poppins)]
            text-base font-semibold uppercase tracking-wider
            text-white transition-colors hover:bg-saasy-rose"
        >
          Apply for early access
        </Link>
      </div>
    </section>
  );
}
