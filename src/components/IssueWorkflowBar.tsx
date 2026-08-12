import type { Status } from "@/lib/types";
import { cn } from "@/lib/utils";

const STEPS = ["Reported", "Assigned", "In progress", "Resolved", "Verified"] as const;

function activeStepIndex(status: Status, assigned: boolean): number {
  if (status === "Verified" || status === "Closed") return 4;
  if (status === "Resolved") return 3;
  if (status === "In Progress") return 2;
  if (status === "Pending" && assigned) return 1;
  return 0;
}

export function IssueWorkflowBar({
  status,
  assigned,
  className,
}: {
  status: Status;
  assigned: boolean;
  className?: string;
}) {
  const active = activeStepIndex(status, assigned);

  return (
    <ol
      className={cn("flex flex-wrap gap-1 sm:gap-0", className)}
      aria-label="Issue workflow progress"
    >
      {STEPS.map((label, i) => {
        const done = i < active;
        const current = i === active;
        return (
          <li
            key={label}
            className={cn(
              "flex min-w-0 flex-1 items-center gap-1 text-[10px] font-semibold uppercase tracking-wide sm:text-[11px]",
              i < STEPS.length - 1 && "sm:pr-1",
            )}
          >
            <span
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px]",
                done && "border-success/40 bg-success/15 text-success",
                current && "border-primary bg-primary/15 text-primary",
                !done && !current && "border-border bg-secondary text-muted-foreground",
              )}
              aria-current={current ? "step" : undefined}
            >
              {i + 1}
            </span>
            <span
              className={cn(
                "hidden truncate sm:inline",
                current ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
