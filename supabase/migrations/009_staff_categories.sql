-- Lightweight category-based assignment suggestions.
-- Adds an optional `categories` array to profiles so a staff member can be
-- tagged with the issue categories they typically handle (e.g. Pothole, Road
-- Damage). Existing `departments` table and `department_id` fields are
-- intentionally left untouched, and the report/assign/resolve/verify workflow
-- is unchanged. The field is nullable with an empty-array default and can be
-- set directly in Supabase for the pilot (no admin UI is built for it yet).

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS categories TEXT[] DEFAULT '{}';
