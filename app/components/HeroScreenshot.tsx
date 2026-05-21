import Image from "next/image";
import { ScreenshotCallout } from "./ScreenshotCallout";

/**
 * Hero product screenshot. Replaces the previous abstract hero
 * graphic with a real /dashboard/health capture from the Acme
 * Outdoor Co demo tenant. Annotations are JSX overlays so the
 * PNG can be re-captured without rework.
 */
export function HeroScreenshot(): React.ReactElement {
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
        <div className="relative">
          <Image
            src="/screenshots/dashboard-hero.png"
            alt="SaaSy dashboard showing customer health scores,
              critical accounts, and expansion opportunities"
            width={1195}
            height={900}
            priority
            sizes="(max-width: 768px) 100vw, 896px"
            className="h-auto w-full rounded-lg"
          />

          {/* Annotation overlays. Positions are approximate —
              tune in pnpm dev if they fall on the wrong UI
              element. */}
          <ScreenshotCallout
            top="42%"
            left="32%"
            arrow="down"
            label="6 customers at risk this week"
          />
          <ScreenshotCallout
            top="74%"
            left="6%"
            arrow="up"
            label="Critical accounts surface first"
          />
        </div>
      </div>
    </div>
  );
}
