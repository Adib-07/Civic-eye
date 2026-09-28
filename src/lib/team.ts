import type { Database } from "./database.types";
import { getSupabase, requireSupabase } from "./supabase";
import type {
  InvitationStatus,
  OrganizationInvitation,
  OrganizationMember,
  UserRole,
} from "./types";
import { isInvitableRole } from "./types";

type InvitationRow = {
  id: string;
  organization_id: string;
  email: string;
  role: UserRole;
  status: InvitationStatus;
  token: string;
  invited_by: string | null;
  inviter_name: string | null;
  created_at: string;
  expires_at: string;
  accepted_at: string | null;
};

function mapInvitation(row: InvitationRow): OrganizationInvitation {
  return {
    id: row.id,
    organizationId: row.organization_id,
    email: row.email,
    role: row.role,
    status: row.status,
    token: row.token,
    invitedBy: row.invited_by,
    inviterName: row.inviter_name,
    createdAt: row.created_at,
    expiresAt: row.expires_at,
    acceptedAt: row.accepted_at,
  };
}

/**
 * Organization members.
 *
 * The caller NEVER supplies the organization id — it is derived from the
 * caller's own profile inside the `list_organization_members()` RPC, so one
 * organization can never enumerate another's team.
 */
export async function fetchOrganizationMembers(): Promise<OrganizationMember[]> {
  const sb = getSupabase();
  if (!sb) return [];

  const { data, error } = await sb.rpc("list_organization_members");
  if (error) throw new Error(error.message);

  return (data ?? []).map((row) => ({
    id: row.id,
    fullName: row.full_name ?? null,
    email: row.email ?? null,
    role: row.role as UserRole,
    createdAt: row.created_at ?? null,
  }));
}

/** Pending / historic invitations for the caller's organization. */
export async function fetchOrganizationInvitations(): Promise<OrganizationInvitation[]> {
  const sb = getSupabase();
  if (!sb) return [];

  const { data, error } = await sb.rpc("list_organization_invitations");
  if (error) throw new Error(error.message);

  return (data ?? []).map((row) => mapInvitation(row as unknown as InvitationRow));
}

export type CreateInvitationInput = {
  email: string;
  role: UserRole;
};

/**
 * Invite a teammate. The organization is derived server-side from the caller's
 * profile; a non-admin call is rejected by the RPC's own authorization check.
 */
export async function createOrganizationInvitation(
  input: CreateInvitationInput,
): Promise<OrganizationInvitation> {
  const sb = requireSupabase();

  const email = input.email.trim().toLowerCase();
  if (!email || !email.includes("@")) {
    throw new Error("Enter a valid email address.");
  }
  if (!isInvitableRole(input.role)) {
    throw new Error("That role cannot be assigned to an invited teammate.");
  }

  const { data, error } = await sb.rpc("create_organization_invitation", {
    invite_email: email,
    invite_role: input.role,
  });

  if (error) throw new Error(error.message);

  const row = (Array.isArray(data) ? data[0] : data) as unknown as InvitationRow | null;
  if (!row) throw new Error("The invitation could not be created. Please try again.");
  return mapInvitation(row);
}

export async function revokeOrganizationInvitation(invitationId: string): Promise<void> {
  const sb = requireSupabase();
  const { error } = await sb.rpc("revoke_organization_invitation", {
    invite_id: invitationId,
  });
  if (error) throw new Error(error.message);
}

export async function resendOrganizationInvitation(invitationId: string): Promise<void> {
  const sb = requireSupabase();
  const { error } = await sb.rpc("resend_organization_invitation", {
    invite_id: invitationId,
  });
  if (error) throw new Error(error.message);
}

export type InvitationPreview = {
  organizationName: string;
  organizationSlug: string;
  email: string;
  role: UserRole;
  invitedByName: string | null;
  status: InvitationStatus;
  expiresAt: string;
  isExpired: boolean;
};

/**
 * Look up an invitation by its opaque token. Read-only, unauthenticated-safe:
 * the token is a capability, and the returned data is limited to what the
 * invitee must already know.
 */
export async function fetchInvitationByToken(token: string): Promise<InvitationPreview | null> {
  const sb = getSupabase();
  if (!sb) return null;
  if (!token || token.length < 16) return null;

  const { data, error } = await sb.rpc("preview_organization_invitation", {
    invite_token: token,
  });
  if (error) throw new Error(error.message);

  const row = (Array.isArray(data) ? data[0] : data) as {
    organization_name: string;
    organization_slug: string | null;
    email: string;
    role: UserRole;
    invited_by_name: string | null;
    status: InvitationStatus;
    expires_at: string;
  } | null;

  if (!row) return null;

  return {
    organizationName: row.organization_name,
    organizationSlug: row.organization_slug ?? "",
    email: row.email,
    role: row.role,
    invitedByName: row.invited_by_name,
    status: row.status,
    expiresAt: row.expires_at,
    isExpired: row.status !== "pending" || new Date(row.expires_at).getTime() < Date.now(),
  };
}

/** Claim an invitation for the currently signed-in user. */
export async function acceptOrganizationInvitation(token: string): Promise<void> {
  const sb = requireSupabase();
  const { error } = await sb.rpc("accept_organization_invitation", { invite_token: token });
  if (error) throw new Error(error.message);
}

export type { Database };
