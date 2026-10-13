import assert from "node:assert/strict";
import test from "node:test";

import { proxy, upstreamUrl } from "../infra/posthog-ingest-worker/worker.mjs";

test("maps /ingest to the same PostHog hosts the app proxies to", () => {
  assert.equal(
    upstreamUrl("https://hellosaasy.ai/ingest/e/?ip=1&_=2"),
    "https://us.i.posthog.com/e/?ip=1&_=2",
  );
  assert.equal(
    upstreamUrl("https://hellosaasy.ai/ingest/static/array.js"),
    "https://us-assets.i.posthog.com/static/array.js",
  );
  assert.equal(upstreamUrl("https://hellosaasy.ai/ingestion"), null);
  assert.equal(upstreamUrl("https://hellosaasy.ai/pricing"), null);
});

test("forwards method, body and client IP but never site cookies", async () => {
  let seen;
  const fakeFetch = async (url, init) => {
    seen = { url, init, body: await new Response(init.body).text() };
    return new Response("ok", { status: 200 });
  };
  const request = new Request("https://hellosaasy.ai/ingest/e/", {
    method: "POST",
    body: '{"event":"cta_clicked"}',
    headers: {
      cookie: "saasy_session=secret",
      "cf-connecting-ip": "203.0.113.7",
      "content-type": "application/json",
    },
  });
  const response = await proxy(request, fakeFetch);
  assert.equal(response.status, 200);
  assert.equal(seen.url, "https://us.i.posthog.com/e/");
  assert.equal(seen.init.method, "POST");
  assert.equal(seen.body, '{"event":"cta_clicked"}');
  assert.equal(seen.init.headers.get("cookie"), null);
  assert.equal(seen.init.headers.get("x-forwarded-for"), "203.0.113.7");
});

test("anything outside /ingest is refused, not proxied", async () => {
  const response = await proxy(new Request("https://hellosaasy.ai/admin"), () => {
    throw new Error("must not fetch");
  });
  assert.equal(response.status, 404);
});
