import { createFileRoute, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { useAuthState } from "@/lib/auth-store";
import {
  isGuestOnlyPath,
  isProtectedPath,
  POST_LOGIN_PATH,
  sanitizeRedirect,
} from "@/lib/route-guards";
import { isOrgAdmin, isStaffRole, type UserRole } from "@/lib/types";

type AccessRule = "any" | "staff" | "orgAdmin";

/**
 * Path -> minimum role, for the routes that render inside the app shell.
 * `/organization*` is the organization console; `/reports` is the staff queue.
 */
const ROLE_RULES: { prefix: string; access: AccessRule }[] = [
  { prefix: "/reports", access: "staff" },
  { prefix: "/organization/team", access: "orgAdmin" },
  { prefix: "/organization/settings", access: "orgAdmin" },
  { prefix: "/organization", access: "staff" },
];

function ruleFor(pathname: string): AccessRule {
  const match = ROLE_RULES.filter(
    (rule) => pathname === rule.prefix || pathname.startsWith(`${rule.prefix}/`),
  ).sort((a, b) => b.prefix.length - a.prefix.length)[0];
  return match?.access ?? "any";
}

function satisfies(role: UserRole | null | undefined, access: AccessRule): boolean {
  if (access === "any") return true;
  if (access === "staff") return isStaffRole(role);
  return isOrgAdmin(role);
}

function denyPath(role: UserRole | null | undefined, access: AccessRule): string {
  if (access === "orgAdmin") return "/organization";
  if (access === "staff") return POST_LOGIN_PATH;
  return role ? POST_LOGIN_PATH : "/login";
}

/**
 * Client-side auth gate.
 *
 * `beforeLoad` guards on the routes are the first line of defence (they run on
 * in-app navigation), but after server-side rendering the router reuses the
 * already-resolved matches, so a full page load of a protected URL would never
 * re-run them. This gate closes that gap and is the single place that decides
 * whether the current URL is allowed for the current session AND role.
 *
 * It also stops a signed-in user from sitting on /login or /signup.
 */
export function AuthGate({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const redirectParam = useRouterState({
    select: (s) => (s.location.search as Record<string, unknown> | undefined)?.redirect,
  });
  const { ready, session, profile, profileLoading } = useAuthState();

  const protectedPath = isProtectedPath(pathname);
  const guestOnlyPath = isGuestOnlyPath(pathname);
  const access = ruleFor(pathname);

  // Role decisions must wait for the profile row, otherwise a staff member
  // would be bounced out of the staff console during the first render.
  const resolving = !ready || (Boolean(session) && profileLoading);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (resolving) return;

    if (protectedPath && !session) {
      const target = sanitizeRedirect(redirectParam) ?? pathname;
      void navigate({
        to: "/login",
        search: target && target !== "/login" ? { redirect: target } : {},
        replace: true,
      });
      return;
    }

    if (protectedPath && session && !satisfies(profile?.role, access)) {
      void navigate({ to: denyPath(profile?.role, access), replace: true });
      return;
    }

    if (guestOnlyPath && session) {
      const target = sanitizeRedirect(redirectParam) ?? POST_LOGIN_PATH;
      void navigate({ to: target, replace: true });
    }
  }, [
    navigate,
    pathname,
    protectedPath,
    guestOnlyPath,
    session,
    profile,
    access,
    resolving,
    redirectParam,
  ]);

  // Hold back protected content until the session and role are known, so a
  // signed-out visitor never sees a frame of the authenticated UI, and a
  // citizen never sees a frame of the staff console.
  //
  // This branch must produce identical output on the server and on the client's
  // first render. The store starts with `ready === false` on both, so both
  // render the gate and React hydrates cleanly.
  if (protectedPath && resolving) {
    return (
      <div className="hero-bg grid min-h-screen place-items-center bg-background">
        <div className="flex flex-col items-center gap-3" role="status" aria-live="polite">
          <span
            className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary"
            aria-hidden
          />
          <p className="text-sm font-medium text-muted-foreground">Checking your access…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export { sanitizeRedirect };
