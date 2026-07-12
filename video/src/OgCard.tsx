import { z } from "zod";
import { AbsoluteFill } from "remotion";
import { BrandBackground, COLORS, FONT, GradientText, Logo } from "./brand";

/**
 * Open Graph / social share card (1200×630, rendered as a still). One
 * parameterized composition → one PNG per page and per blog post, served from
 * assets.hellosaasy.ai/og/. Reuses the brand kit so share cards match the site.
 *
 * Must read at thumbnail size: large high-contrast title, minimal text.
 */
export const ogCardSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  /** Optional trailing fragment rendered in the brand gradient. */
  highlight: z.string().optional(),
});

export type OgCardProps = z.infer<typeof ogCardSchema>;

export const OgCard: React.FC<OgCardProps> = ({ eyebrow, title, highlight }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      <BrandBackground gridOpacity={0.05} />
      <AbsoluteFill
        style={{ padding: 80, justifyContent: "space-between" }}
      >
        {/* Top row: logo + eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Logo height={52} />
          <span
            style={{
              fontFamily: FONT,
              fontWeight: 600,
              fontSize: 24,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: COLORS.pink,
              borderLeft: `2px solid ${COLORS.border}`,
              paddingLeft: 24,
            }}
          >
            {eyebrow}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: title.length > 60 ? 60 : 72,
            lineHeight: 1.08,
            color: COLORS.white,
            maxWidth: 1000,
          }}
        >
          {title}
          {highlight ? (
            <>
              {" "}
              <GradientText style={{ fontSize: "inherit" }}>{highlight}</GradientText>
            </>
          ) : null}
        </div>

        {/* Footer: domain + tagline */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{ fontFamily: FONT, fontWeight: 700, fontSize: 30, color: COLORS.white }}
          >
            hellosaasy.ai
          </span>
          <span
            style={{ fontFamily: FONT, fontSize: 26, color: COLORS.muted }}
          >
            Your intelligent business co-founder
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * Card definitions. `name` becomes the PNG filename (og/<name>.png). Marketing
 * pages are static; blog cards are generated from the post list at render time.
 */
export const ogCards: { name: string; props: OgCardProps }[] = [
  { name: "home", props: { eyebrow: "Business OS", title: "Your intelligent business", highlight: "co-founder" } },
  { name: "features", props: { eyebrow: "Features", title: "What you actually", highlight: "see" } },
  { name: "pricing", props: { eyebrow: "Pricing", title: "Simple, transparent", highlight: "pricing" } },
  { name: "integrations", props: { eyebrow: "Integrations", title: "Connect the tools you", highlight: "already use" } },
  { name: "customers", props: { eyebrow: "Customers", title: "Built for founders who", highlight: "wear every hat" } },
  { name: "compare", props: { eyebrow: "Compare", title: "SaaSy vs the", highlight: "alternatives" } },
  { name: "services", props: { eyebrow: "Services", title: "Custom automations &", highlight: "consulting" } },
  { name: "blog", props: { eyebrow: "Blog", title: "Ideas for", highlight: "building smarter" } },
  { name: "contact", props: { eyebrow: "Contact", title: "Talk to a", highlight: "human" } },
];
