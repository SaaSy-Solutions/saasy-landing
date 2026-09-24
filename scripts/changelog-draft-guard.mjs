// Keep the scheduled draft job from force-pushing over edits to an open PR.
import { appendFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

export async function shouldSkipDraft({ fetchImpl, repo, token, allowRefresh }) {
  if (allowRefresh) return false;

  const url = new URL(`https://api.github.com/repos/${repo}/pulls`);
  url.searchParams.set("state", "open");
  url.searchParams.set("head", `${repo.split("/")[0]}:changelog/draft`);
  url.searchParams.set("per_page", "100");

  const response = await fetchImpl(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "saasy-changelog-bot",
    },
  });
  if (!response.ok) {
    throw new Error(`Could not check open changelog PRs: HTTP ${response.status}`);
  }

  const pulls = await response.json();
  return pulls.some(
    (pull) =>
      pull.state === "open" &&
      pull.head?.ref === "changelog/draft" &&
      pull.base?.ref === "main",
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const skip = await shouldSkipDraft({
    fetchImpl: fetch,
    repo: process.env.GITHUB_REPOSITORY,
    token: process.env.GITHUB_TOKEN,
    allowRefresh: process.env.ALLOW_REFRESH === "true",
  });
  appendFileSync(process.env.GITHUB_OUTPUT, `skip=${skip}\n`);
  console.log(
    skip
      ? "Open changelog curation PR found; leaving its edits intact."
      : "No active curation PR to preserve; draft generation can run.",
  );
}
