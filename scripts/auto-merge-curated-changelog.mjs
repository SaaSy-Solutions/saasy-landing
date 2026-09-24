// Runs from the trusted base branch in pull_request_target. Reads PR data via
// the GitHub API and never checks out or executes code from the PR head.
import { pathToFileURL } from "node:url";

const DATA_PATH = "app/changelog/changelog.json";
const ITEM_TYPES = new Set(["feature", "improvement", "fix"]);

export function validateCuratedChangelog(base, candidate, files) {
  if (files.length !== 1 || files[0].filename !== DATA_PATH) {
    throw new Error("Curation PR must change only the changelog data file");
  }
  if (!Array.isArray(base.entries) || !Array.isArray(candidate.entries)) {
    throw new Error("Changelog entries are missing");
  }
  if (candidate.entries.length !== base.entries.length + 1) {
    throw new Error("Curation must add exactly one entry");
  }
  if (JSON.stringify(candidate.entries.slice(1)) !== JSON.stringify(base.entries)) {
    throw new Error("Previously published entries were changed");
  }

  const latest = candidate.entries[0];
  if (latest.curated !== true) {
    return false;
  }
  if (!/^\d+\.\d+\.\d+$/.test(latest.version)) {
    throw new Error("Curated entry needs a numeric release version");
  }
  const nextVersion = latest.version.split(".").map(Number);
  const priorVersion = base.entries[0].version.split(".").map(Number);
  const changedPart = nextVersion.findIndex((part, index) => part !== priorVersion[index]);
  if (changedPart < 0 || nextVersion[changedPart] < priorVersion[changedPart]) {
    throw new Error("Release version must increase");
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(latest.date) || latest.date < base.entries[0].date) {
    throw new Error("Release date must be valid and nondecreasing");
  }
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(latest.source_through) ||
      Number.isNaN(Date.parse(latest.source_through)) ||
      latest.source_through.slice(0, 10) !== latest.date ||
      (base.entries[0].source_through &&
        latest.source_through <= base.entries[0].source_through)) {
    throw new Error("Keep the generated source_through timestamp and date");
  }
  if (typeof latest.title !== "string" || latest.title.length < 8 ||
      latest.title.length > 100 || /draft/i.test(latest.title)) {
    throw new Error("Curated entry needs a customer-facing title");
  }
  if (!Array.isArray(latest.items) || latest.items.length < 3 || latest.items.length > 40) {
    throw new Error("Curated entry needs 3 to 40 items");
  }
  for (const item of latest.items) {
    if (!ITEM_TYPES.has(item.type) || typeof item.text !== "string" ||
        item.text.length < 20 || item.text.length > 400 ||
        /\b(?:Refs?|Closes)\s+#\d+\b|\b(?:Salvage|TODO|WIP)\b/i.test(item.text)) {
      throw new Error("Entry contains an uncurated or invalid item");
    }
  }
  return true;
}

async function api(path, token, options = {}) {
  const response = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "saasy-changelog-bot",
    },
  });
  if (!response.ok) {
    throw new Error(`GitHub API ${response.status}: ${path}`);
  }
  return response.json();
}

async function changelogAt(repo, sha, token) {
  const file = await api(`/repos/${repo}/contents/${DATA_PATH}?ref=${sha}`, token);
  if (file.encoding !== "base64" || typeof file.content !== "string") {
    throw new Error("GitHub did not return changelog file content");
  }
  return JSON.parse(Buffer.from(file.content, "base64").toString("utf8"));
}

export async function dispatchWorkflow(repo, workflow, token, fetchImpl = fetch) {
  const response = await fetchImpl(
    `https://api.github.com/repos/${repo}/actions/workflows/${workflow}/dispatches`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "saasy-changelog-bot",
      },
      body: JSON.stringify({ ref: "main" }),
    },
  );
  if (!response.ok) {
    throw new Error(`Could not dispatch ${workflow}: HTTP ${response.status}`);
  }
}

async function main() {
  const repo = process.env.GITHUB_REPOSITORY;
  const number = Number(process.env.PR_NUMBER);
  const token = process.env.GITHUB_TOKEN;
  if (!repo || !Number.isSafeInteger(number) || !token) {
    throw new Error("Missing GitHub repository, PR number, or token");
  }
  const pr = await api(`/repos/${repo}/pulls/${number}`, token);
  if (pr.state !== "open" || pr.base.ref !== "main" ||
      pr.head.ref !== "changelog/draft" || pr.head.repo.full_name !== repo) {
    throw new Error("Unexpected PR source or target");
  }
  if (pr.draft) {
    console.log("PR is still marked draft; leaving it open.");
    return;
  }
  if (pr.changed_files !== 1) {
    throw new Error("Curation PR must change exactly one file");
  }
  const [base, candidate, files] = await Promise.all([
    changelogAt(repo, pr.base.sha, token),
    changelogAt(repo, pr.head.sha, token),
    api(`/repos/${repo}/pulls/${number}/files?per_page=100`, token),
  ]);
  if (!validateCuratedChangelog(base, candidate, files)) {
    console.log("Draft is awaiting curation; leaving PR open.");
    return;
  }
  const result = await api(`/repos/${repo}/pulls/${number}/merge`, token, {
    method: "PUT",
    body: JSON.stringify({ merge_method: "squash", sha: pr.head.sha }),
  });
  if (!result.merged) {
    throw new Error("GitHub did not merge the curated changelog PR");
  }
  console.log(`Merged curated changelog PR #${number}: ${result.sha}`);
  // A merge made with GITHUB_TOKEN does not trigger push workflows. Explicit
  // workflow_dispatch events do trigger them, including the Pages deployment.
  await Promise.all([
    dispatchWorkflow(repo, "render-whatsnew.yml", token),
    dispatchWorkflow(repo, "deploy.yml", token),
  ]);
  console.log("Dispatched changelog video render and Pages deployment.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
