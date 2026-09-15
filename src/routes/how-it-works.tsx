import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FiArrowRight,
  FiAlertTriangle,
  FiCheckCircle,
  FiUserCheck,
  FiActivity,
  FiClock,
  FiClipboard,
  FiCheck,
  FiImage,
  FiBarChart2,
  FiArrowUpRight,
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

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Issue Reported",
    icon: FiAlertTriangle,
    description:
      "Anyone in the organization reports an issue by taking a photo, adding a description, and confirming the location. Takes 30 seconds — no app install required.",
    details: [
      "Photo capture from any device",
      "Auto-detected GPS location",
      "Optional description and priority",
      "Instant confirmation to reporter",
    ],
    visual: {
      type: "report" as const,
    },
  },
  {
    step: "02",
    title: "Issue Verified",
    icon: FiCheckCircle,
    description:
      "Operations team reviews the incoming report, confirms its validity, and sets the appropriate priority level for response.",
    details: [
      "Quick validation of reported issue",
      "Priority assignment (High / Medium / Low)",
      "Department or team categorization",
      "SLA timer starts on verification",
    ],
    visual: {
      type: "verify" as const,
    },
  },
  {
    step: "03",
    title: "Issue Assigned",
    icon: FiUserCheck,
    description:
      "The verified issue is routed to the right staff member or team. Assignment is based on department, location, skill, or availability.",
    details: [
      "One-click staff assignment",
      "Department-based auto-routing",
      "Priority-weighted distribution",
      "Full assignment audit trail",
    ],
    visual: {
      type: "assign" as const,
    },
  },
  {
    step: "04",
    title: "Team Takes Action",
    icon: FiActivity,
    description:
      "Assigned staff works on the issue. The team sees real-time status updates, can add work notes, and tracks progress toward resolution.",
    details: [
      "Real-time status visibility",
      "Work notes and progress updates",
      "SLA countdown timer visible",
      "Escalation triggers on delay",
    ],
    visual: {
      type: "action" as const,
    },
  },
  {
    step: "05",
    title: "SLA Tracked",
    icon: FiClock,
    description:
      "Every issue has a visible SLA timer. Management sees a real-time dashboard of on-track, at-risk, and overdue issues across the organization.",
    details: [
      "Real-time SLA countdown on every issue",
      "Automatic breach alerts",
      "Priority-based SLA rules",
      "Compliance dashboards for leadership",
    ],
    visual: {
      type: "sla" as const,
    },
  },
  {
    step: "06",
    title: "Resolution Verified",
    icon: FiImage,
    description:
      "Staff uploads photo evidence of the completed fix. The original reporter verifies the resolution on-site — ensuring true accountability.",
    details: [
      "Mandatory after-fix photo upload",
      "Reporter on-site verification",
      "Reopen flow if issue persists",
      "Tamper-proof evidence chain",
    ],
    visual: {
      type: "evidence" as const,
    },
  },
  {
    step: "07",
    title: "Analytics & Accountability",
    icon: FiBarChart2,
    description:
      "Every action, status change, and resolution is recorded with timestamps. Leadership gets dashboards showing resolution rates, SLA compliance, and team performance.",
    details: [
      "Complete issue audit history",
      "Resolution rate analytics",
      "SLA compliance reporting",
      "Team performance insights",
    ],
    visual: {
      type: "analytics" as const,
    },
  },
];

function StepVisual({ type }: { type: string }) {
  if (type === "report") {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-lg bg-blue-500/15 flex items-center justify-center">
            <FiAlertTriangle className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-200">New Issue Report</div>
            <div className="text-[10px] text-slate-500">Submitted by resident</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-2 rounded-full bg-white/[0.06] w-3/4" />
          <div className="h-2 rounded-full bg-white/[0.06] w-1/2" />
          <div className="flex gap-2 mt-2">
            <div className="h-16 flex-1 rounded bg-white/[0.04] flex items-center justify-center">
              <FiImage className="h-4 w-4 text-slate-600" />
            </div>
            <div className="h-16 flex-1 rounded bg-white/[0.04] flex items-center justify-center">
              <FiImage className="h-4 w-4 text-slate-600" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "verify") {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold text-slate-200">Verification Queue</span>
          <span className="rounded-full bg-amber-500/15 border border-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-400">
            3 pending
          </span>
        </div>
        <div className="space-y-2">
          {["Roof leak — Building C", "Broken window — Hostel D", "Parking stripe — Lot B"].map(
            (item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2"
              >
                <span className="text-[11px] text-slate-300">{item}</span>
                <FiCheckCircle className="h-3.5 w-3.5 text-slate-600" />
              </div>
            ),
          )}
        </div>
      </div>
    );
  }

  if (type === "assign") {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold text-slate-200">Quick Assign</span>
        </div>
        <div className="space-y-2">
          {[
            { name: "Rajesh K.", dept: "Electrical", status: "Available" },
            { name: "Priya M.", dept: "Plumbing", status: "On task" },
            { name: "Amit S.", dept: "General", status: "Available" },
          ].map((person) => (
            <div
              key={person.name}
              className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-white/[0.06] flex items-center justify-center text-[10px] font-bold text-slate-400">
                  {person.name[0]}
                </div>
                <div>
                  <div className="text-[11px] text-slate-200">{person.name}</div>
                  <div className="text-[9px] text-slate-500">{person.dept}</div>
                </div>
              </div>
              <span
                className={cn(
                  "text-[9px] font-semibold px-1.5 py-0.5 rounded",
                  person.status === "Available"
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "bg-slate-500/15 text-slate-400",
                )}
              >
                {person.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "action") {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[10px] text-slate-500">CE-1042</span>
          <span className="rounded-full bg-blue-500/15 border border-blue-500/20 px-2 py-0.5 text-[10px] font-semibold text-blue-400">
            In Progress
          </span>
        </div>
        <div className="space-y-2">
          <div className="h-2 rounded-full bg-blue-400/40 w-3/5" />
          <div className="text-[10px] text-slate-500">Assigned to: Rajesh K. • Started 2h ago</div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
            <div className="text-[10px] text-slate-400">
              "Identified the issue — HVAC filter needs replacement. Ordering part."
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "sla") {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold text-slate-200">SLA Dashboard</span>
          <FiClock className="h-3.5 w-3.5 text-slate-500" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "On Track", value: "18", color: "text-emerald-400" },
            { label: "At Risk", value: "4", color: "text-amber-400" },
            { label: "Overdue", value: "2", color: "text-red-400" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2 text-center"
            >
              <div className={cn("text-lg font-bold", stat.color)}>{stat.value}</div>
              <div className="text-[9px] text-slate-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "evidence") {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold text-slate-200">Resolution Evidence</span>
          <FiCheckCircle className="h-3.5 w-3.5 text-emerald-400" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2 text-center">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-1">Before</div>
            <div className="h-12 rounded bg-white/[0.04] flex items-center justify-center">
              <FiImage className="h-4 w-4 text-slate-600" />
            </div>
          </div>
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2 text-center">
            <div className="text-[9px] text-emerald-400 uppercase tracking-wider mb-1">After</div>
            <div className="h-12 rounded bg-emerald-500/10 flex items-center justify-center">
              <FiCheckCircle className="h-4 w-4 text-emerald-400" />
            </div>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[10px] text-emerald-400">
          <FiCheck className="h-3 w-3" />
          Verified by reporter
        </div>
      </div>
    );
  }

  if (type === "analytics") {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold text-slate-200">Organization Analytics</span>
          <FiBarChart2 className="h-3.5 w-3.5 text-slate-500" />
        </div>
        <div className="space-y-2">
          {[
            { label: "Resolution Rate", value: "94%", w: "94%" },
            { label: "SLA Compliance", value: "89%", w: "89%" },
            { label: "Avg Resolution", value: "4.2h", w: "70%" },
          ].map((metric) => (
            <div key={metric.label}>
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className="text-slate-400">{metric.label}</span>
                <span className="text-slate-200 font-semibold">{metric.value}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div className="h-full rounded-full bg-primary/60" style={{ width: metric.w }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — CivicEye" },
      {
        name: "description",
        content:
          "See how CivicEye manages the complete issue lifecycle — from report to verified resolution — with SLA tracking and evidence-backed accountability.",
      },
    ],
  }),
  component: HowItWorksPage,
});

function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ─── Hero ─── */}
      <section className="page-hero">
        <div className="page-hero-grid" aria-hidden />
        <div className="relative z-10 container pt-24 pb-20 lg:pt-32 lg:pb-28 text-center">
          <RevealBlock>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-hero-accent">
              <span className="h-2 w-2 rounded-full bg-hero-accent animate-pulse" />
              How It Works
            </span>
          </RevealBlock>

          <RevealBlock delay={100}>
            <h1 className="mt-7 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.05] max-w-4xl mx-auto">
              The complete issue lifecycle,{" "}
              <span className="text-hero-accent">from report to resolution</span>
            </h1>
          </RevealBlock>

          <RevealBlock delay={200}>
            <p className="mt-6 text-lg text-slate-300/90 max-w-2xl mx-auto leading-relaxed">
              Every issue follows a structured, auditable workflow. Here is how CivicEye transforms
              chaotic complaint management into accountable operations.
            </p>
          </RevealBlock>

          <RevealBlock delay={300}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link to="/book-demo" className="btn-cinematic-primary">
                Book a Demo
                <FiArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/for-organizations" className="btn-cinematic-secondary">
                See the Product
              </Link>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ─── Visual Timeline ─── */}
      <section className="inner-section bg-background">
        <div className="container max-w-5xl">
          <div className="space-y-16 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-0">
            {WORKFLOW_STEPS.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;

              return (
                <RevealBlock key={step.step} delay={i * 80}>
                  <div
                    className={cn(
                      "relative lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center",
                      i < WORKFLOW_STEPS.length - 1 && "lg:pb-20",
                    )}
                  >
                    {/* Step number connector (desktop) */}
                    <div className="hidden lg:flex absolute left-1/2 top-0 -translate-x-1/2 z-10">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-display font-extrabold text-sm border-4 border-background shadow-lg">
                        {step.step}
                      </div>
                    </div>

                    {/* Connector line */}
                    {i < WORKFLOW_STEPS.length - 1 && (
                      <div className="hidden lg:block absolute left-1/2 top-12 -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary/40 to-primary/10" />
                    )}

                    {/* Content */}
                    <div
                      className={cn(
                        "lg:col-span-1",
                        isEven ? "lg:text-right lg:pr-12" : "lg:col-start-2 lg:pl-12",
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center gap-3 mb-4",
                          !isEven && "lg:flex-row-reverse",
                        )}
                      >
                        <span className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-display font-extrabold text-sm">
                          {step.step}
                        </span>
                        <span className="inline-grid place-items-center w-10 h-10 rounded-xl border border-primary/20 bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </span>
                      </div>

                      <h3 className="headline-3">{step.title}</h3>
                      <p className="mt-3 body-sm text-muted-foreground leading-relaxed max-w-md">
                        {step.description}
                      </p>

                      <ul className={cn("mt-5 space-y-2", !isEven && "lg:text-left")}>
                        {step.details.map((detail) => (
                          <li
                            key={detail}
                            className={cn(
                              "flex items-start gap-2 body-xs text-muted-foreground",
                              isEven ? "lg:justify-end" : "",
                            )}
                          >
                            {!isEven && (
                              <FiCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                            )}
                            <span>{detail}</span>
                            {isEven && (
                              <FiCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Visual */}
                    <div
                      className={cn(
                        "mt-6 lg:mt-0",
                        isEven
                          ? "lg:col-start-2 lg:pl-12"
                          : "lg:col-start-1 lg:col-span-1 lg:pr-12 lg:text-right",
                      )}
                    >
                      <StepVisual type={step.visual.type} />
                    </div>
                  </div>
                </RevealBlock>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Key Differentiators ─── */}
      <section className="inner-section bg-secondary/30 border-y border-border">
        <div className="container">
          <RevealBlock>
            <div className="text-center max-w-2xl mx-auto">
              <p className="caption">Why It Matters</p>
              <h2 className="mt-4 headline-2">What makes this workflow different</h2>
              <p className="mt-5 body-lg text-muted-foreground max-w-xl mx-auto">
                Most organizations manage issues through scattered tools. CivicEye creates a single
                source of truth.
              </p>
            </div>
          </RevealBlock>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Evidence-Backed",
                text: "No issue is closed without photo evidence. Every resolution is verified by the reporter.",
                icon: FiImage,
              },
              {
                title: "SLA-Driven",
                text: "Every issue has a visible timer. Your team knows what to prioritize before it becomes a crisis.",
                icon: FiClock,
              },
              {
                title: "Fully Auditable",
                text: "Every action, assignment, and status change is recorded with timestamps. Complete accountability.",
                icon: FiClipboard,
              },
              {
                title: "Zero App Friction",
                text: "Reporters use a simple web link. No downloads, no accounts, no training required.",
                icon: FiArrowUpRight,
              },
              {
                title: "Role-Based Access",
                text: "Staff, admins, and reporters each see exactly what they need. Nothing more, nothing less.",
                icon: FiUserCheck,
              },
              {
                title: "Real-Time Visibility",
                text: "Dashboards showing what is on track, what is at risk, and what needs immediate attention.",
                icon: FiActivity,
              },
            ].map((item, i) => (
              <RevealBlock key={item.title} delay={i * 80}>
                <div className="feature-visual-card p-7 h-full">
                  <span className="inline-grid place-items-center w-12 h-12 rounded-xl border border-primary/20 bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 headline-4">{item.title}</h3>
                  <p className="mt-3 body-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="cta-banner py-20 lg:py-24 text-center">
        <div className="container relative z-10 max-w-3xl mx-auto">
          <RevealBlock>
            <h2 className="headline-2 text-white">See the workflow in action</h2>
          </RevealBlock>
          <RevealBlock delay={100}>
            <p className="mt-5 body-lg text-slate-300/80 max-w-xl mx-auto">
              Book a live walkthrough and see how CivicEye transforms issue management for your
              organization.
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
