/* CivicEye auth self-check.
 *
 * Run against your real Supabase project to find out exactly why sign-in fails:
 *
 *   node scripts/check-auth.mjs
 *   SUPABASE_URL=... SUPABASE_ANON_KEY=... node scripts/check-auth.mjs
 *
 * It reads .env, then reports each layer separately: config, connectivity,
 * the profiles table, the ensure_profile() RPC, and a real sign-in attempt
 * with a throwaway account.
 */
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

let pass = 0;
let fail = 0;
const check = (name, ok, detail = "") => {
  if (ok) pass++;
  else fail++;
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${name}${detail ? `\n          ${detail}` : ""}`);
};

// ---- load .env -----------------------------------------------------------
for (const file of [".env.local", ".env"]) {
  const p = join(root, file);
  if (!existsSync(p)) continue;
  for (const line of readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m) continue;
    const value = m[2].replace(/^["']|["']$/g, "").trim();
    if (value && !process.env[m[1]]) process.env[m[1]] = value;
  }
}

const URL_ = process.env.VITE_SUPABASE_URL;
const KEY = process.env.VITE_SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const ORG = process.env.VITE_DEFAULT_ORGANIZATION_ID;

console.log("\nCivicEye auth self-check\n==========================\n");

// ---- 1. configuration ----------------------------------------------------
console.log("1. Environment");
check("VITE_SUPABASE_URL is set", Boolean(URL_), URL_ || "not found in env or process");
check(
  "VITE_SUPABASE_ANON_KEY / PUBLISHABLE_KEY is set",
  Boolean(KEY),
  KEY ? `${KEY.slice(0, 12)}…` : "not found",
);

const PLACEHOLDERS = [
  "your-anon-key",
  "your-publishable-key",
  "your-public-key",
  "https://your-project.supabase.co",
  "changeme",
  "example",
];
if (URL_ && KEY) {
  const bad = [URL_, KEY].filter((v) => PLACEHOLDERS.includes(v.toLowerCase()));
  check("values are not .env.example placeholders", bad.length === 0, bad.join(", "));
}

const looksLocal = URL_ && /localhost|127\.0\.0\.1/.test(URL_);
check(
  "VITE_SUPABASE_URL points at a real Supabase host",
  !looksLocal,
  looksLocal ? "points at localhost" : "",
);

if (URL_ && !/^https:\/\/.+\.supabase\.(co|in)$/.test(URL_)) {
  console.log(`  WARN  VITE_SUPABASE_URL is not a standard Supabase URL: ${URL_}`);
}

if (!URL_ || !KEY) {
  console.log(
    "\n  Cannot continue. Copy .env.example to .env and set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.\n" +
      "  On Vercel: Project > Settings > Environment Variables, then redeploy.\n" +
      "  VITE_ variables are inlined at BUILD time — adding one after a build requires a redeploy.\n",
  );
  process.exit(1);
}

// ---- 2. connectivity -----------------------------------------------------
console.log("\n2. Connectivity");
let reachable = false;
try {
  const res = await fetch(`${URL_}/auth/v1/health`, {
    headers: { apikey: KEY },
    signal: AbortSignal.timeout(15000),
  });
  reachable = res.ok;
  check("Supabase auth endpoint is reachable", res.ok, `HTTP ${res.status}`);
} catch (e) {
  check("Supabase auth endpoint is reachable", false, e.message);
}

if (!reachable) {
  console.log(
    "\n  The project URL did not respond. Check the URL, your network, and any firewall rules.\n",
  );
  process.exit(1);
}

// ---- 3. key type ---------------------------------------------------------
console.log("\n3. API key");
const isLegacyJwt = /^eyJ[A-Za-z0-9_-]+\./.test(KEY);
const isPublishable = /^sb_(publishable|secret)_/.test(KEY);
check(
  "key looks like an anon/publishable key (not a service-role key)",
  isLegacyJwt || isPublishable,
  isLegacyJwt
    ? "legacy JWT anon key"
    : isPublishable
      ? "sb_publishable key"
      : "unrecognised format",
);
if (/service_role|secret_/i.test(KEY) && /^sb_secret_/.test(KEY)) {
  console.log("  FAIL  this looks like a service-role key. Never put it in a VITE_ variable.");
}

// ---- 4. schema -----------------------------------------------------------
console.log("\n4. Database (run the migrations first)");
const rest = async (path, init = {}) => {
  const res = await fetch(`${URL_}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    signal: AbortSignal.timeout(15000),
  });
  const text = await res.text();
  let body = null;
  try {
    body = JSON.parse(text);
  } catch {
    /* keep text */
  }
  return { status: res.status, body, text };
};

const profiles = await rest("profiles?select=id&limit=1");
check(
  "profiles table exists and is reachable",
  profiles.status === 200,
  profiles.status === 200
    ? "reachable (empty is fine)"
    : `HTTP ${profiles.status} — ${profiles.text.slice(0, 160)}\n          run supabase/migrations/*.sql in order`,
);

const reports = await rest("reports?select=id&limit=1");
check(
  "reports table exists",
  reports.status === 200 || reports.status === 401,
  reports.status === 200 ? "reachable" : `HTTP ${reports.status}`,
);

if (profiles.status === 200) {
  const ensure = await rest("rpc/ensure_profile", { method: "POST", body: "{}" });
  const missing = ensure.status === 404;
  check(
    "ensure_profile() RPC exists (migration 011)",
    !missing,
    missing
      ? "not found — apply 011_auth_and_organization_team.sql, then reload the PostgREST schema"
      : ensure.status === 401
        ? "exists but rejects the anon key (expected: it requires authentication)"
        : "exists",
  );
  if (missing) {
    console.log(
      "\n  Without 011, an account whose profiles row is missing cannot sign in correctly.\n" +
        "  Apply it, then run: NOTIFY pgrst, 'reload schema';\n",
    );
  }
}

if (ORG) {
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(ORG);
  check(
    "VITE_DEFAULT_ORGANIZATION_ID is a valid UUID",
    uuid,
    uuid ? ORG : `"${ORG}" is not a UUID`,
  );
} else {
  console.log("  WARN  VITE_DEFAULT_ORGANIZATION_ID is not set — anonymous reporting will fail.");
}

// ---- 5. live sign-in -----------------------------------------------------
console.log("\n5. Live sign-in (creates a throwaway account)");
const email = `civiceye-check-${Date.now()}@example.com`;
const password = "Check1234!";

const signup = await fetch(`${URL_}/auth/v1/signup`, {
  method: "POST",
  headers: { apikey: KEY, "Content-Type": "application/json" },
  body: JSON.stringify({ email, password, data: { full_name: "Auth Self Check" } }),
  signal: AbortSignal.timeout(20000),
});
const signupBody = await signup.json().catch(() => null);

const needsConfirm = Boolean(signupBody?.user) && !signupBody?.access_token;
if (needsConfirm) {
  console.log(
    "  INFO  Email confirmation is ON in this Supabase project.\n" +
      "        A new account cannot sign in until the address is confirmed.\n" +
      "        THIS IS THE MOST LIKELY CAUSE OF 'sign in failed' on a fresh account.\n" +
      "        Turn it off for a demo: Authentication > Providers > Email > Confirm email (off).\n",
  );
} else {
  check(
    "sign-up returns a session",
    Boolean(signupBody?.access_token),
    signup.ok ? "session returned" : JSON.stringify(signupBody),
  );
}

const login = await fetch(`${URL_}/auth/v1/token?grant_type=password`, {
  method: "POST",
  headers: { apikey: KEY, "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
  signal: AbortSignal.timeout(20000),
});
const loginBody = await login.json().catch(() => null);
const loggedIn = Boolean(loginBody?.access_token);

check(
  "sign-in with a known-good account succeeds",
  loggedIn,
  loggedIn ? "token issued" : `HTTP ${login.status} — ${JSON.stringify(loginBody)?.slice(0, 200)}`,
);

if (loggedIn) {
  const token = loginBody.access_token;
  const me = await fetch(`${URL_}/auth/v1/user`, {
    headers: { apikey: KEY, Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(15000),
  });
  check("the issued token identifies the user", me.ok, `HTTP ${me.status}`);

  const myProfile = await rest("profiles?select=id,role,organization_id", {
    headers: { Authorization: `Bearer ${token}` },
  });
  check(
    "the new account can read its own profile",
    myProfile.status === 200,
    myProfile.status === 200
      ? "readable — role was created by the handle_new_user trigger"
      : `HTTP ${myProfile.status} — ${myProfile.text.slice(0, 180)}\n          if this is 200 with an empty array, the trigger did not fire`,
  );
  if (myProfile.status === 200 && Array.isArray(myProfile.body) && myProfile.body.length === 0) {
    console.log(
      "          The handle_new_user trigger did not create a profile row.\n" +
        "          Re-apply 011, which redefines the trigger.\n",
    );
  }
}

const wrongPw = await fetch(`${URL_}/auth/v1/token?grant_type=password`, {
  method: "POST",
  headers: { apikey: KEY, "Content-Type": "application/json" },
  body: JSON.stringify({ email, password: "DefinitelyWrong123!" }),
  signal: AbortSignal.timeout(20000),
});
check("a wrong password is rejected (as it should be)", !wrongPw.ok, `HTTP ${wrongPw.status}`);

// ---- summary -------------------------------------------------------------
console.log(`\n${pass} passed, ${fail} failed\n`);
if (fail) {
  console.log("Read the FAIL lines above — each one names the layer that is broken.\n");
}
process.exit(fail ? 1 : 0);
