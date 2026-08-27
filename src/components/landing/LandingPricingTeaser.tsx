import { Link } from "@tanstack/react-router";
import { FiArrowRight, FiCheck } from "react-icons/fi";

import { formatInr, PLANS } from "@/lib/plans";

const DISPLAYED_PLANS = PLANS.filter((p) => p.tier !== "enterprise").slice(0, 3);

export function LandingPricingTeaser() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="page-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">Pricing</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Plans for organizations, not reporters
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
            Your organization subscribes. Staff operate the platform. Residents report issues for
            free.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {DISPLAYED_PLANS.map((plan) => (
            <article
              key={plan.tier}
              className={`landing-feature-card flex flex-col p-6 ${
                plan.highlighted ? "ring-1 ring-primary/25" : ""
              }`}
            >
              {plan.highlighted && (
                <span className="mb-2 inline-block w-fit rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>
              <p className="mt-4 font-display text-3xl font-bold">
                {plan.monthlyPriceInr === 0 ? "Free" : formatInr(plan.monthlyPriceInr)}
                {plan.monthlyPriceInr !== null && plan.monthlyPriceInr !== 0 && (
                  <span className="text-sm font-medium text-muted-foreground">/mo</span>
                )}
              </p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-muted-foreground">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link
                  to="/pricing"
                  className="btn-secondary inline-flex w-full items-center justify-center gap-2 px-5 py-2.5"
                >
                  {plan.cta} <FiArrowRight aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/pricing" className="btn-secondary inline-flex items-center gap-2 px-5 py-2.5">
            View all plans <FiArrowRight aria-hidden />
          </Link>
          <p className="mt-4 text-xs text-muted-foreground">
            Pricing reflects current commercial structure.
          </p>
        </div>
      </div>
    </section>
  );
}
