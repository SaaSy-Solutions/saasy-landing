import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | SaaSy",
  description:
    "Privacy Policy for SaaSy, an intelligent business operating system by SaaSy Solutions LLC.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-saasy-dark min-h-screen">
      {/* Nav */}
      <nav className="border-b border-saasy-border/50 bg-saasy-dark/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-[family-name:var(--font-poppins)] text-xl font-bold"
          >
            <span className="gradient-text">SaaSy</span>
          </Link>
          <Link
            href="/"
            className="font-[family-name:var(--font-poppins)] text-sm text-saasy-pink hover:text-saasy-rose underline"
          >
            &larr; Back to home
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <header className="mb-14">
          <h1 className="text-white font-[family-name:var(--font-poppins)] text-3xl font-bold">
            Privacy Policy
          </h1>
          <p className="mt-3 font-[family-name:var(--font-poppins)] text-saasy-muted text-sm">
            Last updated: March 2026
          </p>
        </header>

        <div className="space-y-10">
          {/* 1. Introduction */}
          <section>
            <h2 className="text-white font-[family-name:var(--font-poppins)] text-xl font-semibold mt-10 mb-4">
              1. Introduction
            </h2>
            <p className="text-saasy-muted font-[family-name:var(--font-poppins)] leading-relaxed">
              SaaSy Solutions LLC (&quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;) is committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use SaaSy (&quot;the
              Service&quot;), our intelligent business operating system that
              helps entrepreneurs manage formation, compliance, CRM, finances,
              and operations with intelligent guidance.
            </p>
            <p className="mt-3 text-saasy-muted font-[family-name:var(--font-poppins)] leading-relaxed">
              By using the Service, you consent to the data practices described
              in this policy. If you do not agree with the terms of this
              Privacy Policy, please do not use the Service.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section>
            <h2 className="text-white font-[family-name:var(--font-poppins)] text-xl font-semibold mt-10 mb-4">
              2. Information We Collect
            </h2>
            <p className="text-saasy-muted font-[family-name:var(--font-poppins)] leading-relaxed mb-5">
              We collect the following categories of information:
            </p>
            <div className="space-y-5">
              <div>
                <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-white">
                  Account Information
                </h3>
                <p className="mt-1 text-saasy-muted font-[family-name:var(--font-poppins)] leading-relaxed">
                  When you create an account, we collect your name, email
                  address, company name, and role. This information is
                  necessary to provide the Service and manage your account.
                </p>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-white">
                  Usage Data
                </h3>
                <p className="mt-1 text-saasy-muted font-[family-name:var(--font-poppins)] leading-relaxed">
                  We automatically collect information about how you interact
                  with the Service, including feature usage patterns, login
                  times and frequency, pages visited, actions taken, and
                  browser type and device information.
                </p>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-white">
                  Payment Information
                </h3>
                <p className="mt-1 text-saasy-muted font-[family-name:var(--font-poppins)] leading-relaxed">
                  Payment processing is handled entirely by Stripe. We do not
                  store credit card numbers, CVVs, or other sensitive payment
                  details on our servers. We retain only a reference to your
                  Stripe customer ID, plan type, and billing status.
                </p>
              </div>
            </div>
          </section>

          {/* 3. How We Use Your Data */}
          <section>
            <h2 className="text-white font-[family-name:var(--font-poppins)] text-xl font-semibold mt-10 mb-4">
              3. How We Use Your Data
            </h2>
            <p className="text-saasy-muted font-[family-name:var(--font-poppins)] leading-relaxed mb-3">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-saasy-muted font-[family-name:var(--font-poppins)] leading-relaxed">
              <li>
                <span className="text-white font-medium">
                  Provide and maintain the Service
                </span>{" "}
                &mdash; delivering compliance tracking, CRM, intelligent guidance,
                proactive alerts, and business operations management
              </li>
              <li>
                <span className="text-white font-medium">
                  Send transactional emails
                </span>{" "}
                &mdash; account confirmations, billing receipts, security
                alerts, and service notifications
              </li>
              <li>
                <span className="text-white font-medium">
                  Analyze usage patterns
                </span>{" "}
                &mdash; to improve the Service, identify bugs, and optimize
                performance
              </li>
              <li>
                <span className="text-white font-medium">
                  Prevent fraud and abuse
                </span>{" "}
                &mdash; to protect the security of your account and the
                integrity of the Service
              </li>
            </ul>
            <p className="mt-4 text-saasy-muted font-[family-name:var(--font-poppins)] leading-relaxed">
              We do not sell your personal information to third parties. We do
              not use your Customer Data to train machine learning models for
              purposes outside of providing the Service to you.
            </p>
          </section>

          {/* 4. Storage & Security */}
          <section>
            <h2 className="text-white font-[family-name:var(--font-poppins)] text-xl font-semibold mt-10 mb-4">
              4. Storage &amp; Security
            </h2>
            <p className="text-saasy-muted font-[family-name:var(--font-poppins)] leading-relaxed">
              We take the security of your data seriously and implement
              industry-standard measures to protect it:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-saasy-muted font-[family-name:var(--font-poppins)] leading-relaxed">
              <li>
                <span className="text-white font-medium">
                  Encryption at rest
                </span>{" "}
                &mdash; all data stored in our databases is encrypted using
                AES-256
              </li>
              <li>
                <span className="text-white font-medium">
                  Encryption in transit
                </span>{" "}
                &mdash; all data transmitted between your browser and our
                servers is encrypted using TLS 1.2 or higher
              </li>
              <li>
                <span className="text-white font-medium">
                  Per-tenant isolation
                </span>{" "}
                &mdash; each account&rsquo;s data is logically isolated, enforced
                at the database level so data is never shared across accounts
              </li>
              <li>
                <span className="text-white font-medium">Access controls</span>{" "}
                &mdash; internal access to production systems is restricted to
                authorized personnel with multi-factor authentication
              </li>
            </ul>
          </section>

          {/* 5. Third-Party Processors */}
          <section>
            <h2 className="text-white font-[family-name:var(--font-poppins)] text-xl font-semibold mt-10 mb-4">
              5. Third-Party Processors
            </h2>
            <p className="text-saasy-muted font-[family-name:var(--font-poppins)] leading-relaxed mb-5">
              We use the following third-party service providers to operate the
              Service. Each processor is contractually obligated to protect
              your data:
            </p>
            <div className="rounded-xl border border-saasy-border bg-saasy-card/50 divide-y divide-saasy-border">
              <div className="p-5">
                <p className="font-[family-name:var(--font-poppins)] font-semibold text-white">
                  Stripe
                </p>
                <p className="mt-1 font-[family-name:var(--font-poppins)] text-sm text-saasy-muted">
                  Payment processing
                </p>
              </div>
              <div className="p-5">
                <p className="font-[family-name:var(--font-poppins)] font-semibold text-white">
                  Neon
                </p>
                <p className="mt-1 font-[family-name:var(--font-poppins)] text-sm text-saasy-muted">
                  PostgreSQL database hosting
                </p>
              </div>
              <div className="p-5">
                <p className="font-[family-name:var(--font-poppins)] font-semibold text-white">
                  Fly.io
                </p>
                <p className="mt-1 font-[family-name:var(--font-poppins)] text-sm text-saasy-muted">
                  Application hosting and compute
                </p>
              </div>
              <div className="p-5">
                <p className="font-[family-name:var(--font-poppins)] font-semibold text-white">
                  Vercel
                </p>
                <p className="mt-1 font-[family-name:var(--font-poppins)] text-sm text-saasy-muted">
                  Frontend hosting and CDN
                </p>
              </div>
            </div>
          </section>

          {/* 6. GDPR/CCPA Rights */}
          <section>
            <h2 className="text-white font-[family-name:var(--font-poppins)] text-xl font-semibold mt-10 mb-4">
              6. Your Rights (GDPR &amp; CCPA)
            </h2>
            <p className="text-saasy-muted font-[family-name:var(--font-poppins)] leading-relaxed mb-3">
              Regardless of your location, we extend the following rights to
              all users:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-saasy-muted font-[family-name:var(--font-poppins)] leading-relaxed">
              <li>
                <span className="text-white font-medium">Right to Access</span>{" "}
                &mdash; request a copy of the personal data we hold about you
              </li>
              <li>
                <span className="text-white font-medium">
                  Right to Correction
                </span>{" "}
                &mdash; request that we correct any inaccurate personal data
              </li>
              <li>
                <span className="text-white font-medium">
                  Right to Deletion
                </span>{" "}
                &mdash; request that we delete your personal data, subject to
                legal retention obligations
              </li>
              <li>
                <span className="text-white font-medium">Right to Export</span>{" "}
                &mdash; receive your data in a structured, machine-readable
                format (CSV, JSON)
              </li>
              <li>
                <span className="text-white font-medium">Right to Opt Out</span>{" "}
                &mdash; opt out of non-essential data processing and analytics
                cookies
              </li>
            </ul>
            <p className="mt-4 text-saasy-muted font-[family-name:var(--font-poppins)] leading-relaxed">
              To exercise any of these rights, contact us at{" "}
              <a
                href="mailto:privacy@hellosaasy.ai"
                className="text-saasy-pink hover:text-saasy-rose underline"
              >
                privacy@hellosaasy.ai
              </a>
              . We will respond to your request within 30 days.
            </p>
          </section>

          {/* 7. Cookies */}
          <section>
            <h2 className="text-white font-[family-name:var(--font-poppins)] text-xl font-semibold mt-10 mb-4">
              7. Cookies &amp; Tracking
            </h2>
            <p className="text-saasy-muted font-[family-name:var(--font-poppins)] leading-relaxed">
              We use cookies to provide and secure the Service:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-saasy-muted font-[family-name:var(--font-poppins)] leading-relaxed">
              <li>
                <span className="text-white font-medium">Session cookies</span>{" "}
                &mdash; required for authentication and maintaining your
                logged-in state. These are essential cookies and cannot be
                disabled.
              </li>
              <li>
                <span className="text-white font-medium">
                  Analytics cookies
                </span>{" "}
                &mdash; optional cookies that help us understand how the
                Service is used. You can opt out of analytics cookies at any
                time through your account settings.
              </li>
            </ul>
            <p className="mt-3 text-saasy-muted font-[family-name:var(--font-poppins)] leading-relaxed">
              We do not use third-party advertising cookies or tracking pixels
              for advertising purposes.
            </p>
          </section>

          {/* 8. Data Retention */}
          <section>
            <h2 className="text-white font-[family-name:var(--font-poppins)] text-xl font-semibold mt-10 mb-4">
              8. Data Retention
            </h2>
            <div className="rounded-xl border border-saasy-border bg-saasy-card/50 divide-y divide-saasy-border">
              <div className="p-5">
                <p className="font-[family-name:var(--font-poppins)] font-semibold text-white">
                  Active Accounts
                </p>
                <p className="mt-1 font-[family-name:var(--font-poppins)] text-sm text-saasy-muted">
                  Data is retained for as long as your account remains active
                  and the Service is in use.
                </p>
              </div>
              <div className="p-5">
                <p className="font-[family-name:var(--font-poppins)] font-semibold text-white">
                  Deleted Accounts
                </p>
                <p className="mt-1 font-[family-name:var(--font-poppins)] text-sm text-saasy-muted">
                  All Customer Data is permanently purged within 30 days of
                  account deletion.
                </p>
              </div>
              <div className="p-5">
                <p className="font-[family-name:var(--font-poppins)] font-semibold text-white">
                  Backups
                </p>
                <p className="mt-1 font-[family-name:var(--font-poppins)] text-sm text-saasy-muted">
                  Backup copies containing deleted account data are purged
                  within 90 days of account deletion.
                </p>
              </div>
            </div>
          </section>

          {/* 9. Children's Privacy */}
          <section>
            <h2 className="text-white font-[family-name:var(--font-poppins)] text-xl font-semibold mt-10 mb-4">
              9. Children&apos;s Privacy
            </h2>
            <p className="text-saasy-muted font-[family-name:var(--font-poppins)] leading-relaxed">
              The Service is not directed at children under the age of 13. We
              do not knowingly collect personal information from children under
              13. If you believe a child under 13 has provided us with personal
              information, please contact us at{" "}
              <a
                href="mailto:privacy@hellosaasy.ai"
                className="text-saasy-pink hover:text-saasy-rose underline"
              >
                privacy@hellosaasy.ai
              </a>
              .
            </p>
          </section>

          {/* 10. Changes */}
          <section>
            <h2 className="text-white font-[family-name:var(--font-poppins)] text-xl font-semibold mt-10 mb-4">
              10. Changes to This Policy
            </h2>
            <p className="text-saasy-muted font-[family-name:var(--font-poppins)] leading-relaxed">
              We may update this Privacy Policy from time to time. When we make
              material changes, we will notify you by email at least 30 days
              before the changes take effect. Non-material changes may be made
              without advance notice but will be reflected in an updated
              &quot;Last updated&quot; date on this page.
            </p>
          </section>

          {/* 11. Contact */}
          <section>
            <h2 className="text-white font-[family-name:var(--font-poppins)] text-xl font-semibold mt-10 mb-4">
              11. Contact
            </h2>
            <p className="text-saasy-muted font-[family-name:var(--font-poppins)] leading-relaxed">
              If you have any questions or concerns about this Privacy Policy or
              our data practices, please contact us at:
            </p>
            <p className="mt-3 font-[family-name:var(--font-poppins)]">
              <a
                href="mailto:privacy@hellosaasy.ai"
                className="text-saasy-pink hover:text-saasy-rose underline"
              >
                privacy@hellosaasy.ai
              </a>
            </p>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-16 border-t border-saasy-border pt-8">
          <p className="font-[family-name:var(--font-poppins)] text-sm text-saasy-muted">
            &copy; 2023–2026 SaaSy Solutions LLC. All rights reserved.
          </p>
          <div className="mt-3 flex gap-6">
            <Link
              href="/terms"
              className="font-[family-name:var(--font-poppins)] text-sm text-saasy-pink hover:text-saasy-rose underline"
            >
              Terms of Service
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
