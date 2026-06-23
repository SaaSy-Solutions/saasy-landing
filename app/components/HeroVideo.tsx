/**
 * Hero product-demo video. Replaces the static HeroScreenshot with the
 * Remotion-rendered loop (video/src/HeroLoop.tsx), served from Tigris.
 *
 * Autoplays muted + looped (the only way browsers allow hero autoplay). The
 * existing dashboard PNG is the poster, so the hero still looks complete before
 * the video loads, on slow connections, or if the file is missing — no JS and
 * no layout shift. The video already contains its own animated callouts, so the
 * static JSX overlays from HeroScreenshot are intentionally dropped here.
 */
import { videoUrl } from "./videoAssets";

export function HeroVideo(): React.ReactElement {
  return (
    <div className="relative mx-auto mt-16 max-w-4xl">
      {/* Outer glow */}
      <div
        className="absolute inset-0 -m-4 rounded-2xl
          bg-gradient-to-br from-saasy-pink/5 to-saasy-orange/5
          blur-xl"
      />

      {/* Card */}
      <div
        className="glow-border relative overflow-hidden
          rounded-2xl bg-saasy-card/80 p-2 backdrop-blur-sm
          sm:p-3"
      >
        <video
          className="h-auto w-full rounded-lg"
          poster="/screenshots/dashboard-hero.png"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="SaaSy product demo: customer health scores, churn alerts,
            and Ask SaaSy"
        >
          <source src={videoUrl("hero-loop.mp4")} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
