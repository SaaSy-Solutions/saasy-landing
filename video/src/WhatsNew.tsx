import { z } from "zod";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { BrandBackground, COLORS, EASE_OUT, FONT, GradientText, Logo } from "./brand";

/**
 * "What's new" release clip (1280×720, ~12s, silent + captions). Parameterized
 * by a changelog entry so it can be re-rendered each release. Defaults to the
 * latest entry (see whatsNewLatest). Embedded on /changelog and shareable.
 */
export const whatsNewSchema = z.object({
  version: z.string(),
  title: z.string(),
  items: z.array(z.object({ type: z.enum(["New", "Improved", "Fixed"]), text: z.string() })),
});

export type WhatsNewProps = z.infer<typeof whatsNewSchema>;

const TYPE_COLOR: Record<string, string> = {
  New: COLORS.pink,
  Improved: COLORS.orange,
  Fixed: COLORS.muted,
};

export const WhatsNew: React.FC<WhatsNewProps> = ({ version, title, items }) => {
  const frame = useCurrentFrame();
  const head = interpolate(frame, [4, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      <BrandBackground />
      <AbsoluteFill style={{ padding: 72, justifyContent: "center" }}>
        <div style={{ opacity: head, translate: `0px ${(1 - head) * 20}px` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 8 }}>
            <Logo height={40} />
            <span
              style={{
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: 22,
                color: COLORS.pink,
                border: `1px solid ${COLORS.pink}44`,
                borderRadius: 999,
                padding: "4px 16px",
              }}
            >
              v{version}
            </span>
          </div>
          <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 52, color: COLORS.white }}>
            What&rsquo;s <GradientText style={{ fontSize: 52 }}>new</GradientText> — {title}
          </div>
        </div>

        <div style={{ marginTop: 44, display: "flex", flexDirection: "column", gap: 20 }}>
          {items.map((item, i) => {
            const at = 30 + i * 16;
            const p = interpolate(frame, [at, at + 14], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE_OUT,
            });
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  opacity: p,
                  translate: `${(1 - p) * -24}px 0px`,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT,
                    fontWeight: 700,
                    fontSize: 20,
                    color: COLORS.white,
                    background: TYPE_COLOR[item.type],
                    borderRadius: 8,
                    padding: "4px 12px",
                    minWidth: 110,
                    textAlign: "center",
                  }}
                >
                  {item.type}
                </span>
                <span style={{ fontFamily: FONT, fontSize: 30, color: COLORS.text }}>
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Latest changelog entry — mirror app/changelog/page.tsx. */
export const whatsNewLatest: WhatsNewProps = {
  version: "1.4.0",
  title: "ROI Calculator & International Support",
  items: [
    { type: "New", text: "ROI savings calculator on the pricing page" },
    { type: "New", text: "Country selector with US/Canada state & province support" },
    { type: "Improved", text: "Signup form trimmed from 6 fields to 4" },
    { type: "Fixed", text: "Added Content Security Policy headers" },
  ],
};
