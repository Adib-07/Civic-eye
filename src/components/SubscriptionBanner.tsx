import { Link } from "@tanstack/react-router";
import { FiAlertCircle, FiArrowRight } from "react-icons/fi";

import type { OrganizationSubscription } from "@/lib/subscription";
import { daysUntilTrialEnd, subscriptionStatusLabel } from "@/lib/subscription";
import { getPlan } from "@/lib/plans";

export function SubscriptionBanner({ subscription }: { subscription: OrganizationSubscription }) {
  const plan = getPlan(subscription.planTier);
  const trialDays = daysUntilTrialEnd(subscription);

  if (
    subscription.isActive &&
    subscription.status === "pilot" &&
    trialDays !== null &&
    trialDays <= 14
  ) {
    return (
      <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-warning/30 bg-warning/10 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <FiAlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-warning" aria-hidden />
          <div>
            <p className="text-sm font-bold">
              Pilot ending in {trialDays} day{trialDays === 1 ? "" : "s"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Upgrade to keep staff workflows, assignments, and reporting active for your
              organization.
            </p>
          </div>
        </div>
        <Link
          to="/pricing"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
        >
          View plans <FiArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    );
  }

  if (!subscription.isActive) {
    return (
      <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <FiAlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden />
          <div>
            <p className="text-sm font-bold">{subscriptionStatusLabel(subscription)}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Staff actions and new issue intake may be restricted. Choose a plan to restore full
              access.
            </p>
          </div>
        </div>
        <Link
          to="/start"
          search={{ plan: "community" }}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
        >
          Upgrade <FiArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    );
  }

  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-secondary/50 px-4 py-3">
      <p className="text-sm text-muted-foreground">
        <span className="font-bold text-foreground">{plan.name}</span> ·{" "}
        {subscriptionStatusLabel(subscription)}
        {plan.limits.maxReportsPerMonth !== null && (
          <span> · Up to {plan.limits.maxReportsPerMonth.toLocaleString()} issues/month</span>
        )}
      </p>
      {subscription.status === "pilot" && (
        <Link to="/pricing" className="text-xs font-bold text-primary hover:underline">
          Compare plans
        </Link>
      )}
    </div>
  );
}
