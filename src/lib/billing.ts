/**
 * Billing provider abstraction — no secrets, no fake payments.
 * Connect Stripe or another provider server-side in a future phase.
 */

import type { PlanTier } from "./plans";

export type BillingProvider = "none" | "manual" | "stripe";

export type BillingConfig = {
  provider: BillingProvider;
  /** Public checkout enabled only when a server endpoint is configured */
  checkoutEnabled: boolean;
};

export function getBillingConfig(): BillingConfig {
  const provider = (import.meta.env.VITE_BILLING_PROVIDER as BillingProvider | undefined) ?? "none";
  return {
    provider,
    checkoutEnabled:
      provider === "stripe" && Boolean(import.meta.env.VITE_BILLING_CHECKOUT_ENABLED),
  };
}

/** Placeholder for future server-mediated checkout — never simulates success client-side. */
export async function requestCheckout(_planTier: PlanTier): Promise<void> {
  const config = getBillingConfig();
  if (!config.checkoutEnabled) {
    throw new Error(
      "Online checkout is not configured. Submit a plan request and our team will activate billing.",
    );
  }
  throw new Error("Checkout endpoint not implemented. Contact sales@civiceye.in.");
}

export type WebhookEvent = {
  type: string;
  organizationId: string;
  planTier?: PlanTier;
  externalId?: string;
};

/** Document-only — webhooks must run on server with service role, never in browser. */
export type BillingWebhookHandler = (event: WebhookEvent) => Promise<void>;
