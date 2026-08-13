import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import {
  FiGrid,
  FiPlusCircle,
  FiList,
  FiMap,
  FiLogOut,
  FiMenu,
  FiX,
  FiEye,
  FiSun,
  FiMoon,
  FiUser,
  FiAlertTriangle,
} from "react-icons/fi";
import { toast } from "sonner";

import { signOut } from "@/lib/auth";
import { useAuth, useTheme } from "@/lib/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { canManageReports, isStaffRole } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Loader } from "./EmptyState";

type NavItem = {
  to: string;
  label: string;
  icon: typeof FiGrid;
  staffOnly: boolean;
  search?: Record<string, string | boolean>;
};

const nav: NavItem[] = [
  { to: "/dashboard", label: "Overview", icon: FiGrid, staffOnly: true },
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
  { to: "/report", label: "Report issue", icon: FiPlusCircle, staffOnly: false },
  { to: "/map", label: "Map", icon: FiMap, staffOnly: false },
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

  useEffect(() => {
    if (authLoading) return;

    if (requireAuth && !session) {
      toast.error("Please sign in to continue");
      navigate({ to: "/login" });
      return;
    }

    if (requireStaff && !isStaffRole(profile?.role)) {
      toast.error("Staff access required");
      navigate({ to: "/login" });
      return;
    }

    setReady(true);
  }, [requireAuth, requireStaff, session, profile, authLoading, navigate]);

  const visibleNav = nav.filter((item) => !item.staffOnly || isStaffRole(profile?.role));
  const staffNav = visibleNav.filter((item) => item.staffOnly);
  const publicNav = visibleNav.filter((item) => !item.staffOnly);

  const isActive = (item: NavItem) => {
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
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
        isActive(item) && "bg-brand text-primary-foreground hover:text-primary-foreground",
      )}
    >
      <item.icon className="h-4 w-4 shrink-0" aria-hidden />
      <span className="truncate">{item.label}</span>
    </Link>
  );

  return (
    <div className="hero-bg min-h-screen">
      <div className="mx-auto flex w-[min(1400px,96vw)] gap-6 py-4">
        <aside
          className={cn(
            "glass fixed inset-y-0 left-0 z-[900] flex w-64 shrink-0 flex-col rounded-none p-4 transition-transform lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:translate-x-0 lg:rounded-2xl",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <Link to="/" className="flex items-center gap-2.5 px-2 py-1">
            <span
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-primary-foreground shadow-[var(--shadow-xs)] ring-1 ring-inset ring-white/15"
              style={{ background: "var(--gradient-brand)" }}
            >
              <FiEye className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-extrabold">
              Civic<span className="text-gradient">Eye</span>
            </span>
          </Link>

          {profile && (
            <p className="mt-3 truncate px-2 text-xs text-muted-foreground">
              {profile.fullName ?? profile.email} · {profile.role.replace("_", " ")}
            </p>
          )}

          <nav className="mt-6 flex flex-1 flex-col gap-1">
            {staffNav.length > 0 && (
              <>
                <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                  Operations
                </p>
                {staffNav.map((item) => (
                  <NavLink key={`${item.to}-${item.label}`} item={item} />
                ))}
              </>
            )}
            <p className="mt-3 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
              Public
            </p>
            {publicNav.map((item) => (
              <NavLink key={item.to} item={item} />
            ))}
          </nav>

          {session ? (
            <button
              onClick={async () => {
                await signOut();
                void qc.invalidateQueries({ queryKey: ["auth"] });
                void qc.invalidateQueries({ queryKey: ["reports"] });
                void qc.invalidateQueries({ queryKey: ["staff"] });
                toast.success("Signed out");
                navigate({ to: "/" });
              }}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-destructive"
            >
              <FiLogOut className="h-4 w-4" /> Sign out
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-primary hover:bg-secondary"
            >
              Staff sign in
            </Link>
          )}
        </aside>

        {open && (
          <div
            className="fixed inset-0 z-[800] bg-background/60 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        <main className="min-w-0 flex-1">
          <header className="glass grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-2xl px-4 py-3 sm:flex sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <button
                onClick={() => setOpen((o) => !o)}
                aria-label="Toggle sidebar"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border lg:hidden"
              >
                {open ? <FiX className="h-4 w-4" /> : <FiMenu className="h-4 w-4" />}
              </button>
              <div className="min-w-0">
                <h1 className="truncate font-display text-xl font-extrabold sm:text-2xl">
                  {title}
                </h1>
                {subtitle && (
                  <p className="truncate text-xs text-muted-foreground sm:text-sm">{subtitle}</p>
                )}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={toggle}
                aria-label="Toggle dark mode"
                className="grid h-9 w-9 place-items-center rounded-xl border border-border hover:bg-secondary"
              >
                {dark ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
              </button>
              <Link to="/report" className="btn-primary hidden px-4 py-2 sm:inline-flex">
                New report
              </Link>
            </div>
          </header>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-5 pb-16"
          >
            {ready ? children : <Loader label="Checking session" />}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export { canManageReports };
