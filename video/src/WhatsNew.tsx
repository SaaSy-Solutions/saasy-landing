import { z } from "zod";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { BrandBackground, COLORS, EASE_OUT, FONT, GradientText, Logo } from "./brand";
import changelog from "../../app/changelog/changelog.json";

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
                  alignItems: "flex-start",
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
                    flexShrink: 0,
                    marginTop: 4,
                  }}
                >
                  {item.type}
                </span>
                {/* Clamp to 2 lines so long changelog copy can't overflow 720p. */}
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 28,
                    lineHeight: 1.25,
                    color: COLORS.text,
                    maxWidth: 940,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
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

/** changelog.json item type -> clip badge label. */
const TYPE_LABEL: Record<string, "New" | "Improved" | "Fixed"> = {
  feature: "New",
  improvement: "Improved",
  fix: "Fixed",
};

// How many items the clip shows before it gets too dense to read at 720p.
const MAX_ITEMS = 5;

/**
 * Latest release clip, derived from the newest entry in
 * app/changelog/changelog.json (the single source of truth shared with
 * app/changelog/page.tsx). Re-rendered on changelog changes by
 * .github/workflows/render-whatsnew.yml. The output filename is version-stamped
 * (whats-new-<version>.mp4) so each release is a fresh, cache-busted asset.
 */
const latest = changelog.entries[0];
export const whatsNewLatest: WhatsNewProps = {
  version: latest.version,
  title: latest.title,
  items: latest.items
    .slice(0, MAX_ITEMS)
    .map((item) => ({ type: TYPE_LABEL[item.type] ?? "New", text: item.text })),
};
