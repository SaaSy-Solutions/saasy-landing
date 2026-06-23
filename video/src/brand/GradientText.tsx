import React from "react";
import { BRAND_GRADIENT, FONT } from "./theme";

/**
 * Pink→orange gradient headline text, the brand's `.gradient-text` utility.
 * `style` overrides win so callers can set size / weight per scene.
 */
export const GradientText: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => {
  return (
    <span
      style={{
        fontFamily: FONT,
        fontWeight: 800,
        backgroundImage: BRAND_GRADIENT,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
        ...style,
      }}
    >
      {children}
    </span>
  );
};
