import { createFileRoute, Link } from "@tanstack/react-router";
import { FiArrowRight, FiCheck } from "react-icons/fi";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { formatInr, PLANS, SALES_EMAIL, type PlanTier } from "@/lib/plans";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — CivicEye for Organizations" },
      {
        name: "description",
        content:
          "Organization-based pricing for CivicEye. Start a free pilot or choose Starter, Professional, or Enterprise plans.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="page-container py-14 sm:py-18">
        <div className="max-w-2xl">
          <p className="section-label">Pricing</p>
          <h1 className="mt-2 section-title text-3xl sm:text-4xl">
            Plans for organizations, not citizens
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Your municipality, campus, or society subscribes. Staff operate the platform. Residents
            report issues for free. All plans include organization-scoped data isolation and
            role-based staff access.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Prices shown are business testing rates and may change before general availability.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((plan) => (
            <article
              key={plan.tier}
              className={cn(
                "surface-panel flex flex-col p-6",
                plan.highlighted && "ring-1 ring-primary/30",
              )}
            >
              {plan.highlighted && (
                <span className="mb-3 inline-flex w-fit rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
                  Recommended
                </span>
              )}
              <h2 className="text-lg font-semibold">{plan.name}</h2>
              <p className="mt-2 min-h-[2.5rem] text-sm text-muted-foreground">{plan.tagline}</p>
              <p className="mt-5 font-display text-3xl font-semibold tabular-nums">
                {formatInr(plan.monthlyPriceInr)}
                {plan.monthlyPriceInr !== null && (
                  <span className="text-sm font-medium text-muted-foreground">/month</span>
                )}
              </p>
              {plan.annualPriceInr !== null && plan.annualPriceInr > 0 && (
                <p className="mt-1 text-xs text-muted-foreground">
                  or {formatInr(plan.annualPriceInr)}/year (annual billing coming soon)
                </p>
              )}

              <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <PlanCta tier={plan.tier} label={plan.cta} highlighted={plan.highlighted} />
            </article>
          ))}
        </div>

        <section className="surface-panel mt-14 p-6 sm:p-8">
          <h2 className="section-title text-xl">How billing works</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Organizations subscribe; citizens never pay to report an issue.</li>
            <li>Pilot workspaces are free for 30 days with plan limits enforced.</li>
            <li>Paid plans are activated manually until online checkout is connected.</li>
            <li>
              No payment secrets are stored in the browser — billing runs server-side when enabled.
            </li>
          </ul>
          <p className="mt-4 text-sm">
            Questions?{" "}
            <a href={`mailto:${SALES_EMAIL}`} className="font-medium text-primary hover:underline">
              {SALES_EMAIL}
            </a>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function PlanCta({
  tier,
  label,
  highlighted,
}: {
  tier: PlanTier;
  label: string;
  highlighted?: boolean;
}) {
  const className = cn(
    "mt-6 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors",
    highlighted || tier === "pilot"
      ? "bg-primary text-primary-foreground hover:bg-primary/90"
      : "border border-border bg-background hover:bg-secondary",
  );

  if (tier === "enterprise") {
    return (
      <Link to="/book-demo" className={className}>
        {label} <FiArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    );
  }

  return (
    <Link to="/start" search={{ plan: tier }} className={className}>
      {label} <FiArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  );
}
