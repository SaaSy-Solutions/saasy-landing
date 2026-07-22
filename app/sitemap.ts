import type { MetadataRoute } from "next";
import { POSTS } from "./blog/content";

// Required for output: "export" — the sitemap is rendered once at build.
export const dynamic = "force-static";

const BASE = "https://hellosaasy.ai";

/**
 * Build-time sitemap (replaces the hand-maintained public/sitemap.xml,
 * which had drifted to 6 of 15+ routes). New pages under app/ must be
 * added to STATIC_ROUTES; blog posts are picked up automatically from
 * the POSTS list.
 */
const STATIC_ROUTES: {
  path: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
}[] = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/features", changeFrequency: "weekly", priority: 0.9 },
  { path: "/pricing", changeFrequency: "weekly", priority: 0.9 },
  { path: "/unions", changeFrequency: "weekly", priority: 1.0 },
  { path: "/customers", changeFrequency: "monthly", priority: 0.7 },
  { path: "/compare", changeFrequency: "monthly", priority: 0.7 },
  { path: "/services", changeFrequency: "monthly", priority: 0.7 },
  { path: "/integrations", changeFrequency: "monthly", priority: 0.6 },
  { path: "/download", changeFrequency: "monthly", priority: 0.6 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.6 },
  { path: "/changelog", changeFrequency: "weekly", priority: 0.5 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.5 },
  { path: "/terms", changeFrequency: "monthly", priority: 0.3 },
  { path: "/privacy", changeFrequency: "monthly", priority: 0.3 },
  { path: "/sms-consent", changeFrequency: "monthly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = STATIC_ROUTES.map((route) => ({
    url: `${BASE}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const posts = POSTS.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...pages, ...posts];
}
