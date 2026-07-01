"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  href: string;
  label: string;
}

/**
 * Five top-level destinations — deliberately at the working-memory
 * limit. Services and Integrations live in the footer; Compare is
 * linked from Pricing.
 */
const NAV_LINKS: NavLink[] = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/customers", label: "Customers" },
  { href: "/blog", label: "Blog" },
  { href: "https://docs.hellosaasy.ai", label: "Docs" },
];

/** Unified site navigation for all pages. */
export function SiteNav(): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const close = (): void => setOpen(false);

  /**
   * Resolve nav href based on current page.
   * On homepage, anchor links use #fragment directly.
   * On subpages, they use /#fragment.
   */
  const resolveHref = (href: string): string => {
    if (pathname === "/" && href.startsWith("/#")) {
      return href.replace("/", "");
    }
    return href;
  };

  /** Check if a nav link is active. */
  const isActive = (href: string): boolean => {
    // Anchor links (/#features, /#pricing) are section jumps, not pages —
    // never highlight them as "active"
    if (href.startsWith("/#")) {
      return false;
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <nav
        className="fixed top-0 right-0 left-0 z-50
          border-b border-saasy-border/50 bg-saasy-dark/80
          backdrop-blur-lg"
      >
        <div
          className="mx-auto flex max-w-6xl items-center
            justify-between px-6 py-4"
        >
          <Link
            href="/"
            className="flex items-center gap-2
              text-xl font-bold text-white"
          >
            <img src="/logomark.svg" alt="" className="h-7 w-7" />
            <span>SaaSy</span>
          </Link>

          {/* Desktop links */}
          <div className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={resolveHref(link.href)}
                className={`hidden text-sm transition-colors
                  hover:text-white md:block ${
                    isActive(link.href)
                      ? "text-white"
                      : "text-saasy-muted"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://app.hellosaasy.ai/login"
              className="hidden text-sm text-saasy-muted
                transition-colors hover:text-white md:block"
            >
              Sign in
            </Link>
            <Link
              href="https://app.hellosaasy.ai/signup"
              className="hidden rounded-full bg-saasy-rose px-4
                py-2 text-sm font-semibold text-white
                transition-colors hover:bg-saasy-rose-bright
                md:flex"
            >
              Start free trial
            </Link>

            {/* Hamburger button — visible only below md. 44px tap
                target (thumb-friendly). */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 items-center
                justify-center rounded-lg border
                border-saasy-border text-saasy-muted
                transition-colors
                hover:border-saasy-pink/40
                hover:text-white md:hidden"
            >
              {open ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60
            backdrop-blur-sm md:hidden"
          aria-hidden="true"
          onClick={close}
        />
      )}

      {/* Slide-in drawer from right */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72
          border-l border-saasy-border bg-saasy-darker
          shadow-2xl transition-transform duration-300
          ease-in-out md:hidden ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between
            border-b border-saasy-border px-6 py-4"
        >
          <span
            className="flex items-center gap-2
              text-lg font-bold text-white"
          >
            <img src="/logomark.svg" alt="" className="h-6 w-6" />
            SaaSy
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="flex h-11 w-11 items-center
              justify-center rounded-lg text-saasy-muted
              transition-colors hover:text-white"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Drawer nav links */}
        <nav className="flex flex-col px-6 py-6 gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={resolveHref(link.href)}
              onClick={close}
              className={`rounded-lg px-3 py-3 text-base
                transition-colors
                hover:bg-saasy-border/30
                hover:text-white ${
                  isActive(link.href)
                    ? "text-white"
                    : "text-saasy-muted"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Drawer CTAs */}
        <div
          className="flex flex-col gap-3 border-t
            border-saasy-border px-6 py-6"
        >
          <Link
            href="https://app.hellosaasy.ai/login"
            onClick={close}
            className="w-full rounded-lg border
              border-saasy-border px-4 py-3 text-center
              text-sm font-semibold text-saasy-muted
              transition-colors
              hover:border-saasy-pink/40
              hover:text-white"
          >
            Sign in
          </Link>
          <Link
            href="https://app.hellosaasy.ai/signup"
            onClick={close}
            className="w-full rounded-full bg-saasy-rose px-4
              py-3 text-center text-sm
              font-semibold text-white
              transition-colors hover:bg-saasy-rose-bright"
          >
            Start free trial
          </Link>
        </div>
      </div>
    </>
  );
}
