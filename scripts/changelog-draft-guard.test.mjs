import assert from "node:assert/strict";
import test from "node:test";
import { shouldSkipDraft } from "./changelog-draft-guard.mjs";

const openDraft = {
  state: "open",
  head: { ref: "changelog/draft" },
  base: { ref: "main" },
};

function apiReturning(pulls, status = 200) {
  return async (url, options) => {
    assert.equal(url.searchParams.get("head"), "SaaSy-Solutions:changelog/draft");
    assert.equal(options.headers.Authorization, "Bearer test-token");
    return { ok: status === 200, status, json: async () => pulls };
  };
}

const options = {
  repo: "SaaSy-Solutions/saasy-landing",
  token: "test-token",
  allowRefresh: false,
};

test("preserves an open curation PR", async () => {
  assert.equal(
    await shouldSkipDraft({ ...options, fetchImpl: apiReturning([openDraft]) }),
    true,
  );
});

test("generates a draft when no curation PR is open", async () => {
  assert.equal(
    await shouldSkipDraft({ ...options, fetchImpl: apiReturning([]) }),
    false,
  );
});

test("explicit refresh can replace an open draft", async () => {
  assert.equal(
    await shouldSkipDraft({
      ...options,
      allowRefresh: true,
      fetchImpl: () => { throw new Error("refresh must not query"); },
    }),
    false,
  );
});

test("an API failure stops the job before it can overwrite edits", async () => {
  await assert.rejects(
    shouldSkipDraft({ ...options, fetchImpl: apiReturning([], 503) }),
    /HTTP 503/,
  );
});
