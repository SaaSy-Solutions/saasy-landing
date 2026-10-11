Run `pnpm --dir tests/contact-ui install --frozen-lockfile --ignore-scripts`, then
`pnpm --dir tests/contact-ui test` and `pnpm --dir tests/contact-ui typecheck`.
This isolated harness leaves the production npm lock and dependencies unchanged.
React and ReactDOM match the production lock; aliases ensure one React instance.
All lead requests are intercepted with a fetch mock; no real email is sent.
These focused checks do not replace a local browser/API flow or the production build.
The production tsconfig excludes this harness so production installs do not
need test-only dependencies; the harness typechecks ContactForm explicitly.
