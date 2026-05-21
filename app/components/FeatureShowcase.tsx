import Image from "next/image";
import { ScreenshotCallout } from "./ScreenshotCallout";

export interface FeatureShowcaseCallout {
  top: string;
  left: string;
  arrow: "up" | "down" | "left" | "right";
  label: string;
}

interface FeatureShowcaseProps {
  /** Section heading. */
  title: string;
  /** 1-2 sentence body describing the feature. */
  body: string;
  /** Path under /public for the screenshot (e.g. "/screenshots/customer-detail.png"). */
  image: string;
  /** Alt text for the screenshot. */
  alt: string;
  /** Native pixel width of the screenshot (used for next/image sizing). */
  imageWidth: number;
  /** Native pixel height of the screenshot. */
  imageHeight: number;
  /** Optional annotation overlays positioned over the screenshot. */
  callouts?: FeatureShowcaseCallout[];
  /** When true, screenshot renders on the left instead of the right. */
  reverse?: boolean;
}

/**
 * Single feature row: heading + body on one side, annotated
 * screenshot on the other. Used on /features to stack 5 product
 * features.
 */
export function FeatureShowcase({
  title,
  body,
  image,
  alt,
  imageWidth,
  imageHeight,
  callouts,
  reverse,
}: FeatureShowcaseProps): React.ReactElement {
  return (
    <section className="border-t border-saasy-border py-20 sm:py-28">
      <div
        className={`mx-auto grid max-w-6xl items-center gap-12
          px-6 lg:grid-cols-2 lg:gap-16 ${
            reverse ? "lg:[&>div:first-child]:order-2" : ""
          }`}
      >
        <div>
          <h2
            className="font-[family-name:var(--font-poppins)]
              text-3xl font-bold text-white sm:text-4xl"
          >
            {title}
          </h2>
          <p
            className="mt-4
              font-[family-name:var(--font-poppins)]
              text-lg leading-relaxed text-saasy-muted"
          >
            {body}
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute inset-0 -m-4 rounded-2xl
              bg-gradient-to-br from-saasy-pink/5
              to-saasy-orange/5 blur-xl"
          />
          <div
            className="glow-border relative overflow-hidden
              rounded-2xl bg-saasy-card/80 p-2 backdrop-blur-sm"
          >
            <div className="relative">
              <Image
                src={image}
                alt={alt}
                width={imageWidth}
                height={imageHeight}
                sizes="(max-width: 1024px) 100vw, 600px"
                className="h-auto w-full rounded-lg"
              />
              {callouts?.map((c, i) => (
                <ScreenshotCallout
                  key={i}
                  top={c.top}
                  left={c.left}
                  arrow={c.arrow}
                  label={c.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
