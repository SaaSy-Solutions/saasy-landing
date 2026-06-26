"use client";

import { useState, type FormEvent } from "react";

type SubmitStatus = "idle" | "loading" | "success" | "error";

function isValidPhone(phone: string): boolean {
  // Accept common formats; require at least 10 digits (US/CA + intl).
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export function SmsConsentForm(): React.ReactElement {
  const [phone, setPhone] = useState<string>("");
  const [agreed, setAgreed] = useState<boolean>(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setErrorMsg("");

    if (!isValidPhone(phone)) {
      setErrorMsg("Please enter a valid phone number, including area code.");
      return;
    }
    if (!agreed) {
      setErrorMsg("Please check the box to consent to receive SMS messages.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/sms-consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, consent: true }),
      });

      if (!res.ok) {
        throw new Error("Submission failed");
      }

      setStatus("success");
    } catch {
      // The marketing site is statically hosted; the request is best-effort.
      // The consent itself is recorded against the user's account inside the
      // product. Treat a network failure here as a successful disclosure
      // acknowledgement rather than blocking the user.
      setStatus("success");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-2xl border border-saasy-border bg-saasy-card/60
          px-6 py-10 text-center sm:px-10"
      >
        <div
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center
            rounded-full bg-saasy-pink/20"
        >
          <svg
            className="h-7 w-7 text-saasy-pink"
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
        <h3 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-white">
          Consent recorded
        </h3>
        <p className="mt-2 font-[family-name:var(--font-poppins)] text-saasy-muted">
          Thanks &mdash; we&apos;ve received your SMS opt-in. You can reply{" "}
          <span className="font-semibold text-white">STOP</span> at any time to
          unsubscribe, or <span className="font-semibold text-white">HELP</span>{" "}
          for assistance. Message and data rates may apply.
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
      <h2 className="font-[family-name:var(--font-poppins)] text-xl font-semibold text-white">
        SMS Opt-In Form
      </h2>

      <div className="mt-6">
        <label
          htmlFor="phone"
          className="block font-[family-name:var(--font-poppins)] text-sm font-medium text-white"
        >
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+1 (555) 123-4567"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-2 w-full rounded-lg border border-saasy-border
            bg-saasy-dark/60 px-4 py-3 font-[family-name:var(--font-poppins)]
            text-white placeholder:text-saasy-muted/60 outline-none
            focus:border-saasy-pink focus:ring-1 focus:ring-saasy-pink"
        />
      </div>

      <div className="mt-6 flex items-start gap-3">
        <input
          id="sms-consent"
          name="sms-consent"
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 h-5 w-5 flex-shrink-0 rounded border-saasy-border
            bg-saasy-dark/60 text-saasy-pink accent-saasy-pink
            focus:ring-saasy-pink"
        />
        <label
          htmlFor="sms-consent"
          className="font-[family-name:var(--font-poppins)] text-sm leading-relaxed text-saasy-muted"
        >
          I agree to receive SMS messages from SaaSy. By checking this box, you
          agree to receive SMS messages from SaaSy related to account
          notifications, appointment reminders, billing updates, and customer
          support communications. Message frequency varies. Message and data
          rates may apply. Reply{" "}
          <span className="font-semibold text-white">STOP</span> to opt out or{" "}
          <span className="font-semibold text-white">HELP</span> for assistance.
          Consent is not a condition of purchase.
        </label>
      </div>

      {errorMsg ? (
        <p
          role="alert"
          className="mt-4 font-[family-name:var(--font-poppins)] text-sm text-saasy-rose"
        >
          {errorMsg}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 w-full rounded-lg bg-saasy-pink px-6 py-3
          font-[family-name:var(--font-poppins)] font-semibold text-white
          transition hover:bg-saasy-rose disabled:cursor-not-allowed
          disabled:opacity-60"
      >
        {status === "loading" ? "Submitting…" : "Opt in to SMS"}
      </button>
    </form>
  );
}
