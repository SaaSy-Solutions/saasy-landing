import Link from "next/link";

/**
 * Honest social-proof block for the beta period.
 *
 * Replaces fabricated testimonials and metrics with open
 * "now in beta / early access" framing. Swap back to a logo bar
 * + real testimonials once 3+ customers agree to be named (see
 * follow-up issues filed against #711).
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
          <span className="text-sm text-saasy-pink-soft">
            Currently in beta
          </span>
        </div>

        <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
          Help shape SaaSy from day one
        </h2>

        <p
          className="mx-auto mt-4 max-w-xl text-lg
            leading-relaxed text-saasy-muted"
        >
          We&rsquo;re in the early days and building alongside our
          first customers. You get hands-on access, your feedback
          ships in days not quarters, and your story could be on
          this page as we grow.
        </p>

        <Link
          href="https://app.hellosaasy.ai/signup?source=beta"
          className="mt-8 inline-flex rounded-full bg-saasy-rose
            px-8 py-4 text-base font-semibold
            text-white transition-colors hover:bg-saasy-rose-bright"
        >
          Start free trial
        </Link>
      </div>
    </section>
  );
}
