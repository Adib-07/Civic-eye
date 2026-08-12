# CivicEye — Supabase setup

Follow these steps after Phase 1 foundation files are in the repository.

## 1. Create a Supabase project

1. Create a project at [supabase.com](https://supabase.com).
2. From **Settings → API**, copy:
   - **Project URL**
   - **anon public** key

## 2. Configure local environment

```sh
cp .env.example .env
```

Edit `.env` (never commit this file):

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...your-anon-key...
VITE_DEFAULT_ORGANIZATION_ID=
```

Leave values empty until you complete steps 3–4.

## 3. Run the foundation migration

In the Supabase **SQL Editor**, run the full contents of:

```
supabase/migrations/001_foundation.sql
```

This creates tables, indexes, triggers, baseline RLS, and the `report-images` storage bucket. **No seed data is inserted.**

## 4. Create your organization

Replace placeholders with your real municipality name and slug:

```sql
INSERT INTO public.organizations (name, slug)
VALUES ('Your Municipal Corporation', 'your-municipality')
RETURNING id;
```

Copy the returned `id` into `.env`:

```env
VITE_DEFAULT_ORGANIZATION_ID=<uuid-from-above>
```

## 5. Optional: departments, wards, SLA policies

```sql
-- Department
INSERT INTO public.departments (organization_id, name, code)
VALUES ('YOUR_ORG_UUID', 'Public Works', 'PW');

-- Ward
INSERT INTO public.wards (organization_id, name, code)
VALUES ('YOUR_ORG_UUID', 'Ward 1', 'W1');

-- SLA example
INSERT INTO public.sla_policies (organization_id, category, priority, response_hours, resolution_hours)
VALUES ('YOUR_ORG_UUID', 'Pothole', 'high', 8, 48);
```

## 6. Staff users (Phase 2)

Create users in **Authentication → Users**, then attach organization and role:

```sql
UPDATE public.profiles
SET organization_id = 'YOUR_ORG_UUID', role = 'admin'
WHERE email = 'officer@your-municipality.gov.in';
```

| Role | Purpose |
|------|---------|
| `citizen` | Default; can submit issues |
| `ward_officer` | Assign, resolve, verify |
| `admin` | Org administration |
| `super_admin` | Cross-org (future) |

## 7. Run the app

```sh
bun install
bun run dev
```

Without `.env`, the app uses **localStorage** offline mode. With Supabase configured, Phase 2+ layers use the cloud backend.

## Security note

Phase 1 RLS is a **baseline only**. See [SECURITY_PHASE3.md](./SECURITY_PHASE3.md) before production.

## Related

- [Phase 1 foundation overview](./PHASE1_FOUNDATION.md)
