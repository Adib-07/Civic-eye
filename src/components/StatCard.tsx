import type { IconType } from "react-icons";
import { useCountUp } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export function StatCard({
  icon: Icon,
  label,
  value,
  suffix = "",
  decimals = 0,
  accent = "text-muted-foreground",
}: {
  icon: IconType;
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  accent?: string;
  delay?: number;
}) {
  const factor = 10 ** decimals;
  const raw = useCountUp(Math.round(value * factor));
  const count = raw / factor;

  return (
    <div className="surface-panel p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        <span
          className={cn(
            "grid h-8 w-8 shrink-0 place-items-center rounded-md border border-border bg-secondary",
            accent,
          )}
        >
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-semibold tracking-tight tabular-nums">
        {count.toLocaleString("en-IN", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
        {suffix}
      </p>
    </div>
  );
}
