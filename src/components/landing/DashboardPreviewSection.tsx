import { Link } from "@tanstack/react-router";
import {
  FiAlertTriangle,
  FiArrowRight,
  FiCheckCircle,
  FiFileText,
  FiMapPin,
  FiUserCheck,
} from "react-icons/fi";

const DEMO_STATS = [
  { label: "Open Issues", value: "24", change: "+3 today", color: "text-blue-500" },
  { label: "SLA On Track", value: "89%", change: "of assigned", color: "text-emerald-500" },
  { label: "Overdue", value: "4", change: "needs attention", color: "text-amber-500" },
  { label: "Resolved This Week", value: "31", change: "verified", color: "text-primary" },
];

const DEMO_CATEGORIES = [
  { name: "Pothole", count: 8, pct: 33 },
  { name: "Streetlight", count: 6, pct: 25 },
  { name: "Water Leakage", count: 5, pct: 21 },
  { name: "Garbage", count: 3, pct: 12 },
  { name: "Other", count: 2, pct: 9 },
];

const DEMO_RECENT = [
  { id: "CE-4821", title: "Pothole near main gate", status: "In Progress", location: "Sector 4" },
  { id: "CE-4820", title: "Streetlight outage", status: "Pending", location: "Avenue 3" },
  { id: "CE-4819", title: "Water leak — pump room", status: "Resolved", location: "Block C" },
];

function StatusDot({ status }: { status: string }) {
  const colors: Record<string, string> = {
    "In Progress": "bg-blue-500",
    Pending: "bg-amber-500",
    Resolved: "bg-emerald-500",
  };
  return <span className={`h-1.5 w-1.5 rounded-full ${colors[status] ?? "bg-muted-foreground"}`} />;
}

export function DashboardPreviewSection() {
  return (
    <section className="py-16 sm:py-20 border-y border-border bg-secondary/30">
      <div className="page-container">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="section-label">Dashboard</p>
            <h2 className="mt-2 section-title text-2xl sm:text-3xl">
              SLA visibility and resolution queues
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Staff sign in to see live KPIs, attention queues, category breakdowns, and recent
              reports — all scoped to your organization.
            </p>
            <Link to="/book-demo" className="btn-primary mt-6 inline-flex px-4 py-2.5 text-sm">
              Book a Demo <FiArrowRight aria-hidden />
            </Link>
          </div>

          <div className="surface-panel overflow-hidden">
            <div className="border-b border-border px-4 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Operations Overview</p>
                  <p className="text-[11px] text-muted-foreground">
                    Demo data — sign in for live metrics
                  </p>
                </div>
                <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary border border-primary/20">
                  Demo
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px bg-border">
              {DEMO_STATS.map((stat) => (
                <div key={stat.label} className="bg-background p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-medium text-muted-foreground">{stat.label}</p>
                  </div>
                  <p className={`mt-1.5 font-display text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">{stat.change}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-border">
              <div className="px-4 pt-3 pb-2">
                <p className="text-xs font-semibold text-muted-foreground">Category Breakdown</p>
              </div>
              <div className="space-y-1.5 px-4 pb-3">
                {DEMO_CATEGORIES.map((cat) => (
                  <div key={cat.name} className="flex items-center gap-3 text-xs">
                    <span className="w-24 shrink-0 text-muted-foreground">{cat.name}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary/60"
                        style={{ width: `${cat.pct}%` }}
                      />
                    </div>
                    <span className="w-8 text-right font-mono text-[10px] text-muted-foreground">
                      {cat.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border">
              <div className="px-4 pt-3 pb-2">
                <p className="text-xs font-semibold text-muted-foreground">Recent Reports</p>
              </div>
              <div className="divide-y divide-border">
                {DEMO_RECENT.map((issue) => (
                  <div key={issue.id} className="flex items-center gap-3 px-4 py-2.5">
                    <StatusDot status={issue.status} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium">{issue.title}</p>
                      <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <FiMapPin className="h-2.5 w-2.5" aria-hidden />
                        {issue.location}
                      </p>
                    </div>
                    <span className="shrink-0 text-[10px] font-medium text-muted-foreground">
                      {issue.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border px-4 py-2.5 text-[10px] text-muted-foreground">
              Sign in with staff credentials to view your organization&apos;s live dashboard.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
