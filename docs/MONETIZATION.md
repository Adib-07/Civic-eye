# CivicEye — Monetization (Phase 5)

## Model

- **Paying customer:** Organization (municipality, campus, housing society, etc.)
- **Citizens:** Report issues for free — never billed
- **Plans:** Configured in `src/lib/plans.ts` (UI prices) and `subscription_plans` table (enforced limits)

## Plans

| Tier | Testing price (INR/mo) | Staff | Issues/mo | Departments |
|------|------------------------|-------|-----------|-------------|
| Pilot | ₹0 | 3 | 50 | 2 |
| Starter | ₹2,999 | 10 | 500 | 5 |
| Professional | ₹7,999 | 50 | 5,000 | 20 |
| Enterprise | Custom | Unlimited | Unlimited | Unlimited |

Change prices in `src/lib/plans.ts`. Update matching limits in `004_subscriptions.sql` or via SQL on `subscription_plans`.

## Database

- `organization_subscriptions` — one row per org (status, plan, trial dates)
- `organization_onboarding` — pilot/plan requests (no payment)
- Auto pilot subscription on org insert (30-day trial)

## Enforcement (server-side)

- `org_can_create_report()` — RLS on report INSERT
- `org_subscription_active()` — RLS on staff report UPDATE
- `org_can_add_department()` — RLS on department INSERT

## Billing provider

- Abstraction: `src/lib/billing.ts`
- Default: `none` — no checkout, manual activation
- **Never** put Stripe secret keys or service role in Vite env
- Webhooks must run server-side only

## Activation flow

1. Organization submits `/start` form → `organization_onboarding` (pending)
2. Operator creates org in Supabase + staff users
3. Update `organization_subscriptions` to `active` + paid tier when billing confirmed

## Analytics-ready fields

Query `organization_subscriptions` for pilot vs paid counts by `status` and `plan_tier`.
