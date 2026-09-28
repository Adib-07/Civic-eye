# CivicEye — RLS verification checklist

Run after applying **all** migrations through `011_auth_and_organization_team.sql` on a
Supabase project with two test organizations (Org A, Org B).

Phase 3 checks apply after `003_rls_hardening.sql`. The team / invitation / self-heal
checks at the bottom apply after `011_auth_and_organization_team.sql`.

## Setup

1. Create Org A and Org B in `organizations` (both `public_reports = true` for citizen flow tests).
2. Create staff users: `staff_a@test.com` (Org A admin), `staff_b@test.com` (Org B admin),
   `officer_a@test.com` (Org A ward officer), `citizen@test.com` (no organization).
3. Set profiles: `organization_id`, `role`.
4. Insert one report each for Org A and Org B.

```sql
UPDATE public.profiles SET organization_id = '<org a uuid>', role = 'admin'
WHERE id = '<staff_a auth.users id>';

UPDATE public.profiles SET organization_id = '<org b uuid>', role = 'admin'
WHERE id = '<staff_b auth.users id>';
```

## Phase 3 — tenancy and role isolation

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

## Phase 11 — profiles, self-heal and invitations

### `ensure_profile()`

| Actor                | Action                          | Result                                          |
| -------------------- | ------------------------------- | ----------------------------------------------- |
| Anonymous            | `SELECT ensure_profile()`        | **DENY** (`not_authenticated`)                   |
| Citizen              | `SELECT ensure_profile()`        | ALLOW — returns own row, creating if missing     |
| Citizen              | `ensure_profile()`, role set to `admin` by a crafted arg | **DENY** — no arguments accepted; role is hardcoded to `citizen` |
| Citizen              | `INSERT` into `profiles` directly | **DENY** (explicit policy from migration 006)   |

```sql
-- Should return the caller's own row and never an org or staff role
-- for a first-time citizen.
SELECT role, organization_id FROM ensure_profile();
```

### Invitations

| Actor         | Action                                    | Result                          |
| ------------- | ----------------------------------------- | ------------------------------- |
| Anonymous     | `preview_organization_invitation('<token>')` | ALLOW — returns masked email    |
| Anonymous     | `SELECT *` from `organization_invitations`  | **DENY** (no SELECT for anon)   |
| Citizen       | `list_organization_members()`              | **DENY** (returns nothing)      |
| Officer A     | `create_organization_invitation(...)`      | **DENY** (`admin_required`)     |
| Admin A       | `create_organization_invitation(email, 'ward_officer')` | ALLOW            |
| Admin A       | `create_organization_invitation(email, 'super_admin')`  | **DENY** (`invalid_role`)       |
| Admin A       | `create_organization_invitation(email, ...)` past the plan staff limit | **DENY** (`plan_staff_limit_reached`) |
| Admin A       | `list_organization_invitations()`          | ALLOW — Org A only              |
| Admin B       | `list_organization_invitations()`          | ALLOW — Org B only, never Org A |
| Admin B       | `revoke_organization_invitation('<org a id>')` | **DENY** — no rows affected  |
| Officer A     | `UPDATE profiles SET role='admin'` on self | **DENY** (role pin in policy)   |
| Citizen       | `UPDATE profiles SET organization_id=...` on self | **DENY**               |

### Accepting an invitation

| Actor                                   | Action                                        | Result                                    |
| --------------------------------------- | --------------------------------------------- | ----------------------------------------- |
| Anonymous                               | `accept_organization_invitation(token)`       | **DENY** (`not_authenticated`)             |
| Signed in as a different email           | `accept_organization_invitation(token)`       | **DENY** (`invitation_email_mismatch`)     |
| Signed in, expired token                 | `accept_organization_invitation(token)`       | **DENY** (`invitation_expired`)            |
| Signed in, already-accepted token        | `accept_organization_invitation(token)`       | **DENY** (`invitation_not_pending`)       |
| Signed in as the invited email, valid    | `accept_organization_invitation(token)`       | ALLOW — profile gains org + role            |
| Signup with a pending invitation's email | `auth.signUp(...)`                            | ALLOW — `handle_new_user` links the org    |

The forwarded-link case is the important one: a valid token used by someone whose auth
email differs must be denied.

### Notifications

| Actor      | Action                             | Result                              |
| ---------- | ---------------------------------- | ----------------------------------- |
| Citizen A  | `SELECT` notifications             | ALLOW — own only                    |
| Citizen A  | `UPDATE notifications SET body='x'`| **DENY** — only `read_at` is granted |
| Citizen A  | `UPDATE notifications SET read_at=now()` on own row | ALLOW        |
| Citizen A  | `UPDATE notifications SET read_at=now()` on another user's row | **DENY** |

```sql
-- Should fail with a permission error naming the column
UPDATE public.notifications SET body = 'tampered' WHERE user_id = auth.uid();
```

## Result

Record pass/fail per row. Any **DENY** marked as ALLOW is a release blocker -- it means
cross-tenant or privilege-escalation access.

> The browser-side guards in `AuthGate` and `beforeLoad` are a UX layer, not the
> security boundary. Only these database checks are. A passing UI test with a failing
> row here is still a vulnerability.
