/**
 * Sell → deliver → bill → keep them. The homepage differentiator
 * (saasy-landing#8). Every step is a capability that ships today:
 * scored deals + next-best-action, one-click deal→project, native
 * invoice + Stripe payment link, paid status back on the CRM record.
 * Do not add usage/payment health-scoring claims here — that writer
 * is still dark (saas-platform#8311).
 */

interface LoopStep {
  n: string;
  verb: string;
  title: string;
  body: string;
}

const STEPS: LoopStep[] = [
  {
    n: "01",
    verb: "Sell",
    title: "Score the deal. Know the next move.",
    body: "Pipeline, deal score, and a next-best-action on the record — not a number with no next step.",
  },
  {
    n: "02",
    verb: "Deliver",
    title: "Won deal, delivery project.",
    body: "One click on a closed-won deal spins up the project, pre-filled from the deal. Billable time lives there.",
  },
  {
    n: "03",
    verb: "Bill",
    title: "Invoice from the work, not a second tool.",
    body: "Convert the deal or the project to a native invoice and send a Stripe payment link. No export to get paid.",
  },
  {
    n: "04",
    verb: "Keep them",
    title: "Paid writes back onto the record.",
    body: "When they pay, the deal and project show Paid. Next-best-action stays on the record so you know what to do next.",
  },
];

export function SellDeliverBill(): React.ReactElement {
  return (
    <section
      id="loop"
      className="border-t border-saasy-border py-20 sm:py-28"
      aria-labelledby="loop-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p
            className="text-sm font-semibold uppercase tracking-wide
              text-saasy-pink-soft"
          >
            Sell → deliver → bill
          </p>
          <h2
            id="loop-heading"
            className="mt-3 text-3xl font-bold tracking-tight
              text-white sm:text-4xl"
          >
            The CRM that doesn&rsquo;t drop the ball{" "}
            <span className="accent-word">after you close</span>
          </h2>
          <p className="mt-4 text-lg text-saasy-muted">
            Most CRMs stop at the handshake. SaaSy takes the won deal
            through delivery and into the invoice, then writes payment
            back onto the record. One loop. Live today.
          </p>
        </div>

        <ol
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {STEPS.map((step, i) => (
            <li
              key={step.n}
              className="relative rounded-2xl border
                border-saasy-border bg-saasy-card/50 p-6"
            >
              <p
                className="text-xs font-semibold uppercase tracking-wide
                  text-saasy-pink-soft"
              >
                <span className="tabular-nums">{step.n}</span>
                {" · "}
                {step.verb}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed
                  text-saasy-muted"
              >
                {step.body}
              </p>
              {i < STEPS.length - 1 && (
                <span
                  className="pointer-events-none absolute top-1/2
                    -right-3 hidden text-saasy-pink-soft
                    lg:block"
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
