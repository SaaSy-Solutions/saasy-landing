import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteNav } from '../components/SiteNav';
import { MarketingFooter } from '../components/MarketingFooter';
import { ogImage } from '../components/ogAssets';
import { revVideoUrl } from '../components/videoAssets';

export const metadata: Metadata = {
  title: 'Integrations | SaaSy',
  description:
    'Connect SaaSy with the tools you already use. Stripe, Slack, Gmail, ' +
    'Microsoft 365, Twilio, Plaid, ADP, Gusto, BambooHR, Rippling, and more.',
  openGraph: {
    siteName: 'SaaSy',
    type: 'website',
    images: [ogImage('integrations')],
  },
  twitter: {
    card: 'summary_large_image',
    images: [ogImage('integrations').url],
  },
};

interface Integration {
  name: string;
  category: string;
  description: string;
  status: 'Available' | 'Coming Soon';
}

const integrations: Integration[] = [
  {
    name: 'Stripe',
    category: 'Revenue & Payments',
    description:
      'See your revenue, subscriptions, and payment status in real-time without logging into Stripe. SaaSy pulls it all in automatically.',
    status: 'Available',
  },
  {
    name: 'Slack',
    category: 'Real-time Alerts',
    description:
      'Get daily business briefings and instant alerts — missed payments, compliance deadlines, key metrics — right in Slack where you already are.',
    status: 'Available',
  },
  {
    name: 'Google Workspace (Gmail)',
    category: 'Email',
    description:
      'Connect your Google account and SaaSy sends and reads email on your behalf — follow-ups, briefings, and customer threads without leaving the app.',
    status: 'Available',
  },
  {
    name: 'Microsoft 365 (Outlook)',
    category: 'Email',
    description:
      'Outlook shop? Connect Microsoft 365 and SaaSy handles email the same way — sending, reading, and keeping customer conversations in view.',
    status: 'Available',
  },
  {
    name: 'Calendar sync',
    category: 'Scheduling',
    description:
      'Google and Outlook calendar events sync straight into your CRM, so meetings show up on the customer record without copy-paste.',
    status: 'Available',
  },
  {
    name: 'Twilio',
    category: 'SMS & Voice',
    description:
      'Reach customers and your crew by text or phone. Outbound SMS and voice alerts, with inbound messages verified before they touch your data.',
    status: 'Available',
  },
  {
    name: 'ADP',
    category: 'Payroll & HRIS',
    description:
      'Sync payroll and employee data from ADP so certified payroll, dues, and labor compliance run on real numbers — not re-keyed spreadsheets.',
    status: 'Available',
  },
  {
    name: 'Gusto',
    category: 'Payroll & HRIS',
    description:
      'Connect Gusto and your payroll data flows into SaaSy automatically, keeping compliance and reporting grounded in what you actually paid.',
    status: 'Available',
  },
  {
    name: 'BambooHR',
    category: 'Payroll & HRIS',
    description:
      'Pull employee and HR data from BambooHR so your people records, onboarding, and compliance tracking stay in step with your HRIS.',
    status: 'Available',
  },
  {
    name: 'Rippling',
    category: 'Payroll & HRIS',
    description:
      'Sync payroll and workforce data from Rippling into SaaSy, so labor costs and compliance reporting reflect the source of truth.',
    status: 'Available',
  },
  {
    name: 'Plaid',
    category: 'Banking',
    description:
      'Link your bank accounts and SaaSy keeps balances and transactions synced daily — real cash-flow visibility without CSV exports.',
    status: 'Available',
  },
  {
    name: 'Webhooks & API',
    category: 'Developer Tools',
    description:
      'Signed inbound and outbound webhooks with retries, plus an open API on Growth plans and above — connect anything we haven’t built yet.',
    status: 'Available',
  },
  {
    name: 'HubSpot',
    category: 'CRM & Contacts',
    description:
      'Keep your customer relationships in one place — contacts, deals, and activity sync automatically so you never lose track of a lead.',
    status: 'Coming Soon',
  },
  {
    name: 'Intercom',
    category: 'Customer Conversations',
    description:
      'Stop switching tabs to check support threads. SaaSy surfaces conversation history and sentiment so you know which customers need attention.',
    status: 'Coming Soon',
  },
  {
    name: 'Salesforce',
    category: 'CRM & Sales Pipeline',
    description:
      'Keep your customer relationships in one place — contacts, deals, and activity sync automatically between SaaSy and Salesforce.',
    status: 'Coming Soon',
  },
  {
    name: 'Jira',
    category: 'Project Tracking',
    description:
      'Connect your dev work to business goals. See project status and blockers without asking your team for updates.',
    status: 'Coming Soon',
  },
];

export default function IntegrationsPage() {
  return (
    <div className="bg-saasy-dark min-h-screen">
      <SiteNav />

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-16">
        {/* Hero */}
        <header className="mb-14 text-center">
          <h1 className=" text-4xl font-bold text-white">
            Connect your favorite tools
          </h1>
          <p className="mt-4  text-saasy-muted text-lg max-w-2xl mx-auto">
            SaaSy integrates with the platforms you already use to give you a
            complete view of your business.
          </p>
        </header>

        {/* "Connected in a minute" loop (video/src/ConnectLoop.tsx) */}
        <div className="relative mb-14 mx-auto max-w-3xl">
          <div
            className="absolute inset-0 -m-3 rounded-2xl
              bg-gradient-to-br from-saasy-pink/5 to-saasy-orange/5 blur-xl"
          />
          <div
            className="glow-border relative overflow-hidden rounded-2xl
              bg-saasy-card/80 p-2 backdrop-blur-sm"
          >
            <video
              className="h-auto w-full rounded-lg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Connect Stripe, HubSpot, Salesforce, and Slack in about a minute"
            >
              <source src={revVideoUrl("connect.mp4")} type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Integration cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="rounded-2xl border border-saasy-border bg-saasy-card/50 p-6 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className=" text-lg font-semibold text-white">
                    {integration.name}
                  </h2>
                  <p className=" text-xs text-saasy-muted mt-0.5">
                    {integration.category}
                  </p>
                </div>
                {integration.status === 'Available' ? (
                  <span className="shrink-0 rounded-full bg-saasy-pink/10 border border-saasy-pink/20 px-3 py-1 text-xs font-medium text-saasy-pink-soft">
                    Available
                  </span>
                ) : (
                  <span className="shrink-0 rounded-full bg-saasy-muted/10 border border-saasy-border px-3 py-1 text-xs font-medium text-saasy-muted">
                    Coming Soon
                  </span>
                )}
              </div>
              <p className=" text-sm text-saasy-muted leading-relaxed">
                {integration.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA section */}
        <div className="mt-16 rounded-2xl border border-saasy-border bg-saasy-card/50 p-10 text-center">
          <h2 className=" text-2xl font-bold text-white">
            Need a custom integration?
          </h2>
          <p className="mt-3  text-saasy-muted max-w-lg mx-auto">
            Our API (Growth plan and above) lets you connect any tool.
          </p>
          <a
            href="https://app.hellosaasy.ai/signup"
            className="mt-6 inline-block rounded-full bg-saasy-rose px-8 py-3  text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Start free trial
          </a>
        </div>

      </div>
      <MarketingFooter />
    </div>
  );
}
