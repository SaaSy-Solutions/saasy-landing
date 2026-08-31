/**
 * Desktop-sync update-feed manifest — the SINGLE source of truth for the
 * installer version and download URLs (SaaSy Sync epic #3999). This mirrors the
 * tenant portal's Apps page (saas-platform #4273) and reads the very same
 * `latest.json` the Tauri auto-updater consumes. Installer URLs are NEVER
 * hardcoded in the UI: everything the download surface renders is derived from
 * the fetched manifest, so the marketing site and the auto-updater can never
 * drift apart.
 */

/**
 * Public R2 update feed. Overridable via `NEXT_PUBLIC_DESKTOP_UPDATE_FEED_URL`
 * for staging/preview, but defaults to the production feed. This is the ONLY
 * URL baked into the site — and it is the feed, not any installer asset.
 */
export const DEFAULT_UPDATE_FEED_URL =
  "https://updates.hellosaasy.ai/latest.json";

/** OS families we detect and offer downloads for. */
export type OsFamily = "windows" | "macos" | "linux";

/**
 * A single platform entry in the update manifest. Matches the Tauri v2 updater
 * schema (`{ signature, url }`), and tolerates extra keys.
 */
export interface ManifestPlatform {
  /** Absolute URL of the installer/bundle asset. */
  url: string;
  /** Detached signature the updater verifies. Not used by the UI. */
  signature?: string;
}

/**
 * The update-feed manifest. `platforms` is keyed by the Tauri target-triple
 * convention (`windows-x86_64`, `darwin-universal`, `linux-x86_64`, …). The
 * build pipeline MAY publish multiple keys per OS (e.g. an `.msi` and an
 * `.exe`); we render one button per entry, labelled from its file extension.
 */
export interface UpdateManifest {
  /** Semantic version of the release, e.g. `1.2.0`. */
  version: string;
  /** Release notes (optional). */
  notes?: string;
  /** ISO-8601 publish timestamp (optional). */
  pub_date?: string;
  /** Per-platform installer assets. */
  platforms: Record<string, ManifestPlatform>;
}

/** A download option rendered on the page, derived from the manifest. */
export interface DesktopDownload {
  /** OS family this asset installs on. */
  os: OsFamily;
  /** Absolute installer URL (straight from the manifest — never synthesised). */
  url: string;
  /** Human label for the installer format, e.g. `.dmg`, `.msi`, `AppImage`. */
  format: string;
}

function isManifestPlatform(value: unknown): value is ManifestPlatform {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const entry = value as Record<string, unknown>;
  if (typeof entry.url !== "string" || entry.url.length === 0) {
    return false;
  }
  if ("signature" in entry && typeof entry.signature !== "string") {
    return false;
  }
  return true;
}

/**
 * Type guard for the fetched JSON. Rejects anything that is not a well-formed
 * manifest so callers only ever handle `UpdateManifest | null` — never an
 * untyped blob. A manifest whose `platforms` object has zero entries is still
 * "valid" (it just yields no downloads → the "coming soon" state).
 */
export function isUpdateManifest(value: unknown): value is UpdateManifest {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const obj = value as Record<string, unknown>;
  if (typeof obj.version !== "string" || obj.version.length === 0) {
    return false;
  }
  if ("notes" in obj && typeof obj.notes !== "string") {
    return false;
  }
  if ("pub_date" in obj && typeof obj.pub_date !== "string") {
    return false;
  }
  if (typeof obj.platforms !== "object" || obj.platforms === null) {
    return false;
  }
  for (const entry of Object.values(obj.platforms as Record<string, unknown>)) {
    if (!isManifestPlatform(entry)) {
      return false;
    }
  }
  return true;
}

/**
 * Classify a manifest key + asset URL into an OS family. We look at both the
 * Tauri target-triple key prefix (`windows-*`, `darwin-*`, `linux-*`) and the
 * file extension, so the classification is robust to whichever naming the
 * pipeline uses. Returns `null` for anything unrecognised (it is simply not
 * offered rather than mis-filed under the wrong OS).
 */
export function classifyOs(key: string, url: string): OsFamily | null {
  const haystack = `${key} ${url}`.toLowerCase();
  if (
    haystack.includes("windows") ||
    haystack.includes("win32") ||
    haystack.includes("win64") ||
    /\.(msi|exe)(\?|$)/.test(haystack) ||
    haystack.includes("nsis")
  ) {
    return "windows";
  }
  if (
    haystack.includes("darwin") ||
    haystack.includes("macos") ||
    haystack.includes("mac") ||
    /\.(dmg)(\?|$)/.test(haystack) ||
    haystack.includes(".app.tar.gz")
  ) {
    return "macos";
  }
  if (
    haystack.includes("linux") ||
    /\.(appimage|deb|rpm)(\?|$)/.test(haystack)
  ) {
    return "linux";
  }
  return null;
}

/** Derive a short, human installer-format label from an asset URL. */
export function formatLabel(url: string): string {
  const clean = url.split("?")[0].toLowerCase();
  if (clean.endsWith(".msi")) {
    return ".msi";
  }
  if (clean.endsWith(".exe")) {
    return ".exe";
  }
  if (clean.endsWith(".dmg")) {
    return ".dmg";
  }
  if (clean.endsWith(".appimage")) {
    return "AppImage";
  }
  if (clean.endsWith(".deb")) {
    return ".deb";
  }
  if (clean.endsWith(".rpm")) {
    return ".rpm";
  }
  if (clean.endsWith(".app.tar.gz") || clean.endsWith(".tar.gz")) {
    return ".tar.gz";
  }
  const ext = clean.split(".").pop();
  return ext ? `.${ext}` : "download";
}

/**
 * Flatten the manifest into a list of labelled, OS-classified downloads.
 * Entries that cannot be classified are dropped (never shown under a guessed
 * OS). Sorted by OS then format for stable rendering.
 */
export function downloadsFromManifest(
  manifest: UpdateManifest
): DesktopDownload[] {
  const downloads: DesktopDownload[] = [];
  for (const [key, entry] of Object.entries(manifest.platforms)) {
    const os = classifyOs(key, entry.url);
    if (!os) {
      continue;
    }
    downloads.push({ os, url: entry.url, format: formatLabel(entry.url) });
  }
  const osOrder: Record<OsFamily, number> = {
    windows: 0,
    macos: 1,
    linux: 2,
  };
  return downloads.sort((a, b) =>
    a.os === b.os
      ? a.format.localeCompare(b.format)
      : osOrder[a.os] - osOrder[b.os]
  );
}

/** Group downloads by OS family. */
export function downloadsByOs(
  downloads: DesktopDownload[]
): Record<OsFamily, DesktopDownload[]> {
  const grouped: Record<OsFamily, DesktopDownload[]> = {
    windows: [],
    macos: [],
    linux: [],
  };
  for (const dl of downloads) {
    grouped[dl.os].push(dl);
  }
  return grouped;
}

interface UserAgentDataLike {
  platform?: string;
}

/**
 * Detect the visitor's OS family. SSR-safe: returns `null` when there is no
 * `navigator` (server render / static export) or detection is inconclusive, so
 * callers show ALL options rather than guessing. Prefers the modern
 * `userAgentData.platform` and falls back to the `userAgent` string.
 */
export function detectOs(): OsFamily | null {
  if (typeof navigator === "undefined") {
    return null;
  }

  const uaData = (
    navigator as Navigator & { userAgentData?: UserAgentDataLike }
  ).userAgentData;
  const platform = uaData?.platform?.toLowerCase();
  if (platform) {
    if (platform.includes("win")) {
      return "windows";
    }
    if (platform.includes("mac")) {
      return "macos";
    }
    if (platform.includes("linux") && !platform.includes("android")) {
      return "linux";
    }
  }

  const ua = navigator.userAgent.toLowerCase();
  // Android reports "linux" in its UA — exclude it (no desktop build for it).
  if (ua.includes("android")) {
    return null;
  }
  if (ua.includes("windows")) {
    return "windows";
  }
  if (ua.includes("mac os") || ua.includes("macintosh")) {
    return "macos";
  }
  if (ua.includes("linux")) {
    return "linux";
  }
  return null;
}

/**
 * Fetch and validate the update-feed manifest. Resilient by design: a 404 (no
 * release cut yet), a network failure, an empty body, or malformed JSON all
 * resolve to `null` so the page renders its "coming soon" state rather than
 * crashing. The signed installers do not exist yet, so `null` is the expected
 * path today.
 *
 * The raw `fetch` is deliberate: this is a PUBLIC, cross-origin R2/CDN feed, so
 * it carries no auth, tenant, or CSRF headers — the same posture as `lib/api.ts`
 * uses for the public marketing capture endpoints.
 */
export async function fetchUpdateManifest(
  url: string = DEFAULT_UPDATE_FEED_URL,
  fetchImpl: typeof fetch = fetch
): Promise<UpdateManifest | null> {
  try {
    const res = await fetchImpl(url, {
      // Always read the freshest feed; the updater cadence is not ours to cache.
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      return null;
    }
    const json: unknown = await res.json();
    return isUpdateManifest(json) ? json : null;
  } catch {
    return null;
  }
}
