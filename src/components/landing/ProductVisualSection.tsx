import { Link } from "@tanstack/react-router";
import { FiCamera, FiUserCheck, FiClock, FiCheckCircle, FiEye } from "react-icons/fi";

import { cn } from "@/lib/utils";
import { DEMO_ISSUES } from "@/components/landing/landing-data";

const STAGES = [
  {
    num: "01",
    name: "Report",
    description: "Anyone in the organization submits a geo-tagged photo report.",
    icon: FiCamera,
  },
  {
    num: "02",
    name: "Assign",
    description: "Assign responsibility to the right team member — you choose who owns it.",
    icon: FiUserCheck,
  },
  {
    num: "03",
    name: "Track",
    description: "SLA timers and status updates keep work visible.",
    icon: FiClock,
  },
  {
    num: "04",
    name: "Resolve",
    description: "Staff upload photo evidence and completion notes.",
    icon: FiCheckCircle,
  },
  {
    num: "05",
    name: "Verify",
    description: "Reporter or supervisor confirms the fix is real.",
    icon: FiEye,
  },
] as const;

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  "In Progress": "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  Resolved: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  Verified: "bg-primary/15 text-primary",
};

const CATEGORY_COLORS: Record<string, string> = {
  Pothole: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  "Broken Street Light": "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  Garbage: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  "Water Leakage": "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  "Road Damage": "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

export function ProductVisualSection() {
  return (
    <section className="bg-background py-16 lg:py-24 pb-12">
      <div className="page-container">
        {/* Header — left-aligned to break center monotone */}
        <div className="max-w-2xl">
          <p className="section-label">How It Works</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            One system for the complete issue lifecycle.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            From first report to verified resolution — every step is tracked, assigned, and
            accountable.
          </p>
        </div>

        {/* Lifecycle Flow */}
        <div className="mt-14 lg:mt-16">
          {/* Desktop layout */}
          <div className="hidden lg:block">
            <div className="relative flex items-start justify-between gap-2">
              {/* Connecting line */}
              <div className="absolute top-5 left-[10%] right-[10%] h-px bg-border" aria-hidden />

              {STAGES.map((stage) => {
                const Icon = stage.icon;
                return (
                  <div
                    key={stage.num}
                    className="flex flex-col items-center text-center max-w-[140px]"
                  >
                    <Icon className="mb-3 h-4 w-4 text-muted-foreground/60" aria-hidden />
                    <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-primary/30 bg-primary/10 text-sm font-bold text-primary">
                      {stage.num}
                    </span>
                    <span className="mt-3 text-sm font-bold">{stage.name}</span>
                    <span className="mt-1.5 text-xs leading-snug text-muted-foreground">
                      {stage.description}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile layout — vertical timeline */}
          <div className="lg:hidden">
            <div className="relative flex flex-col gap-6 pl-8">
              <div className="absolute left-[15px] top-5 bottom-5 w-px bg-border" aria-hidden />

              {STAGES.map((stage) => {
                const Icon = stage.icon;
                return (
                  <div key={stage.num} className="relative flex items-start gap-4">
                    <span className="absolute -left-8 top-0 grid h-10 w-10 place-items-center rounded-full border border-primary/30 bg-primary/10 text-sm font-bold text-primary">
                      {stage.num}
                    </span>
                    <div className="pt-1">
                      <div className="flex items-center gap-2">
                        <Icon className="h-3.5 w-3.5 text-muted-foreground/60" aria-hidden />
                        <span className="text-sm font-bold">{stage.name}</span>
                      </div>
                      <p className="mt-1 text-xs leading-snug text-muted-foreground">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Product Screenshot Mock */}
        <div className="mt-14 lg:mt-20">
          <div className="mb-4 max-w-2xl">
            <p className="section-label">The Issues Workspace</p>
            <p className="mt-2 text-sm text-muted-foreground">
              The operational console where teams triage, filter, assign and track every report —
              with live SLA timers. This is the working tool staff use day to day, distinct from the
              high-level KPI snapshot in the hero above.
            </p>
          </div>

          <div className="product-frame">
            <div className="product-frame-header">
              <span className="product-frame-dot" />
              <span className="product-frame-dot" />
              <span className="product-frame-dot" />
              <span className="ml-2 flex-1 truncate text-[11px] font-medium text-muted-foreground">
                app.civiceye.com/issues
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 border-b border-border bg-secondary/40 px-4 py-2">
              <span className="rounded-md border border-border bg-background px-2 py-1 text-[10px] font-medium text-muted-foreground">
                Filter: All
              </span>
              <span className="rounded-md border border-border bg-background px-2 py-1 text-[10px] font-medium text-muted-foreground">
                Sort: SLA
              </span>
              <span className="rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
                Assign
              </span>
            </div>

<div className="overflow-x-auto pb-2">
  <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="px-4 py-2.5 font-semibold text-muted-foreground">ID</th>
                    <th className="px-4 py-2.5 font-semibold text-muted-foreground">Title</th>
                    <th className="hidden px-4 py-2.5 font-semibold text-muted-foreground sm:table-cell">
                      Category
                    </th>
                    <th className="hidden px-4 py-2.5 font-semibold text-muted-foreground md:table-cell">
                      Status
                    </th>
                    <th className="px-4 py-2.5 text-right font-semibold text-muted-foreground">
                      SLA
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {DEMO_ISSUES.map((issue) => (
                    <tr
                      key={issue.id}
                      className="bg-background transition-colors hover:bg-secondary/30"
                    >
                      <td className="px-4 py-2.5 font-mono text-[11px] text-muted-foreground">
                        {issue.id.slice(0, 8)}
                      </td>
                      <td className="max-w-[200px] truncate px-4 py-2.5 font-medium">
                        {issue.title}
                      </td>
                      <td className="hidden px-4 py-2.5 sm:table-cell">
                        <span
                          className={cn(
                            "inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold leading-4",
                            CATEGORY_COLORS[issue.category] ?? "bg-secondary text-muted-foreground",
                          )}
                        >
                          {issue.category}
                        </span>
                      </td>
                      <td className="hidden px-4 py-2.5 md:table-cell">
                        <span
                          className={cn(
                            "inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold leading-4",
                            STATUS_COLORS[issue.status] ?? "bg-secondary text-muted-foreground",
                          )}
                        >
                          {issue.status}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono text-[11px] text-muted-foreground">
                        {issue.sla}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Illustrative interface —{" "}
            <Link to="/book-demo" className="underline underline-offset-2 hover:text-foreground">
              sign in
            </Link>{" "}
            for your organization&apos;s live workspace
          </p>
        </div>
      </div>
    </section>
  );
}
