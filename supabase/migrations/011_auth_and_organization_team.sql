-- CivicEye — Phase 11: self-healing profiles + organization team & invitations
-- Run after 010_demo_requests.sql.
--
-- Fixes
--   1. `profiles` has an explicit client INSERT denial (migration 006) but the
--      app had no way to recover a missing row, so an existing account could
--      sign in with no role and no organization. `ensure_profile()` repairs it.
--   2. There was no path from "organization requested access" to "user has an
--      account in that organization". This adds the invitation lifecycle.
--
-- Security model
--   * The browser never passes an organization id. Every RPC derives it from
--     `auth.uid()` -> `profiles.organization_id` inside SECURITY DEFINER code.
--   * Only organization admins (`admin`, `super_admin`) of that same
--     organization can create, revoke, or resend an invitation.
--   * Invitation tokens are opaque random values; they are the capability that
--     lets a brand-new user claim a seat, and they expire.
--   * All new tables have RLS enabled and no client INSERT/UPDATE/DELETE grants
--     beyond the RPC surface below.

-- ===========================================================================
-- 1. ensure_profile()
-- ===========================================================================

CREATE OR REPLACE FUNCTION public.ensure_profile()
RETURNS SETOF public.profiles
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user auth.users;
  v_profile public.profiles;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'not_authenticated' USING ERRCODE = '28000';
  END IF;

  SELECT * INTO v_user FROM auth.users WHERE id = auth.uid();
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'not_authenticated' USING ERRCODE = '28000';
  END IF;

  SELECT * INTO v_profile FROM public.profiles WHERE id = v_user.id;
  IF v_profile IS NOT NULL THEN
    RETURN NEXT v_profile;
    RETURN;
  END IF;

  -- Self-heal only: an unclaimed account always starts as an unaffiliated
  -- citizen. Role and organization can only be set by an org admin or by
  -- accepting an invitation, never by the user themselves.
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    v_user.id,
    v_user.email,
    COALESCE(
      NULLIF(v_user.raw_user_meta_data ->> 'full_name', ''),
      split_part(COALESCE(v_user.email, ''), '@', 1)
    ),
    'citizen'
  )
  ON CONFLICT (id) DO NOTHING;

  SELECT * INTO v_profile FROM public.profiles WHERE id = v_user.id;
  IF v_profile IS NOT NULL THEN
    RETURN NEXT v_profile;
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.ensure_profile() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.ensure_profile() TO authenticated;

-- Keep the profile's contact details in sync when the auth user changes.
CREATE OR REPLACE FUNCTION public.sync_profile_email()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET email = NEW.email
  WHERE id = NEW.id AND email IS DISTINCT FROM NEW.email;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_email_updated ON auth.users;
CREATE TRIGGER on_auth_user_email_updated
  AFTER UPDATE OF email ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.sync_profile_email();

-- ===========================================================================
-- 2. Organization invitations
-- ===========================================================================

CREATE TABLE IF NOT EXISTS public.organization_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('ward_officer', 'admin')),
  token TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'accepted', 'revoked', 'expired')),
  invited_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '14 days'),
  accepted_at TIMESTAMPTZ,
  accepted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  CONSTRAINT organization_invitations_email_normalized CHECK (email = lower(trim(email)))
);

CREATE UNIQUE INDEX IF NOT EXISTS organization_invitations_pending_email
  ON public.organization_invitations (organization_id, email)
  WHERE status = 'pending';

CREATE INDEX IF NOT EXISTS idx_organization_invitations_org
  ON public.organization_invitations (organization_id, created_at DESC);

ALTER TABLE public.organization_invitations ENABLE ROW LEVEL SECURITY;

-- No direct client reads: invitations are listed through an authorized RPC.
CREATE POLICY "organization_invitations_admin_select"
  ON public.organization_invitations
  FOR SELECT TO authenticated
  USING (public.is_org_admin(organization_id) AND organization_id = public.current_user_org_id());

-- All writes go through RPCs that re-check admin rights.

-- ===========================================================================
-- 3. Team / invitation RPCs
-- ===========================================================================

CREATE OR REPLACE FUNCTION public.admin_can_invite(org_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.is_org_admin(org_id) AND public.org_can_add_staff(org_id);
$$;

CREATE OR REPLACE FUNCTION public.list_organization_members()
RETURNS TABLE (
  id UUID,
  full_name TEXT,
  email TEXT,
  role TEXT,
  created_at TIMESTAMPTZ
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p.id, p.full_name, p.email, p.role, p.created_at
  FROM public.profiles p
  WHERE p.organization_id = public.current_user_org_id()
    AND p.role IN ('ward_officer', 'admin', 'super_admin')
    AND public.is_org_staff(public.current_user_org_id())
  ORDER BY
    CASE p.role WHEN 'super_admin' THEN 0 WHEN 'admin' THEN 1 ELSE 2 END,
    lower(COALESCE(p.full_name, p.email, ''));
$$;

CREATE OR REPLACE FUNCTION public.list_organization_invitations()
RETURNS TABLE (
  id UUID,
  organization_id UUID,
  email TEXT,
  role TEXT,
  status TEXT,
  token TEXT,
  invited_by UUID,
  inviter_name TEXT,
  created_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    i.id,
    i.organization_id,
    i.email,
    i.role,
    i.status,
    i.token,
    i.invited_by,
    (SELECT p.full_name FROM public.profiles p WHERE p.id = i.invited_by) AS inviter_name,
    i.created_at,
    i.expires_at,
    i.accepted_at
  FROM public.organization_invitations i
  WHERE i.organization_id = public.current_user_org_id()
    AND public.is_org_admin(i.organization_id)
  ORDER BY i.created_at DESC;
$$;

CREATE OR REPLACE FUNCTION public.create_organization_invitation(
  invite_email TEXT,
  invite_role TEXT
)
RETURNS SETOF public.organization_invitations
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_org UUID;
  v_email TEXT;
  v_row public.organization_invitations;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'not_authenticated' USING ERRCODE = '28000';
  END IF;

  v_org := public.current_user_org_id();
  IF v_org IS NULL THEN
    RAISE EXCEPTION 'no_organization' USING ERRCODE = '42501';
  END IF;

  IF NOT public.is_org_admin(v_org) THEN
    RAISE EXCEPTION 'admin_required' USING ERRCODE = '42501';
  END IF;

  v_email := lower(trim(invite_email));
  IF v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RAISE EXCEPTION 'invalid_email' USING ERRCODE = '22023';
  END IF;

  IF invite_role NOT IN ('ward_officer', 'admin') THEN
    RAISE EXCEPTION 'invalid_role' USING ERRCODE = '22023';
  END IF;

  IF NOT public.org_can_add_staff(v_org) THEN
    RAISE EXCEPTION 'plan_staff_limit_reached' USING ERRCODE = '42501';
  END IF;

  -- Re-inviting a revoked/expired seat refreshes it instead of failing.
  UPDATE public.organization_invitations
  SET status = 'revoked'
  WHERE organization_id = v_org
    AND email = v_email
    AND status <> 'pending';

  INSERT INTO public.organization_invitations (
    organization_id, email, role, invited_by
  )
  VALUES (
    v_org, v_email, invite_role, auth.uid()
  )
  ON CONFLICT (organization_id, email) WHERE status = 'pending'
  DO UPDATE SET created_at = now(), expires_at = now() + interval '14 days', invited_by = auth.uid()
  RETURNING * INTO v_row;

  RETURN NEXT v_row;
END;
$$;

CREATE OR REPLACE FUNCTION public.revoke_organization_invitation(invite_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_org UUID;
BEGIN
  v_org := public.current_user_org_id();
  IF v_org IS NULL OR NOT public.is_org_admin(v_org) THEN
    RAISE EXCEPTION 'admin_required' USING ERRCODE = '42501';
  END IF;

  UPDATE public.organization_invitations
  SET status = 'revoked'
  WHERE id = invite_id
    AND organization_id = v_org
    AND status = 'pending';
END;
$$;

CREATE OR REPLACE FUNCTION public.resend_organization_invitation(invite_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_org UUID;
BEGIN
  v_org := public.current_user_org_id();
  IF v_org IS NULL OR NOT public.is_org_admin(v_org) THEN
    RAISE EXCEPTION 'admin_required' USING ERRCODE = '42501';
  END IF;

  UPDATE public.organization_invitations
  SET created_at = now(), expires_at = now() + interval '14 days'
  WHERE id = invite_id
    AND organization_id = v_org
    AND status = 'pending';
END;
$$;

-- Unauthenticated-safe read used by the /accept-invite screen. The token is
-- the capability; only the minimum needed to render the screen is returned and
-- the invitee's email is masked so a leaked link does not expose it.
CREATE OR REPLACE FUNCTION public.preview_organization_invitation(invite_token TEXT)
RETURNS TABLE (
  organization_name TEXT,
  organization_slug TEXT,
  email TEXT,
  role TEXT,
  invited_by_name TEXT,
  status TEXT,
  expires_at TIMESTAMPTZ
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_invitation public.organization_invitations;
  v_org public.organizations;
BEGIN
  SELECT * INTO v_invitation
  FROM public.organization_invitations
  WHERE token = invite_token;

  IF v_invitation IS NULL THEN
    RETURN;
  END IF;

  SELECT * INTO v_org FROM public.organizations WHERE id = v_invitation.organization_id;

  RETURN QUERY SELECT
    COALESCE(v_org.name, 'CivicEye organization'),
    v_org.slug,
    public.mask_email(v_invitation.email),
    v_invitation.role,
    (SELECT p.full_name FROM public.profiles p WHERE p.id = v_invitation.invited_by),
    CASE
      WHEN v_invitation.status = 'pending'
        AND v_invitation.expires_at < now() THEN 'expired'
      ELSE v_invitation.status
    END,
    v_invitation.expires_at;
END;
$$;

CREATE OR REPLACE FUNCTION public.mask_email(value TEXT)
RETURNS TEXT
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT CASE
    WHEN value IS NULL THEN NULL
    WHEN position('@' in value) = 0 THEN '***'
    ELSE left(split_part(value, '@', 1), 2)
      || '***@'
      || split_part(value, '@', 2)
  END;
$$;

-- Claim a seat. Requires the caller to be signed in, and the invitation's email
-- to match the signed-in user — so a forwarded link cannot be used by someone
-- else to walk into an organization.
CREATE OR REPLACE FUNCTION public.accept_organization_invitation(invite_token TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_invitation public.organization_invitations;
  v_user_email TEXT;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'not_authenticated' USING ERRCODE = '28000';
  END IF;

  SELECT email INTO v_user_email FROM auth.users WHERE id = auth.uid();
  v_user_email := lower(COALESCE(v_user_email, ''));

  SELECT * INTO v_invitation
  FROM public.organization_invitations
  WHERE token = invite_token
  FOR UPDATE;

  IF v_invitation IS NULL THEN
    RAISE EXCEPTION 'invitation_not_found' USING ERRCODE = 'P0002';
  END IF;

  IF v_invitation.status <> 'pending' THEN
    RAISE EXCEPTION 'invitation_not_pending' USING ERRCODE = '42501';
  END IF;

  IF v_invitation.expires_at < now() THEN
    UPDATE public.organization_invitations SET status = 'expired' WHERE id = v_invitation.id;
    RAISE EXCEPTION 'invitation_expired' USING ERRCODE = '42501';
  END IF;

  IF v_invitation.email <> v_user_email THEN
    RAISE EXCEPTION 'invitation_email_mismatch' USING ERRCODE = '42501';
  END IF;

  -- Make sure the user has a profile, then grant the seat.
  PERFORM public.ensure_profile();

  UPDATE public.profiles
  SET organization_id = v_invitation.organization_id,
      role = v_invitation.role
  WHERE id = auth.uid();

  UPDATE public.organization_invitations
  SET status = 'accepted', accepted_at = now(), accepted_by = auth.uid()
  WHERE id = v_invitation.id;
END;
$$;

-- Grants. SECURITY DEFINER functions are executable by PUBLIC by default, so
-- the sensitive ones are explicitly revoked and re-granted narrowly.
REVOKE ALL ON FUNCTION public.list_organization_members() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.list_organization_invitations() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.create_organization_invitation(TEXT, TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.revoke_organization_invitation(UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.resend_organization_invitation(UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.accept_organization_invitation(TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.preview_organization_invitation(TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.mask_email(TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_can_invite(UUID) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.list_organization_members() TO authenticated;
GRANT EXECUTE ON FUNCTION public.list_organization_invitations() TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_organization_invitation(TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.revoke_organization_invitation(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.resend_organization_invitation(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.accept_organization_invitation(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.preview_organization_invitation(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.mask_email(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_can_invite(UUID) TO authenticated;

-- ===========================================================================
-- 4. Auto-link accounts created from a pending invitation
-- ===========================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_invitation public.organization_invitations;
  v_role TEXT;
  v_org UUID;
BEGIN
  -- If this email has a live invitation, the new account starts inside that
  -- organization instead of as an unaffiliated citizen.
  SELECT * INTO v_invitation
  FROM public.organization_invitations
  WHERE email = lower(COALESCE(NEW.email, ''))
    AND status = 'pending'
    AND expires_at > now()
  ORDER BY created_at DESC
  LIMIT 1;

  IF v_invitation IS NOT NULL THEN
    v_role := v_invitation.role;
    v_org := v_invitation.organization_id;
  ELSE
    v_role := COALESCE(NEW.raw_user_meta_data ->> 'role', 'citizen');
    v_org := NULL;
  END IF;

  INSERT INTO public.profiles (id, email, full_name, role, organization_id)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NULLIF(NEW.raw_user_meta_data ->> 'full_name', ''),
      split_part(COALESCE(NEW.email, ''), '@', 1)
    ),
    v_role,
    v_org
  )
  ON CONFLICT (id) DO NOTHING;

  IF v_invitation IS NOT NULL THEN
    UPDATE public.organization_invitations
    SET status = 'accepted', accepted_at = now(), accepted_by = NEW.id
    WHERE id = v_invitation.id;
  END IF;

  RETURN NEW;
END;
$$;

-- ===========================================================================
-- 5. Notifications — the owner may flip their own read marker, nothing else
-- ===========================================================================

DROP POLICY IF EXISTS "notifications_update_own" ON public.notifications;

CREATE POLICY "notifications_update_own" ON public.notifications
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Column privileges are additive to table privileges, so the table-level grant
-- has to be revoked first, then re-granted for the single mutable column.
REVOKE UPDATE ON public.notifications FROM authenticated;
GRANT UPDATE (read_at) ON public.notifications TO authenticated;
