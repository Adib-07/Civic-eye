import { useState, useEffect } from "react";
import { FiCamera, FiCheckCircle, FiChevronLeft, FiChevronRight, FiEye, FiGrid, FiMapPin, FiUpload } from "react-icons/fi";

import { cn } from "@/lib/utils";

function ProductFrameHeader({ title }: { title: string }) {
  return (
    <div className="product-frame-header">
      <span className="product-frame-dot" />
      <span className="product-frame-dot" />
      <span className="product-frame-dot" />
      <span className="ml-1 text-xs font-medium text-muted-foreground">{title}</span>
    </div>
  );
}

function IssueReportingForm() {
  return (
    <div className="product-frame">
      <ProductFrameHeader title="Report an Issue" />
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border p-6">
          <div className="text-center">
            <FiUpload className="mx-auto h-6 w-6 text-muted-foreground" aria-hidden />
            <p className="mt-1.5 text-xs text-muted-foreground">Upload Photo</p>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">
            Category
          </label>
          <div className="flex items-center justify-between rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-muted-foreground">
            <span>Select category</span>
            <FiGrid className="h-3 w-3" aria-hidden />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">
            Location
          </label>
          <div className="flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5">
            <FiMapPin className="h-3 w-3 text-muted-foreground" aria-hidden />
            <span className="text-xs text-muted-foreground">Enter location</span>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">
            Description
          </label>
          <div className="rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-muted-foreground">
            Describe the issue...
          </div>
        </div>

        <button
          type="button"
          className="w-full rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
        >
          Submit Report
        </button>
      </div>
    </div>
  );
}

function OperationsDashboard() {
  const stats = [
    { label: "Open", value: "24", color: "text-blue-500" },
    { label: "In Progress", value: "12", color: "text-amber-500" },
    { label: "Resolved", value: "89", color: "text-emerald-500" },
    { label: "Overdue", value: "4", color: "text-red-500" },
  ];

  const issues = [
    { id: "CE-4821", title: "Pothole near main gate", status: "In Progress" },
    { id: "CE-4820", title: "Streetlight outage", status: "Pending" },
    { id: "CE-4819", title: "Water leak — pump room", status: "Resolved" },
  ];

  const statusColors: Record<string, string> = {
    "In Progress": "bg-blue-500",
    Pending: "bg-amber-500",
    Resolved: "bg-emerald-500",
  };

  return (
    <div className="product-frame">
      <ProductFrameHeader title="Operations Overview" />
      <div className="p-3">
        <div className="grid grid-cols-2 gap-2">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-md border border-border bg-background p-2">
              <p className="text-[9px] text-muted-foreground">{stat.label}</p>
              <p className={cn("font-display text-base font-bold", stat.color)}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-2.5 divide-y divide-border rounded-md border border-border">
          {issues.map((issue) => (
            <div key={issue.id} className="flex items-center gap-2 px-2.5 py-1.5">
              <span
                className={cn(
                  "h-1.5 w-1.5 shrink-0 rounded-full",
                  statusColors[issue.status] ?? "bg-muted-foreground",
                )}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[10px] font-medium">{issue.title}</p>
              </div>
              <span className="shrink-0 text-[9px] text-muted-foreground">{issue.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResolutionVerification() {
  return (
    <div className="product-frame">
      <ProductFrameHeader title="Issue CE-4821" />
      <div className="space-y-3 p-3">
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-500 border border-blue-500/20">
          <FiEye className="h-2.5 w-2.5" aria-hidden />
          In Progress
        </span>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-md border border-border bg-background p-2 text-center">
            <FiCamera className="mx-auto h-4 w-4 text-muted-foreground" aria-hidden />
            <p className="mt-1 text-[9px] text-muted-foreground">Before</p>
          </div>
          <div className="rounded-md border border-border bg-background p-2 text-center">
            <FiCheckCircle className="mx-auto h-4 w-4 text-muted-foreground" aria-hidden />
            <p className="mt-1 text-[9px] text-muted-foreground">After</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="flex-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400"
          >
            Confirm
          </button>
          <button
            type="button"
            className="flex-1 rounded-md border border-border bg-background px-2 py-1 text-[10px] font-medium text-muted-foreground"
          >
            Reopen
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProductShowcaseSection() {
  return (
    <section className="bg-secondary/30 border-y border-border py-16 lg:py-24">
      <div className="page-container">
        <div className="text-center">
          <p className="section-label">PRODUCT</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight">
            See CivicEye in action
          </h2>
          <p className="mt-3 text-muted-foreground text-base max-w-2xl mx-auto">
            A complete issue management interface — from reporting to verified resolution.
          </p>
        </div>

        <ProductCarousel
          screens={[
            { label: "Citizen Reporting", node: <IssueReportingForm /> },
            { label: "Operations Dashboard", node: <OperationsDashboard /> },
            { label: "Resolution Verification", node: <ResolutionVerification /> },
          ]}
        />
      </div>
    </section>
  );
}

function ProductCarousel({
  screens,
}: {
  screens: { label: string; node: React.ReactNode }[];
}) {
  const [active, setActive] = useState(0);

  const go = (next: number) => setActive((next + screens.length) % screens.length);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % screens.length), 5000);
    return () => clearInterval(id);
  }, [screens.length]);

  return (
    <div className="mt-12 product-frame overflow-hidden">
      <div className="product-frame-header">
        <span className="product-frame-dot" />
        <span className="product-frame-dot" />
        <span className="product-frame-dot" />
        <span className="ml-1 text-xs font-medium text-muted-foreground">
          {screens[active].label}
        </span>
      </div>

      <div className="relative">
        <div className="grid aspect-video w-full place-items-center bg-gradient-to-br from-secondary/60 to-background p-4 sm:p-8">
          <div className="w-full max-w-md">{screens[active].node}</div>
        </div>

        <button
          type="button"
          onClick={() => go(active - 1)}
          aria-label="Previous screen"
          className="absolute left-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/80 text-foreground shadow-sm transition hover:bg-background"
        >
          <FiChevronLeft className="h-4 w-4" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => go(active + 1)}
          aria-label="Next screen"
          className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/80 text-foreground shadow-sm transition hover:bg-background"
        >
          <FiChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 py-3">
        {screens.map((screen, i) => (
          <button
            key={screen.label}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show ${screen.label}`}
            aria-current={i === active}
            className={cn(
              "h-2 rounded-full transition-all",
              i === active ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted-foreground",
            )}
          />
        ))}
      </div>
    </div>
  );
}
