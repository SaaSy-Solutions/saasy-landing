/**
 * Detects visits that arrive from an AI assistant (ChatGPT, Perplexity,
 * Claude, ...) so analytics can attribute them. Pure classification lives in
 * `classifyAiReferral`; `trackAiReferralLanding` sends the PostHog events once
 * per browser session and must only be called once analytics is active.
 */

export type AiEngine =
  | 'chatgpt'
  | 'perplexity'
  | 'claude'
  | 'gemini'
  | 'copilot'
  | 'meta_ai'
  | 'grok'
  | 'deepseek'
  | 'mistral'
  | 'you'
  | 'phind';

/** Referrer hosts per engine; a host also matches its subdomains. */
const ENGINE_SOURCES: ReadonlyArray<{ engine: AiEngine; host: string; path?: string }> = [
  { engine: 'chatgpt', host: 'chatgpt.com' },
  { engine: 'chatgpt', host: 'chat.openai.com' },
  { engine: 'perplexity', host: 'perplexity.ai' },
  { engine: 'claude', host: 'claude.ai' },
  { engine: 'gemini', host: 'gemini.google.com' },
  { engine: 'gemini', host: 'bard.google.com' },
  { engine: 'copilot', host: 'copilot.microsoft.com' },
  { engine: 'copilot', host: 'edgeservices.bing.com', path: '/edgesvc/chat' },
  { engine: 'meta_ai', host: 'meta.ai' },
  { engine: 'grok', host: 'grok.com' },
  { engine: 'grok', host: 'x.ai' },
  { engine: 'deepseek', host: 'chat.deepseek.com' },
  { engine: 'mistral', host: 'chat.mistral.ai' },
  { engine: 'you', host: 'you.com' },
  { engine: 'phind', host: 'phind.com' },
];

const ENGINE_NAMES = new Set<string>(ENGINE_SOURCES.map((source) => source.engine));

export const AI_REFERRAL_SESSION_KEY = 'ai-referral-checked';

export interface AiReferral {
  engine: AiEngine;
  /** Referrer hostname, or null when only utm_source identified the engine. */
  referrerHost: string | null;
  utmSource: string | null;
}

function hostMatches(host: string, candidate: string): boolean {
  return host === candidate || host.endsWith(`.${candidate}`);
}

function isSameSite(a: string, b: string): boolean {
  const strip = (host: string) => host.replace(/^www\./, '');
  const left = strip(a);
  const right = strip(b);
  return hostMatches(left, right) || hostMatches(right, left);
}

function parseReferrer(referrer: string): URL | null {
  if (!referrer) return null;
  try {
    const parsed = new URL(referrer);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:' ? parsed : null;
  } catch {
    return null;
  }
}

function engineFromHost(host: string, path: string): AiEngine | null {
  const source = ENGINE_SOURCES.find(
    (candidate) => hostMatches(host, candidate.host) && (!candidate.path || path.startsWith(candidate.path)),
  );
  return source?.engine ?? null;
}

function engineFromUtm(utmSource: string): AiEngine | null {
  const value = utmSource.trim().toLowerCase();
  if (!value) return null;
  const name = value.replace(/[-\s]/g, '_');
  if (ENGINE_NAMES.has(name)) return name as AiEngine;
  return engineFromHost(value.replace(/^https?:\/\//, '').split('/')[0], '/');
}

/** Full classification with the context the landing event reports. */
export function classifyAiReferral(referrer: string, url: URL): AiReferral | null {
  const ref = parseReferrer(referrer);
  if (ref && isSameSite(ref.hostname.toLowerCase(), url.hostname.toLowerCase())) return null;

  const referrerHost = ref ? ref.hostname.toLowerCase() : null;
  const utmSource = url.searchParams.get('utm_source');

  const fromReferrer = ref && referrerHost ? engineFromHost(referrerHost, ref.pathname) : null;
  const engine = fromReferrer ?? (utmSource ? engineFromUtm(utmSource) : null);
  return engine ? { engine, referrerHost, utmSource } : null;
}

/** The AI engine that sent this visit, or null for anything else. */
export function classify(referrer: string, url: URL): AiEngine | null {
  return classifyAiReferral(referrer, url)?.engine ?? null;
}

export interface AiReferralAnalytics {
  register(properties: Record<string, unknown>): void;
  capture(event: string, properties?: Record<string, unknown>): unknown;
}

export interface AiReferralContext {
  referrer: string;
  url: URL;
  /** Session-scoped storage used to fire at most once per session. */
  storage?: Pick<Storage, 'getItem' | 'setItem'> | null;
}

/**
 * On the first evaluated page load of a session, registers `ai_referrer` as a
 * super property and captures `ai_referral_landing` when the visit came from
 * an AI engine. Returns the detected engine (null when none or already done).
 */
export function trackAiReferralLanding(analytics: AiReferralAnalytics, context: AiReferralContext): AiEngine | null {
  const { storage } = context;
  try {
    if (storage?.getItem(AI_REFERRAL_SESSION_KEY)) return null;
    storage?.setItem(AI_REFERRAL_SESSION_KEY, '1');
  } catch {
    // Storage can be blocked; classification still runs for this page load.
  }

  const referral = classifyAiReferral(context.referrer, context.url);
  if (!referral) return null;

  analytics.register({ ai_referrer: referral.engine });
  analytics.capture('ai_referral_landing', {
    ai_engine: referral.engine,
    landing_path: context.url.pathname,
    referrer_host: referral.referrerHost,
    utm_source: referral.utmSource,
    $set_once: { initial_ai_referrer: referral.engine },
  });
  return referral.engine;
}

/** Browser convenience wrapper; safe to call during SSR (does nothing). */
export function trackAiReferralFromDocument(analytics: AiReferralAnalytics): AiEngine | null {
  if (typeof window === 'undefined' || typeof document === 'undefined') return null;
  let storage: Storage | null = null;
  try {
    storage = window.sessionStorage;
  } catch {
    storage = null;
  }
  return trackAiReferralLanding(analytics, {
    referrer: document.referrer,
    url: new URL(window.location.href),
    storage,
  });
}
