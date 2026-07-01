"use client";

import { useState, type FormEvent } from "react";
import { OPS_API_BASE } from "../../lib/api";

type SubmitStatus = "idle" | "loading" | "success" | "error";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * POST a newsletter signup to the operations service. Resolves on a
 * durable 2xx; throws on any non-2xx or network failure so callers show
 * an honest error state instead of a false success.
 */
async function submitNewsletterSignup(
  email: string,
  source: string
): Promise<void> {
  const res = await fetch(`${OPS_API_BASE}/api/v1/marketing/newsletter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, source }),
  });

  if (!res.ok) {
    throw new Error(`Signup failed (${res.status})`);
  }
}

const SUBMIT_ERROR_MSG =
  "We couldn't save your signup just now. Please try again in a minute.";

export function EmailCapture(): React.ReactElement {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    setErrorMsg("");

    if (!isValidEmail(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      await submitNewsletterSignup(email, "newsletter-section");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg(SUBMIT_ERROR_MSG);
    }
  }

  if (status === "success") {
    return (
      <section className="border-t border-saasy-border py-20">
        <div
          className="mx-auto max-w-2xl rounded-2xl
            border border-saasy-border bg-saasy-card/60
            px-6 py-12 text-center sm:px-12"
        >
          <div
            className="mx-auto mb-4 flex h-14 w-14
              items-center justify-center rounded-full
              bg-saasy-pink/20"
          >
            <svg
              className="h-7 w-7 text-saasy-pink-soft"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white">
            You&apos;re on the list.
          </h3>
          <p className="mt-2 text-saasy-muted">
            We&apos;ll send occasional product updates and early access
            to new features as they ship. No spam, and you can
            unsubscribe anytime.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="border-t border-saasy-border py-20"
      aria-labelledby="newsletter-heading"
    >
      <div
        className="mx-auto max-w-2xl rounded-2xl
          border border-saasy-border bg-saasy-card/60
          px-6 py-12 text-center sm:px-12"
      >
        <h2
          id="newsletter-heading"
          className="text-2xl font-bold text-white sm:text-3xl"
        >
          Get product updates
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-saasy-muted">
          Get occasional updates on what we&rsquo;re shipping,
          plus early access to new features as they roll out.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-md flex-col
            gap-3 sm:flex-row"
          noValidate
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errorMsg) setErrorMsg("");
            }}
            aria-describedby={
              errorMsg ? "newsletter-error" : undefined
            }
            aria-invalid={errorMsg ? true : undefined}
            className="flex-1 rounded-lg border border-saasy-border
              bg-saasy-dark px-4 py-3 text-sm
              text-white placeholder-saasy-muted
              transition-colors
              focus:border-saasy-pink focus:outline-none
              focus:ring-1 focus:ring-saasy-pink"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-full bg-saasy-rose px-6 py-3 text-sm
              font-semibold text-white
              transition-colors hover:bg-saasy-rose-bright
              disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {errorMsg && (
          <p
            id="newsletter-error"
            role="alert"
            className="mt-2 text-sm text-red-400"
          >
            {errorMsg}
          </p>
        )}

        <p className="mt-4 text-xs text-saasy-muted">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

/** Compact version for use in the footer. */
export function FooterEmailCapture(): React.ReactElement {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    setErrorMsg("");

    if (!isValidEmail(email)) {
      setErrorMsg("Please enter a valid email.");
      return;
    }

    setStatus("loading");

    try {
      await submitNewsletterSignup(email, "footer");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg(SUBMIT_ERROR_MSG);
    }
  }

  if (status === "success") {
    return (
      <div className="col-span-2 md:col-span-4">
        <div
          className="flex items-center gap-3 rounded-lg
            border border-saasy-border bg-saasy-card/40
            px-4 py-3"
        >
          <svg
            className="h-5 w-5 shrink-0 text-saasy-pink-soft"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p className="text-sm text-saasy-muted">
            You&apos;re subscribed. We&apos;ll be in touch when
            there&apos;s something worth reading.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="col-span-2 md:col-span-4"
      aria-labelledby="footer-newsletter-heading"
    >
      <div
        className="rounded-lg border border-saasy-border
          bg-saasy-card/40 px-4 py-5 sm:px-6"
      >
        <h3
          id="footer-newsletter-heading"
          className="text-white text-sm font-semibold"
        >
          Stay in the loop
        </h3>
        <p className="mt-1 max-w-md text-xs text-saasy-muted">
          Occasional product updates and practical guides for
          running your business. No spam.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-3 flex flex-col gap-2 sm:flex-row"
          noValidate
        >
          <label
            htmlFor="footer-newsletter-email"
            className="sr-only"
          >
            Email address
          </label>
          <input
            id="footer-newsletter-email"
            type="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errorMsg) setErrorMsg("");
            }}
            aria-describedby={
              errorMsg ? "footer-newsletter-error" : undefined
            }
            aria-invalid={errorMsg ? true : undefined}
            className="flex-1 rounded-md border border-saasy-border
              bg-saasy-dark px-3 py-2 text-sm
              text-white placeholder-saasy-muted
              transition-colors
              focus:border-saasy-pink focus:outline-none
              focus:ring-1 focus:ring-saasy-pink"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-full bg-saasy-rose px-4 py-2 text-sm
              font-semibold text-white
              transition-colors hover:bg-saasy-rose-bright
              disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "..." : "Subscribe"}
          </button>
        </form>
        {errorMsg && (
          <p
            id="footer-newsletter-error"
            role="alert"
            className="mt-1 text-xs text-red-400"
          >
            {errorMsg}
          </p>
        )}
      </div>
    </div>
  );
}
