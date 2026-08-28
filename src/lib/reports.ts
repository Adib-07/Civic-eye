import type { Database, DbReport } from "./database.types";
import { requireDefaultOrganizationId } from "./env";
import { resolveSlaDueAt, refreshSlaBreaches } from "./sla";
import { requireSupabase, getSupabase } from "./supabase";
import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  Category,
  CreateReportInput,
  IssueEvidence,
  Organization,
  Report,
  StaffMember,
  Status,
  UserRole,
} from "./types";

const SIGNED_IMAGE_TTL_SEC = 86_400;

function formatDbError(message: string, context: string): string {
  if (message.includes("row-level security") || message.includes("violates row-level security")) {
    return `${context} denied by security policy — ensure your organization has an active subscription, public_reports enabled, and your staff profile is linked to the correct organization. (${message})`;
  }
  return message;
}

function isStoragePath(value: string): boolean {
  return (
    !value.startsWith("http://") && !value.startsWith("https://") && !value.startsWith("data:")
  );
}

async function resolveImageUrl(
  sb: SupabaseClient<Database>,
  imageRef: string | null,
): Promise<string | null> {
  if (!imageRef) return null;
  if (!isStoragePath(imageRef)) return imageRef;

  const { data, error } = await sb.storage
    .from("report-images")
    .createSignedUrl(imageRef, SIGNED_IMAGE_TTL_SEC);

  if (!error && data?.signedUrl) return data.signedUrl;

  const { data: blob, error: downloadError } = await sb.storage
    .from("report-images")
    .download(imageRef);

  if (!downloadError && blob) {
    return URL.createObjectURL(blob);
  }

  return null;
}

async function resolveImageUrlMap(
  sb: SupabaseClient<Database>,
  imageRefs: (string | null)[],
): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  const storagePaths = [
    ...new Set(imageRefs.filter((r): r is string => typeof r === "string" && isStoragePath(r))),
  ];

  for (const ref of imageRefs) {
    if (ref && !isStoragePath(ref)) map.set(ref, ref);
  }

  if (!storagePaths.length) return map;

  const { data } = await sb.storage
    .from("report-images")
    .createSignedUrls(storagePaths, SIGNED_IMAGE_TTL_SEC);

  if (data) {
    for (const item of data) {
      if (item.path && item.signedUrl && !item.error) {
        map.set(item.path, item.signedUrl);
      }
    }
  }

  for (const path of storagePaths) {
    if (map.has(path)) continue;
    const url = await resolveImageUrl(sb, path);
    if (url) map.set(path, url);
  }

  return map;
}

function mapReport(row: DbReport, assigneeName?: string | null): Report {
  return {
    id: row.id,
    organizationId: row.organization_id,
    wardId: row.ward_id,
    title: row.title,
    description: row.description,
    category: row.category as Category,
    location: row.location,
    lat: row.lat,
    lng: row.lng,
    image: row.image_url,
    status: row.status as Status,
    aiCategory: (row.ai_category as Category | null) ?? null,
    aiConfidence: row.ai_confidence,
    createdBy: row.created_by,
    assignedTo: row.assigned_to,
    assignedAt: row.assigned_at,
    assignedBy: row.assigned_by,
    assigneeName: assigneeName ?? null,
    slaDueAt: row.sla_due_at,
    slaBreached: row.sla_breached,
    resolvedAt: row.resolved_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function imageExtension(file: File): string {
  if (file.type && MIME_TO_EXT[file.type]) return MIME_TO_EXT[file.type];
  const fromName = file.name.split(".").pop()?.toLowerCase();
  if (fromName && ["jpg", "jpeg", "png", "webp"].includes(fromName)) {
    return fromName === "jpeg" ? "jpg" : fromName;
  }
  return "jpg";
}

async function uploadReportImage(organizationId: string, file: File): Promise<string> {
  const sb = requireSupabase();
  const ext = imageExtension(file);
  const path = `${organizationId}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

  const { error } = await sb.storage.from("report-images").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || "image/jpeg",
  });

  if (error) throw new Error(`Image upload failed: ${error.message}`);

  return path;
}

async function removeReportImage(path: string): Promise<void> {
  const sb = requireSupabase();
  await sb.storage.from("report-images").remove([path]);
}

export async function fetchReports(organizationId?: string): Promise<Report[]> {
  const sb = requireSupabase();
  await refreshSlaBreaches(organizationId);

  let query = sb.from("reports").select("*").order("created_at", { ascending: false });

  if (organizationId) {
    query = query.eq("organization_id", organizationId);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  const reports = (data ?? []) as DbReport[];
  const assigneeIds = [...new Set(reports.map((r) => r.assigned_to).filter(Boolean))] as string[];

  let assigneeMap = new Map<string, string>();
  if (assigneeIds.length) {
    const { data: profiles, error: profileError } = await sb
      .from("profiles")
      .select("id, full_name, email")
      .in("id", assigneeIds);
    if (!profileError && profiles) {
      assigneeMap = new Map(profiles.map((p) => [p.id, p.full_name ?? p.email ?? "Staff"]));
    }
  }

  const mappedReports = reports.map((r) =>
    mapReport(r, r.assigned_to ? assigneeMap.get(r.assigned_to) : null),
  );
  const imageMap = await resolveImageUrlMap(
    sb,
    mappedReports.map((r) => r.image),
  );
  return mappedReports.map((r) => ({
    ...r,
    image: r.image ? (imageMap.get(r.image) ?? null) : null,
  }));
}

export async function createReport(input: CreateReportInput): Promise<Report> {
  const sb = requireSupabase();
  const organizationId = requireDefaultOrganizationId();

  let imageUrl: string | null = null;
  if (input.imageFile) {
    imageUrl = await uploadReportImage(organizationId, input.imageFile);
  }

  const slaDueAt = await resolveSlaDueAt(organizationId, input.category);

  const { data: sessionData } = await sb.auth.getSession();
  const userId = sessionData.session?.user?.id ?? null;

  const { data, error } = await sb
    .from("reports")
    .insert({
      organization_id: organizationId,
      ward_id: input.wardId ?? null,
      title: input.title.trim(),
      description: input.description.trim(),
      category: input.category,
      location: input.location.trim(),
      lat: input.lat,
      lng: input.lng,
      image_url: imageUrl,
      status: "Pending",
      ai_category: input.aiCategory,
      ai_confidence: input.aiConfidence,
      created_by: userId,
      sla_due_at: slaDueAt,
      sla_breached: false,
    })
    .select("*")
    .single();

  if (error || !data) {
    if (imageUrl) {
      try {
        await removeReportImage(imageUrl);
      } catch {
        /* best-effort cleanup */
      }
    }
    const message = error?.message ?? "Failed to create report";
    throw new Error(formatDbError(message, "Report submission"));
  }
  const row = data as DbReport;
  const image = await resolveImageUrl(sb, row.image_url);
  const mapped = mapReport(row);
  return { ...mapped, image };
}

export async function updateReport(
  id: string,
  patch: Partial<{
    title: string;
    description: string;
    category: Category;
    location: string;
    lat: number;
    lng: number;
    status: Status;
    wardId: string | null;
  }>,
): Promise<void> {
  const sb = requireSupabase();
  type ReportUpdate = Database["public"]["Tables"]["reports"]["Update"];
  const update: ReportUpdate = {};

  if (patch.title !== undefined) update.title = patch.title;
  if (patch.description !== undefined) update.description = patch.description;
  if (patch.category !== undefined) update.category = patch.category;
  if (patch.location !== undefined) update.location = patch.location;
  if (patch.lat !== undefined) update.lat = patch.lat;
  if (patch.lng !== undefined) update.lng = patch.lng;
  if (patch.status !== undefined) {
    update.status = patch.status;
    if (patch.status === "Resolved") {
      update.resolved_at = new Date().toISOString();
    } else if (patch.status === "Pending" || patch.status === "In Progress") {
      update.resolved_at = null;
    }
  }
  if (patch.wardId !== undefined) update.ward_id = patch.wardId;

  if (Object.keys(update).length === 0) return;

  const { error } = await sb.from("reports").update(update).eq("id", id);
  if (error) throw new Error(formatDbError(error.message, "Report update"));
}

export async function deleteReport(id: string): Promise<void> {
  const sb = requireSupabase();
  const { error } = await sb.from("reports").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function assignReport(reportId: string, assigneeId: string): Promise<void> {
  const sb = requireSupabase();
  const { data: sessionData } = await sb.auth.getSession();
  const userId = sessionData.session?.user?.id;
  if (!userId) throw new Error("You must be signed in to assign reports");

  const { data: report, error: reportError } = await sb
    .from("reports")
    .select("organization_id")
    .eq("id", reportId)
    .maybeSingle();

  if (reportError || !report) throw new Error("Issue not found or access denied");

  const { data: assignee, error: assigneeError } = await sb
    .from("profiles")
    .select("department_id, organization_id, role")
    .eq("id", assigneeId)
    .maybeSingle();

  if (assigneeError || !assignee) throw new Error("Staff member not found");
  if (assignee.organization_id !== report.organization_id) {
    throw new Error("Assignee must belong to the same organization");
  }
  if (!["ward_officer", "admin", "super_admin"].includes(assignee.role)) {
    throw new Error("Assignee must be a staff member");
  }

  const { error } = await sb
    .from("reports")
    .update({
      assigned_to: assigneeId,
      assigned_by: userId,
      assigned_at: new Date().toISOString(),
      department_id: assignee.department_id ?? null,
      status: "In Progress",
    })
    .eq("id", reportId);

  if (error) throw new Error(formatDbError(error.message, "Assignment"));
}

export async function verifyResolution(
  reportId: string,
  approved: boolean,
  notes?: string,
): Promise<void> {
  const sb = requireSupabase();
  const { data: sessionData } = await sb.auth.getSession();
  const userId = sessionData.session?.user?.id;
  if (!userId) {
    throw new Error("Sign in to verify whether this issue was fixed.");
  }

  const { error: vError } = await sb.from("resolution_verifications").insert({
    report_id: reportId,
    verified_by: userId,
    status: approved ? "approved" : "rejected",
    notes: notes ?? null,
  });

  if (vError) throw new Error(vError.message);

  const newStatus = approved ? "Verified" : "Reopened";
  const { error: rError } = await sb
    .from("reports")
    .update({
      status: newStatus,
      resolved_at: approved ? new Date().toISOString() : null,
    })
    .eq("id", reportId);

  if (rError) throw new Error(rError.message);

  if (notes?.trim()) {
    try {
      const { data: history } = await sb
        .from("issue_status_history")
        .select("id")
        .eq("report_id", reportId)
        .eq("to_status", newStatus)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (history?.id) {
        await sb
          .from("issue_status_history")
          .update({ notes: notes.trim() })
          .eq("id", history.id);
      }
    } catch {
      /* non-critical notes update */
    }
  }
}

export async function fetchReport(id: string): Promise<Report | null> {
  const sb = requireSupabase();
  const { data, error } = await sb.from("reports").select("*").eq("id", id).maybeSingle();
  if (error || !data) return null;

  const row = data as DbReport;
  let assigneeName: string | null = null;
  if (row.assigned_to) {
    const { data: profile } = await sb
      .from("profiles")
      .select("full_name, email")
      .eq("id", row.assigned_to)
      .maybeSingle();
    assigneeName = profile?.full_name ?? profile?.email ?? null;
  }

  const image = await resolveImageUrl(sb, row.image_url);
  const mapped = mapReport(row, assigneeName);
  return { ...mapped, image };
}

export async function fetchOrganization(id: string): Promise<Organization | null> {
  const sb = getSupabase();
  if (!sb) return null;

  const { data, error } = await sb
    .from("organizations")
    .select("id, name, slug")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return { id: data.id, name: data.name, slug: data.slug };
}

export async function fetchStaffMembers(organizationId: string): Promise<StaffMember[]> {
  const sb = requireSupabase();
  const { data, error } = await sb
    .from("profiles")
    .select("id, full_name, email, role, categories")
    .eq("organization_id", organizationId)
    .in("role", ["ward_officer", "admin", "super_admin"]);

  if (error) throw new Error(error.message);

  return (data ?? []).map((p) => ({
    id: p.id,
    fullName: p.full_name,
    email: p.email,
    role: p.role as UserRole,
    categories: p.categories ?? [],
  }));
}

export function countByCategory(reports: Report[]): Record<string, number> {
  return reports.reduce<Record<string, number>>((acc, r) => {
    acc[r.category] = (acc[r.category] ?? 0) + 1;
    return acc;
  }, {});
}

export function isToday(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
}

export type IssueStatusHistoryEntry = {
  id: string;
  fromStatus: string | null;
  toStatus: string;
  changedBy: string | null;
  changedByName?: string | null;
  notes: string | null;
  createdAt: string;
};

export async function fetchIssueStatusHistory(
  reportId: string,
): Promise<IssueStatusHistoryEntry[]> {
  const sb = requireSupabase();
  const { data, error } = await sb
    .from("issue_status_history")
    .select("id, from_status, to_status, changed_by, notes, created_at")
    .eq("report_id", reportId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  const changedByIds = [
    ...new Set((data ?? []).map((row) => row.changed_by).filter(Boolean)),
  ] as string[];
  let profileMap = new Map<string, string>();
  if (changedByIds.length) {
    const { data: profiles } = await sb
      .from("profiles")
      .select("id, full_name, email")
      .in("id", changedByIds);
    if (profiles) {
      profileMap = new Map(profiles.map((p) => [p.id, p.full_name ?? p.email ?? "User"]));
    }
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    fromStatus: row.from_status,
    toStatus: row.to_status,
    changedBy: row.changed_by,
    changedByName: row.changed_by ? profileMap.get(row.changed_by) : null,
    notes: row.notes,
    createdAt: row.created_at,
  }));
}

export async function resolveReportWithEvidence({
  reportId,
  file,
  notes,
}: {
  reportId: string;
  file: File;
  notes: string;
}): Promise<void> {
  const sb = requireSupabase();
  const { data: sessionData } = await sb.auth.getSession();
  const userId = sessionData.session?.user?.id;
  if (!userId) throw new Error("You must be signed in as staff to resolve reports.");

  const { data: report, error: reportError } = await sb
    .from("reports")
    .select("id, organization_id, status")
    .eq("id", reportId)
    .maybeSingle();

  if (reportError || !report) throw new Error("Report not found or access denied.");

  const storagePath = await uploadReportImage(report.organization_id, file);

  const { error: evidenceError } = await sb.from("issue_evidence").insert({
    report_id: reportId,
    storage_path: storagePath,
    uploaded_by: userId,
    content_type: file.type || "image/jpeg",
    notes: notes.trim(),
  });

  if (evidenceError) {
    try {
      await removeReportImage(storagePath);
    } catch {
      /* best-effort cleanup */
    }
    throw new Error(formatDbError(evidenceError.message, "Resolution evidence upload"));
  }

  const { error: updateError } = await sb
    .from("reports")
    .update({
      status: "Resolved",
      resolved_at: new Date().toISOString(),
    })
    .eq("id", reportId);

  if (updateError) {
    throw new Error(formatDbError(updateError.message, "Report resolution update"));
  }

  if (notes.trim()) {
    try {
      const { data: history } = await sb
        .from("issue_status_history")
        .select("id")
        .eq("report_id", reportId)
        .eq("to_status", "Resolved")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (history?.id) {
        await sb
          .from("issue_status_history")
          .update({ notes: notes.trim() })
          .eq("id", history.id);
      }
    } catch {
      /* non-critical notes update */
    }
  }
}

export async function fetchReportEvidence(reportId: string): Promise<IssueEvidence[]> {
  const sb = requireSupabase();
  const { data, error } = await sb
    .from("issue_evidence")
    .select("id, report_id, storage_path, public_url, content_type, uploaded_by, notes, created_at")
    .eq("report_id", reportId)
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) return [];

  const uploaderIds = [...new Set(data.map((e) => e.uploaded_by).filter(Boolean))] as string[];
  let uploaderMap = new Map<string, string>();
  if (uploaderIds.length) {
    const { data: profiles } = await sb
      .from("profiles")
      .select("id, full_name, email")
      .in("id", uploaderIds);
    if (profiles) {
      uploaderMap = new Map(profiles.map((p) => [p.id, p.full_name ?? p.email ?? "Staff"]));
    }
  }

  const imageMap = await resolveImageUrlMap(
    sb,
    data.map((e) => e.storage_path),
  );

  return data.map((row) => ({
    id: row.id,
    reportId: row.report_id,
    storagePath: row.storage_path,
    publicUrl: imageMap.get(row.storage_path) ?? row.public_url ?? null,
    contentType: row.content_type,
    uploadedBy: row.uploaded_by,
    uploaderName: row.uploaded_by ? uploaderMap.get(row.uploaded_by) : null,
    notes: row.notes,
    createdAt: row.created_at,
  }));
}
