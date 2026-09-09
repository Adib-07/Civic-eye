import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FiEye, FiEyeOff, FiMail, FiLock, FiArrowLeft } from "react-icons/fi";
import { z } from "zod";
import { toast } from "sonner";

import { signUp } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";
import { useAuth } from "@/lib/hooks";

const signupSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Valid email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

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
  const [form, setForm] = useState<z.infer<typeof signupSchema>>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; password?: string; confirmPassword?: string }>({});
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { session, profile, loading, isConfigured } = useAuth();

  useEffect(() => {
    if (!loading && session) {
      navigate({ to: "/reports" });
    }
  }, [loading, session, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConfigured) {
      toast.error("Supabase is not configured. Add credentials to your .env file.");
      return;
    }

    setErrors({});
    setBusy(true);

    try {
      const validated = signupSchema.parse(form);
      const result = await signUp(validated.email, validated.password, {
        fullName: validated.fullName,
      });
      if (result.profile) {
        toast.success("Account created successfully");
        navigate({ to: "/login" });
      } else {
        toast.error("Account created but profile could not be loaded");
      }
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        setErrors(err.flatten().fieldErrors as typeof errors);
        setBusy(false);
        return;
      }
      const message = err instanceof Error ? err.message : "Sign up failed";
      toast.error(message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="hero-bg grid min-h-screen place-items-center p-4">
      <div className="surface-panel w-full max-w-md p-8">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <FiArrowLeft aria-hidden /> Back to sign in
        </Link>

        <div className="mt-6 flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
            <FiLock className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <h1 className="font-display text-xl font-semibold">Create account</h1>
            <p className="text-sm text-muted-foreground">Get started with CivicEye admin access</p>
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
            <span className="text-xs font-medium text-muted-foreground">Full name</span>
            <div className="mt-1.5 flex items-center gap-2 rounded-md border border-border bg-card px-3 focus-within:border-primary">
              <input
                type="text"
                value={form.fullName}
                onChange={handleChange}
                name="fullName"
                placeholder="Your full name"
                className="w-full bg-transparent py-2.5 text-sm outline-none"
                required
                autoComplete="name"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">Email</span>
            <div className="mt-1.5 flex items-center gap-2 rounded-md border border-border bg-card px-3 focus-within:border-primary">
              <FiMail className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              <input
                type="email"
                value={form.email}
                onChange={handleChange}
                name="email"
                placeholder="you@yourorganization.com"
                className="w-full bg-transparent py-2.5 text-sm outline-none"
                required
                autoComplete="email"
              />
            </div>
          </label>

          {showPassword ? (
            <label className="block">
              <span className="text-xs font-medium text-muted-foreground">Password</span>
              <div className="mt-1.5 flex items-center gap-2 rounded-md border border-border bg-card px-3 focus-within:border-primary">
                <input
                  type="text"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-transparent py-2.5 text-sm outline-none"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="rounded-md bg-transparent p-1 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
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
            </label>
          ) : (
            <label className="block">
              <span className="text-xs font-medium text-muted-foreground">Password</span>
              <div className="mt-1.5 flex items-center gap-2 rounded-md border border-border bg-card px-3 focus-within:border-primary">
                <FiLock className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                <input
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  name="password"
                  placeholder="••••••••"
                  className="w-full bg-transparent py-2.5 text-sm outline-none"
                  required
                  autoComplete="new-password"
                />
              </div>
            </label>
          )}

          {showConfirmPassword ? (
            <label className="block">
              <span className="text-xs font-medium text-muted-foreground">Confirm password</span>
              <div className="mt-1.5 flex items-center gap-2 rounded-md border border-border bg-card px-3 focus-within:border-primary">
                <input
                  type="text"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-transparent py-2.5 text-sm outline-none"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="rounded-md bg-transparent p-1 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="h-4 w-4" aria-hidden />
                  ) : (
                    <FiEye className="h-4 w-4" aria-hidden />
                  )}
                </button>
              </div>
            </label>
          ) : (
            <label className="block">
              <span className="text-xs font-medium text-muted-foreground">Confirm password</span>
              <div className="mt-1.5 flex items-center gap-2 rounded-md border border-border bg-card px-3 focus-within:border-primary">
                <FiLock className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  name="confirmPassword"
                  placeholder="••••••••"
                  className="w-full bg-transparent py-2.5 text-sm outline-none"
                  required
                  autoComplete="new-password"
                />
              </div>
            </label>
          )}

          {errors.fullName && (
            <p className="text-xs text-warning">{errors.fullName[0]}</p>
          )}
          {errors.email && (
            <p className="text-xs text-warning">{errors.email[0]}</p>
          )}
          {errors.password && (
            <p className="text-xs text-warning">{errors.password[0]}</p>
          )}
          {errors.confirmPassword && (
            <p className="text-xs text-warning">{errors.confirmPassword[0]}</p>
          )}

          <button
            type="submit"
            disabled={busy || !isConfigured}
            className="btn-primary w-full py-2.5"
          >
            {busy && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
            )}
            {busy ? "Creating account" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
          Already have an account? <Link to="/login" className="font-medium transition-colors hover:text-foreground">Sign in</Link>
        </p>
      </div>
    </main>
  );
}