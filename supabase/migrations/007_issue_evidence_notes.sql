-- Phase 1 — Resolution Evidence Notes
-- Adds optional notes column to issue_evidence table for staff resolution details.

ALTER TABLE public.issue_evidence
  ADD COLUMN IF NOT EXISTS notes TEXT;
