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
  { icon: FiMessageSquare, label: "Reported in a WhatsApp group" },
  { icon: FiUserX, label: "No one is assigned" },
  { icon: FiClock, label: "No deadline is tracked" },
  { icon: FiHelpCircle, label: "No one confirms it's fixed" },
  { icon: FiXCircle, label: "Closed without proof" },
];

export function ProblemStorySection() {
  return (
    <section className="bg-secondary/30 py-16 lg:py-24">
      <div className="page-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-label">The Problem</span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            An issue reported in a WhatsApp group rarely gets assigned, tracked, or closed with
            proof.
          </h2>
        </div>

        <div className="mx-auto mt-10 flex max-w-md flex-col items-start gap-0">
          {PROBLEM_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.label} className="flex flex-col items-start">
                <div
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg p-3",
                    "border border-red-200 bg-red-50/50 dark:border-red-900/40 dark:bg-red-950/20",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0 text-red-500" aria-hidden />
                  <span className="text-sm text-muted-foreground">{step.label}</span>
                </div>
                {i < PROBLEM_STEPS.length - 1 && (
                  <FiChevronDown
                    className="my-1 h-5 w-5 text-red-300 dark:text-red-800"
                    aria-hidden
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
