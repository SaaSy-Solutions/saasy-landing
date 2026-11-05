import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  OFFER_END,
  OFFER_START,
  campaignSignupUrl,
  campaignSource,
  campaignState,
} from '../../lib/small-business-saturday';
import { SmallBusinessSaturday } from '../../app/small-business-saturday/SmallBusinessSaturday';

vi.mock('../../app/components/SiteNav', () => ({ SiteNav: () => null }));
vi.mock('../../app/components/MarketingFooter', () => ({ MarketingFooter: () => null }));
vi.mock('next/link', () => ({ default: 'a' }));

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  window.history.replaceState({}, '', '/');
});

describe('Small Business Saturday signup window', () => {
  it('opens and closes at Eastern midnight, with an exclusive December 1 end', () => {
    expect(campaignState(OFFER_START - 1)).toBe('upcoming');
    expect(campaignState(OFFER_START)).toBe('active');
    expect(campaignState(OFFER_END - 1)).toBe('active');
    expect(campaignState(OFFER_END)).toBe('ended');
    expect(campaignState(Date.parse('2026-11-28T04:59:59Z'))).toBe('upcoming');
    expect(campaignState(Date.parse('2026-12-01T04:59:59Z'))).toBe('active');
  });

  it.each(['macon-linkedin', 'company-linkedin', 'company-facebook'])('preserves %s in selected monthly plan links', (source) => {
    for (const plan of ['starter', 'growth', 'scale'] satisfies ('starter' | 'growth' | 'scale')[]) {
      const url = new URL(campaignSignupUrl(plan, campaignSource(source)));
      expect(url.origin + url.pathname).toBe('https://app.hellosaasy.ai/signup');
      expect(url.searchParams.get('plan')).toBe(plan);
      expect(url.searchParams.get('billing')).toBe('monthly');
      expect(url.searchParams.get('src')).toBe(source);
    }
  });

  it('drops unknown attribution without making source a requirement', () => {
    expect(campaignSource('anything-else')).toBeNull();
    expect(campaignSource('MACON-LINKEDIN')).toBeNull();
    expect(new URL(campaignSignupUrl('starter', null)).searchParams.has('src')).toBe(false);
  });

  it('warns Friday visitors before the first signup link', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-11-27T18:00:00-05:00'));
    render(<SmallBusinessSaturday />);
    const warning = screen.getByText(/Signing up now starts the regular 14-day trial/);
    const signup = screen.getByRole('link', { name: 'Start Starter trial' });
    expect(warning.compareDocumentPosition(signup) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByRole('status').textContent).toContain('opens Saturday');
  });

  it('shows all offers and carries source to the chosen plan during the window', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-11-29T12:00:00-05:00'));
    window.history.replaceState({}, '', '/small-business-saturday?src=company-facebook');
    render(<SmallBusinessSaturday />);
    expect(screen.getByRole('status').textContent).toContain('offer is open');
    expect(screen.getByRole('link', { name: 'Choose Growth' }).getAttribute('href')).toBe(
      'https://app.hellosaasy.ai/signup?plan=growth&billing=monthly&src=company-facebook',
    );
    expect(screen.getByText('Free for the first 90 days')).toBeTruthy();
    expect(screen.getAllByText('50% off for the first 90 days')).toHaveLength(2);
    expect(screen.getByText('$99.50')).toBeTruthy();
    expect(screen.getByText('$199.50')).toBeTruthy();
  });

  it('removes promotional prices and claims after the window', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(OFFER_END));
    render(<SmallBusinessSaturday />);
    expect(screen.getByRole('status').textContent).toContain('offer ended');
    expect(screen.queryByText('Free for the first 90 days')).toBeNull();
    expect(screen.queryByText('$99.50')).toBeNull();
    expect(screen.getByRole('link', { name: 'Start Growth trial' })).toBeTruthy();
  });
});
