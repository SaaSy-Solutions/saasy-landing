"use client";

import { useRef, useState, type FormEvent } from "react";
import { OPS_API_BASE } from "../../lib/api";

type FieldName = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

type SubmitStatus = "idle" | "loading" | "success" | "error";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Field caps mirror the backend contract (200 / 5000). */
const MAX_FIELD_LEN = 200;
const MAX_MESSAGE_LEN = 5000;

const GENERIC_ERROR_MSG =
  "We couldn't send your message just now. Please try again in a " +
  "minute, or email us directly at support@hellosaasy.ai.";

const RATE_LIMIT_ERROR_MSG =
  "Whoa. That's a few messages in a row. Give it a minute, then " +
  "try again.";

/**
 * General contact form. POSTs to the operations service's public
 * lead-capture endpoint (the same one behind the app's Contact Sales
 * page); `source` distinguishes landing-site submissions. Resolves on
 * a durable 2xx only — a failed send shows an honest error with a
 * direct-email fallback, never a false success.
 */
export function ContactForm(): React.ReactElement {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    setErrorMsg("");

    const errors: FieldErrors = {};
    if (!name.trim()) errors.name = "Please tell us your name.";
    if (!isValidEmail(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (!message.trim()) {
      errors.message = "Please write a message (that's the good part).";
    }
    setFieldErrors(errors);
    if (errors.name || errors.email || errors.message) {
      if (errors.name) nameRef.current?.focus();
      else if (errors.email) emailRef.current?.focus();
      else messageRef.current?.focus();
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch(`${OPS_API_BASE}/api/v1/contact/sales`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || undefined,
          message: message.trim(),
          source: "landing-contact",
        }),
      });

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(
          res.status === 429 ? RATE_LIMIT_ERROR_MSG : GENERIC_ERROR_MSG
        );
        return;
      }

      if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
        // Dynamic import reuses the singleton AnalyticsProvider already
        // initialized in the layout without pulling posthog-js into
        // this page's chunk.
        void import("posthog-js").then(({ default: posthog }) => {
          posthog.capture("contact_form_submitted", {
            source: "landing-contact",
            has_company: company.trim().length > 0,
          });
        });
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg(GENERIC_ERROR_MSG);
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-2xl border border-saasy-border bg-saasy-card/60
          px-6 py-12 text-center sm:px-10"
      >
        <div
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center
            rounded-full bg-saasy-pink/20"
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
          Got it. Talk soon.
        </h3>
        <p className="mx-auto mt-2 max-w-md text-saasy-muted">
          Your message is in. A real person will get back to you within
          one business day, usually faster.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-saasy-border bg-saasy-card/60
        px-6 py-8 sm:px-10"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-white"
          >
            Name
          </label>
          <input
            ref={nameRef}
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={MAX_FIELD_LEN}
            placeholder="Alex Rivera"
            aria-invalid={fieldErrors.name ? true : undefined}
            aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setFieldErrors((current) => ({ ...current, name: undefined }));
            }}
            className="mt-2 w-full rounded-lg border border-saasy-border
              bg-saasy-dark px-4 py-3 text-sm text-white
              placeholder-saasy-muted transition-colors
              focus:border-saasy-pink focus:outline-none
              focus:ring-1 focus:ring-saasy-pink"
          />
          {fieldErrors.name && (
            <p id="contact-name-error" role="alert" className="mt-2 text-sm text-red-400">
              {fieldErrors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-white"
          >
            Email
          </label>
          <input
            ref={emailRef}
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={MAX_FIELD_LEN}
            placeholder="you@company.com"
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldErrors((current) => ({ ...current, email: undefined }));
            }}
            className="mt-2 w-full rounded-lg border border-saasy-border
              bg-saasy-dark px-4 py-3 text-sm text-white
              placeholder-saasy-muted transition-colors
              focus:border-saasy-pink focus:outline-none
              focus:ring-1 focus:ring-saasy-pink"
          />
          {fieldErrors.email && (
            <p id="contact-email-error" role="alert" className="mt-2 text-sm text-red-400">
              {fieldErrors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="contact-company"
          className="block text-sm font-medium text-white"
        >
          Company{" "}
          <span className="font-normal text-saasy-muted">(optional)</span>
        </label>
        <input
          id="contact-company"
          name="organization"
          type="text"
          autoComplete="organization"
          maxLength={MAX_FIELD_LEN}
          placeholder="Rivera Plumbing Co."
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="mt-2 w-full rounded-lg border border-saasy-border
            bg-saasy-dark px-4 py-3 text-sm text-white
            placeholder-saasy-muted transition-colors
            focus:border-saasy-pink focus:outline-none
            focus:ring-1 focus:ring-saasy-pink"
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-white"
        >
          How can we help?
        </label>
        <textarea
          ref={messageRef}
          id="contact-message"
          name="message"
          required
          rows={5}
          maxLength={MAX_MESSAGE_LEN}
          placeholder={
            "Tell us what you're running, what's slowing you down, " +
            "or what you'd like to see."
          }
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setFieldErrors((current) => ({ ...current, message: undefined }));
          }}
          aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
          aria-invalid={fieldErrors.message ? true : undefined}
          className="mt-2 w-full resize-y rounded-lg border
            border-saasy-border bg-saasy-dark px-4 py-3 text-sm
            text-white placeholder-saasy-muted transition-colors
            focus:border-saasy-pink focus:outline-none
            focus:ring-1 focus:ring-saasy-pink"
        />
        {fieldErrors.message && (
          <p id="contact-message-error" role="alert" className="mt-2 text-sm text-red-400">
            {fieldErrors.message}
          </p>
        )}
      </div>

      {errorMsg && (
        <p
          id="contact-error"
          role="alert"
          className="mt-4 text-sm text-red-400"
        >
          {errorMsg}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-full bg-saasy-rose px-8 py-3 text-sm
            font-semibold text-white transition-colors
            hover:bg-saasy-rose-bright
            disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Sending..." : "Send message"}
        </button>
        <p className="text-xs text-saasy-muted">
          We reply within one business day.
        </p>
      </div>
    </form>
  );
}
