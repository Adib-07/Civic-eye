# CivicEye — Security (Phase 3 complete)

Phase 3 replaces permissive baseline RLS with organization-scoped policies. See `supabase/migrations/003_rls_hardening.sql`.

## Enforced at database level

- **Organization isolation**: Staff can only read/write data where `organization_id` matches their profile.
- **Role separation**: Admins vs ward officers (delete reports, manage SLA/departments — admin only).
- **Citizen reporting**: Anon/authenticated insert allowed only for orgs with `public_reports = true`.
- **Public transparency**: Optional public issue feed per org (`organizations.public_reports`); staff never cross org boundaries even when feed is public.
- **Storage**: `report-images` bucket is private; paths scoped by `{organization_id}/…`.
- **Profile self-service**: Users cannot escalate their own role via profile update.

## Client-side (defense in depth)

- Staff queries prefer `profile.organizationId` over env default (`hooks.ts`).
- Assignment validates assignee belongs to same organization (`reports.ts`).
- Images use signed URLs (1h TTL) instead of permanent public URLs.

## Still required before production launch

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
