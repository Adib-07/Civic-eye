import { useState } from "react";
import {
  FiCamera,
  FiClock,
  FiMapPin,
  FiUserCheck,
  FiCheckCircle,
  FiLayers,
  FiChevronRight,
} from "react-icons/fi";
import { cn } from "@/lib/utils";

const WORKFLOW_STEPS = [
  {
    id: "report",
    step: "01",
    title: "Report",
    desc: "Capture the issue with photo and location",
    icon: FiCamera,
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "assign",
    step: "02",
    title: "Assign",
    desc: "Route responsibility to the appropriate team",
    icon: FiUserCheck,
    color: "from-indigo-500 to-sky-500",
  },
  {
    id: "track",
    step: "03",
    title: "Track",
    desc: "Monitor progress and SLA timelines",
    icon: FiClock,
    color: "from-sky-500 to-blue-600",
  },
  {
    id: "resolve",
    step: "04",
    title: "Resolve",
    desc: "Require evidence and work notes",
    icon: FiLayers,
    color: "from-blue-600 to-amber-500",
  },
  {
    id: "verify",
    step: "05",
    title: "Verify",
    desc: "Reporter confirms actual resolution",
    icon: FiCheckCircle,
    color: "from-emerald-500 to-teal-400",
  },
];

const PREVIEW_ISSUES = [
  {
    id: "CE-9842",
    title: "Main Gate Pothole Hazard",
    category: "Pothole",
    location: "North Sector 4 Gateway",
    coords: "12.9716, 77.5946",
    priority: "High",
    sla: "3h 45m left",
    status: "In Progress",
    statusBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    assignee: "Officer R. Sharma",
    ward: "Ward 12",
  },
  {
    id: "CE-9841",
    title: "Streetlight Circuit Breaker Fault",
    category: "Streetlight",
    location: "Avenue 3 Promenade",
    coords: "12.9782, 77.5912",
    priority: "Medium",
    sla: "14h 20m left",
    status: "Pending",
    statusBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    assignee: "Unassigned",
    ward: "Ward 08",
  },
  {
    id: "CE-9840",
    title: "Water Main Overflow near Block C",
    category: "Water Leakage",
    location: "Block C Residential Complex",
    coords: "12.9654, 77.6011",
    priority: "High",
    sla: "Overdue",
    status: "In Progress",
    statusBg: "bg-red-500/10 text-red-400 border-red-500/20",
    assignee: "Officer M. Patil",
    ward: "Ward 15",
  },
];

const STAGE_DETAILS: Record<
  string,
  { title: string; text: string; borderClass: string; bgClass: string; titleClass: string }
> = {
  report: {
    title: "Citizen Reporting",
    text: "Zero app installation required. Citizens submit photos and location tags via a lightweight web form.",
    borderClass: "border-blue-500/20",
    bgClass: "bg-blue-500/5",
    titleClass: "text-blue-300",
  },
  evidence: {
    title: "Geo & Visual Evidence",
    text: "Automatic device GPS capture with interactive map pin and photo storage.",
    borderClass: "border-indigo-500/20",
    bgClass: "bg-indigo-500/5",
    titleClass: "text-indigo-300",
  },
  queue: {
    title: "Central Intake Console",
    text: "Multi-column filterable operations table designed for ward managers and facility dispatchers.",
    borderClass: "border-sky-500/20",
    bgClass: "bg-sky-500/5",
    titleClass: "text-sky-300",
  },
  assignment: {
    title: "Staff Assignment",
    text: "Assign issues to designated staff members or specialized maintenance crews based on category.",
    borderClass: "border-blue-500/20",
    bgClass: "bg-blue-500/5",
    titleClass: "text-blue-300",
  },
  sla: {
    title: "SLA Tracking",
    text: "Configurable resolution timelines per category. Automatic breach alerts for overdue tasks.",
    borderClass: "border-amber-500/20",
    bgClass: "bg-amber-500/5",
    titleClass: "text-amber-300",
  },
  resolution: {
    title: "Verified Resolution",
    text: "Staff mark resolved with photo evidence, supervisors verify proof, and reporters receive status updates.",
    borderClass: "border-emerald-500/20",
    bgClass: "bg-emerald-500/5",
    titleClass: "text-emerald-300",
  },
};

export function HeroProductPreview() {
  const [activeStep, setActiveStep] = useState(2);

  const stageKeys = ["report", "evidence", "queue", "assignment", "sla", "resolution"] as const;
  const currentDetail = STAGE_DETAILS[stageKeys[activeStep]] ?? STAGE_DETAILS.queue;

  return (
    <div className="cinematic-product-shell mx-auto max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-slate-950/80 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-white/90">CivicEye Operations</span>
          <span className="rounded bg-blue-500/15 px-2 py-0.5 text-[10px] font-mono font-medium text-blue-300 border border-blue-500/20">
            Organization Workspace
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Role-Based Access
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 border-b border-white/10 bg-slate-900/60 p-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5">
        {WORKFLOW_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStep === idx;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={cn(
                "group relative flex flex-col items-start rounded-lg p-2.5 text-left transition-all duration-200",
                isActive
                  ? "bg-white/[0.08] text-white shadow-sm ring-1 ring-white/15"
                  : "text-slate-400 hover:bg-white/[0.03] hover:text-slate-200",
              )}
            >
              <div className="flex w-full items-center justify-between">
                <span className="text-[10px] font-mono font-semibold opacity-60">{step.step}</span>
                <Icon className={cn("h-4 w-4", isActive ? "text-blue-400" : "text-slate-400")} />
              </div>
              <p className="mt-1.5 text-xs font-semibold leading-snug line-clamp-1">{step.title}</p>
              <span
                className={cn(
                  "mt-2 h-0.5 w-full rounded-full transition-all duration-300",
                  isActive ? "bg-gradient-to-r " + step.color : "bg-transparent",
                )}
              />
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
        <div className="p-4 sm:p-6 border-b border-white/10 lg:border-b-0 lg:border-r border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-blue-400">
                Stage {WORKFLOW_STEPS[activeStep].step}
              </p>
              <h3 className="text-base font-bold text-white">{WORKFLOW_STEPS[activeStep].title}</h3>
            </div>
            <span className="text-xs text-slate-400">{WORKFLOW_STEPS[activeStep].desc}</span>
          </div>

          <div className="space-y-3">
            {PREVIEW_ISSUES.map((issue) => (
              <div
                key={issue.id}
                className="group rounded-xl border border-white/10 bg-slate-900/70 p-3.5 transition-all duration-200 hover:border-blue-500/30 hover:bg-slate-900/90"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-semibold text-blue-400">
                        #{issue.id}
                      </span>
                      <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-slate-300">
                        {issue.category}
                      </span>
                    </div>
                    <h4 className="mt-1 truncate text-xs font-semibold text-white">
                      {issue.title}
                    </h4>
                  </div>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-medium",
                      issue.statusBg,
                    )}
                  >
                    {issue.status}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-2.5 border-t border-white/5">
                  <span className="flex items-center gap-1 truncate">
                    <FiMapPin className="h-3 w-3 text-slate-400 shrink-0" />
                    {issue.location}
                  </span>
                  <span className="flex items-center gap-1 justify-end font-mono">
                    <FiClock className="h-3 w-3 text-amber-400 shrink-0" />
                    {issue.sla}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 sm:p-6 bg-slate-950/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-3">
              <FiLayers className="text-blue-400" />
              Stage Details
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div
                className={cn(
                  "rounded-lg border p-3",
                  currentDetail.borderClass,
                  currentDetail.bgClass,
                )}
              >
                <p className={cn("font-semibold", currentDetail.titleClass)}>
                  {currentDetail.title}
                </p>
                <p className="mt-1 text-slate-400 leading-relaxed">{currentDetail.text}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10">
            <span className="text-[11px] text-slate-400">
              Click tabs above to step through workflow
            </span>
            <button
              onClick={() => setActiveStep((prev) => (prev + 1) % WORKFLOW_STEPS.length)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              Next step <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
