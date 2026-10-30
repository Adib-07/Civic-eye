import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FiArrowRight, FiX } from "react-icons/fi";
import { useState } from "react";

import { useHydrated } from "@/lib/hooks";

const ONBOARDING_KEY = "civiceye_onboarding_dismissed";

export function OnboardingBanner() {
  // localStorage is only read after hydration. Reading it in a useState
  // initializer produces different markup on the server and the client, which
  // React reports as a hydration mismatch.
  const hydrated = useHydrated();
  const [dismissed, setDismissed] = useState(false);

  if (!hydrated || dismissed || isDismissed()) return null;

  const dismiss = () => {
    localStorage.setItem(ONBOARDING_KEY, "1");
    setDismissed(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-5 overflow-hidden rounded-2xl border border-primary/25 bg-primary/5"
    >
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="min-w-0">
          <p className="text-sm font-bold text-foreground">Welcome to CivicEye</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Report an issue with a photo, track it on the map, and let your ward team assign,
            resolve, and verify fixes — all in one place.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
          >
            Quick tour <FiArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss onboarding"
            className="grid h-9 w-9 place-items-center rounded-xl border border-border hover:bg-secondary"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function isDismissed(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(ONBOARDING_KEY) === "1";
}

export function dismissOnboarding() {
  if (typeof window === "undefined") return;
  localStorage.setItem(ONBOARDING_KEY, "1");
}
