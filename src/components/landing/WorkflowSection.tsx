import {
  FiArrowRight,
  FiCheckCircle,
  FiClipboard,
  FiCompass,
  FiEye,
  FiTarget,
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
    <section id="workflow" className="py-16 sm:py-20">
      <div className="page-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">How It Works</p>
          <h2 className="mt-2 section-title text-2xl sm:text-3xl">
            One system for the complete issue lifecycle
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            From the moment an issue is spotted to final verification &mdash; every step is tracked,
            attributed, and auditable.
          </p>
        </div>

        <ol className="mt-12 flex flex-col items-stretch gap-3 lg:flex-row lg:items-start lg:justify-between lg:gap-4">
          {WORKFLOW_STEPS.map((step, i) => {
            const Icon =
              (step.key in ICONS ? ICONS[step.key as keyof typeof ICONS] : null) ?? FiClipboard;
            return (
              <li key={step.key} className="flex flex-1 flex-col items-center lg:items-stretch">
                <div className="landing-workflow-card w-full max-w-sm lg:max-w-none">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-background text-primary">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="text-[10px] font-mono font-bold text-muted-foreground/60 uppercase tracking-wider">
                      {step.label.split(" ")[0]}
                    </span>
                  </div>
                  <h3 className="mt-3 text-sm font-semibold">
                    {step.label.split(" ").slice(1).join(" ")}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                {i < WORKFLOW_STEPS.length - 1 && (
                  <>
                    <FiArrowRight
                      className="my-2 h-5 w-5 shrink-0 text-muted-foreground/40 lg:hidden"
                      aria-hidden
                    />
                    <span
                      className="mx-3 mt-14 hidden text-muted-foreground/30 lg:inline"
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
