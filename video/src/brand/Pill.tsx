import { COLORS, FONT } from "./theme";

/**
 * Small rounded badge, e.g. the site's "Now in beta — early access open" chip
 * (pink dot + pink text) and the pink CTA button.
 */
export const Pill: React.FC<{
  children: React.ReactNode;
  variant?: "beta" | "cta";
  style?: React.CSSProperties;
}> = ({ children, variant = "beta", style }) => {
  if (variant === "cta") {
    return (
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 28,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          color: COLORS.white,
          background: COLORS.pink,
          padding: "20px 44px",
          borderRadius: 999,
          boxShadow: `0 18px 50px ${COLORS.pink}66`,
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
  return (
    <div
      style={{
        fontFamily: FONT,
        fontSize: 24,
        color: COLORS.pink,
        background: `${COLORS.pink}0d`,
        border: `1px solid ${COLORS.pink}33`,
        padding: "10px 22px",
        borderRadius: 999,
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        ...style,
      }}
    >
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: 999,
          background: COLORS.pink,
          display: "inline-block",
        }}
      />
      {children}
    </div>
  );
};
