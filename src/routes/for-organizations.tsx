import { createFileRoute, Link } from "@tanstack/react-router";
import { FiArrowRight, FiCheckCircle, FiClock, FiMapPin, FiSearch, FiShield } from "react-icons/fi";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";

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

function HeroDashboardMock() {
  return (
    <div className="cinematic-product-shell mt-12 mx-auto max-w-3xl text-left">
      <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.03] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <span className="ml-3 text-xs font-medium text-slate-400/80">CivicEye Operations</span>
      </div>

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
        <div className="grid grid-cols-4 gap-2">
          {heroStats.map((card) => (
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
            {heroIssues.map((issue) => (
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
  );
}

export const Route = createFileRoute("/for-organizations")({
  head: () => ({
    meta: [
      { title: "CivicEye for Organizations — Civic Operations Platform" },
      {
        name: "description",
        content:
          "CivicEye helps RWAs, universities, townships, campuses, and facility managers report, assign, track, and verify local issues from one platform.",
      },
    ],
  }),
  component: ForOrganizationsPage,
});

const TARGET_ORGS = [
  {
    title: "Residential Communities & RWAs",
    desc: "Empower residents with a 30-second issue reporting link. Track pothole repairs, waste collection, and lighting outages with full accountability.",
    image: "/assets/residential-1600.jpg",
    featured: true,
  },
  {
    title: "Universities & Campuses",
    desc: "Streamline campus maintenance across academic blocks, hostels, and sports facilities with automated staff routing and SLA visibility.",
    image: "/assets/university-campus-india.svg",
    featured: false,
  },
  {
    title: "Corporate & Tech Campuses",
    desc: "Keep multi-building office parks operational. Assign facility tickets instantly and verify completion with mandatory photo evidence.",
    image: "/assets/corporate-1600.jpg",
    featured: false,
  },
  {
    title: "Integrated Townships & Estates",
    desc: "Centralize infrastructure maintenance across large residential townships. Monitor problem hotspots on interactive maps.",
    image: "/assets/township-1600.jpg",
    featured: false,
  },
  {
    title: "Facility Management Companies",
    desc: "Manage client SLA commitments, track vendor resolution times, and maintain a tamper-proof digital audit history of all repairs.",
    image: "/assets/facility-1600.jpg",
    featured: false,
  },
];

const WORKFLOW_STAGES = [
  { step: "01", title: "Report", text: "Capture the issue with photo and location." },
  { step: "02", title: "Assign", text: "Route responsibility to the appropriate team." },
  { step: "03", title: "Track", text: "Monitor progress and SLA timelines." },
  { step: "04", title: "Resolve", text: "Require evidence and work notes." },
  {
    step: "05",
    title: "Verify",
    text: "Let the reporter confirm whether the issue was actually resolved.",
  },
];

export function ForOrganizationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="cinematic" />

      <main className="relative">
        {/* Hero Section */}
        <section className="cinematic-hero relative overflow-hidden py-16 lg:py-24">
          <div className="cinematic-hero-bg" aria-hidden />
          <div className="page-container relative z-10 text-center">
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl max-w-4xl mx-auto">
              Operational issues,{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-200 to-sky-300 bg-clip-text text-transparent">
                from report to verified resolution.
              </span>
            </h1>
            <p className="mt-6 text-slate-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Give organizations and communities one accountable workflow to report issues,
              assign responsibility, track progress, and verify completed work.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/book-demo"
                className="cinematic-btn-primary group shadow-lg shadow-blue-900/30"
              >
                <span>Book a Demo</span>
                <FiArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/pricing" className="cinematic-btn-secondary">
                View Pricing
              </Link>
            </div>

            <HeroDashboardMock />
          </div>
        </section>

        {/* Problem Statement */}
        <section id="solutions" className="py-16 bg-background">
          <div className="page-container">
            <div className="text-center max-w-2xl mx-auto">
              <p className="section-label">The Problem</p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl text-foreground">
                Most civic operations still run on WhatsApp and spreadsheets
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                Complaints get lost in email threads. There is no SLA tracking. Nobody knows who is
                responsible. Issues get marked "done" without verification. There is no audit trail.
              </p>
            </div>
          </div>
        </section>

        {/* Who CivicEye is For */}
        <section className="py-16 bg-secondary/30 border-y border-border">
          <div className="page-container">
            <div className="text-center max-w-2xl mx-auto">
              <p className="section-label">Solutions</p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl text-foreground">
                Built for teams responsible for real-world spaces
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-6">
              {TARGET_ORGS.map((org) => (
                <article
                  key={org.title}
                  className={cn(
                    "solution-card group flex flex-col overflow-hidden",
                    org.featured ? "lg:col-span-6" : "lg:col-span-3",
                  )}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={org.image}
                      alt={org.title}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent"
                      aria-hidden
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                      {org.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{org.desc}</p>
                    <Link
                      to="/book-demo"
                      className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                    >
                      Explore solution
                      <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5-Stage Organizational Workflow */}
        <section id="workflow" className="py-16 bg-background">
          <div className="page-container">
            <div className="text-center max-w-2xl mx-auto">
              <p className="section-label">How It Works</p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl text-foreground">
                The CivicEye operational workflow
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                End-to-end operational clarity from the second a problem is spotted until reporter
                verification.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {WORKFLOW_STAGES.map((s) => (
                <div key={s.step} className="landing-workflow-card">
                  <span className="text-xs font-mono font-bold text-primary">{s.step}</span>
                  <h3 className="mt-2 text-base font-bold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Evidence & Accountability */}
        <section className="py-16 bg-secondary/30 border-y border-border">
          <div className="page-container space-y-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="section-label">Evidence &amp; Accountability</p>
                <h3 className="mt-2 text-2xl font-bold sm:text-3xl text-foreground">
                  No ticket is closed without verified evidence
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Field staff cannot mark an issue resolved without attaching photo evidence.
                  Reporters verify the work on-site, ensuring true operational accountability.
                </p>
              </div>
              <div className="surface-panel p-6 space-y-3">
                <div className="flex items-center gap-3 text-sm font-semibold">
                  <FiCheckCircle className="text-emerald-500 h-5 w-5" /> Mandatory after-fix photo
                  upload
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold">
                  <FiCheckCircle className="text-emerald-500 h-5 w-5" /> Reporter confirm / reopen
                  flow
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold">
                  <FiCheckCircle className="text-emerald-500 h-5 w-5" /> Complete audit trail
                  history
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold">
                  <FiCheckCircle className="text-emerald-500 h-5 w-5" /> SLA timers and breach
                  alerts
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security & Data Isolation */}
        <section className="py-16 bg-background">
          <div className="page-container">
            <div className="text-center max-w-2xl mx-auto">
              <p className="section-label">Security</p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl text-foreground">
                Organization-isolated by design
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                Each organization's data, staff, and files are isolated at the database level.
                Role-based access ensures staff only see what they are authorized to manage.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: FiShield,
                  title: "Row Level Security",
                  text: "Database-enforced data isolation between organizations.",
                },
                {
                  icon: FiClock,
                  title: "Role-Based Access",
                  text: "Staff members, admins, and reporters have distinct capabilities.",
                },
                {
                  icon: FiMapPin,
                  title: "Location-Aware",
                  text: "Geo-tagged reports with interactive map visualization.",
                },
              ].map((item) => (
                <article key={item.title} className="landing-feature-card p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-primary">
                    <item.icon className="h-4 w-4" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 bg-slate-950 text-white border-t border-white/10 text-center">
          <div className="page-container max-w-3xl">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to pilot CivicEye in your organization?
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base">
              Set up your organization workspace in minutes. Request a walkthrough with our product
              team.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/book-demo" className="cinematic-btn-primary">
                Book a Demo <FiArrowRight />
              </Link>
              <Link to="/pricing" className="cinematic-btn-secondary">
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
