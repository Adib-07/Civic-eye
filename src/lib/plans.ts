/**
 * CivicEye plan catalogue — single source for pricing UI.
 * DB limits in subscription_plans (004 migration) should match tier keys and limit values.
 * Change prices here without hunting through components.
 */

export type PlanTier = "pilot" | "starter" | "professional" | "enterprise";

export type SubscriptionStatus = "pilot" | "active" | "past_due" | "cancelled" | "expired";

export type PlanLimits = {
  maxStaff: number | null;
  maxReportsPerMonth: number | null;
  maxDepartments: number | null;
};

export type PlanDefinition = {
  tier: PlanTier;
  name: string;
  tagline: string;
  /** INR per month; null = custom / contact sales */
  monthlyPriceInr: number | null;
  /** Display only — annual billing not implemented yet */
  annualPriceInr: number | null;
  limits: PlanLimits;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

/** Business testing prices — not market claims. */
export const PLANS: PlanDefinition[] = [
  {
    tier: "pilot",
    name: "Pilot",
    tagline: "Evaluate CivicEye with your team at no cost",
    monthlyPriceInr: 0,
    annualPriceInr: 0,
    limits: { maxStaff: 3, maxReportsPerMonth: 50, maxDepartments: 2 },
    features: [
      "Up to 3 staff members",
      "50 issues per month",
      "2 departments",
      "Citizen reporting & map",
      "Assignment & SLA tracking",
      "30-day pilot period",
    ],
    cta: "Start pilot",
  },
  {
    tier: "starter",
    name: "Starter",
    tagline: "For small wards, campuses, and societies getting started",
    monthlyPriceInr: 2999,
    annualPriceInr: 29990,
    limits: { maxStaff: 10, maxReportsPerMonth: 500, maxDepartments: 5 },
    features: [
      "Up to 10 staff members",
      "500 issues per month",
      "5 departments",
      "Operations dashboard",
      "Resolution verification",
      "Organization data isolation",
    ],
    cta: "Get started",
  },
  {
    tier: "professional",
    name: "Professional",
    tagline: "For growing municipal and facilities teams",
    monthlyPriceInr: 7999,
    annualPriceInr: 79990,
    limits: { maxStaff: 50, maxReportsPerMonth: 5000, maxDepartments: 20 },
    features: [
      "Up to 50 staff members",
      "5,000 issues per month",
      "20 departments",
      "Priority support channel",
      "Extended retention",
      "All Starter features",
    ],
    cta: "Get started",
    highlighted: true,
  },
  {
    tier: "enterprise",
    name: "Enterprise",
    tagline: "Custom deployment for large organizations",
    monthlyPriceInr: null,
    annualPriceInr: null,
    limits: { maxStaff: null, maxReportsPerMonth: null, maxDepartments: null },
    features: [
      "Unlimited staff & issues (fair use)",
      "Custom SLA policies",
      "Dedicated onboarding",
      "Security review support",
      "Custom billing & contracts",
    ],
    cta: "Contact sales",
  },
];

export function getPlan(tier: PlanTier): PlanDefinition {
  const plan = PLANS.find((p) => p.tier === tier);
  if (!plan) throw new Error(`Unknown plan tier: ${tier}`);
  return plan;
}

export function formatInr(amount: number | null): string {
  if (amount === null) return "Custom";
  if (amount === 0) return "₹0";
  return `₹${amount.toLocaleString("en-IN")}`;
}

export const SALES_EMAIL = "sales@civiceye.in";

export const PILOT_DURATION_DAYS = 30;
