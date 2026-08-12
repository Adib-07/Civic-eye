-- Phase 6 — Staff profile RLS + subscription enforcement gaps
-- Run after 005_subscription_qa.sql

-- ---------------------------------------------------------------------------
-- Signup: never trust client metadata for role or organization
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      split_part(COALESCE(NEW.email, ''), '@', 1)
    ),
    'citizen'
  );
  RETURN NEW;
END;
$$;

-- ---------------------------------------------------------------------------
-- Profile role helpers
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.is_profile_staff_role(role TEXT)
RETURNS BOOLEAN
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT role IN ('ward_officer', 'admin', 'super_admin');
$$;

CREATE OR REPLACE FUNCTION public.admin_can_manage_profile(
  target_id UUID,
  new_organization_id UUID,
  new_role TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_org UUID;
  old_row public.profiles%ROWTYPE;
BEGIN
  admin_org := public.current_user_org_id();

  IF admin_org IS NULL OR NOT public.is_org_admin(admin_org) THEN
    RETURN FALSE;
  END IF;

  IF target_id = auth.uid() THEN
    RETURN FALSE;
  END IF;

  IF new_role NOT IN ('citizen', 'ward_officer', 'admin', 'super_admin') THEN
    RETURN FALSE;
  END IF;

  IF new_organization_id IS DISTINCT FROM admin_org THEN
    RETURN FALSE;
  END IF;

  IF new_role = 'super_admin' AND NOT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin'
  ) THEN
    RETURN FALSE;
  END IF;

  SELECT * INTO old_row FROM public.profiles WHERE id = target_id;
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;

  IF old_row.organization_id IS NOT NULL AND old_row.organization_id <> admin_org THEN
    RETURN FALSE;
  END IF;

  IF public.is_profile_staff_role(new_role) THEN
    IF NOT public.org_subscription_active(admin_org) THEN
      RETURN FALSE;
    END IF;

    IF NOT (
      old_row.organization_id = admin_org
      AND public.is_profile_staff_role(old_row.role)
    ) AND NOT public.org_can_add_staff(admin_org) THEN
      RETURN FALSE;
    END IF;
  END IF;

  RETURN TRUE;
END;
$$;

-- ---------------------------------------------------------------------------
-- profiles: admin onboarding + explicit INSERT deny
-- ---------------------------------------------------------------------------

DROP POLICY IF EXISTS "profiles_update_admin" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_authenticated" ON public.profiles;

CREATE POLICY "profiles_insert_authenticated" ON public.profiles
  FOR INSERT TO authenticated
  WITH CHECK (false);

CREATE POLICY "profiles_update_admin" ON public.profiles
  FOR UPDATE TO authenticated
  USING (
    id <> auth.uid()
    AND public.is_org_admin(public.current_user_org_id())
    AND (
      organization_id IS NULL
      OR organization_id = public.current_user_org_id()
    )
  )
  WITH CHECK (
    public.admin_can_manage_profile(id, organization_id, role)
  );

-- ---------------------------------------------------------------------------
-- Subscription gates on remaining staff write paths
-- ---------------------------------------------------------------------------

DROP POLICY IF EXISTS "reports_delete_admin" ON public.reports;

CREATE POLICY "reports_delete_admin" ON public.reports
  FOR DELETE TO authenticated
  USING (
    public.is_org_admin(organization_id)
    AND public.org_subscription_active(organization_id)
  );

DROP POLICY IF EXISTS "issue_evidence_insert" ON public.issue_evidence;

CREATE POLICY "issue_evidence_insert" ON public.issue_evidence
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.reports r
      JOIN public.organizations o ON o.id = r.organization_id
      WHERE r.id = report_id
        AND (
          (
            public.is_org_staff(r.organization_id)
            AND public.org_subscription_active(r.organization_id)
          )
          OR (
            o.public_reports = true
            AND public.org_can_create_report(r.organization_id)
          )
        )
    )
  );

DROP POLICY IF EXISTS "sla_insert_admin" ON public.sla_policies;
DROP POLICY IF EXISTS "sla_update_admin" ON public.sla_policies;
DROP POLICY IF EXISTS "sla_delete_admin" ON public.sla_policies;

CREATE POLICY "sla_insert_admin" ON public.sla_policies
  FOR INSERT TO authenticated
  WITH CHECK (
    public.is_org_admin(organization_id)
    AND public.org_subscription_active(organization_id)
  );

CREATE POLICY "sla_update_admin" ON public.sla_policies
  FOR UPDATE TO authenticated
  USING (
    public.is_org_admin(organization_id)
    AND public.org_subscription_active(organization_id)
  )
  WITH CHECK (
    public.is_org_admin(organization_id)
    AND public.org_subscription_active(organization_id)
  );

CREATE POLICY "sla_delete_admin" ON public.sla_policies
  FOR DELETE TO authenticated
  USING (
    public.is_org_admin(organization_id)
    AND public.org_subscription_active(organization_id)
  );

DROP POLICY IF EXISTS "departments_update_admin" ON public.departments;
DROP POLICY IF EXISTS "departments_delete_admin" ON public.departments;

CREATE POLICY "departments_update_admin" ON public.departments
  FOR UPDATE TO authenticated
  USING (
    public.is_org_admin(organization_id)
    AND public.org_subscription_active(organization_id)
  )
  WITH CHECK (
    public.is_org_admin(organization_id)
    AND public.org_subscription_active(organization_id)
  );

CREATE POLICY "departments_delete_admin" ON public.departments
  FOR DELETE TO authenticated
  USING (
    public.is_org_admin(organization_id)
    AND public.org_subscription_active(organization_id)
  );

DROP POLICY IF EXISTS "wards_insert_admin" ON public.wards;
DROP POLICY IF EXISTS "wards_update_admin" ON public.wards;
DROP POLICY IF EXISTS "wards_delete_admin" ON public.wards;

CREATE POLICY "wards_insert_admin" ON public.wards
  FOR INSERT TO authenticated
  WITH CHECK (
    public.is_org_admin(organization_id)
    AND public.org_subscription_active(organization_id)
  );

CREATE POLICY "wards_update_admin" ON public.wards
  FOR UPDATE TO authenticated
  USING (
    public.is_org_admin(organization_id)
    AND public.org_subscription_active(organization_id)
  )
  WITH CHECK (
    public.is_org_admin(organization_id)
    AND public.org_subscription_active(organization_id)
  );

CREATE POLICY "wards_delete_admin" ON public.wards
  FOR DELETE TO authenticated
  USING (
    public.is_org_admin(organization_id)
    AND public.org_subscription_active(organization_id)
  );

DROP POLICY IF EXISTS "report_images_insert_anon" ON storage.objects;
DROP POLICY IF EXISTS "report_images_insert_authenticated" ON storage.objects;

CREATE POLICY "report_images_insert_anon" ON storage.objects
  FOR INSERT TO anon
  WITH CHECK (
    bucket_id = 'report-images'
    AND public.org_can_create_report(public.storage_path_org_id(name))
    AND EXISTS (
      SELECT 1 FROM public.organizations o
      WHERE o.id = public.storage_path_org_id(name) AND o.public_reports = true
    )
  );

CREATE POLICY "report_images_insert_authenticated" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'report-images'
    AND (
      (
        public.is_org_staff(public.storage_path_org_id(name))
        AND public.org_subscription_active(public.storage_path_org_id(name))
      )
      OR (
        EXISTS (
          SELECT 1 FROM public.organizations o
          WHERE o.id = public.storage_path_org_id(name) AND o.public_reports = true
        )
        AND public.org_can_create_report(public.storage_path_org_id(name))
      )
    )
  );

DROP POLICY IF EXISTS "report_images_delete_admin" ON storage.objects;

CREATE POLICY "report_images_delete_admin" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'report-images'
    AND public.is_org_admin(public.storage_path_org_id(name))
    AND public.org_subscription_active(public.storage_path_org_id(name))
  );
