import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import { toast } from "sonner";

import { Loader } from "@/components/EmptyState";
import { signUp } from "@/lib/auth";
import { useAuth } from "@/lib/hooks";
import { refreshAuthProfile } from "@/lib/auth-store";
import { acceptOrganizationInvitation, fetchInvitationByToken } from "@/lib/team";
import { roleLabel } from "@/lib/types";
import { sanitizeRedirect } from "@/lib/route-guards";

// `token` is optional at the router level so a bare /accept-invite URL renders
// a helpful "no invitation" screen instead of throwing a 500.
const searchSchema = z.object({
  token: z.string().optional(),
});

export const Route = createFileRoute("/accept-invite")({
  validateSearch: (search: Record<string, unknown>) =>
    searchSchema.parse({
      token: typeof search.token === "string" && search.token ? search.token : undefined,
    }),
  head: () => ({
    meta: [{ title: "Accept your CivicEye invitation" }],
  }),
  component: AcceptInvitePage,
});

const signupSchema = z
  .object({
    fullName: z.string().trim().min(2, "Please enter your full name"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

function AcceptInvitePage() {
  const { token } = Route.useSearch();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const {
    data: invite,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["invitation-preview", token],
    queryFn: () => fetchInvitationByToken(token ?? ""),
    enabled: Boolean(token),
    retry: false,
    staleTime: 60_000,
  });

  const [fullName, setFullName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const inviteEmail = invite?.email ?? "";
  const unusable = Boolean(invite && (invite.isExpired || invite.status !== "pending"));

  const claim = async () => {
    setBusy(true);
    setSubmitError(null);
    try {
      await acceptOrganizationInvitation(token!);
      await refreshAuthProfile();
      setClaimed(true);
      toast.success(`Welcome to ${invite?.organizationName ?? "CivicEye"}`);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? friendlyAcceptError(err.message)
          : "We could not complete your invitation.",
      );
    } finally {
      setBusy(false);
    }
  };

  const createAccount = async (event: React.FormEvent) => {
    event.preventDefault();
    setFieldErrors({});
    setSubmitError(null);

    const parsed = signupSchema.safeParse({ fullName, password, confirmPassword });
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!errors[key]) errors[key] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }

    // The masked preview is deliberately not usable as a signup address, so the
    // invitee types the exact email the invitation was sent to.
    const email = signupEmail.trim();
    if (!email) {
      setSubmitError("Enter the email address your invitation was sent to.");
      return;
    }

    setBusy(true);
    try {
      await signUp(email, parsed.data.password, { fullName: parsed.data.fullName });
      await acceptOrganizationInvitation(token!);
      await refreshAuthProfile();
      setClaimed(true);
      toast.success("Account created — welcome to CivicEye");
      await navigate({ to: "/dashboard" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Account creation failed.";
      if (message.toLowerCase().includes("already exists")) {
        setSubmitError(
          "An account already exists for this email. Sign in with your existing password to accept the invitation.",
        );
      } else {
        setSubmitError(message);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="hero-bg grid min-h-screen place-items-center p-4">
      <div className="card w-full max-w-lg p-8 sm:p-10 animate-scale-in">
        <Link to="/" className="mb-8 inline-flex items-center gap-2.5" aria-label="CivicEye home">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
            <FiEye className="h-4.5 w-4.5" aria-hidden />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight">
            Civic<span className="text-primary">Eye</span>
          </span>
        </Link>

        {!token ? (
          <ErrorPanel
            title="No invitation token"
            message="This page needs the invitation link your organization administrator sent you. Open that link to join the workspace."
          />
        ) : isLoading ? (
          <Loader label="Checking your invitation" />
        ) : error ? (
          <ErrorPanel
            title="This invitation link is not valid"
            message="The link may have been copied incompletely, revoked, or already used. Ask your organization administrator to send a new one."
          />
        ) : !invite ? (
          <ErrorPanel
            title="Invitation not found"
            message="We could not find an invitation for this link. Ask your organization administrator to send a fresh one."
          />
        ) : claimed ? (
          <SuccessPanel
            organization={invite.organizationName}
            onContinue={() => void navigate({ to: "/dashboard" })}
          />
        ) : unusable ? (
          <ErrorPanel
            title={invite.status === "revoked" ? "Invitation revoked" : "Invitation expired"}
            message="This invitation is no longer active. Ask your organization administrator to send a new one from Team & invites."
          />
        ) : authLoading ? (
          <Loader label="Checking your session" />
        ) : user ? (
          <div>
            <div className="text-center">
              <div className="icon-wrapper-xl icon-wrapper-primary mx-auto mb-5">
                <FiUsers className="h-6 w-6" aria-hidden />
              </div>
              <h1 className="headline-2">Join {invite.organizationName}</h1>
              <p className="mt-3 body-sm text-muted-foreground">
                You are signed in as {user.email}. Confirm below to join {invite.organizationName}{" "}
                as <strong>{roleLabel(invite.role)}</strong>.
              </p>
            </div>

            {submitError && <AlertPanel message={submitError} />}

            <button
              type="button"
              onClick={() => void claim()}
              disabled={busy}
              className="btn-primary mt-6 w-full justify-center py-3.5 disabled:opacity-60"
            >
              {busy ? "Joining…" : "Join the organization"}
            </button>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Invited address: <span className="font-mono">{inviteEmail}</span>
            </p>
          </div>
        ) : (
          <div>
            <div className="text-center">
              <div className="icon-wrapper-xl icon-wrapper-primary mx-auto mb-5">
                <FiUsers className="h-6 w-6" aria-hidden />
              </div>
              <h1 className="headline-2">Join {invite.organizationName}</h1>
              <p className="mt-3 body-sm text-muted-foreground">
                {invite.invitedByName ? `${invite.invitedByName} invited you` : "You were invited"}{" "}
                to join as <strong>{roleLabel(invite.role)}</strong>. Create your account to get in.
              </p>
              {inviteEmail && (
                <p className="mt-3 inline-block rounded-lg border border-border bg-secondary px-3 py-1.5 font-mono text-xs text-muted-foreground">
                  {inviteEmail}
                </p>
              )}
            </div>

            {submitError && <AlertPanel message={submitError} />}

            <form onSubmit={createAccount} className="mt-6 space-y-5" noValidate>
              <div className="form-field">
                <label htmlFor="invite-email-confirm" className="label">
                  Invited email address
                </label>
                <div className="relative flex items-center">
                  <FiMail
                    className="pointer-events-none absolute left-4 h-4 w-4 text-muted-foreground"
                    aria-hidden
                  />
                  <input
                    id="invite-email-confirm"
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="the email your invite was sent to"
                    className="input-lg pl-11"
                    required
                    autoComplete="email"
                  />
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  The invitation is only valid for the address it was sent to.
                </p>
              </div>

              <div className="form-field">
                <label htmlFor="invite-fullName" className="label">
                  Full name
                </label>
                <div className="relative flex items-center">
                  <FiUser
                    className="pointer-events-none absolute left-4 h-4 w-4 text-muted-foreground"
                    aria-hidden
                  />
                  <input
                    id="invite-fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="input-lg pl-11"
                    required
                    autoComplete="name"
                  />
                </div>
                {fieldErrors.fullName && (
                  <p className="form-error">
                    <FiAlertCircle className="h-3.5 w-3.5" aria-hidden />
                    <span>{fieldErrors.fullName}</span>
                  </p>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="invite-password" className="label">
                  Password
                </label>
                <div className="relative flex items-center">
                  <FiLock
                    className="pointer-events-none absolute left-4 h-4 w-4 text-muted-foreground"
                    aria-hidden
                  />
                  <input
                    id="invite-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-lg pl-11 pr-12"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 p-1 text-muted-foreground transition-colors hover:text-foreground"
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
                    <FiAlertCircle className="h-3.5 w-3.5" aria-hidden />
                    <span>{fieldErrors.password}</span>
                  </p>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="invite-confirm" className="label">
                  Confirm password
                </label>
                <div className="relative flex items-center">
                  <FiLock
                    className="pointer-events-none absolute left-4 h-4 w-4 text-muted-foreground"
                    aria-hidden
                  />
                  <input
                    id="invite-confirm"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-lg pl-11"
                    required
                    autoComplete="new-password"
                  />
                </div>
                {fieldErrors.confirmPassword && (
                  <p className="form-error">
                    <FiAlertCircle className="h-3.5 w-3.5" aria-hidden />
                    <span>{fieldErrors.confirmPassword}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={busy}
                className="btn-primary w-full justify-center py-3.5 text-base disabled:opacity-60"
              >
                {busy ? "Creating your account…" : "Create account & join"}
              </button>
            </form>

            <p className="mt-6 text-center body-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                search={{
                  redirect: sanitizeRedirect(`/accept-invite?token=${token}`) ?? undefined,
                }}
                className="font-bold text-primary transition-colors hover:underline"
              >
                Sign in first
              </Link>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

function friendlyAcceptError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("invitation_email_mismatch")) {
    return "This invitation was sent to a different email address. Sign in with the invited address to accept it.";
  }
  if (lower.includes("invitation_expired")) return "This invitation has expired.";
  if (lower.includes("invitation_not_pending"))
    return "This invitation was already used or revoked.";
  if (lower.includes("admin_required") || lower.includes("no_organization")) {
    return "Only signed-in organization admins can perform this action.";
  }
  return "We could not complete your invitation. Please try again or contact your administrator.";
}

function AlertPanel({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="mt-6 card flex items-start gap-2.5 border-destructive/30 bg-destructive/10 p-4"
    >
      <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden />
      <span className="body-sm">{message}</span>
    </div>
  );
}

function ErrorPanel({ title, message }: { title: string; message: string }) {
  return (
    <div className="text-center">
      <div className="icon-wrapper-xl mx-auto mb-5 border-destructive/25 bg-destructive/10 text-destructive">
        <FiAlertCircle className="h-6 w-6" aria-hidden />
      </div>
      <h1 className="headline-2">{title}</h1>
      <p className="mt-3 body-sm text-muted-foreground">{message}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link to="/login" className="btn-primary px-6 py-3">
          Go to sign in
        </Link>
        <Link to="/" className="btn-secondary px-6 py-3">
          Back to home
        </Link>
      </div>
    </div>
  );
}

function SuccessPanel({
  organization,
  onContinue,
}: {
  organization: string;
  onContinue: () => void;
}) {
  return (
    <div className="text-center">
      <div className="icon-wrapper-xl mx-auto mb-5 border-success/25 bg-success/10 text-success">
        <FiCheckCircle className="h-6 w-6" aria-hidden />
      </div>
      <h1 className="headline-2">You&apos;re in</h1>
      <p className="mt-3 body-sm text-muted-foreground">
        Your account now belongs to <strong>{organization}</strong>. Head to the dashboard to see
        the workspace.
      </p>
      <button type="button" onClick={onContinue} className="btn-primary mt-8 px-6 py-3">
        Go to dashboard
      </button>
    </div>
  );
}
