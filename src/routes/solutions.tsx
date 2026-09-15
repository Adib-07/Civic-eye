import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FiArrowRight,
  FiCheck,
  FiBookOpen,
  FiBriefcase,
  FiMap,
  FiTool,
  FiHome,
  FiLayers,
  FiCheckCircle,
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

const SOLUTIONS = [
  {
    id: "universities",
    icon: FiBookOpen,
    title: "Universities & Campuses",
    audience: "University administration and maintenance teams",
    image: "/assets/university-1600.jpg",
    problem:
      "Students report broken fans, leaking taps, and faulty projectors through scattered WhatsApp groups. Administration has no central view of maintenance requests across departments.",
    solution:
      "CivicEye gives students a single link to report issues with photos and location. Every request flows into one queue — routed to the right maintenance team with SLA tracking.",
    outcomes: [
      "40% faster average resolution time",
      "Zero lost complaints across departments",
      "Complete audit trail for NAAC/AICTE compliance",
      "Students can track their issue status in real-time",
    ],
    reverse: false,
  },
  {
    id: "organizations",
    icon: FiBriefcase,
    title: "Corporate & Tech Campuses",
    audience: "Workplace operations and facilities teams",
    image: "/assets/corporate-1600.jpg",
    problem:
      "Multi-building office parks manage facility requests through email and shared spreadsheets. SLA commitments to tenants slip through the cracks without visibility.",
    solution:
      "CivicEye centralizes all facility requests across buildings. Assign to internal teams or external vendors, track SLA compliance, and prove resolution with photo evidence.",
    outcomes: [
      "SLA compliance visibility across all buildings",
      "Vendor performance tracking and accountability",
      "Tenant satisfaction through transparent resolution",
      "Digital audit trail for lease compliance",
    ],
    reverse: true,
  },
  {
    id: "residential",
    icon: FiHome,
    title: "Residential Communities & RWAs",
    audience: "RWA boards and housing society administrators",
    image: "/assets/residential-1600.jpg",
    problem:
      "Residents complain about potholes, water supply, and lighting through unstructured group chats. RWA boards have no way to track resolution or hold anyone accountable.",
    solution:
      "CivicEye gives every resident a 30-second reporting link. Issues flow to the RWA dashboard with location, photos, and priority — creating accountability from report to fix.",
    outcomes: [
      "Resident satisfaction through visible accountability",
      "RWA board gets a complete operations dashboard",
      "Maintenance staff performance tracking",
      "Transparent issue resolution for community trust",
    ],
    reverse: false,
  },
  {
    id: "townships",
    icon: FiMap,
    title: "Integrated Townships & Estates",
    audience: "Township administrators and facility managers",
    image: "/assets/township-1600.jpg",
    problem:
      "Large townships with multiple blocks, amenities, and common areas have no centralized system for tracking infrastructure issues across the property.",
    solution:
      "CivicEye maps every issue to its exact location. See problem hotspots on an interactive map, prioritize by urgency, and ensure every area gets equal maintenance attention.",
    outcomes: [
      "Map-based visibility of problem clusters",
      "Equal maintenance attention across all zones",
      "Infrastructure health dashboard for management",
      "Reduced resident complaints through faster resolution",
    ],
    reverse: true,
  },
  {
    id: "facility",
    icon: FiTool,
    title: "Facility Management Companies",
    audience: "Facility managers and operations directors",
    image: "/assets/facility-1600.jpg",
    problem:
      "Managing SLA commitments across multiple client sites with spreadsheets creates accountability gaps. Client renewals depend on proving consistent service delivery.",
    solution:
      "CivicEye provides a client-facing view of issue resolution. Prove SLA compliance with data, maintain a tamper-proof audit history, and demonstrate operational excellence at renewal.",
    outcomes: [
      "Client-facing SLA compliance reports",
      "Tamper-proof audit trail for contract renewals",
      "Multi-site operations from a single dashboard",
      "Evidence-backed vendor performance reviews",
    ],
    reverse: false,
  },
];

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — CivicEye" },
      {
        name: "description",
        content:
          "CivicEye serves universities, campuses, organizations, townships, and facility management companies with issue operations from report to verified resolution.",
      },
    ],
  }),
  component: SolutionsPage,
});

function SolutionsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ─── Hero ─── */}
      <section className="page-hero">
        <div className="page-hero-grid" aria-hidden />
        <div className="relative z-10 container pt-24 pb-20 lg:pt-32 lg:pb-28 text-center">
          <RevealBlock>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-hero-accent">
              <span className="h-2 w-2 rounded-full bg-hero-accent animate-pulse" />
              Solutions
            </span>
          </RevealBlock>

          <RevealBlock delay={100}>
            <h1 className="mt-7 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.05] max-w-4xl mx-auto">
              Built for teams responsible for{" "}
              <span className="text-hero-accent">real-world spaces</span>
            </h1>
          </RevealBlock>

          <RevealBlock delay={200}>
            <p className="mt-6 text-lg text-slate-300/90 max-w-2xl mx-auto leading-relaxed">
              Whether you manage a campus, a corporate office park, a residential community, or a
              network of facility clients — CivicEye adapts to your operational reality.
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

      {/* ─── Solutions Stats ─── */}
      <section className="inner-section-tight bg-background border-b border-border">
        <div className="container">
          <RevealBlock>
            <div className="stats-bar max-w-4xl mx-auto">
              {[
                { value: "5+", label: "Solution verticals" },
                { value: "30s", label: "Issue reporting time" },
                { value: "100%", label: "Audit trail coverage" },
                { value: "24/7", label: "SLA monitoring" },
              ].map((stat) => (
                <div key={stat.label} className="stats-bar-item">
                  <div className="font-display text-2xl font-extrabold text-primary">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ─── Solution Sections ─── */}
      {SOLUTIONS.map((solution, i) => {
        const Icon = solution.icon;
        return (
          <section
            key={solution.id}
            id={solution.id}
            className={cn(
              "inner-section",
              i % 2 === 0 ? "bg-background" : "bg-secondary/30 border-y border-border",
            )}
          >
            <div className="container">
              <div className={cn("solution-split", solution.reverse && "reverse")}>
                <RevealBlock>
                  <div className="solution-split-image">
                    <img
                      src={solution.image}
                      alt={solution.title}
                      loading="lazy"
                      decoding="async"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"
                      aria-hidden
                    />
                  </div>
                </RevealBlock>

                <RevealBlock delay={150}>
                  <div>
                    <div className="inline-flex items-center gap-3 mb-5">
                      <span className="inline-grid place-items-center w-11 h-11 rounded-xl border border-primary/20 bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <span className="text-xs font-bold text-primary uppercase tracking-widest">
                        {solution.audience}
                      </span>
                    </div>

                    <h2 className="headline-2">{solution.title}</h2>

                    <div className="mt-8 space-y-6">
                      <div>
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-2 flex items-center gap-2">
                          <FiCheckCircle className="h-4 w-4 text-destructive" />
                          The Challenge
                        </h3>
                        <p className="body-sm text-muted-foreground leading-relaxed">
                          {solution.problem}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-2 flex items-center gap-2">
                          <FiLayers className="h-4 w-4 text-primary" />
                          The CivicEye Solution
                        </h3>
                        <p className="body-sm text-muted-foreground leading-relaxed">
                          {solution.solution}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
                          <FiCheck className="h-4 w-4 text-success" />
                          Measurable Outcomes
                        </h3>
                        <ul className="space-y-2.5">
                          {solution.outcomes.map((outcome) => (
                            <li key={outcome} className="flex items-start gap-2.5">
                              <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                              <span className="body-sm text-foreground">{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        to="/book-demo"
                        className="btn-primary inline-flex items-center gap-2 text-sm"
                      >
                        Book a Demo
                        <FiArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        to="/pricing"
                        className="btn-secondary inline-flex items-center gap-2 text-sm"
                      >
                        View Pricing
                      </Link>
                    </div>
                  </div>
                </RevealBlock>
              </div>
            </div>
          </section>
        );
      })}

      {/* ─── CTA ─── */}
      <section className="cta-banner py-20 lg:py-24 text-center">
        <div className="container relative z-10 max-w-3xl mx-auto">
          <RevealBlock>
            <h2 className="headline-2 text-white">Find the right solution for your organization</h2>
          </RevealBlock>
          <RevealBlock delay={100}>
            <p className="mt-5 body-lg text-slate-300/80 max-w-xl mx-auto">
              Every organization has unique operational challenges. Let us show you how CivicEye
              adapts to your specific environment.
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
