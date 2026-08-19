import { Link } from "@tanstack/react-router";
import { FiArrowRight, FiCheck } from "react-icons/fi";

import { formatInr, PLANS } from "@/lib/plans";

export function LandingPricingTeaser() {
  const highlighted = PLANS.filter((p) => p.highlighted || p.tier === "pilot").slice(0, 3);

  return (
    <section className="py-16 sm:py-20">
      <div className="page-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">Pricing</p>
          <h2 className="mt-2 section-title text-2xl sm:text-3xl">
            Plans for organizations, not citizens
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Your organization subscribes. Staff operate the platform. Residents
            report issues for free. All plans include organization-scoped data isolation and
            role-based staff access.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {highlighted.map((plan) => (
            <article
              key={plan.tier}
              className={`landing-feature-card flex flex-col p-6 ${
                plan.highlighted ? "ring-1 ring-primary/25" : ""
              }`}
            >
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>
              <p className="mt-4 font-display text-2xl font-semibold tabular-nums">
                {formatInr(plan.monthlyPriceInr)}
                {plan.monthlyPriceInr !== null && (
                  <span className="text-sm font-medium text-muted-foreground">/mo</span>
                )}
              </p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-muted-foreground">
                {plan.features.slice(0, 3).map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/pricing" className="btn-secondary inline-flex px-5 py-2.5">
            View all plans <FiArrowRight aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
