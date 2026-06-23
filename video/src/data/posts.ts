/**
 * Blog post metadata, mirrored from the site's app/blog/content.ts. Used to
 * generate per-post OG cards and teaser clips. Keep in sync when posts change
 * (only the fields the videos need are duplicated here).
 */
export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  readTime: string;
}

export const POSTS: PostMeta[] = [
  {
    slug: "reduce-churn-with-health-scoring",
    title: "How Intelligent Health Scoring Helps Founders Protect Revenue",
    date: "2026-03-15",
    readTime: "5 min read",
  },
  {
    slug: "onboarding-checklist-for-smb-saas",
    title: "The Essential Business Launch Checklist Every First-Time Founder Needs",
    date: "2026-03-08",
    readTime: "7 min read",
  },
  {
    slug: "ai-powered-customer-success",
    title: "How Automation Is Replacing the Back Office for Solo Founders",
    date: "2026-02-28",
    readTime: "6 min read",
  },
  {
    slug: "compliance-landmines-new-businesses",
    title: "The Hidden Compliance Landmines That Kill New Businesses",
    date: "2026-05-15",
    readTime: "6 min read",
  },
  {
    slug: "running-multiple-businesses",
    title: "Running Multiple Businesses Without Losing Your Mind",
    date: "2026-05-18",
    readTime: "6 min read",
  },
  {
    slug: "saas-stack-eating-margins",
    title: "Your SaaS Stack Is Eating Your Margins",
    date: "2026-05-20",
    readTime: "5 min read",
  },
  {
    slug: "metrics-bootstrapped-founders",
    title: "The Only 5 Metrics a Bootstrapped Founder Should Track",
    date: "2026-05-22",
    readTime: "5 min read",
  },
];
