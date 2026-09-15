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
      <div className="card w-full max-w-md p-8 sm:p-10 animate-scale-in shadow-lg">
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 mb-8 group"
          aria-label="CivicEye home"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <FiLock className="h-4.5 w-4.5" aria-hidden />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight text-foreground">
            Civic<span className="text-primary">Eye</span>
          </span>
        </Link>

        {needsEmailConfirmation ? (
          <div
            className="text-center py-4 space-y-6 animate-scale-in"
            role="status"
            aria-live="polite"
          >
            <div className="icon-wrapper-xl icon-wrapper-primary mx-auto">
              <FiMail className="h-7 w-7" />
            </div>
            <div>
              <h2 className="headline-2">Confirm your email address</h2>
              <p className="mt-3 body-sm text-muted-foreground leading-relaxed">
                We sent a verification link to{" "}
                <span className="font-bold text-foreground">{registeredEmail}</span>. Click the link
                to confirm your account and sign in.
              </p>
            </div>

            <div className="card p-5 text-left space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-foreground">
                <FiCheckCircle className="h-4 w-4 text-emerald-500" />
                <span>Next steps:</span>
              </div>
              <p className="body-sm text-muted-foreground">
                1. Check your email inbox (and spam folder if not visible).
              </p>
              <p className="body-sm text-muted-foreground">
                2. Open the CivicEye confirmation message.
              </p>
              <p className="body-sm text-muted-foreground">
                3. Once confirmed, sign in to your dashboard.
              </p>
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <Link to="/login" className="btn-primary w-full py-3.5 text-base font-bold">
                Go to sign in
              </Link>
              <button
                type="button"
                onClick={() => {
                  setNeedsEmailConfirmation(false);
                  setSubmitError(null);
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Need to change your email?
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-10">
              <div className="icon-wrapper-xl icon-wrapper-primary mx-auto mb-5">
                <FiLock className="h-6 w-6" aria-hidden />
              </div>
              <h1 className="headline-2">Create an account</h1>
              <p className="mt-3 body-sm text-muted-foreground">
                Sign up for CivicEye organization access
              </p>
            </div>

            {!isConfigured && (
              <div className="mb-6 card p-5 border-warning/30 bg-warning/10">
                <div className="flex items-start gap-3">
                  <FiAlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
                  <div>
                    <p className="font-bold text-foreground">Backend Not Configured</p>
                    <p className="mt-1 body-sm text-muted-foreground">
                      Copy <code className="font-mono text-[11px]">.env.example</code> to{" "}
                      <code className="font-mono text-[11px]">.env</code> and configure your
                      Supabase credentials.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {submitError && (
              <div role="alert" className="mb-6 card p-5 border-destructive/30 bg-destructive/10">
                <div className="flex items-start gap-2.5">
                  <FiAlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <span className="body-sm leading-relaxed">{submitError}</span>
                </div>
              </div>
            )}

            <form onSubmit={submit} className="space-y-5" noValidate>
              <div className="form-field">
                <label htmlFor="signup-fullName" className="label">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <div className="relative flex items-center">
                  <FiUser className="absolute left-4 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <input
                    id="signup-fullName"
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Aditi Sharma"
                    className="input-lg pl-11"
                    required
                    autoComplete="name"
                  />
                </div>
                {fieldErrors.fullName && (
                  <p className="form-error">
                    <FiAlertCircle className="h-3.5 w-3.5" />
                    <span>{fieldErrors.fullName}</span>
                  </p>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="signup-email" className="label">
                  Work Email <span className="text-destructive">*</span>
                </label>
                <div className="relative flex items-center">
                  <FiMail className="absolute left-4 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <input
                    id="signup-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@yourorganization.com"
                    className="input-lg pl-11"
                    required
                    autoComplete="email"
                  />
                </div>
                {fieldErrors.email && (
                  <p className="form-error">
                    <FiAlertCircle className="h-3.5 w-3.5" />
                    <span>{fieldErrors.email}</span>
                  </p>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="signup-password" className="label">
                  Password <span className="text-destructive">*</span>
                </label>
                <div className="relative flex items-center">
                  <FiLock className="absolute left-4 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="At least 6 characters"
                    className="input-lg pl-11 pr-12"
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
                  <p className="form-error">
                    <FiAlertCircle className="h-3.5 w-3.5" />
                    <span>{fieldErrors.password}</span>
                  </p>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="signup-confirmPassword" className="label">
                  Confirm Password <span className="text-destructive">*</span>
                </label>
                <div className="relative flex items-center">
                  <FiLock className="absolute left-4 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <input
                    id="signup-confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    className="input-lg pl-11 pr-12"
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
                  <p className="form-error">
                    <FiAlertCircle className="h-3.5 w-3.5" />
                    <span>{fieldErrors.confirmPassword}</span>
                  </p>
                )}
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={busy || !isConfigured}
                  className="btn-primary w-full py-3.5 text-base font-bold"
                >
                  {busy ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <span>Create account</span>
                  )}
                </button>
              </div>
            </form>

            <p className="mt-8 text-center body-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-primary hover:underline transition-colors"
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
