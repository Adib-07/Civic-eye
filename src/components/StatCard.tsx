import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { useCountUp } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export function StatCard({
  icon: Icon,
  label,
  value,
  suffix = "",
  decimals = 0,
  accent = "text-primary",
  delay = 0,
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
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="card-hover rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)] sm:p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="min-w-0 text-xs font-medium leading-snug text-muted-foreground sm:text-sm">
          {label}
        </p>
        <span
          className={cn(
            "grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent sm:h-10 sm:w-10",
            accent,
          )}
        >
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
      </div>
      <p className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
        {count.toLocaleString("en-IN", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
        {suffix}
      </p>
    </motion.div>
  );
}
