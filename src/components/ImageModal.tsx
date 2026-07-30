import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";

export function ImageModal({ src, onClose }: { src: string | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[1000] grid place-items-center bg-background/85 p-4 backdrop-blur-md"
        >
          <button
            onClick={onClose}
            aria-label="Close image"
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-xl border border-border bg-card/70"
          >
            <FiX className="h-5 w-5" />
          </button>
          <motion.img
            initial={{ scale: 0.92 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            src={src}
            alt="Reported civic issue"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-auto max-w-full rounded-2xl border border-border object-contain shadow-2xl"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
