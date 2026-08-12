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
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
        breached
          ? "border-destructive/40 bg-destructive/10 text-destructive"
          : "border-warning/40 bg-warning/10 text-warning",
        className,
      )}
    >
      {breached ? "SLA breached" : remaining}
    </span>
  );
}
