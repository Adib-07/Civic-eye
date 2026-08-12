# CivicEye — Phase 3 RLS verification checklist

Run after applying `003_rls_hardening.sql` on a Supabase project with two test organizations (Org A, Org B).

## Setup

1. Create Org A and Org B in `organizations` (both `public_reports = true` for citizen flow tests).
2. Create staff users: `staff_a@test.com` (Org A admin), `staff_b@test.com` (Org B admin).
3. Set profiles: `organization_id`, `role = admin`.
4. Insert one report each for Org A and Org B.

## Expected results

| Actor                     | Action                | Target            | Result                   |
| ------------------------- | --------------------- | ----------------- | ------------------------ |
| Anonymous                 | SELECT reports        | Org A (public)    | ALLOW                    |
| Anonymous                 | SELECT reports        | Org B (public)    | ALLOW (public feed only) |
| Anonymous                 | SELECT profiles       | any               | DENY                     |
| Anonymous                 | INSERT report         | Org A             | ALLOW                    |
| Anonymous                 | INSERT report         | fake UUID         | DENY                     |
| Staff A                   | SELECT reports        | Org A             | ALLOW                    |
| Staff A                   | SELECT reports        | Org B             | **DENY**                 |
| Staff B                   | SELECT reports        | Org B             | ALLOW                    |
| Staff B                   | SELECT reports        | Org A             | **DENY**                 |
| Staff A                   | UPDATE report         | Org B issue       | **DENY**                 |
| Staff A                   | DELETE report         | Org A issue       | ALLOW (admin)            |
| Ward officer A            | DELETE report         | Org A issue       | **DENY**                 |
| Citizen (auth, non-staff) | SELECT reports        | public org feed   | ALLOW                    |
| Citizen (auth, non-staff) | SELECT departments    | any               | **DENY**                 |
| Staff A                   | SELECT storage object | Org B path        | **DENY**                 |
| Anonymous                 | SELECT storage object | Org A public path | ALLOW                    |
| Staff A                   | SELECT storage object | Org A path        | ALLOW                    |

## SQL spot checks (as authenticated user via Supabase SQL editor with JWT)

```sql
-- Should return 0 rows for cross-org staff when RLS is active:
SET request.jwt.claim.sub = '<staff_a_user_id>';
SELECT id FROM reports WHERE organization_id = '<org_b_id>';
```

## Phase 2 regression

After migration, verify: citizen report → staff inbox → assign → resolve → citizen verify → reopen.
