import {
  FiChevronDown,
  FiClock,
  FiHelpCircle,
  FiMessageSquare,
  FiUserX,
  FiXCircle,
} from "react-icons/fi";

import { cn } from "@/lib/utils";

const PROBLEM_STEPS = [
  { icon: FiMessageSquare, label: "Message in a WhatsApp group" },
  { icon: FiUserX, label: "Nobody is assigned" },
  { icon: FiClock, label: "No SLA visibility" },
  { icon: FiHelpCircle, label: "Is it actually fixed?" },
  { icon: FiXCircle, label: "No verification" },
];

export function ProblemStorySection() {
  return (
    <section className="bg-secondary/30 py-14 lg:py-20">
      <div className="page-container">
        <div className="mx-auto max-w-xl">
          <span className="section-label">THE PROBLEM</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Operational issues shouldn&apos;t disappear into WhatsApp, email and
            spreadsheets.
          </h2>

          <div className="mt-8 flex flex-col items-start gap-0">
            {PROBLEM_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex flex-col items-start">
                  <div
                    className={cn(
                      "flex items-center gap-3 w-full",
                      "border border-red-200 dark:border-red-900/40",
                      "bg-red-50/50 dark:bg-red-950/20",
                      "rounded-lg p-3"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-red-500" />
                    <span className="text-sm text-muted-foreground">
                      {step.label}
                    </span>
                  </div>
                  {i < PROBLEM_STEPS.length - 1 && (
                    <FiChevronDown className="h-5 w-5 text-red-300 dark:text-red-800 my-1" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
