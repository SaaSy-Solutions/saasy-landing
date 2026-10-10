import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync, mkdtempSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const workflow = readFileSync(new URL("../.github/workflows/deploy.yml", import.meta.url), "utf8");
const build = workflow.split("  build:\n")[1].split("  deploy:\n")[0];
const deploy = workflow.split("  deploy:\n")[1];
const steps = [...build.matchAll(/^      - name: (.+)\n([\s\S]*?)(?=^      - name: |$(?![\s\S]))/gm)]
  .map((match) => ({ name: match[1], body: match[2] }));

function condition(section) {
  const match = section.match(/^\s+if: >-\n((?: +[^\n]+\n)+?)(?= {4,8}[\w-]+:)/m);
  assert.ok(match, "a folded event guard must precede the protected job or step");
  return match[1].trim().replace(/\s+/g, " ");
}

// Evaluate the literal workflow guards with representative GitHub event contexts.
function allows(expression, eventName, ref, sameRepository = true, successful = true) {
  const github = {
    event_name: eventName,
    ref,
    repository: "SaaSy-Solutions/saasy-landing",
    event: { pull_request: { head: { repo: { full_name: sameRepository
      ? "SaaSy-Solutions/saasy-landing" : "external/fork" } } } },
  };
  return Function("github", "success", `"use strict"; return (${expression});`)(github, () => successful);
}

test("checks main PRs using only the dedicated self-hosted landing pool", () => {
  assert.match(workflow, /on:\n  pull_request:\n    branches: \["main"\]/);
  assert.doesNotMatch(workflow, /pull_request_target|ubuntu-latest|ubuntu-\d|blacksmith|cloudflare/);
  assert.equal((workflow.match(/runs-on: \[self-hosted, Linux, X64, saasy-landing\]/g) ?? []).length, 2);
  assert.match(build, /timeout-minutes: 30/);
  assert.match(deploy, /timeout-minutes: 10/);
});

test("fork PRs and non-main manual dispatches cannot reach checkout", () => {
  const guard = condition(build);
  assert.equal(allows(guard, "pull_request", "refs/pull/67/merge"), true);
  assert.equal(allows(guard, "pull_request", "refs/pull/67/merge", false), false);
  assert.equal(allows(guard, "workflow_dispatch", "refs/heads/fix/contact"), false);
  assert.equal(allows(guard, "push", "refs/heads/fix/contact"), false);
  assert.equal(allows(guard, "workflow_dispatch", "refs/heads/main"), true);
  assert.equal(allows(guard, "push", "refs/heads/main"), true);
  assert.match(steps.find((step) => step.name === "Checkout").body, /persist-credentials: false/);
});

test("PR verification has read-only permissions and no production secret", () => {
  const defaults = workflow.split("permissions:\n")[1].split("concurrency:\n")[0];
  assert.equal(defaults.trim(), "contents: read");
  assert.doesNotMatch(build, /^    permissions:/m);
  const secretSteps = steps.filter((step) => /secrets\./.test(step.body));
  assert.deepEqual(secretSteps.map((step) => step.name), ["Build main for deployment"]);
  assert.doesNotMatch(build.split("    steps:\n")[0], /secrets\./);
  assert.match(steps.find((step) => step.name === "Build PR without production credentials").body,
    /if: github.event_name == 'pull_request'\n        run: pnpm run build/);
});

test("secrets, Pages artifact and deployment are restricted to main releases", () => {
  const protectedSections = [
    steps.find((step) => step.name === "Build main for deployment").body,
    steps.find((step) => step.name === "Upload artifact").body,
    deploy,
  ];
  for (const section of protectedSections) {
    const guard = condition(section);
    assert.equal(allows(guard, "pull_request", "refs/pull/67/merge"), false);
    assert.equal(allows(guard, "workflow_dispatch", "refs/heads/fix/contact"), false);
    assert.equal(allows(guard, "push", "refs/heads/main"), true);
    assert.equal(allows(guard, "workflow_dispatch", "refs/heads/main"), true);
    assert.equal(allows(guard, "schedule", "refs/heads/main"), false);
  }
  assert.match(deploy, /permissions:\n      contents: read\n      pages: write\n      id-token: write/);
  assert.match(deploy, /needs: build/);
});

test("frozen pnpm installs execute both UI harnesses and all script regressions", () => {
  assert.doesNotMatch(workflow, /\bnpm (?:ci|install|run)\b|cache: "npm"/);
  assert.match(build, /uses: pnpm\/action-setup@v4[\s\S]*version: "10\.26\.0"/);
  assert.match(build, /run: pnpm install --frozen-lockfile/);
  assert.match(build, /run: node --test scripts\/\*\.test\.mjs/);
  for (const directory of ["contact-ui", "cookie-ui"]) {
    for (const command of ["install --frozen-lockfile", "test", "typecheck"]) {
      assert.ok(build.includes(`pnpm --dir tests/${directory} ${command}`));
    }
    assert.ok(build.includes(`tests/${directory}/pnpm-lock.yaml`));
  }
});

test("PR queues cannot occupy the main deployment concurrency group", () => {
  assert.match(workflow, /group: "pages-\$\{\{ github.event_name == 'pull_request' && github.event.pull_request.number \|\| github.ref \}\}"/);
  assert.match(workflow, /cancel-in-progress: false/);
});

test("preserves successful PR builds with public identity; never uploads a failed or main PR snapshot", () => {
  const identity = steps.find((step) => step.name === "Record PR artifact identity");
  const upload = steps.find((step) => step.name === "Preserve PR browser verification artifact");
  for (const step of [identity, upload]) {
    const guard = condition(step.body);
    assert.equal(allows(guard, "pull_request", "refs/pull/67/merge"), true);
    assert.equal(allows(guard, "pull_request", "refs/pull/67/merge", true, false), false);
    assert.equal(allows(guard, "push", "refs/heads/main"), false);
    assert.equal(allows(guard, "workflow_dispatch", "refs/heads/main"), false);
    assert.doesNotMatch(step.body, /secrets\.|pages: write|id-token: write/);
  }
  const names = steps.map((step) => step.name);
  assert.ok(names.indexOf(identity.name) > names.indexOf("Build PR without production credentials"));
  assert.ok(names.indexOf(upload.name) > names.indexOf(identity.name));
  assert.match(upload.body, /uses: actions\/upload-artifact@v4/);
  assert.doesNotMatch(upload.body, /upload-pages-artifact/);
  assert.ok(upload.body.includes("name: landing-pr-${{ github.event.pull_request.number }}-${{ github.event.pull_request.head.sha }}"));
  assert.match(upload.body, /path: \.\/out\n          include-hidden-files: true\n          if-no-files-found: error\n          retention-days: 3/);
  assert.match(identity.body, /EXPECTED_PR_HEAD: \$\{\{ github.event.pull_request.head.sha \}\}/);
  assert.match(identity.body, /expectedPrHead: process.env.EXPECTED_PR_HEAD/);
  assert.match(identity.body, /checkoutSha: git\('HEAD'\)/);
  assert.match(identity.body, /checkoutTree: git\('HEAD\^\{tree\}'\)/);
  assert.match(identity.body, /runId: process.env.GITHUB_RUN_ID/);
  assert.match(identity.body, /writeFileSync\('out\/_verification.json'.*flag: 'wx'/);
});

test("artifact identity records the real checkout tree and refuses malformed or duplicate metadata", () => {
  const identity = steps.find((step) => step.name === "Record PR artifact identity");
  const heredoc = identity.body.match(/node --input-type=module <<'NODE'\n([\s\S]*?)^          NODE$/m);
  assert.ok(heredoc);
  const script = heredoc[1].replace(/^          /gm, "");
  const source = fileURLToPath(new URL("..", import.meta.url));
  const gitDir = execFileSync("git", ["rev-parse", "--absolute-git-dir"], { cwd: source, encoding: "utf8" }).trim();
  const checkoutSha = execFileSync("git", ["rev-parse", "HEAD"], { cwd: source, encoding: "utf8" }).trim();
  const checkoutTree = execFileSync("git", ["rev-parse", "HEAD^{tree}"], { cwd: source, encoding: "utf8" }).trim();
  const directory = mkdtempSync(join(tmpdir(), "landing-pr-artifact-"));
  try {
    mkdirSync(join(directory, "out"));
    const env = { ...process.env, GIT_DIR: gitDir, EXPECTED_PR_HEAD: "a".repeat(40), GITHUB_RUN_ID: "12345", GITHUB_RUN_ATTEMPT: "1" };
    const run = (environment) => execFileSync(process.execPath, ["--input-type=module"],
      { cwd: directory, env: environment, input: script, stdio: ["pipe", "pipe", "pipe"] });
    assert.throws(() => run({ ...env, EXPECTED_PR_HEAD: "invalid" }));
    assert.equal(existsSync(join(directory, "out/_verification.json")), false);
    run(env);
    const file = join(directory, "out/_verification.json");
    assert.deepEqual(JSON.parse(readFileSync(file, "utf8")), {
      expectedPrHead: "a".repeat(40), checkoutSha, checkoutTree, runId: "12345", runAttempt: "1",
    });
    const original = readFileSync(file, "utf8");
    assert.throws(() => run(env));
    assert.equal(readFileSync(file, "utf8"), original);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
