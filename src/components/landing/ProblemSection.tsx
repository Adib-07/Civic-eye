import { Link } from "@tanstack/react-router";
import { FiArrowRight, FiCheckCircle, FiXCircle } from "react-icons/fi";

import { ProductShowcase } from "@/components/ProductShowcase";
import { FeatureSection } from "@/components/landing/FeatureSection";

export function ProblemSection() {
  return (
    <FeatureSection
      id="problem"
      label="The Problem"
      title="Operational issues shouldn't disappear into WhatsApp, email and spreadsheets."
      description="Most organizations struggle with fragmented reporting, unclear ownership, and zero SLA visibility. CivicEye brings the workflow into one operational system."
    >
      <div className="space-y-10">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
            <div className="flex items-center gap-3 text-red-600 dark:text-red-400 font-semibold text-sm">
              <FiXCircle className="h-5 w-5" />
              <span>Fragmented Operations</span>
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold mt-0.5 shrink-0">&bull;</span>
                <span>Complaints trapped in inboxes, paper logs, and messaging threads.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold mt-0.5 shrink-0">&bull;</span>
                <span>Missing photo evidence and vague location descriptions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold mt-0.5 shrink-0">&bull;</span>
                <span>Unclear ownership and no structured routing to responsible teams.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold mt-0.5 shrink-0">&bull;</span>
                <span>Slow resolution with zero SLA tracking or breach visibility.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold mt-0.5 shrink-0">&bull;</span>
                <span>No accountability &mdash; issues marked done without verification.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
              <FiCheckCircle className="h-5 w-5" />
              <span>CivicEye: One Accountable Workspace</span>
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold mt-0.5 shrink-0">&bull;</span>
                <span>Unified intake feed with structured categories and descriptions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold mt-0.5 shrink-0">&bull;</span>
                <span>Interactive map pins with mandatory photo evidence.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold mt-0.5 shrink-0">&bull;</span>
                <span>Automated SLA timers and breach alerts for assigned staff.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold mt-0.5 shrink-0">&bull;</span>
                <span>Staff sign-off plus citizen resolution verification.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-2">
          <ProductShowcase />
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 rounded-md bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary w-fit">
              Operations Interface
            </div>
            <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground">
              Designed for speed, clarity, and daily staff triage
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Filter issues by category, status, ward assignment, and SLA urgency. Your team gets
              complete context &mdash; photo, coordinates, reporter details, and audit history.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/book-demo" className="btn-primary px-4 py-2.5 text-sm">
                Book a Demo <FiArrowRight aria-hidden />
              </Link>
              <Link to="/for-organizations" className="btn-secondary px-4 py-2.5 text-sm">
                See How It Works
              </Link>
            </div>
          </div>
        </div>
      </div>
    </FeatureSection>
  );
}
