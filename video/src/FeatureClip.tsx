import { z } from "zod";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Callout, COLORS, EASE_OUT, FONT, StatCounter } from "./brand";

/**
 * Text-free feature loop (1200×900, ~6s, silent, looping) for the /features
 * showcase rows. No burned-in headline — the row supplies its own copy — so
 * this is just the product screenshot with an animated callout (+ optional
 * counter) on the dark card. Rendered once per variant (health/churn/ask).
 */
export const featureClipSchema = z.object({
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
});

export type FeatureClipProps = z.infer<typeof featureClipSchema>;

export const FeatureClip: React.FC<FeatureClipProps> = ({ screenshot, callout, stat }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fade = Math.min(
    interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const rise = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.card }}>
      {/* Living-Geometry dot grid behind the shot (no glow — the brand
          guide's sanctioned accents are geometric shapes) */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(circle, ${COLORS.muted}14 1px, transparent 1.4px)`,
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 85% 75% at 50% 40%, black 50%, transparent 100%)",
        }}
      />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: fade }}>
        <div
          style={{
            position: "relative",
            width: "90%",
            translate: `0px ${interpolate(rise, [0, 1], [24, 0])}px`,
            scale: interpolate(rise, [0, 1], [0.97, 1]),
          }}
        >
          <Img
            src={staticFile(screenshot)}
            style={{
              width: "100%",
              display: "block",
              borderRadius: 16,
              border: `1px solid ${COLORS.border}`,
              boxShadow: "0 30px 80px #00000055",
            }}
          />
          <Callout
            label={callout.label}
            top={callout.top}
            left={callout.left}
            arrow={callout.arrow}
            enterAt={24}
          />
          {stat && (
            <div
              style={{
                position: "absolute",
                top: "8%",
                right: "5%",
                background: `${COLORS.dark}f2`,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 16,
                padding: "12px 20px",
              }}
            >
              <div style={{ fontFamily: FONT, fontSize: 18, color: COLORS.muted }}>
                {stat.label}
              </div>
              <StatCounter
                to={stat.to}
                suffix={stat.suffix}
                startFrame={30}
                durationInFrames={34}
                style={{ fontSize: 44 }}
              />
            </div>
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** One entry per /features showcase row that gets an animated clip. */
export const featureClips: Record<string, FeatureClipProps> = {
  health: {
    screenshot: "screenshots/dashboard-hero.png",
    callout: { label: "6 at risk this week", top: "40%", left: "28%", arrow: "down" },
    stat: { label: "Avg. health", to: 82, suffix: "" },
  },
  churn: {
    screenshot: "screenshots/churn-alerts.png",
    callout: { label: "Acted on in time", top: "18%", left: "32%", arrow: "up" },
  },
  ask: {
    screenshot: "screenshots/ask-saasy.png",
    callout: { label: "Plain-English answers", top: "26%", left: "8%", arrow: "left" },
  },
  customer: {
    screenshot: "screenshots/customer-detail.png",
    callout: { label: "The full story, one click", top: "20%", left: "30%", arrow: "up" },
  },
};
