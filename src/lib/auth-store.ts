import type { Session, User } from "@supabase/supabase-js";
import { useCallback, useSyncExternalStore } from "react";

import { isSupabaseConfigured } from "./env";
import { ensureProfile, fetchProfile } from "./profile";
import { getSupabase } from "./supabase";
import type { Profile } from "./types";

export type AuthStatus = "loading" | "authenticated" | "anonymous" | "unconfigured";

export type AuthState = {
  status: AuthStatus;
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  /** True while the profile row is still being read or repaired. */
  profileLoading: boolean;
  /**
   * True once the initial session read has completed. The server always starts
   * with `ready === false`, so the server and the first client render agree and
   * React does not report a hydration mismatch.
   */
  ready: boolean;
};

const configured = isSupabaseConfigured();

let state: AuthState = {
  status: configured ? "loading" : "unconfigured",
  session: null,
  user: null,
  profile: null,
  profileLoading: false,
  ready: false,
};

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function setState(next: Partial<AuthState>) {
  state = { ...state, ...next };
  emit();
}

let initPromise: Promise<void> | null = null;
let authSubscription: { unsubscribe: () => void } | null = null;

async function hydrate(session: Session | null): Promise<void> {
  if (!session?.user) {
    setState({
      status: "anonymous",
      session: null,
      user: null,
      profile: null,
      profileLoading: false,
      ready: true,
    });
    return;
  }

  setState({
    status: "authenticated",
    session,
    user: session.user,
    profile: null,
    profileLoading: true,
    ready: true,
  });

  // Read first so guards can run on data we already have, then self-heal the
  // profile so a missing row never leaves the user without a role/org.
  const existing = await fetchProfile(session.user.id);
  if (existing) {
    setState({ profile: existing, profileLoading: false });
    return;
  }

  try {
    const repaired = await ensureProfile();
    setState({ profile: repaired, profileLoading: false });
  } catch (error) {
    console.error("[CivicEye] Unable to load your profile:", error);
    setState({ profile: null, profileLoading: false });
  }
}

/**
 * Boot the store exactly once. Safe to call concurrently — the same promise is
 * reused — and safe to call during SSR, where it resolves immediately with an
 * `unconfigured`/`loading` state instead of touching browser storage.
 */
export function ensureAuthInitialized(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const sb = getSupabase();
    if (!sb) {
      setState({ status: "unconfigured", ready: true });
      return;
    }

    const {
      data: { session },
    } = await sb.auth.getSession();
    await hydrate(session);

    const { data } = sb.auth.onAuthStateChange((event, nextSession) => {
      if (event === "TOKEN_REFRESHED" || event === "USER_UPDATED") {
        setState({ session: nextSession, user: nextSession?.user ?? null });
        return;
      }
      void hydrate(nextSession);
    });
    authSubscription = data.subscription;
  })();

  return initPromise;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  void ensureAuthInitialized();
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return state;
}

/** Synchronous read of the current auth state — for router guards and server fns. */
export function getAuthState(): AuthState {
  return state;
}

export function useAuthState(): AuthState {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

/** Re-read the profile (e.g. after an org-admin role change). */
export const refreshAuthProfile = async (): Promise<void> => {
  if (typeof window === "undefined") return;
  await ensureAuthInitialized();
  const sb = getSupabase();
  if (!sb) return;
  const {
    data: { session },
  } = await sb.auth.getSession();
  if (!session?.user) return;
  setState({ profileLoading: true });
  try {
    const profile = await fetchProfile(session.user.id);
    setState({ profile, profileLoading: false });
  } catch {
    setState({ profileLoading: false });
  }
};

/** Push a freshly authenticated session into the store without a refetch round-trip. */
export async function syncAuthSession(session: Session | null): Promise<void> {
  await ensureAuthInitialized();
  await hydrate(session);
}

export const setAuthProfile = (profile: Profile | null): void => setState({ profile });

/** Test/reset helper. */
export function resetAuthStore(): void {
  authSubscription?.unsubscribe();
  authSubscription = null;
  initPromise = null;
  listeners.clear();
  state = {
    status: configured ? "loading" : "unconfigured",
    session: null,
    user: null,
    profile: null,
    profileLoading: false,
    ready: false,
  };
}

export function useAuthActions() {
  return {
    ensureInitialized: useCallback(ensureAuthInitialized, []),
    refreshProfile: useCallback(refreshAuthProfile, []),
  };
}
