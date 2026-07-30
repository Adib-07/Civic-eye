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
} from "react-icons/fi";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { EmptyState, Loader } from "@/components/EmptyState";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { useReports } from "@/lib/hooks";
import { countByCategory, isToday, setStatus } from "@/lib/storage";
import { STATUSES } from "@/lib/types";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — CivicEye" },
      {
        name: "description",
        content:
          "Track total, pending and resolved civic reports with category and status analytics, then resolve issues in one click.",
      },
      { property: "og:title", content: "Admin Dashboard — CivicEye" },
      { property: "og:description", content: "Analytics and triage for every city issue report." },
    ],
  }),
  component: DashboardPage,
});

const PALETTE = ["#2aa5b8", "#2fae76", "#e0a325", "#e0603a", "#7c8ce0", "#48c1a5"];

function DashboardPage() {
  const { reports, loading } = useReports();

  const stats = useMemo(() => {
    const byCategory = countByCategory(reports);
    return {
      total: reports.length,
      pending: reports.filter((r) => r.status === "Pending").length,
      resolved: reports.filter((r) => r.status === "Resolved").length,
      today: reports.filter((r) => isToday(r.createdAt)).length,
      byCategory,
      byStatus: STATUSES.map((s) => reports.filter((r) => r.status === s).length),
    };
  }, [reports]);

  return (
    <AppShell
      title="Dashboard"
      subtitle="City-wide issue analytics"
      requireAuth
    >
      {loading ? (
        <Loader label="Crunching numbers" />
      ) : (
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard icon={FiFileText} label="Total reports" value={stats.total} />
            <StatCard icon={FiClock} label="Pending" value={stats.pending} accent="text-warning" delay={0.05} />
            <StatCard
              icon={FiCheckCircle}
              label="Resolved"
              value={stats.resolved}
              accent="text-success"
              delay={0.1}
            />
            <StatCard icon={FiSun} label="Today's reports" value={stats.today} accent="text-accent" delay={0.15} />
          </div>

          {stats.total === 0 ? (
            <EmptyState
              title="No data to analyse yet"
              description="Submit your first report and the charts will come alive instantly."
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
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-sm font-bold">Reports by category</h2>
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

                <div className="glass rounded-2xl p-6">
                  <h2 className="text-sm font-bold">Reports by status</h2>
                  <div className="mt-4 h-72">
                    <Bar
                      data={{
                        labels: [...STATUSES],
                        datasets: [
                          {
                            label: "Reports",
                            data: stats.byStatus,
                            backgroundColor: ["#e0a325", "#2aa5b8", "#2fae76"],
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

              <div className="glass overflow-hidden rounded-2xl">
                <div className="flex items-center justify-between gap-3 p-5">
                  <h2 className="text-sm font-bold">Recent reports</h2>
                  <Link to="/reports" className="text-xs font-bold text-primary hover:underline">
                    View all
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] text-left text-sm">
                    <thead className="bg-secondary/60 text-xs uppercase text-muted-foreground">
                      <tr>
                        <th className="px-5 py-3">Title</th>
                        <th className="px-5 py-3">Category</th>
                        <th className="px-5 py-3">Location</th>
                        <th className="px-5 py-3">Status</th>
                        <th className="px-5 py-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.slice(0, 8).map((r) => (
                        <tr key={r.id} className="border-t border-border/60">
                          <td className="max-w-[220px] truncate px-5 py-3 font-semibold">{r.title}</td>
                          <td className="px-5 py-3 text-muted-foreground">{r.category}</td>
                          <td className="max-w-[160px] truncate px-5 py-3 text-muted-foreground">
                            {r.location}
                          </td>
                          <td className="px-5 py-3">
                            <StatusBadge status={r.status} />
                          </td>
                          <td className="px-5 py-3 text-right">
                            {r.status === "Resolved" ? (
                              <span className="text-xs font-bold text-success">Done</span>
                            ) : (
                              <button
                                onClick={() => {
                                  setStatus(r.id, "Resolved");
                                  toast.success("Marked as resolved");
                                }}
                                className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 text-xs font-bold hover:bg-secondary"
                              >
                                <FiCheck /> Resolve
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </AppShell>
  );
}
