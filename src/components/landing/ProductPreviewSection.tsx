import { Link } from "@tanstack/react-router";
import { FiArrowRight } from "react-icons/fi";

import { ProductShowcase } from "@/components/ProductShowcase";
import { FeatureSection } from "@/components/landing/FeatureSection";

export function ProductPreviewSection() {
  return (
    <FeatureSection
      label="Product preview"
      title="One interface for intake, triage, and resolution"
      description="Staff work from a unified operations view — reports list, map, SLA indicators, and assignment tools scoped to your organization. Explore the live app after signing in."
    >
      <div className="grid items-start gap-8 lg:grid-cols-2">
        <ProductShowcase />
        <div className="flex flex-col justify-center">
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              Filter by category, status, assignment, and SLA deadline
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              Assign ward officers and track resolution progress
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              Verify fixes before closing issues with reporters
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/reports" className="btn-primary px-4 py-2.5 text-sm">
              View reports <FiArrowRight aria-hidden />
            </Link>
            <Link to="/dashboard" className="btn-secondary px-4 py-2.5 text-sm">
              Open dashboard
            </Link>
          </div>
        </div>
      </div>
    </FeatureSection>
  );
}
