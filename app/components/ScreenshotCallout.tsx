interface ScreenshotCalloutProps {
  /** Top offset as a percentage of the parent screenshot height (e.g. "20%"). */
  top: string;
  /** Left offset as a percentage of the parent screenshot width (e.g. "60%"). */
  left: string;
  /** Direction the arrow points (toward the highlighted UI element). */
  arrow: "up" | "down" | "left" | "right";
  /** Callout label text. */
  label: string;
}

const ARROW_PATHS: Record<ScreenshotCalloutProps["arrow"], string> = {
  up: "M12 4l-4 6h8l-4-6z",
  down: "M12 20l4-6H8l4 6z",
  left: "M4 12l6-4v8l-6-4z",
  right: "M20 12l-6 4V8l6 4z",
};

const ARROW_POSITION: Record<
  ScreenshotCalloutProps["arrow"],
  string
> = {
  up: "left-1/2 -top-3 -translate-x-1/2",
  down: "left-1/2 -bottom-3 -translate-x-1/2",
  left: "-left-3 top-1/2 -translate-y-1/2",
  right: "-right-3 top-1/2 -translate-y-1/2",
};

/**
 * Positioned annotation pill rendered absolutely over a screenshot
 * container. Parent must be `relative`.
 */
export function ScreenshotCallout({
  top,
  left,
  arrow,
  label,
}: ScreenshotCalloutProps): React.ReactElement {
  return (
    <div
      className="absolute z-10"
      style={{ top, left }}
    >
      <div
        className="relative rounded-full border border-saasy-pink/40
          bg-saasy-darker/90 px-3 py-1.5 shadow-lg backdrop-blur-sm
          font-[family-name:var(--font-poppins)] text-xs
          font-medium text-white"
      >
        {label}
        <svg
          className={`absolute h-4 w-4 text-saasy-pink/80
            ${ARROW_POSITION[arrow]}`}
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d={ARROW_PATHS[arrow]} />
        </svg>
      </div>
    </div>
  );
}
