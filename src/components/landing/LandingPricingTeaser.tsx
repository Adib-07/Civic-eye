import { Link } from "@tanstack/react-router";
import { FiArrowRight, FiCheck } from "react-icons/fi";

import { formatInr, PLANS } from "@/lib/plans";

const DISPLAYED_PLANS = PLANS.filter((p) => p.tier !== "enterprise").slice(0, 3);

export function LandingPricingTeaser() {
  return (
    <section className="page-section bg-background">
      <div className="container">
        <div className="section-header-center animate-slide-up">
          <p className="caption">Pricing</p>
          <h2 className="mt-4 headline-2">Plans for organizations, not reporters</h2>
          <p className="mt-5 body-lg text-muted-foreground max-w-2xl mx-auto">
            Your organization subscribes. Staff operate the platform. Residents report issues for
            free.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {DISPLAYED_PLANS.map((plan, index) => (
            <article
              key={plan.tier}
              className={`card card-hover-elevated flex flex-col p-7 ${plan.highlighted ? "ring-2 ring-primary/30 shadow-lg" : ""} animate-slide-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.highlighted && (
                <span className="mb-4 inline-block w-fit rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
                  Most Popular
                </span>
              )}
              <h3 className="headline-4">{plan.name}</h3>
              <p className="mt-2 body-sm text-muted-foreground">{plan.tagline}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl font-extrabold">
                  {plan.monthlyPriceInr === 0 ? "Free" : formatInr(plan.monthlyPriceInr)}
                </span>
                {plan.monthlyPriceInr !== null && plan.monthlyPriceInr !== 0 && (
                  <span className="body-sm text-muted-foreground">/month</span>
                )}
              </div>
              <ul className="mt-7 flex-1 space-y-3.5 text-sm text-muted-foreground">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <FiCheck className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden />
                    <span className="body-sm">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <Link
                  to="/pricing"
                  className="btn-secondary inline-flex w-full items-center justify-center gap-2 px-5 py-3"
                >
                  {plan.cta} <FiArrowRight aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center animate-slide-up stagger-3">
          <Link to="/pricing" className="btn-secondary inline-flex items-center gap-2 px-6 py-3">
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
