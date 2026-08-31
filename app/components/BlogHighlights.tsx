import Link from "next/link";
import { POSTS } from "../blog/content";

/**
 * Magazine layout: the newest post gets the feature slot, the next two
 * read as editorial rows. Sourced from the same POSTS data as /blog, so
 * titles can never drift from the real articles again.
 */
export function BlogHighlights(): React.ReactElement | null {
  const latest = [...POSTS]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);
  if (latest.length === 0) return null;

  const [featured, ...rest] = latest;

  const formatDate = (iso: string): string =>
    new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <section className="border-t border-saasy-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex items-baseline justify-between gap-6">
          <h2
            className="text-3xl font-bold tracking-tight text-white
              sm:text-4xl"
          >
            From our blog
          </h2>
          <Link
            href="/blog"
            className="shrink-0 text-sm font-medium
              text-saasy-pink-soft transition-colors hover:text-white"
          >
            View all posts &rarr;
          </Link>
        </div>

        <div
          className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]
            lg:gap-16"
        >
          {/* Feature slot */}
          <Link
            href={`/blog/${featured.slug}`}
            className="group block"
          >
            <article>
              <p
                className="text-sm text-saasy-muted"
              >
                <time dateTime={featured.date}>
                  {formatDate(featured.date)}
                </time>{" "}
                · {featured.readTime}
              </p>
              <h3
                className="mt-3 text-2xl font-bold tracking-tight
                  text-white transition-colors
                  group-hover:text-saasy-pink-soft sm:text-3xl"
              >
                {featured.title}
              </h3>
              <p
                className="mt-4 max-w-xl leading-relaxed
                  text-saasy-muted"
              >
                {featured.excerpt}
              </p>
              <span
                className="mt-5 inline-block text-sm font-medium
                  text-saasy-pink-soft"
              >
                Read the post &rarr;
              </span>
            </article>
          </Link>

          {/* Secondary rows */}
          <div>
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block border-t border-saasy-border
                  py-7 first:border-t-0 first:pt-0
                  first:max-lg:border-t first:max-lg:pt-7"
              >
                <p className="text-sm text-saasy-muted">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  {" "}· {post.readTime}
                </p>
                <h3
                  className="mt-2 text-lg font-semibold text-white
                    transition-colors group-hover:text-saasy-pink-soft"
                >
                  {post.title}
                </h3>
                <span
                  className="mt-3 inline-block text-sm font-medium
                    text-saasy-pink-soft"
                >
                  Read more &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
