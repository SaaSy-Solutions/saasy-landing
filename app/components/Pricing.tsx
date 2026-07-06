import Link from "next/link";
import { IconCheck } from "./Icons";

interface PricingCardProps {
  name: string;
  price: number;
  popular?: boolean;
  features: string[];
  billingLabel?: string;
}

export function PricingCard({
  name,
  price,
  popular,
  features,
  billingLabel,
}: PricingCardProps): React.ReactElement {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-8
        ${
          popular
            ? "border-saasy-pink bg-saasy-card"
            : "border-saasy-border bg-saasy-card/50"
        }`}
    >
      {popular && (
        <div
          className="absolute -top-3.5 left-1/2 -translate-x-1/2
            rounded-full bg-saasy-rose px-4 py-1 text-xs
            font-bold text-white"
        >
          Most popular
        </div>
      )}
      <div className="mb-6">
        <h3 className="mb-2 text-xl font-semibold text-white">
          {name}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-bold text-white">
            ${price}
          </span>
          <span className="text-saasy-muted">
            {billingLabel ?? "/mo"}
          </span>
        </div>
      </div>

      <ul className="mb-8 flex-1 space-y-3">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-sm text-saasy-muted"
          >
            <IconCheck />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={`https://app.hellosaasy.ai/signup?plan=${name.toLowerCase()}`}
        data-cta="pricing"
        className={`block rounded-full py-3.5 text-center text-sm
          font-semibold transition-all duration-200
          ${
            popular
              ? "bg-saasy-rose text-white hover:bg-saasy-rose-bright"
              : "border border-saasy-border bg-saasy-card-hover text-white hover:border-saasy-pink/40"
          }`}
      >
        Start free trial
      </Link>
    </div>
  );
}

type BillingInterval = "monthly" | "annual";

interface PricingToggleProps {
  interval: BillingInterval;
  onChange: (v: BillingInterval) => void;
}

export function PricingToggle({
  interval,
  onChange,
}: PricingToggleProps): React.ReactElement {
  return (
    <div className="flex items-center justify-center gap-3">
      <div
        className="rounded-full bg-saasy-card border
          border-saasy-border p-1 inline-flex"
      >
        <button
          type="button"
          onClick={() => onChange("monthly")}
          className={`rounded-full px-5 py-2 text-sm font-semibold
            transition-all duration-200
            ${
              interval === "monthly"
                ? "bg-saasy-rose text-white"
                : "text-saasy-muted hover:text-white"
            }`}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => onChange("annual")}
          className={`rounded-full px-5 py-2 text-sm font-semibold
            transition-all duration-200
            ${
              interval === "annual"
                ? "bg-saasy-rose text-white"
                : "text-saasy-muted hover:text-white"
            }`}
        >
          Annual
        </button>
      </div>
      {interval === "annual" && (
        <span
          className="rounded-full bg-saasy-pink/10
            border border-saasy-pink/20 px-2.5 py-0.5
            text-xs font-medium text-saasy-pink-soft"
        >
          Save 20%
        </span>
      )}
    </div>
  );
}
