export const OFFER_START = Date.parse('2026-11-28T00:00:00-05:00');
export const OFFER_END = Date.parse('2026-12-01T00:00:00-05:00');

export type CampaignState = 'upcoming' | 'active' | 'ended';
export type CampaignPlan = 'starter' | 'growth' | 'scale';
export type CampaignSource =
  | 'macon-linkedin'
  | 'company-linkedin'
  | 'company-facebook';

export function campaignState(now: number): CampaignState {
  if (now < OFFER_START) return 'upcoming';
  return now < OFFER_END ? 'active' : 'ended';
}

export function campaignSource(value: string | null): CampaignSource | null {
  switch (value) {
    case 'macon-linkedin':
    case 'company-linkedin':
    case 'company-facebook':
      return value;
    default:
      return null;
  }
}

export function campaignSignupUrl(plan: CampaignPlan, source: CampaignSource | null): string {
  const url = new URL('https://app.hellosaasy.ai/signup');
  url.searchParams.set('plan', plan);
  url.searchParams.set('billing', 'monthly');
  if (source) url.searchParams.set('src', source);
  return url.toString();
}
