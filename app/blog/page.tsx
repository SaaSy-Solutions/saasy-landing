import Link from "next/link";
import type { Metadata } from "next";
import { SiteNav } from "../components/SiteNav";
import { MarketingFooter } from "../components/MarketingFooter";
import { POSTS } from "./content";
import { ogImage } from "../components/ogAssets";

export const metadata: Metadata = {
  title: "Blog — SaaSy",
  description:
    "Insights on business operations, founder strategies, " +
    "and scaling with automation.",
  openGraph: {
    siteName: "SaaSy",
    type: "website",
    images: [ogImage("blog")],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImage("blog").url],
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-4xl px-6 pt-28 pb-20">
        <h1
          className="font-[family-name:var(--font-poppins)]
            text-4xl font-bold tracking-tight text-white"
        >
          Blog
        </h1>
        <p
          className="mt-4 font-[family-name:var(--font-poppins)]
            text-lg text-saasy-muted"
        >
          Insights on business operations, founder strategies,
          and scaling with automation.
        </p>

        <div className="mt-10 space-y-6">
          {POSTS.map(post => (
            <article
              key={post.slug}
              className="glow-border rounded-xl bg-saasy-card p-6
                transition-colors hover:bg-saasy-card-hover"
            >
              <div
                className="flex items-center gap-3
                  font-[family-name:var(--font-poppins)]
                  text-sm text-saasy-muted"
              >
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
              <h2
                className="mt-2 font-[family-name:var(--font-poppins)]
                  text-xl font-semibold text-white"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-saasy-pink transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <p
                className="mt-2 font-[family-name:var(--font-poppins)]
                  text-saasy-muted"
              >
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-block
                  font-[family-name:var(--font-poppins)]
                  text-sm font-medium text-saasy-pink
                  hover:text-saasy-rose transition-colors"
              >
                Read more &rarr;
              </Link>
            </article>
          ))}
        </div>
      </div>
      <MarketingFooter />
    </div>
  );
}
