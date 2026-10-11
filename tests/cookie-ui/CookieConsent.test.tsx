import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { CookieBanner, COOKIE_CONSENT_KEY, readCookieConsent } from '../../app/components/CookieBanner';
import { AnalyticsProvider } from '../../app/components/AnalyticsProvider';

const sdk = vi.hoisted(() => ({ init: vi.fn(), capture: vi.fn() }));
vi.mock('posthog-js', () => ({ default: sdk }));

beforeEach(() => {
  vi.restoreAllMocks();
  window.localStorage.clear();
  sdk.init.mockReset();
  sdk.capture.mockReset();
  vi.stubEnv('NEXT_PUBLIC_POSTHOG_KEY', 'test-key-not-a-live-key');
});
afterEach(() => { cleanup(); vi.unstubAllEnvs(); });

function view() {
  return render(<><CookieBanner /><AnalyticsProvider />
    <a data-cta="test" href="/signup?plan=starter" onClick={(event) => event.preventDefault()}>Sign up</a>
  </>);
}
function noTracking() {
  fireEvent.click(screen.getByRole('link', { name: 'Sign up' }));
  expect(sdk.init).not.toHaveBeenCalled();
  expect(sdk.capture).not.toHaveBeenCalled();
}

describe('cookie consent storage and analytics', () => {
  it('shows a fresh banner and does not track before a choice', () => {
    view();
    expect(screen.getByRole('button', { name: 'Essential only' })).toBeTruthy();
    noTracking();
  });
  it('hides the banner for saved essential-only without tracking', () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'essential');
    view();
    expect(screen.queryByRole('button', { name: 'Accept analytics' })).toBeNull();
    noTracking();
  });
  it('hides the banner and starts analytics for saved all', () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'all');
    view();
    expect(screen.queryByRole('button', { name: 'Accept analytics' })).toBeNull();
    expect(sdk.init).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole('link', { name: 'Sign up' }));
    expect(sdk.capture).toHaveBeenCalledWith('cta_signup_clicked', { source: 'test', plan: 'starter' }, { transport: 'sendBeacon' });
  });
  it.each(['invalid', '', '{"choice":"all"}'])('shows the banner and fails closed for malformed consent %j', (value) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
    view();
    expect(readCookieConsent()).toBeNull();
    expect(screen.getByRole('button', { name: 'Accept analytics' })).toBeTruthy();
    noTracking();
  });
  it('resolves pending and shows the banner when getItem throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new DOMException('blocked', 'SecurityError'); });
    view();
    expect(readCookieConsent()).toBeNull();
    expect(screen.getByRole('button', { name: 'Accept analytics' })).toBeTruthy();
    noTracking();
  });
  it('resolves pending when accessing localStorage itself throws', () => {
    vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => { throw new DOMException('blocked', 'SecurityError'); });
    view();
    expect(readCookieConsent()).toBeNull();
    expect(screen.getByRole('button', { name: 'Essential only' })).toBeTruthy();
    noTracking();
  });
  it('persists essential-only and hides the banner without tracking', () => {
    view(); fireEvent.click(screen.getByRole('button', { name: 'Essential only' }));
    expect(localStorage.getItem(COOKIE_CONSENT_KEY)).toBe('essential');
    expect(screen.queryByRole('button', { name: 'Essential only' })).toBeNull();
    noTracking();
  });
  it('starts analytics only after a persisted accept choice', () => {
    view(); noTracking();
    fireEvent.click(screen.getByRole('button', { name: 'Accept analytics' }));
    expect(localStorage.getItem(COOKIE_CONSENT_KEY)).toBe('all');
    expect(screen.queryByRole('button', { name: 'Accept analytics' })).toBeNull();
    expect(sdk.init).toHaveBeenCalledTimes(1);
    window.dispatchEvent(new Event('saasy-cookie-consent'));
    expect(sdk.init).toHaveBeenCalledTimes(1);
  });
  it.each(['Essential only', 'Accept analytics'])('handles a failed %s write with honest feedback and retry', (label) => {
    const write = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new DOMException('full', 'QuotaExceededError'); });
    view(); fireEvent.click(screen.getByRole('button', { name: label }));
    expect(screen.getByRole('alert').textContent).toContain('Analytics remain off');
    expect(screen.getByRole('link', { name: 'Sign up' })).toBeTruthy();
    expect(localStorage.getItem(COOKIE_CONSENT_KEY)).toBeNull();
    noTracking();
    write.mockRestore();
    fireEvent.click(screen.getByRole('button', { name: label }));
    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.queryByRole('button', { name: label })).toBeNull();
    expect(localStorage.getItem(COOKIE_CONSENT_KEY)).toBe(label === 'Essential only' ? 'essential' : 'all');
    expect(sdk.init).toHaveBeenCalledTimes(label === 'Essential only' ? 0 : 1);
  });
  it('stops delegated CTA capture when persisted consent becomes unavailable', () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'all'); view();
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new DOMException('blocked', 'SecurityError'); });
    fireEvent.click(screen.getByRole('link', { name: 'Sign up' }));
    expect(sdk.capture).not.toHaveBeenCalled();
  });
  it('does not start or capture without a public analytics key', () => {
    vi.stubEnv('NEXT_PUBLIC_POSTHOG_KEY', '');
    localStorage.setItem(COOKIE_CONSENT_KEY, 'all'); view(); noTracking();
  });
});
