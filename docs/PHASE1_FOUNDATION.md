# CivicEye — Phase 1 Foundation

Phase 1 establishes the **technical foundation** for CivicEye B2B SaaS. It does not include auth UI, staff dashboards, or data-access layers (those are Phase 2+).

## What Phase 1 includes

| Asset                                    | Purpose                                  |
| ---------------------------------------- | ---------------------------------------- |
| `@supabase/supabase-js`                  | Browser Supabase client                  |
| `.env.example`                           | Documented env var template (no secrets) |
| `src/lib/env.ts`                         | Safe env reads, placeholder detection    |
| `src/lib/supabase.ts`                    | Singleton client init                    |
| `src/lib/database.types.ts`              | TypeScript types aligned with SQL schema |
| `supabase/migrations/001_foundation.sql` | Database schema + baseline RLS           |
| `docs/SUPABASE_SETUP.md`                 | Operator setup guide                     |
| `docs/SECURITY_PHASE3.md`                | Security hardening backlog               |

## Schema capability map

| Product concept         | Foundation support                                             |
| ----------------------- | -------------------------------------------------------------- |
| Organizations           | `organizations`                                                |
| Users / profiles        | `profiles` (+ Supabase Auth)                                   |
| Staff                   | `profiles.role`                                                |
| Departments             | `departments`                                                  |
| Issues                  | `reports` (civic issues; name kept for app compatibility)      |
| Issue assignments       | `reports.assigned_to` + timestamps                             |
| Issue status history    | `issue_status_history` (+ trigger on status change)            |
| SLA tracking            | `sla_policies`, `reports.sla_due_at`, `mark_sla_breaches()`    |
| Issue evidence / photos | `reports.image_url`, `issue_evidence`, Storage `report-images` |
| Issue verification      | `resolution_verifications`                                     |
| Reports / analytics     | Query `reports` + history (no separate analytics table yet)    |
| Notifications           | `notifications` (outbox schema only)                           |
| Audit logs              | `audit_logs` (append-only schema)                              |

## Environment variables

| Variable                       | Required            | Description                                         |
| ------------------------------ | ------------------- | --------------------------------------------------- |
| `VITE_SUPABASE_URL`            | When using Supabase | Project URL from Supabase dashboard                 |
| `VITE_SUPABASE_ANON_KEY`       | When using Supabase | Anon/public key (browser-safe; RLS enforces access) |
| `VITE_DEFAULT_ORGANIZATION_ID` | When using Supabase | UUID of the org receiving citizen reports           |

Copy `.env.example` → `.env` locally. **Never commit `.env`.**

## Offline behaviour

When Supabase env vars are absent, `isSupabaseConfigured()` returns `false`. The committed Report Issue flow (`79e1ffe`) and existing localStorage code continue to work without cloud backend.

## Next phases (not in scope here)

- **Phase 2:** Auth, data layer (`reports.ts`), hooks, staff UI
- **Phase 3:** RLS hardening, rate limits, storage policies (see `SECURITY_PHASE3.md`)

## Related docs

- [Supabase setup](./SUPABASE_SETUP.md)
- [Security Phase 3 backlog](./SECURITY_PHASE3.md)
- [Architecture overview](./CIVICEYE_ARCHITECTURE.md)
