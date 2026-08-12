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
    <div className="grid place-items-center gap-3 py-20" role="status" aria-live="polite">
      <span
        className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-primary"
        aria-hidden
      />
      <p className="text-sm font-semibold text-muted-foreground">{label}…</p>
    </div>
  );
}

export function QueryError({
  title = "Could not load data",
  message,
  onRetry,
}: {
  title?: string;
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="glass rounded-2xl border border-destructive/30 bg-destructive/10 p-6 text-center">
      <h3 className="text-lg font-bold text-destructive">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
        >
          Try again
        </button>
      )}
    </div>
  );
}
