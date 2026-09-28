/**
 * Client-side auth diagnostics.
 *
 * Runs in the browser against the deployed build, so it reports what the real
 * deployment sees — not what a local .env or a mock would. Every check returns
 * a pass/fail plus the raw provider response, so a failure names its own cause.
 */
import { getSupabase } from "./supabase";
import { isSupabaseConfigured } from "./env";
import type { Profile } from "./types";

export type DiagnosticLevel = "pass" | "warn" | "fail";

export type DiagnosticResult = {
  id: string;
  label: string;
  level: DiagnosticLevel;
  detail: string;
  /** Raw provider response, so nothing is hidden behind friendly wording. */
  raw?: unknown;
  /** What the user should do about it. */
  fix?: string;
};

async function withTimeout<T>(thenable: PromiseLike<T>, ms = 15000, label = "request"): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
  });
  try {
    return await Promise.race([Promise.resolve(thenable), timeout]);
  } finally {
    clearTimeout(timer!);
  }
}

/** Probe the auth endpoint with the anon key — no credentials required. */
async function probeAuthHealth(): Promise<{ ok: boolean; status: number; body: string }> {
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key =
    (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ??
    (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined);

  const res = await fetch(`${url}/auth/v1/health`, {
    headers: { apikey: key! },
  });
  const body = await res.text();
  return { ok: res.ok, status: res.status, body: body.slice(0, 200) };
}

/** Sign in with a throwaway account to prove the whole path works. */
async function probeLiveSignupAndLogin(): Promise<DiagnosticResult> {
  const sb = getSupabase();
  if (!sb) {
    return { id: "live", label: "Live sign-in", level: "fail", detail: "No Supabase client." };
  }

  const email = `civiceye-diag-${Date.now()}@example.com`;
  const password = "Diag1234!xY";

  const { data: signup, error: signupError } = await withTimeout(
    sb.auth.signUp({ email, password }),
    20000,
    "signUp",
  );

  if (signupError) {
    const msg = signupError.message;
    const isSms = /sms/i.test(msg);
    const isDisabled = /signups? (are )?(disabled|not allowed)/i.test(msg);
    return {
      id: "live",
      label: "Live sign-in",
      level: "fail",
      detail: `Sign-up was rejected: ${msg}`,
      raw: signupError,
      fix: isSms
        ? "Phone/OTP is the only enabled provider. Enable Email under Authentication > Providers > Email."
        : isDisabled
          ? "Enable the Email provider under Authentication > Providers."
          : "Check Authentication > Providers > Email is enabled, and the URL redirects allow your domain.",
    };
  }

  if (!signup.session) {
    return {
      id: "live",
      label: "Live sign-in",
      level: "fail",
      detail:
        "Sign-up succeeded but returned no session, so email confirmation is ON. A new account cannot sign in until the address is verified.",
      raw: signup.user,
      fix: "For a demo, turn it off: Supabase > Authentication > Providers > Email > Confirm email (off).",
    };
  }

  await withTimeout(sb.auth.signOut({ scope: "local" }), 10000, "signOut").catch(() => undefined);

  const { data: login, error: loginError } = await withTimeout(
    sb.auth.signInWithPassword({ email, password }),
    20000,
    "signInWithPassword",
  );

  if (loginError || !login.session) {
    return {
      id: "live",
      label: "Live sign-in",
      level: "fail",
      detail: `Password sign-in failed: ${loginError?.message ?? "no session returned"}`,
      raw: loginError,
    };
  }

  await sb.auth.signOut({ scope: "local" }).catch(() => undefined);

  return {
    id: "live",
    label: "Live sign-in",
    level: "pass",
    detail: "A throwaway account could sign up and sign in successfully.",
  };
}

/**
 * Check an email against the auth service and report, precisely, whether the
 * account exists and whether it is confirmed — without ever revealing a
 * password or a session. Used by the diagnostics screen only.
 */
export async function probeAccount(email: string): Promise<{
  exists: boolean;
  confirmed: boolean | null;
  code: string;
  raw: unknown;
}> {
  const sb = getSupabase();
  if (!sb) return { exists: false, confirmed: null, code: "no_client", raw: null };

  // Deliberately wrong password: a correct-password response proves existence,
  // and an "Email not confirmed" response proves the address is unverified.
  const { error } = await withTimeout(
    sb.auth.signInWithPassword({ email, password: "__diagnostic_probe__" }),
    20000,
    "signInWithPassword",
  );

  const message = error?.message ?? "";
  const code = error?.code ?? "";

  if (/email not confirmed/i.test(message) || code === "email_not_confirmed") {
    return { exists: true, confirmed: false, code, raw: error };
  }
  if (/invalid login credentials/i.test(message) || code === "invalid_credentials") {
    return { exists: true, confirmed: true, code, raw: error };
  }
  if (code === "user_not_found") {
    return { exists: false, confirmed: null, code, raw: error };
  }
  return { exists: false, confirmed: null, code: code || "unknown", raw: error };
}

export async function runAuthDiagnostics(): Promise<DiagnosticResult[]> {
  const results: DiagnosticResult[] = [];
  const configured = isSupabaseConfigured();
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key =
    (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ??
    (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined);

  // 1. configuration
  results.push({
    id: "config-url",
    label: "Supabase URL is configured",
    level: url ? "pass" : "fail",
    detail: url ?? "VITE_SUPABASE_URL is missing from this build.",
    fix: url
      ? undefined
      : "Add VITE_SUPABASE_URL in Vercel (or .env) and REDEPLOY. VITE_ variables are inlined at build time.",
  });

  results.push({
    id: "config-key",
    label: "Supabase API key is configured",
    level: key ? "pass" : "fail",
    detail: key
      ? `${key.slice(0, 10)}…${key.slice(-4)}`
      : "VITE_SUPABASE_ANON_KEY is missing from this build.",
    fix: key
      ? undefined
      : "Add VITE_SUPABASE_ANON_KEY in Vercel (or .env) and REDEPLOY. VITE_ variables are inlined at build time.",
  });

  if (!configured || !url || !key) {
    return results;
  }

  // 2. placeholder values
  const placeholders = [
    "your-anon-key",
    "your-publishable-key",
    "https://your-project.supabase.co",
    "changeme",
  ];
  const isPlaceholder =
    placeholders.includes(url.toLowerCase()) || placeholders.includes(key.toLowerCase());
  results.push({
    id: "placeholder",
    label: "Values are real, not .env.example placeholders",
    level: isPlaceholder ? "fail" : "pass",
    detail: isPlaceholder
      ? "A placeholder value from .env.example is still in this build."
      : "Values look real.",
    fix: isPlaceholder ? "Replace the placeholder in .env and redeploy." : undefined,
  });

  // 3. key type
  const isServiceKey = /^sb_secret_/.test(key);
  results.push({
    id: "key-type",
    label: "Key is anon/publishable (not service role)",
    level: isServiceKey ? "fail" : "pass",
    detail: isServiceKey
      ? "This is a service-role key. It must never be in a VITE_ variable."
      : /^eyJ/.test(key)
        ? "Legacy JWT anon key."
        : "sb_publishable key.",
    fix: isServiceKey
      ? "Move the service-role key to a server-only variable and redeploy."
      : undefined,
  });

  // 4. connectivity
  try {
    const health = await probeAuthHealth();
    results.push({
      id: "connectivity",
      label: "Supabase is reachable",
      level: health.ok ? "pass" : "fail",
      detail: health.ok
        ? `Auth endpoint responded (HTTP ${health.status}).`
        : `HTTP ${health.status}: ${health.body}`,
      fix: health.ok ? undefined : "Check the project URL, your network, and any firewall rules.",
    });
  } catch (error) {
    results.push({
      id: "connectivity",
      label: "Supabase is reachable",
      level: "fail",
      detail: `Could not reach ${url}: ${error instanceof Error ? error.message : String(error)}`,
      fix: "Check the project URL and your network connection.",
    });
    return results;
  }

  const sb = getSupabase()!;

  // 5. profiles table
  try {
    const { error } = await withTimeout(
      sb.from("profiles").select("id").limit(1),
      15000,
      "profiles query",
    );
    const missing = /does not exist|schema cache|404/i.test(error?.message ?? "");
    results.push({
      id: "profiles",
      label: "profiles table exists",
      level: missing ? "fail" : error ? "warn" : "pass",
      detail: missing
        ? `Table not found: ${error?.message}`
        : error
          ? `Readable only with restrictions: ${error.message}`
          : "Table is present and RLS is active.",
      fix: missing
        ? "Run the migrations in supabase/migrations/ in order, then reload the schema."
        : undefined,
    });
  } catch (error) {
    results.push({
      id: "profiles",
      label: "profiles table exists",
      level: "fail",
      detail: error instanceof Error ? error.message : String(error),
    });
  }

  // 6. ensure_profile RPC (migration 011)
  try {
    const { error } = await withTimeout(sb.rpc("ensure_profile"), 15000, "ensure_profile");
    const missing = /does not exist|schema cache|404|not found/i.test(error?.message ?? "");
    const needsAuth =
      /not_authenticated|PGRST301|401/i.test(error?.message ?? "") || error?.code === "";
    results.push({
      id: "ensure-profile",
      label: "ensure_profile() RPC exists (migration 011)",
      level: missing ? "fail" : "pass",
      detail: missing
        ? "Not found — migration 011 has not been applied."
        : needsAuth || error
          ? "Present (it correctly requires an authenticated caller)."
          : "Present and callable.",
      fix: missing
        ? "Apply supabase/migrations/011_auth_and_organization_team.sql, then run NOTIFY pgrst, 'reload schema';"
        : undefined,
    });
  } catch (error) {
    results.push({
      id: "ensure-profile",
      label: "ensure_profile() RPC exists (migration 011)",
      level: "fail",
      detail: error instanceof Error ? error.message : String(error),
    });
  }

  // 7. live signup + login
  try {
    results.push(await probeLiveSignupAndLogin());
  } catch (error) {
    results.push({
      id: "live",
      label: "Live sign-in",
      level: "fail",
      detail: error instanceof Error ? error.message : String(error),
    });
  }

  return results;
}

export type { Profile };
