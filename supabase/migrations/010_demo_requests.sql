-- Phase 1 — Demo request submissions
-- Table for storing demo request forms from book-demo.tsx

CREATE TABLE IF NOT EXISTS public.demo_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  work_email TEXT NOT NULL,
  organization TEXT NOT NULL,
  role TEXT,
  org_type TEXT,
  site_count TEXT,
  message TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

COMMENT ON TABLE public.demo_requests IS 'Stores demo request submissions from the book a demo form';
COMMENT ON COLUMN public.demo_requests.full_name IS 'Full name of the requester';
COMMENT ON COLUMN public.demo_requests.work_email IS 'Work email of the requester';
COMMENT ON COLUMN public.demo_requests.organization IS 'Organization name';
COMMENT ON COLUMN public.demo_requests.role IS 'Job title / role of the requester';
COMMENT ON COLUMN public.demo_requests.org_type IS 'Type of organization (campus, township, etc.)';
COMMENT ON COLUMN public.demo_requests.site_count IS 'Number of sites managed';
COMMENT ON COLUMN public.demo_requests.message IS 'Optional notes, challenge description, or questions';
COMMENT ON COLUMN public.demo_requests.submitted_at IS 'Timestamp when the demo request was submitted';

CREATE INDEX IF NOT EXISTS idx_demo_requests_submitted_at ON public.demo_requests (submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_demo_requests_email ON public.demo_requests (work_email);

-- Enable RLS
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;

-- Allow public and authenticated users to submit demo requests
CREATE POLICY "demo_requests_insert_public" ON public.demo_requests
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(trim(full_name)) >= 2 AND
    char_length(trim(work_email)) >= 5 AND
    work_email LIKE '%@%.%' AND
    char_length(trim(organization)) >= 2
  );

-- Allow authenticated staff members to view demo requests
CREATE POLICY "demo_requests_select_staff" ON public.demo_requests
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role IN ('ward_officer', 'admin', 'super_admin')
    )
  );