import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass w-full max-w-md rounded-3xl p-8"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
        >
          <FiArrowLeft /> Back to home
        </Link>

        <div className="mt-6 flex items-center gap-3">
          <span className="bg-brand grid h-11 w-11 place-items-center rounded-xl text-primary-foreground">
            <FiEye className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-display text-2xl font-extrabold">Staff sign in</h1>
            <p className="text-sm text-muted-foreground">Organization dashboard access</p>
          </div>
        </div>

        {!isConfigured && (
          <div className="mt-6 rounded-xl border border-warning/40 bg-warning/10 p-4 text-sm text-warning">
            Supabase is not configured. Copy <code className="font-mono">.env.example</code> to{" "}
            <code className="font-mono">.env</code> and run the migration in{" "}
            <code className="font-mono">supabase/migrations/</code>.
          </div>
        )}

        <form onSubmit={submit} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-xs font-bold text-muted-foreground">Email</span>
            <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-border bg-card/60 px-3">
              <FiMail className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="officer@municipality.gov.in"
                className="w-full bg-transparent py-3 text-sm outline-none"
                required
                autoComplete="email"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-xs font-bold text-muted-foreground">Password</span>
            <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-border bg-card/60 px-3">
              <FiLock className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent py-3 text-sm outline-none"
                required
                autoComplete="current-password"
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={busy || !isConfigured}
            className="bg-brand flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-primary-foreground disabled:opacity-70"
          >
            {busy && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
            )}
            {busy ? "Signing in" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Ward officers and admins are provisioned by your organization administrator in Supabase
          Auth.
        </p>
      </motion.div>
    </main>
  );
}
