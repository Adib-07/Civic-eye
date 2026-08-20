import { Link } from "@tanstack/react-router";
import { FiArrowRight, FiCheck } from "react-icons/fi";

const TRUST_ITEMS = [
  "Database-level data isolation between organizations",
  "Role-based access enforced at the database level",
  "Secure authentication flows for staff credentials",
  "Audit history for every status change and assignment",
  "Issues scoped to your organization and role only",
  "Organization-scoped file and image storage",
];

export function TrustSection() {
  return (
    <section className="bg-background py-10 lg:py-12 border-y border-border">
      <div className="page-container">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
          <div className="flex-1 lg:max-w-md">
            <h2 className="font-display text-lg font-semibold tracking-tight">
              Built for organizational trust
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Database-level isolation and role-based access protect your data.
            </p>
          </div>

          <div className="flex-1 lg:max-w-2xl">
            <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
              {TRUST_ITEMS.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <FiCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="shrink-0">
            <Link
              to="/security"
              className="btn-secondary inline-flex items-center gap-2 px-4 py-2 text-sm"
            >
              Security Details <FiArrowRight aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
