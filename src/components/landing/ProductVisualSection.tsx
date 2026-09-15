import { Link } from "@tanstack/react-router";
import { FiCamera, FiUserCheck, FiClock, FiCheckCircle, FiEye, FiArrowRight } from "react-icons/fi";
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
  Pending: "badge-warning",
  "In Progress": "badge-primary",
  Resolved: "badge-success",
  Verified: "badge-primary",
};

const CATEGORY_COLORS: Record<string, string> = {
  Pothole: "badge-warning",
  "Broken Street Light": "badge-primary",
  Garbage: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
  "Water Leakage": "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  "Road Damage": "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
};

export function ProductVisualSection() {
  return (
    <section className="page-section bg-background">
      <div className="container">
        <div className="section-header-center animate-slide-up">
          <p className="caption">How It Works</p>
          <h2 className="mt-4 headline-2">One system for the complete issue lifecycle.</h2>
          <p className="mt-5 body-lg text-muted-foreground">
            From first report to verified resolution — every step is tracked, assigned, and
            accountable.
          </p>
        </div>

        {/* Lifecycle Flow */}
        <div className="mt-18 animate-slide-up stagger-1">
          {/* Desktop layout */}
          <div className="hidden lg:block">
            <div className="relative flex items-start justify-between gap-4">
              <div
                className="absolute top-[28px] left-[10%] right-[10%] h-px bg-border"
                aria-hidden
              />

              {STAGES.map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <div
                    key={stage.num}
                    className="flex flex-col items-center text-center max-w-[160px] relative z-10"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="mb-4">
                      <Icon className="mx-auto h-5 w-5 text-muted-foreground/50" aria-hidden />
                    </div>
                    <span className="relative z-10 inline-grid h-14 w-14 place-items-center rounded-full border-2 border-primary/30 bg-primary/10 text-sm font-bold text-primary">
                      {stage.num}
                    </span>
                    <span className="mt-4 block text-sm font-bold">{stage.name}</span>
                    <span className="mt-2 block text-xs leading-snug text-muted-foreground max-w-[140px]">
                      {stage.description}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile layout */}
          <div className="lg:hidden">
            <div className="relative flex flex-col gap-8 pl-10">
              <div className="absolute left-[18px] top-5 bottom-5 w-px bg-border" aria-hidden />

              {STAGES.map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <div
                    key={stage.num}
                    className="relative flex items-start gap-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="absolute -left-10 top-0 inline-grid h-14 w-14 place-items-center rounded-full border-2 border-primary/30 bg-primary/10 text-sm font-bold text-primary">
                      {stage.num}
                    </span>
                    <div className="pt-1">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground/60" aria-hidden />
                        <span className="text-sm font-bold">{stage.name}</span>
                      </div>
                      <p className="mt-1.5 text-xs leading-snug text-muted-foreground">
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
        <div className="mt-20 animate-slide-up stagger-2">
          <div className="mb-8 section-header">
            <p className="caption">The Issues Workspace</p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              The operational console where teams triage, filter, assign and track every report —
              with live SLA timers. This is the working tool staff use day to day.
            </p>
          </div>

          <div className="product-frame rounded-xl overflow-hidden shadow-lg">
            <div className="product-frame-header">
              <span className="product-frame-dot" />
              <span className="product-frame-dot" />
              <span className="product-frame-dot" />
              <span className="ml-3 flex-1 truncate text-[11px] font-semibold text-muted-foreground">
                app.civiceye.com/issues
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 border-b border-border bg-secondary/40 px-5 py-3">
              <span className="rounded-md border border-border bg-background px-3 py-1.5 text-[11px] font-semibold text-muted-foreground">
                Filter: All
              </span>
              <span className="rounded-md border border-border bg-background px-3 py-1.5 text-[11px] font-semibold text-muted-foreground">
                Sort: SLA
              </span>
              <span className="rounded-md border border-primary/20 bg-primary/10 px-3 py-1.5 text-[11px] font-bold text-primary">
                Assign
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="px-5 py-3 font-bold text-muted-foreground">ID</th>
                    <th className="px-5 py-3 font-bold text-muted-foreground">Title</th>
                    <th className="hidden px-5 py-3 font-bold text-muted-foreground sm:table-cell">
                      Category
                    </th>
                    <th className="hidden px-5 py-3 font-bold text-muted-foreground md:table-cell">
                      Status
                    </th>
                    <th className="px-5 py-3 text-right font-bold text-muted-foreground">SLA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {DEMO_ISSUES.map((issue) => (
                    <tr
                      key={issue.id}
                      className="bg-background transition-colors hover:bg-secondary/30"
                    >
                      <td className="px-5 py-3 font-mono text-[11px] text-muted-foreground">
                        {issue.id.slice(0, 8)}
                      </td>
                      <td className="max-w-[240px] truncate px-5 py-3 font-semibold">
                        {issue.title}
                      </td>
                      <td className="hidden px-5 py-3 sm:table-cell">
                        <span
                          className={cn(
                            "inline-block rounded-full px-2.5 py-1 text-[10px] font-bold leading-4",
                            CATEGORY_COLORS[issue.category] ?? "badge-muted",
                          )}
                        >
                          {issue.category}
                        </span>
                      </td>
                      <td className="hidden px-5 py-3 md:table-cell">
                        <span
                          className={cn(
                            "inline-block rounded-full px-2.5 py-1 text-[10px] font-bold leading-4",
                            STATUS_COLORS[issue.status] ?? "badge-muted",
                          )}
                        >
                          {issue.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right font-mono text-[11px] text-muted-foreground">
                        {issue.sla}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Illustrative interface —{" "}
            <Link
              to="/book-demo"
              className="underline underline-offset-2 hover:text-foreground font-bold"
            >
              sign in
            </Link>{" "}
            for your organization&apos;s live workspace
          </p>
        </div>
      </div>
    </section>
  );
}
