"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-full border border-saasy-border px-4 py-2 text-sm text-white"
    >
      Print or save as PDF
    </button>
  );
}
