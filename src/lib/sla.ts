import { addHours } from "date-fns";

import type { Category, SlaPolicy } from "./types";
import { getDefaultOrganizationId } from "./env";
import { requireSupabase } from "./supabase";

export async function fetchSlaPolicy(
  organizationId: string,
  category: Category,
): Promise<SlaPolicy | null> {
  const sb = requireSupabase();
  const { data, error } = await sb
    .from("sla_policies")
    .select("id, category, priority, response_hours, resolution_hours")
    .eq("organization_id", organizationId)
    .eq("category", category)
    .order("resolution_hours", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;

  return {
    id: data.id,
    category: data.category as Category,
    priority: data.priority,
    responseHours: data.response_hours,
    resolutionHours: data.resolution_hours,
  };
}

export function computeSlaDueAt(resolutionHours: number, from: Date = new Date()): string {
  return addHours(from, resolutionHours).toISOString();
}

export async function resolveSlaDueAt(
  organizationId: string,
  category: Category,
): Promise<string | null> {
  const policy = await fetchSlaPolicy(organizationId, category);
  if (!policy) return computeSlaDueAt(72);
  return computeSlaDueAt(policy.resolutionHours);
}

export async function refreshSlaBreaches(_organizationId?: string): Promise<void> {
  const sb = requireSupabase();
  await sb.rpc("mark_sla_breaches");
}

export function isSlaBreached(report: {
  slaDueAt: string | null;
  slaBreached: boolean;
  status: string;
}): boolean {
  if (report.slaBreached) return true;
  if (!report.slaDueAt) return false;
  if (report.status === "Verified" || report.status === "Closed") return false;
  return new Date(report.slaDueAt) < new Date();
}

export function slaTimeRemaining(slaDueAt: string | null): string | null {
  if (!slaDueAt) return null;
  const diff = new Date(slaDueAt).getTime() - Date.now();
  if (diff <= 0) return "Overdue";
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 24) return `${hours}h left`;
  const days = Math.floor(hours / 24);
  return `${days}d left`;
}

export { getDefaultOrganizationId };
