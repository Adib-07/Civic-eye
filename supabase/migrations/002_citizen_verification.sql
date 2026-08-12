-- Phase 2 — allow citizens to verify resolved issues (minimal RLS addition)
-- Staff policies from 001_foundation.sql remain unchanged.

CREATE POLICY "verifications_insert_citizen" ON public.resolution_verifications
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.reports r
      WHERE r.id = report_id
        AND r.status = 'Resolved'
        AND (r.created_by = auth.uid() OR r.created_by IS NULL)
    )
  );

CREATE POLICY "reports_update_citizen_verify" ON public.reports
  FOR UPDATE TO authenticated
  USING (
    status = 'Resolved'
    AND (created_by = auth.uid() OR created_by IS NULL)
  )
  WITH CHECK (status IN ('Verified', 'In Progress'));
