import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import {
  FiAlertTriangle,
  FiArrowRight,
  FiBell,
  FiEye,
  FiGrid,
  FiList,
  FiLock,
  FiLogOut,
  FiMap,
  FiMenu,
  FiMessageSquare,
  FiMoon,
  FiPlusCircle,
  FiSettings,
  FiSun,
  FiUser,
  FiUsers,
  FiX,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import { toast } from "sonner";

import { signOut } from "@/lib/auth";
import {
  useAuth,
  useOrganizationSubscription,
  useTheme,
  useUnreadNotificationCount,
} from "@/lib/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { canManageReports, isOrgAdmin, isStaffRole, roleLabel } from "@/lib/types";
import { getDefaultOrganizationId, resolveOrganizationId } from "@/lib/env";
import { cn } from "@/lib/utils";
import { Loader } from "./EmptyState";

type NavItem = {
  to: string;
  label: string;
  icon: IconType;
  search?: Record<string, string | boolean>;
  /** Hidden from citizens. */
  staffOnly?: boolean;
  /** Hidden from everyone except organization admins. */
  adminOnly?: boolean;
  /** Anyone can reach it — used for the "Public" grouping. */
  publicOnly?: boolean;
  badge?: "notifications";
};

type NavSection = { heading: string; items: NavItem[] };

const NAV: NavSection[] = [
  {
    heading: "Workspace",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: FiGrid },
      { to: "/issues", label: "Civic issues", icon: FiList },
      { to: "/map", label: "Map", icon: FiMap },
      { to: "/report", label: "Report issue", icon: FiPlusCircle },
    ],
  },
  {
    heading: "Operations",
    items: [
      { to: "/reports", label: "All reports", icon: FiList, staffOnly: true },
      {
        to: "/reports",
        label: "Assigned to me",
        icon: FiUser,
        staffOnly: true,
        search: { assigned: "me" },
      },
      {
        to: "/reports",
        label: "SLA / attention",
        icon: FiAlertTriangle,
        staffOnly: true,
        search: { overdue: "1" },
      },
    ],
  },
  {
    heading: "Intelligence",
    items: [
      { to: "/chat", label: "AI Assistant", icon: FiMessageSquare },
      { to: "/notifications", label: "Notifications", icon: FiBell, badge: "notifications" },
    ],
  },
  {
    heading: "Organization",
    items: [
      { to: "/organization", label: "Organization", icon: FiUsers, staffOnly: true },
      { to: "/organization/team", label: "Team & invites", icon: FiUsers, adminOnly: true },
      { to: "/organization/billing", label: "Billing & usage", icon: FiGrid, staffOnly: true },
      { to: "/organization/settings", label: "Org settings", icon: FiSettings, adminOnly: true },
    ],
  },
  {
    heading: "Account",
    items: [
      { to: "/profile", label: "Profile", icon: FiUser },
      { to: "/settings", label: "Settings", icon: FiSettings },
    ],
  },
];

export function AppShell({
  title,
  subtitle,
  children,
  requireAuth = false,
  requireStaff = false,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  requireAuth?: boolean;
  requireStaff?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(!requireAuth && !requireStaff);
  const navigate = useNavigate();
  const { dark, toggle } = useTheme();
  const { session, profile, loading: authLoading } = useAuth();
  const qc = useQueryClient();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const search = useRouterState({ select: (s) => s.location.search }) as Record<string, unknown>;
  const unread = useUnreadNotificationCount();

  const orgId = resolveOrganizationId(profile) ?? getDefaultOrganizationId();
  const { data: subscription } = useOrganizationSubscription(
    requireStaff && isStaffRole(profile?.role) ? orgId : null,
  );

  const staff = isStaffRole(profile?.role);
  const admin = isOrgAdmin(profile?.role);

  useEffect(() => {
    if (authLoading) return;

    if (requireAuth && !session) {
      navigate({ to: "/login", search: { redirect: pathname }, replace: true });
      return;
    }

    if (requireStaff && session && profile && !staff) {
      toast.error("Staff access is required for that area.");
      navigate({ to: "/dashboard", replace: true });
      return;
    }

    setReady(true);
  }, [requireAuth, requireStaff, session, profile, authLoading, staff, navigate, pathname]);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isVisible = (item: NavItem) => {
    if (item.adminOnly) return admin;
    if (item.staffOnly) return staff;
    return true;
  };

  const isActive = (item: NavItem) => {
    if (item.to.startsWith("/organization")) {
      if (pathname !== item.to) return false;
      return true;
    }
    if (pathname !== item.to) return false;
    if (!item.search) return !search.assigned && !search.overdue;
    if (item.search.assigned === "me") return search.assigned === "me";
    if (item.search.overdue === "1") return search.overdue === "1" || search.overdue === true;
    return true;
  };

  const NavLink = ({ item }: { item: NavItem }) => (
    <Link
      to={item.to}
      search={item.search}
      onClick={() => setOpen(false)}
      aria-current={isActive(item) ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
        isActive(item) &&
          "bg-secondary font-semibold text-foreground ring-1 ring-inset ring-border",
      )}
    >
      <item.icon className="h-[18px] w-[18px] shrink-0 opacity-70" aria-hidden />
      <span className="truncate">{item.label}</span>
      {item.badge === "notifications" && unread > 0 && (
        <span className="ml-auto inline-flex min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 py-0.5 text-[10px] font-bold text-destructive-foreground">
          {unread > 99 ? "99+" : unread}
        </span>
      )}
    </Link>
  );

  const sections = NAV.map((section) => ({
    ...section,
    items: section.items.filter(isVisible),
  })).filter((section) => section.items.length > 0);

  return (
    <div className="hero-bg min-h-screen">
      <div className="container flex gap-5 py-4">
        <aside
          className={cn(
            "card fixed inset-y-0 left-0 z-[900] flex w-64 shrink-0 flex-col p-3 transition-transform lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full",
          )}
          aria-label="Main navigation"
        >
          <div className="flex items-center gap-2.5 px-2 py-1">
            <Link to="/" className="flex min-w-0 items-center gap-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                <FiEye className="h-4.5 w-4.5" aria-hidden />
              </span>
              <span className="truncate font-display text-lg font-semibold">
                Civic<span className="text-primary">Eye</span>
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="ml-auto grid h-9 w-9 place-items-center rounded-md border border-border lg:hidden"
              aria-label="Close navigation"
            >
              <FiX className="h-4.5 w-4.5" />
            </button>
          </div>

          {profile && (
            <p className="mt-3 truncate px-2 text-xs text-muted-foreground">
              {profile.fullName ?? profile.email} · {roleLabel(profile.role)}
            </p>
          )}

          <nav className="mt-4 flex-1 space-y-4 overflow-y-auto pb-2">
            {sections.map((section) => (
              <div key={section.heading}>
                <p className="px-3 pb-1.5 caption">{section.heading}</p>
                <div className="flex flex-col gap-0.5">
                  {section.items.map((item) => (
                    <NavLink key={`${item.to}-${item.label}`} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {session ? (
            <button
              type="button"
              onClick={async () => {
                try {
                  await signOut();
                  qc.clear();
                  toast.success("Signed out");
                } catch {
                  toast.error("Sign out failed. Please try again.");
                  return;
                }
                await navigate({ to: "/login", replace: true });
              }}
              className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-destructive"
            >
              <FiLogOut className="h-4 w-4" aria-hidden /> Sign out
            </button>
          ) : (
            <Link
              to="/login"
              className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-primary hover:bg-secondary"
            >
              <FiLogOut className="h-4 w-4" aria-hidden /> Sign in
            </Link>
          )}
        </aside>

        {open && (
          <div
            className="fixed inset-0 z-[800] bg-background/70 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden
          />
        )}

        <main className="min-w-0 flex-1">
          <header className="card sticky top-4 z-[60] flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-label="Open navigation"
                aria-expanded={open}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-border lg:hidden"
              >
                <FiMenu className="h-4.5 w-4.5" aria-hidden />
              </button>
              <div className="min-w-0">
                <h1 className="truncate font-display text-lg font-semibold sm:text-xl">{title}</h1>
                {subtitle && (
                  <p className="truncate text-xs text-muted-foreground sm:text-sm">{subtitle}</p>
                )}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                to="/notifications"
                className="relative grid h-9 w-9 place-items-center rounded-md border border-border hover:bg-secondary"
                aria-label={`Notifications${unread > 0 ? `, ${unread} unread` : ""}`}
              >
                <FiBell className="h-4.5 w-4.5" aria-hidden />
                {unread > 0 && (
                  <span className="absolute -right-1 -top-1 inline-flex min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                    {unread > 9 ? "9+" : unread}
                  </span>
                )}
              </Link>
              <button
                type="button"
                onClick={toggle}
                aria-label="Toggle dark mode"
                className="grid h-9 w-9 place-items-center rounded-md border border-border hover:bg-secondary"
              >
                {dark ? (
                  <FiSun className="h-4.5 w-4.5" aria-hidden />
                ) : (
                  <FiMoon className="h-4.5 w-4.5" aria-hidden />
                )}
              </button>
              <Link to="/report" className="btn-primary hidden sm:inline-flex">
                <FiPlusCircle className="h-4 w-4" aria-hidden /> New report
              </Link>
            </div>
          </header>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-4 pb-16"
          >
            {ready ? (
              requireStaff && subscription && !subscription.isActive ? (
                <SubscriptionPaywall subscription={subscription} />
              ) : (
                children
              )
            ) : (
              <Loader label="Checking your session" />
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export { canManageReports };

function SubscriptionPaywall({
  subscription,
}: {
  subscription: { planName: string; status: string; trialEndsAt: string | null };
}) {
  const isExpired =
    subscription.status === "expired" ||
    subscription.status === "cancelled" ||
    (subscription.trialEndsAt && new Date(subscription.trialEndsAt).getTime() < Date.now());

  return (
    <div className="card mx-auto max-w-lg p-8 text-center animate-scale-in">
      <div className="icon-wrapper-xl bg-destructive/10 text-destructive border-destructive/20 mx-auto mb-4">
        <FiLock className="h-7 w-7" aria-hidden />
      </div>
      <h2 className="headline-3">Subscription inactive</h2>
      <p className="mt-3 body-sm text-muted-foreground">
        {isExpired
          ? `Your ${subscription.planName} plan has expired. Contact your organization administrator to renew.`
          : `Your ${subscription.planName} plan is not currently active. Staff actions are restricted until the subscription is restored.`}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          to="/organization/billing"
          className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3"
        >
          View billing <FiArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <Link
          to="/pricing"
          className="btn-secondary inline-flex items-center justify-center gap-2 px-6 py-3"
        >
          View plans
        </Link>
      </div>
      <p className="mt-5 text-xs text-muted-foreground">
        Read-only access may still be available. Contact your organization administrator if you
        believe this is an error.
      </p>
    </div>
  );
}
