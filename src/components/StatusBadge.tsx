import type { Status } from "@/lib/types";
import { cn } from "@/lib/utils";

const styles: Record<Status, string> = {
  Pending: "bg-warning/15 text-warning border-warning/30",
  "In Progress": "bg-primary/15 text-primary border-primary/30",
  Resolved: "bg-accent text-accent-foreground border-accent",
  Verified: "bg-success/15 text-success border-success/30",
  Closed: "bg-muted text-muted-foreground border-border",
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      role="status"
      aria-label={`Status: ${status}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold",
        styles[status],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
