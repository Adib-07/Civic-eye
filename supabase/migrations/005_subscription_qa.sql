-- Phase 6 QA: guard subscription limit functions when no subscription row exists.

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
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;

  SELECT * INTO plan_row FROM public.subscription_plans WHERE tier = sub_row.plan_tier;
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;

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
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;

  SELECT * INTO plan_row FROM public.subscription_plans WHERE tier = sub_row.plan_tier;
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;

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
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;

  SELECT * INTO plan_row FROM public.subscription_plans WHERE tier = sub_row.plan_tier;
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;

  IF plan_row.max_departments IS NULL THEN
    RETURN TRUE;
  END IF;

  SELECT COUNT(*)::INT INTO dept_count
  FROM public.departments
  WHERE organization_id = org_id;

  RETURN dept_count < plan_row.max_departments;
END;
$$;
