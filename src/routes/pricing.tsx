import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  FiArrowRight,
  FiCheck,
  FiHelpCircle,
  FiShield,
  FiUsers,
  FiClock,
  FiTrendingUp,
  FiStar,
} from "react-icons/fi";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PLANS, SALES_EMAIL, formatInr, type PlanTier } from "@/lib/plans";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function RevealBlock({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

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

const TRUST_ITEMS = [
  { icon: FiShield, text: "Organization data isolation" },
  { icon: FiUsers, text: "Role-based access control" },
  { icon: FiClock, text: "SLA tracking on every plan" },
  { icon: FiTrendingUp, text: "Scale as you grow" },
];

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

function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* ─── Hero ─── */}
        <section className="page-hero">
          <div className="page-hero-grid" aria-hidden />
          <div className="relative z-10 container pt-24 pb-20 lg:pt-32 lg:pb-28 text-center">
            <RevealBlock>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-hero-accent">
                <FiStar className="h-3 w-3" />
                Pricing
              </span>
            </RevealBlock>

            <RevealBlock delay={100}>
              <h1 className="mt-7 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.05] max-w-4xl mx-auto">
                Plans for <span className="text-hero-accent">organizations</span>, not reporters
              </h1>
            </RevealBlock>

            <RevealBlock delay={200}>
              <p className="mt-6 text-lg text-slate-300/90 max-w-2xl mx-auto leading-relaxed">
                Your organization subscribes. Staff operate the platform. Residents and community
                members report issues for free. All plans include organization-scoped data isolation
                and role-based staff access.
              </p>
            </RevealBlock>

            <RevealBlock delay={300}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400/70">
                {TRUST_ITEMS.map((item) => (
                  <span key={item.text} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4 text-emerald-400" />
                    {item.text}
                  </span>
                ))}
              </div>
            </RevealBlock>
          </div>
        </section>

        {/* ─── Pricing Cards ─── */}
        <section className="inner-section bg-background">
          <div className="container">
            <div className="grid gap-6 lg:grid-cols-4 max-w-6xl mx-auto">
              {PLANS.map((plan, i) => (
                <RevealBlock key={plan.tier} delay={i * 100}>
                  <PricingCard plan={plan} />
                </RevealBlock>
              ))}
            </div>

            <RevealBlock delay={400}>
              <p className="mt-8 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
                Pricing shown reflects our current early-stage commercial structure. Final pricing
                may vary based on organization size, number of sites, staff users, issue volume, and
                required integrations.
              </p>
            </RevealBlock>
          </div>
        </section>

        {/* ─── How Billing Works ─── */}
        <section className="inner-section-tight bg-secondary/30 border-y border-border">
          <div className="container max-w-4xl">
            <RevealBlock>
              <div className="surface-panel p-8 sm:p-10">
                <h2 className="headline-3">How billing works</h2>
                <ul className="mt-6 space-y-4">
                  {[
                    "Organizations subscribe; end users never pay to report an issue.",
                    "The Free Pilot is available for 30 days with plan limits enforced — no credit card required.",
                    "Paid plans are activated once online checkout is connected. Until then, contact us to get started.",
                    "No payment data is stored in the browser — billing runs server-side.",
                    "Pricing may depend on organization size, number of sites, staff, issue volume, and required integrations.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <FiCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-success" />
                      <span className="body-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 body-sm">
                  Questions about pricing?{" "}
                  <a
                    href={`mailto:${SALES_EMAIL}`}
                    className="font-semibold text-primary hover:underline"
                  >
                    {SALES_EMAIL}
                  </a>
                </p>
              </div>
            </RevealBlock>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="inner-section bg-background">
          <div className="container max-w-3xl">
            <RevealBlock>
              <div className="text-center mb-12">
                <p className="caption">FAQ</p>
                <h2 className="mt-4 headline-2">Common questions about plans</h2>
              </div>
            </RevealBlock>

            <div className="space-y-3">
              {PRICING_FAQS.map((faq, i) => (
                <RevealBlock key={i} delay={i * 60}>
                  <PricingFaqItem faq={faq} />
                </RevealBlock>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="cta-banner py-20 lg:py-24 text-center">
          <div className="container relative z-10 max-w-3xl mx-auto">
            <RevealBlock>
              <h2 className="headline-2 text-white">Not sure which plan is right?</h2>
            </RevealBlock>
            <RevealBlock delay={100}>
              <p className="mt-5 body-lg text-slate-300/80 max-w-xl mx-auto">
                Talk to our team. We will help you find the plan that fits your organization's size
                and operational needs.
              </p>
            </RevealBlock>
            <RevealBlock delay={200}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link to="/book-demo" className="btn-cinematic-primary">
                  Book a Demo
                  <FiArrowRight className="h-5 w-5" />
                </Link>
                <a href={`mailto:${SALES_EMAIL}`} className="btn-cinematic-secondary">
                  Contact Sales
                </a>
              </div>
            </RevealBlock>
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
        "relative flex flex-col rounded-2xl border bg-card p-7 transition-all duration-200",
        plan.highlighted
          ? "pricing-popular border-primary"
          : "border-border hover:border-primary/30 hover:shadow-lg",
      )}
    >
      {plan.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-foreground shadow-sm">
          <FiStar className="h-3 w-3" />
          Recommended
        </span>
      )}

      <div>
        <h3 className="headline-4">{plan.name}</h3>
        <p className="mt-2 body-xs text-muted-foreground min-h-[2rem]">{plan.tagline}</p>
      </div>

      <div className="mt-6">
        <p className="font-display text-4xl font-extrabold tabular-nums tracking-tight">
          {formatInr(plan.monthlyPriceInr)}
          {plan.monthlyPriceInr !== null && plan.monthlyPriceInr > 0 && (
            <span className="text-sm font-medium text-muted-foreground ml-1">/month</span>
          )}
        </p>
        {plan.annualPriceInr !== null && plan.annualPriceInr > 0 && (
          <p className="mt-1.5 body-xs text-muted-foreground">
            or {formatInr(plan.annualPriceInr)}/year (save ~2 months)
          </p>
        )}
      </div>

      <div className="my-6 h-px bg-border" />

      <ul className="flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
            <span className="body-xs text-foreground">{f}</span>
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
    "mt-7 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all duration-200 w-full",
    highlighted
      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md hover:-translate-y-0.5"
      : "border border-border bg-background text-foreground hover:bg-secondary hover:border-primary/30 hover:-translate-y-0.5",
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
    <div className="surface-panel overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-secondary/40"
      >
        <span className="flex items-center gap-3 pr-4">
          <FiHelpCircle className="h-4 w-4 text-primary shrink-0" />
          <span className="text-sm font-semibold text-foreground">{faq.q}</span>
        </span>
        <FiArrowRight
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-90",
          )}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 body-sm text-muted-foreground leading-relaxed border-t border-border/50 bg-secondary/20">
          {faq.a}
        </div>
      )}
    </div>
  );
}
