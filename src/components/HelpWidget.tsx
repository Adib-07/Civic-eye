import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { FiMessageCircle, FiX } from "react-icons/fi";
import { cn } from "@/lib/utils";

export function HelpWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-6 z-50" role="complementary" aria-label="Help and support">
      {open && (
        <div className="mb-3 surface-panel shadow-lg border border-border p-4 w-64 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Need help?</h3>
            <button
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close help widget"
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Get a quick walkthrough or speak with our product team.
          </p>
          <div className="space-y-2">
            <Link
              to="/book-demo"
              className="btn-primary w-full justify-center text-xs py-2"
              onClick={() => setOpen(false)}
            >
              Book a Demo
            </Link>
            <Link
              to="/faq"
              className="btn-secondary w-full justify-center text-xs py-2"
              onClick={() => setOpen(false)}
            >
              View FAQ
            </Link>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "grid h-12 w-12 place-items-center rounded-full shadow-lg transition-all",
          "bg-primary text-primary-foreground hover:bg-primary/90",
          open && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        )}
        aria-label={open ? "Close help menu" : "Open help menu"}
      >
        {open ? <FiX className="h-5 w-5" /> : <FiMessageCircle className="h-5 w-5" />}
      </button>
    </div>
  );
}
