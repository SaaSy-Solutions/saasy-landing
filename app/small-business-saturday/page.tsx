import type { Metadata } from 'next';
import { ogImage } from '../components/ogAssets';
import { SmallBusinessSaturday } from './SmallBusinessSaturday';

const description = 'Join Hello SaaSy November 28–30, 2026: Starter free for the first 90 days; Growth and Scale 50% off for the first 90 days. Monthly billing only.';

export const metadata: Metadata = {
  title: 'Small Business Saturday | Hello SaaSy',
  description,
  alternates: { canonical: 'https://hellosaasy.ai/small-business-saturday' },
  openGraph: {
    title: 'Small Business Saturday | Hello SaaSy',
    description,
    url: 'https://hellosaasy.ai/small-business-saturday',
    siteName: 'Hello SaaSy',
    type: 'website',
    images: [ogImage('pricing')],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Small Business Saturday | Hello SaaSy',
    description,
    images: [ogImage('pricing').url],
  },
};

export default function SmallBusinessSaturdayPage(): React.ReactElement {
  return <SmallBusinessSaturday />;
}
