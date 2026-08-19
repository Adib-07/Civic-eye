import { Link } from "@tanstack/react-router";
import { FiArrowRight, FiMapPin } from "react-icons/fi";

import { DEMO_ISSUES } from "@/components/landing/landing-data";
import { StatusBadge } from "@/components/StatusBadge";

export function MapPreviewSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="page-container">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="section-label">Geographic intelligence</p>
            <h2 className="mt-2 section-title text-2xl sm:text-3xl">
              Every issue on the map. Every crew knows where to go.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              CivicEye plots geo-tagged reports on an interactive map with filters by category and
              status. Select an issue to view evidence, assignment, and SLA details — powered by
              your organization&apos;s live data.
            </p>
            <Link to="/map" className="btn-primary mt-6 inline-flex px-4 py-2.5 text-sm">
              Open live map <FiArrowRight aria-hidden />
            </Link>
          </div>

          <div className="surface-panel overflow-hidden">
            <div className="relative min-h-[280px] bg-[#0B1728] p-4">
              <div className="cinematic-map-canvas relative h-full min-h-[240px] overflow-hidden rounded-xl border border-white/10">
                {DEMO_ISSUES.map((issue) => (
                  <span
                    key={issue.id}
                    className="cinematic-marker absolute"
                    style={{ left: `${issue.mapX}%`, top: `${issue.mapY}%` }}
                  >
                    <span
                      className="cinematic-marker-dot"
                      style={{ backgroundColor: issue.markerColor }}
                    />
                  </span>
                ))}
              </div>
            </div>
            <ul className="divide-y divide-border">
              {DEMO_ISSUES.slice(0, 3).map((issue) => (
                <li key={issue.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{issue.category}</p>
                    <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted-foreground">
                      <FiMapPin className="shrink-0" aria-hidden />
                      {issue.location}
                    </p>
                  </div>
                  <StatusBadge status={issue.status} />
                </li>
              ))}
            </ul>
            <p className="border-t border-border px-4 py-2 text-[10px] text-muted-foreground">
              Illustrative markers — connect Supabase to see your organization&apos;s issues.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
