/**
 * Client-side environment helpers for CivicEye Supabase integration.
 * Secrets belong in local .env only — never commit real values.
 *
 * Lovable-linked Supabase projects often expose VITE_SUPABASE_PUBLISHABLE_KEY
 * instead of VITE_SUPABASE_ANON_KEY — both are supported here.
 */

const PLACEHOLDER_VALUES = new Set([
  "",
  "your-anon-key",
  "your-public-key",
  "your-publishable-key",
  "https://your-project.supabase.co",
  "your-project-id",
]);

/**
 * Static env map using explicit `import.meta.env.VITE_*` property access.
 *
 * Vite's `define` (used by @lovable.dev/vite-tanstack-config) performs static
 * text-replacement of `import.meta.env.VITE_*` references.  Dynamic access
 * like `import.meta.env[key]` is NOT matched by `define` and depends on
 * Vite's built-in `import.meta.env` object-inlining, which can be unreliable
 * when the plugin's own `define` entries shadow the namespace — especially on
 * CI platforms (Vercel, Lovable) where the build runs without a local `.env`.
 *
 * Listing every known VITE_* key with static property access guarantees the
 * values are always inlined, regardless of how the host platform resolves
 * `import.meta.env`.
 */
const _env: Record<string, string | undefined> = {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL as string | undefined,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined,
  VITE_SUPABASE_PUBLISHABLE_KEY: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as
    string | undefined,
  VITE_SUPABASE_PROJECT_ID: import.meta.env.VITE_SUPABASE_PROJECT_ID as string | undefined,
  VITE_DEFAULT_ORGANIZATION_ID: import.meta.env.VITE_DEFAULT_ORGANIZATION_ID as string | undefined,
  VITE_BILLING_PROVIDER: import.meta.env.VITE_BILLING_PROVIDER as string | undefined,
  VITE_BILLING_CHECKOUT_ENABLED: import.meta.env.VITE_BILLING_CHECKOUT_ENABLED as
    string | undefined,
  VITE_MAP_TILE_URL: import.meta.env.VITE_MAP_TILE_URL as string | undefined,
  VITE_MAP_TILE_ATTRIBUTION: import.meta.env.VITE_MAP_TILE_ATTRIBUTION as string | undefined,
};

/**
 * SSR / Node.js fallback — Vite only exposes VITE_* variables on
 * `import.meta.env` for the client bundle.  During server-side rendering
 * (Nitro / Node.js), `import.meta.env` contains only MODE, BASE_URL, PROD,
 * DEV, and SSR.  `process.env` always has the actual values server-side.
 */
if (typeof process !== "undefined" && process.env) {
  for (const key of Object.keys(_env)) {
    if (_env[key] === undefined) {
      _env[key] = process.env[key];
    }
  }
}

function readEnv(key: string): string | undefined {
  const value = _env[key];
  if (!value) return undefined;
  const trimmed = value.trim();
  if (PLACEHOLDER_VALUES.has(trimmed)) return undefined;
  return trimmed;
}

function readFirstEnv(...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = readEnv(key);
    if (value) return value;
  }
  return undefined;
}

export function getSupabaseUrl(): string | undefined {
  const direct = readEnv("VITE_SUPABASE_URL");
  if (direct) return direct;

  const projectId = readEnv("VITE_SUPABASE_PROJECT_ID");
  if (projectId) return `https://${projectId}.supabase.co`;

  return undefined;
}

/** Browser-safe Supabase key (anon / publishable). Never use service-role keys here. */
export function getSupabaseAnonKey(): string | undefined {
  return readFirstEnv("VITE_SUPABASE_ANON_KEY", "VITE_SUPABASE_PUBLISHABLE_KEY");
}

/** True when Supabase URL and anon/publishable key are both set. */
export function isSupabaseConfigured(): boolean {
  return Boolean(getSupabaseUrl() && getSupabaseAnonKey());
}

/**
 * Returns a human-readable error when Supabase is not configured.
 * Returns null when Supabase is properly set up.
 */
export function getSupabaseConfigError(): string | null {
  if (isSupabaseConfigured()) return null;

  const missing: string[] = [];
  if (!getSupabaseUrl()) {
    missing.push("VITE_SUPABASE_URL (or VITE_SUPABASE_PROJECT_ID)");
  }
  if (!getSupabaseAnonKey()) {
    missing.push("VITE_SUPABASE_ANON_KEY (or VITE_SUPABASE_PUBLISHABLE_KEY)");
  }

  return `Supabase credentials missing: ${missing.join(" and ")}. Copy .env.example to .env and set your project credentials.`;
}

/**
 * Diagnostic summary showing which env vars are detected.
 * Useful for debugging configuration issues.
 */
export function getSupabaseConfigSummary(): {
  configured: boolean;
  urlPresent: boolean;
  keyPresent: boolean;
  orgPresent: boolean;
  urlRaw: string | undefined;
  keyRaw: string | undefined;
  orgRaw: string | undefined;
} {
  const urlRaw = _env["VITE_SUPABASE_URL"]?.trim();
  const keyRaw =
    (_env["VITE_SUPABASE_ANON_KEY"] ?? _env["VITE_SUPABASE_PUBLISHABLE_KEY"])?.trim();
  const orgRaw = _env["VITE_DEFAULT_ORGANIZATION_ID"]?.trim();
  return {
    configured: isSupabaseConfigured(),
    urlPresent: Boolean(getSupabaseUrl()),
    keyPresent: Boolean(getSupabaseAnonKey()),
    orgPresent: Boolean(getDefaultOrganizationId()),
    urlRaw: urlRaw || undefined,
    keyRaw: keyRaw ? `${keyRaw.slice(0, 6)}…` : undefined,
    orgRaw: orgRaw || undefined,
  };
}

/**
 * Logs a console warning once when Supabase is not configured.
 * Helps developers diagnose missing env vars without cluttering the UI.
 */
let warnedOnce = false;
if (typeof window !== "undefined" && !isSupabaseConfigured()) {
  warnedOnce = true;
  const summary = getSupabaseConfigSummary();
  console.warn(
    "[CivicEye] Supabase is not configured. Report submission and staff features require database access.\n" +
      `→ VITE_SUPABASE_URL detected: ${summary.urlPresent ? "yes" : "NO — not found or placeholder"}\n` +
      `→ VITE_SUPABASE_ANON_KEY detected: ${summary.keyPresent ? "yes" : "NO — not found or placeholder"}\n` +
      `→ VITE_DEFAULT_ORGANIZATION_ID detected: ${summary.orgPresent ? "yes" : "NO"}\n` +
      "→ Copy .env.example to .env and set VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY.\n" +
      "→ For Lovable projects, use VITE_SUPABASE_PUBLISHABLE_KEY instead of VITE_SUPABASE_ANON_KEY.",
  );
}

/** Organization UUID for routing citizen reports. Required when Supabase is enabled. */
export function getDefaultOrganizationId(): string | undefined {
  return readEnv("VITE_DEFAULT_ORGANIZATION_ID");
}

export function requireDefaultOrganizationId(): string {
  const id = getDefaultOrganizationId();
  if (!id) {
    throw new Error(
      "VITE_DEFAULT_ORGANIZATION_ID is not set. Create an organization in Supabase and add its UUID to .env.",
    );
  }
  return id;
}

/**
 * Organization scope for queries:
 * - Staff: profile.organization_id only (never fall back to default — RLS isolation)
 * - Citizens / anonymous: VITE_DEFAULT_ORGANIZATION_ID
 */
export function resolveOrganizationId(
  profile: { organizationId: string | null; role: string } | null | undefined,
): string | null {
  const isStaff =
    profile?.role === "ward_officer" ||
    profile?.role === "admin" ||
    profile?.role === "super_admin";

  if (isStaff) {
    return profile?.organizationId ?? null;
  }

  return getDefaultOrganizationId() ?? null;
}
