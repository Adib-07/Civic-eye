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
    <section className="page-section bg-background">
      <div className="container">
        {/* Header */}
        <div className="section-header-center animate-slide-up">
          <p className="caption">CAPABILITIES</p>
          <h2 className="mt-3 headline-2">
            Built for the people responsible for getting things done
          </h2>
          <p className="mt-4 body-lg text-muted-foreground max-w-2xl mx-auto">
            CivicEye covers the complete operational workflow — from first report to verified
            resolution with evidence.
          </p>
        </div>

        <div className="mt-14 grid-auto-fit">
          {CAPABILITIES.map((capability, index) => (
            <article
              key={capability.title}
              className="card card-hover-elevated p-6 animate-slide-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="icon-wrapper-md icon-wrapper-primary mb-4">
                <capability.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="headline-4">{capability.title}</h3>
              <p className="mt-3 body-sm text-muted-foreground leading-relaxed">
                {capability.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}