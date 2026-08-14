import { Link } from "@tanstack/react-router";
import { FiEye, FiGrid, FiList, FiMap, FiMapPin, FiPlusCircle, FiSearch } from "react-icons/fi";

import { StatusBadge } from "@/components/StatusBadge";
import type { Status } from "@/lib/types";

/** Static UI mock of the CivicEye app — illustrative layout only, not live data. */
const MOCK_ISSUES: {
  title: string;
  category: string;
  location: string;
  status: Status;
  ref: string;
}[] = [
  {
    title: "Pothole on service road",
    category: "Pothole",
    location: "Block A entrance",
    status: "Pending",
    ref: "A4F2B891",
  },
  {
    title: "Streetlight not working",
    category: "Broken Street Light",
    location: "North perimeter",
    status: "In Progress",
    ref: "C91D004A",
  },
  {
    title: "Water leak at valve",
    category: "Water Leakage",
    location: "Pump room",
    status: "Resolved",
    ref: "E22B7710",
  },
];

export function ProductShowcase({ compact = false }: { compact?: boolean }) {
  return (
    <div className="surface-panel overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border bg-secondary/80 px-3 py-2">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-primary text-primary-foreground">
          <FiEye className="h-3.5 w-3.5" aria-hidden />
        </span>
        <span className="text-xs font-semibold">CivicEye</span>
        <span className="ml-auto text-[10px] font-medium text-muted-foreground">Operations</span>
      </div>

      <div className={compact ? "grid" : "grid lg:grid-cols-[140px_1fr]"}>
        {!compact && (
          <aside className="hidden border-r border-border bg-background p-2 lg:block">
            <p className="px-2 py-1 section-label">Operations</p>
            {[
              { icon: FiGrid, label: "Overview", active: false },
              { icon: FiList, label: "All reports", active: true },
              { icon: FiMap, label: "Map", active: false },
            ].map(({ icon: Icon, label, active }) => (
              <div
                key={label}
                className={`mb-0.5 flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] font-medium ${
                  active ? "bg-secondary text-foreground" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {label}
              </div>
            ))}
            <p className="mt-3 px-2 py-1 section-label">Public</p>
            <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] font-medium text-muted-foreground">
              <FiPlusCircle className="h-3.5 w-3.5" aria-hidden />
              Report issue
            </div>
          </aside>
        )}

        <div className="min-w-0 p-3 sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold">All reports</p>
              <p className="text-[11px] text-muted-foreground">Issue intake & resolution queue</p>
            </div>
            <Link
              to="/report"
              className="btn-primary hidden px-2.5 py-1 text-[11px] sm:inline-flex"
            >
              New report
            </Link>
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-md border border-border bg-background px-2.5">
            <FiSearch className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
            <span className="py-2 text-[11px] text-muted-foreground">Search issues…</span>
          </div>

          <div className="mt-3 overflow-hidden rounded-md border border-border">
            <div className="hidden grid-cols-[1fr_88px_72px] gap-2 border-b border-border bg-secondary/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:grid">
              <span>Issue</span>
              <span>Status</span>
              <span>Ref</span>
            </div>
            <ul>
              {MOCK_ISSUES.map((issue) => (
                <li
                  key={issue.ref}
                  className="grid gap-2 border-b border-border px-3 py-2.5 last:border-b-0 sm:grid-cols-[1fr_88px_72px] sm:items-center"
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium">{issue.title}</p>
                    <p className="mt-0.5 flex items-center gap-1 truncate text-[10px] text-muted-foreground">
                      <FiMapPin className="shrink-0" aria-hidden />
                      {issue.category} · {issue.location}
                    </p>
                  </div>
                  <StatusBadge status={issue.status} className="w-fit" />
                  <span className="font-mono text-[10px] text-muted-foreground">
                    #{issue.ref.slice(0, 6)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-3 text-[10px] text-muted-foreground">
            Illustrative interface preview — sign in to view your organization&apos;s live data.
          </p>
        </div>
      </div>
    </div>
  );
}
