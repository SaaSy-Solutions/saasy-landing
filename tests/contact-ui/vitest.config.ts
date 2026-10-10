import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

// The imported production component and test renderer share these exact modules.
const modulePath = (name: string) => fileURLToPath(new URL(`./node_modules/${name}`, import.meta.url));
export default defineConfig({
  resolve: { alias: [
    { find: /^posthog-js$/, replacement: modulePath('posthog-js') },
    { find: /^react$/, replacement: modulePath('react/index.js') },
    { find: /^react\/(.*)$/, replacement: `${modulePath('react')}/$1` },
    { find: /^react-dom$/, replacement: modulePath('react-dom/index.js') },
    { find: /^react-dom\/(.*)$/, replacement: `${modulePath('react-dom')}/$1` },
  ] },
  esbuild: { jsx: 'automatic' },
  test: { environment: 'jsdom', maxWorkers: 1, minWorkers: 1, fileParallelism: false },
});
