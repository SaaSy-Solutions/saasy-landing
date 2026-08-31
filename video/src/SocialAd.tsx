import { z } from "zod";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
// To add a music bed later: drop an mp3 in public/ and uncomment the two
// lines below + the <Audio> tag at the bottom of <SocialAd>.
// import { Audio } from "@remotion/media";
// import { staticFile } from "remotion";
import {
  BrandBackground,
  Callout,
  Caption,
  COLORS,
  FONT,
  AccentText,
  Logo,
  Pill,
  ScreenshotCard,
  EASE_OUT,
} from "./brand";

/**
 * Punchy ~15s social ad. One composition, rendered at two aspect ratios via
 * `format` (handled by calculateMetadata in Root.tsx):
 *   vertical → 1080×1920 (Reels/Shorts/TikTok/LinkedIn)
 *   square   → 1080×1080 (feed)
 * Silent + captions; layout adapts to the canvas. Music hook is commented out.
 */
export const socialAdSchema = z.object({
  format: z.enum(["vertical", "square"]),
});

export type SocialAdProps = z.infer<typeof socialAdSchema>;

export const SocialAd: React.FC<SocialAdProps> = () => {
  const { width } = useVideoConfig();
  const shotWidth = width * 0.9;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      <BrandBackground />

      <Sequence durationInFrames={90} layout="none">
        <Hook />
      </Sequence>
      <Sequence from={90} durationInFrames={120} layout="none">
        <Shot
          src="screenshots/dashboard-hero.png"
          width={shotWidth}
          caption="See customer health in real time"
          callout={{ label: "6 at risk this week", top: "40%", left: "26%", arrow: "down" }}
        />
      </Sequence>
      <Sequence from={210} durationInFrames={120} layout="none">
        <Shot
          src="screenshots/churn-alerts.png"
          width={shotWidth}
          caption="Catch churn before it happens"
          callout={{ label: "Acted on in time", top: "18%", left: "30%", arrow: "up" }}
        />
      </Sequence>
      <Sequence from={330} durationInFrames={120} layout="none">
        <Cta />
      </Sequence>

      {/* <Audio src={staticFile("music.mp3")} volume={0.4} /> */}
    </AbsoluteFill>
  );
};

const Frame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill
    style={{ justifyContent: "center", alignItems: "center", padding: 64, textAlign: "center" }}
  >
    {children}
  </AbsoluteFill>
);

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const a = interpolate(frame, [4, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  const b = interpolate(frame, [34, 54], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  return (
    <Frame>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 64,
          lineHeight: 1.15,
          color: COLORS.white,
        }}
      >
        <div style={{ opacity: a, translate: `0px ${(1 - a) * 20}px` }}>
          Running a business is a lot.
        </div>
        <div style={{ opacity: b, translate: `0px ${(1 - b) * 20}px`, marginTop: 18 }}>
          Meet your <AccentText style={{ fontSize: 64 }}>AI co-founder.</AccentText>
        </div>
      </div>
    </Frame>
  );
};

const Shot: React.FC<{
  src: string;
  width: number;
  caption: string;
  callout: { label: string; top: string; left: string; arrow: "up" | "down" | "left" | "right" };
}> = ({ src, width, caption, callout }) => {
  return (
    <Frame>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
        <ScreenshotCard src={src} width={width} enterAt={0}>
          <Callout {...callout} enterAt={24} />
        </ScreenshotCard>
        <Caption enterAt={40} hold style={{ fontSize: 46, fontWeight: 700, maxWidth: width }}>
          {caption}
        </Caption>
      </div>
    </Frame>
  );
};

const Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [6, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  const pulse = 1 + 0.035 * Math.sin(frame / 7);
  return (
    <Frame>
      <div style={{ opacity: p, translate: `0px ${(1 - p) * 24}px` }}>
        <Logo height={64} style={{ margin: "0 auto 36px" }} />
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 72,
            color: COLORS.white,
            marginBottom: 44,
            lineHeight: 1.1,
          }}
        >
          Start free today
        </div>
        <div style={{ display: "inline-block", scale: String(pulse) }}>
          <Pill variant="cta">hellosaasy.ai</Pill>
        </div>
        <div style={{ fontFamily: FONT, fontSize: 30, color: COLORS.muted, marginTop: 30 }}>
          14-day free trial · no credit card
        </div>
      </div>
    </Frame>
  );
};
