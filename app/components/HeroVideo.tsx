/**
 * Hero product-demo video. Replaces the static HeroScreenshot with the
 * Remotion-rendered loop (video/src/HeroLoop.tsx), served from Tigris.
 *
 * Autoplays muted + looped (the only way browsers allow hero autoplay) —
 * unless the visitor prefers reduced motion, in which case AutoplayVideo
 * renders the dashboard PNG poster instead. The video contains its own
 * animated callouts, so the static JSX overlays from HeroScreenshot are
 * intentionally dropped here.
 */
import { videoUrl } from "./videoAssets";
import { AutoplayVideo } from "./AutoplayVideo";

export function HeroVideo(): React.ReactElement {
  return (
    <div className="relative mx-auto mt-16 max-w-4xl">
      <div
        className="relative overflow-hidden rounded-2xl border
          border-saasy-border bg-saasy-card/80 p-2 sm:p-3"
      >
        <AutoplayVideo
          src={videoUrl("hero-loop.mp4")}
          poster="/screenshots/dashboard-hero.png"
          label="SaaSy product demo: customer health scores, churn alerts,
            and Ask SaaSy"
        />
      </div>
    </div>
  );
}
