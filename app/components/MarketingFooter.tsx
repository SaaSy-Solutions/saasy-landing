"use client";

import Link from "next/link";
import { FooterEmailCapture } from "./EmailCapture";

export function MarketingFooter(): React.ReactElement {
  return (
    <footer className="border-t border-saasy-border bg-saasy-darker">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Product column */}
          <div>
            <h4
              className="text-white font-[family-name:var(--font-poppins)]
                text-sm font-semibold mb-4"
            >
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#features"
                  className="text-saasy-muted font-[family-name:var(--font-poppins)]
                    text-sm hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-saasy-muted font-[family-name:var(--font-poppins)]
                    text-sm hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/integrations"
                  className="text-saasy-muted font-[family-name:var(--font-poppins)]
                    text-sm hover:text-white transition-colors"
                >
                  Integrations
                </Link>
              </li>
              <li>
                <Link
                  href="/changelog"
                  className="text-saasy-muted font-[family-name:var(--font-poppins)]
                    text-sm hover:text-white transition-colors"
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4
              className="text-white font-[family-name:var(--font-poppins)]
                text-sm font-semibold mb-4"
            >
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://saasysolutionsllc.com"
                  className="text-saasy-muted font-[family-name:var(--font-poppins)]
                    text-sm hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="https://saasysolutionsllc.com/blog"
                  className="text-saasy-muted font-[family-name:var(--font-poppins)]
                    text-sm hover:text-white transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h4
              className="text-white font-[family-name:var(--font-poppins)]
                text-sm font-semibold mb-4"
            >
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms"
                  className="text-saasy-muted font-[family-name:var(--font-poppins)]
                    text-sm hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-saasy-muted font-[family-name:var(--font-poppins)]
                    text-sm hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Support column */}
          <div>
            <h4
              className="text-white font-[family-name:var(--font-poppins)]
                text-sm font-semibold mb-4"
            >
              Support
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://docs.hellosaasy.ai"
                  className="text-saasy-muted font-[family-name:var(--font-poppins)]
                    text-sm hover:text-white transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@hellosaasy.ai"
                  className="text-saasy-muted font-[family-name:var(--font-poppins)]
                    text-sm hover:text-white transition-colors"
                >
                  support@hellosaasy.ai
                </a>
              </li>
              <li>
                <a
                  href="mailto:sales@hellosaasy.ai"
                  className="text-saasy-muted font-[family-name:var(--font-poppins)]
                    text-sm hover:text-white transition-colors"
                >
                  sales@hellosaasy.ai
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter signup */}
        <FooterEmailCapture />

        {/* Copyright */}
        <div
          className="border-t border-saasy-border mt-10 pt-6
            text-center text-saasy-muted text-sm
            font-[family-name:var(--font-poppins)]"
        >
          &copy; 2023–2026 SaaSy. A product by{" "}
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
