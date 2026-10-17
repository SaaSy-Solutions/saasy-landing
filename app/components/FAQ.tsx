"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "./faqData";

export function FAQ(): React.ReactElement {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="border-t border-saasy-border py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <h2
          className="mb-12 text-center

            text-3xl font-bold text-white sm:text-4xl"
        >
          Frequently asked questions
        </h2>

        <dl>
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question}>
                <dt>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="text-left w-full flex items-center
                      justify-between py-4
                      border-b border-saasy-border"
                  >
                    <span
                      className="text-white

                        text-base font-medium"
                    >
                      {item.question}
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className={`ml-4 h-5 w-5 shrink-0
                        text-saasy-muted transition-transform
                        ${isOpen ? "rotate-180" : ""}`}
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </dt>
                {/* Always in the DOM (hidden when collapsed) so the
                    static HTML carries every answer the FAQPage
                    JSON-LD describes. */}
                <dd hidden={!isOpen}>
                  <p
                    className="max-w-[65ch] text-saasy-muted
                      text-sm pb-4 pt-3"
                  >
                    {item.answer}
                  </p>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
