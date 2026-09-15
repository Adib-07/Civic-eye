import {
  FiChevronDown,
  FiClock,
  FiHelpCircle,
  FiMessageSquare,
  FiUserX,
  FiXCircle,
} from "react-icons/fi";

const PROBLEM_STEPS = [
  {
    icon: FiMessageSquare,
    label: "Reported in a WhatsApp group or Slack",
    desc: "No structured intake — context gets lost in chat",
  },
  {
    icon: FiUserX,
    label: "No one is assigned",
    desc: "Responsibility is unclear — issues fall through cracks",
  },
  {
    icon: FiClock,
    label: "No deadline is tracked",
    desc: "No SLA — resolution timing is arbitrary",
  },
  {
    icon: FiHelpCircle,
    label: "No one confirms it's fixed",
    desc: "Reporter never knows if work was actually done",
  },
  {
    icon: FiXCircle,
    label: "Closed without proof",
    desc: "No evidence, no audit trail — accountability broken",
  },
] as const;

export function ProblemStorySection() {
  return (
    <section className="page-section bg-secondary/30">
      <div className="container">
        <div className="section-header-center animate-slide-up">
          <p className="caption">The Problem</p>
          <h2 className="mt-4 headline-2">
            An issue reported in a WhatsApp group rarely gets assigned, tracked, or closed with
            proof.
          </h2>
        </div>

        <div className="mt-14 animate-slide-up stagger-1">
          <div className="mx-auto max-w-xl flex flex-col gap-4">
            {PROBLEM_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.label}
                  className="card p-5 flex items-center gap-5 animate-slide-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="icon-wrapper-lg bg-destructive/10 text-destructive border-destructive/20 shrink-0">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-foreground">{step.label}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                  {i < PROBLEM_STEPS.length - 1 && (
                    <FiChevronDown
                      className="h-5 w-5 text-muted-foreground/40 shrink-0"
                      aria-hidden
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
