import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { FiInbox } from "react-icons/fi";

export function EmptyState({
  icon: Icon = FiInbox,
  title,
  description,
  action,
}: {
  icon?: IconType;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass grid place-items-center rounded-2xl px-6 py-16 text-center"
    >
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-primary">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-lg font-bold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </motion.div>
  );
}

export function Loader({ label = "Loading" }: { label?: string }) {
  return (
    <div className="grid place-items-center gap-3 py-20">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-primary" />
      <p className="text-sm font-semibold text-muted-foreground">{label}…</p>
    </div>
  );
}
