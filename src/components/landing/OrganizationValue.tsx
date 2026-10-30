import {
  FiBarChart2,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiLayers,
  FiMapPin,
  FiShield,
  FiUserCheck,
} from "react-icons/fi";

const ROLES = [
  {
    icon: FiBriefcase,
    title: "Facility Managers",
    benefits: [
      "Track vendor resolution times across multiple client sites",
      "Maintain digital audit trails for contractual SLA compliance",
      "Verify completion with photo evidence before closing tickets",
    ],
  },
  {
    icon: FiLayers,
    title: "Operations Managers",
    benefits: [
      "See all open issues, assignments, and SLA status in one dashboard",
      "Identify overdue issues and bottlenecks before they escalate",
      "Track team performance with resolution metrics",
    ],
  },
  {
    icon: FiMapPin,
    title: "Campus Administrators",
    benefits: [
      "Assign facility tickets to the right teams across buildings",
      "Monitor maintenance SLAs across academic blocks, labs, and hostels",
      "Students and staff report issues without app installation",
    ],
  },
  {
    icon: FiUserCheck,
    title: "Property & Community Managers",
    benefits: [
      "Centralize maintenance requests from residents and staff",
      "Track common-area issues on interactive maps",
      "Ensure accountability from report to verified resolution",
    ],
  },
  {
    icon: FiShield,
    title: "Operations Heads",
    benefits: [
      "Gain management visibility across all operational sites",
      "Standardize issue handling across departments and locations",
      "Access a centralized operational history for reporting",
    ],
  },
];

const VALUE_POINTS = [
  {
    icon: FiLayers,
    label: "Fewer Lost Issues",
    text: "Every reported issue enters a structured system — nothing gets buried in inboxes or chat threads.",
  },
  {
    icon: FiUserCheck,
    label: "Clearer Ownership",
    text: "Each issue is assigned to a specific team or person. Accountability is explicit.",
  },
  {
    icon: FiClock,
    label: "SLA Visibility",
    text: "Resolution timelines are tracked per category. Overdue items surface automatically.",
  },
  {
    icon: FiCheckCircle,
    label: "Resolution Evidence",
    text: "Photo proof and completion notes are required before closing — no unverified closures.",
  },
  {
    icon: FiBarChart2,
    label: "Operational History",
    text: "A complete record of every issue from report to verified resolution — available for audits and reporting.",
  },
  {
    icon: FiShield,
    label: "Management Visibility",
    text: "Operations heads see real-time status across all sites, teams, and categories.",
  },
] as const;

export function OrganizationValue() {
  return (
    <section
      className="py-16 sm:py-20 border-y border-border bg-secondary/30"
      aria-labelledby="value-heading"
    >
      <div className="page-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">Who It&apos;s For</p>
          <h2 id="value-heading" className="mt-2 section-title text-2xl sm:text-3xl">
            Built for the people responsible for getting things done
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            CivicEye is designed for the roles that own operational outcomes — not just the people
            who report issues.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ROLES.map((role) => (
            <article key={role.title} className="landing-feature-card p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-background text-primary">
                  <role.icon className="h-4 w-4" aria-hidden />
                </span>
                <h3 className="text-sm font-semibold">{role.title}</h3>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {role.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <FiCheckCircle
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/60"
                      aria-hidden
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-semibold text-center mb-6">
            What CivicEye gives your operations team
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALUE_POINTS.map((vp) => (
              <div
                key={vp.label}
                className="flex items-start gap-3 rounded-xl border border-border bg-background p-4"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-secondary text-primary">
                  <vp.icon className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold">{vp.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{vp.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
