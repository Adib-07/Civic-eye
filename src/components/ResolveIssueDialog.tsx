import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { FiCamera, FiCheck, FiRefreshCw, FiUploadCloud, FiX } from "react-icons/fi";
import { toast } from "sonner";

import type { Report } from "@/lib/types";

const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8MB

export function ResolveIssueDialog({
  open,
  report,
  loading,
  onCancel,
  onSubmit,
}: {
  open: boolean;
  report: Report | null;
  loading: boolean;
  onCancel: () => void;
  onSubmit: (file: File, notes: string) => Promise<void>;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setImageFile(null);
    setImagePreview(null);
    setNotes("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClose = () => {
    resetForm();
    onCancel();
  };

  const handleFileChange = (file?: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (JPEG, PNG, or WebP).");
      return;
    }

    if (file.size > MAX_IMAGE_BYTES) {
      toast.error("Resolution image size must be under 8MB.");
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      toast.error("Resolution photo evidence is required before marking resolved.");
      return;
    }
    if (!notes.trim()) {
      toast.error("Please provide a description of the resolution work done.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(imageFile, notes.trim());
      resetForm();
    } catch {
      /* handled in caller toast */
    } finally {
      setSubmitting(false);
    }
  };

  const isFormValid = Boolean(imageFile && notes.trim() && !loading && !submitting);

  return (
    <AnimatePresence>
      {open && report && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 z-[1000] grid place-items-center overflow-y-auto bg-background/70 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, y: 14 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="resolve-dialog-title"
            className="glass my-8 w-full max-w-lg rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-500">
                  Staff Resolution Submission
                </span>
                <h3 id="resolve-dialog-title" className="text-lg font-bold text-foreground">
                  Submit Resolution Evidence
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

            <p className="mt-3 text-xs text-muted-foreground">
              Attach photo evidence demonstrating that <strong>"{report.title}"</strong> has been
              repaired or cleaned. This evidence will be shown to reporters for verification.
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {/* Photo Evidence Uploader */}
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Resolution Photo Evidence <span className="text-destructive">*</span>
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => handleFileChange(e.target.files?.[0])}
                />

                {imagePreview ? (
                  <div className="space-y-2">
                    <div className="relative overflow-hidden rounded-xl border border-border">
                      <img
                        src={imagePreview}
                        alt="Resolution evidence preview"
                        className="h-48 w-full object-cover"
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="font-semibold text-primary hover:underline flex items-center gap-1"
                      >
                        <FiRefreshCw className="h-3 w-3" /> Change Photo
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="font-semibold text-destructive hover:underline flex items-center gap-1"
                      >
                        <FiX className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-secondary/30 px-4 py-8 transition-all hover:border-emerald-500/50 hover:bg-secondary"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
                      <FiCamera className="h-6 w-6" />
                    </span>
                    <span className="text-xs font-bold text-foreground">
                      Upload or Snap After-Fix Evidence Photo
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      JPEG, PNG, WebP up to 8MB
                    </span>
                  </button>
                )}
              </div>

              {/* Resolution Work Notes */}
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Resolution Work Details <span className="text-destructive">*</span>
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe the corrective action taken (e.g., filled pothole with cold mix asphalt, replaced light bulb, cleared waste container)..."
                  className="w-full rounded-xl border border-border bg-card/60 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-sm font-bold text-white shadow-md transition-all hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading || submitting ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  ) : (
                    <FiCheck className="h-4 w-4" />
                  )}
                  Submit Resolution
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
