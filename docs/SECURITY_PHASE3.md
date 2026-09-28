# CivicEye — Security

Phase 3 (`003_rls_hardening.sql`) replaced permissive baseline RLS with organization-scoped
policies. Phase 11 (`011_auth_and_organization_team.sql`) added the self-healing profile
function, the team invitation lifecycle, and tighter column-level grants.

## Enforced at database level

- **Organization isolation**: Staff can only read/write data where `organization_id` matches their profile.
- **Role separation**: Admins vs ward officers (delete reports, manage SLA/departments — admin only).
- **Citizen reporting**: Anon/authenticated insert allowed only for orgs with `public_reports = true`.
- **Public transparency**: Optional public issue feed per org (`organizations.public_reports`); staff never cross org boundaries even when feed is public.
- **Storage**: `report-images` bucket is private; paths scoped by `{organization_id}/…`.
- **Profile self-service**: Users cannot escalate their own role via profile update.
- **No self-service profile creation**: `profiles` has an explicit client `INSERT` denial
  (migration 006). Rows are created by the `handle_new_user` trigger or by the
  `ensure_profile()` RPC, which hardcodes `role = 'citizen'` and takes no arguments.
- **Team invitations**: `organization_invitations` has no client write path. Creation,
  revocation, and resend go through `SECURITY DEFINER` RPCs that re-check
  `is_org_admin(current_user_org_id())` and enforce the plan staff limit.
- **Invitation tokens**: opaque, 14-day expiry, and bound to the invitee's email.
  `accept_organization_invitation` compares against `auth.users.email`, so a forwarded
  link cannot be used by a different account.
- **Unauthenticated invitation preview** returns a masked email only.
- **Column-level grants**: `notifications` has table-level `UPDATE` revoked and
  `read_at` re-granted, so a user can mark their own notification read and nothing else.
- **Function least privilege**: every `SECURITY DEFINER` function sets
  `search_path = public`, has `PUBLIC` revoked, and is granted only to `authenticated`
  (or `anon` for the invitation preview).

## Client-side (defense in depth)

These are a UX layer, not a security boundary. The database is the boundary.

- Session and role gating in `AuthGate` and route `beforeLoad` guards.
- `sanitizeRedirect` accepts only same-origin absolute paths and rejects `/login` and
  `/signup`, preventing an open-redirect loop.
- Staff queries prefer `profile.organizationId` over the env default (`hooks.ts`).
- The browser never passes an organization id to a data function.
- Assignment validates the assignee belongs to the same organization (`reports.ts`).
- Images use signed URLs (1h TTL) instead of permanent public URLs.
- AI provider keys are read in a server function from `process.env` and never reach the
  client bundle (verified by scanning built chunks for provider key names).
- Security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
  `Permissions-Policy`, HSTS) configured in `vercel.json`.

## Still required before production launch

- [ ] **Run migration 011 against a real database.** It has been authored and reviewed
      but never executed against a live Postgres instance. Verify with
      [RLS_VERIFICATION.md](./RLS_VERIFICATION.md).
- [ ] **Wire transactional email for invitations.** The app currently produces a
      copyable setup link, clearly labelled, rather than claiming to send mail.
- [ ] Rate limiting on report submission
- [ ] CAPTCHA / abuse prevention on anon insert
- [ ] MFA for admin accounts
- [ ] Disable open staff self-registration
- [ ] Service role key only on server/Edge Functions
- [ ] CSP, dependency scanning, penetration test
- [ ] Notifications/audit_logs INSERT via service role only
- [ ] GDPR export/delete workflows

## Anon key

The Supabase anon key is intended for browser use. Security depends on RLS — not key secrecy. Never expose the **service role** key.

## Verification

See [RLS_VERIFICATION.md](./RLS_VERIFICATION.md).

## Reporting vulnerabilities

Document your security contact process before public launch.
