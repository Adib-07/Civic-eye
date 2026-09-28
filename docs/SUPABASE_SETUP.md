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

## 3. Run the migrations, in order

Run **every** file in `supabase/migrations/`, in numeric order. Each one depends on the
state left by the previous.

| File | What it does |
|------|--------------|
| `001_foundation.sql` | Tables, indexes, triggers, baseline RLS, `report-images` bucket |
| `002_citizen_verification.sql` | Lets reporters verify a resolution |
| `003_rls_hardening.sql` | Replaces permissive policies with org-scoped ones |
| `004_subscriptions.sql` | Plans, subscriptions, onboarding requests, report limits |
| `005_subscription_qa.sql` | Subscription QA helpers |
| `006_staff_rls_and_subscription.sql` | Staff write paths gated on an active plan |
| `007_issue_evidence_notes.sql` | Notes on evidence records |
| `008_reopened_status.sql` | Adds the `Reopened` status |
| `009_staff_categories.sql` | Category specialisation for staff |
| `010_demo_requests.sql` | Demo request form storage |
| `011_auth_and_organization_team.sql` | **Required.** Profile self-heal, team invitations, invitation RPCs, notification read marker |

From the project root:

```sh
for f in supabase/migrations/*.sql; do psql "$DATABASE_URL" -f "$f"; done
```

Or paste each file into the Supabase **SQL Editor** in order.

> `011` is not optional. Without it, `/organization/team` and invitations do not work,
> and an account whose `profiles` row is missing cannot sign in correctly -- the client
> is not permitted to create its own profile row (that denial is deliberate, from
> migration `006`), so it has to come from the `ensure_profile()` RPC in `011`.

**No seed data is inserted by any migration.**

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

| Role           | Purpose                    |
| -------------- | -------------------------- |
| `citizen`      | Default; can submit issues |
| `ward_officer` | Assign, resolve, verify    |
| `admin`        | Org administration; can invite teammates |
| `super_admin`  | Cross-org (future)         |

Everyone after the first admin is added through the product, not SQL: sign in as the
admin, open **Organization → Team & invites**, enter their email, and copy the setup
link. When they create an account with that exact address, `handle_new_user` places
them in your organization with the role you chose.

## 7. Configure the AI assistant (optional)

The chatbot runs on a built-in CivicEye knowledge base with no configuration. To use a
real model, set a provider key in your **server** environment -- never with a `VITE_`
prefix, which would ship it to the browser:

```
OPENAI_API_KEY=sk-...
# or ANTHROPIC_API_KEY, GEMINI_API_KEY, GROQ_API_KEY
# optional: CIVICEYE_AI_MODEL=gpt-4o-mini
```

The assistant degrades to the knowledge base and labels itself honestly if a provider
is unreachable, so this is safe to leave unset in a demo.

## 8. Run the app

```sh
bun install
bun run dev
```

Without `.env`, the app uses **localStorage** offline mode. With Supabase configured, Phase 2+ layers use the cloud backend.

## Security note

Migration `003` onward is where real isolation begins, and `011` adds the team and
invitation RPCs. See [SECURITY_PHASE3.md](./SECURITY_PHASE3.md), and work through
[RLS_VERIFICATION.md](./RLS_VERIFICATION.md) against a real database before production
-- the SQL in this repository has not been executed against a live Postgres instance.

## Related

- [Phase 1 foundation overview](./PHASE1_FOUNDATION.md)
- [RLS verification checklist](./RLS_VERIFICATION.md)
- [Security overview](./SECURITY_PHASE3.md)
