/**
 * "How it works" explainer player. Embeds the Remotion-rendered explainer
 * (video/src/HowItWorks.tsx, served from Tigris) as the demo the hero's
 * "See how it works" CTA scrolls to.
 *
 * Uses native `controls` (not autoplay) since it's a 75s narrative the visitor
 * chooses to watch, with the dashboard screenshot as poster so the frame looks
 * intentional before play.
 */
import { videoUrl } from "./videoAssets";

export function ProductDemo(): React.ReactElement {
  return (
    <div className="mx-auto mb-20 max-w-4xl">
      <div className="relative">
        {/* Outer glow */}
        <div
          className="absolute inset-0 -m-4 rounded-2xl
            bg-gradient-to-br from-saasy-pink/5 to-saasy-orange/5
            blur-xl"
        />
        <div
          className="glow-border relative overflow-hidden rounded-2xl
            bg-saasy-card/80 p-2 backdrop-blur-sm sm:p-3"
        >
          <video
            className="h-auto w-full rounded-lg"
            poster="/screenshots/dashboard-hero.png"
            controls
            playsInline
            preload="metadata"
            aria-label="How SaaSy works — a 75-second product walkthrough"
          >
            <source src={videoUrl("how-it-works.mp4")} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}
