import type { Database } from "./database.types";
import { getPlan, type PlanTier, type SubscriptionStatus } from "./plans";
import { getSupabase, requireSupabase } from "./supabase";

export type OrganizationSubscription = {
  id: string;
  organizationId: string;
  planTier: PlanTier;
  status: SubscriptionStatus;
  startedAt: string;
  currentPeriodEnd: string | null;
  trialEndsAt: string | null;
  billingProvider: string | null;
  isActive: boolean;
  planName: string;
};

type SubRow = Database["public"]["Tables"]["organization_subscriptions"]["Row"];

/**
 * Normalize DB tier names to frontend plan tiers.
 * Migration 004 inserts 'starter'/'professional' but plans.ts expects 'community'/'growth'.
 */
const DB_TIER_TO_FRONTEND: Record<string, PlanTier> = {
  pilot: "pilot",
  starter: "community",
  professional: "growth",
  enterprise: "enterprise",
  community: "community",
  growth: "growth",
};

function normalizePlanTier(dbTier: string): PlanTier {
  return DB_TIER_TO_FRONTEND[dbTier] ?? (dbTier as PlanTier);
}

function mapSubscription(row: SubRow): OrganizationSubscription {
  const now = Date.now();
  const trialEnd = row.trial_ends_at ? new Date(row.trial_ends_at).getTime() : null;
  const periodEnd = row.current_period_end ? new Date(row.current_period_end).getTime() : null;

  const statusActive = row.status === "pilot" || row.status === "active";
  const trialOk = row.status !== "pilot" || trialEnd === null || trialEnd > now;
  const periodOk = periodEnd === null || periodEnd > now;

  const planTier = normalizePlanTier(row.plan_tier);

  return {
    id: row.id,
    organizationId: row.organization_id,
    planTier,
    status: row.status as SubscriptionStatus,
    startedAt: row.started_at,
    currentPeriodEnd: row.current_period_end,
    trialEndsAt: row.trial_ends_at,
    billingProvider: row.billing_provider,
    isActive: statusActive && trialOk && periodOk,
    planName: getPlan(planTier).name,
  };
}

export async function fetchOrganizationSubscription(
  organizationId: string,
): Promise<OrganizationSubscription | null> {
  const sb = getSupabase();
  if (!sb) return null;

  const { data, error } = await sb
    .from("organization_subscriptions")
    .select("*")
    .eq("organization_id", organizationId)
    .maybeSingle();

  if (error || !data) return null;
  return mapSubscription(data);
}

export type OnboardingInput = {
  orgName: string;
  orgType: "municipality" | "campus" | "housing" | "facility" | "other";
  adminName: string;
  adminEmail: string;
  teamSize?: string;
  operationalArea?: string;
  selectedPlan: PlanTier;
};

/**
 * Map frontend plan tier names to DB tier names for subscription_plans FK.
 * DB migration 004 uses 'starter'/'professional'; frontend plans.ts uses 'community'/'growth'.
 */
const FRONTEND_TIER_TO_DB: Record<PlanTier, string> = {
  pilot: "pilot",
  community: "starter",
  growth: "professional",
  enterprise: "enterprise",
};

export async function submitOnboardingRequest(input: OnboardingInput): Promise<void> {
  const sb = requireSupabase();

  const { error } = await sb.from("organization_onboarding").insert({
    org_name: input.orgName.trim(),
    org_type: input.orgType,
    admin_name: input.adminName.trim(),
    admin_email: input.adminEmail.trim().toLowerCase(),
    team_size: input.teamSize?.trim() || null,
    operational_area: input.operationalArea?.trim() || null,
    selected_plan: FRONTEND_TIER_TO_DB[input.selectedPlan] ?? input.selectedPlan,
    status: "pending",
  });

  if (error) throw new Error(error.message);
}

export async function submitDemoRequest(
  fullName: string,
  workEmail: string,
  organization: string,
): Promise<void> {
  const sb = requireSupabase();

  const { error } = await sb.from("demo_requests").insert({
    full_name: fullName.trim(),
    work_email: workEmail.trim().toLowerCase(),
    organization: organization.trim(),
    submitted_at: new Date().toISOString(),
  });

  if (error) throw new Error(error.message);
}

export function subscriptionStatusLabel(sub: OrganizationSubscription): string {
  if (!sub.isActive) {
    if (sub.status === "expired" || sub.status === "cancelled") return "Subscription inactive";
    if (sub.status === "past_due") return "Payment past due";
    return "Pilot expired — upgrade to continue";
  }
  if (sub.status === "pilot") return "Pilot active";
  return `${sub.planName} plan active`;
}

export function daysUntilTrialEnd(sub: OrganizationSubscription): number | null {
  if (!sub.trialEndsAt) return null;
  const diff = new Date(sub.trialEndsAt).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
