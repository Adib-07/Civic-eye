import { Link } from "@tanstack/react-router";
import { FiArrowRight, FiSearch } from "react-icons/fi";
import { cn } from "@/lib/utils";

const statCards = [
  { label: "Open", value: "24", color: "text-blue-400" },
  { label: "On Track", value: "89%", color: "text-emerald-400" },
  { label: "Overdue", value: "4", color: "text-amber-400" },
  { label: "Resolved", value: "31", color: "text-slate-200" },
];

const issues = [
  {
    id: "CE-1042",
    title: "HVAC Unit 3 — Filter replacement overdue",
    status: "Open",
    sla: "3h 12m",
    badge: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  },
  {
    id: "CE-1038",
    title: "Loading Dock B — Exterior light outage",
    status: "In Progress",
    sla: "Overdue",
    badge: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  },
  {
    id: "CE-1035",
    title: "Parking L2 — Water leak near Bay 14",
    status: "In Review",
    sla: "1d 4h",
    badge: "bg-indigo-500/15 text-indigo-400 border-indigo-500/20",
  },
  {
    id: "CE-1031",
    title: "Main Lobby — Card reader malfunction",
    status: "Resolved",
    sla: "Done",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  },
];

export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--hero-bg)] pt-14 pb-20 lg:pt-24 lg:pb-28">
      <div className="cinematic-hero-bg" aria-hidden />
      <div className="cinematic-hero-grid" aria-hidden />

      <div className="page-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">
          {/* ─── Left: Copy ─── */}
          <div className="text-center lg:text-left">
            <span className="cinematic-eyebrow inline-flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-hero-accent" />
              ISSUE OPERATIONS PLATFORM
            </span>

            <h1 className="mt-4 font-display font-bold text-[2.75rem] sm:text-5xl lg:text-[3.75rem] leading-[1.05] tracking-tight text-white">
              Turn Every Operational Issue Into a{" "}
              <span className="text-hero-accent">Verified Resolution.</span>
            </h1>

            <p className="mt-4 max-w-xl text-[15px] sm:text-base lg:text-[17px] text-slate-400/80 mx-auto lg:mx-0">
              CivicEye helps organizations receive, assign, track, resolve and verify operational
              issues across their physical sites.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <Link
                to="/book-demo"
                className={cn("cinematic-btn-primary", "px-6 py-3 text-[15px]")}
              >
                Book a Demo
                <FiArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/for-organizations" className="cinematic-btn-secondary">
                See How It Works
              </Link>
            </div>

            <p className="mt-6 text-xs text-slate-400/70">
              Built for facilities, campuses and operations teams.
            </p>
          </div>

          {/* ─── Right: Product visual (live issues workspace) ─── */}
          <div className="cinematic-product-shell">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.03] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-3 text-xs font-medium text-slate-400/80">
                CivicEye Operations
              </span>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.015] px-4 py-2.5">
              <div className="flex flex-1 items-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-[11px] text-slate-500">
                <FiSearch className="h-3.5 w-3.5" />
                <span>Search issues…</span>
              </div>
              <span className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-[10px] text-slate-400">
                All
              </span>
              <span className="rounded-md border border-hero-accent/30 bg-hero-accent/10 px-2 py-1 text-[10px] font-medium text-hero-accent">
                Assign
              </span>
            </div>

            <div className="p-4 sm:p-5">
              {/* Stat strip */}
              <div className="grid grid-cols-4 gap-2">
                {statCards.map((card) => (
                  <div
                    key={card.label}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2.5"
                  >
                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                      {card.label}
                    </p>
                    <p className={cn("mt-1 text-lg font-bold", card.color)}>{card.value}</p>
                  </div>
                ))}
              </div>

              {/* Live issues table */}
              <div className="mt-4 overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
                  <span className="text-xs font-semibold text-slate-200">Live Issues</span>
                  <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                  </span>
                </div>

                <div className="border-b border-white/[0.06] px-4 py-2">
                  <div className="grid grid-cols-[4.25rem_1fr_auto_auto] items-center gap-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    <span>ID</span>
                    <span>Issue</span>
                    <span>Status</span>
                    <span className="text-right">SLA</span>
                  </div>
                </div>

                <div className="divide-y divide-white/[0.04]">
                  {issues.map((issue) => (
                    <div
                      key={issue.id}
                      className="grid grid-cols-[4.25rem_1fr_auto_auto] items-center gap-3 px-4 py-2.5"
                    >
                      <span className="font-mono text-[11px] text-slate-500">{issue.id}</span>
                      <span className="truncate text-[13px] text-slate-200/90">{issue.title}</span>
                      <span
                        className={cn(
                          "shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold",
                          issue.badge,
                        )}
                      >
                        {issue.status}
                      </span>
                      <span className="shrink-0 text-right text-[11px] text-slate-400">
                        {issue.sla}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status bar (replaces self-referential caption) */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                <span>Showing 4 of 24 open issues</span>
                <span>Updated just now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
