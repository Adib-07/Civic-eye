import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { useMemo, useState } from "react";
import {
  FiAlertTriangle,
  FiCheck,
  FiCheckCircle,
  FiFileText,
  FiMap,
  FiMessageSquare,
  FiPlusCircle,
  FiUserCheck,
} from "react-icons/fi";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { OnboardingBanner } from "@/components/OnboardingBanner";
import { EmptyState, Loader, QueryError } from "@/components/EmptyState";
import { ResolveIssueDialog } from "@/components/ResolveIssueDialog";
import { SlaBadge } from "@/components/SlaBadge";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { SubscriptionBanner } from "@/components/SubscriptionBanner";
import { VerifyDialog } from "@/components/VerifyDialog";
import { getDefaultOrganizationId, resolveOrganizationId } from "@/lib/env";
import {
  useAuth,
  useOrganization,
  useOrganizationSubscription,
  useReportMutations,
  useReports,
} from "@/lib/hooks";
import { countByCategory, isToday } from "@/lib/reports";
import { isSlaBreached } from "@/lib/sla";
import { canVerifyResolution, isStaffRole, roleLabel, type Report, STATUSES } from "@/lib/types";
import { requireSession } from "@/lib/route-guards";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async ({ location }) => {
    await requireSession(location);
  },
  head: () => ({
    meta: [
      { title: "Dashboard — CivicEye" },
      {
        name: "description",
        content:
          "Your CivicEye overview: open civic issues, SLA tracking, assignments, and resolution verification.",
      },
    ],
  }),
  component: DashboardPage,
});

const PALETTE = [
  "oklch(0.546 0.215 263)",
  "oklch(0.6 0.14 155)",
  "oklch(0.72 0.15 65)",
  "oklch(0.58 0.21 25)",
  "oklch(0.65 0.1 240)",
  "oklch(0.55 0.12 180)",
];

const STATUS_COLORS = [
  "oklch(0.72 0.15 65)",
  "oklch(0.546 0.215 263)",
  "oklch(0.65 0.1 240)",
  "oklch(0.6 0.14 155)",
  "oklch(0.55 0.02 258)",
  "oklch(0.58 0.21 25)",
  "oklch(0.55 0.12 180)",
];

/**
 * `/dashboard` is the single authenticated home for every role. Staff get the
 * operations console; everyone else gets a reporter-oriented overview. This
 * removes the role-dependent post-login redirect that used to bounce people
 * back to /login.
 */
function DashboardPage() {
  const { reports, loading, error, refetch, orgMissing, staffOrgMissing } = useReports();
  const { profile, user, profileLoading } = useAuth();
  const orgId = resolveOrganizationId(profile) ?? getDefaultOrganizationId();
  const { data: org } = useOrganization(orgId);
  const { data: subscription } = useOrganizationSubscription(orgId);
  const { verify, resolveWithEvidence } = useReportMutations();
  const [verifyTarget, setVerifyTarget] = useState<Report | null>(null);
  const [resolveTarget, setResolveTarget] = useState<Report | null>(null);

  const isStaff = isStaffRole(profile?.role);
  const canVerify = canVerifyResolution(profile?.role);

  const stats = useMemo(() => {
    const byCategory = countByCategory(reports);
    const slaOverdue = reports.filter(
      (r) => isSlaBreached(r) && r.status !== "Verified" && r.status !== "Closed",
    );
    return {
      total: reports.length,
      pending: reports.filter((r) => r.status === "Pending").length,
      inProgress: reports.filter((r) => r.status === "In Progress").length,
      resolved: reports.filter((r) => r.status === "Resolved").length,
      verified: reports.filter((r) => r.status === "Verified").length,
      unassigned: reports.filter((r) => !r.assignedTo && r.status === "Pending").length,
      assigned: reports.filter((r) => Boolean(r.assignedTo)).length,
      today: reports.filter((r) => isToday(r.createdAt)).length,
      byCategory,
      byStatus: STATUSES.map((s) => reports.filter((r) => r.status === s).length),
      awaitingVerification: reports.filter((r) => r.status === "Resolved"),
      openIssues: reports.filter((r) => r.status === "Pending" || r.status === "In Progress"),
      slaOverdue,
      recentlyClosed: reports
        .filter((r) => r.status === "Verified" || r.status === "Resolved")
        .slice(0, 5),
      slaComplianceRate:
        reports.length > 0
          ? Math.round(((reports.length - slaOverdue.length) / reports.length) * 100)
          : 100,
    };
  }, [reports]);

  const myReports = useMemo(
    () => (user ? reports.filter((r) => r.createdBy === user.id) : []),
    [reports, user],
  );

  return (
    <AppShell
      title={isStaff ? "Operations dashboard" : "Dashboard"}
      subtitle={
        org?.name ?? (isStaff ? "Live operations & SLA intelligence" : "Your civic issue overview")
      }
      requireAuth
    >
      <div className="space-y-5">
        <OnboardingBanner />

        {!isStaff ? (
          <section className="surface-panel p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="section-label">Welcome back</p>
                <h2 className="mt-1 font-display text-2xl font-bold">
                  {profile?.fullName ?? user?.email ?? "Welcome"}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  You are signed in as {roleLabel(profile?.role ?? "citizen")}
                  {org?.name ? ` for ${org.name}` : ""}.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link to="/report" className="btn-primary justify-center gap-2">
                  <FiPlusCircle className="h-4 w-4" aria-hidden /> Report an issue
                </Link>
                <Link to="/chat" className="btn-secondary justify-center gap-2">
                  <FiMessageSquare className="h-4 w-4" aria-hidden /> Ask the assistant
                </Link>
              </div>
            </div>
          </section>
        ) : null}

        {loading || profileLoading ? (
          <Loader label="Loading your workspace" />
        ) : staffOrgMissing ? (
          <QueryError
            title="Staff profile not linked"
            message="Your profile needs an organization assigned before you can use the operations dashboard. An organization administrator can invite you from their team page."
          />
        ) : orgMissing ? (
          <QueryError
            title="Organization not configured"
            message="No organization is attached to this deployment. Set VITE_DEFAULT_ORGANIZATION_ID, or have an administrator invite you to an organization."
          />
        ) : error ? (
          <QueryError
            message={error instanceof Error ? error.message : "Failed to load dashboard data"}
            onRetry={() => void refetch()}
          />
        ) : !isStaff ? (
          <ReporterOverview reports={myReports} totalVisible={reports.length} />
        ) : (
          <>
            {subscription ? (
              <SubscriptionBanner subscription={subscription} />
            ) : (
              <div className="rounded-2xl border border-warning/30 bg-warning/10 p-4 text-sm">
                <p className="font-bold">No subscription record found</p>
                <p className="mt-1 text-muted-foreground">
                  Staff workflows stay restricted until a plan is activated for this organization.
                </p>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard icon={FiFileText} label="Open issues" value={stats.openIssues.length} />
              <StatCard
                icon={FiUserCheck}
                label="Assigned"
                value={stats.assigned}
                accent="text-primary"
                delay={0.05}
              />
              <StatCard
                icon={FiAlertTriangle}
                label="SLA overdue"
                value={stats.slaOverdue.length}
                accent="text-destructive"
                delay={0.1}
              />
              <StatCard
                icon={FiCheckCircle}
                label="SLA Compliance"
                value={stats.slaComplianceRate}
                suffix="%"
                accent="text-success"
                delay={0.15}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <MiniStat label="Pending intake" value={stats.pending} />
              <MiniStat label="In progress" value={stats.inProgress} />
              <MiniStat label="Reported today" value={stats.today} />
            </div>

            {(stats.slaOverdue.length > 0 || stats.unassigned > 0) && (
              <div className="surface-panel overflow-hidden">
                <div className="border-b border-border px-5 py-4">
                  <p className="section-label">Attention required</p>
                  <h2 className="mt-1 flex items-center gap-2 text-sm font-semibold">
                    <FiAlertTriangle className="text-destructive" aria-hidden />
                    Unassigned or SLA overdue
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Unassigned or past SLA — assign and update status to keep resolutions on track.
                  </p>
                </div>
                <ul className="divide-y divide-border">
                  {[
                    ...stats.slaOverdue,
                    ...reports.filter((r) => !r.assignedTo && r.status === "Pending"),
                  ]
                    .filter((r, i, arr) => arr.findIndex((x) => x.id === r.id) === i)
                    .slice(0, 6)
                    .map((r) => (
                      <li
                        key={r.id}
                        className="flex flex-wrap items-center justify-between gap-3 p-4"
                      >
                        <Link
                          to="/reports"
                          search={{ overdue: true }}
                          className="min-w-0 flex-1 hover:text-primary"
                        >
                          <p className="truncate font-semibold">{r.title}</p>
                          <p className="text-xs text-muted-foreground">{r.location}</p>
                        </Link>
                        <div className="flex items-center gap-2">
                          <SlaBadge report={r} />
                          <StatusBadge status={r.status} />
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {stats.total === 0 ? (
              <EmptyState
                title="No data to analyse yet"
                description="Submit the first report and the charts will populate automatically."
                action={
                  <Link to="/report" className="btn-primary inline-flex items-center gap-2">
                    <FiPlusCircle className="h-4 w-4" aria-hidden /> New report
                  </Link>
                }
              />
            ) : (
              <>
                <div className="grid gap-5 lg:grid-cols-2">
                  <div className="surface-panel p-6">
                    <h2 className="text-sm font-semibold">Reports by category</h2>
                    <div className="mt-4 h-72">
                      <Pie
                        data={{
                          labels: Object.keys(stats.byCategory),
                          datasets: [
                            {
                              data: Object.values(stats.byCategory),
                              backgroundColor: PALETTE,
                              borderWidth: 0,
                            },
                          ],
                        }}
                        options={{
                          maintainAspectRatio: false,
                          plugins: { legend: { position: "bottom", labels: { boxWidth: 12 } } },
                        }}
                      />
                    </div>
                  </div>

                  <div className="surface-panel p-6">
                    <h2 className="text-sm font-semibold">Reports by status</h2>
                    <div className="mt-4 h-72">
                      <Bar
                        data={{
                          labels: [...STATUSES],
                          datasets: [
                            {
                              label: "Reports",
                              data: stats.byStatus,
                              backgroundColor: STATUS_COLORS,
                              borderRadius: 10,
                            },
                          ],
                        }}
                        options={{
                          maintainAspectRatio: false,
                          plugins: { legend: { display: false } },
                          scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
                        }}
                      />
                    </div>
                  </div>
                </div>

                {stats.awaitingVerification.length > 0 && (
                  <div className="surface-panel overflow-hidden">
                    <div className="border-b border-border px-5 py-4">
                      <h2 className="flex items-center gap-2 text-sm font-semibold">
                        <FiUserCheck className="text-primary" aria-hidden />
                        Resolution verification queue
                      </h2>
                    </div>
                    <div className="divide-y divide-border">
                      {stats.awaitingVerification.slice(0, 5).map((r) => (
                        <div
                          key={r.id}
                          className="flex flex-wrap items-center justify-between gap-3 p-4"
                        >
                          <div className="min-w-0">
                            <p className="truncate font-semibold">{r.title}</p>
                            <p className="text-xs text-muted-foreground">{r.location}</p>
                          </div>
                          {canVerify && (
                            <button
                              type="button"
                              onClick={() => setVerifyTarget(r)}
                              className="rounded-xl bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground"
                            >
                              Verify
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <RecentReportsSection
                  reports={reports}
                  canManage={isStaff}
                  onResolve={setResolveTarget}
                />
              </>
            )}
          </>
        )}
      </div>

      <ResolveIssueDialog
        open={!!resolveTarget}
        report={resolveTarget}
        loading={resolveWithEvidence.isPending}
        onCancel={() => setResolveTarget(null)}
        onSubmit={async (file, notes) => {
          if (!resolveTarget) return;
          try {
            await resolveWithEvidence.mutateAsync({
              reportId: resolveTarget.id,
              file,
              notes,
            });
            toast.success("Resolution submitted — pending reporter verification");
            setResolveTarget(null);
          } catch (e) {
            toast.error(e instanceof Error ? e.message : "Resolution submission failed");
          }
        }}
      />

      <VerifyDialog
        open={!!verifyTarget}
        title={verifyTarget?.title ?? ""}
        loading={verify.isPending}
        onCancel={() => setVerifyTarget(null)}
        onApprove={async (notes) => {
          if (!verifyTarget) return;
          try {
            await verify.mutateAsync({ reportId: verifyTarget.id, approved: true, notes });
            toast.success("Resolution verified — status updated to Verified");
            setVerifyTarget(null);
          } catch (e) {
            toast.error(e instanceof Error ? e.message : "Verification failed");
          }
        }}
        onReject={async (notes) => {
          if (!verifyTarget) return;
          try {
            await verify.mutateAsync({ reportId: verifyTarget.id, approved: false, notes });
            toast.info("Reported as still unresolved — status updated to Reopened");
            setVerifyTarget(null);
          } catch (e) {
            toast.error(e instanceof Error ? e.message : "Verification failed");
          }
        }}
      />
    </AppShell>
  );
}

function ReporterOverview({ reports, totalVisible }: { reports: Report[]; totalVisible: number }) {
  const open = reports.filter(
    (r) => r.status === "Pending" || r.status === "In Progress" || r.status === "Reopened",
  );
  const awaitingYou = reports.filter((r) => r.status === "Resolved");

  if (reports.length === 0) {
    return (
      <EmptyState
        title="You have not reported anything yet"
        description={
          totalVisible > 0
            ? "Your reports will appear here once you submit one, and you will be asked to verify a resolution when staff finish the work."
            : "Report a civic issue with a photo and location, and your organization's team is notified immediately."
        }
        action={
          <Link to="/report" className="btn-primary inline-flex items-center gap-2">
            <FiPlusCircle className="h-4 w-4" aria-hidden /> Report an issue
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={FiFileText} label="My open reports" value={open.length} />
        <StatCard
          icon={FiUserCheck}
          label="Awaiting my verification"
          value={awaitingYou.length}
          accent="text-primary"
          delay={0.05}
        />
        <StatCard
          icon={FiCheckCircle}
          label="Completed"
          value={reports.length - open.length}
          accent="text-success"
          delay={0.1}
        />
      </div>

      {awaitingYou.length > 0 && (
        <div className="rounded-2xl border border-primary/25 bg-primary/5 p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <FiCheckCircle className="text-primary" aria-hidden />
            {awaitingYou.length} report{awaitingYou.length === 1 ? "" : "s"} waiting on your
            verification
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Staff marked these as resolved. Open the Operations queue to approve or reject the fix.
          </p>
          <Link to="/reports" className="btn-primary mt-4 inline-flex gap-2">
            Review resolutions
          </Link>
        </div>
      )}

      <div className="surface-panel overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
          <h2 className="text-sm font-semibold">My reports</h2>
          <Link to="/issues" className="text-xs font-semibold text-primary hover:underline">
            View all issues
          </Link>
        </div>
        <ul className="divide-y divide-border">
          {reports.slice(0, 8).map((r) => (
            <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="truncate font-semibold">{r.title}</p>
                <p className="text-xs text-muted-foreground">
                  {r.location} · {formatDate(r.updatedAt)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <SlaBadge report={r} />
                <StatusBadge status={r.status} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="/map" className="surface-panel flex items-center gap-4 p-5 hover:shadow-md">
          <span className="icon-wrapper-lg icon-wrapper-primary shrink-0">
            <FiMap className="h-5 w-5" aria-hidden />
          </span>
          <span>
            <span className="block text-sm font-semibold">Track on the map</span>
            <span className="block text-xs text-muted-foreground">
              See every issue geographically
            </span>
          </span>
        </Link>
        <Link to="/chat" className="surface-panel flex items-center gap-4 p-5 hover:shadow-md">
          <span className="icon-wrapper-lg icon-wrapper-primary shrink-0">
            <FiMessageSquare className="h-5 w-5" aria-hidden />
          </span>
          <span>
            <span className="block text-sm font-semibold">Ask the AI assistant</span>
            <span className="block text-xs text-muted-foreground">
              Get answers grounded in your reports
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
}

function RecentReportsSection({
  reports,
  canManage,
  onResolve,
}: {
  reports: Report[];
  canManage: boolean;
  onResolve: (report: Report) => void;
}) {
  return (
    <div className="surface-panel overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
        <h2 className="text-sm font-semibold">Recent reports</h2>
        <Link to="/reports" className="text-xs font-semibold text-primary hover:underline">
          View all
        </Link>
      </div>
      <div className="hidden overflow-x-auto md:block">
        <table className="ops-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Assignee</th>
              <th>SLA</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.slice(0, 8).map((r) => (
              <tr key={r.id}>
                <td className="max-w-[200px] truncate font-medium">{r.title}</td>
                <td className="text-muted-foreground">{r.assigneeName ?? "—"}</td>
                <td>
                  <SlaBadge report={r} />
                </td>
                <td>
                  <StatusBadge status={r.status} />
                </td>
                <td className="text-right">
                  {canManage && (r.status === "In Progress" || r.status === "Reopened") ? (
                    <button
                      type="button"
                      onClick={() => onResolve(r)}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary"
                    >
                      <FiCheck className="h-3 w-3" aria-hidden /> Resolve
                    </button>
                  ) : r.status === "Pending" && !r.assignedTo ? (
                    <Link to="/reports" className="text-xs font-bold text-primary hover:underline">
                      Assign
                    </Link>
                  ) : r.status === "Verified" ? (
                    <span className="text-xs font-bold text-success">Verified</span>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="divide-y divide-border md:hidden">
        {reports.slice(0, 8).map((r) => (
          <li key={r.id} className="space-y-2 p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="font-semibold leading-snug">{r.title}</p>
              <StatusBadge status={r.status} />
            </div>
            <p className="text-xs text-muted-foreground">
              {r.assigneeName ? `Assigned: ${r.assigneeName}` : "Unassigned"}
            </p>
            <div className="flex items-center justify-between gap-2">
              <SlaBadge report={r} />
              {canManage && (r.status === "In Progress" || r.status === "Reopened") && (
                <button
                  type="button"
                  onClick={() => onResolve(r)}
                  className="rounded-xl border border-border px-3 py-1.5 text-xs font-bold"
                >
                  Resolve
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="surface-panel p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-3xl font-semibold tabular-nums">{value}</p>
    </div>
  );
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
