import Image from "next/image";

export function DashboardGraphic(): React.ReactElement {
  return (
    <div className="relative mx-auto mt-16 max-w-4xl">
      {/* Outer glow */}
      <div
        className="absolute inset-0 -m-4 rounded-2xl
          bg-gradient-to-br from-saasy-pink/10 to-saasy-orange/10
          blur-2xl"
      />
      {/* Screenshot frame */}
      <div
        className="glow-border relative overflow-hidden rounded-2xl
          bg-saasy-card/80 backdrop-blur-sm shadow-2xl"
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 border-b
            border-saasy-border bg-saasy-card/90 px-4 py-2.5"
        >
          <div className="h-3 w-3 rounded-full bg-red-500/60" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
          <div className="h-3 w-3 rounded-full bg-green-500/60" />
          <span
            className="ml-3 font-[family-name:var(--font-poppins)]
              text-xs text-saasy-muted"
          >
            app.hellosaasy.ai — Command Center
          </span>
        </div>
        {/* Real product screenshot — annotated hero */}
        <Image
          src="/images/product/dashboard-overview-annotated.png"
          alt="SaaSy Command Center dashboard showing real-time health scoring, proactive churn signals, and smart integration recommendations"
          width={1440}
          height={900}
          className="w-full"
          priority
        />
      </div>
    </div>
  );
}
