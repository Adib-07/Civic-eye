import { FiCamera, FiCheckCircle, FiShield } from "react-icons/fi";

import { DEMO_ISSUES } from "@/components/landing/landing-data";
import { StatusBadge } from "@/components/StatusBadge";

export function EvidenceSection() {
  const samples = DEMO_ISSUES.slice(0, 3);

  return (
    <section className="border-y border-border bg-secondary/25 py-16 sm:py-20">
      <div className="page-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">Evidence &amp; verification</p>
          <h2 className="mt-2 section-title text-2xl sm:text-3xl">
            Photo evidence and verified resolutions
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Every report can include geo-tagged photo evidence. Staff resolve issues; reporters or
            admins verify fixes before close — creating accountability, not just tickets.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {samples.map((issue) => (
            <article key={issue.id} className="landing-feature-card overflow-hidden">
              <div className="flex aspect-[4/3] items-center justify-center border-b border-border bg-secondary/60">
                <div className="text-center">
                  <FiCamera className="mx-auto h-8 w-8 text-muted-foreground/50" aria-hidden />
                  <p className="mt-2 text-xs text-muted-foreground">Evidence attached at submit</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold leading-snug">{issue.title}</h3>
                  <StatusBadge status={issue.status} className="shrink-0 scale-90" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{issue.location}</p>
                <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-success">
                  <FiCheckCircle aria-hidden />
                  {issue.status === "Verified" || issue.status === "Resolved"
                    ? "Resolution recorded"
                    : "Awaiting field action"}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 flex max-w-xl items-start gap-3 rounded-xl border border-border bg-background p-4 text-sm text-muted-foreground">
          <FiShield className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
          <p>
            Every resolution requires photo evidence and a verification step. This ensures work
            is actually completed — not just marked done in a spreadsheet.
          </p>
        </div>
      </div>
    </section>
  );
}
