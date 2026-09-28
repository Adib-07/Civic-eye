import type { Session, User } from "@supabase/supabase-js";

import { ensureAuthInitialized, syncAuthSession } from "./auth-store";
import { ensureProfile, fetchProfile } from "./profile";
import { getSupabase, requireSupabase } from "./supabase";
import type { Profile } from "./types";

export type AuthSession = {
  user: User;
  profile: Profile | null;
};

export type AuthErrorCode =
  | "invalid_credentials"
  | "email_not_confirmed"
  | "user_already_exists"
  | "weak_password"
  | "rate_limited"
  | "not_configured"
  | "unknown";

export class AuthError extends Error {
  readonly code: AuthErrorCode;
  readonly cause?: unknown;

  constructor(code: AuthErrorCode, message: string, cause?: unknown) {
    super(message);
    this.name = "AuthError";
    this.code = code;
    this.cause = cause;
  }
}

const GENERIC_INVALID_CREDENTIALS =
  "Incorrect email or password. Please check your details and try again.";

function classifyError(error: unknown): AuthError {
  if (error instanceof AuthError) return error;

  const raw = error as { message?: string; code?: string; status?: number; name?: string };
  const message = raw?.message ?? "";
  const code = (raw?.code ?? "").toLowerCase();
  const lower = message.toLowerCase();

  if (code === "email_not_confirmed" || lower.includes("email not confirmed")) {
    return new AuthError(
      "email_not_confirmed",
      "Your email address has not been confirmed yet. Check your inbox for the CivicEye verification link, then sign in.",
      error,
    );
  }

  if (
    code === "invalid_credentials" ||
    lower.includes("invalid login credentials") ||
    lower.includes("wrong password") ||
    lower.includes("wrong email")
  ) {
    return new AuthError("invalid_credentials", GENERIC_INVALID_CREDENTIALS, error);
  }

  if (
    lower.includes("already registered") ||
    lower.includes("already been registered") ||
    lower.includes("user already exists") ||
    code === "user_already_exists"
  ) {
    return new AuthError(
      "user_already_exists",
      "An account already exists for this email address. Sign in instead, or reset your password if you have forgotten it.",
      error,
    );
  }

  if (
    lower.includes("rate limit") ||
    lower.includes("too many") ||
    code === "over_email_send_rate_limit"
  ) {
    return new AuthError(
      "rate_limited",
      "Too many attempts. Please wait a moment before trying again.",
      error,
    );
  }

  if (
    lower.includes("password should be") ||
    lower.includes("at least") ||
    code === "weak_password"
  ) {
    return new AuthError("weak_password", message || "Please choose a stronger password.", error);
  }

  if (
    lower.includes("fetch failed") ||
    lower.includes("failed to fetch") ||
    lower.includes("networkerror") ||
    lower.includes("network request failed") ||
    lower.includes("err_name_not_resolved") ||
    lower.includes("enotfound") ||
    lower.includes("econnrefused") ||
    lower.includes("timeout") ||
    lower.includes("load failed") ||
    (raw?.name ?? "").toLowerCase().includes("fetch")
  ) {
    return new AuthError(
      "unknown",
      "We could not reach the CivicEye authentication service. Check your internet connection and try again.",
      error,
    );
  }

  // Never surface a raw provider message we do not understand.
  return new AuthError("unknown", "Sign in failed. Please try again.", error);
}

/** Supabase masks the email (`a***@e***.com`) when an account already exists. */
function looksLikeExistingAccount(user: User | null | undefined): boolean {
  if (!user) return false;
  const email = user.email ?? "";
  if (email.includes("***")) return true;
  // Supabase returns a user shell with no linked identities for duplicates.
  return Array.isArray(user.identities) && user.identities.length === 0;
}

export type SignInResult = {
  user: User;
  session: Session;
  profile: Profile | null;
};

export async function signIn(email: string, password: string): Promise<SignInResult> {
  const sb = requireSupabase();
  const normalizedEmail = email.trim().toLowerCase();

  const { data, error } = await sb.auth.signInWithPassword({
    email: normalizedEmail,
    password,
  });

  if (error) throw classifyError(error);
  if (!data.session || !data.user) {
    throw new AuthError("unknown", "Sign in failed. Please try again.");
  }

  await syncAuthSession(data.session);

  // The profile is read from the store on failure too, so an account without a
  // profile row still lands on a usable page instead of looping on /login.
  const profile = await ensureProfile().catch((profileError) => {
    console.error("[CivicEye] Profile lookup failed after sign in:", profileError);
    return null;
  });

  return { user: data.user, session: data.session, profile };
}

export type SignUpResult = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  requiresEmailConfirmation: boolean;
  alreadyExists: boolean;
};

export async function signUp(
  email: string,
  password: string,
  meta?: { fullName?: string },
): Promise<SignUpResult> {
  const sb = requireSupabase();
  const normalizedEmail = email.trim().toLowerCase();

  const { data, error } = await sb.auth.signUp({
    email: normalizedEmail,
    password,
    options: {
      data: { full_name: meta?.fullName?.trim() || undefined },
      ...(typeof window !== "undefined" && {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      }),
    },
  });

  if (error) throw classifyError(error);

  // Duplicate account: Supabase returns a masked user shell instead of an error
  // when email confirmation is enabled. Never create a second profile for it.
  if (looksLikeExistingAccount(data.user)) {
    throw new AuthError(
      "user_already_exists",
      "An account already exists for this email address. Sign in instead, or reset your password if you have forgotten it.",
    );
  }

  const requiresEmailConfirmation = Boolean(
    data.user && (!data.session || !data.user.email_confirmed_at),
  );

  let profile: Profile | null = null;
  if (data.user && data.session) {
    await syncAuthSession(data.session);
    profile = await ensureProfile().catch((profileError) => {
      console.error("[CivicEye] Profile creation failed after signup:", profileError);
      return null;
    });
  }

  return {
    user: data.user,
    session: data.session,
    profile,
    requiresEmailConfirmation,
    alreadyExists: false,
  };
}

export async function signOut(): Promise<void> {
  const sb = getSupabase();
  if (sb) {
    await sb.auth.signOut();
  }
  await syncAuthSession(null);
}

/** Re-read Supabase's persisted session (used on boot and after tab wake-up). */
export async function getCurrentSession(): Promise<AuthSession | null> {
  await ensureAuthInitialized();
  const sb = getSupabase();
  if (!sb) return null;

  const {
    data: { session },
  } = await sb.auth.getSession();
  if (!session?.user) return null;

  return { user: session.user, profile: await fetchProfile(session.user.id) };
}

export type { Session };
