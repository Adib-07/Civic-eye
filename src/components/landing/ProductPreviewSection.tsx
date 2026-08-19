import { Link } from "@tanstack/react-router";
import { FiArrowRight, FiXCircle, FiCheckCircle, FiLayers } from "react-icons/fi";

import { ProductShowcase } from "@/components/ProductShowcase";
import { FeatureSection } from "@/components/landing/FeatureSection";

export function ProductPreviewSection() {
  return (
    <FeatureSection
      id="workspace"
      label="The Operational Problem"
      title="Operational problems don't disappear when they are reported."
      description="Most organizations struggle with lost emails, informal messaging threads, and zero SLA visibility. CivicEye unifies intake, routing, map tracking, and verified resolution into one operational workspace."
    >
      <div className="space-y-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-red-500/20 bg-red-950/10 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 text-red-400 font-semibold text-sm">
              <FiXCircle className="h-5 w-5" />
              <span>The Problem: Fragmented Operations</span>
            </div>
            <ul className="mt-4 space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">&bull;</span>
                Scattered complaints trapped in inboxes, paper logs, and messaging threads.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">&bull;</span>
                Missing photo evidence and vague location descriptions.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">&bull;</span>
                Unclear ownership and no structured routing to responsible teams.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">&bull;</span>
                Slow resolution times with zero SLA tracking or breach visibility.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">&bull;</span>
                No accountability — issues marked done without verification.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">&bull;</span>
                No audit trail or historical record of recurring defects.
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 text-emerald-400 font-semibold text-sm">
              <FiCheckCircle className="h-5 w-5" />
              <span>CivicEye: One Accountable Workspace</span>
            </div>
            <ul className="mt-4 space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">&bull;</span>
                Unified intake feed with structured categories and descriptions.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">&bull;</span>
                Interactive map pins with mandatory photo evidence.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">&bull;</span>
                Automated SLA timers and breach alerts for assigned staff.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">&bull;</span>
                Staff sign-off plus citizen resolution verification.
              </li>
            </ul>
          </div>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-2">
          <ProductShowcase />
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 rounded-md bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300 w-fit">
              <FiLayers className="h-3.5 w-3.5" /> Operations Interface
            </div>
            <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground">
              Designed for speed, clarity, and daily staff triage
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Filter issues instantly by category, status, ward assignment, and SLA urgency. Your
              team gets complete context — photo, coordinates, reporter details, and audit history.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/reports" className="btn-primary px-4 py-2.5 text-sm">
                Explore reports queue <FiArrowRight aria-hidden />
              </Link>
              <Link to="/dashboard" className="btn-secondary px-4 py-2.5 text-sm">
                Open dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </FeatureSection>
  );
}
