import type { Metadata } from "next";
import { SiteNav } from "../components/SiteNav";
import { MarketingFooter } from "../components/MarketingFooter";
import { videoUrl } from "../components/videoAssets";
import changelogData from "./changelog.json";

export const metadata: Metadata = {
  title: "Changelog — SaaSy",
  description:
    "See what\u2019s new in SaaSy \u2014 features, " +
    "improvements, and fixes.",
};

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  items: {
    type: "feature" | "improvement" | "fix";
    text: string;
  }[];
}

// Source of truth is changelog.json, which scripts/gen-changelog.mjs drafts
// from merged saas-platform PRs (see .github/workflows/changelog-draft.yml).
const CHANGELOG = changelogData.entries as ChangelogEntry[];

// The header clip is re-rendered by .github/workflows/render-whatsnew.yml from
// the latest 3 entries. Uploads are cached immutably, so the filename is
// content-addressed: <version>-<hash of the entries the clip shows>. Any
// changelog change yields a new URL, busting the cache. The workflow computes
// the SAME name (keep the two fnv1a's in sync).
const fnv1a = (s: string): string => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
};
const whatsNewRev = fnv1a(JSON.stringify(CHANGELOG.slice(0, 3)));
const whatsNewVideo = `whats-new-${CHANGELOG[0].version}-${whatsNewRev}.mp4`;

const TYPE_STYLES: Record<
  string,
  { label: string; className: string }
> = {
  feature: {
    label: "New",
    className: "bg-saasy-pink/10 text-saasy-pink-soft",
  },
  improvement: {
    label: "Improved",
    className: "bg-saasy-orange/10 text-saasy-orange",
  },
  fix: {
    label: "Fixed",
    className: "bg-saasy-muted/10 text-saasy-muted",
  },
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-3xl px-6 pt-28 pb-20">
        <h1
          className="
            text-4xl font-bold tracking-tight text-white"
        >
          Changelog
        </h1>
        <p
          className="mt-4
            text-lg text-saasy-muted"
        >
          New features, improvements, and fixes.
        </p>

        {/* Latest release, as a short looping clip (video/src/WhatsNew.tsx) */}
        <div className="relative mt-10">
          <div
            className="absolute inset-0 -m-3 rounded-2xl
              bg-gradient-to-br from-saasy-pink/5 to-saasy-orange/5 blur-xl"
          />
          <div
            className="glow-border relative overflow-hidden rounded-2xl
              bg-saasy-card/80 p-2 backdrop-blur-sm"
          >
            <video
              className="h-auto w-full rounded-lg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="What's new in the latest SaaSy release"
            >
              <source src={videoUrl(whatsNewVideo)} type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="mt-12 space-y-12">
          {CHANGELOG.map(entry => (
            <div key={entry.version}>
              <div className="flex items-center gap-3">
                <span
                  className="rounded-full bg-saasy-rose px-3 py-0.5
                     text-sm
                    font-semibold text-white"
                >
                  v{entry.version}
                </span>
                <time
                  dateTime={entry.date}
                  className="
                    text-sm text-saasy-muted"
                >
                  {new Date(entry.date).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </time>
              </div>
              <h2
                className="mt-3
                  text-xl font-semibold text-white"
              >
                {entry.title}
              </h2>
              <ul className="mt-4 space-y-2">
                {entry.items.map((item, i) => {
                  const style = TYPE_STYLES[item.type];
                  return (
                    <li
                      key={i}
                      className="flex items-start gap-3

                        text-sm text-saasy-text"
                    >
                      <span
                        className={`mt-0.5 inline-block rounded px-2
                          py-0.5 text-xs font-medium ${style.className}`}
                      >
                        {style.label}
                      </span>
                      <span>{item.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <MarketingFooter />
    </div>
  );
}
