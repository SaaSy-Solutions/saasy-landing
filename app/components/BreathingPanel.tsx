'use client';

import { useEffect, useRef, useState } from 'react';
import { useCountUp } from '@/lib/useCountUp';

const FEED = [
  'Drafted invoice #2041 — Rivera Roofing',
  'Flagged churn risk — Delgado HVAC',
  'Filed WH-347 certified payroll — Local 412',
  'Scheduled license renewal — permit #88-C',
];

/**
 * Illustrative product panel for the hero. Shows the AI "breathing":
 * the health score counts up, the bar fills, and an agent feed streams.
 * Numbers are clearly-illustrative use-case scenarios (no real-customer
 * metrics), per the marketing honesty rule.
 */
export function BreathingPanel(): React.ReactElement {
  const score = useCountUp<HTMLSpanElement>(82, { startOnView: true });
  const barRef = useRef<HTMLDivElement | null>(null);
  const [rows, setRows] = useState<string[]>(FEED.slice(0, 4));

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (barRef.current) barRef.current.style.width = '82%';
    if (reduce) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setRows((prev) => [FEED[i % FEED.length], ...prev].slice(0, 4));
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto mt-16 max-w-3xl rounded-2xl border border-saasy-border bg-saasy-card/70 p-4 text-left">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-saasy-border bg-saasy-darker/60 p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-saasy-muted">
            Customer health · Acme Outdoor Co
          </div>
          <div className="mt-2 mb-3 flex items-baseline gap-2">
            <span
              ref={score.ref}
              className="text-4xl font-extrabold tabular-nums text-white"
            >
              {score.value}
            </span>
            <span className="text-sm font-semibold text-green-400">▲ up 6</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-saasy-border">
            <div
              ref={barRef}
              className="breathe-bar h-full rounded-full"
              style={{
                width: '0%',
                background:
                  'linear-gradient(90deg, var(--color-saasy-rose), var(--color-saasy-pink), var(--color-saasy-orange))',
              }}
            />
          </div>
        </div>
        <div className="rounded-xl border border-saasy-border bg-saasy-darker/60 p-4">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-saasy-muted">
            <span className="live-dot inline-block h-2 w-2 rounded-full bg-green-400" />
            Agent activity · live
          </div>
          <ul className="flex flex-col gap-2 font-mono text-xs text-saasy-text">
            {rows.map((r, i) => (
              <li key={`${r}-${i}`} className="feed-enter flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-saasy-pink" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
