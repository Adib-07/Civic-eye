import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supabase-ET64mUQq.js
/**
* Client-side environment helpers for CivicEye Supabase integration.
* Secrets belong in local .env only — never commit real values.
*
* Lovable-linked Supabase projects often expose VITE_SUPABASE_PUBLISHABLE_KEY
* instead of VITE_SUPABASE_ANON_KEY — both are supported here.
*/
var PLACEHOLDER_VALUES = /* @__PURE__ */ new Set([
	"",
	"your-anon-key",
	"your-public-key",
	"your-publishable-key",
	"https://your-project.supabase.co",
	"your-project-id"
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
var _env = {
	VITE_SUPABASE_URL: void 0,
	VITE_SUPABASE_ANON_KEY: void 0,
	VITE_SUPABASE_PUBLISHABLE_KEY: void 0,
	VITE_SUPABASE_PROJECT_ID: void 0,
	VITE_DEFAULT_ORGANIZATION_ID: void 0,
	VITE_BILLING_PROVIDER: void 0,
	VITE_BILLING_CHECKOUT_ENABLED: void 0,
	VITE_MAP_TILE_URL: void 0,
	VITE_MAP_TILE_ATTRIBUTION: void 0
};
/**
* SSR / Node.js fallback — Vite only exposes VITE_* variables on
* `import.meta.env` for the client bundle.  During server-side rendering
* (Nitro / Node.js), `import.meta.env` contains only MODE, BASE_URL, PROD,
* DEV, and SSR.  `process.env` always has the actual values server-side.
*/
if (typeof process !== "undefined" && process.env) {
	for (const key of Object.keys(_env)) if (_env[key] === void 0) _env[key] = process.env[key];
}
function readEnv(key) {
	const value = _env[key];
	if (!value) return void 0;
	const trimmed = value.trim();
	if (PLACEHOLDER_VALUES.has(trimmed)) return void 0;
	return trimmed;
}
function readFirstEnv(...keys) {
	for (const key of keys) {
		const value = readEnv(key);
		if (value) return value;
	}
}
function getSupabaseUrl() {
	const direct = readEnv("VITE_SUPABASE_URL");
	if (direct) return direct;
	const projectId = readEnv("VITE_SUPABASE_PROJECT_ID");
	if (projectId) return `https://${projectId}.supabase.co`;
}
/** Browser-safe Supabase key (anon / publishable). Never use service-role keys here. */
function getSupabaseAnonKey() {
	return readFirstEnv("VITE_SUPABASE_ANON_KEY", "VITE_SUPABASE_PUBLISHABLE_KEY");
}
/** True when Supabase URL and anon/publishable key are both set. */
function isSupabaseConfigured() {
	return Boolean(getSupabaseUrl() && getSupabaseAnonKey());
}
/**
* Returns a human-readable error when Supabase is not configured.
* Returns null when Supabase is properly set up.
*/
function getSupabaseConfigError() {
	if (isSupabaseConfigured()) return null;
	const missing = [];
	if (!getSupabaseUrl()) missing.push("VITE_SUPABASE_URL (or VITE_SUPABASE_PROJECT_ID)");
	if (!getSupabaseAnonKey()) missing.push("VITE_SUPABASE_ANON_KEY (or VITE_SUPABASE_PUBLISHABLE_KEY)");
	return `Supabase credentials missing: ${missing.join(" and ")}. Copy .env.example to .env and set your project credentials.`;
}
/**
* Diagnostic summary showing which env vars are detected.
* Useful for debugging configuration issues.
*/
function getSupabaseConfigSummary() {
	const urlRaw = _env["VITE_SUPABASE_URL"]?.trim();
	const keyRaw = (_env["VITE_SUPABASE_ANON_KEY"] ?? _env["VITE_SUPABASE_PUBLISHABLE_KEY"])?.trim();
	const orgRaw = _env["VITE_DEFAULT_ORGANIZATION_ID"]?.trim();
	return {
		configured: isSupabaseConfigured(),
		urlPresent: Boolean(getSupabaseUrl()),
		keyPresent: Boolean(getSupabaseAnonKey()),
		orgPresent: Boolean(getDefaultOrganizationId()),
		urlRaw: urlRaw || void 0,
		keyRaw: keyRaw ? `${keyRaw.slice(0, 6)}…` : void 0,
		orgRaw: orgRaw || void 0
	};
}
if (typeof window !== "undefined" && !isSupabaseConfigured()) {
	const summary = getSupabaseConfigSummary();
	console.warn(`[CivicEye] Supabase is not configured. Report submission and staff features require database access.
→ VITE_SUPABASE_URL detected: ${summary.urlPresent ? "yes" : "NO — not found or placeholder"}\n→ VITE_SUPABASE_ANON_KEY detected: ${summary.keyPresent ? "yes" : "NO — not found or placeholder"}\n→ VITE_DEFAULT_ORGANIZATION_ID detected: ${summary.orgPresent ? "yes" : "NO"}\n→ Copy .env.example to .env and set VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY.
→ For Lovable projects, use VITE_SUPABASE_PUBLISHABLE_KEY instead of VITE_SUPABASE_ANON_KEY.`);
}
/** Organization UUID for routing citizen reports. Required when Supabase is enabled. */
function getDefaultOrganizationId() {
	return readEnv("VITE_DEFAULT_ORGANIZATION_ID");
}
function requireDefaultOrganizationId() {
	const id = getDefaultOrganizationId();
	if (!id) throw new Error("VITE_DEFAULT_ORGANIZATION_ID is not set. Create an organization in Supabase and add its UUID to .env.");
	return id;
}
/**
* Organization scope for queries:
* - Staff: profile.organization_id only (never fall back to default — RLS isolation)
* - Citizens / anonymous: VITE_DEFAULT_ORGANIZATION_ID
*/
function resolveOrganizationId(profile) {
	if (profile?.role === "ward_officer" || profile?.role === "admin" || profile?.role === "super_admin") return profile?.organizationId ?? null;
	return getDefaultOrganizationId() ?? null;
}
var client = null;
function assertValidSupabaseUrl(url) {
	try {
		const parsed = new URL(url);
		if (parsed.protocol !== "https:" && parsed.protocol !== "http:") throw new Error("URL must use http or https");
	} catch {
		throw new Error(`Invalid VITE_SUPABASE_URL: "${url}"`);
	}
}
/**
* Returns a singleton Supabase browser client, or null when env vars are missing.
*/
function getSupabase() {
	if (!isSupabaseConfigured()) return null;
	if (!client) {
		const url = getSupabaseUrl();
		const anonKey = getSupabaseAnonKey();
		assertValidSupabaseUrl(url);
		client = createClient(url, anonKey, { auth: {
			persistSession: true,
			autoRefreshToken: true,
			detectSessionInUrl: true
		} });
	}
	return client;
}
/** Returns the Supabase client or throws with a setup hint. */
function requireSupabase() {
	const sb = getSupabase();
	if (!sb) throw new Error("Supabase is not configured. Copy .env.example to .env and set VITE_SUPABASE_URL plus VITE_SUPABASE_ANON_KEY (or VITE_SUPABASE_PUBLISHABLE_KEY).");
	return sb;
}
//#endregion
export { isSupabaseConfigured as a, resolveOrganizationId as c, getSupabaseConfigSummary as i, getSupabase as n, requireDefaultOrganizationId as o, getSupabaseConfigError as r, requireSupabase as s, getDefaultOrganizationId as t };
