import type { Metadata } from "next";
import Link from "next/link";
import { SmsConsentForm } from "../components/SmsConsentForm";

export const metadata: Metadata = {
  title: "SMS Consent | SaaSy",
  description:
    "Opt in to receive SMS messages from SaaSy. Review what messages we send, how often, and how to opt out at any time.",
};

export default function SmsConsentPage() {
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
        <header className="mb-12">
          <h1 className="text-white  text-3xl font-bold">
            SMS Consent
          </h1>
          <p className="mt-3  text-saasy-muted text-sm">
            Last updated: June 2026
          </p>
          <p className="mt-5 text-saasy-muted  leading-relaxed">
            SaaSy (operated by SaaSy Solutions LLC) can send you SMS text
            messages to keep your business running smoothly. We only send
            messages to phone numbers that have explicitly opted in. Complete the
            form below to consent. Opting in is optional and is never required to
            create an account or use SaaSy.
          </p>
        </header>

        {/* Opt-in form */}
        <div className="mb-14">
          <SmsConsentForm />
        </div>

        <div className="space-y-10">
          {/* What messages you'll receive */}
          <section>
            <h2 className="text-white  text-xl font-semibold mb-4">
              What messages you&apos;ll receive
            </h2>
            <p className="text-saasy-muted  leading-relaxed mb-3">
              If you opt in, SaaSy may send you SMS messages related to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-saasy-muted  leading-relaxed">
              <li>
                <span className="text-white font-medium">
                  Account notifications
                </span>{" "}
                &mdash; important updates about your account and activity
              </li>
              <li>
                <span className="text-white font-medium">
                  Appointment reminders
                </span>{" "}
                &mdash; reminders for scheduled meetings and bookings
              </li>
              <li>
                <span className="text-white font-medium">Billing updates</span>{" "}
                &mdash; payment receipts, renewals, and billing alerts
              </li>
              <li>
                <span className="text-white font-medium">
                  Customer support communications
                </span>{" "}
                &mdash; responses and follow-ups related to your support
                requests
              </li>
            </ul>
          </section>

          {/* Frequency, rates, opt-out */}
          <section>
            <h2 className="text-white  text-xl font-semibold mb-4">
              Frequency, rates &amp; how to opt out
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-saasy-muted  leading-relaxed">
              <li>
                <span className="text-white font-medium">
                  Message frequency varies
                </span>{" "}
                &mdash; based on your account activity and the notifications you
                enable.
              </li>
              <li>
                <span className="text-white font-medium">
                  Message and data rates may apply
                </span>{" "}
                &mdash; charges depend on your mobile carrier and plan.
              </li>
              <li>
                <span className="text-white font-medium">Opt out anytime</span>{" "}
                &mdash; reply <span className="text-white font-medium">STOP</span>{" "}
                to any message to unsubscribe from SMS messages.
              </li>
              <li>
                <span className="text-white font-medium">Get help</span> &mdash;
                reply <span className="text-white font-medium">HELP</span> for
                assistance, or contact us at{" "}
                <a
                  href="mailto:support@hellosaasy.ai"
                  className="text-saasy-pink-soft hover:text-saasy-rose underline"
                >
                  support@hellosaasy.ai
                </a>
                .
              </li>
              <li>
                <span className="text-white font-medium">
                  Consent is not a condition of purchase
                </span>{" "}
                &mdash; you can use SaaSy without opting in to SMS messages.
              </li>
            </ul>
          </section>

          {/* Privacy */}
          <section>
            <h2 className="text-white  text-xl font-semibold mb-4">
              Your privacy
            </h2>
            <p className="text-saasy-muted  leading-relaxed">
              We do not sell or share your phone number or SMS opt-in
              information with third parties or affiliates for their marketing or
              promotional purposes. Mobile information collected for SMS consent
              is used solely to deliver the messages described above. For full
              details on how we handle your data, see our{" "}
              <Link
                href="/privacy"
                className="text-saasy-pink-soft hover:text-saasy-rose underline"
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/terms"
                className="text-saasy-pink-soft hover:text-saasy-rose underline"
              >
                Terms of Service
              </Link>
              .
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
            <Link
              href="/terms"
              className=" text-sm text-saasy-pink-soft hover:text-saasy-rose underline"
            >
              Terms of Service
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
