import Link from "next/link";

/**
 * The human layer of the site: who builds SaaSy and how to reach a
 * real person. Used on the homepage and /about. Keep this honest —
 * no invented names, photos, or credentials. The claims below are
 * verifiable: SaaSy Solutions LLC is a woman-owned business (footer),
 * onboarding is founder-led (unions page promise), and the booking
 * link is the same Cal.com the consulting arm already runs on.
 */
export function FounderNote({
  showAboutLink = true,
}: {
  showAboutLink?: boolean;
}): React.ReactElement {
  return (
    <div
      className="mx-auto grid max-w-5xl items-center gap-10 px-6
        sm:grid-cols-[auto_1fr]"
    >
      <div
        aria-hidden="true"
        className="mx-auto flex h-28 w-28 items-center
          justify-center rounded-3xl border border-saasy-border
          bg-saasy-card sm:h-36 sm:w-36"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logomark.svg"
          alt=""
          className="h-14 w-14 sm:h-20 sm:w-20"
        />
      </div>
      <div>
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Built by people you can actually call
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-saasy-muted">
          SaaSy is built by a small, founder-led team at{" "}
          <a
            href="https://saasysolutionsllc.com"
            className="text-saasy-pink-soft underline
              transition-colors hover:text-white"
          >
            SaaSy Solutions LLC
          </a>
          , a woman-owned business. It started as tooling we built for
          our own consulting clients and grew into the platform we now
          run in the open. No ticket queue, no offshore handoff —
          onboarding calls are with the people who wrote the code.
        </p>
        <div
          className="mt-6 flex flex-col gap-3 sm:flex-row
            sm:items-center sm:gap-4"
        >
          <a
            href="https://cal.com/saasysolutionsllc"
            className="inline-flex w-fit rounded-full bg-saasy-rose
              px-6 py-3 text-sm font-semibold text-white
              transition-colors hover:bg-saasy-rose-bright"
          >
            Book a call with us
          </a>
          {showAboutLink && (
            <Link
              href="/about"
              className="text-sm font-medium text-saasy-pink-soft
                transition-colors hover:text-white"
            >
              More about the team &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
