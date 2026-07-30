import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiEye, FiLock, FiUser, FiArrowLeft } from "react-icons/fi";
import { toast } from "sonner";
import { getSession, login } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — CivicEye Admin" },
      {
        name: "description",
        content: "Sign in to the CivicEye admin console to triage and resolve city issue reports.",
      },
      { property: "og:title", content: "Sign in — CivicEye Admin" },
      { property: "og:description", content: "Access the CivicEye admin dashboard." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (getSession()) navigate({ to: "/dashboard" });
  }, [navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setTimeout(() => {
      if (login(username, password)) {
        toast.success("Welcome back, admin");
        navigate({ to: "/dashboard" });
      } else {
        toast.error("Invalid credentials. Try admin / admin123");
        setBusy(false);
      }
    }, 600);
  };

  return (
    <div className="hero-bg grid min-h-screen place-items-center p-4">
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
            <h1 className="font-display text-2xl font-extrabold">Admin sign in</h1>
            <p className="text-sm text-muted-foreground">Manage every civic report</p>
          </div>
        </div>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-xs font-bold text-muted-foreground">Username</span>
            <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-border bg-card/60 px-3">
              <FiUser className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-transparent py-3 text-sm outline-none"
                required
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
                placeholder="admin123"
                className="w-full bg-transparent py-3 text-sm outline-none"
                required
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={busy}
            className="bg-brand flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-primary-foreground disabled:opacity-70"
          >
            {busy && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
            )}
            {busy ? "Signing in" : "Sign in"}
          </button>
        </form>

        <div className="mt-6 rounded-xl border border-dashed border-border p-3 text-center text-xs text-muted-foreground">
          Demo credentials — <span className="font-bold text-foreground">admin</span> /{" "}
          <span className="font-bold text-foreground">admin123</span>
        </div>
      </motion.div>
    </div>
  );
}
