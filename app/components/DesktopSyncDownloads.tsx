"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_UPDATE_FEED_URL,
  detectOs,
  downloadsByOs,
  downloadsFromManifest,
  fetchUpdateManifest,
  type DesktopDownload,
  type OsFamily,
  type UpdateManifest,
} from "@/lib/desktop-sync/manifest";

/**
 * Feed URL, overridable per-environment. Kept in sync with the Tauri updater
 * and the tenant-portal Apps page — the manifest is the single source of truth,
 * so we never hardcode installer URLs here.
 */
const FEED_URL =
  process.env.NEXT_PUBLIC_DESKTOP_UPDATE_FEED_URL ?? DEFAULT_UPDATE_FEED_URL;

/**
 * Load lifecycle. `unavailable` folds together "no release cut yet", a 404, a
 * network error, and malformed JSON — for a marketing surface these are all the
 * same clean "coming soon" state, never a broken button or a scary error.
 */
type LoadState = "loading" | "ready" | "unavailable";

const OS_META: Record<
  OsFamily,
  { label: string; icon: () => React.ReactElement }
> = {
  windows: { label: "Windows", icon: IconWindows },
  macos: { label: "macOS", icon: IconApple },
  linux: { label: "Linux", icon: IconLinux },
};

const OS_ORDER: OsFamily[] = ["windows", "macos", "linux"];

/**
 * Manifest-driven desktop download surface, mirroring the tenant-portal Apps
 * page (saas-platform #4273). Fetches the R2 update feed client-side (the site
 * is a static export), validates it with a type guard, auto-detects the
 * visitor's OS, and renders one button per available installer format. When the
 * feed is empty / 404 / malformed it renders a "Desktop app coming soon" state.
 */
export function DesktopSyncDownloads(): React.ReactElement {
  const [manifest, setManifest] = useState<UpdateManifest | null>(null);
  const [state, setState] = useState<LoadState>("loading");
  const [detectedOs, setDetectedOs] = useState<OsFamily | null>(null);

  // OS detection is client-only (SSR-safe): seed after mount so the server /
  // static render and the first client paint agree, then highlight the match.
  useEffect(() => {
    setDetectedOs(detectOs());
  }, []);

  const load = useCallback(async () => {
    setState("loading");
    const result = await fetchUpdateManifest(FEED_URL);
    if (result === null) {
      setManifest(null);
      setState("unavailable");
      return;
    }
    const downloads = downloadsFromManifest(result);
    setManifest(result);
    setState(downloads.length > 0 ? "ready" : "unavailable");
  }, []);

  useEffect(() => {
    // fetchUpdateManifest never throws, but guard the promise defensively so a
    // rejection can never surface an unhandled error on a marketing page.
    load().catch(() => setState("unavailable"));
  }, [load]);

  const grouped = useMemo(() => {
    if (!manifest) {
      return null;
    }
    return downloadsByOs(downloadsFromManifest(manifest));
  }, [manifest]);

  return (
    <div className="mx-auto max-w-5xl px-6">
      {state === "loading" && <LoadingState />}

      {state === "unavailable" && <ComingSoon />}

      {state === "ready" && grouped && (
        <>
          {manifest?.version && (
            <p className="mb-8 text-center text-sm text-saasy-muted">
              Latest release{" "}
              <span className="font-semibold text-white">
                v{manifest.version}
              </span>
              {manifest.pub_date && (
                <> &middot; {formatPubDate(manifest.pub_date)}</>
              )}
            </p>
          )}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OS_ORDER.map((os) => (
              <OsDownloadCard
                key={os}
                os={os}
                downloads={grouped[os]}
                highlighted={detectedOs === os}
              />
            ))}
          </div>
        </>
      )}

      <MobileInstall />
    </div>
  );
}

/** A single OS download card with one button per available installer format. */
function OsDownloadCard({
  os,
  downloads,
  highlighted,
}: {
  os: OsFamily;
  downloads: DesktopDownload[];
  highlighted: boolean;
}): React.ReactElement {
  const meta = OS_META[os];
  const Icon = meta.icon;
  const hasDownloads = downloads.length > 0;

  return (
    <div
      className={`flex flex-col rounded-2xl border bg-saasy-card p-6
        transition-colors ${
          highlighted
            ? "border-saasy-pink"
            : "border-saasy-border hover:border-saasy-pink/30"
        }`}
      data-testid={`os-card-${os}`}
    >
      <div className="mb-5 flex items-center gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center
            rounded-xl bg-saasy-darker text-saasy-text"
        >
          <Icon />
        </div>
        <div>
          <h3 className="text-base font-semibold text-white">{meta.label}</h3>
          {highlighted && (
            <span
              className="mt-0.5 inline-flex rounded-full
                bg-saasy-pink/15 px-2 py-0.5 text-[11px]
                font-semibold text-saasy-pink-soft"
            >
              Detected on your device
            </span>
          )}
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-2">
        {hasDownloads ? (
          downloads.map((dl) => (
            <a
              key={dl.url}
              href={dl.url}
              className="inline-flex items-center justify-center gap-2
                rounded-full bg-saasy-rose px-4 py-2.5 text-sm
                font-semibold text-white transition-colors
                hover:bg-saasy-rose-bright focus:outline-none
                focus-visible:ring-2 focus-visible:ring-saasy-pink
                focus-visible:ring-offset-2 focus-visible:ring-offset-saasy-card"
              data-testid={`download-${os}-${dl.format}`}
            >
              <IconDownload />
              Download {dl.format}
            </a>
          ))
        ) : (
          <p className="text-sm text-saasy-muted">Coming soon</p>
        )}
      </div>
    </div>
  );
}

/** The "no signed release yet" state — clean, never a broken button. */
function ComingSoon(): React.ReactElement {
  return (
    <div
      className="flex flex-col items-center rounded-2xl border
        border-saasy-border bg-saasy-card px-6 py-14 text-center"
      data-testid="desktop-coming-soon"
    >
      <div className="mb-5 rounded-2xl bg-saasy-darker p-4 text-saasy-pink">
        <IconDesktop />
      </div>
      <p className="text-lg font-semibold text-white">
        Desktop app coming soon
      </p>
      <p className="mx-auto mt-2 max-w-md text-saasy-muted">
        Signed installers for Windows, macOS, and Linux are on the way. When the
        first release ships it appears here automatically, so there&rsquo;s no
        need to check back. In the meantime you can install SaaSy as a mobile
        web app below.
      </p>
    </div>
  );
}

/** Skeleton shown while the feed is being fetched (pre-hydration and briefly). */
function LoadingState(): React.ReactElement {
  return (
    <div
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      aria-hidden="true"
    >
      {OS_ORDER.map((os) => (
        <div
          key={os}
          className="h-40 animate-pulse rounded-2xl border
            border-saasy-border bg-saasy-card"
        />
      ))}
    </div>
  );
}

/** Mobile PWA "Add to Home Screen" guidance for on-the-go capture. */
function MobileInstall(): React.ReactElement {
  return (
    <div
      className="mt-12 rounded-2xl border border-saasy-border
        bg-saasy-card/50 p-6 sm:p-8"
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="text-saasy-orange">
          <IconPhone />
        </span>
        <h3 className="text-lg font-semibold text-white">
          Install on your phone
        </h3>
      </div>
      <p className="mb-6 max-w-2xl text-saasy-muted">
        Capture receipts and documents on the go &mdash; install SaaSy as a web
        app straight from your phone&rsquo;s browser. No app store needed.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-saasy-border bg-saasy-darker/40 p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
            <IconApple /> iPhone &amp; iPad
          </div>
          <ol className="list-inside list-decimal space-y-1.5 text-sm text-saasy-muted">
            <li>Open this site in Safari.</li>
            <li>
              Tap the <span className="font-medium text-white">Share</span>{" "}
              button.
            </li>
            <li>
              Choose{" "}
              <span className="font-medium text-white">
                Add to Home Screen
              </span>
              .
            </li>
          </ol>
        </div>
        <div className="rounded-xl border border-saasy-border bg-saasy-darker/40 p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
            <IconPhone /> Android
          </div>
          <ol className="list-inside list-decimal space-y-1.5 text-sm text-saasy-muted">
            <li>Open this site in Chrome.</li>
            <li>
              Tap the{" "}
              <span className="font-medium text-white">menu (&#8942;)</span>.
            </li>
            <li>
              Choose{" "}
              <span className="font-medium text-white">
                Add to Home screen
              </span>
              .
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

/** Format an ISO-8601 pub date as a short, locale-friendly day. */
function formatPubDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/* ─────────────────────── Local inline icons ───────────────────────
   Small glyphs kept local to this component (the repo mixes central
   Icons.tsx feature glyphs with inline SVGs in components like SiteNav).
   currentColor everywhere so callers control color via text-* classes. */

function IconWindows(): React.ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3 5.5 10.5 4.4v7.1H3zM10.5 12.5v7.1L3 18.5v-6zM11.6 4.2 21 3v8.5h-9.4zM21 12.5V21l-9.4-1.3v-7.2z" />
    </svg>
  );
}

function IconApple(): React.ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.4 12.9c0-2 1.6-2.9 1.7-3-.9-1.4-2.4-1.5-2.9-1.6-1.2-.1-2.4.7-3 .7s-1.6-.7-2.6-.7c-1.3 0-2.6.8-3.2 2-1.4 2.4-.4 6 1 8 .7.9 1.4 2 2.5 2 1 0 1.3-.6 2.5-.6s1.5.6 2.6.6 1.7-.9 2.4-1.9c.7-1 1-2 1-2.1-.1 0-2-.8-2-3zM14.7 6.3c.5-.7.9-1.6.8-2.6-.8 0-1.8.6-2.4 1.2-.5.6-1 1.5-.8 2.4.9.1 1.8-.4 2.4-1z" />
    </svg>
  );
}

function IconLinux(): React.ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.6c-2.1 0-3.4 1.7-3.4 4 0 1.3.4 2.2.4 3.3 0 1.2-1.1 2.3-1.9 3.9-.7 1.4-1.6 2.7-1.6 4 0 .9.5 1.4 1.3 1.6.6.7 1.6 1.4 2.7 1.4.9 0 1.5-.5 1.8-1h1.4c.3.5.9 1 1.8 1 1.1 0 2.1-.7 2.7-1.4.8-.2 1.3-.7 1.3-1.6 0-1.3-.9-2.6-1.6-4-.8-1.6-1.9-2.7-1.9-3.9 0-1.1.4-2 .4-3.3 0-2.3-1.3-4-3.7-4zm-1.5 4.1c.4 0 .7.4.7.9s-.3.9-.7.9-.7-.4-.7-.9.3-.9.7-.9zm3 0c.4 0 .7.4.7.9s-.3.9-.7.9-.7-.4-.7-.9.3-.9.7-.9zm-1.5 2.6c.7 0 1.6.4 1.6.8 0 .3-.5.5-1 .8-.3.2-.5.4-.6.4s-.3-.2-.6-.4c-.5-.3-1-.5-1-.8 0-.4.9-.8 1.6-.8z" />
    </svg>
  );
}

function IconDownload(): React.ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M4 20h16" />
    </svg>
  );
}

function IconDesktop(): React.ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-9 w-9"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  );
}

function IconPhone(): React.ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M11 18h2" />
    </svg>
  );
}
