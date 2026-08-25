import {
  FiCamera,
  FiCheckCircle,
  FiClipboard,
  FiClock,
  FiEye,
  FiMapPin,
  FiTarget,
  FiUser,
} from "react-icons/fi";

function ManageMock() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <AssignMock />
      <TrackMock />
    </div>
  );
}

const TOUR_STEPS = [
  {
    key: "capture",
    number: "01",
    label: "Capture",
    description:
      "Anyone reports an issue in seconds with a photo and auto-detected location — no app install required.",
    mock: ReportMock,
  },
  {
    key: "manage",
    number: "02",
    label: "Manage",
    description:
      "Issues route to the right team and stay visible with live SLA timers and logged status changes.",
    mock: ManageMock,
  },
  {
    key: "resolve",
    number: "03",
    label: "Resolve",
    description:
      "Field staff close issues only after uploading photo evidence and completion notes — proof of work done.",
    mock: ResolveMock,
  },
  {
    key: "verify",
    number: "04",
    label: "Verify",
    description:
      "Reporters or supervisors confirm the fix before the ticket is closed, closing the accountability loop.",
    mock: VerifyMock,
  },
] as const;

function ReportMock() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <FiClipboard className="h-4 w-4 text-primary" aria-hidden />
        <span className="text-xs font-semibold">Report an Issue</span>
      </div>
      <div className="space-y-3">
        <div>
          <span className="text-[10px] font-medium text-muted-foreground">Photo Evidence</span>
          <div className="mt-1 flex items-center justify-center h-16 rounded-lg border-2 border-dashed border-border bg-secondary/50">
            <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <FiCamera className="h-3.5 w-3.5" aria-hidden />
              Tap to capture or upload
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[10px] font-medium text-muted-foreground">Category</span>
            <div className="mt-1 rounded-lg border border-border bg-background px-2.5 py-1.5 text-[10px]">
              Pothole
            </div>
          </div>
          <div>
            <span className="text-[10px] font-medium text-muted-foreground">Location</span>
            <div className="mt-1 flex items-center gap-1 rounded-lg border border-border bg-background px-2.5 py-1.5 text-[10px]">
              <FiMapPin className="h-3 w-3 text-primary" aria-hidden />
              <span>Auto-detected</span>
            </div>
          </div>
        </div>
        <div>
          <span className="text-[10px] font-medium text-muted-foreground">Description</span>
          <div className="mt-1 rounded-lg border border-border bg-background px-2.5 py-1.5 text-[10px] text-muted-foreground">
            Large pothole near main gate entrance…
          </div>
        </div>
        <div className="rounded-lg bg-primary/5 border border-primary/10 px-2.5 py-1.5 text-[9px] text-primary/80 font-medium">
          No app install required — works on any mobile browser
        </div>
      </div>
    </div>
  );
}

function AssignMock() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FiTarget className="h-4 w-4 text-primary" aria-hidden />
          <span className="text-xs font-semibold">Assign Issue</span>
        </div>
        <span className="rounded bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-amber-600">
          Pending
        </span>
      </div>
      <div className="rounded-lg border border-border bg-background p-3 mb-3">
        <p className="text-[10px] font-semibold">Pothole — MG Road Junction</p>
        <p className="text-[9px] text-muted-foreground mt-0.5">
          Ward 12 · High priority · SLA: 24 hours
        </p>
      </div>
      <div className="space-y-2">
        <span className="text-[10px] font-medium text-muted-foreground">Assign to team</span>
        {[
          { name: "Roads & Infrastructure", active: true },
          { name: "General Maintenance", active: false },
        ].map((team) => (
          <div
            key={team.name}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-[10px] ${
              team.active
                ? "border-primary/30 bg-primary/5 font-semibold text-primary"
                : "border-border bg-background text-muted-foreground"
            }`}
          >
            <FiUser className="h-3 w-3 shrink-0" aria-hidden />
            {team.name}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-[9px] text-muted-foreground">
        <FiClock className="h-3 w-3" aria-hidden />
        Assignment creates SLA timer automatically
      </div>
    </div>
  );
}

function TrackMock() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FiClock className="h-4 w-4 text-primary" aria-hidden />
          <span className="text-xs font-semibold">SLA Tracking</span>
        </div>
      </div>
      <div className="space-y-2.5">
        {[
          {
            id: "CE-4821",
            title: "Pothole — MG Road",
            sla: "6h left",
            status: "In Progress",
            color: "bg-blue-500",
            pct: 75,
          },
          {
            id: "CE-4820",
            title: "Streetlight outage",
            sla: "2d left",
            status: "In Progress",
            color: "bg-blue-500",
            pct: 40,
          },
          {
            id: "CE-4818",
            title: "Water leak — Block C",
            sla: "Overdue",
            status: "Escalated",
            color: "bg-red-500",
            pct: 100,
          },
        ].map((issue) => (
          <div key={issue.id} className="rounded-lg border border-border bg-background p-2.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold">{issue.title}</p>
                <p className="text-[9px] text-muted-foreground">{issue.id}</p>
              </div>
              <span
                className={`rounded px-1.5 py-0.5 text-[9px] font-semibold text-white ${issue.color}`}
              >
                {issue.status}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1 rounded-full bg-secondary overflow-hidden">
                <div
                  className={`h-full rounded-full ${issue.sla === "Overdue" ? "bg-red-500" : "bg-primary"}`}
                  style={{ width: `${issue.pct}%` }}
                />
              </div>
              <span
                className={`text-[9px] font-medium ${issue.sla === "Overdue" ? "text-red-500" : "text-muted-foreground"}`}
              >
                {issue.sla}
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[9px] text-muted-foreground">
        Overdue issues surface automatically in the attention queue
      </p>
    </div>
  );
}

function ResolveMock() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FiCheckCircle className="h-4 w-4 text-emerald-500" aria-hidden />
          <span className="text-xs font-semibold">Resolution Evidence</span>
        </div>
        <span className="rounded bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-600">
          Resolved
        </span>
      </div>
      <div className="rounded-lg border border-border bg-background p-3 mb-3">
        <p className="text-[10px] font-semibold">CE-4821 · Pothole — MG Road</p>
        <p className="text-[9px] text-muted-foreground mt-0.5">
          Assigned to: Roads & Infrastructure
        </p>
      </div>
      <div className="space-y-2">
        <div>
          <span className="text-[10px] font-medium text-muted-foreground">Evidence Photo</span>
          <div className="mt-1 flex items-center justify-center h-16 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
            <span className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-medium">
              <FiCamera className="h-3.5 w-3.5" aria-hidden />
              Resolution photo attached
            </span>
          </div>
        </div>
        <div>
          <span className="text-[10px] font-medium text-muted-foreground">Completion Notes</span>
          <div className="mt-1 rounded-lg border border-border bg-background px-2.5 py-1.5 text-[10px] text-muted-foreground">
            Pothole filled and surface levelled. Work completed at 14:32 IST.
          </div>
        </div>
      </div>
      <div className="mt-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 px-2.5 py-1.5 text-[9px] text-emerald-700 font-medium">
        Photo evidence required before marking resolved
      </div>
    </div>
  );
}

function VerifyMock() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FiEye className="h-4 w-4 text-indigo-500" aria-hidden />
          <span className="text-xs font-semibold">Verification</span>
        </div>
        <span className="rounded bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-indigo-600">
          Awaiting Review
        </span>
      </div>
      <div className="rounded-lg border border-border bg-background p-3 mb-3">
        <p className="text-[10px] font-semibold">CE-4821 · Pothole — MG Road</p>
        <p className="text-[9px] text-muted-foreground mt-0.5">
          Resolved by: Rajesh M. · 14:32 IST
        </p>
      </div>
      <div className="rounded-lg border border-border bg-background p-2.5 mb-3">
        <div className="flex items-center justify-center h-12 rounded-lg border border-dashed border-border bg-secondary/50">
          <span className="text-[10px] text-muted-foreground">Before photo</span>
        </div>
        <div className="flex items-center justify-center h-12 mt-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
          <span className="text-[10px] text-emerald-600 font-medium">After photo</span>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1 flex items-center justify-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/5 py-2 text-[10px] font-semibold text-emerald-600">
          <FiCheckCircle className="h-3 w-3" aria-hidden />
          Confirm
        </div>
        <div className="flex-1 flex items-center justify-center gap-1 rounded-lg border border-border bg-background py-2 text-[10px] font-semibold text-muted-foreground">
          Reopen
        </div>
      </div>
      <p className="mt-2 text-[9px] text-muted-foreground">
        Reporter or supervisor confirms actual resolution
      </p>
    </div>
  );
}

const MOCKS: Record<string, React.FC> = {
  capture: ReportMock,
  manage: ManageMock,
  resolve: ResolveMock,
  verify: VerifyMock,
};

export function ProductTour() {
  return (
    <section id="workflow" className="py-16 sm:py-20" aria-labelledby="tour-heading">
      <div className="page-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">How It Works</p>
          <h2 id="tour-heading" className="mt-2 section-title text-2xl sm:text-3xl">
            Capture. Manage. Resolve. Verify.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            One accountable workflow takes every issue from first report to verified resolution.
          </p>
        </div>

        <div className="mt-12 space-y-16">
          {TOUR_STEPS.map((step, i) => {
            const MockComponent = MOCKS[step.key];
            const isEven = i % 2 === 0;
            return (
              <div
                key={step.key}
                className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
                  isEven ? "" : "lg:[direction:rtl]"
                }`}
              >
                <div className={isEven ? "" : "lg:[direction:ltr]"}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-background font-mono text-xs font-bold text-primary">
                      {step.number}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">
                      {step.label}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                    Step {step.number}: {step.label}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {step.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {i + 1}
                    </span>
                    <span>
                      Step {i + 1} of {TOUR_STEPS.length}
                    </span>
                  </div>
                </div>
                <div className={isEven ? "" : "lg:[direction:ltr]"}>
                  <div className="rounded-2xl border border-border bg-secondary/30 p-3 sm:p-4">
                    {MockComponent && <MockComponent />}
                    <p className="mt-3 text-center text-[10px] text-muted-foreground">
                      Illustrative UI preview — sign in to access your organization&apos;s live
                      workspace
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
