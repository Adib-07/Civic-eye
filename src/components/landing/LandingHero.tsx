import { Link } from "@tanstack/react-router";
import { FiArrowRight } from "react-icons/fi";
import { cn } from "@/lib/utils";

const statCards = [
  { label: "Open Issues", value: "24", color: "text-blue-400" },
  { label: "SLA On Track", value: "89%", color: "text-emerald-400" },
  { label: "Overdue", value: "4", color: "text-amber-400" },
  { label: "Resolved", value: "31", color: "text-slate-200" },
];

const issues = [
  { id: "CE-1042", title: "HVAC Unit 3 — Filter replacement overdue", status: "Open", badge: "bg-blue-500/15 text-blue-400 border-blue-500/20" },
  { id: "CE-1038", title: "Loading Dock B — Exterior light outage", status: "In Progress", badge: "bg-amber-500/15 text-amber-400 border-amber-500/20" },
  { id: "CE-1035", title: "Parking Structure L2 — Water leak near Bay 14", status: "In Review", badge: "bg-indigo-500/15 text-indigo-400 border-indigo-500/20" },
  { id: "CE-1031", title: "Main Lobby — Access card reader malfunction", status: "Resolved", badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" },
];

export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-[#07111f] pt-12 pb-20 lg:pt-20 lg:pb-28">
      <div className="cinematic-hero-bg" aria-hidden />
      <div className="cinematic-hero-grid" aria-hidden />

      <div className="page-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
          {/* ─── Left: Copy ─── */}
          <div className="text-center lg:text-left">
            <span className="cinematic-eyebrow inline-flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400" />
              ISSUE OPERATIONS PLATFORM
            </span>

            <h1 className="mt-5 font-display font-bold text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.08] tracking-tight text-white">
              Turn Every Operational Issue Into a{" "}
              <span className="text-blue-400">Verified Resolution.</span>
            </h1>

            <p className="mt-5 max-w-lg text-base lg:text-lg text-slate-300/80 mx-auto lg:mx-0">
              CivicEye helps organizations receive, assign, track, resolve and verify operational
              issues across their physical sites.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <Link to="/book-demo" className={cn("cinematic-btn-primary", "px-6 py-3 text-[15px]")}>
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

          {/* ─── Right: Product visual ─── */}
          <div className="cinematic-product-shell">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.03] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-3 text-xs font-medium text-slate-400/80">CivicEye Operations</span>
            </div>

            <div className="p-5">
              {/* Stat cards */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {statCards.map((card) => (
                  <div
                    key={card.label}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-3"
                  >
                    <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                      {card.label}
                    </p>
                    <p className={cn("mt-1 text-xl font-bold", card.color)}>
                      {card.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Issue list */}
              <div className="mt-4 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
                  <span className="text-xs font-semibold text-slate-300">Recent Issues</span>
                  <span className="text-[10px] text-slate-500">Last 7 days</span>
                </div>
                <div className="divide-y divide-white/[0.05]">
                  {issues.map((issue) => (
                    <div
                      key={issue.id}
                      className="flex items-center gap-3 px-4 py-2.5"
                    >
                      <span className="shrink-0 text-[11px] font-mono text-slate-500">
                        {issue.id}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[13px] text-slate-300/90">
                        {issue.title}
                      </span>
                      <span
                        className={cn(
                          "shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold",
                          issue.badge,
                        )}
                      >
                        {issue.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
