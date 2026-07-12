/**
 * Render every marketing asset into ./out, then upload with
 * scripts/upload-to-tigris.py. Plain ESM (run: `node scripts/render-all.mjs`).
 *
 * OG cards + blog teasers + feature clips are parameterized, so we render their
 * compositions once per variant by writing a temp props file and passing
 * --props. The blog list mirrors src/data/posts.ts; the OG page list mirrors
 * OgCard.tsx `ogCards`; the feature clips mirror FeatureClip.tsx `featureClips`.
 *
 * Uses execFileSync with an argument array (no shell) — props reach Remotion as
 * a single argv entry, so titles with spaces/punctuation need no escaping.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const render = (kind, id, out, props) => {
  const args = ["remotion", kind, id, out];
  if (props) {
    const p = `out/.props/${out.replace(/[\/.]/g, "_")}.json`;
    writeFileSync(p, JSON.stringify(props));
    args.push(`--props=${p}`);
  }
  console.log("›", "npx", args.join(" "));
  execFileSync("npx", args, { stdio: "inherit" });
};

const REV = JSON.parse(readFileSync(new URL("../media-rev.json", import.meta.url), "utf8")).rev;
const rev = (name) => name.replace(/\.mp4$/, `-${REV}.mp4`);

mkdirSync("out/og", { recursive: true });
mkdirSync("out/blog", { recursive: true });
mkdirSync("out/.props", { recursive: true });

// ── OG cards: marketing pages (mirror OgCard.tsx ogCards) ──────────────────
const ogPages = [
  { name: "home", props: { eyebrow: "Business OS", title: "Your intelligent business", highlight: "co-founder" } },
  { name: "features", props: { eyebrow: "Features", title: "What you actually", highlight: "see" } },
  { name: "pricing", props: { eyebrow: "Pricing", title: "Simple, transparent", highlight: "pricing" } },
  { name: "integrations", props: { eyebrow: "Integrations", title: "Connect the tools you", highlight: "already use" } },
  { name: "customers", props: { eyebrow: "Customers", title: "Built for founders who", highlight: "wear every hat" } },
  { name: "compare", props: { eyebrow: "Compare", title: "SaaSy vs the", highlight: "alternatives" } },
  { name: "services", props: { eyebrow: "Services", title: "Custom automations &", highlight: "consulting" } },
  { name: "blog", props: { eyebrow: "Blog", title: "Ideas for", highlight: "building smarter" } },
  { name: "unions", props: { eyebrow: "Union & Labor Compliance", title: "Certified payroll without the", highlight: "Sunday spreadsheet" } },
  { name: "contact", props: { eyebrow: "Contact", title: "Talk to a", highlight: "human" } },
];

// ── Blog posts (mirror src/data/posts.ts) ──────────────────────────────────
const posts = [
  { slug: "reduce-churn-with-health-scoring", title: "How Intelligent Health Scoring Helps Founders Protect Revenue", readTime: "5 min read" },
  { slug: "onboarding-checklist-for-smb-saas", title: "The Essential Business Launch Checklist Every First-Time Founder Needs", readTime: "7 min read" },
  { slug: "ai-powered-customer-success", title: "How Automation Is Replacing the Back Office for Solo Founders", readTime: "6 min read" },
  { slug: "compliance-landmines-new-businesses", title: "The Hidden Compliance Landmines That Kill New Businesses", readTime: "6 min read" },
  { slug: "running-multiple-businesses", title: "Running Multiple Businesses Without Losing Your Mind", readTime: "6 min read" },
  { slug: "saas-stack-eating-margins", title: "Your SaaS Stack Is Eating Your Margins", readTime: "5 min read" },
  { slug: "metrics-bootstrapped-founders", title: "The Only 5 Metrics a Bootstrapped Founder Should Track", readTime: "5 min read" },
];

// ── Feature clips (mirror FeatureClip.tsx featureClips) ─────────────────────
const featureClips = {
  health: { screenshot: "screenshots/dashboard-hero.png", callout: { label: "6 at risk this week", top: "40%", left: "28%", arrow: "down" }, stat: { label: "Avg. health", to: 51, suffix: "" } },
  churn: { screenshot: "screenshots/churn-alerts.png", callout: { label: "Acted on in time", top: "18%", left: "32%", arrow: "up" } },
  ask: { screenshot: "screenshots/ask-saasy.png", callout: { label: "Plain-English answers", top: "26%", left: "8%", arrow: "left" } },
  customer: { screenshot: "screenshots/customer-detail.png", callout: { label: "The full story, one click", top: "20%", left: "30%", arrow: "up" } },
};

console.log("=== OG cards (pages) ===");
for (const { name, props } of ogPages) {
  render("still", "OgCard", `out/og/${name}.png`, props);
}

console.log("=== OG cards (blog posts) ===");
for (const post of posts) {
  render("still", "OgCard", `out/og/blog-${post.slug}.png`, { eyebrow: "SaaSy Blog", title: post.title });
}

console.log("=== Blog teasers ===");
for (const post of posts) {
  render("render", "BlogTeaser", `out/blog/${post.slug}.mp4`, { title: post.title, readTime: post.readTime, kicker: "From the SaaSy blog" });
}

console.log("=== Feature clips (text-free) ===");
for (const [key, props] of Object.entries(featureClips)) {
  render("render", "FeatureClip", rev(`out/feature-clip-${key}.mp4`), props);
}

console.log("=== What's new + Connect ===");
render("render", "WhatsNew", "out/whats-new.mp4");
render("render", "ConnectLoop", rev("out/connect.mp4"));

console.log("done");
