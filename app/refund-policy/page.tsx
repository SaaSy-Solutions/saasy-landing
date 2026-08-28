import type { Metadata } from "next";
import Link from "next/link";
import { H, LegalDoc, P } from "../components/LegalDoc";

export const metadata: Metadata = {
  title: "Refund Policy | SaaSy",
  description: "Cancellation and refund terms for SaaSy subscriptions.",
  alternates: { canonical: "https://hellosaasy.ai/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <LegalDoc title="Refund Policy" updated="August 28, 2026">
      <section>
        <P>
          This page restates the cancellation and refund terms from{" "}
          <Link href="/terms" className="text-saasy-pink-soft underline">
            Terms of Service §6
          </Link>
          . If the two ever differ, the Terms control.
        </P>
      </section>
      <section>
        <H>Cancel anytime</H>
        <P>
          Cancel from account settings. The workspace stays active through the
          end of the current billing period. We do not charge the next cycle.
        </P>
      </section>
      <section>
        <H>No prorated refunds</H>
        <P>
          We do not refund unused time inside a paid period. If an outage or
          defect made the Service unusable, email{" "}
          <a
            href="mailto:support@hellosaasy.ai"
            className="text-saasy-pink-soft underline"
          >
            support@hellosaasy.ai
          </a>{" "}
          and we will review a goodwill credit or refund.
        </P>
      </section>
      <section>
        <H>Trials and data</H>
        <P>
          A trial that ends without a successful charge does not create a
          refund. After cancellation we keep Customer Data restorable for 30
          days, then delete it.
        </P>
      </section>
    </LegalDoc>
  );
}
