import { afterEach, expect, it, vi } from 'vitest';

afterEach(() => { vi.unstubAllEnvs(); vi.resetModules(); });

it('defaults anonymous capture to the active public gateway', async () => {
  vi.stubEnv('NEXT_PUBLIC_OPS_API_BASE', undefined);
  vi.resetModules();
  const { OPS_API_BASE } = await import('../../lib/api');
  expect(OPS_API_BASE).toBe('https://api.hellosaasy.ai');
});

it('preserves an explicitly configured capture API for local verification', async () => {
  vi.stubEnv('NEXT_PUBLIC_OPS_API_BASE', 'http://127.0.0.1:8189');
  vi.resetModules();
  const { OPS_API_BASE } = await import('../../lib/api');
  expect(OPS_API_BASE).toBe('http://127.0.0.1:8189');
});
