import { cn } from "@/lib/utils";
import { isSlaBreached, slaTimeRemaining } from "@/lib/sla";
import type { Report } from "@/lib/types";

export function SlaBadge({ report, className }: { report: Report; className?: string }) {
  if (!report.slaDueAt) return null;

  const breached = isSlaBreached(report);
  const remaining = slaTimeRemaining(report.slaDueAt);

  return (
    <span
      role="status"
      aria-label={breached ? "SLA breached" : `SLA: ${remaining}`}
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold",
        breached
          ? "border-destructive/25 bg-destructive/8 text-destructive"
          : "border-warning/25 bg-warning/8 text-warning",
        className,
      )}
    >
      {breached ? "Overdue" : remaining}
    </span>
  );
}
