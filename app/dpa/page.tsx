import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "../components/PrintButton";
import { H, LegalDoc, P } from "../components/LegalDoc";

export const metadata: Metadata = {
  title: "Data Processing Addendum | SaaSy",
  description:
    "Data Processing Addendum for SaaSy Solutions LLC customers.",
  alternates: { canonical: "https://hellosaasy.ai/dpa" },
};

export default function DpaPage() {
  return (
    <LegalDoc title="Data Processing Addendum" updated="August 28, 2026">
      <section>
        <P>
          This Data Processing Addendum (&quot;DPA&quot;) is part of the{" "}
          <Link href="/terms" className="text-saasy-pink-soft underline">
            Terms of Service
          </Link>{" "}
          between SaaSy Solutions LLC (&quot;Processor&quot;) and the customer
          that accepts those Terms (&quot;Controller&quot;). It applies when
          Processor handles personal data on Controller&apos;s behalf to provide
          the Service.
        </P>
        <p className="mt-4">
          <PrintButton />
        </p>
      </section>
      <section>
        <H>1. Roles and scope</H>
        <P>
          Controller determines the purposes of processing. Processor processes
          personal data only on documented instructions from Controller, which
          include the Terms, this DPA, and configuration the Controller sets in
          the Service. Processor does not process protected health information
          and the Service is not HIPAA-ready.
        </P>
      </section>
      <section>
        <H>2. Categories of data</H>
        <P>
          Account identifiers, workspace membership, CRM and operational records
          the Controller stores, billing metadata, support communications, and
          (only if the Controller connects a bank) account-holder identity,
          balances, and transaction history obtained through Plaid. Processor
          does not receive raw bank credentials. Those stay in Plaid Link.
        </P>
      </section>
      <section>
        <H>3. Subprocessors</H>
        <P>
          Controller authorizes the processors listed at{" "}
          <Link href="/subprocessors" className="text-saasy-pink-soft underline">
            hellosaasy.ai/subprocessors
          </Link>
          . Processor remains responsible for their performance. Processor will
          give 30 days&apos; notice before adding a subprocessor that receives
          Customer Data, except for emergency security replacements.
        </P>
      </section>
      <section>
        <H>4. Security</H>
        <P>
          Processor uses TLS in transit, access control with MFA for production
          consoles, tenant isolation on queries, and encryption at rest for
          designated secret and bank-transaction fields. A personal-data breach
          that is likely to affect Controller will be notified without undue
          delay and, where feasible, within 72 hours of confirmation.
        </P>
      </section>
      <section>
        <H>5. Assistance, deletion, and audit</H>
        <P>
          Processor will assist Controller with data-subject requests that
          cannot be completed in-product. After a workspace is cancelled,
          Customer Data remains restorable for 30 days, then is deleted or
          anonymized, with backups rolling off within 90 days. Controller may
          request a written security summary once per 12 months.
        </P>
      </section>
      <section>
        <H>6. Transfers and term</H>
        <P>
          Processing occurs in the United States. Where a restricted transfer
          requires one, the parties rely on the EU Standard Contractual Clauses
          (module 2) and the UK Addendum, populated with the details in this
          DPA and the subprocessor list. This DPA lasts for the term of the
          Terms and survives until Processor has deleted the Customer Data it
          holds.
        </P>
      </section>
      <section>
        <P>
          Need a countersigned copy? Email{" "}
          <a
            href="mailto:legal@hellosaasy.ai"
            className="text-saasy-pink-soft underline"
          >
            legal@hellosaasy.ai
          </a>{" "}
          from the workspace owner address. Print this page to produce the PDF.
        </P>
      </section>
    </LegalDoc>
  );
}
