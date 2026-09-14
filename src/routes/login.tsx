import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiArrowLeft,
  FiAlertCircle,
  FiCheckCircle,
  FiShield,
} from "react-icons/fi";
import { toast } from "sonner";

import { signIn } from "@/lib/auth";
import { useAuth } from "@/lib/hooks";
import { getSupabase } from "@/lib/supabase";
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

export function LoginPage() {
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
  const { session, profile, loading, isConfigured } = useAuth();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!loading && session) {
      navigate({ to: isStaffRole(profile?.role) ? "/dashboard" : "/reports" });
    }
  }, [loading, session, profile, navigate]);

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
      if (!sb) {
        throw new Error("Supabase is not configured.");
      }

      const { error } = await sb.auth.resend({
        type: "signup",
        email: targetEmail,
      });

      if (error) {
        if (
          error.message.toLowerCase().includes("rate limit") ||
          error.message.toLowerCase().includes("over_email_send_rate_limit")
        ) {
          setLoginError(
            "A verification email was recently sent. Please wait a minute before requesting another, and be sure to check your spam folder.",
          );
        } else {
          setLoginError(error.message);
        }
      } else {
        setResendSuccess(true);
        startCooldown(60);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to resend confirmation email";
      setLoginError(msg);
    } finally {
      setResending(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConfigured) {
      setLoginError("Supabase is not configured. Add credentials to your .env file.");
      return;
    }

    setBusy(true);
    setLoginError(null);
    setUnconfirmedEmail(null);
    setResendSuccess(false);

    try {
      const result = await signIn(email.trim(), password);
      toast.success("Signed in successfully");
      navigate({ to: isStaffRole(result.profile?.role) ? "/dashboard" : "/reports" });
    } catch (err: unknown) {
      const error = err as { message?: string; code?: string };
      const isEmailNotConfirmed =
        (error?.message && error.message.toLowerCase().includes("email not confirmed")) ||
        error?.code === "email_not_confirmed";

      if (isEmailNotConfirmed) {
        setUnconfirmedEmail(email.trim());
        setLoginError(
          "Your email address has not been confirmed yet. Please verify your email using the link sent to your inbox before signing in.",
        );
      } else {
        const message =
          err instanceof Error
            ? err.message
            : "Invalid login credentials. Please check your email and password.";
        setLoginError(message);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="hero-bg grid min-h-screen place-items-center p-4">
      <div className="card w-full max-w-md p-6 sm:p-8 animate-scale-in">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground mb-6"
        >
          <FiArrowLeft className="h-3.5 w-3.5" aria-hidden />
          <span>Back to home</span>
        </Link>

        <div className="text-center mb-8">
          <div className="icon-wrapper-lg icon-wrapper-primary mx-auto mb-4">
            <FiLock className="h-5 w-5" aria-hidden />
          </div>
          <h1 className="headline-3">Sign in to CivicEye</h1>
          <p className="mt-2 body-sm text-muted-foreground">
            Organization and incident management portal
          </p>
        </div>

        {!isConfigured && (
          <div className="mb-6 card p-4 border-warning/30 bg-warning/10">
            <div className="flex items-start gap-2.5">
              <FiAlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
              <div>
                <p className="font-bold text-foreground">Backend Not Configured</p>
                <p className="mt-1 body-sm text-muted-foreground">
                  Copy <code className="font-mono text-[11px]">.env.example</code> to{" "}
                  <code className="font-mono text-[11px]">.env</code> and set your Supabase credentials.
                </p>
              </div>
            </div>
          </div>
        )}

        {loginError && (
          <div
            role="alert"
            className="mb-6 card p-4 border-destructive/30 bg-destructive/10 space-y-3"
          >
            <div className="flex items-start gap-2">
              <FiAlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <span className="body-sm leading-relaxed">{loginError}</span>
            </div>

            {unconfirmedEmail && (
              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResendConfirmation}
                  disabled={resendCooldown > 0 || resending}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline disabled:opacity-50 disabled:no-underline"
                >
                  <FiMail className="h-4 w-4" />
                  {resending
                    ? "Sending..."
                    : resendCooldown > 0
                    ? `Resend in ${resendCooldown}s`
                    : "Resend confirmation email"}
                </button>
              </div>
            )}
          </div>
        )}

        {resendSuccess && (
          <div
            role="status"
            className="mb-6 card p-4 border-emerald-500/30 bg-emerald-500/10"
          >
            <div className="flex items-start gap-2">
              <FiCheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="body-sm leading-relaxed">
                Confirmation email sent to <strong>{unconfirmedEmail || email}</strong>. Please check
                your inbox (and spam folder).
              </span>
            </div>
          </div>
        )}

        <form onSubmit={submit} className="space-y-4" noValidate>
          <div className="form-field">
            <label htmlFor="login-email" className="label">
              Email Address
            </label>
            <div className="relative flex items-center">
              <FiMail className="absolute left-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourorganization.com"
                className="input pl-10 pr-3.5"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-field">
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="login-password" className="label mb-0">
                Password
              </label>
            </div>
            <div className="relative flex items-center">
              <FiLock className="absolute left-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input pl-10 pr-12"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={busy || !isConfigured}
              className="btn-primary w-full py-3"
            >
              {busy ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign in</span>
              )}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center body-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-primary hover:underline transition-colors"
          >
            Create account
          </Link>
        </p>

        <p className="mt-2 text-center text-xs text-muted-foreground/80">
          Staff and officer roles are assigned by your organization administrator.
        </p>
      </div>
    </main>
  );
}