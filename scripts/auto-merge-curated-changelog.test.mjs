import assert from "node:assert/strict";
import test from "node:test";
import {
  dispatchWorkflow,
  validateCuratedChangelog,
} from "./auto-merge-curated-changelog.mjs";

const old = { version: "1.12.0", date: "2026-08-31", title: "Prior", items: [] };
const entry = {
  version: "1.13.0",
  date: "2026-09-21",
  source_through: "2026-09-21T16:12:24Z",
  curated: true,
  title: "Customer-facing product changes",
  items: ["New customer feature", "Another customer feature", "A third customer feature"]
    .map((text) => ({ type: "feature", text })),
};
const base = { entries: [old] };
const files = [{ filename: "app/changelog/changelog.json" }];
const candidate = () => ({ entries: [structuredClone(entry), structuredClone(old)] });

test("accepts a curated entry and preserves prior history", () => {
  assert.equal(validateCuratedChangelog(base, candidate(), files), true);
});

test("leaves an uncurated generator draft open", () => {
  const draft = candidate();
  draft.entries[0].curated = false;
  assert.equal(validateCuratedChangelog(base, draft, files), false);
});

test("refuses unrelated files and edits to published history", () => {
  assert.throws(() => validateCuratedChangelog(base, candidate(), [{ filename: "app/page.tsx" }]));
  const changed = candidate();
  changed.entries[1].title = "Changed";
  assert.throws(() => validateCuratedChangelog(base, changed, files));
});

test("refuses raw titles, invalid versions, and missing source cutoffs", () => {
  const raw = candidate();
  raw.entries[0].items[0].text = "Salvage internal service (Refs #4808)";
  assert.throws(() => validateCuratedChangelog(base, raw, files));
  const stale = candidate();
  stale.entries[0].version = "1.12.0";
  assert.throws(() => validateCuratedChangelog(base, stale, files));
  const cutoff = candidate();
  delete cutoff.entries[0].source_through;
  assert.throws(() => validateCuratedChangelog(base, cutoff, files));
});

test("dispatches the main-branch Pages build after a token-authored merge", async () => {
  await dispatchWorkflow(
    "SaaSy-Solutions/saasy-landing",
    "deploy.yml",
    "test-token",
    async (url, options) => {
      assert.match(url, /workflows\/deploy\.yml\/dispatches$/);
      assert.equal(options.method, "POST");
      assert.deepEqual(JSON.parse(options.body), { ref: "main" });
      return { ok: true, status: 204 };
    },
  );
  await assert.rejects(
    dispatchWorkflow("SaaSy-Solutions/saasy-landing", "deploy.yml", "test-token",
      async () => ({ ok: false, status: 403 })),
    /HTTP 403/,
  );
});
