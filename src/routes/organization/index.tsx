import { createFileRoute, Link } from "@tanstack/react-router";
import { FiArrowRight, FiMail, FiUserPlus, FiUsers } from "react-icons/fi";

import { EmptyState, Loader, QueryError } from "@/components/EmptyState";
import {
  useAuth,
  useOrganizationInvitations,
  useOrganizationMembers,
  useReports,
} from "@/lib/hooks";
import { isOrgAdmin } from "@/lib/types";

export const Route = createFileRoute("/organization/")({
  component: OrganizationOverview,
});

function OrganizationOverview() {
  const { profile } = useAuth();
  const admin = isOrgAdmin(profile?.role);
  const {
    data: members,
    isLoading: membersLoading,
    error: membersError,
  } = useOrganizationMembers();
  const { data: invitations, isLoading: invitesLoading } = useOrganizationInvitations();
  const { reports, orgMissing, staffOrgMissing } = useReports();

  const pendingInvites = (invitations ?? []).filter((i) => i.status === "pending").length;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="surface-panel p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Team members
          </p>
          {membersLoading ? (
            <div className="mt-2 h-8 w-12 animate-pulse rounded bg-secondary" />
          ) : (
            <p className="mt-1 font-display text-3xl font-semibold tabular-nums">
              {members?.length ?? 0}
            </p>
          )}
        </div>
        <div className="surface-panel p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Pending invites
          </p>
          {invitesLoading ? (
            <div className="mt-2 h-8 w-12 animate-pulse rounded bg-secondary" />
          ) : (
            <p className="mt-1 font-display text-3xl font-semibold tabular-nums">
              {pendingInvites}
            </p>
          )}
        </div>
        <div className="surface-panel p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Open issues
          </p>
          <p className="mt-1 font-display text-3xl font-semibold tabular-nums">
            {reports.filter((r) => r.status === "Pending" || r.status === "In Progress").length}
          </p>
        </div>
      </div>

      {staffOrgMissing || orgMissing ? (
        <QueryError
          title="Organization not linked"
          message="Your profile is not attached to an organization, so there is no workspace to manage yet."
        />
      ) : null}

      {membersError ? (
        <QueryError
          title="Could not load your team"
          message={membersError instanceof Error ? membersError.message : "Please try again."}
        />
      ) : null}

      <div className="surface-panel p-6">
        <div className="flex items-start gap-4">
          <span className="icon-wrapper-xl icon-wrapper-primary shrink-0">
            <FiUserPlus className="h-6 w-6" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-semibold">Access lifecycle</h2>
            <ol className="mt-3 space-y-2.5 text-sm text-muted-foreground">
              {[
                "Your organization requests a pilot or a plan (Book a demo, or Start with CivicEye).",
                "An operator provisions the organization workspace and grants you the Organization Admin role.",
                "You invite teammates from Team & invites — each gets a setup link scoped to your organization.",
                "The invitee creates an account with the invited email and is placed in this workspace automatically.",
                "They sign in and land on the CivicEye dashboard with the role you assigned.",
              ].map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-secondary text-[11px] font-bold text-foreground">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              {admin ? (
                <Link
                  to="/organization/team"
                  className="btn-primary inline-flex justify-center gap-2"
                >
                  <FiUsers className="h-4 w-4" aria-hidden /> Manage team
                </Link>
              ) : (
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FiMail className="h-4 w-4" aria-hidden />
                  Only organization admins can invite teammates.
                </p>
              )}
              <Link
                to="/organization/billing"
                className="btn-secondary inline-flex justify-center gap-2"
              >
                Billing &amp; usage <FiArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {admin && !membersLoading && (members?.length ?? 0) === 0 ? (
        <EmptyState
          icon={FiUsers}
          title="No teammates yet"
          description="You are the only member of this organization. Invite your first teammate to start assigning work."
          action={
            <Link to="/organization/team" className="btn-primary inline-flex gap-2">
              <FiUserPlus className="h-4 w-4" aria-hidden /> Invite a teammate
            </Link>
          }
        />
      ) : null}

      {membersLoading && !membersError ? <Loader label="Loading your team" /> : null}
    </div>
  );
}
