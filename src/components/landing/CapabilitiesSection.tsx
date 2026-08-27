import {
  FiBarChart2,
  FiCamera,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiUserCheck,
} from "react-icons/fi";

const CAPABILITIES = [
  {
    icon: FiClock,
    title: "SLA Tracking",
    description: "Configurable resolution timelines per category with automatic breach alerts.",
  },
  {
    icon: FiUserCheck,
    title: "Issue Assignment",
    description: "Route responsibility to the right team based on category and location.",
  },
  {
    icon: FiCamera,
    title: "Evidence-Based Resolution",
    description: "Staff upload photo evidence and work notes before marking issues complete.",
  },
  {
    icon: FiCheckCircle,
    title: "Resolution Verification",
    description:
      "Reporters and supervisors confirm or reject completed work — closing the accountability loop.",
  },
  {
    icon: FiMapPin,
    title: "Location-Aware Issues",
    description: "Geo-tagged reports with interactive map view for precise field navigation.",
  },
  {
    icon: FiBarChart2,
    title: "Operational Analytics",
    description:
      "Dashboard KPIs, category breakdowns, and compliance metrics for management visibility.",
  },
] as const;

export function CapabilitiesSection() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="page-container">
        {/* Header — left-aligned to break center monotone */}
        <div className="max-w-2xl">
          <p className="section-label">CAPABILITIES</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Built for the people responsible for getting things done
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            CivicEye covers the complete operational workflow — from first report to verified
            resolution with evidence.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((capability) => (
            <article key={capability.title} className="landing-feature-card p-6">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-primary">
                <capability.icon className="h-4 w-4" aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-semibold">{capability.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {capability.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
