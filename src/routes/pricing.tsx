import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FiArrowRight, FiCheck, FiHelpCircle } from "react-icons/fi";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PLANS, SALES_EMAIL, formatInr, type PlanTier } from "@/lib/plans";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — CivicEye" },
      {
        name: "description",
        content:
          "Organization-based pricing for CivicEye. Start a free pilot or choose a plan that fits your operations.",
      },
    ],
  }),
  component: PricingPage,
});

const PRICING_FAQS = [
  {
    q: "Can we start with one site?",
    a: "Yes. The Free Pilot and Community plans are designed for single-site deployments. As your operations grow, you can upgrade to handle additional sites and higher issue volumes.",
  },
  {
    q: "Can different teams use CivicEye?",
    a: "Yes. Each organization can create departments or wards, assign staff to specific areas, and manage role-based access so teams only see what they are authorized to manage.",
  },
  {
    q: "Can organizations track SLAs?",
    a: "Yes. Every plan includes SLA tracking. Higher-tier plans support custom SLA rules, priority-based timelines, and automated breach alerts for overdue issues.",
  },
  {
    q: "How does pricing depend on organization size?",
    a: "Pricing scales with staff count, issue volume, and number of departments. Enterprise plans include custom SLA policies, dedicated onboarding, and flexible billing.",
  },
  {
    q: "Is there a discount for annual billing?",
    a: "Yes. Community and Growth plans offer approximately two months free with annual billing. Enterprise billing is negotiated per contract.",
  },
  {
    q: "What happens when my pilot ends?",
    a: "At the end of the 30-day pilot, you can choose a paid plan that fits your needs. Your pilot data and configuration are preserved during the transition.",
  },
];

function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="page-container py-14 sm:py-20">
        <div className="max-w-2xl">
          <p className="section-label">Pricing</p>
          <h1 className="mt-2 section-title text-3xl sm:text-4xl">
            Plans for organizations, not reporters
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Your organization subscribes. Staff operate the platform. Residents and community
            members report issues for free. All plans include organization-scoped data isolation and
            role-based staff access.
          </p>
          <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
            Pricing shown reflects our current early-stage commercial structure. Final pricing may
            vary based on organization size, number of sites, staff users, issue volume, and
            required integrations.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {PLANS.filter((p) => p.tier !== "growth").map((plan) => (
            <PricingCard key={plan.tier} plan={plan} />
          ))}
        </div>

        <section className="surface-panel mt-14 p-6 sm:p-8">
          <h2 className="section-title text-xl">How billing works</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
              Organizations subscribe; end users never pay to report an issue.
            </li>
            <li className="flex items-start gap-2">
              <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
              The Free Pilot is available for 30 days with plan limits enforced — no credit card
              required.
            </li>
            <li className="flex items-start gap-2">
              <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
              Paid plans are activated once online checkout is connected. Until then, contact us to
              get started.
            </li>
            <li className="flex items-start gap-2">
              <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
              No payment data is stored in the browser — billing runs server-side.
            </li>
            <li className="flex items-start gap-2">
              <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
              Pricing may depend on organization size, number of sites, staff, issue volume, and
              required integrations.
            </li>
          </ul>
          <p className="mt-5 text-sm">
            Questions about pricing?{" "}
            <a href={`mailto:${SALES_EMAIL}`} className="font-medium text-primary hover:underline">
              {SALES_EMAIL}
            </a>
          </p>
        </section>

        <section className="mt-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-label">Pricing FAQ</p>
            <h2 className="mt-2 section-title text-2xl sm:text-3xl">
              Common questions about plans
            </h2>
          </div>

          <div className="mt-8 mx-auto max-w-3xl space-y-3">
            {PRICING_FAQS.map((faq, i) => (
              <PricingFaqItem key={i} faq={faq} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function PricingCard({ plan }: { plan: (typeof PLANS)[number] }) {
  return (
    <article
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
          or {formatInr(plan.annualPriceInr)}/year (annual billing)
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

function PricingFaqItem({ faq }: { faq: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="surface-panel overflow-hidden border border-border">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-foreground hover:bg-secondary/40 transition-colors"
      >
        <span className="flex items-center gap-3 pr-4">
          <FiHelpCircle className="h-4 w-4 text-primary shrink-0" />
          {faq.q}
        </span>
        <FiArrowRight
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-90",
          )}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border/50 bg-secondary/20">
          {faq.a}
        </div>
      )}
    </div>
  );
}
