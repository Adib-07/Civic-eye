import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  FiEye,
  FiEyeOff,
  FiMail,
  FiLock,
  FiArrowLeft,
  FiCheckCircle,
  FiUser,
  FiAlertCircle,
} from "react-icons/fi";
import { z } from "zod";
import { toast } from "sonner";

import { signUp } from "@/lib/auth";
import { useAuth } from "@/lib/hooks";

const signupSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign up — CivicEye Admin" },
      {
        name: "description",
        content: "Create an account to access the CivicEye admin console.",
      },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const [form, setForm] = useState<SignupFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [needsEmailConfirmation, setNeedsEmailConfirmation] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const navigate = useNavigate();
  const { session, loading, isConfigured } = useAuth();

  useEffect(() => {
    if (!loading && session) {
      navigate({ to: "/reports" });
    }
  }, [loading, session, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof SignupFormData]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof SignupFormData];
        return next;
      });
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConfigured) {
      setSubmitError("Supabase is not configured. Add credentials to your .env file.");
      return;
    }

    setFieldErrors({});
    setSubmitError(null);

    const validation = signupSchema.safeParse(form);
    if (!validation.success) {
      const formatted: Partial<Record<keyof SignupFormData, string>> = {};
      for (const issue of validation.error.issues) {
        const path = issue.path[0] as keyof SignupFormData;
        if (!formatted[path]) {
          formatted[path] = issue.message;
        }
      }
      setFieldErrors(formatted);
      return;
    }

    setBusy(true);

    try {
      const validated = validation.data;
      const result = await signUp(validated.email, validated.password, {
        fullName: validated.fullName,
      });

      if (result.requiresEmailConfirmation || !result.session) {
        setRegisteredEmail(validated.email);
        setNeedsEmailConfirmation(true);
      } else {
        toast.success("Account created successfully");
        navigate({ to: "/reports" });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Sign up failed. Please try again.";
      setSubmitError(message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="hero-bg grid min-h-screen place-items-center p-4">
      <div className="surface-panel w-full max-w-md p-6 sm:p-8 rounded-2xl border border-border/80 shadow-md">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground mb-6"
        >
          <FiArrowLeft className="h-3.5 w-3.5" aria-hidden />
          <span>Back to sign in</span>
        </Link>

        {needsEmailConfirmation ? (
          <div className="text-center py-4 space-y-4" role="status" aria-live="polite">
            <div className="h-14 w-14 rounded-2xl bg-blue-500/10 text-blue-500 grid place-items-center mx-auto border border-blue-500/20">
              <FiMail className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Confirm your email address</h2>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                We sent a verification link to{" "}
                <span className="font-semibold text-foreground">{registeredEmail}</span>. Click the
                link to confirm your account and sign in.
              </p>
            </div>

            <div className="rounded-xl border border-border/70 bg-card/40 p-4 text-xs text-muted-foreground text-left space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-foreground">
                <FiCheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                <span>Next steps:</span>
              </div>
              <p>1. Check your email inbox (and spam folder if not visible).</p>
              <p>2. Open the CivicEye confirmation message.</p>
              <p>3. Once confirmed, sign in to your dashboard.</p>
            </div>

            <div className="pt-3 flex flex-col gap-2">
              <Link
                to="/login"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500"
              >
                Go to sign in
              </Link>
              <button
                type="button"
                onClick={() => {
                  setNeedsEmailConfirmation(false);
                  setSubmitError(null);
                }}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Need to change your email?
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600/10 text-blue-600 border border-blue-600/20 shadow-sm">
                <FiLock className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h1 className="font-display text-xl font-bold tracking-tight text-foreground">
                  Create an account
                </h1>
                <p className="text-xs text-muted-foreground">
                  Sign up for CivicEye organization access
                </p>
              </div>
            </div>

            {!isConfigured && (
              <div className="mt-5 rounded-xl border border-warning/30 bg-warning/10 p-3.5 text-xs text-muted-foreground space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-foreground">
                  <FiAlertCircle className="h-4 w-4 text-warning shrink-0" />
                  <span>Backend Not Configured</span>
                </div>
                <p>
                  Copy <code className="font-mono text-[11px]">.env.example</code> to{" "}
                  <code className="font-mono text-[11px]">.env</code> and configure your Supabase
                  credentials.
                </p>
              </div>
            )}

            {submitError && (
              <div
                role="alert"
                className="mt-4 flex items-start gap-2.5 rounded-xl bg-destructive/10 border border-destructive/20 p-3.5 text-xs text-foreground"
              >
                <FiAlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                <span className="leading-relaxed">{submitError}</span>
              </div>
            )}

            <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
              <div>
                <label
                  htmlFor="signup-fullName"
                  className="block text-xs font-semibold text-foreground mb-1"
                >
                  Full Name <span className="text-destructive">*</span>
                </label>
                <div className="relative flex items-center">
                  <FiUser className="absolute left-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <input
                    id="signup-fullName"
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Aditi Sharma"
                    className="w-full rounded-lg border border-border bg-card pl-10 pr-3.5 py-2.5 min-h-[44px] text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                    required
                    autoComplete="name"
                  />
                </div>
                {fieldErrors.fullName && (
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-destructive">
                    <FiAlertCircle className="h-3 w-3 shrink-0" />
                    <span>{fieldErrors.fullName}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-xs font-semibold text-foreground mb-1"
                >
                  Work Email <span className="text-destructive">*</span>
                </label>
                <div className="relative flex items-center">
                  <FiMail className="absolute left-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <input
                    id="signup-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@yourorganization.com"
                    className="w-full rounded-lg border border-border bg-card pl-10 pr-3.5 py-2.5 min-h-[44px] text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                    required
                    autoComplete="email"
                  />
                </div>
                {fieldErrors.email && (
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-destructive">
                    <FiAlertCircle className="h-3 w-3 shrink-0" />
                    <span>{fieldErrors.email}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="signup-password"
                  className="block text-xs font-semibold text-foreground mb-1"
                >
                  Password <span className="text-destructive">*</span>
                </label>
                <div className="relative flex items-center">
                  <FiLock className="absolute left-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="At least 6 characters"
                    className="w-full rounded-lg border border-border bg-card pl-10 pr-10 py-2.5 min-h-[44px] text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-4 w-4" />
                    ) : (
                      <FiEye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-destructive">
                    <FiAlertCircle className="h-3 w-3 shrink-0" />
                    <span>{fieldErrors.password}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="signup-confirmPassword"
                  className="block text-xs font-semibold text-foreground mb-1"
                >
                  Confirm Password <span className="text-destructive">*</span>
                </label>
                <div className="relative flex items-center">
                  <FiLock className="absolute left-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <input
                    id="signup-confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    className="w-full rounded-lg border border-border bg-card pl-10 pr-10 py-2.5 min-h-[44px] text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors p-1"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className="h-4 w-4" />
                    ) : (
                      <FiEye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {fieldErrors.confirmPassword && (
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-destructive">
                    <FiAlertCircle className="h-3 w-3 shrink-0" />
                    <span>{fieldErrors.confirmPassword}</span>
                  </p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={busy || !isConfigured}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 min-h-[44px] text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {busy ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <span>Create account</span>
                  )}
                </button>
              </div>
            </form>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-primary hover:underline transition-colors"
              >
                Sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </main>
  );
}
