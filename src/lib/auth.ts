import type { Session, User } from "@supabase/supabase-js";

import type { Profile, UserRole } from "./types";
import { getSupabase, requireSupabase } from "./supabase";
import { isSupabaseConfigured } from "./env";

export type AuthSession = {
  user: User;
  profile: Profile | null;
};

function mapProfile(row: {
  id: string;
  organization_id: string | null;
  role: UserRole;
  full_name: string | null;
  email: string | null;
}): Profile {
  return {
    id: row.id,
    organizationId: row.organization_id,
    role: row.role,
    fullName: row.full_name,
    email: row.email,
  };
}

export async function fetchProfile(userId: string): Promise<Profile | null> {
  const sb = getSupabase();
  if (!sb) return null;

  const { data, error } = await sb
    .from("profiles")
    .select("id, organization_id, role, full_name, email")
    .eq("id", userId)
    .maybeSingle();

  if (error || !data) return null;
  return mapProfile(data as Parameters<typeof mapProfile>[0]);
}

export async function signIn(email: string, password: string) {
  const sb = requireSupabase();
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
  const profile = data.user ? await fetchProfile(data.user.id) : null;
  return { user: data.user, session: data.session, profile };
}

export async function signUp(email: string, password: string, meta?: { fullName?: string }) {
  const sb = requireSupabase();
  const { data, error } = await sb.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: meta?.fullName,
      },
    },
  });
  if (error) throw error;

  const profile = data.user ? await fetchProfile(data.user.id) : null;
  return { user: data.user, session: data.session, profile };
}

export async function signOut() {
  const sb = getSupabase();
  if (!sb) return;
  await sb.auth.signOut();
}

export async function getCurrentSession(): Promise<AuthSession | null> {
  const sb = getSupabase();
  if (!sb) return null;

  const { data } = await sb.auth.getSession();
  const session = data.session;
  if (!session?.user) return null;

  const profile = await fetchProfile(session.user.id);
  return { user: session.user, profile };
}

export function onAuthStateChange(
  callback: (session: AuthSession | null) => void,
): (() => void) | undefined {
  const sb = getSupabase();
  if (!sb) return undefined;

  const { data } = sb.auth.onAuthStateChange(async (_event, session) => {
    if (!session?.user) {
      callback(null);
      return;
    }
    const profile = await fetchProfile(session.user.id);
    callback({ user: session.user, profile });
  });

  return () => data.subscription.unsubscribe();
}

/** @deprecated Legacy localStorage session check — use useAuth instead */
export function getSession(): { username: string; loginAt: string } | null {
  if (!isSupabaseConfigured()) return null;
  return null;
}

/** @deprecated */
export function login(_username: string, _password: string): boolean {
  return false;
}

/** @deprecated */
export function logout() {
  void signOut();
}

export type { Session };
