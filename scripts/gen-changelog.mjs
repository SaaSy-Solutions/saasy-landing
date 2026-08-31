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

// GitHub's Search API refuses to page past 1000 results: page 11 returns
// `422 Only the first 1000 search results are available`. The old code looped
// `page <= 10`, which sat exactly on that ceiling, so a window with more than
// 1000 merged PRs was silently truncated to its oldest 1000 and the run still
// reported success. That shipped a draft that looked complete and was missing
// six weeks of the most recent work.
//
// So: query in date windows and split any window that reaches the cap, rather
// than trusting a single unbounded query.
const SEARCH_RESULT_CAP = 1000;
const DAY_MS = 86400000;
const toISO = (ms) => new Date(ms).toISOString().slice(0, 10);
const fromISO = (s) => Date.parse(`${s}T00:00:00Z`);

async function searchPage(q, page) {
  const url =
    `https://api.github.com/search/issues?q=${encodeURIComponent(q)}` +
    `&sort=created&order=asc&per_page=100&page=${page}`;
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "saasy-changelog-bot",
      },
    });
    if (res.ok) return res.json();
    // Search is capped near 30 requests/minute; windowing spends more of them.
    if ((res.status === 403 || res.status === 429) && attempt <= 5) {
      const wait = Number(res.headers.get("retry-after")) || attempt * 15;
      console.error(`  rate-limited (${res.status}); retrying in ${wait}s`);
      await new Promise((r) => setTimeout(r, wait * 1000));
      continue;
    }
    throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  }
}

// Collect one inclusive [from, to] window, halving it whenever it saturates.
async function fetchWindow(from, to, out, windows) {
  const q = `repo:${REPO} is:pr is:merged merged:${from}..${to}`;
  const first = await searchPage(q, 1);
  const total = first.total_count;

  if (total >= SEARCH_RESULT_CAP) {
    if (from === to) {
      // Nothing left to split. Fail loudly rather than truncate in silence.
      throw new Error(
        `${total} PRs merged on ${from} alone, at or beyond the Search API's ` +
          `${SEARCH_RESULT_CAP}-result cap. A single day cannot be split ` +
          `further, so this window cannot be read completely.`,
      );
    }
    const mid = toISO(
      fromISO(from) + Math.floor((fromISO(to) - fromISO(from)) / 2 / DAY_MS) * DAY_MS,
    );
    console.error(`  ${from}..${to}: ${total} PRs, at the cap. Splitting.`);
    await fetchWindow(from, mid, out, windows);
    await fetchWindow(toISO(fromISO(mid) + DAY_MS), to, out, windows);
    return;
  }

  out.push(...first.items);
  const pages = Math.ceil(total / 100);
  for (let page = 2; page <= pages; page++) {
    out.push(...(await searchPage(q, page)).items);
  }
  windows.push({ from, to, total });
}

async function fetchMergedPrs(sinceDate) {
  // The original query was `merged:>sinceDate`, i.e. strictly after that day.
  // Windows are inclusive, so start the day after to preserve the semantics.
  const from = toISO(fromISO(sinceDate) + DAY_MS);
  const to = toISO(Date.now());
  if (fromISO(from) > fromISO(to)) return [];

  const raw = [];
  const windows = [];
  await fetchWindow(from, to, raw, windows);

  // Split boundaries are inclusive on both sides, so de-duplicate by number.
  const byNumber = new Map();
  for (const pr of raw) byNumber.set(pr.number, pr);
  const prs = [...byNumber.values()].sort(
    (a, b) => Date.parse(a.created_at) - Date.parse(b.created_at),
  );

  const claimed = windows.reduce((n, w) => n + w.total, 0);
  console.error(
    `  ${windows.length} window(s) read; ${claimed} PRs reported, ` +
      `${prs.length} unique after de-duplication`,
  );
  // Each window pushes every page it reports, so a shortfall means a page was
  // lost. Fail rather than draft a changelog from a partial read.
  if (raw.length < claimed) {
    throw new Error(
      `Fetched ${raw.length} PRs but windows reported ${claimed}. ` +
        `Refusing to draft a changelog from an incomplete read.`,
    );
  }
  return prs;
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
