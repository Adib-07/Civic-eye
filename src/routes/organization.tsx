import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { FiCreditCard, FiSettings, FiUsers, FiHome, FiAlertTriangle } from "react-icons/fi";

import { AppShell } from "@/components/AppShell";
import { useAuth, useOrganization } from "@/lib/hooks";
import { getDefaultOrganizationId, resolveOrganizationId } from "@/lib/env";
import { isOrgAdmin, isStaffRole } from "@/lib/types";
import { requireStaff } from "@/lib/route-guards";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/organization")({
  beforeLoad: async ({ location }) => {
    await requireStaff(location);
  },
  head: () => ({
    meta: [
      { title: "Organization — CivicEye" },
      {
        name: "description",
        content:
          "Manage your CivicEye organization: team, invitations, billing and workspace settings.",
      },
    ],
  }),
  component: OrganizationLayout,
});

type OrgTab = {
  to: "/organization" | "/organization/team" | "/organization/billing" | "/organization/settings";
  label: string;
  icon: typeof FiHome;
  adminOnly: boolean;
};

const TABS: OrgTab[] = [
  { to: "/organization", label: "Overview", icon: FiHome, adminOnly: false },
  { to: "/organization/team", label: "Team & invites", icon: FiUsers, adminOnly: true },
  { to: "/organization/billing", label: "Billing & usage", icon: FiCreditCard, adminOnly: false },
  { to: "/organization/settings", label: "Org settings", icon: FiSettings, adminOnly: true },
];

function OrganizationLayout() {
  const { profile } = useAuth();
  const orgId = resolveOrganizationId(profile) ?? getDefaultOrganizationId();
  const { data: org } = useOrganization(orgId);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const admin = isOrgAdmin(profile?.role);
  const staff = isStaffRole(profile?.role);
  const tabs = TABS.filter((tab) => !tab.adminOnly || admin);

  return (
    <AppShell
      title="Organization"
      subtitle={org?.name ?? (staff ? "Your CivicEye workspace" : undefined)}
      requireAuth
      requireStaff
    >
      <nav
        className="mb-5 flex gap-1 overflow-x-auto rounded-xl border border-border bg-card p-1"
        aria-label="Organization sections"
      >
        {tabs.map((tab) => {
          const active =
            tab.to === "/organization" ? pathname === tab.to : pathname.startsWith(tab.to);
          return (
            <Link
              key={tab.to}
              to={tab.to}
              aria-current={active ? "page" : undefined}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                active && "bg-secondary text-foreground",
              )}
            >
              <tab.icon className="h-4 w-4" aria-hidden />
              {tab.label}
            </Link>
          );
        })}
      </nav>

      {!profile?.organizationId && (
        <div className="mb-5 flex items-start gap-3 rounded-2xl border border-warning/30 bg-warning/10 p-4 text-sm">
          <FiAlertTriangle className="mt-0.5 h-4.5 w-4.5 shrink-0 text-warning" aria-hidden />
          <div>
            <p className="font-bold text-foreground">No organization linked</p>
            <p className="mt-1 text-muted-foreground">
              Your staff role is not attached to an organization yet. An organization administrator
              needs to invite you from their team page, or a platform operator needs to set your
              profile&apos;s organization.
            </p>
          </div>
        </div>
      )}

      <Outlet />
    </AppShell>
  );
}
