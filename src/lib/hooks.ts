import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import type { AuthSession } from "./auth";
import { useAuthState } from "./auth-store";
import { getSupabaseConfigError, isSupabaseConfigured, resolveOrganizationId } from "./env";
import { fetchNotifications, fetchUnreadCount } from "./notifications";
import {
  assignReport,
  createReport,
  deleteReport,
  fetchIssueStatusHistory,
  fetchOrganization,
  fetchReportEvidence,
  fetchReports,
  fetchStaffMembers,
  resolveReportWithEvidence,
  updateReport,
  verifyResolution,
} from "./reports";
import { fetchOrganizationSubscription } from "./subscription";
import { fetchOrganizationInvitations, fetchOrganizationMembers } from "./team";
import type {
  AppNotification,
  CreateReportInput,
  OrganizationInvitation,
  OrganizationMember,
  Profile,
  Report,
  StaffMember,
} from "./types";
import { isOrgAdmin, isStaffRole } from "./types";

const REPORTS_KEY = ["reports"] as const;
const STAFF_KEY = ["staff"] as const;
const ORG_KEY = ["organization"] as const;
const SUBSCRIPTION_KEY = ["subscription"] as const;
const HISTORY_KEY = ["issue-history"] as const;
const EVIDENCE_KEY = ["issue-evidence"] as const;
const NOTIFICATIONS_KEY = ["notifications"] as const;
const INVITATIONS_KEY = ["invitations"] as const;
const MEMBERS_KEY = ["org-members"] as const;

export function useAuth() {
  const qc = useQueryClient();
  const { status, session, user, profile } = useAuthState();
  const configured = isSupabaseConfigured();

  // Invalidate cached org-scoped data whenever the signed-in user changes so a
  // previous session's rows can never flash into the next session's views.
  const userId = user?.id ?? null;
  useEffect(() => {
    if (!userId) return;
    void qc.invalidateQueries({ queryKey: REPORTS_KEY });
    void qc.invalidateQueries({ queryKey: STAFF_KEY });
    void qc.invalidateQueries({ queryKey: SUBSCRIPTION_KEY });
    void qc.invalidateQueries({ queryKey: ORG_KEY });
    void qc.invalidateQueries({ queryKey: NOTIFICATIONS_KEY });
    void qc.invalidateQueries({ queryKey: INVITATIONS_KEY });
  }, [qc, userId]);

  return {
    session,
    user,
    profile,
    /** True while the initial session read is still in flight. */
    loading: configured ? status === "loading" : false,
    /** Session exists but the profile row has not resolved yet. */
    profileLoading: status === "authenticated" && profile === null,
    isConfigured: configured,
    configError: getSupabaseConfigError(),
  };
}

export function useReports() {
  const configured = isSupabaseConfigured();
  const configError = getSupabaseConfigError();
  const { profile } = useAuth();
  const orgId = resolveOrganizationId(profile);
  const orgConfigured = Boolean(orgId);
  const staffOrgMissing = configured && isStaffRole(profile?.role) && !orgId;
  const citizenOrgMissing = configured && !isStaffRole(profile?.role) && !orgId;

  const query = useQuery({
    queryKey: [...REPORTS_KEY, orgId],
    queryFn: () => {
      if (!orgId) {
        throw new Error(
          "Organization is not configured. Set VITE_DEFAULT_ORGANIZATION_ID in .env for citizen reporting.",
        );
      }
      return fetchReports(orgId);
    },
    enabled: configured && orgConfigured,
    refetchInterval: 30_000,
  });

  const configErrorInstance = configError ? new Error(configError) : null;

  return {
    reports: configured ? (query.data ?? []) : [],
    loading: configured && orgConfigured ? query.isLoading : false,
    error: configErrorInstance ?? query.error,
    refetch: query.refetch,
    isConfigured: configured,
    configError,
    orgId: orgId ?? null,
    orgMissing: citizenOrgMissing,
    staffOrgMissing,
  };
}

export function useOrganization(organizationId: string | null | undefined) {
  return useQuery({
    queryKey: [...ORG_KEY, organizationId],
    queryFn: () => fetchOrganization(organizationId!),
    enabled: Boolean(organizationId) && isSupabaseConfigured(),
  });
}

export function useOrganizationSubscription(organizationId: string | null | undefined) {
  return useQuery({
    queryKey: [...SUBSCRIPTION_KEY, organizationId],
    queryFn: () => fetchOrganizationSubscription(organizationId!),
    enabled: Boolean(organizationId) && isSupabaseConfigured(),
  });
}

export function useStaffMembers(organizationId: string | null | undefined) {
  return useQuery({
    queryKey: [...STAFF_KEY, organizationId],
    queryFn: () => fetchStaffMembers(organizationId!),
    enabled: Boolean(organizationId) && isSupabaseConfigured(),
  });
}

export function useIssueStatusHistory(reportId: string | null | undefined) {
  return useQuery({
    queryKey: [...HISTORY_KEY, reportId],
    queryFn: () => fetchIssueStatusHistory(reportId!),
    enabled: Boolean(reportId) && isSupabaseConfigured(),
    staleTime: 15_000,
  });
}

export function useIssueEvidence(reportId: string | null | undefined) {
  return useQuery({
    queryKey: [...EVIDENCE_KEY, reportId],
    queryFn: () => fetchReportEvidence(reportId!),
    enabled: Boolean(reportId) && isSupabaseConfigured(),
    staleTime: 15_000,
  });
}

export function useReportMutations() {
  const qc = useQueryClient();

  const invalidate = () => {
    void qc.invalidateQueries({ queryKey: REPORTS_KEY });
    void qc.invalidateQueries({ queryKey: HISTORY_KEY });
    void qc.invalidateQueries({ queryKey: EVIDENCE_KEY });
  };

  const create = useMutation({
    mutationFn: (input: CreateReportInput) => createReport(input),
    onSuccess: invalidate,
  });

  const update = useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Parameters<typeof updateReport>[1] }) =>
      updateReport(id, patch),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: deleteReport,
    onSuccess: invalidate,
  });

  const assign = useMutation({
    mutationFn: ({ reportId, assigneeId }: { reportId: string; assigneeId: string }) =>
      assignReport(reportId, assigneeId),
    onSuccess: invalidate,
  });

  const verify = useMutation({
    mutationFn: ({
      reportId,
      approved,
      notes,
    }: {
      reportId: string;
      approved: boolean;
      notes?: string;
    }) => verifyResolution(reportId, approved, notes),
    onSuccess: invalidate,
  });

  const resolveWithEvidence = useMutation({
    mutationFn: ({ reportId, file, notes }: { reportId: string; file: File; notes: string }) =>
      resolveReportWithEvidence({ reportId, file, notes }),
    onSuccess: invalidate,
  });

  return { create, update, remove, assign, verify, resolveWithEvidence };
}

export function useNotifications() {
  const { user } = useAuth();
  const configured = isSupabaseConfigured();

  const query = useQuery({
    queryKey: NOTIFICATIONS_KEY,
    queryFn: () => fetchNotifications(),
    enabled: configured && Boolean(user),
    staleTime: 30_000,
  });

  const notifications: AppNotification[] = query.data ?? [];
  return {
    notifications,
    loading: query.isLoading && Boolean(user),
    error: query.error,
    refetch: query.refetch,
    unreadCount: notifications.filter((n) => !n.readAt).length,
  };
}

export function useUnreadNotificationCount() {
  const { user } = useAuth();
  const configured = isSupabaseConfigured();

  const query = useQuery({
    queryKey: [...NOTIFICATIONS_KEY, "unread"],
    queryFn: fetchUnreadCount,
    enabled: configured && Boolean(user),
    staleTime: 30_000,
    refetchInterval: 60_000,
  });

  return query.data ?? 0;
}

export function useOrganizationMembers() {
  const { profile, user } = useAuth();
  const configured = isSupabaseConfigured();
  const enabled = configured && Boolean(user) && isOrgAdmin(profile?.role);

  return useQuery({
    queryKey: MEMBERS_KEY,
    queryFn: fetchOrganizationMembers,
    enabled,
    staleTime: 30_000,
  });
}

export function useOrganizationInvitations() {
  const { profile, user } = useAuth();
  const configured = isSupabaseConfigured();
  const enabled = configured && Boolean(user) && isOrgAdmin(profile?.role);

  return useQuery({
    queryKey: INVITATIONS_KEY,
    queryFn: fetchOrganizationInvitations,
    enabled,
    staleTime: 15_000,
  });
}

export function useTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("civiceye_theme");
    const isDark = stored ? stored === "dark" : false;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("civiceye_theme", next ? "dark" : "light");
      return next;
    });
  };

  return { dark, toggle };
}

export function useCountUp(value: number, duration = 900) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return display;
}

export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

export type {
  AuthSession,
  Profile,
  Report,
  StaffMember,
  OrganizationInvitation,
  OrganizationMember,
};
