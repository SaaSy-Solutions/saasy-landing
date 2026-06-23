import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { COLORS, EASE_OUT } from "./theme";

/**
 * Glow-bordered rounded card wrapping a product screenshot, matching the
 * site's `.glow-border` screenshot frames. Animates in with a soft rise +
 * scale. `enterAt` is the local frame (within the parent Sequence) at which
 * the entrance begins.
 */
export const ScreenshotCard: React.FC<{
  src: string;
  enterAt?: number;
  width?: number;
  children?: React.ReactNode; // callout overlays positioned over the image
  style?: React.CSSProperties;
}> = ({ src, enterAt = 0, width = 980, children, style }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [enterAt, enterAt + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  return (
    <div
      style={{
        position: "relative",
        width,
        opacity: progress,
        translate: `0px ${interpolate(progress, [0, 1], [40, 0])}px`,
        scale: interpolate(progress, [0, 1], [0.96, 1]),
        ...style,
      }}
    >
      {/* Outer glow */}
      <div
        style={{
          position: "absolute",
          inset: -16,
          borderRadius: 28,
          background: `linear-gradient(135deg, ${COLORS.pink}14, ${COLORS.orange}14)`,
          filter: "blur(28px)",
        }}
      />
      {/* Card frame */}
      <div
        style={{
          position: "relative",
          borderRadius: 20,
          padding: 10,
          background: `${COLORS.card}cc`,
          border: `1px solid ${COLORS.border}`,
          boxShadow: `0 0 0 1px ${COLORS.pink}22, 0 30px 80px #00000066`,
          overflow: "hidden",
        }}
      >
        <Img
          src={staticFile(src)}
          style={{ width: "100%", display: "block", borderRadius: 12 }}
        />
        {children}
      </div>
    </div>
  );
};
