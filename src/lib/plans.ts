/**
 * CivicEye plan catalogue — single source for pricing UI.
 * DB limits in subscription_plans (004 migration) should match tier keys and limit values.
 * Change prices here without hunting through components.
 */

export type PlanTier = "pilot" | "community" | "growth" | "enterprise";

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

/** Proposed organization pricing structure — business testing rates. */
export const PLANS: PlanDefinition[] = [
  {
    tier: "pilot",
    name: "Free Pilot",
    tagline: "30-day trial for RWAs, campuses, and facility teams",
    monthlyPriceInr: 0,
    annualPriceInr: 0,
    limits: { maxStaff: 5, maxReportsPerMonth: 100, maxDepartments: 3 },
    features: [
      "Up to 5 staff members",
      "100 issues per month",
      "Citizen reporting & live map",
      "Assignment & SLA tracking",
      "Before/After evidence capture",
      "30-day full feature pilot",
    ],
    cta: "Start Free Pilot",
  },
  {
    tier: "community",
    name: "Community",
    tagline: "Proposed tier for RWAs, housing societies, and small campuses",
    monthlyPriceInr: 3999,
    annualPriceInr: 39990,
    limits: { maxStaff: 15, maxReportsPerMonth: 1000, maxDepartments: 8 },
    features: [
      "Up to 15 staff members",
      "1,000 issues per month",
      "8 departments/wards",
      "Operations dashboard",
      "Citizen resolution verification",
      "Organization data isolation",
    ],
    cta: "Start a Pilot",
    highlighted: true,
  },
  {
    tier: "growth",
    name: "Growth",
    tagline: "Proposed tier for universities, large townships, and facility operators",
    monthlyPriceInr: 9999,
    annualPriceInr: 99990,
    limits: { maxStaff: 50, maxReportsPerMonth: 5000, maxDepartments: 25 },
    features: [
      "Up to 50 staff members",
      "5,000 issues per month",
      "25 departments",
      "Priority SLA tracking",
      "Custom SLA rules",
      "All Community features",
    ],
    cta: "Start a Pilot",
  },
  {
    tier: "enterprise",
    name: "Enterprise",
    tagline: "Custom deployment for multi-campus & large organization networks",
    monthlyPriceInr: null,
    annualPriceInr: null,
    limits: { maxStaff: null, maxReportsPerMonth: null, maxDepartments: null },
    features: [
      "Unlimited staff & issue volume",
      "Custom SLA & workflow policies",
      "Dedicated onboarding manager",
      "Security audit & review support",
      "Custom contracts & billing",
    ],
    cta: "Book a Demo",
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
