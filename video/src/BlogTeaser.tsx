import { z } from "zod";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
} from "remotion";
import {
  BrandBackground,
  Caption,
  COLORS,
  EASE_OUT,
  FONT,
  GradientText,
  Logo,
  Pill,
} from "./brand";

/**
 * Per-post blog teaser (1080×1080, ~10s, silent + captions). A distribution
 * asset: post it on X/LinkedIn alongside the article link. One composition,
 * rendered once per post from the title/readTime.
 */
export const blogTeaserSchema = z.object({
  title: z.string(),
  readTime: z.string(),
  kicker: z.string().default("From the SaaSy blog"),
});

export type BlogTeaserProps = z.infer<typeof blogTeaserSchema>;

export const BlogTeaser: React.FC<BlogTeaserProps> = ({ title, readTime, kicker }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      <BrandBackground />

      <Sequence durationInFrames={300} layout="none">
        <Body title={title} readTime={readTime} kicker={kicker} />
      </Sequence>
    </AbsoluteFill>
  );
};

const Body: React.FC<BlogTeaserProps> = ({ title, readTime, kicker }) => {
  const frame = useCurrentFrame();
  const kick = interpolate(frame, [4, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  const titleP = interpolate(frame, [16, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  return (
    <AbsoluteFill style={{ padding: 80, justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20, opacity: kick }}>
        <Logo height={46} />
      </div>

      <div>
        <Pill style={{ opacity: kick, marginBottom: 28 }}>{kicker}</Pill>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: title.length > 60 ? 60 : 72,
            lineHeight: 1.1,
            color: COLORS.white,
            opacity: titleP,
            translate: `0px ${(1 - titleP) * 24}px`,
          }}
        >
          {title}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: FONT, fontSize: 28, color: COLORS.muted }}>{readTime}</span>
        <Caption enterAt={70} hold style={{ fontSize: 30, fontWeight: 600 }}>
          Read it at <GradientText style={{ fontSize: 30 }}>hellosaasy.ai/blog</GradientText>
        </Caption>
      </div>
    </AbsoluteFill>
  );
};
