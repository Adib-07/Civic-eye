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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="surface-panel grid place-items-center px-6 py-16 text-center"
    >
      <span className="grid h-12 w-12 place-items-center rounded-lg border border-border bg-secondary text-muted-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  );
}

export function Loader({ label = "Loading" }: { label?: string }) {
  return (
    <div className="grid place-items-center gap-3 py-20" role="status" aria-live="polite">
      <span
        className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary"
        aria-hidden
      />
      <p className="text-sm font-medium text-muted-foreground">{label}…</p>
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
    <div className="surface-panel border-destructive/30 bg-destructive/5 p-6 text-center">
      <h3 className="text-base font-semibold text-destructive">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn-primary mt-4">
          Try again
        </button>
      )}
    </div>
  );
}
