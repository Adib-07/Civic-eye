import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheck } from "react-icons/fi";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { formatInr, PLANS, SALES_EMAIL, type PlanTier } from "@/lib/plans";

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

      <main className="mx-auto w-[min(1200px,94vw)] py-12 sm:py-16">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Pricing</p>
          <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
            Plans for organizations, not citizens
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Your municipality, campus, or society subscribes. Staff operate the platform. Residents
            report issues for free. Prices below are business testing rates and can change.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((plan, i) => (
            <motion.article
              key={plan.tier}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`flex flex-col rounded-2xl border p-6 ${
                plan.highlighted
                  ? "border-primary bg-primary/5 shadow-[var(--shadow-card)]"
                  : "border-border bg-card"
              }`}
            >
              <h2 className="text-lg font-bold">{plan.name}</h2>
              <p className="mt-2 min-h-[2.5rem] text-sm text-muted-foreground">{plan.tagline}</p>
              <p className="mt-4 font-display text-3xl font-extrabold">
                {formatInr(plan.monthlyPriceInr)}
                {plan.monthlyPriceInr !== null && (
                  <span className="text-sm font-semibold text-muted-foreground">/month</span>
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
            </motion.article>
          ))}
        </div>

        <section className="mt-14 rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8">
          <h2 className="font-display text-xl font-extrabold">How billing works</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>· Organizations subscribe; citizens never pay to report an issue.</li>
            <li>· Pilot workspaces are free for 30 days with plan limits enforced.</li>
            <li>· Paid plans are activated manually until online checkout is connected.</li>
            <li>
              · No payment secrets are stored in the browser — billing runs server-side when
              enabled.
            </li>
          </ul>
          <p className="mt-4 text-sm">
            Questions?{" "}
            <a
              href={`mailto:${SALES_EMAIL}`}
              className="font-semibold text-primary hover:underline"
            >
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
  if (tier === "enterprise") {
    return (
      <a
        href={`mailto:${SALES_EMAIL}?subject=CivicEye%20Enterprise%20inquiry`}
        className={`mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold ${
          highlighted
            ? "bg-primary text-primary-foreground"
            : "border border-border bg-background hover:bg-secondary"
        }`}
      >
        {label} <FiArrowRight className="h-4 w-4" aria-hidden />
      </a>
    );
  }

  return (
    <Link
      to="/start"
      search={{ plan: tier }}
      className={`mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold ${
        highlighted || tier === "pilot"
          ? "bg-primary text-primary-foreground"
          : "border border-border bg-background hover:bg-secondary"
      }`}
    >
      {label} <FiArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  );
}
