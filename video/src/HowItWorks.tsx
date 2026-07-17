import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
} from "remotion";
// To narrate this explainer later, add a voiceover/music track:
//   1. Generate VO (e.g. ElevenLabs) or pick a music bed; drop it in public/.
//   2. Uncomment the import + <Audio> tag at the bottom of <HowItWorks>.
//   3. Nudge the per-step `from` offsets to land captions on the narration.
// import { Audio } from "@remotion/media";
// import { staticFile } from "remotion";
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
  EASE_OUT,
} from "./brand";

/**
 * "How it works" explainer (~75s, 1920×1080). Four steps —
 * Connect → Run → Delegate → Comply — each a screenshot + animated caption,
 * framed by a title intro and a CTA outro. Ships silent + captions; an optional
 * voiceover/music track can be layered in later (see header note).
 */

const STEP_LEN = 450; // 15s per step

const steps: {
  index: string;
  title: string;
  highlight: string;
  body: string;
  screenshot: string;
  callout: { label: string; top: string; left: string; arrow: "up" | "down" | "left" | "right" };
}[] = [
  {
    index: "01",
    title: "Connect your",
    highlight: "business",
    body: "Email, calendar, Stripe, Slack — SaaSy pulls your whole back office into one place in minutes.",
    screenshot: "screenshots/integrations.png",
    callout: { label: "Connected in minutes", top: "16%", left: "30%", arrow: "up" },
  },
  {
    index: "02",
    title: "Run it all in",
    highlight: "one place",
    body: "CRM, projects, books, and payroll on one dashboard — instead of six subscriptions that don't talk.",
    screenshot: "screenshots/dashboard-hero.png",
    callout: { label: "One login, whole business", top: "40%", left: "28%", arrow: "down" },
  },
  {
    index: "03",
    title: "Agents do the",
    highlight: "busywork",
    body: "Ask SaaSy watches deadlines, scores customers, and drafts the follow-up — then tells you what it did.",
    screenshot: "screenshots/ask-saasy.png",
    callout: { label: "Work done, not just charted", top: "18%", left: "32%", arrow: "up" },
  },
  {
    index: "04",
    title: "Stay compliant,",
    highlight: "get paid",
    body: "Native payroll in all 50 states plus DC, certified payroll for government work, and filings tracked before they bite.",
    screenshot: "screenshots/wh347-certified-payroll.png",
    callout: { label: "Payroll built in", top: "36%", left: "30%", arrow: "up" },
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      <BrandBackground />

      <Sequence durationInFrames={150} layout="none">
        <Intro />
      </Sequence>

      {steps.map((step, i) => (
        <Sequence
          key={step.index}
          from={150 + i * STEP_LEN}
          durationInFrames={STEP_LEN}
          layout="none"
        >
          <Step {...step} />
        </Sequence>
      ))}

      <Sequence from={150 + steps.length * STEP_LEN} durationInFrames={300} layout="none">
        <Outro />
      </Sequence>

      {/* <Audio src={staticFile("voiceover.mp3")} /> */}
    </AbsoluteFill>
  );
};

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [8, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
      <div style={{ opacity: p, translate: `0px ${(1 - p) * 24}px` }}>
        <Logo height={64} style={{ margin: "0 auto 36px" }} />
        <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 84, color: COLORS.white }}>
          How <GradientText style={{ fontSize: 84 }}>SaaSy</GradientText> works
        </div>
        <Caption enterAt={24} hold style={{ marginTop: 24, fontSize: 38, color: COLORS.muted }}>
          Your whole back office, run by one platform — in four steps
        </Caption>
      </div>
    </AbsoluteFill>
  );
};

const Step: React.FC<(typeof steps)[number]> = ({
  index,
  title,
  highlight,
  body,
  screenshot,
  callout,
}) => {
  const frame = useCurrentFrame();
  const headerP = interpolate(frame, [6, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  // Hold the step visible, fade out in its final 14 frames for a clean cut.
  const out = interpolate(frame, [STEP_LEN - 16, STEP_LEN - 2], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity: out,
        flexDirection: "row",
        alignItems: "center",
        padding: "0 96px",
        gap: 64,
      }}
    >
      <div style={{ flex: "0 0 38%", opacity: headerP, translate: `${(1 - headerP) * -24}px 0px` }}>
        <GradientText style={{ fontSize: 110, fontWeight: 800 }}>{index}</GradientText>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 60,
            lineHeight: 1.1,
            color: COLORS.white,
            marginTop: 8,
          }}
        >
          {title} <GradientText style={{ fontSize: 60 }}>{highlight}</GradientText>
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 400,
            fontSize: 32,
            lineHeight: 1.5,
            color: COLORS.muted,
            marginTop: 28,
          }}
        >
          {body}
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <ScreenshotCard src={screenshot} width={900} enterAt={10}>
          <Callout {...callout} enterAt={40} />
        </ScreenshotCard>
      </div>
    </AbsoluteFill>
  );
};

const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [6, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  const pulse = 1 + 0.03 * Math.sin(frame / 8);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
      <div style={{ opacity: p, translate: `0px ${(1 - p) * 24}px` }}>
        <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 80, color: COLORS.white, marginBottom: 40 }}>
          Ready to meet your <GradientText style={{ fontSize: 80 }}>co-founder?</GradientText>
        </div>
        <div style={{ display: "inline-block", scale: String(pulse) }}>
          <Pill variant="cta">Start your free trial</Pill>
        </div>
        <div style={{ fontFamily: FONT, fontSize: 28, color: COLORS.muted, marginTop: 28 }}>
          hellosaasy.ai · 14-day free trial, no credit card
        </div>
      </div>
    </AbsoluteFill>
  );
};
