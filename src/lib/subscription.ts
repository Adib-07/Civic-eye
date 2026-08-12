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

function mapSubscription(row: SubRow): OrganizationSubscription {
  const now = Date.now();
  const trialEnd = row.trial_ends_at ? new Date(row.trial_ends_at).getTime() : null;
  const periodEnd = row.current_period_end ? new Date(row.current_period_end).getTime() : null;

  const statusActive = row.status === "pilot" || row.status === "active";
  const trialOk = row.status !== "pilot" || trialEnd === null || trialEnd > now;
  const periodOk = periodEnd === null || periodEnd > now;

  return {
    id: row.id,
    organizationId: row.organization_id,
    planTier: row.plan_tier as PlanTier,
    status: row.status as SubscriptionStatus,
    startedAt: row.started_at,
    currentPeriodEnd: row.current_period_end,
    trialEndsAt: row.trial_ends_at,
    billingProvider: row.billing_provider,
    isActive: statusActive && trialOk && periodOk,
    planName: getPlan(row.plan_tier as PlanTier).name,
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

export async function submitOnboardingRequest(input: OnboardingInput): Promise<void> {
  const sb = requireSupabase();

  const { error } = await sb.from("organization_onboarding").insert({
    org_name: input.orgName.trim(),
    org_type: input.orgType,
    admin_name: input.adminName.trim(),
    admin_email: input.adminEmail.trim().toLowerCase(),
    team_size: input.teamSize?.trim() || null,
    operational_area: input.operationalArea?.trim() || null,
    selected_plan: input.selectedPlan,
    status: "pending",
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
