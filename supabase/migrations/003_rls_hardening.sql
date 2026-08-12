-- CivicEye Phase 3 — RLS hardening & organization isolation
-- Replaces permissive baseline policies from 001_foundation.sql and extends 002.
-- Run after 001_foundation.sql and 002_citizen_verification.sql.

-- ---------------------------------------------------------------------------
-- Schema: public issue feed flag (preserves low-friction citizen reporting)
-- ---------------------------------------------------------------------------

ALTER TABLE public.organizations
  ADD COLUMN IF NOT EXISTS public_reports BOOLEAN NOT NULL DEFAULT true;

-- ---------------------------------------------------------------------------
-- Security helper functions (search_path locked)
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.current_user_org_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT organization_id FROM public.profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.is_org_staff(org_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
      AND organization_id = org_id
      AND role IN ('ward_officer', 'admin', 'super_admin')
  );
$$;

CREATE OR REPLACE FUNCTION public.is_org_admin(org_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
      AND organization_id = org_id
      AND role IN ('admin', 'super_admin')
  );
$$;

CREATE OR REPLACE FUNCTION public.is_any_org_staff()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
      AND organization_id IS NOT NULL
      AND role IN ('ward_officer', 'admin', 'super_admin')
  );
$$;

CREATE OR REPLACE FUNCTION public.report_belongs_to_org(report_uuid UUID, org_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.reports
    WHERE id = report_uuid AND organization_id = org_id
  );
$$;

CREATE OR REPLACE FUNCTION public.storage_path_org_id(object_name TEXT)
RETURNS UUID
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT NULLIF(split_part(object_name, '/', 1), '')::UUID;
$$;

CREATE OR REPLACE FUNCTION public.mark_sla_breaches()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.reports
  SET sla_breached = true
  WHERE sla_due_at IS NOT NULL
    AND sla_due_at < now()
    AND status NOT IN ('Verified', 'Closed')
    AND sla_breached = false;
END;
$$;

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
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(COALESCE(NEW.email, ''), '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'citizen')
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.record_issue_status_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO public.issue_status_history (report_id, from_status, to_status, changed_by)
    VALUES (NEW.id, OLD.status, NEW.status, auth.uid());
  END IF;
  RETURN NEW;
END;
$$;

-- ---------------------------------------------------------------------------
-- Drop permissive baseline policies
-- ---------------------------------------------------------------------------

DROP POLICY IF EXISTS "organizations_select" ON public.organizations;
DROP POLICY IF EXISTS "departments_select" ON public.departments;
DROP POLICY IF EXISTS "wards_select" ON public.wards;
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "sla_select" ON public.sla_policies;
DROP POLICY IF EXISTS "reports_select" ON public.reports;
DROP POLICY IF EXISTS "reports_insert" ON public.reports;
DROP POLICY IF EXISTS "reports_update_staff" ON public.reports;
DROP POLICY IF EXISTS "reports_delete_staff" ON public.reports;
DROP POLICY IF EXISTS "issue_evidence_select" ON public.issue_evidence;
DROP POLICY IF EXISTS "issue_evidence_insert" ON public.issue_evidence;
DROP POLICY IF EXISTS "issue_status_history_select" ON public.issue_status_history;
DROP POLICY IF EXISTS "verifications_select" ON public.resolution_verifications;
DROP POLICY IF EXISTS "verifications_insert" ON public.resolution_verifications;
DROP POLICY IF EXISTS "verifications_insert_citizen" ON public.resolution_verifications;
DROP POLICY IF EXISTS "reports_update_citizen_verify" ON public.reports;
DROP POLICY IF EXISTS "notifications_select_own" ON public.notifications;
DROP POLICY IF EXISTS "audit_logs_select_staff" ON public.audit_logs;

DROP POLICY IF EXISTS "report_images_public_read" ON storage.objects;
DROP POLICY IF EXISTS "report_images_insert" ON storage.objects;

UPDATE storage.buckets SET public = false WHERE id = 'report-images';

-- ---------------------------------------------------------------------------
-- organizations
-- ---------------------------------------------------------------------------

CREATE POLICY "organizations_select_staff" ON public.organizations
  FOR SELECT TO authenticated
  USING (public.is_org_staff(id));

CREATE POLICY "organizations_select_public" ON public.organizations
  FOR SELECT TO anon, authenticated
  USING (public_reports = true);

CREATE POLICY "organizations_update_admin" ON public.organizations
  FOR UPDATE TO authenticated
  USING (public.is_org_admin(id))
  WITH CHECK (public.is_org_admin(id));

-- ---------------------------------------------------------------------------
-- departments & wards (staff read; admin write)
-- ---------------------------------------------------------------------------

CREATE POLICY "departments_select_staff" ON public.departments
  FOR SELECT TO authenticated
  USING (public.is_org_staff(organization_id));

CREATE POLICY "departments_insert_admin" ON public.departments
  FOR INSERT TO authenticated
  WITH CHECK (public.is_org_admin(organization_id));

CREATE POLICY "departments_update_admin" ON public.departments
  FOR UPDATE TO authenticated
  USING (public.is_org_admin(organization_id))
  WITH CHECK (public.is_org_admin(organization_id));

CREATE POLICY "departments_delete_admin" ON public.departments
  FOR DELETE TO authenticated
  USING (public.is_org_admin(organization_id));

CREATE POLICY "wards_select_staff" ON public.wards
  FOR SELECT TO authenticated
  USING (public.is_org_staff(organization_id));

CREATE POLICY "wards_insert_admin" ON public.wards
  FOR INSERT TO authenticated
  WITH CHECK (public.is_org_admin(organization_id));

CREATE POLICY "wards_update_admin" ON public.wards
  FOR UPDATE TO authenticated
  USING (public.is_org_admin(organization_id))
  WITH CHECK (public.is_org_admin(organization_id));

CREATE POLICY "wards_delete_admin" ON public.wards
  FOR DELETE TO authenticated
  USING (public.is_org_admin(organization_id));

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------

CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT TO authenticated
  USING (id = auth.uid());

CREATE POLICY "profiles_select_staff" ON public.profiles
  FOR SELECT TO authenticated
  USING (
    organization_id IS NOT NULL
    AND organization_id = public.current_user_org_id()
    AND public.is_org_staff(organization_id)
  );

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (
    id = auth.uid()
    AND role = (SELECT p.role FROM public.profiles p WHERE p.id = auth.uid())
    AND organization_id IS NOT DISTINCT FROM (
      SELECT p.organization_id FROM public.profiles p WHERE p.id = auth.uid()
    )
  );

CREATE POLICY "profiles_update_admin" ON public.profiles
  FOR UPDATE TO authenticated
  USING (
    organization_id IS NOT NULL
    AND organization_id = public.current_user_org_id()
    AND public.is_org_admin(organization_id)
    AND id <> auth.uid()
  )
  WITH CHECK (
    organization_id = public.current_user_org_id()
    AND public.is_org_admin(organization_id)
  );

-- ---------------------------------------------------------------------------
-- sla_policies
-- ---------------------------------------------------------------------------

CREATE POLICY "sla_select_staff" ON public.sla_policies
  FOR SELECT TO authenticated
  USING (public.is_org_staff(organization_id));

CREATE POLICY "sla_insert_admin" ON public.sla_policies
  FOR INSERT TO authenticated
  WITH CHECK (public.is_org_admin(organization_id));

CREATE POLICY "sla_update_admin" ON public.sla_policies
  FOR UPDATE TO authenticated
  USING (public.is_org_admin(organization_id))
  WITH CHECK (public.is_org_admin(organization_id));

CREATE POLICY "sla_delete_admin" ON public.sla_policies
  FOR DELETE TO authenticated
  USING (public.is_org_admin(organization_id));

-- ---------------------------------------------------------------------------
-- reports (issues)
-- ---------------------------------------------------------------------------

CREATE POLICY "reports_select_staff" ON public.reports
  FOR SELECT TO authenticated
  USING (public.is_org_staff(organization_id));

CREATE POLICY "reports_select_own" ON public.reports
  FOR SELECT TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "reports_select_public_anon" ON public.reports
  FOR SELECT TO anon
  USING (
    EXISTS (
      SELECT 1 FROM public.organizations o
      WHERE o.id = organization_id AND o.public_reports = true
    )
  );

CREATE POLICY "reports_select_public_citizen" ON public.reports
  FOR SELECT TO authenticated
  USING (
    NOT public.is_any_org_staff()
    AND EXISTS (
      SELECT 1 FROM public.organizations o
      WHERE o.id = organization_id AND o.public_reports = true
    )
  );

CREATE POLICY "reports_insert_anon" ON public.reports
  FOR INSERT TO anon
  WITH CHECK (
    organization_id IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM public.organizations o
      WHERE o.id = organization_id AND o.public_reports = true
    )
  );

CREATE POLICY "reports_insert_authenticated" ON public.reports
  FOR INSERT TO authenticated
  WITH CHECK (
    organization_id IS NOT NULL
    AND (
      public.is_org_staff(organization_id)
      OR EXISTS (
        SELECT 1 FROM public.organizations o
        WHERE o.id = organization_id AND o.public_reports = true
      )
    )
  );

CREATE POLICY "reports_update_staff" ON public.reports
  FOR UPDATE TO authenticated
  USING (public.is_org_staff(organization_id))
  WITH CHECK (public.is_org_staff(organization_id));

CREATE POLICY "reports_update_citizen_verify" ON public.reports
  FOR UPDATE TO authenticated
  USING (
    status = 'Resolved'
    AND (
      created_by = auth.uid()
      OR (
        created_by IS NULL
        AND EXISTS (
          SELECT 1 FROM public.organizations o
          WHERE o.id = organization_id AND o.public_reports = true
        )
      )
    )
  )
  WITH CHECK (status IN ('Verified', 'In Progress'));

CREATE POLICY "reports_delete_admin" ON public.reports
  FOR DELETE TO authenticated
  USING (public.is_org_admin(organization_id));

-- ---------------------------------------------------------------------------
-- issue_evidence
-- ---------------------------------------------------------------------------

CREATE POLICY "issue_evidence_select_staff" ON public.issue_evidence
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.reports r
      WHERE r.id = report_id AND public.is_org_staff(r.organization_id)
    )
  );

CREATE POLICY "issue_evidence_select_public" ON public.issue_evidence
  FOR SELECT TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.reports r
      JOIN public.organizations o ON o.id = r.organization_id
      WHERE r.id = report_id AND o.public_reports = true
    )
    AND (
      auth.uid() IS NULL
      OR NOT public.is_any_org_staff()
    )
  );

CREATE POLICY "issue_evidence_insert" ON public.issue_evidence
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.reports r
      JOIN public.organizations o ON o.id = r.organization_id
      WHERE r.id = report_id
        AND (
          public.is_org_staff(r.organization_id)
          OR o.public_reports = true
        )
    )
  );

-- ---------------------------------------------------------------------------
-- issue_status_history (read staff; writes via trigger only)
-- ---------------------------------------------------------------------------

CREATE POLICY "issue_status_history_select_staff" ON public.issue_status_history
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.reports r
      WHERE r.id = report_id AND public.is_org_staff(r.organization_id)
    )
  );

-- ---------------------------------------------------------------------------
-- resolution_verifications
-- ---------------------------------------------------------------------------

CREATE POLICY "verifications_select_staff" ON public.resolution_verifications
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.reports r
      WHERE r.id = report_id AND public.is_org_staff(r.organization_id)
    )
  );

CREATE POLICY "verifications_select_own" ON public.resolution_verifications
  FOR SELECT TO authenticated
  USING (verified_by = auth.uid());

CREATE POLICY "verifications_insert_staff" ON public.resolution_verifications
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.reports r
      WHERE r.id = report_id AND public.is_org_staff(r.organization_id)
    )
  );

CREATE POLICY "verifications_insert_citizen" ON public.resolution_verifications
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.reports r
      JOIN public.organizations o ON o.id = r.organization_id
      WHERE r.id = report_id
        AND r.status = 'Resolved'
        AND (
          r.created_by = auth.uid()
          OR (r.created_by IS NULL AND o.public_reports = true)
        )
    )
  );

-- ---------------------------------------------------------------------------
-- notifications & audit_logs (read scoped; no client INSERT)
-- ---------------------------------------------------------------------------

CREATE POLICY "notifications_select_own" ON public.notifications
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid()
    OR (
      organization_id IS NOT NULL
      AND public.is_org_staff(organization_id)
      AND organization_id = public.current_user_org_id()
    )
  );

CREATE POLICY "audit_logs_select_staff" ON public.audit_logs
  FOR SELECT TO authenticated
  USING (
    organization_id IS NOT NULL
    AND organization_id = public.current_user_org_id()
    AND public.is_org_staff(organization_id)
  );

-- ---------------------------------------------------------------------------
-- Storage: report-images (private bucket, org-scoped paths)
-- Path format: {organization_id}/{filename}
-- ---------------------------------------------------------------------------

CREATE POLICY "report_images_select_staff" ON storage.objects
  FOR SELECT TO authenticated
  USING (
    bucket_id = 'report-images'
    AND public.is_org_staff(public.storage_path_org_id(name))
  );

CREATE POLICY "report_images_select_public_anon" ON storage.objects
  FOR SELECT TO anon
  USING (
    bucket_id = 'report-images'
    AND EXISTS (
      SELECT 1 FROM public.organizations o
      WHERE o.id = public.storage_path_org_id(name) AND o.public_reports = true
    )
  );

CREATE POLICY "report_images_select_public_citizen" ON storage.objects
  FOR SELECT TO authenticated
  USING (
    bucket_id = 'report-images'
    AND NOT public.is_any_org_staff()
    AND EXISTS (
      SELECT 1 FROM public.organizations o
      WHERE o.id = public.storage_path_org_id(name) AND o.public_reports = true
    )
  );

CREATE POLICY "report_images_insert_anon" ON storage.objects
  FOR INSERT TO anon
  WITH CHECK (
    bucket_id = 'report-images'
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
      public.is_org_staff(public.storage_path_org_id(name))
      OR EXISTS (
        SELECT 1 FROM public.organizations o
        WHERE o.id = public.storage_path_org_id(name) AND o.public_reports = true
      )
    )
  );

CREATE POLICY "report_images_delete_admin" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'report-images'
    AND public.is_org_admin(public.storage_path_org_id(name))
  );
