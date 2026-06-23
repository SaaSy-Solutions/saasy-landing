import { Img, staticFile } from "remotion";

/** The white SaaSy wordmark from the site (public/logo-white.png). */
export const Logo: React.FC<{ height?: number; style?: React.CSSProperties }> = ({
  height = 64,
  style,
}) => {
  return (
    <Img
      src={staticFile("logo-white.png")}
      style={{ height, width: "auto", display: "block", ...style }}
    />
  );
};
