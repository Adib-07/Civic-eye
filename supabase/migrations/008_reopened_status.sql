-- Phase 1 — Support 'Reopened' status for citizen verification workflow

ALTER TABLE public.reports DROP CONSTRAINT IF EXISTS reports_status_check;

ALTER TABLE public.reports
  ADD CONSTRAINT reports_status_check CHECK (
    status IN ('Pending', 'In Progress', 'Resolved', 'Verified', 'Closed', 'Reopened')
  );

-- Update citizen verification RLS policy to allow transitioning to 'Reopened'
DROP POLICY IF EXISTS "reports_update_citizen_verify" ON public.reports;

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
  WITH CHECK (status IN ('Verified', 'Reopened', 'In Progress'));
