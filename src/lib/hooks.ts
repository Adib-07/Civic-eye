import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import type { AuthSession } from "./auth";
import { getCurrentSession, onAuthStateChange } from "./auth";
import { isSupabaseConfigured } from "./env";
import {
  assignReport,
  createReport,
  deleteReport,
  fetchOrganization,
  fetchReports,
  fetchStaffMembers,
  updateReport,
  verifyResolution,
} from "./reports";
import { fetchOrganizationSubscription } from "./subscription";
import { getReports as getLocalReports } from "./storage";
import type { CreateReportInput, Profile, Report, StaffMember } from "./types";
import { getDefaultOrganizationId } from "./env";

const REPORTS_KEY = ["reports"] as const;
const AUTH_KEY = ["auth"] as const;
const STAFF_KEY = ["staff"] as const;
const ORG_KEY = ["organization"] as const;
const SUBSCRIPTION_KEY = ["subscription"] as const;

export function useAuth() {
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: AUTH_KEY,
    queryFn: getCurrentSession,
    staleTime: 30_000,
    enabled: isSupabaseConfigured(),
  });

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const unsub = onAuthStateChange(() => {
      void qc.invalidateQueries({ queryKey: AUTH_KEY });
    });
    return unsub;
  }, [qc]);

  return {
    session: data ?? null,
    user: data?.user ?? null,
    profile: data?.profile ?? null,
    loading: isSupabaseConfigured() ? isLoading : false,
    isConfigured: isSupabaseConfigured(),
  };
}

export function useReports() {
  const configured = isSupabaseConfigured();
  const { profile } = useAuth();
  const orgId = profile?.organizationId ?? getDefaultOrganizationId();
  const orgConfigured = Boolean(orgId);

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

  const [localReports, setLocalReports] = useState<Report[]>([]);
  const [localLoading, setLocalLoading] = useState(!configured);

  useEffect(() => {
    if (configured) return;
    const sync = () => {
      const raw = getLocalReports();
      setLocalReports(
        raw.map((r) => ({
          id: r.id,
          organizationId: orgId ?? "local",
          wardId: null,
          title: r.title,
          description: r.description,
          category: r.category,
          location: r.location,
          lat: r.lat,
          lng: r.lng,
          image: r.image,
          status: r.status as Report["status"],
          aiCategory: r.aiCategory,
          aiConfidence: r.aiConfidence,
          createdBy: null,
          assignedTo: null,
          assignedAt: null,
          assignedBy: null,
          assigneeName: null,
          slaDueAt: null,
          slaBreached: false,
          resolvedAt: null,
          createdAt: r.createdAt,
          updatedAt: r.createdAt,
        })),
      );
      setLocalLoading(false);
    };
    sync();
    window.addEventListener("civiceye:reports", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("civiceye:reports", sync);
      window.removeEventListener("storage", sync);
    };
  }, [configured, orgId]);

  return {
    reports: configured ? (query.data ?? []) : localReports,
    loading: configured ? query.isLoading : localLoading,
    error: query.error,
    refetch: query.refetch,
    isConfigured: configured,
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

export function useReportMutations() {
  const qc = useQueryClient();

  const invalidate = () => qc.invalidateQueries({ queryKey: REPORTS_KEY });

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

  return { create, update, remove, assign, verify };
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

export type { AuthSession, Profile, Report, StaffMember };
