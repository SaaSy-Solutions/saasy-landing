import { describe, expect, it, vi } from 'vitest';
import {
  AI_REFERRAL_SESSION_KEY,
  classify,
  classifyAiReferral,
  trackAiReferralLanding,
} from '../../lib/ai-referrer';

const landing = (query = '') => new URL(`https://hellosaasy.ai/pricing${query}`);

describe('classify', () => {
  it.each([
    ['https://chatgpt.com/', 'chatgpt'],
    ['https://chat.openai.com/c/abc', 'chatgpt'],
    ['https://perplexity.ai/search?q=crm', 'perplexity'],
    ['https://www.perplexity.ai/', 'perplexity'],
    ['https://claude.ai/chat/123', 'claude'],
    ['https://gemini.google.com/app', 'gemini'],
    ['https://bard.google.com/', 'gemini'],
    ['https://copilot.microsoft.com/', 'copilot'],
    ['https://edgeservices.bing.com/edgesvc/chat?udsframed=1', 'copilot'],
    ['https://www.meta.ai/', 'meta_ai'],
    ['https://grok.com/', 'grok'],
    ['https://x.ai/', 'grok'],
    ['https://chat.deepseek.com/', 'deepseek'],
    ['https://chat.mistral.ai/chat', 'mistral'],
    ['https://you.com/search?q=crm', 'you'],
    ['https://www.phind.com/search', 'phind'],
  ])('detects %s as %s', (referrer, engine) => {
    expect(classify(referrer, landing())).toBe(engine);
  });

  it.each([
    ['chatgpt.com', 'chatgpt'],
    ['ChatGPT', 'chatgpt'],
    ['perplexity', 'perplexity'],
    ['www.perplexity.ai', 'perplexity'],
    ['claude.ai', 'claude'],
    ['gemini', 'gemini'],
    ['copilot', 'copilot'],
    ['meta_ai', 'meta_ai'],
    ['meta-ai', 'meta_ai'],
    ['grok', 'grok'],
    ['deepseek', 'deepseek'],
    ['chat.mistral.ai', 'mistral'],
    ['you', 'you'],
    ['phind.com', 'phind'],
  ])('detects utm_source=%s as %s without a referrer', (utm, engine) => {
    expect(classify('', landing(`?utm_source=${encodeURIComponent(utm)}`))).toBe(engine);
  });

  it('prefers the referrer engine and reports referrer host and utm_source', () => {
    expect(classifyAiReferral('https://chatgpt.com/', landing('?utm_source=chatgpt.com'))).toEqual({
      engine: 'chatgpt',
      referrerHost: 'chatgpt.com',
      utmSource: 'chatgpt.com',
    });
  });

  it('ignores non-AI referrers and utm sources', () => {
    expect(classify('https://www.google.com/search?q=crm', landing())).toBeNull();
    expect(classify('https://www.bing.com/search?q=crm', landing())).toBeNull();
    expect(classify('https://edgeservices.bing.com/other', landing())).toBeNull();
    expect(classify('https://notchatgpt.com/', landing())).toBeNull();
    expect(classify('', landing('?utm_source=newsletter'))).toBeNull();
  });

  it('returns null for same-site navigation, even with an AI utm_source', () => {
    expect(classify('https://hellosaasy.ai/features', landing('?utm_source=chatgpt.com'))).toBeNull();
    expect(classify('https://www.hellosaasy.ai/', landing())).toBeNull();
    expect(classify('https://app.hellosaasy.ai/login', landing())).toBeNull();
  });

  it('returns null for an empty referrer without utm_source', () => {
    expect(classify('', landing())).toBeNull();
  });

  it.each(['not a url', '://chatgpt.com', 'javascript:alert(1)', 'chatgpt.com'])(
    'treats malformed referrer %j as absent',
    (referrer) => {
      expect(classify(referrer, landing())).toBeNull();
      expect(classify(referrer, landing('?utm_source=perplexity'))).toBe('perplexity');
    },
  );
});

describe('trackAiReferralLanding', () => {
  function memoryStorage() {
    const values = new Map<string, string>();
    return {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => void values.set(key, value),
    };
  }

  it('registers the engine and captures the landing event once per session', () => {
    const analytics = { register: vi.fn(), capture: vi.fn() };
    const storage = memoryStorage();
    const context = { referrer: 'https://chatgpt.com/', url: landing('?utm_source=chatgpt.com'), storage };

    expect(trackAiReferralLanding(analytics, context)).toBe('chatgpt');
    expect(analytics.register).toHaveBeenCalledWith({ ai_referrer: 'chatgpt' });
    expect(analytics.capture).toHaveBeenCalledWith('ai_referral_landing', {
      ai_engine: 'chatgpt',
      landing_path: '/pricing',
      referrer_host: 'chatgpt.com',
      utm_source: 'chatgpt.com',
      $set_once: { initial_ai_referrer: 'chatgpt' },
    });
    expect(storage.getItem(AI_REFERRAL_SESSION_KEY)).toBe('1');

    expect(trackAiReferralLanding(analytics, context)).toBeNull();
    expect(analytics.capture).toHaveBeenCalledTimes(1);
  });

  it('does not fire later in a session whose first page was not an AI referral', () => {
    const analytics = { register: vi.fn(), capture: vi.fn() };
    const storage = memoryStorage();
    trackAiReferralLanding(analytics, { referrer: 'https://www.google.com/', url: landing(), storage });
    trackAiReferralLanding(analytics, { referrer: 'https://claude.ai/', url: landing(), storage });
    expect(analytics.register).not.toHaveBeenCalled();
    expect(analytics.capture).not.toHaveBeenCalled();
  });

  it('still classifies when session storage throws', () => {
    const analytics = { register: vi.fn(), capture: vi.fn() };
    const storage = {
      getItem: () => {
        throw new DOMException('blocked', 'SecurityError');
      },
      setItem: () => undefined,
    };
    expect(trackAiReferralLanding(analytics, { referrer: 'https://claude.ai/', url: landing(), storage })).toBe('claude');
    expect(analytics.capture).toHaveBeenCalledTimes(1);
  });
});
