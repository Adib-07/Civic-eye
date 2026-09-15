import { useState, useEffect } from "react";
import {
  FiCamera,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiGrid,
  FiMapPin,
  FiUpload,
} from "react-icons/fi";

import { cn } from "@/lib/utils";

function ProductFrameHeader({ title }: { title: string }) {
  return (
    <div className="product-frame-header">
      <span className="product-frame-dot" />
      <span className="product-frame-dot" />
      <span className="product-frame-dot" />
      <span className="ml-1 text-xs font-semibold text-muted-foreground">{title}</span>
    </div>
  );
}

function IssueReportingForm() {
  return (
    <div className="product-frame">
      <ProductFrameHeader title="Report an Issue" />
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border p-8">
          <div className="text-center">
            <FiUpload className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden />
            <p className="mt-2 text-sm font-semibold text-muted-foreground">
              Upload Photo Evidence
            </p>
          </div>
        </div>

        <div className="form-field">
          <label className="label">Category</label>
          <div className="input-field flex items-center justify-between px-3 py-2.5 text-sm text-muted-foreground">
            <span>Select category</span>
            <FiGrid className="h-4 w-4" aria-hidden />
          </div>
        </div>

        <div className="form-field">
          <label className="label">Location</label>
          <div className="input-field flex items-center gap-2 px-3 py-2.5">
            <FiMapPin className="h-4 w-4 text-muted-foreground" aria-hidden />
            <span className="text-sm text-muted-foreground">Enter location or use GPS</span>
          </div>
        </div>

        <div className="form-field">
          <label className="label">Description</label>
          <textarea
            className="input-field min-h-[80px] resize-none text-sm text-muted-foreground"
            placeholder="Describe the issue..."
            readOnly
          />
        </div>

        <button type="button" className="btn-primary w-full py-2.5">
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
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-4 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="card p-3 text-center">
              <p className="caption">{stat.label}</p>
              <p className={cn("mt-1 headline-4", stat.color)}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors"
            >
              <span
                className={cn(
                  "h-2.5 w-2.5 shrink-0 rounded-full",
                  statusColors[issue.status] ?? "bg-muted-foreground",
                )}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{issue.title}</p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground capitalize font-medium">
                {issue.status.toLowerCase()}
              </span>
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
      <div className="space-y-4 p-5">
        <span className="badge badge-primary inline-flex items-center gap-1.5">
          <FiEye className="h-3.5 w-3.5" aria-hidden />
          In Progress
        </span>

        <div className="grid grid-cols-2 gap-3">
          <div className="card p-4 text-center">
            <FiCamera className="mx-auto h-6 w-6 text-muted-foreground" aria-hidden />
            <p className="mt-2 caption">Before Photo</p>
          </div>
          <div className="card p-4 text-center">
            <FiCheckCircle className="mx-auto h-6 w-6 text-emerald-500" aria-hidden />
            <p className="mt-2 caption text-emerald-500">After Photo</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="button" className="btn-success flex-1 py-2">
            Confirm Resolution
          </button>
          <button type="button" className="btn-secondary flex-1 py-2">
            Reopen
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProductShowcaseSection() {
  return (
    <section className="page-section bg-secondary/30 border-y border-border">
      <div className="container">
        <div className="section-header-center animate-slide-up">
          <p className="caption">PRODUCT</p>
          <h2 className="mt-4 headline-2">See CivicEye in action</h2>
          <p className="mt-5 body-lg text-muted-foreground max-w-2xl mx-auto">
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

function ProductCarousel({ screens }: { screens: { label: string; node: React.ReactNode }[] }) {
  const [active, setActive] = useState(0);

  const go = (next: number) => setActive((next + screens.length) % screens.length);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % screens.length), 6000);
    return () => clearInterval(id);
  }, [screens.length]);

  return (
    <div className="mt-16 product-frame overflow-hidden animate-slide-up">
      <div className="product-frame-header">
        <span className="product-frame-dot" />
        <span className="product-frame-dot" />
        <span className="product-frame-dot" />
        <span className="ml-1 text-xs font-semibold text-muted-foreground">
          {screens[active].label}
        </span>
      </div>

      <div className="relative">
        <div className="grid aspect-video w-full place-items-center bg-gradient-to-br from-secondary/60 to-background p-4 sm:p-8">
          <div className="w-full max-w-2xl">{screens[active].node}</div>
        </div>

        <button
          type="button"
          onClick={() => go(active - 1)}
          aria-label="Previous screen"
          className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/90 text-foreground shadow-md transition-colors hover:bg-background"
        >
          <FiChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => go(active + 1)}
          aria-label="Next screen"
          className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/90 text-foreground shadow-md transition-colors hover:bg-background"
        >
          <FiChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 py-4">
        {screens.map((screen, i) => (
          <button
            key={screen.label}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show ${screen.label}`}
            aria-current={i === active}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === active ? "w-8 bg-primary" : "w-2 bg-border hover:bg-muted-foreground",
            )}
          />
        ))}
      </div>
    </div>
  );
}
