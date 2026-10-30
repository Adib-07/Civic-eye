/**
 * Analytics integration points for CivicEye.
 *
 * This module provides a centralized API for tracking user interactions.
 * Currently a no-op — connect your analytics provider (Plausible, PostHog,
 * Mixpanel, Amplitude, etc.) by implementing the methods below.
 *
 * Usage:
 *   import { analytics } from "@/lib/analytics";
 *
 *   analytics.trackPageView("/pricing");
 *   analytics.trackEvent("cta_click", { location: "hero", label: "Book a Demo" });
 *   analytics.trackEvent("demo_form_submit", { organizationAcme });
 */

type EventPayload = Record<string, unknown>;

const noop = () => {};

export const analytics = {
  /** Track a page view. Called on route changes or explicit page loads. */
  trackPageView: (_page: string): void => {
    // TODO: Connect analytics provider
    // Examples:
    // window.plausible?.("pageview", { u: page });
    // posthog?.capture("$pageview", { $current_url: page });
  },

  /** Track a named event with optional metadata. */
  trackEvent: (_event: string, _payload?: EventPayload): void => {
    // TODO: Connect analytics provider
    // Examples:
    // window.plausible?.(event, { props: payload });
    // posthog?.capture(event, payload);
  },

  /** Track an identify call (maps anonymous visitors to known users). */
  identify: (_userId: string, _traits?: EventPayload): void => {
    // TODO: Connect analytics provider
    // Examples:
    // posthog?.identify(userId, traits);
    // window.analytics?.identify(userId, traits);
  },
};
