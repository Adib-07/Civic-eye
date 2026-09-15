import { Link } from "@tanstack/react-router";
import { FiBookOpen, FiBriefcase, FiMap, FiTool, FiArrowRight } from "react-icons/fi";
import { cn } from "@/lib/utils";

const SOLUTIONS = [
  {
    title: "Facility Management",
    icon: FiTool,
    audience: "Facility managers and operations teams",
    description:
      "Manage resolution across every client site under contract. Keep a dated audit trail that proves each SLA was met at renewal.",
    color: "blue",
    image: "/assets/facility-1600.jpg",
  },
  {
    title: "Corporate & Technology Campuses",
    icon: FiBriefcase,
    audience: "Campus operations and workplace teams",
    description:
      "Employees report a broken HVAC or dead outlet from a single link. CivicEye routes it to the right vendor and shows every open ticket across all buildings.",
    color: "indigo",
    image: "/assets/corporate-1600.jpg",
  },
  {
    title: "Universities & Colleges",
    icon: FiBookOpen,
    audience: "University administration and maintenance",
    description:
      "Students and staff report issues with no app to install. Track them across academic blocks, hostels, labs, and sports facilities from one queue.",
    color: "sky",
    image: "/assets/university-1600.jpg",
  },
  {
    title: "Large Communities & Townships",
    icon: FiMap,
    audience: "RWA boards and township administrators",
    description:
      "Residents report potholes, outages, and water issues from their phones. See where problems cluster on a map and send the right crew.",
    color: "emerald",
    image: "/assets/township-1600.jpg",
  },
] as const;

const ICON_STYLES: Record<string, string> = {
  blue: "icon-wrapper-primary",
  indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  sky: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
};

export function SolutionsSection() {
  return (
    <section id="solutions" className="page-section bg-secondary/30 border-y border-border">
      <div className="container">
        <div className="section-header-center animate-slide-up">
          <p className="caption">SOLUTIONS</p>
          <h2 className="mt-4 headline-2">Designed for teams responsible for real-world spaces</h2>
          <p className="mt-5 body-lg text-muted-foreground max-w-2xl mx-auto">
            CivicEye serves facility managers, campuses, communities, and operations teams.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SOLUTIONS.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <article
                key={solution.title}
                className="card card-hover-elevated group overflow-hidden animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={solution.image}
                    alt={solution.title}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-border/50 via-transparent to-transparent"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className={cn("icon-wrapper-lg mb-4", ICON_STYLES[solution.color])}>
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="headline-4">{solution.title}</h3>
                  <p className="mt-1.5 text-xs font-semibold text-primary/70">
                    {solution.audience}
                  </p>
                  <p className="mt-3 body-sm text-muted-foreground leading-relaxed flex-1">
                    {solution.description}
                  </p>
                  <Link
                    to="/book-demo"
                    className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-primary transition-colors hover:text-primary/80"
                  >
                    Explore solution
                    <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
