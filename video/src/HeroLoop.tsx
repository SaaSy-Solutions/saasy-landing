import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
} from "remotion";
import {
  BrandBackground,
  Callout,
  Caption,
  COLORS,
  FONT,
  GradientText,
  Logo,
  Pill,
  ScreenshotCard,
  StatCounter,
  EASE_OUT,
} from "./brand";

/**
 * Hero demo loop (~30s, 1920×1080, silent + captions).
 *
 * Tells the site's "idea → thriving enterprise co-founder" story using the
 * real demo-tenant screenshots. Designed to autoplay muted and loop in the
 * hero. Scene timings (30fps):
 *   S1  0–120   logo + headline reveal
 *   S2  120–270 journey beats
 *   S3  270–450 dashboard + at-risk callout + health counter
 *   S4  450–600 churn caught early
 *   S5  600–750 Ask SaaSy
 *   S6  750–900 CTA
 */
export const HeroLoop: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      <BrandBackground />

      <Sequence durationInFrames={120} layout="none">
        <SceneHeadline />
      </Sequence>
      <Sequence from={120} durationInFrames={150} layout="none">
        <SceneJourney />
      </Sequence>
      <Sequence from={270} durationInFrames={180} layout="none">
        <SceneDashboard />
      </Sequence>
      <Sequence from={450} durationInFrames={150} layout="none">
        <SceneChurn />
      </Sequence>
      <Sequence from={600} durationInFrames={150} layout="none">
        <SceneAsk />
      </Sequence>
      <Sequence from={750} durationInFrames={150} layout="none">
        <SceneCta />
      </Sequence>
    </AbsoluteFill>
  );
};

const Center: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <AbsoluteFill
    style={{
      justifyContent: "center",
      alignItems: "center",
      padding: 80,
      ...style,
    }}
  >
    {children}
  </AbsoluteFill>
);

const SceneHeadline: React.FC = () => {
  const frame = useCurrentFrame();
  const line1 = interpolate(frame, [6, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  const line2 = interpolate(frame, [22, 44], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  return (
    <Center>
      <Pill style={{ marginBottom: 36, opacity: line1 }}>
        Now in beta — early access open
      </Pill>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 104,
          lineHeight: 1.05,
          textAlign: "center",
          color: COLORS.white,
        }}
      >
        <div style={{ opacity: line1, translate: `0px ${(1 - line1) * 24}px` }}>
          Your intelligent business
        </div>
        <div style={{ opacity: line2, translate: `0px ${(1 - line2) * 24}px` }}>
          <GradientText style={{ fontSize: 104 }}>co-founder</GradientText>
        </div>
      </div>
    </Center>
  );
};

const journeyStops = ["Idea", "Formed", "Customers", "Growth"];

const SceneJourney: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Center>
      <Caption enterAt={4} hold style={{ marginBottom: 56, fontSize: 40, fontWeight: 600 }}>
        Every stage of your business journey
      </Caption>
      <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
        {journeyStops.map((stop, i) => {
          const at = 18 + i * 22;
          const lit = interpolate(frame, [at, at + 14], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE_OUT,
          });
          return (
            <div key={stop} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 999,
                    background: `linear-gradient(120deg, ${COLORS.pink}, ${COLORS.orange})`,
                    opacity: interpolate(lit, [0, 1], [0.2, 1]),
                    scale: interpolate(lit, [0, 1], [0.6, 1]),
                    boxShadow: `0 0 ${lit * 30}px ${COLORS.pink}aa`,
                  }}
                />
                <span
                  style={{
                    fontFamily: FONT,
                    fontWeight: 600,
                    fontSize: 30,
                    color: interpolate(lit, [0, 1], [0.4, 1]) > 0.7 ? COLORS.white : COLORS.muted,
                    opacity: interpolate(lit, [0, 1], [0.4, 1]),
                  }}
                >
                  {stop}
                </span>
              </div>
              {i < journeyStops.length - 1 && (
                <div
                  style={{
                    width: 180,
                    height: 4,
                    margin: "0 8px 46px",
                    borderRadius: 999,
                    background: COLORS.border,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${interpolate(
                        frame,
                        [at + 8, at + 24],
                        [0, 100],
                        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                      )}%`,
                      height: "100%",
                      background: `linear-gradient(90deg, ${COLORS.pink}, ${COLORS.orange})`,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Center>
  );
};

const SceneDashboard: React.FC = () => {
  return (
    <Center style={{ flexDirection: "column", gap: 0 }}>
      <ScreenshotCard src="screenshots/dashboard-hero.png" width={1020} enterAt={0}>
        <Callout
          label="6 customers at risk this week"
          top="40%"
          left="30%"
          arrow="down"
          enterAt={28}
        />
        <FloatingStat label="Avg. health" to={82} suffix="" enterAt={44} />
      </ScreenshotCard>
      <Caption enterAt={60} style={{ marginTop: 40, fontSize: 36, fontWeight: 600 }}>
        See customer health the moment it changes
      </Caption>
    </Center>
  );
};

const FloatingStat: React.FC<{
  label: string;
  to: number;
  suffix?: string;
  enterAt: number;
}> = ({ label, to, suffix, enterAt }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [enterAt, enterAt + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  return (
    <div
      style={{
        position: "absolute",
        top: "12%",
        right: "6%",
        background: `${COLORS.card}f2`,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 18,
        padding: "16px 24px",
        opacity: p,
        translate: `0px ${interpolate(p, [0, 1], [-14, 0])}px`,
        boxShadow: "0 20px 50px #00000055",
      }}
    >
      <div style={{ fontFamily: FONT, fontSize: 20, color: COLORS.muted }}>{label}</div>
      <StatCounter
        to={to}
        suffix={suffix}
        startFrame={enterAt + 6}
        durationInFrames={34}
        style={{ fontSize: 56, color: COLORS.white }}
      />
    </div>
  );
};

const SceneChurn: React.FC = () => {
  return (
    <Center style={{ flexDirection: "column" }}>
      <ScreenshotCard src="screenshots/churn-alerts.png" width={1020} enterAt={0}>
        <Callout
          label="Churn caught before it happens"
          top="20%"
          left="34%"
          arrow="up"
          enterAt={30}
        />
      </ScreenshotCard>
      <Caption enterAt={56} style={{ marginTop: 40, fontSize: 36, fontWeight: 600 }}>
        Proactive alerts, so you act before customers leave
      </Caption>
    </Center>
  );
};

const SceneAsk: React.FC = () => {
  const frame = useCurrentFrame();
  const question = "Which accounts should I focus on this week?";
  const chars = Math.floor(
    interpolate(frame, [10, 60], [0, question.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  return (
    <Center style={{ flexDirection: "column" }}>
      <div
        style={{
          fontFamily: FONT,
          fontSize: 38,
          fontWeight: 600,
          color: COLORS.white,
          marginBottom: 28,
          height: 48,
        }}
      >
        <span style={{ color: COLORS.muted }}>Ask SaaSy: </span>
        {question.slice(0, chars)}
        <Cursor />
      </div>
      <ScreenshotCard src="screenshots/ask-saasy.png" width={1020} enterAt={36} />
    </Center>
  );
};

const Cursor: React.FC = () => {
  const frame = useCurrentFrame();
  const on = Math.floor(frame / 15) % 2 === 0;
  return (
    <span style={{ opacity: on ? 1 : 0, color: COLORS.pink, fontWeight: 700 }}>|</span>
  );
};

const SceneCta: React.FC = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [6, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  const pulse = 1 + 0.03 * Math.sin(frame / 8);
  return (
    <Center>
      <div style={{ textAlign: "center", opacity: p, translate: `0px ${(1 - p) * 24}px` }}>
        <Logo height={72} style={{ margin: "0 auto 40px" }} />
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 76,
            color: COLORS.white,
            marginBottom: 44,
          }}
        >
          Meet your <GradientText style={{ fontSize: 76 }}>co-founder</GradientText>
        </div>
        <div style={{ display: "inline-block", scale: String(pulse) }}>
          <Pill variant="cta">Start your free trial</Pill>
        </div>
        <div style={{ fontFamily: FONT, fontSize: 28, color: COLORS.muted, marginTop: 28 }}>
          hellosaasy.ai · 14-day free trial, no credit card
        </div>
      </div>
    </Center>
  );
};
