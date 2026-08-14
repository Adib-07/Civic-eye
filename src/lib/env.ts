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

function readEnv(key: string): string | undefined {
  const value = import.meta.env[key] as string | undefined;
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

/** Clear error when Supabase client env vars are missing. CivicEye requires cloud persistence. */
export function getSupabaseConfigError(): string | null {
  if (isSupabaseConfigured()) return null;

  const missing: string[] = [];
  if (!getSupabaseUrl()) {
    missing.push("VITE_SUPABASE_URL or VITE_SUPABASE_PROJECT_ID");
  }
  if (!getSupabaseAnonKey()) {
    missing.push("VITE_SUPABASE_ANON_KEY or VITE_SUPABASE_PUBLISHABLE_KEY");
  }

  return `Supabase is required but not configured. Missing ${missing.join(" and ")}. Set these in your environment (e.g. Vercel or .env) and rebuild. CivicEye does not store reports locally.`;
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
