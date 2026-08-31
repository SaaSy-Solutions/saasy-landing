import React from "react";
import { COLORS, FONT } from "./theme";

/**
 * Solid pink accent for emphasis words inside headlines — the motion version
 * of the site's `.accent-word`. The brand guide retired gradient text;
 * emphasis is a solid brand color, not decoration.
 * `style` overrides win so callers can set size / weight per scene.
 */
export const AccentText: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => {
  return (
    <span
      style={{
        fontFamily: FONT,
        fontWeight: 800,
        color: COLORS.pink,
        ...style,
      }}
    >
      {children}
    </span>
  );
};
