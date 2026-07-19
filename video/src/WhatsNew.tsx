import { z } from "zod";
import {
  AbsoluteFill,
  interpolate,
  Series,
  useCurrentFrame,
} from "remotion";
import { BrandBackground, COLORS, EASE_OUT, FONT, AccentText, Logo } from "./brand";
import changelog from "../../app/changelog/changelog.json";

/**
 * "What's new" release reel (1280×720, silent + captions). Cycles through the
 * most recent releases — newest first — as a momentum reel, cross-dissolving
 * between scenes. Driven entirely by app/changelog/changelog.json (the single
 * source of truth shared with app/changelog/page.tsx) and re-rendered on
 * changelog changes by .github/workflows/render-whatsnew.yml. The output
 * filename is version-stamped (whats-new-<latest version>.mp4) so each release
 * is a fresh, cache-busted asset.
 */

const sceneSchema = z.object({
  version: z.string(),
  title: z.string(),
  items: z.array(z.object({ type: z.enum(["New", "Improved", "Fixed"]), text: z.string() })),
});
export const whatsNewSchema = z.object({ scenes: z.array(sceneSchema) });

export type WhatsNewScene = z.infer<typeof sceneSchema>;
export type WhatsNewProps = z.infer<typeof whatsNewSchema>;

const TYPE_COLOR: Record<string, string> = {
  New: COLORS.pink,
  Improved: COLORS.orange,
  Fixed: COLORS.muted,
};

/** changelog.json item type -> clip badge label. */
const TYPE_LABEL: Record<string, "New" | "Improved" | "Fixed"> = {
  feature: "New",
  improvement: "Improved",
  fix: "Fixed",
};

// How many releases to cycle through, how many items per scene, and the per-scene
// timing. Kept small so the loop stays watchable (full history lives as text on
// the changelog page below the clip).
const MAX_SCENES = 3;
const MAX_ITEMS = 4;
const SCENE_FRAMES = 210; // 7s per release at 30fps
const FADE_FRAMES = 18; // cross-dissolve / overlap window

/** Build the scene list from the newest changelog entries. */
const buildScenes = (): WhatsNewScene[] =>
  changelog.entries.slice(0, MAX_SCENES).map((entry) => ({
    version: entry.version,
    title: entry.title,
    items: entry.items
      .slice(0, MAX_ITEMS)
      .map((item) => ({ type: TYPE_LABEL[item.type] ?? "New", text: item.text })),
  }));

export const whatsNewScenes: WhatsNewScene[] = buildScenes();
export const whatsNewDefault: WhatsNewProps = { scenes: whatsNewScenes };

/** Total composition length for the cross-dissolved Series (see Root.tsx). */
export const whatsNewDuration =
  SCENE_FRAMES + Math.max(0, whatsNewScenes.length - 1) * (SCENE_FRAMES - FADE_FRAMES);

const Scene: React.FC<WhatsNewScene> = ({ version, title, items }) => {
  const frame = useCurrentFrame();
  // Fade the whole scene in/out so overlapping Series sequences cross-dissolve.
  const enter = interpolate(frame, [0, FADE_FRAMES], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  const exit = interpolate(frame, [SCENE_FRAMES - FADE_FRAMES, SCENE_FRAMES], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const head = interpolate(frame, [2, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  return (
    <AbsoluteFill style={{ opacity: enter * exit }}>
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
            What&rsquo;s <AccentText style={{ fontSize: 52 }}>new</AccentText> — {title}
          </div>
        </div>

        <div style={{ marginTop: 44, display: "flex", flexDirection: "column", gap: 20 }}>
          {items.map((item, i) => {
            const at = 24 + i * 14;
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

export const WhatsNew: React.FC<WhatsNewProps> = ({ scenes }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      <BrandBackground />
      <Series>
        {scenes.map((scene, i) => (
          <Series.Sequence
            key={`${scene.version}-${i}`}
            durationInFrames={SCENE_FRAMES}
            // Overlap each scene with the previous one so they cross-dissolve.
            offset={i === 0 ? 0 : -FADE_FRAMES}
          >
            <Scene {...scene} />
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};
