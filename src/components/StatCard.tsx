import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { useCountUp } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export function StatCard({
  icon: Icon,
  label,
  value,
  suffix = "",
  accent = "text-primary",
  delay = 0,
}: {
  icon: IconType;
  label: string;
  value: number;
  suffix?: string;
  accent?: string;
  delay?: number;
}) {
  const count = useCountUp(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="card-hover rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="min-w-0 truncate text-sm font-medium text-muted-foreground">{label}</p>
        <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent", accent)}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-extrabold">
        {count.toLocaleString()}
        {suffix}
      </p>

    </motion.div>
  );
}
