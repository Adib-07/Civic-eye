import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiCopy,
  FiLink,
  FiMail,
  FiRefreshCw,
  FiTrash2,
  FiUserPlus,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { toast } from "sonner";

import { EmptyState, Loader, QueryError } from "@/components/EmptyState";
import { INVITABLE_ROLES, isOrgAdmin, roleLabel, type UserRole } from "@/lib/types";
import { useAuth, useOrganizationInvitations, useOrganizationMembers } from "@/lib/hooks";
import {
  createOrganizationInvitation,
  revokeOrganizationInvitation,
  resendOrganizationInvitation,
} from "@/lib/team";
import { requireOrgAdmin } from "@/lib/route-guards";

export const Route = createFileRoute("/organization/team")({
  beforeLoad: async ({ location }) => {
    await requireOrgAdmin(location);
  },
  head: () => ({
    meta: [{ title: "Team & Invitations — CivicEye" }],
  }),
  component: TeamPage,
});

const inviteSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  role: z.enum(["ward_officer", "admin"]),
});

function TeamPage() {
  const { profile } = useAuth();
  const admin = isOrgAdmin(profile?.role);
  const qc = useQueryClient();

  const membersQuery = useOrganizationMembers();
  const invitesQuery = useOrganizationInvitations();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"ward_officer" | "admin">("ward_officer");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [lastLink, setLastLink] = useState<{ email: string; url: string } | null>(null);

  const invite = useMutation({
    mutationFn: createOrganizationInvitation,
    onSuccess: (result) => {
      setEmail("");
      setFormError(null);
      setFieldError(null);
      const url = buildInviteUrl(result.token);
      setLastLink({ email: result.email, url });
      void qc.invalidateQueries({ queryKey: ["invitations"] });
      void qc.invalidateQueries({ queryKey: ["org-members"] });
      toast.success(`Invitation created for ${result.email}`);
    },
    onError: (error) => {
      setFormError(error instanceof Error ? error.message : "The invitation could not be created.");
    },
  });

  const revoke = useMutation({
    mutationFn: revokeOrganizationInvitation,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["invitations"] });
      toast.success("Invitation revoked");
    },
    onError: (error) =>
      toast.error(error instanceof Error ? error.message : "Could not revoke the invitation."),
  });

  const resend = useMutation({
    mutationFn: resendOrganizationInvitation,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["invitations"] });
      toast.success("Invitation link refreshed — it is valid for 14 more days");
    },
    onError: (error) =>
      toast.error(error instanceof Error ? error.message : "Could not refresh the invitation."),
  });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(null);

    const parsed = inviteSchema.safeParse({ email, role });
    if (!parsed.success) {
      setFieldError(parsed.error.issues[0]?.message ?? "Check the form and try again.");
      return;
    }

    setFieldError(null);
    invite.mutate({ email: parsed.data.email, role: parsed.data.role });
  };

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard`);
    } catch {
      toast.error("Clipboard access was blocked by the browser.");
    }
  };

  if (!admin) {
    return (
      <QueryError
        title="Organization admin access required"
        message="Only organization admins can manage team members and invitations."
      />
    );
  }

  const members = membersQuery.data ?? [];
  const invitations = invitesQuery.data ?? [];

  return (
    <div className="space-y-6">
      {/* Invite */}
      <section className="surface-panel p-6">
        <div className="flex items-start gap-4">
          <span className="icon-wrapper-xl icon-wrapper-primary shrink-0">
            <FiUserPlus className="h-6 w-6" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-semibold">Invite a teammate</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The invitee receives a setup link. When they create an account with this exact email
              address they are placed in{" "}
              {profile?.organizationId ? "your organization" : "the organization"}
              automatically, with the role you choose.
            </p>

            <form onSubmit={submit} className="mt-5 space-y-4" noValidate>
              <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_12rem_auto] sm:items-end">
                <div className="form-field">
                  <label htmlFor="invite-email" className="label">
                    Work email
                  </label>
                  <div className="relative flex items-center">
                    <FiMail
                      className="pointer-events-none absolute left-3.5 h-4 w-4 text-muted-foreground"
                      aria-hidden
                    />
                    <input
                      id="invite-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="teammate@yourorganization.com"
                      autoComplete="off"
                      aria-invalid={Boolean(fieldError)}
                      className="input-lg pl-10"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="invite-role" className="label">
                    Role
                  </label>
                  <select
                    id="invite-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value as "ward_officer" | "admin")}
                    className="input-lg"
                  >
                    {INVITABLE_ROLES.map((r) => (
                      <option key={r} value={r}>
                        {roleLabel(r)}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={invite.isPending}
                  className="btn-primary h-[46px] justify-center px-5 disabled:opacity-60"
                >
                  {invite.isPending ? (
                    <>
                      <FiRefreshCw className="h-4 w-4 animate-spin" aria-hidden /> Sending…
                    </>
                  ) : (
                    <>
                      <FiUserPlus className="h-4 w-4" aria-hidden /> Send invite
                    </>
                  )}
                </button>
              </div>

              <p className="-mt-2 text-xs text-muted-foreground">
                <strong>Staff</strong> can triage and resolve issues. <strong>Admin</strong> can
                also manage the team, invitations and organization settings.
              </p>

              {fieldError && (
                <p className="form-error" role="alert">
                  <FiAlertCircle className="h-3.5 w-3.5" aria-hidden />
                  <span>{fieldError}</span>
                </p>
              )}
              {formError && (
                <div
                  role="alert"
                  className="card flex items-start gap-2.5 border-destructive/30 bg-destructive/10 p-4"
                >
                  <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden />
                  <span className="body-sm">{formError}</span>
                </div>
              )}
            </form>

            {lastLink && (
              <div className="mt-5 rounded-2xl border border-success/30 bg-success/5 p-4">
                <p className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <FiCheckCircle className="h-4 w-4 text-success" aria-hidden />
                  Invitation ready for {lastLink.email}
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Email delivery is not configured on this deployment, so share the setup link
                  directly. It is valid for 14 days and only works for the invited email address.
                </p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <code className="min-w-0 flex-1 truncate rounded-lg border border-border bg-background px-3 py-2 font-mono text-xs">
                    {lastLink.url}
                  </code>
                  <button
                    type="button"
                    onClick={() => void copy(lastLink.url, "Invitation link")}
                    className="btn-primary shrink-0 justify-center gap-2"
                  >
                    <FiCopy className="h-4 w-4" aria-hidden /> Copy link
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Members */}
      <section className="surface-panel overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
          <div>
            <p className="section-label">Team</p>
            <h2 className="mt-1 text-sm font-semibold">
              {members.length} {members.length === 1 ? "member" : "members"}
            </h2>
          </div>
          <FiUsers className="h-4.5 w-4.5 text-muted-foreground" aria-hidden />
        </div>

        {membersQuery.isLoading ? (
          <Loader label="Loading members" />
        ) : membersQuery.error ? (
          <div className="p-5">
            <QueryError
              title="Could not load members"
              message={
                membersQuery.error instanceof Error
                  ? membersQuery.error.message
                  : "Please try again."
              }
              onRetry={() => void membersQuery.refetch()}
            />
          </div>
        ) : members.length === 0 ? (
          <div className="p-5">
            <EmptyState
              icon={FiUsers}
              title="No team members yet"
              description="Invite your first teammate using the form above."
            />
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {members.map((member) => (
              <li
                key={member.id}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {member.fullName ?? "Unnamed member"}
                    {member.id === profile?.id && (
                      <span className="ml-2 text-xs font-normal text-muted-foreground">(you)</span>
                    )}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{member.email ?? "—"}</p>
                </div>
                <span className="shrink-0 rounded-md border border-border bg-secondary px-2 py-1 text-[11px] font-semibold">
                  {roleLabel(member.role)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Invitations */}
      <section className="surface-panel overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
          <div>
            <p className="section-label">Invitations</p>
            <h2 className="mt-1 text-sm font-semibold">
              {invitations.length} {invitations.length === 1 ? "invitation" : "invitations"}
            </h2>
          </div>
          <FiLink className="h-4.5 w-4.5 text-muted-foreground" aria-hidden />
        </div>

        {invitesQuery.isLoading ? (
          <Loader label="Loading invitations" />
        ) : invitations.length === 0 ? (
          <div className="p-5">
            <EmptyState
              icon={FiMail}
              title="No invitations yet"
              description="Invitations you send will appear here with their status and setup link."
            />
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {invitations.map((invitation) => {
              const url = buildInviteUrl(invitation.token);
              const expired =
                invitation.status === "pending" &&
                new Date(invitation.expiresAt).getTime() < Date.now();
              const status = expired ? "expired" : invitation.status;

              return (
                <li key={invitation.id} className="px-5 py-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{invitation.email}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {roleLabel(invitation.role)} · invited {formatDate(invitation.createdAt)}
                        {invitation.inviterName ? ` by ${invitation.inviterName}` : ""}
                      </p>
                    </div>
                    <span className={cnStatus(status)}>
                      {status === "pending" ? "Pending" : status}
                    </span>
                  </div>

                  {status === "pending" && (
                    <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                      <code className="min-w-0 flex-1 truncate rounded-lg border border-border bg-background px-3 py-2 font-mono text-[11px]">
                        {url}
                      </code>
                      <div className="flex shrink-0 gap-2">
                        <button
                          type="button"
                          onClick={() => void copy(url, "Invitation link")}
                          className="btn-secondary justify-center gap-1.5 px-3 py-2 text-xs"
                        >
                          <FiCopy className="h-3.5 w-3.5" aria-hidden /> Copy
                        </button>
                        <button
                          type="button"
                          onClick={() => resend.mutate(invitation.id)}
                          disabled={resend.isPending}
                          className="btn-secondary justify-center gap-1.5 px-3 py-2 text-xs disabled:opacity-60"
                        >
                          <FiRefreshCw className="h-3.5 w-3.5" aria-hidden /> Refresh
                        </button>
                        <button
                          type="button"
                          onClick={() => revoke.mutate(invitation.id)}
                          disabled={revoke.isPending}
                          className="btn-secondary justify-center gap-1.5 px-3 py-2 text-xs text-destructive hover:border-destructive/40 disabled:opacity-60"
                        >
                          <FiTrash2 className="h-3.5 w-3.5" aria-hidden /> Revoke
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

function buildInviteUrl(token: string): string {
  if (typeof window === "undefined") return `/accept-invite?token=${token}`;
  return `${window.location.origin}/accept-invite?token=${token}`;
}

function cnStatus(status: string): string {
  const base = "shrink-0 rounded-md border px-2 py-1 text-[11px] font-semibold capitalize";
  if (status === "pending") return `${base} border-warning/30 bg-warning/10 text-warning`;
  if (status === "accepted") return `${base} border-success/30 bg-success/10 text-success`;
  return `${base} border-border bg-secondary text-muted-foreground`;
}

function formatDate(value: string): string {
  try {
    return new Date(value).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return value;
  }
}

export type { UserRole };
