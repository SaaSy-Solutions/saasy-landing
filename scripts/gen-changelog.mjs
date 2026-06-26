// Drafts a new changelog entry from merged saas-platform PRs.
//
// It reads app/changelog/changelog.json, finds the newest entry date, queries
// GitHub for PRs merged in SaaSy-Solutions/saas-platform since then, keeps only
// the user-facing ones (feat/fix/perf/refactor — not ci/chore/docs/test), and
// prepends a single DRAFT entry. A human edits the version, title and wording
// before the changelog is published.
//
// Usage:
//   GH_TOKEN=$(gh auth token) node scripts/gen-changelog.mjs            # write
//   GH_TOKEN=$(gh auth token) node scripts/gen-changelog.mjs --dry-run  # print
//   ... --since 2026-03-20   # override the "merged after" date
//
// Env: GH_TOKEN (or GITHUB_TOKEN) needs read access to the source repo.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const REPO = "SaaSy-Solutions/saas-platform";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = join(root, "app/changelog/changelog.json");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const sinceArg = (() => {
  const i = args.indexOf("--since");
  return i >= 0 ? args[i + 1] : null;
})();

const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
if (!token) {
  console.error("Missing GH_TOKEN / GITHUB_TOKEN with read access to " + REPO);
  process.exit(1);
}

// type → which changelog bucket it lands in. Anything not listed is dropped.
const TYPE_MAP = {
  feat: "feature",
  feature: "feature",
  fix: "fix",
  bugfix: "fix",
  hotfix: "fix",
  perf: "improvement",
  refactor: "improvement",
  improvement: "improvement",
  improve: "improvement",
};

function parseTitle(title) {
  // Strip a trailing "(#1234)" PR-number suffix, then the conventional prefix.
  const cleaned = title.replace(/\s*\(#\d+\)\s*$/, "").trim();
  const m = cleaned.match(/^(\w+)(?:\([^)]*\))?(!)?:\s*(.+)$/);
  if (!m) return null;
  const type = TYPE_MAP[m[1].toLowerCase()];
  if (!type) return null;
  let text = m[3].trim().replace(/\.$/, "");
  text = text.charAt(0).toUpperCase() + text.slice(1);
  return { type, text };
}

async function fetchMergedPrs(sinceDate) {
  const items = [];
  for (let page = 1; page <= 10; page++) {
    const q = `repo:${REPO} is:pr is:merged merged:>${sinceDate}`;
    const url =
      `https://api.github.com/search/issues?q=${encodeURIComponent(q)}` +
      `&sort=created&order=asc&per_page=100&page=${page}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "saasy-changelog-bot",
      },
    });
    if (!res.ok) {
      throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
    }
    const body = await res.json();
    items.push(...body.items);
    if (body.items.length < 100) break;
  }
  return items;
}

const data = JSON.parse(readFileSync(dataPath, "utf8"));
const latestDate = sinceArg
  || data.entries.map((e) => e.date).sort().at(-1)
  || "2026-01-01";

console.error(`Fetching ${REPO} PRs merged after ${latestDate} ...`);
const prs = await fetchMergedPrs(latestDate);
console.error(`  ${prs.length} merged PRs found`);

const seen = new Set();
const items = [];
let dropped = 0;
for (const pr of prs) {
  const parsed = parseTitle(pr.title);
  if (!parsed) {
    dropped++;
    continue;
  }
  const key = `${parsed.type}:${parsed.text.toLowerCase()}`;
  if (seen.has(key)) continue;
  seen.add(key);
  items.push(parsed);
}

// feature → improvement → fix
const order = { feature: 0, improvement: 1, fix: 2 };
items.sort((a, b) => order[a.type] - order[b.type]);

console.error(
  `  ${items.length} changelog-worthy items (${dropped} non-user-facing dropped)`,
);

if (items.length === 0) {
  console.error("Nothing new to add. Exiting without changes.");
  process.exit(0);
}

// Date-stamped DRAFT entry. The CI workflow exports the date; locally we let the
// script avoid new Date() coupling by reading CHANGELOG_DATE if present.
const today = process.env.CHANGELOG_DATE || new Date().toISOString().slice(0, 10);
const draft = {
  version: `DRAFT-${today}`,
  date: today,
  title: "Draft — edit version, title & wording before publishing",
  items,
};

if (dryRun) {
  console.log(JSON.stringify(draft, null, 2));
  process.exit(0);
}

data.entries.unshift(draft);
writeFileSync(dataPath, JSON.stringify(data, null, 2) + "\n");
console.error(`Prepended DRAFT entry with ${items.length} items to ${dataPath}`);
