import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { z } from "zod";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiShield,
} from "react-icons/fi";
import { toast } from "sonner";

import { AuthError, signIn } from "@/lib/auth";
import { useAuth } from "@/lib/hooks";
import { getSupabase } from "@/lib/supabase";
import { POST_LOGIN_PATH, sanitizeRedirect } from "@/lib/route-guards";

const loginSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>) =>
    loginSearchSchema.parse({
      redirect: sanitizeRedirect(search.redirect) ?? undefined,
    }),
  head: () => ({
    meta: [
      { title: "Sign in — CivicEye" },
      {
        name: "description",
        content: "Sign in to your CivicEye workspace to triage and resolve civic issues.",
      },
    ],
  }),
  component: LoginPage,
});

export function LoginPage() {
  const { redirect } = Route.useSearch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [unconfirmedEmail, setUnconfirmedEmail] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const navigate = useNavigate();
  const { session, loading, isConfigured, configError } = useAuth();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // A user who already has a valid session never has to see the login form.
  useEffect(() => {
    if (loading || !session) return;
    void navigate({ to: redirect ?? POST_LOGIN_PATH, replace: true });
  }, [loading, session, redirect, navigate]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startCooldown = (seconds = 60) => {
    setResendCooldown(seconds);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendConfirmation = async () => {
    const targetEmail = unconfirmedEmail || email.trim();
    if (!targetEmail || resendCooldown > 0 || resending) return;

    setResending(true);
    setLoginError(null);

    try {
      const sb = getSupabase();
      if (!sb) throw new Error("Supabase is not configured.");

      const { error } = await sb.auth.resend({ type: "signup", email: targetEmail });

      if (error) {
        if (error.message.toLowerCase().includes("rate limit")) {
          setLoginError(
            "A verification email was recently sent. Please wait a minute before requesting another, and check your spam folder.",
          );
        } else {
          setLoginError("We could not resend the confirmation email. Try again in a minute.");
        }
      } else {
        setResendSuccess(true);
        startCooldown(60);
      }
    } catch {
      setLoginError("We could not resend the confirmation email. Try again in a minute.");
    } finally {
      setResending(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConfigured) {
      setLoginError(configError ?? "Supabase is not configured.");
      return;
    }
    if (!email.trim() || !password) {
      setLoginError("Enter your email address and password.");
      return;
    }

    setBusy(true);
    setLoginError(null);
    setUnconfirmedEmail(null);
    setResendSuccess(false);

    try {
      const result = await signIn(email, password);
      // One destination for every role, so there is no redirect to get lost in.
      const destination = redirect ?? POST_LOGIN_PATH;
      toast.success(`Signed in${result.profile?.fullName ? ` as ${result.profile.fullName}` : ""}`);
      await navigate({ to: destination, replace: true });
    } catch (err) {
      if (err instanceof AuthError && err.code === "email_not_confirmed") {
        setUnconfirmedEmail(email.trim());
      }
      setLoginError(
        err instanceof Error
          ? err.message
          : "Incorrect email or password. Please check your details and try again.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="hero-bg grid min-h-screen place-items-center p-4">
      <div className="card w-full max-w-md p-8 sm:p-10 animate-scale-in shadow-lg">
        <Link to="/" className="mb-8 inline-flex items-center gap-2.5" aria-label="CivicEye home">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <FiShield className="h-4.5 w-4.5" aria-hidden />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight text-foreground">
            Civic<span className="text-primary">Eye</span>
          </span>
        </Link>

        <div className="mb-10 text-center">
          <div className="icon-wrapper-xl icon-wrapper-primary mx-auto mb-5">
            <FiLock className="h-6 w-6" aria-hidden />
          </div>
          <h1 className="headline-2">Sign in to CivicEye</h1>
          <p className="body-sm mt-3 text-muted-foreground">
            {redirect
              ? "Sign in to continue where you left off"
              : "Your organization and civic issue workspace"}
          </p>
        </div>

        {!isConfigured && (
          <div className="card mb-6 border-warning/30 bg-warning/10 p-5">
            <div className="flex items-start gap-3">
              <FiAlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-warning" aria-hidden />
              <div>
                <p className="font-bold text-foreground">Backend not configured</p>
                <p className="body-sm mt-1 text-muted-foreground">
                  Copy <code className="font-mono text-[11px]">.env.example</code> to{" "}
                  <code className="font-mono text-[11px]">.env</code> and set your Supabase
                  credentials.
                </p>
              </div>
            </div>
          </div>
        )}

        {loginError && (
          <div
            role="alert"
            className="card mb-6 space-y-3 border-destructive/30 bg-destructive/10 p-5"
          >
            <div className="flex items-start gap-2.5">
              <FiAlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden />
              <span className="body-sm leading-relaxed">{loginError}</span>
            </div>

            {unconfirmedEmail && (
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => void handleResendConfirmation()}
                  disabled={resendCooldown > 0 || resending}
                  className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline disabled:opacity-50 disabled:no-underline"
                >
                  <FiMail className="h-4 w-4" aria-hidden />
                  {resending
                    ? "Sending…"
                    : resendCooldown > 0
                      ? `Resend in ${resendCooldown}s`
                      : "Resend confirmation email"}
                </button>
              </div>
            )}
          </div>
        )}

        {resendSuccess && (
          <div role="status" className="card mb-6 border-emerald-500/30 bg-emerald-500/10 p-5">
            <div className="flex items-start gap-2.5">
              <FiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" aria-hidden />
              <span className="body-sm leading-relaxed">
                Confirmation email sent to <strong>{unconfirmedEmail || email}</strong>. Please
                check your inbox and spam folder.
              </span>
            </div>
          </div>
        )}

        <form onSubmit={submit} className="space-y-5" noValidate>
          <div className="form-field">
            <label htmlFor="login-email" className="label">
              Email address
            </label>
            <div className="relative flex items-center">
              <FiMail
                className="pointer-events-none absolute left-4 h-4 w-4 text-muted-foreground"
                aria-hidden
              />
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourorganization.com"
                className="input-lg pl-11 pr-3.5"
                required
                autoComplete="email"
                autoFocus
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="login-password" className="label mb-1.5">
              Password
            </label>
            <div className="relative flex items-center">
              <FiLock
                className="pointer-events-none absolute left-4 h-4 w-4 text-muted-foreground"
                aria-hidden
              />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-lg pl-11 pr-12"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-3 p-1 text-muted-foreground transition-colors hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <FiEyeOff className="h-4 w-4" aria-hidden />
                ) : (
                  <FiEye className="h-4 w-4" aria-hidden />
                )}
              </button>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={busy || !isConfigured}
              className="btn-primary w-full py-3.5 text-base font-bold disabled:opacity-60"
            >
              {busy ? (
                <>
                  <span
                    className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground"
                    aria-hidden
                  />
                  <span>Signing in…</span>
                </>
              ) : (
                <span>Sign in</span>
              )}
            </button>
          </div>
        </form>

        <p className="body-sm mt-8 text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            search={redirect ? { redirect } : {}}
            className="font-bold text-primary transition-colors hover:underline"
          >
            Create account
          </Link>
        </p>

        <p className="mt-2 text-center text-xs text-muted-foreground/80">
          Staff and admin roles are assigned by your organization administrator.
        </p>
      </div>
    </main>
  );
}
