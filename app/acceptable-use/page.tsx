import type { Metadata } from "next";
import Link from "next/link";
import { H, LegalDoc, P } from "../components/LegalDoc";

export const metadata: Metadata = {
  title: "Acceptable Use Policy | SaaSy",
  description: "What you may not do with SaaSy.",
  alternates: { canonical: "https://hellosaasy.ai/acceptable-use" },
};

export default function AcceptableUsePage() {
  return (
    <LegalDoc title="Acceptable Use Policy" updated="August 28, 2026">
      <section>
        <P>
          This page restates{" "}
          <Link href="/terms" className="text-saasy-pink-soft underline">
            Terms of Service §8
          </Link>
          . If the two ever differ, the Terms control.
        </P>
      </section>
      <section>
        <H>You agree not to</H>
        <ul className="list-disc pl-6 space-y-2 text-saasy-muted leading-relaxed">
          <li>Break the law or store content you do not have rights to</li>
          <li>Abuse, harass, or harm other users or third parties</li>
          <li>Reverse engineer, decompile, or disassemble the Service</li>
          <li>
            Use bots or scrapers outside the published APIs
          </li>
          <li>
            Attempt unauthorized access to other accounts or connected systems
          </li>
          <li>Transmit malware or interfere with Service integrity</li>
          <li>Submit protected health information. We do not process PHI.</li>
        </ul>
      </section>
      <section>
        <P>
          We may suspend or terminate a workspace that violates this policy.
        </P>
      </section>
    </LegalDoc>
  );
}
