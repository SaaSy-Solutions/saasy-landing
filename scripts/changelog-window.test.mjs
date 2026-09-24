import assert from "node:assert/strict";
import test from "node:test";
import { mergeWindow, mergedInWindow } from "./changelog-window.mjs";

test("legacy entries start the day after their publication date", () => {
  assert.deepEqual(mergeWindow("2026-08-31", null, "2026-09-21T16:12:24Z"), {
    from: "2026-09-01",
    to: "2026-09-21",
  });
});

test("new entries include later merges on the same calendar day", () => {
  const through = "2026-09-24T16:00:00Z";
  const sourceThrough = "2026-09-21T16:12:24Z";
  assert.deepEqual(mergeWindow("2026-09-21", sourceThrough, through), {
    from: "2026-09-21",
    to: "2026-09-24",
  });
  assert.equal(
    mergedInWindow(
      { number: 8859, pull_request: { merged_at: "2026-09-21T22:02:05Z" } },
      sourceThrough,
      through,
    ),
    true,
  );
  assert.equal(
    mergedInWindow(
      { number: 8858, closed_at: "2026-09-21T15:00:00Z" },
      sourceThrough,
      through,
    ),
    false,
  );
  assert.equal(
    mergedInWindow(
      { number: 8860, closed_at: "2026-09-24T16:01:00Z" },
      sourceThrough,
      through,
    ),
    false,
  );
});
