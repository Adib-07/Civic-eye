import { Link } from "@tanstack/react-router";
import {
  FiAlertTriangle,
  FiArrowRight,
  FiCheckCircle,
  FiFileText,
  FiUserCheck,
} from "react-icons/fi";

export function DashboardPreviewSection() {
  const kpis = [
    { icon: FiFileText, label: "Open issues", hint: "Pending + In Progress" },
    { icon: FiUserCheck, label: "Assigned", hint: "Active ownership" },
    { icon: FiAlertTriangle, label: "SLA attention", hint: "Overdue & unassigned" },
    { icon: FiCheckCircle, label: "Resolved", hint: "Awaiting verification" },
  ];

  return (
    <section className="border-y border-border bg-secondary/30 py-16 sm:py-20">
      <div className="page-container">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="section-label">Operations dashboard</p>
            <h2 className="mt-2 section-title text-2xl sm:text-3xl">
              SLA visibility and resolution queues
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Staff sign in to see live KPIs, attention queues, category breakdowns, and recent
              reports — all scoped to your organization.
            </p>
            <Link to="/dashboard" className="btn-primary mt-6 inline-flex px-4 py-2.5 text-sm">
              Open dashboard <FiArrowRight aria-hidden />
            </Link>
          </div>

          <div className="surface-panel overflow-hidden">
            <div className="border-b border-border px-4 py-3">
              <p className="text-sm font-semibold">Operations overview</p>
              <p className="text-xs text-muted-foreground">
                Structure preview — metrics from your org
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-border">
              {kpis.map(({ icon: Icon, label, hint }) => (
                <div key={label} className="bg-background p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-muted-foreground">{label}</p>
                    <Icon className="h-4 w-4 text-muted-foreground/60" aria-hidden />
                  </div>
                  <p className="mt-2 font-display text-2xl font-semibold text-muted-foreground/30">
                    —
                  </p>
                  <p className="mt-1 text-[10px] text-muted-foreground">{hint}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
              Sign in with staff credentials to populate live counts and charts.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
