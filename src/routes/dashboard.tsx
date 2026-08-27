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
import { useMemo } from "react";
import {
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiSun,
  FiCheck,
  FiPlusCircle,
  FiAlertTriangle,
  FiUserCheck,
} from "react-icons/fi";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
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
import { canVerifyResolution, type Report, STATUSES } from "@/lib/types";
import { useState } from "react";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Operations Dashboard — CivicEye" },
      {
        name: "description",
        content:
          "Organization dashboard for open civic issues, SLA tracking, assignments, and resolution verification.",
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
];

function DashboardPage() {
  const { reports, loading, error, refetch, orgMissing, staffOrgMissing } = useReports();
  const { profile } = useAuth();
  const orgId = resolveOrganizationId(profile) ?? getDefaultOrganizationId();
  const { data: org } = useOrganization(orgId);
  const { data: subscription } = useOrganizationSubscription(orgId);
  const { update, verify, resolveWithEvidence } = useReportMutations();
  const [verifyTarget, setVerifyTarget] = useState<Report | null>(null);
  const [resolveTarget, setResolveTarget] = useState<Report | null>(null);

  const stats = useMemo(() => {
    const byCategory = countByCategory(reports);
    return {
      total: reports.length,
      pending: reports.filter((r) => r.status === "Pending").length,
      inProgress: reports.filter((r) => r.status === "In Progress").length,
      resolved: reports.filter((r) => r.status === "Resolved").length,
      verified: reports.filter((r) => r.status === "Verified").length,
      slaBreached: reports.filter((r) => r.slaBreached).length,
      unassigned: reports.filter((r) => !r.assignedTo && r.status === "Pending").length,
      assigned: reports.filter((r) => Boolean(r.assignedTo)).length,
      today: reports.filter((r) => isToday(r.createdAt)).length,
      byCategory,
      byStatus: STATUSES.map((s) => reports.filter((r) => r.status === s).length),
      awaitingVerification: reports.filter((r) => r.status === "Resolved"),
      openIssues: reports.filter((r) => r.status === "Pending" || r.status === "In Progress"),
      slaOverdue: reports.filter(
        (r) => isSlaBreached(r) && r.status !== "Verified" && r.status !== "Closed",
      ),
      recentlyClosed: reports
        .filter((r) => r.status === "Verified" || r.status === "Resolved")
        .slice(0, 5),
      slaComplianceRate:
        reports.length > 0
          ? Math.round(
              ((reports.length -
                reports.filter(
                  (r) => isSlaBreached(r) && r.status !== "Verified" && r.status !== "Closed",
                ).length) /
                reports.length) *
                100,
            )
          : 100,
    };
  }, [reports]);

  const canVerify = canVerifyResolution(profile?.role);

  return (
    <AppShell
      title="Operations dashboard"
      subtitle={org?.name ?? "Live Operations & SLA Intelligence"}
      requireAuth
      requireStaff
    >
      {loading ? (
        <Loader label="Loading organization data" />
      ) : staffOrgMissing ? (
        <QueryError
          title="Staff profile not linked"
          message="Your Supabase profile must have organization_id set to your municipality UUID before you can access the dashboard."
        />
      ) : orgMissing ? (
        <QueryError
          title="Organization not configured"
          message="Set VITE_DEFAULT_ORGANIZATION_ID in your environment, or ensure your staff profile has an organization_id assigned."
        />
      ) : error ? (
        <QueryError
          message={error instanceof Error ? error.message : "Failed to load dashboard data"}
          onRetry={() => void refetch()}
        />
      ) : (
        <div className="space-y-5">
          {subscription ? (
            <SubscriptionBanner subscription={subscription} />
          ) : (
            <div className="mb-5 rounded-2xl border border-warning/30 bg-warning/10 p-4 text-sm">
              <p className="font-bold">No subscription record found</p>
              <p className="mt-1 text-muted-foreground">
                Staff workflows may be restricted until a plan is activated for this organization.
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
            <div className="surface-panel p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Pending intake
              </p>
              <p className="mt-1 font-display text-3xl font-semibold tabular-nums">
                {stats.pending}
              </p>
            </div>
            <div className="surface-panel p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                In progress
              </p>
              <p className="mt-1 font-display text-3xl font-semibold tabular-nums">
                {stats.inProgress}
              </p>
            </div>
            <div className="surface-panel p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Reported today
              </p>
              <p className="mt-1 font-display text-3xl font-semibold tabular-nums">{stats.today}</p>
            </div>
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
              description="Submit your first report and the charts will populate automatically."
              action={
                <Link
                  to="/report"
                  className="bg-brand inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-primary-foreground"
                >
                  <FiPlusCircle /> New report
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
                      <FiUserCheck className="text-primary" /> Resolution verification queue
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

              {stats.recentlyClosed.length > 0 && (
                <div className="surface-panel overflow-hidden">
                  <div className="border-b border-border px-5 py-4">
                    <h2 className="text-sm font-semibold">Recently resolved</h2>
                  </div>
                  <ul className="divide-y divide-border">
                    {stats.recentlyClosed.map((r) => (
                      <li
                        key={r.id}
                        className="flex flex-wrap items-center justify-between gap-3 p-4"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-semibold">{r.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {r.resolvedAt
                              ? new Date(r.resolvedAt).toLocaleString()
                              : new Date(r.updatedAt).toLocaleString()}
                          </p>
                        </div>
                        <StatusBadge status={r.status} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="surface-panel overflow-hidden">
                <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
                  <h2 className="text-sm font-semibold">Recent reports</h2>
                  <Link to="/reports" className="text-xs font-medium text-primary hover:underline">
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
                            {r.status === "In Progress" ? (
                              <button
                                onClick={() => setResolveTarget(r)}
                                className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary"
                              >
                                <FiCheck /> Resolve
                              </button>
                            ) : r.status === "Pending" && !r.assignedTo ? (
                              <Link
                                to="/reports"
                                className="text-xs font-bold text-primary hover:underline"
                              >
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
                        {r.status === "In Progress" || r.status === "Reopened" ? (
                          <button
                            type="button"
                            onClick={() => setResolveTarget(r)}
                            className="rounded-xl border border-border px-3 py-1.5 text-xs font-bold"
                          >
                            Resolve
                          </button>
                        ) : r.status === "Pending" && !r.assignedTo ? (
                          <Link to="/reports" className="text-xs font-bold text-primary">
                            Assign
                          </Link>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      )}

      <ResolveIssueDialog
        open={!!resolveTarget}
        report={resolveTarget}
        loading={resolveWithEvidence.isPending}
        onCancel={() => setResolveTarget(null)}
        onSubmit={async (file, notes) => {
          if (!resolveTarget) return;
          try {
            await resolveWithEvidence.mutateAsync({ reportId: resolveTarget.id, file, notes });
            toast.success("Resolution submitted successfully — pending reporter verification");
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
            toast.success("Resolution verified — status updated to VERIFIED");
            setVerifyTarget(null);
          } catch (e) {
            toast.error(e instanceof Error ? e.message : "Verification failed");
          }
        }}
        onReject={async (notes) => {
          if (!verifyTarget) return;
          try {
            await verify.mutateAsync({ reportId: verifyTarget.id, approved: false, notes });
            toast.info("Reported as still unresolved — status updated to REOPENED");
            setVerifyTarget(null);
          } catch (e) {
            toast.error(e instanceof Error ? e.message : "Verification failed");
          }
        }}
      />
    </AppShell>
  );
}
