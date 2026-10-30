import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { FiBell, FiLogOut, FiMonitor, FiMoon, FiSettings, FiSun } from "react-icons/fi";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { signOut } from "@/lib/auth";
import { useAuth, useTheme } from "@/lib/hooks";
import { requireSession } from "@/lib/route-guards";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  beforeLoad: async ({ location }) => {
    await requireSession(location);
  },
  head: () => ({
    meta: [{ title: "Settings — CivicEye" }],
  }),
  component: SettingsPage,
});

type ThemeChoice = "light" | "dark";

const THEME_KEY = "civiceye_theme";

function SettingsPage() {
  const navigate = useNavigate();
  const { profile, user } = useAuth();
  const { dark, toggle } = useTheme();
  const [busy, setBusy] = useState(false);

  const chooseTheme = (choice: ThemeChoice) => {
    if ((choice === "dark") === dark) return;
    toggle();
  };

  const signOutNow = async () => {
    setBusy(true);
    try {
      await signOut();
      toast.success("Signed out");
      await navigate({ to: "/login", replace: true });
    } catch {
      toast.error("Sign out failed. Please try again.");
      setBusy(false);
    }
  };

  return (
    <AppShell title="Settings" subtitle="Appearance, notifications and account" requireAuth>
      <div className="max-w-3xl space-y-5">
        <section className="surface-panel p-6">
          <div className="flex items-start gap-4">
            <span className="icon-wrapper-xl icon-wrapper-primary shrink-0">
              <FiMonitor className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-base font-semibold">Appearance</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                CivicEye ships with a light and a dark theme. Your choice is remembered on this
                device.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {(
                  [
                    { id: "light" as const, label: "Light", icon: FiSun },
                    { id: "dark" as const, label: "Dark", icon: FiMoon },
                  ] satisfies { id: ThemeChoice; label: string; icon: typeof FiSun }[]
                ).map((option) => {
                  const active = dark === (option.id === "dark");
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => chooseTheme(option.id)}
                      aria-pressed={active}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border p-4 text-left transition-colors",
                        active
                          ? "border-primary/50 bg-primary/5"
                          : "border-border hover:bg-secondary",
                      )}
                    >
                      <option.icon
                        className={cn("h-5 w-5", active ? "text-primary" : "text-muted-foreground")}
                        aria-hidden
                      />
                      <span>
                        <span className="block text-sm font-semibold">{option.label}</span>
                        <span className="block text-xs text-muted-foreground">
                          {option.id === "light" ? "Default CivicEye look" : "Easier in low light"}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                Saved locally as <code className="font-mono">{THEME_KEY}</code> in this browser.
              </p>
            </div>
          </div>
        </section>

        <section className="surface-panel p-6">
          <div className="flex items-start gap-4">
            <span className="icon-wrapper-xl icon-wrapper-primary shrink-0">
              <FiBell className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-base font-semibold">Notifications</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Assignment, status change and SLA alerts appear in your in-app notifications.
              </p>
              <Link to="/notifications" className="btn-secondary mt-4 inline-flex gap-2">
                <FiSettings className="h-4 w-4" aria-hidden /> Open notifications
              </Link>
              <p className="mt-4 text-xs text-muted-foreground">
                Email and SMS delivery are configured per organization by a CivicEye operator. When
                they are not enabled, alerts stay in-app only — we never pretend to send mail that
                was not actually sent.
              </p>
            </div>
          </div>
        </section>

        <section className="surface-panel p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-base font-semibold">Account</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Signed in as {profile?.email ?? user?.email}. Sign out to end this session on this
                device.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/profile" className="btn-secondary justify-center">
                Edit profile
              </Link>
              <button
                type="button"
                onClick={() => void signOutNow()}
                disabled={busy}
                className="btn-secondary justify-center gap-2 text-destructive disabled:opacity-60"
              >
                <FiLogOut className="h-4 w-4" aria-hidden />
                {busy ? "Signing out…" : "Sign out"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
