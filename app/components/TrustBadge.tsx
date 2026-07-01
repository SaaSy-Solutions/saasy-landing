interface TrustBadgeProps {
  label: string;
  sublabel: string;
}

/**
 * One item in the trust bar. Deliberately quiet: a plain-language
 * claim with the technical detail underneath — not a metric card.
 */
export function TrustBadge({
  label,
  sublabel,
}: TrustBadgeProps): React.ReactElement {
  return (
    <div className="text-center">
      <div className="text-base font-semibold text-white">
        {label}
      </div>
      <div className="mt-1 text-sm text-saasy-muted">
        {sublabel}
      </div>
    </div>
  );
}
