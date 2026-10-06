import Link from "next/link";

/**
 * The human layer of the site: who builds SaaSy and how to reach a
 * real person. Used on the homepage and /about. Names, roles, and
 * photos are the real team (also published on hiveminded.ai/about);
 * keep this honest — no invented credentials.
 */
const TEAM = [
  {
    name: "Macon Wright",
    role: "Founder & CEO",
    linkedin: "https://www.linkedin.com/in/macon-wright/",
    photo: "/team/macon-wright.jpg",
    bio:
      "Technology entrepreneur and founder of SaaSier Inc., the " +
      "portfolio behind SaaSy Solutions LLC. She sets SaaSy's " +
      "direction: software that does the work for the people who " +
      "actually run small businesses.",
  },
  {
    name: "Ray Clanan",
    role: "CTO",
    linkedin: "https://www.linkedin.com/in/raymondclanan/",
    photo: "/team/ray-clanan.jpg",
    bio:
      "25+ years designing and building scalable platforms, from " +
      "enterprise systems to multi-tenant SaaS. He leads SaaSy's " +
      "architecture, and created MockForge, the open-source mocking " +
      "platform.",
  },
];

export function FounderNote({
  showAboutLink = true,
}: {
  showAboutLink?: boolean;
}): React.ReactElement {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <div className="max-w-2xl">
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
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {TEAM.map((person) => (
          <div
            key={person.name}
            className="flex items-start gap-5 rounded-2xl
              border border-saasy-border bg-saasy-card/50 p-6"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={person.photo}
              alt={person.name}
              width={64}
              height={64}
              className="h-16 w-16 shrink-0 rounded-full
                border border-saasy-border object-cover"
            />
            <div>
              <p className="text-base font-semibold text-white">
                {person.name}
              </p>
              <p className="text-sm font-medium text-saasy-pink-soft">
                {person.role}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-saasy-muted">
                {person.bio}
              </p>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${person.name} on LinkedIn`}
                className="mt-3 inline-block text-sm font-medium text-saasy-pink-soft
                  underline transition-colors hover:text-white"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-8 flex flex-col gap-3 sm:flex-row
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
  );
}
