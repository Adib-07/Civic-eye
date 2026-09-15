import { Link } from "@tanstack/react-router";
import { FiArrowRight, FiSearch, FiShield, FiCheckCircle, FiClock } from "react-icons/fi";
import { cn } from "@/lib/utils";

const statCards = [
  { label: "Open Issues", value: "24", color: "text-blue-400", icon: FiClock },
  { label: "SLA On Track", value: "89%", color: "text-emerald-400", icon: FiCheckCircle },
  { label: "Overdue", value: "4", color: "text-amber-400", icon: FiShield },
  { label: "Resolved", value: "31", color: "text-slate-200", icon: FiCheckCircle },
] as const;

const issues = [
  {
    id: "CE-1042",
    title: "HVAC Unit 3 — Filter replacement overdue",
    status: "Open",
    sla: "3h 12m",
    badge: "badge-primary",
  },
  {
    id: "CE-1038",
    title: "Loading Dock B — Exterior light outage",
    status: "In Progress",
    sla: "Overdue",
    badge: "badge-warning",
  },
  {
    id: "CE-1035",
    title: "Parking L2 — Water leak near Bay 14",
    status: "In Review",
    sla: "1d 4h",
    badge: "badge-primary",
  },
  {
    id: "CE-1031",
    title: "Main Lobby — Card reader malfunction",
    status: "Resolved",
    sla: "Done",
    badge: "badge-success",
  },
] as const;

export function LandingHero() {
  return (
    <section className="relative overflow-hidden cinematic-hero">
      {/* Background with campus imagery */}
      <div className="absolute inset-0">
        <img
          src="/assets/university-1600.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="hero-image-overlay" aria-hidden />
      </div>
      <div className="cinematic-hero-bg" aria-hidden />
      <div className="cinematic-hero-grid" aria-hidden />
      <div className="cinematic-hero-glow" aria-hidden />

      <div className="container relative z-10 pt-24 pb-28 lg:pt-32 lg:pb-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-14 lg:gap-20">
          {/* ─── Left: Copy ─── */}
          <div className="text-center lg:text-left animate-slide-up">
            <span className="cinematic-eyebrow inline-flex items-center gap-2.5">
              <span className="inline-block h-2 w-2 rounded-full bg-hero-accent animate-pulse" />
              ISSUE OPERATIONS PLATFORM
            </span>

            <h1 className="mt-7 font-display font-extrabold text-[2.75rem] sm:text-[3.25rem] lg:text-[4rem] leading-[1.02] tracking-[-0.03em] text-white">
              Turn Every Operational Issue Into a{" "}
              <span className="text-hero-accent">Verified Resolution.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base sm:text-lg lg:text-xl text-slate-300/90 mx-auto lg:mx-0 leading-relaxed">
              CivicEye helps organizations receive, assign, track, resolve and verify operational
              issues across their physical sites — with full accountability.
            </p>

            <div className="mt-11 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link to="/book-demo" className="btn-cinematic-primary">
                Book a Demo
                <FiArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/how-it-works" className="btn-cinematic-secondary">
                See How It Works
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-400/70">
              <span className="flex items-center gap-2">
                <FiShield className="h-4 w-4 text-emerald-400" />
                SOC 2 Compliant
              </span>
              <span className="flex items-center gap-2">
                <FiCheckCircle className="h-4 w-4 text-emerald-400" />
                99.9% Uptime SLA
              </span>
              <span className="flex items-center gap-2">
                <FiClock className="h-4 w-4 text-emerald-400" />
                30-min Setup
              </span>
            </div>
          </div>

          {/* ─── Right: Product visual (live issues workspace) ─── */}
          <div className="cinematic-product-shell animate-slide-up stagger-2">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.03] px-5 py-4">
              <span className="h-3 w-3 rounded-full bg-red-400/70" />
              <span className="h-3 w-3 rounded-full bg-amber-400/70" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
              <span className="ml-4 text-xs font-medium text-slate-400/80">
                CivicEye Operations
              </span>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.015] px-5 py-3">
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-[12px] text-slate-500">
                <FiSearch className="h-4 w-4" />
                <span>Search issues, locations, assignees…</span>
              </div>
              <span className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[11px] text-slate-400">
                All Issues
              </span>
              <span className="rounded-lg border border-hero-accent/30 bg-hero-accent/10 px-3 py-2 text-[11px] font-semibold text-hero-accent">
                Assign
              </span>
            </div>

            <div className="p-5 sm:p-6">
              {/* Stat strip */}
              <div className="grid grid-cols-4 gap-3">
                {statCards.map((card) => (
                  <div
                    key={card.label}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-4"
                  >
                    <div className="flex items-center gap-2">
                      <card.icon className="h-4 w-4" style={{ color: card.color }} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        {card.label}
                      </p>
                    </div>
                    <p className={cn("mt-2.5 text-2xl font-extrabold", card.color)}>{card.value}</p>
                  </div>
                ))}
              </div>

              {/* Live issues table */}
              <div className="mt-6 overflow-x-auto rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
                  <span className="text-sm font-bold text-slate-100">Live Issues</span>
                  <span className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                  </span>
                </div>

                <div className="border-b border-white/[0.06] px-5 py-3">
                  <div className="grid grid-cols-[4.5rem_1fr_auto_auto] items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-slate-500">
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
                      className="grid grid-cols-[4.5rem_1fr_auto_auto] items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors"
                    >
                      <span className="font-mono text-[12px] text-slate-400">{issue.id}</span>
                      <span className="truncate text-sm text-slate-100/90">{issue.title}</span>
                      <span className={cn("shrink-0", issue.badge)}>{issue.status}</span>
                      <span className="shrink-0 text-right text-[12px] text-slate-400">
                        {issue.sla}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-slate-500/60">
                <span className="flex items-center gap-1.5">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                  Scroll for more
                </span>
              </div>

              {/* Status bar */}
              <div className="mt-4 flex items-center justify-between text-[12px] text-slate-500">
                <span>Showing 4 of 24 open issues</span>
                <span>Updated just now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-18 animate-slide-up stagger-3">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 text-sm text-slate-400/60">
            <div className="flex items-center gap-2.5">
              <FiCheckCircle className="h-4 w-4 text-emerald-400" />
              <span>Data isolated by organization</span>
            </div>
            <div className="flex items-center gap-2.5">
              <FiCheckCircle className="h-4 w-4 text-emerald-400" />
              <span>Role-based access control</span>
            </div>
            <div className="flex items-center gap-2.5">
              <FiCheckCircle className="h-4 w-4 text-emerald-400" />
              <span>Full audit trail</span>
            </div>
            <div className="flex items-center gap-2.5">
              <FiCheckCircle className="h-4 w-4 text-emerald-400" />
              <span>Evidence-based verification</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
