import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | SaaSy",
  description:
    "Terms of Service for SaaSy, an intelligent business operating system by SaaSy Solutions LLC.",
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-saasy-dark min-h-screen">
      {/* Nav */}
      <nav className="border-b border-saasy-border/50 bg-saasy-dark/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className=" text-xl font-bold"
          >
            <span className="accent-word">SaaSy</span>
          </Link>
          <Link
            href="/"
            className=" text-sm text-saasy-pink-soft hover:text-saasy-rose underline"
          >
            &larr; Back to home
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <header className="mb-14">
          <h1 className="text-white  text-3xl font-bold">
            Terms of Service
          </h1>
          <p className="mt-3  text-saasy-muted text-sm">
            Last updated: March 2026
          </p>
        </header>

        <div className="space-y-10">
          {/* 1. Agreement */}
          <section>
            <h2 className="text-white  text-xl font-semibold mt-10 mb-4">
              1. Agreement to Terms
            </h2>
            <p className="text-saasy-muted  leading-relaxed">
              By accessing or using SaaSy (&quot;the Service&quot;), you agree
              to be bound by these Terms of Service (&quot;Terms&quot;). If you
              do not agree to these Terms, you may not access or use the
              Service. These Terms constitute a legally binding agreement
              between you and SaaSy Solutions LLC (&quot;we,&quot;
              &quot;us,&quot; or &quot;our&quot;).
            </p>
            <p className="mt-3 text-saasy-muted  leading-relaxed">
              We reserve the right to update these Terms at any time. We will
              notify you of material changes by email at least 30 days in
              advance. Your continued use of the Service after such changes
              constitutes acceptance of the updated Terms.
            </p>
          </section>

          {/* 2. Service Description */}
          <section>
            <h2 className="text-white  text-xl font-semibold mt-10 mb-4">
              2. Service Description
            </h2>
            <p className="text-saasy-muted  leading-relaxed">
              SaaSy is an intelligent business operating system operated by
              SaaSy Solutions LLC that helps entrepreneurs manage formation,
              compliance, CRM, finances, and operations with intelligent
              guidance. The Service provides tools for compliance tracking,
              CRM and contact management, AI-driven business guidance,
              proactive alerts, multi-business support, and document
              management.
            </p>
            <p className="mt-3 text-saasy-muted  leading-relaxed">
              The Service is provided as a cloud-based software-as-a-service
              (SaaS) application accessible via web browser at{" "}
              <a
                href="https://app.hellosaasy.ai"
                className="text-saasy-pink-soft hover:text-saasy-rose underline"
              >
                app.hellosaasy.ai
              </a>
              .
            </p>
          </section>

          {/* 3. Free Trial */}
          <section>
            <h2 className="text-white  text-xl font-semibold mt-10 mb-4">
              3. Free Trial
            </h2>
            <p className="text-saasy-muted  leading-relaxed">
              SaaSy offers a 14-day free trial of the Service. No credit card
              is required to start a trial. During the trial period, you will
              have access to the features included in your selected plan tier.
            </p>
            <p className="mt-3 text-saasy-muted  leading-relaxed">
              At the end of the 14-day trial period, your account will convert
              to a paid subscription on the plan you selected. If you do not
              wish to continue, you must cancel before the trial period ends.
              Trial accounts that are not converted to paid subscriptions will
              be suspended, and data will be retained for 30 days before
              deletion.
            </p>
          </section>

          {/* 4. Subscription Plans & Pricing */}
          <section>
            <h2 className="text-white  text-xl font-semibold mt-10 mb-4">
              4. Subscription Plans &amp; Pricing
            </h2>
            <p className="text-saasy-muted  leading-relaxed mb-5">
              SaaSy offers three subscription plans, billed monthly:
            </p>
            <div className="rounded-xl border border-saasy-border bg-saasy-card/50 divide-y divide-saasy-border">
              <div className="p-5">
                <p className=" font-semibold text-white">
                  Starter &mdash; $49/month
                </p>
                <p className="mt-1  text-sm text-saasy-muted">
                  1 business, compliance tracker, CRM (50 contacts), daily
                  briefing, email alerts
                </p>
              </div>
              <div className="p-5">
                <p className=" font-semibold text-white">
                  Growth &mdash; $149/month
                </p>
                <p className="mt-1  text-sm text-saasy-muted">
                  Up to 5 businesses, all modules, smart guidance, Slack alerts,
                  API access
                </p>
              </div>
              <div className="p-5">
                <p className=" font-semibold text-white">
                  Scale &mdash; $399/month
                </p>
                <p className="mt-1  text-sm text-saasy-muted">
                  Unlimited businesses, advanced analytics, priority
                  support, custom automations, dedicated onboarding
                </p>
              </div>
            </div>
            <p className="mt-4 text-saasy-muted  leading-relaxed">
              Plan features and limits are subject to change. We will provide
              at least 30 days advance notice of any pricing changes.
            </p>
          </section>

          {/* 5. Billing & Payment */}
          <section>
            <h2 className="text-white  text-xl font-semibold mt-10 mb-4">
              5. Billing &amp; Payment
            </h2>
            <p className="text-saasy-muted  leading-relaxed">
              All payments are processed securely through Stripe. Subscriptions
              are billed on a monthly cycle beginning on the date you
              subscribe. You authorize us to charge your payment method on file
              for all applicable fees.
            </p>
            <p className="mt-3 text-saasy-muted  leading-relaxed">
              If a payment fails, we will attempt to process it again over the
              following 7 days. If payment remains unsuccessful, your account
              may be suspended until the outstanding balance is resolved.
            </p>
            <p className="mt-3 text-saasy-muted  leading-relaxed">
              Prices are quoted in US Dollars (USD) and may be subject to
              applicable taxes depending on your jurisdiction.
            </p>
          </section>

          {/* 6. Cancellation & Refunds */}
          <section>
            <h2 className="text-white  text-xl font-semibold mt-10 mb-4">
              6. Cancellation &amp; Refunds
            </h2>
            <p className="text-saasy-muted  leading-relaxed">
              You may cancel your subscription at any time from your account
              settings. Upon cancellation, your service will remain active
              until the end of the current billing period. You will not be
              charged for subsequent billing periods.
            </p>
            <p className="mt-3 text-saasy-muted  leading-relaxed">
              We do not offer partial refunds for unused time within a billing
              period. If you believe you are entitled to a refund due to
              service issues, please contact our support team.
            </p>
          </section>

          {/* 7. Data Ownership */}
          <section>
            <h2 className="text-white  text-xl font-semibold mt-10 mb-4">
              7. Data Ownership &amp; Portability
            </h2>
            <p className="text-saasy-muted  leading-relaxed">
              You retain full ownership of all data you submit to the Service
              (&quot;Customer Data&quot;). We do not claim any intellectual
              property rights over your Customer Data.
            </p>
            <p className="mt-3 text-saasy-muted  leading-relaxed">
              You may export your Customer Data at any time using the built-in
              export functionality available in your account settings. Exported
              data will be provided in standard, machine-readable formats (CSV,
              JSON).
            </p>
            <p className="mt-3 text-saasy-muted  leading-relaxed">
              Upon account deletion, we will retain your Customer Data for 30
              days to allow for recovery if needed. After 30 days, all Customer
              Data will be permanently and irreversibly deleted from our
              systems, including backups within 90 days.
            </p>
          </section>

          {/* 8. Acceptable Use */}
          <section>
            <h2 className="text-white  text-xl font-semibold mt-10 mb-4">
              8. Acceptable Use
            </h2>
            <p className="text-saasy-muted  leading-relaxed mb-3">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-saasy-muted  leading-relaxed">
              <li>
                Engage in any activity that violates applicable laws or
                regulations
              </li>
              <li>Abuse, harass, or harm other users or third parties</li>
              <li>
                Reverse engineer, decompile, or disassemble any part of the
                Service
              </li>
              <li>
                Use automated tools, bots, or scrapers to access the Service
                outside of our published APIs
              </li>
              <li>
                Attempt to gain unauthorized access to other accounts, systems,
                or networks connected to the Service
              </li>
              <li>Transmit viruses, malware, or other harmful code</li>
              <li>
                Interfere with or disrupt the integrity or performance of the
                Service
              </li>
            </ul>
            <p className="mt-3 text-saasy-muted  leading-relaxed">
              Violation of these terms may result in immediate suspension or
              termination of your account.
            </p>
          </section>

          {/* 9. Intellectual Property */}
          <section>
            <h2 className="text-white  text-xl font-semibold mt-10 mb-4">
              9. Intellectual Property
            </h2>
            <p className="text-saasy-muted  leading-relaxed">
              The SaaSy platform, including all software, algorithms, user
              interfaces, documentation, branding, and related intellectual
              property, is and remains the exclusive property of SaaSy
              Solutions LLC. These Terms do not grant you any rights to our
              intellectual property except for the limited right to use the
              Service as described herein.
            </p>
            <p className="mt-3 text-saasy-muted  leading-relaxed">
              You may not copy, modify, distribute, or create derivative works
              based on the Service without our prior written consent.
            </p>
          </section>

          {/* 10. Limitation of Liability */}
          <section>
            <h2 className="text-white  text-xl font-semibold mt-10 mb-4">
              10. Limitation of Liability
            </h2>
            <p className="text-saasy-muted  leading-relaxed">
              To the maximum extent permitted by applicable law, SaaSy
              Solutions LLC shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, including but not
              limited to loss of profits, data, or business opportunities,
              arising out of or in connection with your use of the Service.
            </p>
            <p className="mt-3 text-saasy-muted  leading-relaxed">
              Our total aggregate liability for any claims arising from or
              related to these Terms or the Service shall not exceed the total
              amount you paid to us during the twelve (12) months immediately
              preceding the event giving rise to the claim.
            </p>
            <p className="mt-3 text-saasy-muted  leading-relaxed">
              The Service is provided &quot;as is&quot; and &quot;as
              available&quot; without warranties of any kind, whether express
              or implied, including but not limited to implied warranties of
              merchantability, fitness for a particular purpose, and
              non-infringement.
            </p>
          </section>

          {/* 11. Termination */}
          <section>
            <h2 className="text-white  text-xl font-semibold mt-10 mb-4">
              11. Termination
            </h2>
            <p className="text-saasy-muted  leading-relaxed">
              We may terminate or suspend your account and access to the
              Service immediately, without prior notice or liability, for any
              reason, including if you breach these Terms.
            </p>
            <p className="mt-3 text-saasy-muted  leading-relaxed">
              Upon termination, your right to use the Service will immediately
              cease. All provisions of these Terms that by their nature should
              survive termination shall survive, including ownership provisions,
              warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </section>

          {/* 12. Governing Law */}
          <section>
            <h2 className="text-white  text-xl font-semibold mt-10 mb-4">
              12. Governing Law
            </h2>
            <p className="text-saasy-muted  leading-relaxed">
              These Terms shall be governed by and construed in accordance with
              the laws of the State of Delaware, United States, without regard
              to its conflict of law provisions. Any disputes arising from
              these Terms or the Service shall be resolved in the state or
              federal courts located in Delaware.
            </p>
          </section>

          {/* 13. Contact */}
          <section>
            <h2 className="text-white  text-xl font-semibold mt-10 mb-4">
              13. Contact
            </h2>
            <p className="text-saasy-muted  leading-relaxed">
              If you have any questions about these Terms of Service, please
              contact us at:
            </p>
            <p className="mt-3 ">
              <a
                href="mailto:support@hellosaasy.ai"
                className="text-saasy-pink-soft hover:text-saasy-rose underline"
              >
                support@hellosaasy.ai
              </a>
            </p>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-16 border-t border-saasy-border pt-8">
          <p className=" text-sm text-saasy-muted">
            &copy; 2023–2026 SaaSy Solutions LLC. All rights reserved.
          </p>
          <div className="mt-3 flex gap-6">
            <Link
              href="/privacy"
              className=" text-sm text-saasy-pink-soft hover:text-saasy-rose underline"
            >
              Privacy Policy
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
