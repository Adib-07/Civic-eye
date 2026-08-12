import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] grid place-items-center bg-background/70 p-4 backdrop-blur-sm"
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.95, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-md rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold">Verify resolution</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Confirm whether &ldquo;{title}&rdquo; was fixed on the ground.
            </p>

            <label className="mt-4 block">
              <span className="text-xs font-bold text-muted-foreground">Notes (optional)</span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Describe what you verified on site…"
                className="mt-1.5 w-full rounded-xl border border-border bg-card/60 px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </label>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => onReject(notes)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-destructive/40 px-4 py-2 text-sm font-bold text-destructive hover:bg-destructive/10 disabled:opacity-60"
              >
                <FiXCircle /> Reject
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => onApprove(notes)}
                className="bg-brand inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-primary-foreground disabled:opacity-60"
              >
                <FiCheckCircle /> Approve
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
