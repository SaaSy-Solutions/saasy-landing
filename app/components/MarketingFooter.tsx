"use client";

import Link from "next/link";
import { FooterEmailCapture } from "./EmailCapture";

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
      { href: "/sms-consent", label: "SMS Terms" },
    ],
  },
  {
    heading: "Support",
    links: [
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

        {/* Copyright */}
        <div
          className="border-t border-saasy-border mt-10 pt-6
            text-center text-saasy-muted text-sm [&>*]:mx-auto"
        >
          &copy; 2023&ndash;2026 SaaSy. A product by{" "}
          <a
            href="https://saasysolutionsllc.com"
            className="hover:text-white transition-colors"
          >
            SaaSy Solutions LLC
          </a>
        </div>
      </div>
    </footer>
  );
}
