import { FiBookOpen, FiBriefcase, FiHome, FiMap } from "react-icons/fi";
import { cn } from "@/lib/utils";

const SOLUTIONS = [
  {
    title: "Facility Management",
    icon: FiHome,
    audience: "Facility managers and operations teams",
    description:
      "Track vendor resolution times across client sites. Maintain digital audit trails for contractual SLA compliance.",
    color: "blue",
    image: "/assets/facility-1600.jpg",
  },
  {
    title: "Corporate & Technology Campuses",
    icon: FiBriefcase,
    audience: "Campus operations and workplace teams",
    description:
      "Keep multi-building office parks operational. Assign facility tickets instantly and monitor maintenance SLAs.",
    color: "indigo",
    image: "/assets/corporate-1600.jpg",
  },
  {
    title: "Universities & Colleges",
    icon: FiBookOpen,
    audience: "University administration and maintenance",
    description:
      "Streamline campus maintenance across academic blocks, hostels, labs, and sports facilities.",
    color: "sky",
    image: "/assets/university-1600.jpg",
  },
  {
    title: "Large Communities & Townships",
    icon: FiMap,
    audience: "RWA boards and township administrators",
    description:
      "Centralize infrastructure maintenance across residential townships. Monitor problem hotspots on interactive maps.",
    color: "emerald",
    image: "/assets/township-1600.jpg",
  },
] as const;

const ICON_STYLES: Record<string, string> = {
  blue: "bg-blue-500/5 border-blue-500/20 text-blue-600",
  indigo: "bg-indigo-500/5 border-indigo-500/20 text-indigo-600",
  sky: "bg-sky-500/5 border-sky-500/20 text-sky-600",
  emerald: "bg-emerald-500/5 border-emerald-500/20 text-emerald-600",
};

export function SolutionsSection() {
  return (
    <section id="solutions" className="py-20 lg:py-28 bg-secondary/30 border-y border-border">
      <div className="page-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">SOLUTIONS</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Designed for teams responsible for real-world spaces
          </h2>
          <p className="mt-3 text-muted-foreground text-base max-w-2xl mx-auto">
            CivicEye serves facility managers, campuses, communities, and operations teams.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {SOLUTIONS.map((solution) => {
            const Icon = solution.icon;
            return (
              <article
                key={solution.title}
                className="solution-card group flex flex-col overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={solution.image}
                    alt={solution.title}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-border/40 via-transparent to-transparent"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span
                    className={cn(
                      "grid h-12 w-12 shrink-0 place-items-center rounded-xl border",
                      ICON_STYLES[solution.color],
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="text-lg font-semibold mt-4">{solution.title}</h3>
                  <p className="text-xs font-medium text-primary/70 mt-1">{solution.audience}</p>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
