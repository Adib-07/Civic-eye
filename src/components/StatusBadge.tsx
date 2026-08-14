import type { Status } from "@/lib/types";
import { cn } from "@/lib/utils";

const styles: Record<Status, string> = {
  Pending: "bg-warning/10 text-warning border-warning/25",
  "In Progress": "bg-primary/8 text-primary border-primary/20",
  Resolved: "bg-accent text-accent-foreground border-border",
  Verified: "bg-success/10 text-success border-success/25",
  Closed: "bg-muted text-muted-foreground border-border",
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      role="status"
      aria-label={`Status: ${status}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-semibold tracking-wide",
        styles[status],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {status}
    </span>
  );
}
