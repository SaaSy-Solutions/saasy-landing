import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNav } from "../../components/SiteNav";
import { MarketingFooter } from "../../components/MarketingFooter";
import { POSTS } from "../content";
import { ogImageForPost } from "../../components/ogAssets";

export function generateStaticParams(): {
  slug: string;
}[] {
  return POSTS.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find(p => p.slug === slug);
  if (!post) {
    return { title: "Post Not Found — SaaSy" };
  }
  const image = ogImageForPost(post.slug, post.title);
  return {
    title: `${post.title} — SaaSy Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://hellosaasy.ai/blog/${post.slug}`,
      siteName: "SaaSy",
      type: "article",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image.url],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postIndex = POSTS.findIndex(
    p => p.slug === slug,
  );
  if (postIndex === -1) {
    notFound();
  }

  const post = POSTS[postIndex];
  const prevPost =
    postIndex > 0 ? POSTS[postIndex - 1] : null;
  const nextPost =
    postIndex < POSTS.length - 1
      ? POSTS[postIndex + 1]
      : null;

  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-3xl px-6 pt-28 pb-20">
        <Link
          href="/blog"
          className="
            text-sm font-medium text-saasy-pink-soft
            hover:text-saasy-rose transition-colors"
        >
          &larr; Back to blog
        </Link>
        <article className="mt-8">
          <h1
            className="
              text-3xl font-bold tracking-tight text-white"
          >
            {post.title}
          </h1>
          <div
            className="mt-4 flex items-center gap-3

              text-sm text-saasy-muted"
          >
            <span>{post.author}</span>
            <span>&middot;</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )}
            </time>
            <span>&middot;</span>
            <span>{post.readTime}</span>
          </div>

          <div
            className="mt-10

              text-saasy-text leading-relaxed"
          >
            {post.sections.map((section, i) => (
              <section key={i} className="mb-10">
                <h2
                  className="
                    text-2xl font-bold text-white mb-4"
                >
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.body
                    .split("\n\n")
                    .map((paragraph, j) => (
                      <p key={j}>{paragraph}</p>
                    ))}
                </div>
              </section>
            ))}
          </div>

          {post.cta && (
            <div
              className="mt-12 rounded-xl border
                border-saasy-pink/20 bg-saasy-card p-8
                text-center"
            >
              <p
                className="
                  text-lg text-saasy-text mb-6"
              >
                {post.cta}
              </p>
              <Link
                href="https://app.hellosaasy.ai/signup"
                className="inline-block rounded-lg
                  bg-saasy-rose px-6 py-3

                  text-sm font-semibold text-black
                  hover:bg-saasy-rose-bright
                  transition-colors"
              >
                Start free trial
              </Link>
            </div>
          )}
        </article>

        <nav
          className="mt-12 flex items-center
            justify-between border-t border-saasy-border
            pt-8"
        >
          <div>
            {prevPost && (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="
                  text-sm text-saasy-pink-soft
                  hover:text-saasy-rose
                  transition-colors"
              >
                &larr; {prevPost.title}
              </Link>
            )}
          </div>
          <div>
            {nextPost && (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="
                  text-sm text-saasy-pink-soft
                  hover:text-saasy-rose
                  transition-colors text-right"
              >
                {nextPost.title} &rarr;
              </Link>
            )}
          </div>
        </nav>
      </div>
      <MarketingFooter />
    </div>
  );
}
