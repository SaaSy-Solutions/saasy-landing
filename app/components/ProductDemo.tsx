/**
 * "How it works" explainer player. Embeds the Remotion-rendered explainer
 * (video/src/HowItWorks.tsx, served from Tigris) as the demo the hero's
 * "See how it works" CTA scrolls to.
 *
 * Uses native `controls` (not autoplay) since it's a 75s narrative the visitor
 * chooses to watch, with the dashboard screenshot as poster so the frame looks
 * intentional before play.
 */
import { revVideoUrl } from "./videoAssets";

export function ProductDemo(): React.ReactElement {
  return (
    <div className="mx-auto mb-20 max-w-4xl">
      <div
        className="relative overflow-hidden rounded-2xl border
          border-saasy-border bg-saasy-card/80 p-2 sm:p-3"
      >
        <video
          className="h-auto w-full rounded-lg"
          poster="/screenshots/dashboard-hero.png"
          controls
          playsInline
          preload="metadata"
          aria-label="How SaaSy works — a 75-second product walkthrough"
        >
          <source src={revVideoUrl("how-it-works.mp4")} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
