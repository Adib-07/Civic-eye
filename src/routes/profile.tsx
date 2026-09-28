import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FiAlertCircle, FiBriefcase, FiCheckCircle, FiMail, FiSave, FiUser } from "react-icons/fi";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Loader } from "@/components/EmptyState";
import { useAuth, useOrganization, useReports } from "@/lib/hooks";
import { getDefaultOrganizationId, resolveOrganizationId } from "@/lib/env";
import { updateOwnProfile } from "@/lib/profile";
import { setAuthProfile } from "@/lib/auth-store";
import { isOrgAdmin, isStaffRole, roleLabel } from "@/lib/types";
import { requireSession } from "@/lib/route-guards";

export const Route = createFileRoute("/profile")({
  beforeLoad: async ({ location }) => {
    await requireSession(location);
  },
  head: () => ({
    meta: [{ title: "Profile — CivicEye" }],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { profile, user, loading, isConfigured } = useAuth();
  const orgId = resolveOrganizationId(profile) ?? getDefaultOrganizationId();
  const { data: org } = useOrganization(orgId);
  const { reports } = useReports();

  const [fullName, setFullName] = useState(profile?.fullName ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const myReports = reports.filter((r) => r.createdBy === user?.id);
  const resolvedMine = myReports.filter(
    (r) => r.status === "Resolved" || r.status === "Verified" || r.status === "Closed",
  ).length;

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const updated = await updateOwnProfile({ fullName });
      setAuthProfile(updated);
      toast.success("Profile updated");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save your profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AppShell title="Profile" requireAuth>
        <Loader label="Loading your profile" />
      </AppShell>
    );
  }

  return (
    <AppShell title="Profile" subtitle={user?.email ?? undefined} requireAuth>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <section className="surface-panel p-6">
          <div className="flex items-start gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
              <FiUser className="h-6 w-6" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-lg font-bold">
                {profile?.fullName ?? "Your account"}
              </h2>
              <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                <FiMail className="h-3.5 w-3.5" aria-hidden />
                {profile?.email ?? user?.email}
              </p>
              <p className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary px-2.5 py-1 text-xs font-semibold">
                <FiCheckCircle className="h-3.5 w-3.5 text-success" aria-hidden />
                {roleLabel(profile?.role ?? "citizen")}
              </p>
            </div>
          </div>

          <form onSubmit={save} className="mt-6 space-y-4 border-t border-border pt-6">
            <div className="form-field">
              <label htmlFor="profile-fullName" className="label">
                Display name
              </label>
              <input
                id="profile-fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="How your name appears to your team"
                className="input-lg"
                maxLength={120}
              />
              <p className="mt-1.5 text-xs text-muted-foreground">
                This is what teammates see when an issue is assigned to you.
              </p>
            </div>

            <div className="form-field">
              <label htmlFor="profile-email" className="label">
                Email address
              </label>
              <input
                id="profile-email"
                type="email"
                value={profile?.email ?? user?.email ?? ""}
                readOnly
                disabled
                className="input-lg cursor-not-allowed opacity-70"
              />
              <p className="mt-1.5 text-xs text-muted-foreground">
                Your sign-in address is managed by your identity provider and cannot be changed
                here.
              </p>
            </div>

            {error && (
              <p className="form-error" role="alert">
                <FiAlertCircle className="h-3.5 w-3.5" aria-hidden />
                <span>{error}</span>
              </p>
            )}

            <button
              type="submit"
              disabled={saving || !isConfigured || fullName === (profile?.fullName ?? "")}
              className="btn-primary gap-2 disabled:opacity-50"
            >
              <FiSave className="h-4 w-4" aria-hidden />
              {saving ? "Saving…" : "Save changes"}
            </button>
          </form>
        </section>

        <div className="space-y-5">
          <section className="surface-panel p-6">
            <p className="section-label">Organization</p>
            {profile?.organizationId ? (
              <>
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold">
                  <FiBriefcase className="h-4 w-4 text-primary" aria-hidden />
                  {org?.name ?? "Your organization"}
                </p>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  {isOrgAdmin(profile.role)
                    ? "You can manage the team, invitations and organization settings."
                    : isStaffRole(profile.role)
                      ? "You can triage and resolve issues for this organization."
                      : "You are a reporter in this organization's public feed."}
                </p>
                {isStaffRole(profile.role) && (
                  <Link
                    to="/organization"
                    className="mt-4 inline-flex text-xs font-bold text-primary hover:underline"
                  >
                    Open organization console
                  </Link>
                )}
              </>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                You are not attached to an organization yet. If a teammate invited you, open the
                invitation link they shared to join their workspace.
              </p>
            )}
          </section>

          <section className="surface-panel p-6">
            <p className="section-label">Your contributions</p>
            <dl className="mt-3 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-sm text-muted-foreground">Issues reported</dt>
                <dd className="font-display text-lg font-bold tabular-nums">{myReports.length}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-sm text-muted-foreground">Resolved or verified</dt>
                <dd className="font-display text-lg font-bold tabular-nums">{resolvedMine}</dd>
              </div>
            </dl>
            {myReports.length > 0 && (
              <Link
                to="/issues"
                className="mt-4 inline-flex text-xs font-bold text-primary hover:underline"
              >
                View your reports
              </Link>
            )}
          </section>
        </div>
      </div>
    </AppShell>
  );
}
