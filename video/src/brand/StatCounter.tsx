import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT } from "./theme";
import { EASE_OUT } from "./theme";

/**
 * Number that animates from `from` to `to` over a frame window. Used for
 * health scores, at-risk counts, revenue figures, etc.
 */
export const StatCounter: React.FC<{
  from?: number;
  to: number;
  startFrame?: number;
  durationInFrames?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  style?: React.CSSProperties;
}> = ({
  from = 0,
  to,
  startFrame = 0,
  durationInFrames = 30,
  decimals = 0,
  prefix = "",
  suffix = "",
  style,
}) => {
  const frame = useCurrentFrame();
  const value = interpolate(
    frame,
    [startFrame, startFrame + durationInFrames],
    [from, to],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_OUT },
  );

  return (
    <span
      style={{
        fontFamily: FONT,
        fontWeight: 800,
        fontVariantNumeric: "tabular-nums",
        color: COLORS.white,
        ...style,
      }}
    >
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
};
