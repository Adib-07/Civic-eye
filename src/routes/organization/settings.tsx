import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FiAlertCircle, FiCheckCircle, FiGlobe, FiSave } from "react-icons/fi";
import { toast } from "sonner";

import { useAuth, useOrganization } from "@/lib/hooks";
import { getDefaultOrganizationId, resolveOrganizationId } from "@/lib/env";
import { getSupabase } from "@/lib/supabase";
import { isOrgAdmin } from "@/lib/types";
import { requireOrgAdmin } from "@/lib/route-guards";

export const Route = createFileRoute("/organization/settings")({
  beforeLoad: async ({ location }) => {
    await requireOrgAdmin(location);
  },
  head: () => ({
    meta: [{ title: "Organization Settings — CivicEye" }],
  }),
  component: OrganizationSettingsPage,
});

function OrganizationSettingsPage() {
  const { profile } = useAuth();
  const orgId = resolveOrganizationId(profile) ?? getDefaultOrganizationId();
  const { data: org, isLoading, refetch } = useOrganization(orgId);

  const [publicReports, setPublicReports] = useState<boolean | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOrgAdmin(profile?.role)) {
    return (
      <div className="card p-6">
        <p className="font-bold">Organization admin access required</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Only organization admins can change workspace settings.
        </p>
      </div>
    );
  }

  const currentPublic =
    publicReports ?? (org as { public_reports?: boolean } | undefined)?.public_reports ?? true;

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!orgId) {
      setError("Your profile is not linked to an organization.");
      return;
    }

    const sb = getSupabase();
    if (!sb) {
      setError("Supabase is not configured.");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      // RLS restricts this UPDATE to admins of this organization, and the org id
      // comes from the signed-in profile rather than from user input.
      const { error: updateError } = await sb
        .from("organizations")
        .update({ public_reports: currentPublic })
        .eq("id", orgId);

      if (updateError) throw new Error(updateError.message);

      await refetch();
      toast.success("Organization settings saved");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save the settings.");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return <div className="h-40 animate-pulse rounded-2xl bg-secondary" />;
  }

  return (
    <div className="space-y-6">
      <form onSubmit={save} className="surface-panel p-6">
        <div className="flex items-start gap-4">
          <span className="icon-wrapper-xl icon-wrapper-primary shrink-0">
            <FiGlobe className="h-6 w-6" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-semibold">Public issue feed</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              When enabled, anyone (including signed-out visitors) can see and report issues for{" "}
              <strong>{org?.name ?? "this organization"}</strong>. When disabled, your issues are
              visible only to your signed-in organization staff and to the people who reported them.
            </p>

            <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-secondary/50">
              <input
                type="checkbox"
                checked={currentPublic}
                onChange={(e) => setPublicReports(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]"
              />
              <span>
                <span className="block text-sm font-semibold">Allow anonymous reporting</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  Turn off for internal-only workspaces where all issues must come from a known
                  reporter.
                </span>
              </span>
            </label>

            {error && (
              <p className="form-error mt-4" role="alert">
                <FiAlertCircle className="h-3.5 w-3.5" aria-hidden />
                <span>{error}</span>
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="btn-primary mt-5 gap-2 disabled:opacity-60"
            >
              {saving ? (
                "Saving…"
              ) : (
                <>
                  <FiSave className="h-4 w-4" aria-hidden /> Save settings
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      <section className="surface-panel p-6">
        <p className="section-label">Organization</p>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Name
            </dt>
            <dd className="mt-1 text-sm">{org?.name ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Slug
            </dt>
            <dd className="mt-1 font-mono text-sm">{org?.slug ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Organization ID
            </dt>
            <dd className="mt-1 break-all font-mono text-xs">{orgId ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Your role
            </dt>
            <dd className="mt-1 flex items-center gap-1.5 text-sm">
              <FiCheckCircle className="h-4 w-4 text-success" aria-hidden />
              {profile?.role}
            </dd>
          </div>
        </dl>
        <p className="mt-5 text-xs text-muted-foreground">
          The organization name and slug are provisioned by a CivicEye operator. Contact support to
          change them.
        </p>
      </section>
    </div>
  );
}
