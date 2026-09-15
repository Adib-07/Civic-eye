import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiSearch,
  FiShield,
  FiAlertTriangle,
  FiUserCheck,
  FiActivity,
  FiBarChart2,
  FiImage,
  FiClipboard,
  FiCheck,
  FiZap,
  FiTarget,
} from "react-icons/fi";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function RevealBlock({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const heroStats = [
  { label: "Open", value: "24", color: "text-blue-400" },
  { label: "On Track", value: "89%", color: "text-emerald-400" },
  { label: "Overdue", value: "4", color: "text-amber-400" },
  { label: "Resolved", value: "31", color: "text-slate-200" },
];

const heroIssues = [
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

const PRODUCT_FEATURES = [
  {
    icon: FiAlertTriangle,
    title: "Issue Intake",
    description:
      "Anyone in your organization can report an issue in 30 seconds — with a photo, location, and description. No app install required.",
    color: "blue",
  },
  {
    icon: FiUserCheck,
    title: "Smart Assignment",
    description:
      "Route issues to the right team member automatically. Assign by department, location, or issue type with one click.",
    color: "indigo",
  },
  {
    icon: FiActivity,
    title: "Live Tracking",
    description:
      "Every issue has a real-time status. Open, assigned, in-progress, under review — your team always knows what's happening.",
    color: "violet",
  },
  {
    icon: FiClock,
    title: "SLA Monitoring",
    description:
      "Set response and resolution time targets for every issue type. Get automatic alerts before SLAs breach.",
    color: "amber",
  },
  {
    icon: FiImage,
    title: "Evidence Verification",
    description:
      "Staff must attach photo evidence before marking issues resolved. Reporters verify the fix on-site.",
    color: "emerald",
  },
  {
    icon: FiBarChart2,
    title: "Analytics & Reporting",
    description:
      "Dashboards showing resolution rates, SLA compliance, team performance, and issue trends across your organization.",
    color: "sky",
  },
];

const COLOR_MAP: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  violet: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  sky: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
};

const LIFECYCLE_STEPS = [
  {
    step: "01",
    title: "Report",
    text: "Capture the issue with photo, location, and description in 30 seconds.",
    icon: FiAlertTriangle,
  },
  {
    step: "02",
    title: "Verify",
    text: "Operations team validates the report and confirms issue priority.",
    icon: FiCheckCircle,
  },
  {
    step: "03",
    title: "Assign",
    text: "Route responsibility to the appropriate staff member or team.",
    icon: FiUserCheck,
  },
  {
    step: "04",
    title: "Track",
    text: "Monitor progress with real-time status and SLA countdown timers.",
    icon: FiActivity,
  },
  {
    step: "05",
    title: "Resolve",
    text: "Staff attaches evidence and completes the resolution workflow.",
    icon: FiClipboard,
  },
  {
    step: "06",
    title: "Verify",
    text: "Reporter confirms the fix was actually completed on-site.",
    icon: FiCheck,
  },
];

export const Route = createFileRoute("/for-organizations")({
  head: () => ({
    meta: [
      { title: "Product — CivicEye Issue Operations Platform" },
      {
        name: "description",
        content:
          "CivicEye helps organizations receive, assign, track, resolve and verify operational issues with SLA visibility and evidence-backed workflows.",
      },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ─── Hero ─── */}
      <section className="page-hero">
        <div className="page-hero-grid" aria-hidden />
        <div className="relative z-10 container pt-24 pb-20 lg:pt-32 lg:pb-28">
          <div className="max-w-3xl mx-auto text-center">
            <RevealBlock>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-hero-accent">
                <span className="h-2 w-2 rounded-full bg-hero-accent animate-pulse" />
                Product Overview
              </span>
            </RevealBlock>

            <RevealBlock delay={100}>
              <h1 className="mt-7 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.05]">
                One platform to manage{" "}
                <span className="text-hero-accent">every operational issue</span>
              </h1>
            </RevealBlock>

            <RevealBlock delay={200}>
              <p className="mt-6 text-lg text-slate-300/90 max-w-2xl mx-auto leading-relaxed">
                From the moment an issue is reported to the final verified resolution — CivicEye
                gives your organization complete operational accountability.
              </p>
            </RevealBlock>

            <RevealBlock delay={300}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link to="/book-demo" className="btn-cinematic-primary">
                  Book a Demo
                  <FiArrowRight className="h-5 w-5" />
                </Link>
                <Link to="/pricing" className="btn-cinematic-secondary">
                  View Pricing
                </Link>
              </div>
            </RevealBlock>
          </div>

          {/* Dashboard Mock */}
          <RevealBlock delay={400}>
            <div className="cinematic-product-shell mt-14 mx-auto max-w-4xl">
              <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.03] px-5 py-3.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-3 text-xs font-medium text-slate-400/80">
                  CivicEye Operations Dashboard
                </span>
              </div>

              <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.015] px-5 py-2.5">
                <div className="flex flex-1 items-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] text-slate-500">
                  <FiSearch className="h-3.5 w-3.5" />
                  <span>Search issues, locations, assignees…</span>
                </div>
                <span className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10px] text-slate-400">
                  All Issues
                </span>
                <span className="rounded-md border border-hero-accent/30 bg-hero-accent/10 px-2.5 py-1 text-[10px] font-medium text-hero-accent">
                  Assign
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <div className="grid grid-cols-4 gap-2.5">
                  {heroStats.map((card) => (
                    <div
                      key={card.label}
                      className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-3"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        {card.label}
                      </p>
                      <p className={cn("mt-1.5 text-xl font-bold", card.color)}>{card.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02]">
                  <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
                    <span className="text-xs font-bold text-slate-200">Live Issues</span>
                    <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live
                    </span>
                  </div>

                  <div className="border-b border-white/[0.06] px-4 py-2">
                    <div className="grid grid-cols-[4.25rem_1fr_auto_auto] items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      <span>ID</span>
                      <span>Issue</span>
                      <span>Status</span>
                      <span className="text-right">SLA</span>
                    </div>
                  </div>

                  <div className="divide-y divide-white/[0.04]">
                    {heroIssues.map((issue) => (
                      <div
                        key={issue.id}
                        className="grid grid-cols-[4.25rem_1fr_auto_auto] items-center gap-3 px-4 py-2.5"
                      >
                        <span className="font-mono text-[11px] text-slate-500">{issue.id}</span>
                        <span className="truncate text-[13px] text-slate-200/90">
                          {issue.title}
                        </span>
                        <span
                          className={cn(
                            "shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold",
                            issue.badge,
                          )}
                        >
                          {issue.status}
                        </span>
                        <span
                          className={cn(
                            "shrink-0 text-right text-[11px]",
                            issue.sla === "Overdue" ? "text-amber-400" : "text-slate-400",
                          )}
                        >
                          {issue.sla}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Showing 4 of 24 open issues</span>
                  <span>Updated just now</span>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ─── What CivicEye Does ─── */}
      <section className="inner-section bg-background">
        <div className="container">
          <RevealBlock>
            <div className="text-center max-w-2xl mx-auto">
              <p className="caption">Core Capabilities</p>
              <h2 className="mt-4 headline-2">Every stage of the issue lifecycle, managed</h2>
              <p className="mt-5 body-lg text-muted-foreground max-w-xl mx-auto">
                CivicEye handles the complete operational workflow — from the moment someone spots a
                problem to the verified fix.
              </p>
            </div>
          </RevealBlock>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <RevealBlock key={feature.title} delay={i * 80}>
                  <div className="feature-visual-card p-7 h-full">
                    <div
                      className={cn(
                        "inline-grid place-items-center w-12 h-12 rounded-xl border",
                        COLOR_MAP[feature.color],
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="mt-5 headline-4">{feature.title}</h3>
                    <p className="mt-3 body-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </RevealBlock>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Visual Issue Lifecycle ─── */}
      <section className="inner-section bg-secondary/30 border-y border-border">
        <div className="container">
          <RevealBlock>
            <div className="text-center max-w-2xl mx-auto">
              <p className="caption">Issue Lifecycle</p>
              <h2 className="mt-4 headline-2">From report to verified resolution</h2>
              <p className="mt-5 body-lg text-muted-foreground max-w-xl mx-auto">
                Every issue follows a structured, auditable workflow that ensures nothing falls
                through the cracks.
              </p>
            </div>
          </RevealBlock>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LIFECYCLE_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <RevealBlock key={step.step} delay={i * 100}>
                  <div className="relative surface-panel p-7 group">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary font-display font-extrabold text-lg border border-primary/20">
                        {step.step}
                      </span>
                      <div className="flex-1">
                        <h3 className="headline-4">{step.title}</h3>
                      </div>
                      <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="mt-4 body-sm text-muted-foreground leading-relaxed">
                      {step.text}
                    </p>
                    {i < LIFECYCLE_STEPS.length - 1 && (
                      <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-primary/40">
                        <FiArrowRight className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                </RevealBlock>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Product Visual: SLA Tracking ─── */}
      <section className="inner-section bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <RevealBlock>
              <div>
                <p className="caption">SLA Visibility</p>
                <h2 className="mt-4 headline-2">Know exactly which issues are at risk</h2>
                <p className="mt-5 body-lg text-muted-foreground leading-relaxed">
                  Every issue has a visible SLA countdown. Your team sees which issues are on track,
                  approaching deadline, or already overdue — before a single escalation email is
                  sent.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    "Real-time SLA countdown timers on every issue",
                    "Automatic breach alerts before deadlines expire",
                    "Priority-based SLA rules by issue type",
                    "SLA compliance dashboards for leadership",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <FiCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-primary" />
                      <span className="body-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={200}>
              <div className="cinematic-product-shell">
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-sm font-bold text-slate-200">SLA Status Overview</span>
                    <span className="badge-cinematic">Live</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        title: "HVAC Filter Replacement",
                        time: "2h 14m remaining",
                        pct: 72,
                        color: "bg-emerald-400",
                      },
                      {
                        title: "Exterior Light Outage",
                        time: "Overdue by 45m",
                        pct: 100,
                        color: "bg-amber-400",
                      },
                      {
                        title: "Water Leak — Bay 14",
                        time: "1d 2h remaining",
                        pct: 45,
                        color: "bg-blue-400",
                      },
                      {
                        title: "Card Reader Malfunction",
                        time: "Resolved",
                        pct: 100,
                        color: "bg-emerald-400",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] text-slate-200/90 font-medium">
                            {item.title}
                          </span>
                          <span
                            className={cn(
                              "text-[11px] font-semibold",
                              item.time.includes("Overdue")
                                ? "text-amber-400"
                                : item.time === "Resolved"
                                  ? "text-emerald-400"
                                  : "text-slate-400",
                            )}
                          >
                            {item.time}
                          </span>
                        </div>
                        <div className="mt-2.5 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                          <div
                            className={cn("h-full rounded-full", item.color)}
                            style={{ width: `${item.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ─── Product Visual: Assignment ─── */}
      <section className="inner-section bg-secondary/30 border-y border-border">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <RevealBlock delay={100}>
              <div className="cinematic-product-shell order-2 lg:order-1">
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-sm font-bold text-slate-200">Assignment Queue</span>
                    <span className="text-[11px] text-slate-500">3 unassigned</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        id: "CE-1045",
                        title: "Roof leak — Building C, 3rd floor",
                        priority: "High",
                        pColor: "text-red-400 bg-red-500/15 border-red-500/20",
                      },
                      {
                        id: "CE-1044",
                        title: "Broken window — Hostel Block D",
                        priority: "Medium",
                        pColor: "text-amber-400 bg-amber-500/15 border-amber-500/20",
                      },
                      {
                        id: "CE-1043",
                        title: "Parking stripe repainting — Lot B",
                        priority: "Low",
                        pColor: "text-slate-400 bg-slate-500/15 border-slate-500/20",
                      },
                    ].map((item) => (
                      <div
                        key={item.id}
                        className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4 flex items-center justify-between"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] text-slate-500">{item.id}</span>
                            <span
                              className={cn(
                                "rounded-full border px-2 py-0.5 text-[10px] font-semibold",
                                item.pColor,
                              )}
                            >
                              {item.priority}
                            </span>
                          </div>
                          <span className="mt-1 block truncate text-[13px] text-slate-200/90">
                            {item.title}
                          </span>
                        </div>
                        <button className="ml-3 shrink-0 rounded-md border border-hero-accent/30 bg-hero-accent/10 px-3 py-1.5 text-[11px] font-semibold text-hero-accent hover:bg-hero-accent/20 transition-colors">
                          Assign
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>

            <RevealBlock>
              <div className="order-1 lg:order-2">
                <p className="caption">Smart Assignment</p>
                <h2 className="mt-4 headline-2">Route every issue to the right person</h2>
                <p className="mt-5 body-lg text-muted-foreground leading-relaxed">
                  No more guessing who handles what. Assign issues by department, skill, or location
                  — and track who is responsible at every moment.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    "One-click assignment to staff members",
                    "Priority-based routing by issue type",
                    "Department and location-based assignment rules",
                    "Full accountability — every assignment is logged",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <FiCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-primary" />
                      <span className="body-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ─── Product Visual: Evidence & Verification ─── */}
      <section className="inner-section bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <RevealBlock>
              <div>
                <p className="caption">Evidence & Verification</p>
                <h2 className="mt-4 headline-2">No issue is closed without proof</h2>
                <p className="mt-5 body-lg text-muted-foreground leading-relaxed">
                  Staff must upload a photo after completing a fix. The original reporter verifies
                  the resolution on-site. This creates an unbreakable chain of accountability.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    "Mandatory before/after photo evidence",
                    "Reporter verification or reopen flow",
                    "Complete audit trail with timestamps",
                    "Tamper-proof resolution history",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <FiCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-primary" />
                      <span className="body-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={200}>
              <div className="cinematic-product-shell">
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-sm font-bold text-slate-200">Resolution Evidence</span>
                    <FiImage className="h-4 w-4 text-slate-500" />
                  </div>
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-[11px] text-slate-500">CE-1031</span>
                      <span className="rounded-full border border-emerald-500/20 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                        Resolved
                      </span>
                    </div>
                    <p className="text-[13px] text-slate-200/90 mb-4">
                      Main Lobby — Card reader malfunction
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 text-center">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                          Before
                        </div>
                        <div className="mx-auto h-20 rounded bg-white/[0.04] flex items-center justify-center">
                          <FiImage className="h-6 w-6 text-slate-600" />
                        </div>
                      </div>
                      <div className="rounded-md border border-emerald-500/20 bg-emerald-500/5 p-3 text-center">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-2">
                          After
                        </div>
                        <div className="mx-auto h-20 rounded bg-emerald-500/10 flex items-center justify-center">
                          <FiCheckCircle className="h-6 w-6 text-emerald-400" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
                      <FiCheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                      Verified by reporter — 2 hours ago
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ─── Security & Trust ─── */}
      <section className="inner-section bg-secondary/30 border-y border-border">
        <div className="container">
          <RevealBlock>
            <div className="text-center max-w-2xl mx-auto">
              <p className="caption">Enterprise Security</p>
              <h2 className="mt-4 headline-2">Organization-isolated by design</h2>
              <p className="mt-5 body-lg text-muted-foreground max-w-xl mx-auto">
                Your data is isolated at the database level. Role-based access ensures staff only
                see what they are authorized to manage.
              </p>
            </div>
          </RevealBlock>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {[
              {
                icon: FiShield,
                title: "Row Level Security",
                text: "Database-enforced data isolation between organizations.",
              },
              {
                icon: FiClock,
                title: "Role-Based Access",
                text: "Staff, admins, and reporters have distinct capabilities.",
              },
              {
                icon: FiMapPin,
                title: "Location-Aware",
                text: "Geo-tagged reports with interactive map visualization.",
              },
            ].map((item, i) => (
              <RevealBlock key={item.title} delay={i * 100}>
                <article className="feature-visual-card p-6 h-full">
                  <span className="inline-grid place-items-center w-12 h-12 rounded-xl border border-primary/20 bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 headline-4">{item.title}</h3>
                  <p className="mt-2 body-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </article>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="cta-banner py-20 lg:py-24 text-center">
        <div className="container relative z-10 max-w-3xl mx-auto">
          <RevealBlock>
            <h2 className="headline-2 text-white">Ready to see CivicEye in action?</h2>
          </RevealBlock>
          <RevealBlock delay={100}>
            <p className="mt-5 body-lg text-slate-300/80 max-w-xl mx-auto">
              Book a live walkthrough with our team. We will show you how CivicEye works for your
              specific organization.
            </p>
          </RevealBlock>
          <RevealBlock delay={200}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link to="/book-demo" className="btn-cinematic-primary">
                Book a Demo
                <FiArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/pricing" className="btn-cinematic-secondary">
                View Pricing
              </Link>
            </div>
          </RevealBlock>
        </div>
      </section>
    </div>
  );
}
