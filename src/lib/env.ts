/**
 * Client-side environment helpers for CivicEye Supabase integration.
 * Secrets belong in local .env only — never commit real values.
 */

const PLACEHOLDER_VALUES = new Set(["", "your-anon-key", "https://your-project.supabase.co"]);

function readEnv(key: string): string | undefined {
  const value = import.meta.env[key] as string | undefined;
  if (!value) return undefined;
  const trimmed = value.trim();
  if (PLACEHOLDER_VALUES.has(trimmed)) return undefined;
  return trimmed;
}

export function getSupabaseUrl(): string | undefined {
  return readEnv("VITE_SUPABASE_URL");
}

export function getSupabaseAnonKey(): string | undefined {
  return readEnv("VITE_SUPABASE_ANON_KEY");
}

/** True when both Supabase URL and anon key are set to non-placeholder values. */
export function isSupabaseConfigured(): boolean {
  return Boolean(getSupabaseUrl() && getSupabaseAnonKey());
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
