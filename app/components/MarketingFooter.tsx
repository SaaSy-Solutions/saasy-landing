"use client";

import Link from "next/link";
import { FooterEmailCapture } from "./EmailCapture";
import {
  IconFacebook,
  IconGitHub,
  IconLinkedIn,
  IconX,
} from "./Icons";

interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

const COLUMNS: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { href: "/features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
      { href: "/compare", label: "Compare" },
      { href: "/unions", label: "For unions" },
      { href: "/integrations", label: "Integrations" },
      { href: "/download", label: "Desktop app" },
      { href: "/changelog", label: "Changelog" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/customers", label: "Customers" },
      { href: "/services", label: "Services" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
      {
        href: "https://saasysolutionsllc.com",
        label: "About",
        external: true,
      },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/dpa", label: "DPA" },
      { href: "/subprocessors", label: "Subprocessors" },
      { href: "/refund-policy", label: "Refunds" },
      { href: "/acceptable-use", label: "Acceptable Use" },
      { href: "/cookies", label: "Cookies" },
      { href: "/sms-consent", label: "SMS Terms" },
    ],
  },
  {
    heading: "Support",
    links: [
      {
        href: "https://status.hellosaasy.ai",
        label: "Service status",
        external: true,
      },
      {
        href: "https://docs.hellosaasy.ai",
        label: "Documentation",
        external: true,
      },
      {
        href: "mailto:support@hellosaasy.ai",
        label: "support@hellosaasy.ai",
        external: true,
      },
      {
        href: "mailto:sales@hellosaasy.ai",
        label: "sales@hellosaasy.ai",
        external: true,
      },
    ],
  },
];

const LINK_CLASSES =
  "text-saasy-muted text-sm hover:text-white transition-colors";

interface SocialLink {
  href: string;
  label: string;
  icon: () => React.ReactElement;
}

const SOCIALS: SocialLink[] = [
  {
    href: "https://linkedin.com/company/saasysolutions",
    label: "SaaSy on LinkedIn",
    icon: IconLinkedIn,
  },
  {
    href: "https://x.com/saasysolutions",
    label: "SaaSy on X",
    icon: IconX,
  },
  {
    href: "https://github.com/saasy-solutions",
    label: "SaaSy on GitHub",
    icon: IconGitHub,
  },
  {
    href: "https://facebook.com/saasysolutionsllc",
    label: "SaaSy Solutions on Facebook",
    icon: IconFacebook,
  },
];

export function MarketingFooter(): React.ReactElement {
  return (
    <footer className="border-t border-saasy-border bg-saasy-darker">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <h3 className="text-white text-sm font-semibold mb-4">
                {column.heading}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a href={link.href} className={LINK_CLASSES}>
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className={LINK_CLASSES}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter signup */}
        <FooterEmailCapture />

        {/* Social + copyright */}
        <div className="border-t border-saasy-border mt-10 pt-6">
          <ul
            className="flex items-center justify-center gap-6"
            aria-label="SaaSy social profiles"
          >
            {SOCIALS.map((social) => {
              const SocialIcon = social.icon;
              return (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener"
                    aria-label={social.label}
                    className="inline-flex h-9 w-9 items-center
                      justify-center text-saasy-muted
                      transition-colors hover:text-white"
                  >
                    <SocialIcon />
                  </a>
                </li>
              );
            })}
          </ul>
          <p
            className="mt-4 text-center text-saasy-muted text-sm
              [&>*]:mx-auto"
          >
            &copy; 2023&ndash;2026 SaaSy. A product by{" "}
            <a
              href="https://saasysolutionsllc.com"
              className="hover:text-white transition-colors"
            >
              SaaSy Solutions LLC
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
