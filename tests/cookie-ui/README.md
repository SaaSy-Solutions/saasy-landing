# Cookie consent regression tests

Run `pnpm install --frozen-lockfile --ignore-scripts`, then `pnpm test` and
`pnpm typecheck` from this directory. The isolated pinned dependencies preserve
the production npm package and lockfile. React is shared between the imported
production components and the rendered test harness; the PostHog SDK is mocked,
so these tests make no analytics or provider requests.

These DOM tests cover consent reads, banner visibility, persistence failures,
accessible retry feedback and analytics initialization/capture gating. They do
not verify the live release, browser deployment, or analytics auto-capture after
an already initialized SDK loses storage access.
