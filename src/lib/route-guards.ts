import { redirect } from "@tanstack/react-router";

import { ensureAuthInitialized, getAuthState } from "./auth-store";
import { getSupabase } from "./supabase";
import { isOrgAdmin, isStaffRole } from "./types";

/**
 * Where an authenticated user belongs after login / signup.
 *
 * `/dashboard` is the universal authenticated home so there is a single,
 * predictable destination regardless of role. Staff-only areas (the operations
 * queue, the organization console) are reached from the sidebar, not from a
 * role-dependent redirect that can bounce a user back to /login.
 */
export const POST_LOGIN_PATH = "/dashboard";

/**
 * Route prefixes that require a session. Kept in one place so the router
 * `beforeLoad` guards and the client-side auth gate can never disagree.
 */
export const PROTECTED_ROUTE_PREFIXES = [
  "/dashboard",
  "/issues",
  "/reports",
  "/map",
  "/chat",
  "/notifications",
  "/profile",
  "/settings",
  "/organization",
  "/onboarding",
] as const;

/** Pages that make no sense once you are already signed in. */
export const GUEST_ONLY_PATHS = ["/login", "/signup"] as const;

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function isGuestOnlyPath(pathname: string): boolean {
  return (GUEST_ONLY_PATHS as readonly string[]).includes(pathname);
}

export type GuardLocation = {
  pathname: string;
  search?: Record<string, unknown>;
};

/** Only allow same-origin, absolute-path redirects — never an attacker-supplied URL. */
export function sanitizeRedirect(target: unknown): string | null {
  if (typeof target !== "string") return null;
  if (!target.startsWith("/") || target.startsWith("//")) return null;
  if (target.startsWith("/login") || target.startsWith("/signup")) return null;
  return target;
}

/**
 * Router `beforeLoad` guard. Runs before the protected route renders, so an
 * unauthenticated visitor is redirected instead of briefly seeing the page or
 * firing its data queries.
 *
 * Guards only run in the browser: on the server there is no session to read and
 * the auth store is intentionally inert, so the route renders its loading state
 * and the client performs the redirect right after hydration.
 */
export async function requireSession(location: GuardLocation) {
  if (typeof window === "undefined") return;

  const sb = getSupabase();
  if (!sb) {
    // No backend means there is definitively no session. Send the visitor to
    // the sign-in screen, which explains the missing configuration, rather than
    // rendering a shell full of failed queries.
    throw redirect({ to: "/login", search: {}, replace: true });
  }

  await ensureAuthInitialized();

  const { data } = await sb.auth.getSession();
  const session = data?.session ?? null;

  if (!session) {
    const target = sanitizeRedirect(location.search?.redirect);
    throw redirect({
      to: "/login",
      search: target ? { redirect: target } : {},
      replace: true,
    });
  }
}

/** Guard for the operations queue — any signed-in organization staff member. */
export async function requireStaff(location: GuardLocation) {
  await requireSession(location);

  if (typeof window === "undefined") return;

  const { profile } = getAuthState();

  if (!isStaffRole(profile?.role)) {
    throw redirect({ to: POST_LOGIN_PATH, search: {}, replace: true });
  }
}

/** Guard for the organization console — organization admins only. */
export async function requireOrgAdmin(location: GuardLocation) {
  await requireStaff(location);

  if (typeof window === "undefined") return;

  const { profile } = getAuthState();

  if (!isOrgAdmin(profile?.role)) {
    throw redirect({ to: "/organization", search: {}, replace: true });
  }
}
