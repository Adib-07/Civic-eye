import type { Database } from "./database.types";
import { getSupabase, requireSupabase } from "./supabase";
import type { Profile, UserRole } from "./types";

type ProfileRow = {
  id: string;
  organization_id: string | null;
  role: UserRole;
  full_name: string | null;
  email: string | null;
};

const PROFILE_COLUMNS = "id, organization_id, role, full_name, email";

export function mapProfile(row: ProfileRow): Profile {
  return {
    id: row.id,
    organizationId: row.organization_id,
    role: row.role,
    fullName: row.full_name,
    email: row.email,
  };
}

/** Read the caller's profile. Returns null when RLS hides it or it is missing. */
export async function fetchProfile(userId: string): Promise<Profile | null> {
  const sb = getSupabase();
  if (!sb) return null;

  const { data, error } = await sb
    .from("profiles")
    .select(PROFILE_COLUMNS)
    .eq("id", userId)
    .maybeSingle();

  if (error || !data) return null;
  return mapProfile(data as ProfileRow);
}

/**
 * Self-heal the caller's `profiles` row via the `ensure_profile()` RPC.
 *
 * `profiles` has RLS enabled with an explicit client INSERT denial, so the
 * browser can never create its own row. The `handle_new_user` trigger normally
 * does it; this RPC covers the cases where the trigger did not run (imported
 * users, trigger removed, an organisation admin deleted the row) so an
 * existing account can always sign in and be routed correctly.
 */
export async function ensureProfile(): Promise<Profile | null> {
  const sb = requireSupabase();

  const { data, error } = await sb.rpc("ensure_profile");
  if (error) {
    // Function missing (migration not applied) — fall back to a plain read.
    const { data: sessionData } = await sb.auth.getSession();
    const userId = sessionData.session?.user.id;
    if (!userId) return null;
    return fetchProfile(userId);
  }

  const row = (Array.isArray(data) ? data[0] : data) as ProfileRow | null;
  return row ? mapProfile(row) : null;
}

export async function updateOwnProfile(patch: {
  fullName?: string;
  email?: string;
}): Promise<Profile> {
  const sb = requireSupabase();

  const update: Database["public"]["Tables"]["profiles"]["Update"] = {};
  if (typeof patch.fullName === "string") update.full_name = patch.fullName.trim() || null;
  if (typeof patch.email === "string") update.email = patch.email.trim().toLowerCase() || null;

  const { data: sessionData } = await sb.auth.getSession();
  const userId = sessionData.session?.user.id;
  if (!userId) throw new Error("You must be signed in to update your profile.");

  const { data, error } = await sb
    .from("profiles")
    .update(update)
    .eq("id", userId)
    .select(PROFILE_COLUMNS)
    .single();

  if (error) throw new Error(error.message);
  return mapProfile(data as ProfileRow);
}

export type { Database };
