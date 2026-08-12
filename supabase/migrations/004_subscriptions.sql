-- CivicEye Phase 5 — Organization subscriptions & plan limits
-- Run after 003_rls_hardening.sql

-- ---------------------------------------------------------------------------
-- Plan catalogue (limits enforced in DB; prices shown in src/lib/plans.ts)
-- ---------------------------------------------------------------------------

CREATE TABLE public.subscription_plans (
  tier TEXT PRIMARY KEY CHECK (tier IN ('pilot', 'starter', 'professional', 'enterprise')),
  name TEXT NOT NULL,
  max_staff INT,
  max_reports_per_month INT,
  max_departments INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.subscription_plans (tier, name, max_staff, max_reports_per_month, max_departments)
VALUES
  ('pilot', 'Pilot', 3, 50, 2),
  ('starter', 'Starter', 10, 500, 5),
  ('professional', 'Professional', 50, 5000, 20),
  ('enterprise', 'Enterprise', NULL, NULL, NULL)
ON CONFLICT (tier) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Organization subscription (one row per organization)
-- ---------------------------------------------------------------------------

CREATE TABLE public.organization_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL UNIQUE REFERENCES public.organizations(id) ON DELETE CASCADE,
  plan_tier TEXT NOT NULL DEFAULT 'pilot' REFERENCES public.subscription_plans(tier),
  status TEXT NOT NULL DEFAULT 'pilot' CHECK (
    status IN ('pilot', 'active', 'past_due', 'cancelled', 'expired')
  ),
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  current_period_end TIMESTAMPTZ,
  trial_ends_at TIMESTAMPTZ,
  billing_provider TEXT,
  billing_external_id TEXT,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_org_subscriptions_status ON public.organization_subscriptions(status);
CREATE INDEX idx_org_subscriptions_plan ON public.organization_subscriptions(plan_tier);

-- Pilot onboarding requests (no payment — manual or future provisioning)
CREATE TABLE public.organization_onboarding (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  org_name TEXT NOT NULL,
  org_type TEXT NOT NULL CHECK (
    org_type IN ('municipality', 'campus', 'housing', 'facility', 'other')
  ),
  admin_name TEXT NOT NULL,
  admin_email TEXT NOT NULL,
  team_size TEXT,
  operational_area TEXT,
  selected_plan TEXT NOT NULL DEFAULT 'pilot' REFERENCES public.subscription_plans(tier),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (
    status IN ('pending', 'approved', 'rejected')
  ),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_org_onboarding_status ON public.organization_onboarding(status);

-- Backfill pilot subscriptions for existing organizations
INSERT INTO public.organization_subscriptions (organization_id, plan_tier, status, trial_ends_at)
SELECT id, 'pilot', 'pilot', now() + interval '30 days'
FROM public.organizations
ON CONFLICT (organization_id) DO NOTHING;

-- Auto-create pilot subscription for new organizations
CREATE OR REPLACE FUNCTION public.create_pilot_subscription()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.organization_subscriptions (
    organization_id, plan_tier, status, trial_ends_at
  )
  VALUES (NEW.id, 'pilot', 'pilot', now() + interval '30 days')
  ON CONFLICT (organization_id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER organizations_create_subscription
  AFTER INSERT ON public.organizations
  FOR EACH ROW EXECUTE FUNCTION public.create_pilot_subscription();

CREATE OR REPLACE FUNCTION public.set_subscription_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER organization_subscriptions_updated_at
  BEFORE UPDATE ON public.organization_subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.set_subscription_updated_at();

-- ---------------------------------------------------------------------------
-- Limit & subscription helpers (SECURITY DEFINER, search_path locked)
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.org_subscription_active(org_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.organization_subscriptions s
    WHERE s.organization_id = org_id
      AND s.status IN ('pilot', 'active')
      AND (s.current_period_end IS NULL OR s.current_period_end > now())
      AND (
        s.status = 'active'
        OR s.trial_ends_at IS NULL
        OR s.trial_ends_at > now()
      )
  );
$$;

CREATE OR REPLACE FUNCTION public.org_can_create_report(org_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  plan_row public.subscription_plans%ROWTYPE;
  sub_row public.organization_subscriptions%ROWTYPE;
  month_count INT;
BEGIN
  IF NOT public.org_subscription_active(org_id) THEN
    RETURN FALSE;
  END IF;

  SELECT * INTO sub_row FROM public.organization_subscriptions WHERE organization_id = org_id;
  SELECT * INTO plan_row FROM public.subscription_plans WHERE tier = sub_row.plan_tier;

  IF plan_row.max_reports_per_month IS NULL THEN
    RETURN TRUE;
  END IF;

  SELECT COUNT(*)::INT INTO month_count
  FROM public.reports
  WHERE organization_id = org_id
    AND created_at >= date_trunc('month', now() AT TIME ZONE 'UTC');

  RETURN month_count < plan_row.max_reports_per_month;
END;
$$;

CREATE OR REPLACE FUNCTION public.org_can_add_staff(org_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  plan_row public.subscription_plans%ROWTYPE;
  sub_row public.organization_subscriptions%ROWTYPE;
  staff_count INT;
BEGIN
  IF NOT public.org_subscription_active(org_id) THEN
    RETURN FALSE;
  END IF;

  SELECT * INTO sub_row FROM public.organization_subscriptions WHERE organization_id = org_id;
  SELECT * INTO plan_row FROM public.subscription_plans WHERE tier = sub_row.plan_tier;

  IF plan_row.max_staff IS NULL THEN
    RETURN TRUE;
  END IF;

  SELECT COUNT(*)::INT INTO staff_count
  FROM public.profiles
  WHERE organization_id = org_id
    AND role IN ('ward_officer', 'admin', 'super_admin');

  RETURN staff_count < plan_row.max_staff;
END;
$$;

CREATE OR REPLACE FUNCTION public.org_can_add_department(org_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  plan_row public.subscription_plans%ROWTYPE;
  sub_row public.organization_subscriptions%ROWTYPE;
  dept_count INT;
BEGIN
  IF NOT public.org_subscription_active(org_id) THEN
    RETURN FALSE;
  END IF;

  SELECT * INTO sub_row FROM public.organization_subscriptions WHERE organization_id = org_id;
  SELECT * INTO plan_row FROM public.subscription_plans WHERE tier = sub_row.plan_tier;

  IF plan_row.max_departments IS NULL THEN
    RETURN TRUE;
  END IF;

  SELECT COUNT(*)::INT INTO dept_count
  FROM public.departments
  WHERE organization_id = org_id;

  RETURN dept_count < plan_row.max_departments;
END;
$$;

-- ---------------------------------------------------------------------------
-- Tighten report insert policies with subscription limits
-- ---------------------------------------------------------------------------

DROP POLICY IF EXISTS "reports_insert_anon" ON public.reports;
DROP POLICY IF EXISTS "reports_insert_authenticated" ON public.reports;

CREATE POLICY "reports_insert_anon" ON public.reports
  FOR INSERT TO anon
  WITH CHECK (
    organization_id IS NOT NULL
    AND public.org_can_create_report(organization_id)
    AND EXISTS (
      SELECT 1 FROM public.organizations o
      WHERE o.id = organization_id AND o.public_reports = true
    )
  );

CREATE POLICY "reports_insert_authenticated" ON public.reports
  FOR INSERT TO authenticated
  WITH CHECK (
    organization_id IS NOT NULL
    AND public.org_can_create_report(organization_id)
    AND (
      public.is_org_staff(organization_id)
      OR EXISTS (
        SELECT 1 FROM public.organizations o
        WHERE o.id = organization_id AND o.public_reports = true
      )
    )
  );

-- Staff updates require active subscription
DROP POLICY IF EXISTS "reports_update_staff" ON public.reports;

CREATE POLICY "reports_update_staff" ON public.reports
  FOR UPDATE TO authenticated
  USING (
    public.is_org_staff(organization_id)
    AND public.org_subscription_active(organization_id)
  )
  WITH CHECK (
    public.is_org_staff(organization_id)
    AND public.org_subscription_active(organization_id)
  );

DROP POLICY IF EXISTS "departments_insert_admin" ON public.departments;

CREATE POLICY "departments_insert_admin" ON public.departments
  FOR INSERT TO authenticated
  WITH CHECK (
    public.is_org_admin(organization_id)
    AND public.org_can_add_department(organization_id)
  );

-- ---------------------------------------------------------------------------
-- RLS for subscription tables
-- ---------------------------------------------------------------------------

ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_onboarding ENABLE ROW LEVEL SECURITY;

CREATE POLICY "subscription_plans_select_all" ON public.subscription_plans
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "org_subscriptions_select_staff" ON public.organization_subscriptions
  FOR SELECT TO authenticated
  USING (public.is_org_staff(organization_id));

CREATE POLICY "org_onboarding_insert_public" ON public.organization_onboarding
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "org_onboarding_select_staff" ON public.organization_onboarding
  FOR SELECT TO authenticated
  USING (
    organization_id IS NOT NULL
    AND public.is_org_admin(organization_id)
  );
