import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  BrandBackground,
  Callout,
  COLORS,
  FONT,
  AccentText,
  ScreenshotCard,
  StatCounter,
  EASE_OUT,
} from "./brand";

/**
 * Parameterized ~6s feature micro-loop (1080×1080). One composition, rendered
 * three times (health / churn / ask) to replace the static feature
 * screenshots in `FeatureShowcase`. Silent; loops cleanly (fades in and out).
 */
export const featureLoopSchema = z.object({
  eyebrow: z.string(),
  headline: z.string(),
  highlight: z.string(),
  screenshot: z.string(),
  callout: z.object({
    label: z.string(),
    top: z.string(),
    left: z.string(),
    arrow: z.enum(["up", "down", "left", "right"]),
  }),
  stat: z
    .object({ label: z.string(), to: z.number(), suffix: z.string() })
    .optional(),
  accent: zColor(),
});

export type FeatureLoopProps = z.infer<typeof featureLoopSchema>;

export const FeatureLoop: React.FC<FeatureLoopProps> = ({
  eyebrow,
  headline,
  highlight,
  screenshot,
  callout,
  stat,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Loop-friendly: fade the whole thing in at the start and out at the end.
  const fade = Math.min(
    interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  const headlineP = interpolate(frame, [8, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      <BrandBackground />
      <AbsoluteFill style={{ opacity: fade, padding: 72, justifyContent: "space-between" }}>
        <div style={{ opacity: headlineP, translate: `0px ${(1 - headlineP) * 18}px` }}>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 600,
              fontSize: 30,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: COLORS.pink,
              marginBottom: 14,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 60,
              lineHeight: 1.1,
              color: COLORS.white,
              maxWidth: 880,
            }}
          >
            {headline} <AccentText style={{ fontSize: 60 }}>{highlight}</AccentText>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", flex: 1, alignItems: "center" }}>
          <ScreenshotCard src={screenshot} width={920} enterAt={6}>
            <Callout
              label={callout.label}
              top={callout.top}
              left={callout.left}
              arrow={callout.arrow}
              enterAt={34}
            />
            {stat && (
              <div
                style={{
                  position: "absolute",
                  bottom: "8%",
                  right: "6%",
                  background: `${COLORS.card}f2`,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 18,
                  padding: "14px 22px",
                }}
              >
                <div style={{ fontFamily: FONT, fontSize: 20, color: COLORS.muted }}>
                  {stat.label}
                </div>
                <StatCounter
                  to={stat.to}
                  suffix={stat.suffix}
                  startFrame={40}
                  durationInFrames={34}
                  style={{ fontSize: 52 }}
                />
              </div>
            )}
          </ScreenshotCard>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Default props per variant, referenced from Root.tsx. */
export const featureVariants: Record<string, FeatureLoopProps> = {
  health: {
    eyebrow: "Customer Health",
    headline: "Know who's thriving and who's",
    highlight: "slipping",
    screenshot: "screenshots/dashboard-hero.png",
    callout: { label: "6 at risk this week", top: "40%", left: "30%", arrow: "down" },
    stat: { label: "Avg. health", to: 82, suffix: "" },
    accent: COLORS.pink,
  },
  churn: {
    eyebrow: "Churn Prevention",
    headline: "Catch churn",
    highlight: "before it happens",
    screenshot: "screenshots/churn-alerts.png",
    callout: { label: "Acted on in time", top: "20%", left: "34%", arrow: "up" },
    accent: COLORS.orange,
  },
  ask: {
    eyebrow: "Ask SaaSy",
    headline: "Just ask.",
    highlight: "SaaSy answers.",
    screenshot: "screenshots/ask-saasy.png",
    callout: { label: "Plain-English answers", top: "30%", left: "8%", arrow: "left" },
    accent: COLORS.rose,
  },
};
