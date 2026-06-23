import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, EASE_OUT, FONT } from "./theme";

/**
 * Fade/slide-up caption line. Since the videos ship silent (autoplay-muted),
 * captions carry the narrative. Auto fades out near the end of its Sequence
 * unless `hold` is set.
 */
export const Caption: React.FC<{
  children: React.ReactNode;
  enterAt?: number;
  hold?: boolean;
  align?: "center" | "left";
  style?: React.CSSProperties;
}> = ({ children, enterAt = 0, hold = false, align = "center", style }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const enter = interpolate(frame, [enterAt, enterAt + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  const exit = hold
    ? 1
    : interpolate(frame, [durationInFrames - 12, durationInFrames - 2], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
  const opacity = Math.min(enter, exit);

  return (
    <div
      style={{
        fontFamily: FONT,
        color: COLORS.text,
        textAlign: align,
        opacity,
        translate: `0px ${interpolate(enter, [0, 1], [16, 0])}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
