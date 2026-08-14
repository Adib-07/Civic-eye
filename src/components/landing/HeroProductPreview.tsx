import { FiCamera, FiClock, FiMapPin, FiUser } from "react-icons/fi";

import { DEMO_ISSUES } from "@/components/landing/landing-data";
import { StatusBadge } from "@/components/StatusBadge";
import { cn } from "@/lib/utils";

function EvidencePlaceholder({ label }: { label: string }) {
  return (
    <div
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5"
      title={label}
    >
      <FiCamera className="h-3.5 w-3.5 text-white/40" aria-hidden />
      <span className="sr-only">{label} evidence placeholder</span>
    </div>
  );
}

export function HeroProductPreview() {
  const featured = DEMO_ISSUES.slice(0, 4);

  return (
    <div className="cinematic-product-shell mx-auto max-w-5xl">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#4F8CFF]" aria-hidden />
          <span className="text-xs font-medium text-white/80">CivicEye Operations</span>
        </div>
        <span className="text-[10px] font-medium uppercase tracking-wider text-white/40">
          Live preview · illustrative
        </span>
      </div>

      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
        {/* Map panel */}
        <div className="relative min-h-[220px] border-b border-white/10 p-4 sm:min-h-[280px] lg:border-b-0 lg:border-r">
          <div className="cinematic-map-canvas relative h-full min-h-[200px] overflow-hidden rounded-xl border border-white/10 sm:min-h-[260px]">
            <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
              <defs>
                <pattern id="topo" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path
                    d="M0 24 Q12 12 24 24 T48 24"
                    fill="none"
                    stroke="rgba(79,140,255,0.25)"
                    strokeWidth="0.75"
                  />
                  <path
                    d="M0 36 Q12 24 24 36 T48 36"
                    fill="none"
                    stroke="rgba(79,140,255,0.15)"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#topo)" />
              <line
                x1="0"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />
              <line
                x1="50%"
                y1="0"
                x2="50%"
                y2="100%"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />
            </svg>

            {DEMO_ISSUES.map((issue) => (
              <span
                key={issue.id}
                className="cinematic-marker absolute"
                style={{ left: `${issue.mapX}%`, top: `${issue.mapY}%` }}
                title={`${issue.category} — ${issue.status}`}
              >
                <span
                  className="cinematic-marker-dot"
                  style={{ backgroundColor: issue.markerColor }}
                />
                <span
                  className="cinematic-marker-ring"
                  style={{ borderColor: issue.markerColor }}
                />
              </span>
            ))}

            <div className="absolute bottom-3 left-3 rounded-lg border border-white/10 bg-[#0B1728]/80 px-2.5 py-1.5 backdrop-blur-sm">
              <p className="text-[10px] font-medium text-white/70">Operational area</p>
              <p className="text-[10px] text-white/45">{DEMO_ISSUES.length} active markers</p>
            </div>
          </div>
        </div>

        {/* Queue panel */}
        <div className="p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold text-white/90">Recent reports</p>
            <span className="rounded-md border border-white/10 px-2 py-0.5 text-[10px] text-white/50">
              SLA view
            </span>
          </div>
          <ul className="space-y-2.5">
            {featured.map((issue) => (
              <li
                key={issue.id}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="flex gap-3">
                  <EvidencePlaceholder label={issue.title} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <p className="truncate text-xs font-medium text-white/90">{issue.title}</p>
                      <StatusBadge status={issue.status} className="shrink-0 scale-90" />
                    </div>
                    <p className="mt-1 flex items-center gap-1 truncate text-[10px] text-white/45">
                      <FiMapPin className="shrink-0" aria-hidden />
                      {issue.location}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-white/45">
                      <span
                        className={cn(
                          "font-medium",
                          issue.priority === "High" && "text-amber-400/90",
                          issue.priority === "Medium" && "text-white/55",
                          issue.priority === "Low" && "text-white/40",
                        )}
                      >
                        {issue.priority} priority
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <FiClock className="h-3 w-3" aria-hidden />
                        {issue.sla}
                      </span>
                      {issue.assignee && (
                        <span className="inline-flex items-center gap-1">
                          <FiUser className="h-3 w-3" aria-hidden />
                          {issue.assignee}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
