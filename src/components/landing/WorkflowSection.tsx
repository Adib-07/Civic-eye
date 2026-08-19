import {
  FiArrowDown,
  FiCheckCircle,
  FiClipboard,
  FiCompass,
  FiTarget,
  FiEye,
} from "react-icons/fi";

import { WORKFLOW_STEPS } from "@/components/landing/landing-data";

const ICONS = {
  report: FiClipboard,
  assign: FiTarget,
  track: FiCompass,
  resolve: FiCheckCircle,
  verify: FiEye,
} as const;

export function WorkflowSection() {
  return (
    <section id="workflow" className="border-b border-border bg-secondary/30 py-16 sm:py-20">
      <div className="page-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">How It Works</p>
          <h2 className="mt-2 section-title text-2xl sm:text-3xl">From report to verified resolution</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Five accountable stages your organization runs every day — visible to staff and reporters.
          </p>
        </div>

        <ol className="mt-10 flex flex-col items-stretch gap-2 lg:flex-row lg:items-start lg:justify-between lg:gap-3">
          {WORKFLOW_STEPS.map((step, i) => {
            const Icon =
              (step.key in ICONS ? ICONS[step.key as keyof typeof ICONS] : null) ?? FiClipboard;
            return (
              <li key={step.key} className="flex flex-1 flex-col items-center lg:items-stretch">
                <div className="landing-workflow-card w-full max-w-sm lg:max-w-none">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-primary">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-sm font-semibold">{step.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                {i < WORKFLOW_STEPS.length - 1 && (
                  <>
                    <FiArrowDown
                      className="my-2 h-5 w-5 shrink-0 text-muted-foreground/50 lg:hidden"
                      aria-hidden
                    />
                    <span
                      className="mx-2 mt-12 hidden text-muted-foreground/40 lg:inline"
                      aria-hidden
                    >
                      &rarr;
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
