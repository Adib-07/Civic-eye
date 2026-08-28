import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FiEye, FiLock, FiMail, FiArrowLeft } from "react-icons/fi";
import { toast } from "sonner";

import { signIn } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";
import { useAuth } from "@/lib/hooks";
import { isStaffRole } from "@/lib/types";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — CivicEye Admin" },
      {
        name: "description",
        content: "Sign in to the CivicEye admin console to triage and resolve city issue reports.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const { session, profile, loading, isConfigured } = useAuth();

  useEffect(() => {
    if (!loading && session) {
      navigate({ to: isStaffRole(profile?.role) ? "/dashboard" : "/reports" });
    }
  }, [loading, session, profile, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConfigured) {
      toast.error("Supabase is not configured. Add credentials to your .env file.");
      return;
    }

    setBusy(true);
    try {
      const result = await signIn(email.trim(), password);
      toast.success("Signed in successfully");
      navigate({ to: isStaffRole(result.profile?.role) ? "/dashboard" : "/reports" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign in failed";
      toast.error(message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="hero-bg grid min-h-screen place-items-center p-4">
      <div className="surface-panel w-full max-w-md p-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <FiArrowLeft aria-hidden /> Back to home
        </Link>

        <div className="mt-6 flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
            <FiEye className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <h1 className="font-display text-xl font-semibold">Staff sign in</h1>
            <p className="text-sm text-muted-foreground">Organization operations access</p>
          </div>
        </div>

        {!isConfigured && (
          <div className="mt-6 rounded-md border border-warning/30 bg-warning/8 p-4 text-sm text-muted-foreground">
            Supabase is not configured. Copy <code className="font-mono text-xs">.env.example</code>{" "}
            to <code className="font-mono text-xs">.env</code> and set your organization
            credentials.
          </div>
        )}

        <form onSubmit={submit} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">Email</span>
            <div className="mt-1.5 flex items-center gap-2 rounded-md border border-border bg-card px-3 focus-within:border-primary">
              <FiMail className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourorganization.com"
                className="w-full bg-transparent py-2.5 text-sm outline-none"
                required
                autoComplete="email"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">Password</span>
            <div className="mt-1.5 flex items-center gap-2 rounded-md border border-border bg-card px-3 focus-within:border-primary">
              <FiLock className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent py-2.5 text-sm outline-none"
                required
                autoComplete="current-password"
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={busy || !isConfigured}
            className="btn-primary w-full py-2.5"
          >
            {busy && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
            )}
            {busy ? "Signing in" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
          Staff and admins are provisioned by your organization administrator in Supabase
          Auth.
        </p>
      </div>
    </main>
  );
}
