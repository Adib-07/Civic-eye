import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "./database.types";
import { getSupabaseAnonKey, getSupabaseUrl, isSupabaseConfigured } from "./env";

let client: SupabaseClient<Database> | null = null;

function assertValidSupabaseUrl(url: string): void {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      throw new Error("URL must use http or https");
    }
  } catch {
    throw new Error(`Invalid VITE_SUPABASE_URL: "${url}"`);
  }
}

/**
 * Returns a singleton Supabase browser client, or null when env vars are missing.
 */
export function getSupabase(): SupabaseClient<Database> | null {
  if (!isSupabaseConfigured()) return null;

  if (!client) {
    const url = getSupabaseUrl()!;
    const anonKey = getSupabaseAnonKey()!;
    assertValidSupabaseUrl(url);

    client = createClient<Database>(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }

  return client;
}

/** Returns the Supabase client or throws with a setup hint. */
export function requireSupabase(): SupabaseClient<Database> {
  const sb = getSupabase();
  if (!sb) {
    throw new Error(
      "Supabase is not configured. Copy .env.example to .env and set VITE_SUPABASE_URL plus VITE_SUPABASE_ANON_KEY (or VITE_SUPABASE_PUBLISHABLE_KEY).",
    );
  }
  return sb;
}

/** Reset singleton (for tests or hot reload). Not used in production paths. */
export function resetSupabaseClient(): void {
  client = null;
}
