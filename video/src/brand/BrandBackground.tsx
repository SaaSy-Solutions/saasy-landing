import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "./theme";

/**
 * Animated dark background mirroring the site's Living Geometry system
 * (`.lg-grid` + `.lg-shape-*`): a fine dot grid with drifting OUTLINED
 * geometric shapes. The old radial pink/orange glows are gone — the brand
 * guide's sanctioned accents are geometric shapes, not glows. Pure inline
 * styles + frame interpolation (no CSS animations in Remotion renders).
 * All motion is sinusoidal, so loops close seamlessly.
 */
export const BrandBackground: React.FC<{ intensity?: number }> = ({
  intensity = 1,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = (frame / durationInFrames) * Math.PI * 2; // one full cycle per clip

  // Drift offsets: gentle, periodic, and phase-shifted per shape.
  const ax = Math.sin(t) * 40;
  const ay = Math.cos(t) * 26;
  const bx = Math.sin(t + Math.PI / 2) * -30;
  const by = Math.cos(t + Math.PI / 2) * 24;
  const cx = Math.sin(t + Math.PI) * 22;
  const cy = Math.cos(t + Math.PI) * -30;

  const shape = (
    size: number,
    borderColor: string,
    extra: React.CSSProperties,
  ): React.CSSProperties => ({
    position: "absolute",
    width: size,
    height: size,
    border: `1.5px solid ${borderColor}`,
    opacity: intensity,
    ...extra,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      {/* Dot grid (`.lg-grid`): 1px dots on a 28px pitch, radial mask */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(circle, ${COLORS.muted}17 1px, transparent 1.4px)`,
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 30%, black 55%, transparent 100%)",
          opacity: 0.6 * intensity,
        }}
      />
      {/* Rounded square, top-left (`.lg-shape-1`) */}
      <div
        style={shape(240, `${COLORS.pink}42`, {
          borderRadius: 42,
          top: "8%",
          left: -60,
          translate: `${ax}px ${ay}px`,
          rotate: `${Math.sin(t) * 8}deg`,
        })}
      />
      {/* Diamond, mid-right (`.lg-shape-2`) */}
      <div
        style={shape(150, `${COLORS.orange}47`, {
          top: "54%",
          right: "6%",
          translate: `${bx}px ${by}px`,
          rotate: `${45 + Math.sin(t + Math.PI / 2) * 7}deg`,
        })}
      />
      {/* Circle, upper-right (`.lg-shape-3`) */}
      <div
        style={shape(120, `${COLORS.rose}80`, {
          borderRadius: 999,
          top: "18%",
          right: "16%",
          translate: `${cx}px ${cy}px`,
        })}
      />
      {/* Small filled rounded square, lower-left (`.lg-shape-4`) */}
      <div
        style={{
          position: "absolute",
          width: 60,
          height: 60,
          borderRadius: 14,
          background: `${COLORS.pink}1a`,
          bottom: "12%",
          left: "12%",
          opacity: intensity,
          translate: `${bx * -0.8}px ${by * -0.8}px`,
        }}
      />
    </AbsoluteFill>
  );
};
