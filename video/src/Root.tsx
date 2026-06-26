import "./index.css";
import { Composition } from "remotion";
import { HeroLoop } from "./HeroLoop";
import { FeatureLoop, featureLoopSchema, featureVariants } from "./FeatureLoop";
import { SocialAd, socialAdSchema, SocialAdProps } from "./SocialAd";
import { HowItWorks } from "./HowItWorks";
import { OgCard, ogCardSchema, ogCards } from "./OgCard";
import { BlogTeaser, blogTeaserSchema } from "./BlogTeaser";
import { FeatureClip, featureClipSchema, featureClips } from "./FeatureClip";
import { WhatsNew, whatsNewSchema, whatsNewDefault, whatsNewDuration } from "./WhatsNew";
import { ConnectLoop } from "./ConnectLoop";
import { POSTS } from "./data/posts";

/**
 * SaaSy marketing video system. All compositions share the brand kit in
 * src/brand/ and render MP4s into ../public/videos/ (see video/README.md).
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Hero demo loop — 30s, embedded in the site hero (autoplay/muted/loop). */}
      <Composition
        id="HeroLoop"
        component={HeroLoop}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Feature micro-loops — one composition, three variants. */}
      <Composition
        id="FeatureHealth"
        component={FeatureLoop}
        schema={featureLoopSchema}
        defaultProps={featureVariants.health}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="FeatureChurn"
        component={FeatureLoop}
        schema={featureLoopSchema}
        defaultProps={featureVariants.churn}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="FeatureAsk"
        component={FeatureLoop}
        schema={featureLoopSchema}
        defaultProps={featureVariants.ask}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1080}
      />

      {/* Social ad — same composition, two aspect ratios via calculateMetadata. */}
      <Composition
        id="SocialVertical"
        component={SocialAd}
        schema={socialAdSchema}
        defaultProps={{ format: "vertical" } as SocialAdProps}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        calculateMetadata={({ props }) => socialDimensions(props)}
      />
      <Composition
        id="SocialSquare"
        component={SocialAd}
        schema={socialAdSchema}
        defaultProps={{ format: "square" } as SocialAdProps}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1080}
        calculateMetadata={({ props }) => socialDimensions(props)}
      />

      {/* "How it works" explainer — 75s. */}
      <Composition
        id="HowItWorks"
        component={HowItWorks}
        durationInFrames={2250}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* OG / social share card — rendered as a still per page/post via --props. */}
      <Composition
        id="OgCard"
        component={OgCard}
        schema={ogCardSchema}
        defaultProps={ogCards[0].props}
        durationInFrames={1}
        fps={30}
        width={1200}
        height={630}
      />

      {/* Per-post blog teaser — rendered once per post via --props. */}
      <Composition
        id="BlogTeaser"
        component={BlogTeaser}
        schema={blogTeaserSchema}
        defaultProps={{ title: POSTS[0].title, readTime: POSTS[0].readTime, kicker: "From the SaaSy blog" }}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1080}
      />

      {/* Text-free feature clips for the /features showcase rows. */}
      <Composition
        id="FeatureClip"
        component={FeatureClip}
        schema={featureClipSchema}
        defaultProps={featureClips.health}
        durationInFrames={180}
        fps={30}
        width={1200}
        height={900}
      />

      {/* "What's new" reel — cycles the latest changelog entries, newest first. */}
      <Composition
        id="WhatsNew"
        component={WhatsNew}
        schema={whatsNewSchema}
        defaultProps={whatsNewDefault}
        durationInFrames={whatsNewDuration}
        fps={30}
        width={1280}
        height={720}
      />

      {/* Integrations "connected in a minute" loop. */}
      <Composition
        id="ConnectLoop"
        component={ConnectLoop}
        durationInFrames={240}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};

function socialDimensions(props: SocialAdProps) {
  return props.format === "vertical"
    ? { width: 1080, height: 1920 }
    : { width: 1080, height: 1080 };
}
