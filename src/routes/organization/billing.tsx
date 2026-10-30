import { createFileRoute, Link } from "@tanstack/react-router";
import { FiArrowRight, FiCheckCircle, FiCreditCard, FiTrendingUp, FiUsers } from "react-icons/fi";

import { EmptyState, Loader, QueryError } from "@/components/EmptyState";
import { StatCard } from "@/components/StatCard";
import { useAuth, useOrganization, useOrganizationMembers, useReports } from "@/lib/hooks";
import { getDefaultOrganizationId, resolveOrganizationId } from "@/lib/env";
import { useOrganizationSubscription } from "@/lib/hooks";
import { daysUntilTrialEnd, subscriptionStatusLabel } from "@/lib/subscription";
import { getPlan, formatInr, PLANS, type PlanTier } from "@/lib/plans";
import { isOrgAdmin } from "@/lib/types";

export const Route = createFileRoute("/organization/billing")({
  head: () => ({
    meta: [{ title: "Billing & Usage — CivicEye" }],
  }),
  component: BillingPage,
});

function BillingPage() {
  const { profile } = useAuth();
  const orgId = resolveOrganizationId(profile) ?? getDefaultOrganizationId();
  const { data: org } = useOrganization(orgId);
  const { data: subscription, isLoading, error, refetch } = useOrganizationSubscription(orgId);
  const { data: members } = useOrganizationMembers();
  const { reports } = useReports();

  const admin = isOrgAdmin(profile?.role);
  const currentTier = (subscription?.planTier ?? "pilot") as PlanTier;
  const currentPlan = getPlan(currentTier);
  const staffCount = members?.length ?? 0;
  const trialDays = subscription ? daysUntilTrialEnd(subscription) : null;
  const monthCount = reports.filter(
    (r) => new Date(r.createdAt).getMonth() === new Date().getMonth(),
  ).length;

  if (isLoading) return <Loader label="Loading subscription" />;

  if (error) {
    return (
      <QueryError
        title="Could not load billing"
        message={error instanceof Error ? error.message : "Please try again."}
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <div className="space-y-6">
      {!subscription ? (
        <EmptyState
          icon={FiCreditCard}
          title="No subscription on record"
          description="This organization does not have a plan yet. Staff workflows stay read-only until one is provisioned."
          action={
            <Link to="/pricing" className="btn-primary inline-flex gap-2">
              View plans <FiArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          }
        />
      ) : (
        <>
          <div className="surface-panel p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="section-label">Current plan</p>
                <h2 className="mt-1 font-display text-2xl font-bold">{currentPlan.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {org?.name ? `${org.name} · ` : ""}
                  {subscriptionStatusLabel(subscription)}
                </p>
              </div>
              <span
                className={
                  subscription.isActive
                    ? "inline-flex items-center gap-1.5 rounded-lg border border-success/30 bg-success/10 px-3 py-1.5 text-xs font-bold text-success"
                    : "inline-flex items-center gap-1.5 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-1.5 text-xs font-bold text-destructive"
                }
              >
                {subscription.isActive && <FiCheckCircle className="h-3.5 w-3.5" aria-hidden />}
                {subscription.isActive ? "Active" : "Needs attention"}
              </span>
            </div>

            {trialDays !== null && subscription.status === "pilot" && (
              <p className="mt-4 flex items-center gap-2 rounded-xl border border-warning/30 bg-warning/10 p-3.5 text-sm text-warning">
                <FiTrendingUp className="h-4 w-4 shrink-0" aria-hidden />
                {trialDays > 0
                  ? `${trialDays} day${trialDays === 1 ? "" : "s"} left on your pilot.`
                  : "Your pilot has ended — choose a plan to keep staff workflows running."}
              </p>
            )}

            {!admin && (
              <p className="mt-4 text-sm text-muted-foreground">
                Plan changes are made by an organization admin. Ask them to update this workspace.
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard
              icon={FiUsers}
              label="Staff seats used"
              value={staffCount}
              suffix={
                currentPlan.limits.maxStaff === null
                  ? undefined
                  : ` / ${currentPlan.limits.maxStaff}`
              }
            />
            <StatCard
              icon={FiTrendingUp}
              label="Reports this month"
              value={monthCount}
              suffix={
                currentPlan.limits.maxReportsPerMonth === null
                  ? undefined
                  : ` / ${currentPlan.limits.maxReportsPerMonth}`
              }
            />
            <div className="surface-panel p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Renewal
              </p>
              <p className="mt-1 font-display text-lg font-semibold">
                {subscription.currentPeriodEnd
                  ? formatDate(subscription.currentPeriodEnd)
                  : "No renewal date"}
              </p>
            </div>
          </div>
        </>
      )}

      <section className="surface-panel p-6">
        <p className="section-label">Available plans</p>
        <h2 className="mt-1 text-sm font-semibold">Compare CivicEye plans</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((plan) => {
            const isCurrent = plan.tier === currentTier;
            return (
              <div
                key={plan.tier}
                className={
                  isCurrent
                    ? "rounded-2xl border-2 border-primary bg-primary/5 p-5"
                    : "rounded-2xl border border-border p-5"
                }
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-base font-bold">{plan.name}</h3>
                  {isCurrent && (
                    <span className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                      Current
                    </span>
                  )}
                </div>
                <p className="mt-2 font-display text-xl font-bold">
                  {formatInr(plan.monthlyPriceInr)}
                </p>
                <p className="text-xs text-muted-foreground">per month</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {plan.limits.maxStaff === null ? "Unlimited" : plan.limits.maxStaff} staff ·{" "}
                  {plan.limits.maxReportsPerMonth === null
                    ? "Unlimited"
                    : plan.limits.maxReportsPerMonth}{" "}
                  reports/month
                </p>
              </div>
            );
          })}
        </div>
        <div className="mt-5">
          <Link to="/pricing" className="btn-secondary inline-flex gap-2">
            See full plan details <FiArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </div>
  );
}

function formatDate(value: string): string {
  try {
    return new Date(value).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return value;
  }
}
