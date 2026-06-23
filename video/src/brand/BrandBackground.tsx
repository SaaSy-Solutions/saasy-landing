import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, EASE_IN_OUT } from "./theme";

/**
 * Animated dark background mirroring the site's `.hero-gradient` +
 * `.grid-pattern`: radial pink/orange glows that slowly drift, over a fine
 * grid on the dark base. Pure inline styles — no CSS animations (forbidden in
 * Remotion renders).
 */
export const BrandBackground: React.FC<{ gridOpacity?: number }> = ({
  gridOpacity = 0.04,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Slow drift across the whole clip so a loop feels alive but seamless.
  const drift = interpolate(frame, [0, durationInFrames], [0, 1], {
    easing: EASE_IN_OUT,
  });
  const gx = interpolate(drift, [0, 1], [20, 35]);
  const gy = interpolate(drift, [0, 1], [10, 25]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(60% 50% at ${gx}% ${gy}%, ${COLORS.pink}22, transparent 70%),
            radial-gradient(55% 45% at ${100 - gx}% ${80 - gy}%, ${COLORS.orange}1c, transparent 70%),
            radial-gradient(50% 60% at 50% 120%, ${COLORS.rose}22, transparent 70%)
          `,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: `
            linear-gradient(${COLORS.text}${alpha(gridOpacity)} 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.text}${alpha(gridOpacity)} 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(80% 80% at 50% 40%, black, transparent)",
        }}
      />
    </AbsoluteFill>
  );
};

// Convert a 0–1 opacity into a 2-digit hex alpha suffix.
function alpha(o: number): string {
  return Math.round(Math.max(0, Math.min(1, o)) * 255)
    .toString(16)
    .padStart(2, "0");
}
