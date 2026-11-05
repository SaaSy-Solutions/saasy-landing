'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SiteNav } from '../components/SiteNav';
import { MarketingFooter } from '../components/MarketingFooter';
import {
  campaignSignupUrl,
  campaignSource,
  campaignState,
  type CampaignPlan,
  type CampaignSource,
  type CampaignState,
} from '../../lib/small-business-saturday';

const plans: {
  id: CampaignPlan;
  name: string;
  offer: string;
  promotionalPrice: string;
  regularPrice: string;
  includes: string;
}[] = [
  { id: 'starter', name: 'Starter', offer: 'Free for the first 90 days', promotionalPrice: '$0', regularPrice: '$49', includes: '1 business · 3 team seats · CRM & compliance' },
  { id: 'growth', name: 'Growth', offer: '50% off for the first 90 days', promotionalPrice: '$99.50', regularPrice: '$199', includes: 'Up to 5 businesses · 10 team seats · Ask SaaSy' },
  { id: 'scale', name: 'Scale', offer: '50% off for the first 90 days', promotionalPrice: '$199.50', regularPrice: '$399', includes: 'Unlimited businesses & seats · Dedicated onboarding' },
];

export function SmallBusinessSaturday(): React.ReactElement {
  const [state, setState] = useState<CampaignState | 'checking'>('checking');
  const [source, setSource] = useState<CampaignSource | null>(null);

  useEffect(() => {
    setSource(campaignSource(new URLSearchParams(window.location.search).get('src')));
    const update = () => setState(campaignState(Date.now()));
    update();
    const timer = window.setInterval(update, 1_000);
    return () => window.clearInterval(timer);
  }, []);

  const ended = state === 'ended';

  return (
    <div className="min-h-screen bg-saasy-dark">
      <SiteNav signupHref="#campaign-plans" signupLabel="Choose a plan" />
      <main className="pt-32 sm:pt-40">
        <section className="mx-auto max-w-6xl px-6 pb-12 sm:pb-16" aria-labelledby="campaign-title">
          <h1 id="campaign-title" className="max-w-4xl text-4xl font-bold leading-tight text-white sm:text-6xl">
            Small Business Saturday.<br />
            <span className="text-saasy-pink-soft">A little more runway.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-saasy-text">
            You run the business. Let Hello SaaSy handle more of the back office:
            CRM, compliance, projects, and billing in one place.
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-saasy-muted">
            New signups from <strong className="font-semibold text-white">Saturday November 28 through Monday November 30, 2026</strong> qualify
            automatically. No code needed. Monthly billing only.
          </p>
          <div className="mt-8 max-w-3xl rounded-xl border border-saasy-border bg-saasy-card px-6 py-5" aria-live="polite" role="status">
            {state === 'upcoming' ? (
              <>
                <p className="font-semibold text-white">The offer opens Saturday, November 28.</p>
                <p className="mt-2 text-sm leading-relaxed text-saasy-text">Come back during the signup window to qualify. Signing up now starts the regular 14-day trial and does not qualify for this offer.</p>
              </>
            ) : ended ? (
              <>
                <p className="font-semibold text-white">This offer ended Monday, November 30.</p>
                <p className="mt-2 text-sm leading-relaxed text-saasy-text">New signups now receive the regular 14-day trial. If you signed up during the offer window, your original 90-day offer still applies until its end date.</p>
              </>
            ) : state === 'active' ? (
              <>
                <p className="font-semibold text-white">The offer is open. Choose your plan below.</p>
                <p className="mt-2 text-sm leading-relaxed text-saasy-text">Create your account before midnight Eastern on Monday, November 30. Your eligibility is saved at signup, even if you choose your subscription later.</p>
              </>
            ) : (
              <p className="text-sm leading-relaxed text-saasy-text">Offer window: November 28 at 12:00 a.m. through November 30 at 11:59 p.m. Eastern. Only accounts created within that window qualify.</p>
            )}
          </div>
        </section>

        <section id="campaign-plans" aria-labelledby="plans-title" className="scroll-mt-24 border-y border-saasy-border bg-saasy-darker py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 id="plans-title" className="text-3xl font-bold text-white">{ended ? 'Find your plan' : 'A perk for every size of team'}</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-saasy-muted">
              {ended ? 'The campaign has closed. Regular monthly pricing is shown below.' : 'Start small or bring the whole team. Your first 90 days begin the day you sign up.'}
            </p>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {plans.map((plan) => (
                <article key={plan.id} className="flex flex-col rounded-2xl border border-saasy-border bg-saasy-dark p-6 sm:p-8">
                  <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
                  <p className="mt-3 min-h-12 text-base font-medium text-saasy-pink-soft">{ended ? 'Monthly subscription' : plan.offer}</p>
                  <p className="mt-5 text-white"><span className="text-4xl font-bold tabular-nums">{ended ? plan.regularPrice : plan.promotionalPrice}</span><span className="text-saasy-muted">{!ended && plan.id === 'starter' ? ' for 90 days' : '/mo'}</span></p>
                  <p className="mt-3 text-sm leading-relaxed text-saasy-text">{ended ? 'After your 14-day trial.' : <>Then {plan.regularPrice}/mo after day 90.</>}</p>
                  <p className="mt-6 flex-1 text-sm leading-relaxed text-saasy-muted">{plan.includes}</p>
                  <a
                    href={campaignSignupUrl(plan.id, source)}
                    data-cta="small_business_saturday"
                    className="mt-8 block rounded-full bg-saasy-rose px-5 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-saasy-rose-bright focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-saasy-pink-soft"
                  >
                    {state === 'active' ? `Choose ${plan.name}` : `Start ${plan.name} trial`}
                  </a>
                </article>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-saasy-muted">All prices in USD, plus applicable tax. <Link href="/pricing" className="text-saasy-text underline underline-offset-4 hover:text-white">Compare all plan features</Link>.</p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20" aria-labelledby="terms-title">
          <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <h2 id="terms-title" className="text-3xl font-bold text-white">The dates.<br />The details.</h2>
            <dl className="max-w-2xl space-y-7 text-base leading-relaxed">
              <div><dt className="font-semibold text-white">90 days means 90 days</dt><dd className="mt-2 text-saasy-muted">Your offer starts when you create your account and ends exactly 90 days later. The normal 14-day Growth trial is included inside those 90 days, not added on. Starter access continues for the full 90 days.</dd></div>
              <div><dt className="font-semibold text-white">Automatic, wherever you find us</dt><dd className="mt-2 text-saasy-muted">Every qualifying new signup in the window receives the offer, whether you arrive here, on our homepage, or directly in the app. No code or special link is required. Choosing a plan later does not restart the 90-day clock.</dd></div>
              <div><dt className="font-semibold text-white">Monthly billing and renewal</dt><dd className="mt-2 text-saasy-muted">The offer applies to Starter, Growth, or Scale monthly subscriptions. Annual subscriptions and paid add-ons are excluded. After the included trial, Growth and Scale receive 50% off the remaining promotional period. At your 90-day end date, the discount ends and regular monthly pricing applies, with proration for any partial billing period. Cancel in Settings → Billing before renewal to avoid future charges.</dd></div>
            </dl>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
