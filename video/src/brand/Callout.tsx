import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, EASE_OUT, FONT } from "./theme";

type Arrow = "up" | "down" | "left" | "right";

/**
 * Animated pill annotation with a directional arrow — the motion version of
 * the site's `ScreenshotCallout`. Positioned absolutely over a ScreenshotCard.
 * `top`/`left` are percentages of the parent.
 */
export const Callout: React.FC<{
  label: string;
  top: string;
  left: string;
  arrow?: Arrow;
  enterAt?: number;
}> = ({ label, top, left, arrow = "down", enterAt = 0 }) => {
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
        top,
        left,
        opacity: p,
        translate: `0px ${interpolate(p, [0, 1], [10, 0])}px`,
        scale: interpolate(p, [0, 1], [0.9, 1]),
        display: "flex",
        flexDirection:
          arrow === "up" ? "column-reverse" : arrow === "down" ? "column" : "row",
        alignItems: "center",
        gap: 6,
      }}
    >
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 600,
          fontSize: 22,
          color: COLORS.white,
          background: COLORS.rose,
          padding: "10px 18px",
          borderRadius: 999,
          whiteSpace: "nowrap",
          boxShadow: "0 12px 30px #00000066",
        }}
      >
        {label}
      </div>
      <ArrowGlyph arrow={arrow} />
    </div>
  );
};

const ArrowGlyph: React.FC<{ arrow: Arrow }> = ({ arrow }) => {
  const rotate = { down: 180, up: 0, left: 90, right: -90 }[arrow];
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" style={{ rotate: `${rotate}deg` }}>
      <path
        d="M12 3 L12 21 M12 3 L6 9 M12 3 L18 9"
        stroke={COLORS.pink}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};
