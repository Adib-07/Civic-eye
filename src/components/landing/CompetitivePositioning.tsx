import { FiCheckCircle, FiClipboard, FiClock, FiEye, FiTarget } from "react-icons/fi";

const DIFFERENTIATORS = [
  {
    icon: FiClipboard,
    label: "Report",
    text: "Structured intake with mandatory photo, GPS, and category — not a generic chat message.",
  },
  {
    icon: FiTarget,
    label: "Assign",
    text: "Explicit team ownership recorded at the database level — not informal thread replies.",
  },
  {
    icon: FiClock,
    label: "SLA",
    text: "Configurable resolution timers per category with automatic breach visibility.",
  },
  {
    icon: FiCheckCircle,
    label: "Evidence",
    text: "Photo proof and work notes required before an issue can be marked resolved.",
  },
  {
    icon: FiEye,
    label: "Verify",
    text: "Reporter or supervisor confirms actual resolution — closing the accountability loop.",
  },
] as const;

export function CompetitivePositioning() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="positioning-heading">
      <div className="page-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-label">Why CivicEye</p>
          <h2 id="positioning-heading" className="mt-2 section-title text-2xl sm:text-3xl">
            Designed around the complete issue-to-verification workflow
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Many tools help you report issues. Fewer help you verify they were actually fixed.
            CivicEye covers the entire lifecycle — from the moment something is spotted to confirmed
            resolution with evidence.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          {DIFFERENTIATORS.map((d, i) => (
            <div key={d.label} className="w-full max-w-lg">
              <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-background text-primary">
                  <d.icon className="h-4 w-4" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{d.label}</span>
                    <span className="text-[10px] font-mono text-muted-foreground/60">
                      Step {i + 1}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{d.text}</p>
                </div>
              </div>
              {i < DIFFERENTIATORS.length - 1 && (
                <div className="flex justify-center py-1">
                  <span className="text-muted-foreground/30 text-xs" aria-hidden>
                    &darr;
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 mx-auto max-w-2xl text-center">
          <p className="text-sm text-muted-foreground leading-relaxed">
            CivicEye is not a complaint form, a messaging tool, or a spreadsheet tracker. It is
            operational issue-management software built around one principle:{" "}
            <strong className="text-foreground">
              every issue should be verifiably resolved, not just marked done.
            </strong>
          </p>
        </div>
      </div>
    </section>
  );
}
