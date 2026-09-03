-- Phase 1 — Demo request submissions
-- Table for storing demo request forms from book-demo.tsx

CREATE TABLE IF NOT EXISTS public.demo_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  work_email TEXT NOT NULL,
  organization TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

comment on table public.demo_requests is ' Stores demo request submissions from the book a demo form ';
comment on column public.demo_requests.full_name is 'Full name of the requester';
comment on column public.demo_requests.work_email is 'Work email of the requester';
comment on column public.demo_requests.organization is 'Organization name';
comment on column public.demo_requests.submitted_at is 'Timestamp when the demo request was submitted';