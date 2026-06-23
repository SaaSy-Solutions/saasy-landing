import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BrandBackground, Callout, Caption, COLORS, EASE_OUT, FONT } from "./brand";

/**
 * Integrations "connected in a minute" loop (1280×720, ~8s, silent, looping).
 * Shows the integrations screen with connector chips flipping to "Connected",
 * for the /integrations page. Reuses the real integrations.png.
 */
const CONNECTORS = ["Stripe", "HubSpot", "Salesforce", "Slack"];

export const ConnectLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fade = Math.min(
    interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const rise = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      <BrandBackground />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: fade, padding: 64 }}>
        <div
          style={{
            position: "relative",
            width: "78%",
            translate: `0px ${interpolate(rise, [0, 1], [24, 0])}px`,
          }}
        >
          <Img
            src={staticFile("screenshots/integrations.png")}
            style={{
              width: "100%",
              display: "block",
              borderRadius: 16,
              border: `1px solid ${COLORS.border}`,
              boxShadow: "0 30px 80px #00000055",
            }}
          />
          <Callout label="Connected in about a minute" top="14%" left="30%" arrow="up" enterAt={26} />
        </div>

        {/* Connector chips flipping to "Connected" one by one */}
        <div style={{ display: "flex", gap: 16, marginTop: 36 }}>
          {CONNECTORS.map((name, i) => {
            const at = 36 + i * 14;
            const on = interpolate(frame, [at, at + 12], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE_OUT,
            });
            return (
              <div
                key={name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: FONT,
                  fontWeight: 600,
                  fontSize: 24,
                  color: COLORS.white,
                  background: COLORS.card,
                  border: `1px solid ${on > 0.5 ? COLORS.pink : COLORS.border}`,
                  borderRadius: 999,
                  padding: "10px 20px",
                }}
              >
                {name}
                <span
                  style={{
                    color: COLORS.pink,
                    opacity: on,
                    scale: String(interpolate(on, [0, 1], [0.4, 1])),
                  }}
                >
                  ✓
                </span>
              </div>
            );
          })}
        </div>
        <Caption enterAt={90} hold style={{ marginTop: 28, fontSize: 30, fontWeight: 600 }}>
          OAuth in a click — no CSV uploads
        </Caption>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
