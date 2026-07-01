import Link from "next/link";

const BLOG_POSTS = [
  {
    title: "How Health Scoring Reduced Our Churn by 30%",
    description:
      "Learn how proactive health monitoring helps " +
      "you catch at-risk accounts before they leave.",
    href: "/blog/reduce-churn-with-health-scoring",
  },
  {
    title:
      "The Ultimate Onboarding Checklist for SMB SaaS",
    description:
      "A step-by-step guide to getting new customers " +
      "to their first aha moment faster.",
    href: "/blog/onboarding-checklist-for-smb-saas",
  },
  {
    title:
      "Intelligent Customer Success: " +
      "What Actually Works",
    description:
      "Cutting through the hype to find AI " +
      "applications that genuinely move the needle.",
    href: "/blog/ai-powered-customer-success",
  },
];

export function BlogHighlights(): React.ReactElement {
  return (
    <section className="border-t border-saasy-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2
            className="
              text-3xl font-bold text-white sm:text-4xl"
          >
            From our blog
          </h2>
          <p
            className="mt-4
              text-lg text-saasy-muted"
          >
            Insights on customer success, churn
            reduction, and growing your SaaS business.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.title}
              href={post.href}
              className="rounded-2xl border border-saasy-border
                bg-saasy-card/50 p-6 hover:border-saasy-pink/30
                transition-all duration-300 group block"
            >
              <h3
                className="text-white
                  text-lg font-semibold group-hover:text-saasy-pink-soft
                  transition-colors"
              >
                {post.title}
              </h3>
              <p
                className="text-saasy-muted
                  text-sm mt-2"
              >
                {post.description}
              </p>
              <span
                className="text-saasy-pink-soft text-sm font-medium
                  mt-4 inline-block"
              >
                Read more &rarr;
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="
              text-saasy-pink-soft text-sm font-medium
              hover:underline transition-colors"
          >
            View all posts &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
