import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiCheckCircle, FiRefreshCw, FiX } from "react-icons/fi";

export function VerifyDialog({
  open,
  title,
  loading,
  onApprove,
  onReject,
  onCancel,
}: {
  open: boolean;
  title: string;
  loading?: boolean;
  onApprove: (notes: string) => void;
  onReject: (notes: string) => void;
  onCancel: () => void;
}) {
  const [notes, setNotes] = useState("");

  const handleClose = () => {
    setNotes("");
    onCancel();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] grid place-items-center bg-background/70 p-4 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="verify-dialog-title"
            className="glass w-full max-w-md rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
                  Citizen Verification
                </span>
                <h3 id="verify-dialog-title" className="text-lg font-bold text-foreground">
                  Has this issue been resolved?
                </h3>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close dialog"
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-3 text-sm text-muted-foreground">
              Confirm whether <strong>&ldquo;{title}&rdquo;</strong> was fixed on the ground.
            </p>

            <label className="mt-4 block">
              <span className="text-xs font-bold text-foreground">Verification Notes (optional)</span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Describe what you verified on site or why it is still unresolved..."
                className="mt-1.5 w-full rounded-xl border border-border bg-card/60 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary"
              />
            </label>

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  onReject(notes);
                  setNotes("");
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-destructive/50 bg-destructive/10 px-4 py-2 text-sm font-bold text-destructive hover:bg-destructive/20 disabled:opacity-60"
              >
                <FiRefreshCw className="h-4 w-4" /> Report Still Unresolved
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  onApprove(notes);
                  setNotes("");
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-sm font-bold text-white shadow-md transition-all hover:bg-emerald-500 disabled:opacity-60"
              >
                <FiCheckCircle className="h-4 w-4" /> Confirm Resolution
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
