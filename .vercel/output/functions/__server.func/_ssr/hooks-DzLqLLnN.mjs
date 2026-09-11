import { o as __toESM } from "../_runtime.mjs";
import { c as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as isSupabaseConfigured, c as resolveOrganizationId, n as getSupabase, o as requireDefaultOrganizationId, r as getSupabaseConfigError, s as requireSupabase } from "./supabase-ET64mUQq.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as addHours } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hooks-DzLqLLnN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/** Proposed organization pricing structure — business testing rates. */
var PLANS = [
	{
		tier: "pilot",
		name: "Free Pilot",
		tagline: "30-day trial for RWAs, campuses, and facility teams",
		monthlyPriceInr: 0,
		annualPriceInr: 0,
		limits: {
			maxStaff: 5,
			maxReportsPerMonth: 100,
			maxDepartments: 3
		},
		features: [
			"Up to 5 staff members",
			"100 issues per month",
			"Reporter access & live map",
			"Assignment & SLA tracking",
			"Before/After evidence capture",
			"30-day full feature pilot"
		],
		cta: "Start Free Pilot"
	},
	{
		tier: "community",
		name: "Community",
		tagline: "Proposed tier for RWAs, housing societies, and small campuses",
		monthlyPriceInr: 3999,
		annualPriceInr: 39990,
		limits: {
			maxStaff: 15,
			maxReportsPerMonth: 1e3,
			maxDepartments: 8
		},
		features: [
			"Up to 15 staff members",
			"1,000 issues per month",
			"8 departments/wards",
			"Operations dashboard",
			"Resolution verification",
			"Organization data isolation"
		],
		cta: "Start a Pilot",
		highlighted: true
	},
	{
		tier: "growth",
		name: "Growth",
		tagline: "Proposed tier for universities, large townships, and facility operators",
		monthlyPriceInr: 9999,
		annualPriceInr: 99990,
		limits: {
			maxStaff: 50,
			maxReportsPerMonth: 5e3,
			maxDepartments: 25
		},
		features: [
			"Up to 50 staff members",
			"5,000 issues per month",
			"25 departments",
			"Priority SLA tracking",
			"Custom SLA rules",
			"All Community features"
		],
		cta: "Start a Pilot"
	},
	{
		tier: "enterprise",
		name: "Enterprise",
		tagline: "Custom deployment for multi-campus & large organization networks",
		monthlyPriceInr: null,
		annualPriceInr: null,
		limits: {
			maxStaff: null,
			maxReportsPerMonth: null,
			maxDepartments: null
		},
		features: [
			"Unlimited staff & issue volume",
			"Custom SLA & workflow policies",
			"Dedicated onboarding manager",
			"Security audit & review support",
			"Custom contracts & billing"
		],
		cta: "Book a Demo"
	}
];
function getPlan(tier) {
	const plan = PLANS.find((p) => p.tier === tier);
	if (!plan) throw new Error(`Unknown plan tier: ${tier}`);
	return plan;
}
function formatInr(amount) {
	if (amount === null) return "Custom";
	if (amount === 0) return "₹0";
	return `₹${amount.toLocaleString("en-IN")}`;
}
var SALES_EMAIL = "sales@civiceye.in";
/**
* Normalize DB tier names to frontend plan tiers.
* Migration 004 inserts 'starter'/'professional' but plans.ts expects 'community'/'growth'.
*/
var DB_TIER_TO_FRONTEND = {
	pilot: "pilot",
	starter: "community",
	professional: "growth",
	enterprise: "enterprise",
	community: "community",
	growth: "growth"
};
function normalizePlanTier(dbTier) {
	return DB_TIER_TO_FRONTEND[dbTier] ?? dbTier;
}
function mapSubscription(row) {
	const now = Date.now();
	const trialEnd = row.trial_ends_at ? new Date(row.trial_ends_at).getTime() : null;
	const periodEnd = row.current_period_end ? new Date(row.current_period_end).getTime() : null;
	const statusActive = row.status === "pilot" || row.status === "active";
	const trialOk = row.status !== "pilot" || trialEnd === null || trialEnd > now;
	const periodOk = periodEnd === null || periodEnd > now;
	const planTier = normalizePlanTier(row.plan_tier);
	return {
		id: row.id,
		organizationId: row.organization_id,
		planTier,
		status: row.status,
		startedAt: row.started_at,
		currentPeriodEnd: row.current_period_end,
		trialEndsAt: row.trial_ends_at,
		billingProvider: row.billing_provider,
		isActive: statusActive && trialOk && periodOk,
		planName: getPlan(planTier).name
	};
}
async function fetchOrganizationSubscription(organizationId) {
	const sb = getSupabase();
	if (!sb) return null;
	const { data, error } = await sb.from("organization_subscriptions").select("*").eq("organization_id", organizationId).maybeSingle();
	if (error || !data) return null;
	return mapSubscription(data);
}
/**
* Map frontend plan tier names to DB tier names for subscription_plans FK.
* DB migration 004 uses 'starter'/'professional'; frontend plans.ts uses 'community'/'growth'.
*/
var FRONTEND_TIER_TO_DB = {
	pilot: "pilot",
	community: "starter",
	growth: "professional",
	enterprise: "enterprise"
};
async function submitOnboardingRequest(input) {
	const { error } = await requireSupabase().from("organization_onboarding").insert({
		org_name: input.orgName.trim(),
		org_type: input.orgType,
		admin_name: input.adminName.trim(),
		admin_email: input.adminEmail.trim().toLowerCase(),
		team_size: input.teamSize?.trim() || null,
		operational_area: input.operationalArea?.trim() || null,
		selected_plan: FRONTEND_TIER_TO_DB[input.selectedPlan] ?? input.selectedPlan,
		status: "pending"
	});
	if (error) throw new Error(error.message);
}
async function submitDemoRequest(fullName, workEmail, organization) {
	const { error } = await requireSupabase().from("demo_requests").insert({
		full_name: fullName.trim(),
		work_email: workEmail.trim().toLowerCase(),
		organization: organization.trim(),
		submitted_at: (/* @__PURE__ */ new Date()).toISOString()
	});
	if (error) throw new Error(error.message);
}
function subscriptionStatusLabel(sub) {
	if (!sub.isActive) {
		if (sub.status === "expired" || sub.status === "cancelled") return "Subscription inactive";
		if (sub.status === "past_due") return "Payment past due";
		return "Pilot expired — upgrade to continue";
	}
	if (sub.status === "pilot") return "Pilot active";
	return `${sub.planName} plan active`;
}
function daysUntilTrialEnd(sub) {
	if (!sub.trialEndsAt) return null;
	const diff = new Date(sub.trialEndsAt).getTime() - Date.now();
	return Math.max(0, Math.ceil(diff / (1e3 * 60 * 60 * 24)));
}
function mapProfile(row) {
	return {
		id: row.id,
		organizationId: row.organization_id,
		role: row.role,
		fullName: row.full_name,
		email: row.email
	};
}
async function fetchProfile(userId) {
	const sb = getSupabase();
	if (!sb) return null;
	const { data, error } = await sb.from("profiles").select("id, organization_id, role, full_name, email").eq("id", userId).maybeSingle();
	if (error || !data) return null;
	return mapProfile(data);
}
async function signIn(email, password) {
	const { data, error } = await requireSupabase().auth.signInWithPassword({
		email,
		password
	});
	if (error) throw error;
	const profile = data.user ? await fetchProfile(data.user.id) : null;
	return {
		user: data.user,
		session: data.session,
		profile
	};
}
async function signUp(email, password, meta) {
	const { data, error } = await requireSupabase().auth.signUp({
		email,
		password,
		options: {
			data: { full_name: meta?.fullName },
			...typeof window !== "undefined" && { emailRedirectTo: `${window.location.origin}/auth/callback` }
		}
	});
	if (error) throw error;
	const profile = data.user ? await fetchProfile(data.user.id) : null;
	return {
		user: data.user,
		session: data.session,
		profile
	};
}
async function signOut() {
	const sb = getSupabase();
	if (!sb) return;
	await sb.auth.signOut();
}
async function getCurrentSession() {
	const sb = getSupabase();
	if (!sb) return null;
	const { data } = await sb.auth.getSession();
	const session = data.session;
	if (!session?.user) return null;
	const profile = await fetchProfile(session.user.id);
	return {
		user: session.user,
		profile
	};
}
function onAuthStateChange(callback) {
	const sb = getSupabase();
	if (!sb) return void 0;
	const { data } = sb.auth.onAuthStateChange(async (_event, session) => {
		if (!session?.user) {
			callback(null);
			return;
		}
		const profile = await fetchProfile(session.user.id);
		callback({
			user: session.user,
			profile
		});
	});
	return () => data.subscription.unsubscribe();
}
async function fetchSlaPolicy(organizationId, category) {
	const { data, error } = await requireSupabase().from("sla_policies").select("id, category, priority, response_hours, resolution_hours").eq("organization_id", organizationId).eq("category", category).order("resolution_hours", { ascending: true }).limit(1).maybeSingle();
	if (error || !data) return null;
	return {
		id: data.id,
		category: data.category,
		priority: data.priority,
		responseHours: data.response_hours,
		resolutionHours: data.resolution_hours
	};
}
function computeSlaDueAt(resolutionHours, from = /* @__PURE__ */ new Date()) {
	return addHours(from, resolutionHours).toISOString();
}
async function resolveSlaDueAt(organizationId, category) {
	const policy = await fetchSlaPolicy(organizationId, category);
	if (!policy) return computeSlaDueAt(72);
	return computeSlaDueAt(policy.resolutionHours);
}
async function refreshSlaBreaches(_organizationId) {
	const { error } = await requireSupabase().rpc("mark_sla_breaches");
	if (error) console.warn("[CivicEye] mark_sla_breaches skipped:", error.message);
}
function isSlaBreached(report) {
	if (report.slaBreached) return true;
	if (!report.slaDueAt) return false;
	if (report.status === "Verified" || report.status === "Closed") return false;
	return new Date(report.slaDueAt) < /* @__PURE__ */ new Date();
}
function slaTimeRemaining(slaDueAt) {
	if (!slaDueAt) return null;
	const diff = new Date(slaDueAt).getTime() - Date.now();
	if (diff <= 0) return "Overdue";
	const hours = Math.floor(diff / (1e3 * 60 * 60));
	if (hours < 24) return `${hours}h left`;
	return `${Math.floor(hours / 24)}d left`;
}
var SIGNED_IMAGE_TTL_SEC = 86400;
function formatDbError(message, context) {
	if (message.includes("row-level security") || message.includes("violates row-level security")) return `${context} denied by security policy — ensure your organization has an active subscription, public_reports enabled, and your staff profile is linked to the correct organization. (${message})`;
	return message;
}
function isStoragePath(value) {
	return !value.startsWith("http://") && !value.startsWith("https://") && !value.startsWith("data:");
}
async function resolveImageUrl(sb, imageRef) {
	if (!imageRef) return null;
	if (!isStoragePath(imageRef)) return imageRef;
	const { data, error } = await sb.storage.from("report-images").createSignedUrl(imageRef, SIGNED_IMAGE_TTL_SEC);
	if (!error && data?.signedUrl) return data.signedUrl;
	const { data: blob, error: downloadError } = await sb.storage.from("report-images").download(imageRef);
	if (!downloadError && blob) return URL.createObjectURL(blob);
	return null;
}
async function resolveImageUrlMap(sb, imageRefs) {
	const map = /* @__PURE__ */ new Map();
	const storagePaths = [...new Set(imageRefs.filter((r) => typeof r === "string" && isStoragePath(r)))];
	for (const ref of imageRefs) if (ref && !isStoragePath(ref)) map.set(ref, ref);
	if (!storagePaths.length) return map;
	const { data } = await sb.storage.from("report-images").createSignedUrls(storagePaths, SIGNED_IMAGE_TTL_SEC);
	if (data) {
		for (const item of data) if (item.path && item.signedUrl && !item.error) map.set(item.path, item.signedUrl);
	}
	for (const path of storagePaths) {
		if (map.has(path)) continue;
		const url = await resolveImageUrl(sb, path);
		if (url) map.set(path, url);
	}
	return map;
}
function mapReport(row, assigneeName) {
	return {
		id: row.id,
		organizationId: row.organization_id,
		wardId: row.ward_id,
		title: row.title,
		description: row.description,
		category: row.category,
		location: row.location,
		lat: row.lat,
		lng: row.lng,
		image: row.image_url,
		status: row.status,
		aiCategory: row.ai_category ?? null,
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
		updatedAt: row.updated_at
	};
}
var MIME_TO_EXT = {
	"image/jpeg": "jpg",
	"image/png": "png",
	"image/webp": "webp"
};
function imageExtension(file) {
	if (file.type && MIME_TO_EXT[file.type]) return MIME_TO_EXT[file.type];
	const fromName = file.name.split(".").pop()?.toLowerCase();
	if (fromName && [
		"jpg",
		"jpeg",
		"png",
		"webp"
	].includes(fromName)) return fromName === "jpeg" ? "jpg" : fromName;
	return "jpg";
}
async function uploadReportImage(organizationId, file) {
	const sb = requireSupabase();
	const ext = imageExtension(file);
	const path = `${organizationId}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
	const { error } = await sb.storage.from("report-images").upload(path, file, {
		cacheControl: "3600",
		upsert: false,
		contentType: file.type || "image/jpeg"
	});
	if (error) throw new Error(`Image upload failed: ${error.message}`);
	return path;
}
async function removeReportImage(path) {
	await requireSupabase().storage.from("report-images").remove([path]);
}
async function fetchReports(organizationId) {
	const sb = requireSupabase();
	await refreshSlaBreaches(organizationId);
	let query = sb.from("reports").select("*").order("created_at", { ascending: false });
	if (organizationId) query = query.eq("organization_id", organizationId);
	const { data, error } = await query;
	if (error) throw new Error(error.message);
	const reports = data ?? [];
	const assigneeIds = [...new Set(reports.map((r) => r.assigned_to).filter(Boolean))];
	let assigneeMap = /* @__PURE__ */ new Map();
	if (assigneeIds.length) {
		const { data: profiles, error: profileError } = await sb.from("profiles").select("id, full_name, email").in("id", assigneeIds);
		if (!profileError && profiles) assigneeMap = new Map(profiles.map((p) => [p.id, p.full_name ?? p.email ?? "Staff"]));
	}
	const mappedReports = reports.map((r) => mapReport(r, r.assigned_to ? assigneeMap.get(r.assigned_to) : null));
	const imageMap = await resolveImageUrlMap(sb, mappedReports.map((r) => r.image));
	return mappedReports.map((r) => ({
		...r,
		image: r.image ? imageMap.get(r.image) ?? null : null
	}));
}
async function createReport(input) {
	const sb = requireSupabase();
	const organizationId = requireDefaultOrganizationId();
	let imageUrl = null;
	if (input.imageFile) imageUrl = await uploadReportImage(organizationId, input.imageFile);
	const slaDueAt = await resolveSlaDueAt(organizationId, input.category);
	const { data: sessionData } = await sb.auth.getSession();
	const userId = sessionData.session?.user?.id ?? null;
	const { data, error } = await sb.from("reports").insert({
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
		sla_breached: false
	}).select("*").single();
	if (error || !data) {
		if (imageUrl) try {
			await removeReportImage(imageUrl);
		} catch {}
		const message = error?.message ?? "Failed to create report";
		throw new Error(formatDbError(message, "Report submission"));
	}
	const row = data;
	const image = await resolveImageUrl(sb, row.image_url);
	return {
		...mapReport(row),
		image
	};
}
async function updateReport(id, patch) {
	const sb = requireSupabase();
	const update = {};
	if (patch.title !== void 0) update.title = patch.title;
	if (patch.description !== void 0) update.description = patch.description;
	if (patch.category !== void 0) update.category = patch.category;
	if (patch.location !== void 0) update.location = patch.location;
	if (patch.lat !== void 0) update.lat = patch.lat;
	if (patch.lng !== void 0) update.lng = patch.lng;
	if (patch.status !== void 0) {
		update.status = patch.status;
		if (patch.status === "Resolved") update.resolved_at = (/* @__PURE__ */ new Date()).toISOString();
		else if (patch.status === "Pending" || patch.status === "In Progress") update.resolved_at = null;
	}
	if (patch.wardId !== void 0) update.ward_id = patch.wardId;
	if (Object.keys(update).length === 0) return;
	const { error } = await sb.from("reports").update(update).eq("id", id);
	if (error) throw new Error(formatDbError(error.message, "Report update"));
}
async function deleteReport(id) {
	const { error } = await requireSupabase().from("reports").delete().eq("id", id);
	if (error) throw new Error(error.message);
}
async function assignReport(reportId, assigneeId) {
	const sb = requireSupabase();
	const { data: sessionData } = await sb.auth.getSession();
	const userId = sessionData.session?.user?.id;
	if (!userId) throw new Error("You must be signed in to assign reports");
	const { data: report, error: reportError } = await sb.from("reports").select("organization_id").eq("id", reportId).maybeSingle();
	if (reportError || !report) throw new Error("Issue not found or access denied");
	const { data: assignee, error: assigneeError } = await sb.from("profiles").select("department_id, organization_id, role").eq("id", assigneeId).maybeSingle();
	if (assigneeError || !assignee) throw new Error("Staff member not found");
	if (assignee.organization_id !== report.organization_id) throw new Error("Assignee must belong to the same organization");
	if (![
		"ward_officer",
		"admin",
		"super_admin"
	].includes(assignee.role)) throw new Error("Assignee must be a staff member");
	const { error } = await sb.from("reports").update({
		assigned_to: assigneeId,
		assigned_by: userId,
		assigned_at: (/* @__PURE__ */ new Date()).toISOString(),
		department_id: assignee.department_id ?? null,
		status: "In Progress"
	}).eq("id", reportId);
	if (error) throw new Error(formatDbError(error.message, "Assignment"));
}
async function verifyResolution(reportId, approved, notes) {
	const sb = requireSupabase();
	const { data: sessionData } = await sb.auth.getSession();
	const userId = sessionData.session?.user?.id;
	if (!userId) throw new Error("Sign in to verify whether this issue was fixed.");
	const { error: vError } = await sb.from("resolution_verifications").insert({
		report_id: reportId,
		verified_by: userId,
		status: approved ? "approved" : "rejected",
		notes: notes ?? null
	});
	if (vError) throw new Error(vError.message);
	const newStatus = approved ? "Verified" : "Reopened";
	const { error: rError } = await sb.from("reports").update({
		status: newStatus,
		resolved_at: approved ? (/* @__PURE__ */ new Date()).toISOString() : null
	}).eq("id", reportId);
	if (rError) throw new Error(rError.message);
	if (notes?.trim()) try {
		const { data: history } = await sb.from("issue_status_history").select("id").eq("report_id", reportId).eq("to_status", newStatus).order("created_at", { ascending: false }).limit(1).maybeSingle();
		if (history?.id) await sb.from("issue_status_history").update({ notes: notes.trim() }).eq("id", history.id);
	} catch {}
}
async function fetchOrganization(id) {
	const sb = getSupabase();
	if (!sb) return null;
	const { data, error } = await sb.from("organizations").select("id, name, slug").eq("id", id).maybeSingle();
	if (error || !data) return null;
	return {
		id: data.id,
		name: data.name,
		slug: data.slug
	};
}
async function fetchStaffMembers(organizationId) {
	const { data, error } = await requireSupabase().from("profiles").select("id, full_name, email, role, categories").eq("organization_id", organizationId).in("role", [
		"ward_officer",
		"admin",
		"super_admin"
	]);
	if (error) throw new Error(error.message);
	return (data ?? []).map((p) => ({
		id: p.id,
		fullName: p.full_name,
		email: p.email,
		role: p.role,
		categories: p.categories ?? []
	}));
}
function countByCategory(reports) {
	return reports.reduce((acc, r) => {
		acc[r.category] = (acc[r.category] ?? 0) + 1;
		return acc;
	}, {});
}
function isToday(iso) {
	const d = new Date(iso);
	const now = /* @__PURE__ */ new Date();
	return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}
async function fetchIssueStatusHistory(reportId) {
	const sb = requireSupabase();
	const { data, error } = await sb.from("issue_status_history").select("id, from_status, to_status, changed_by, notes, created_at").eq("report_id", reportId).order("created_at", { ascending: false });
	if (error) throw new Error(error.message);
	const changedByIds = [...new Set((data ?? []).map((row) => row.changed_by).filter(Boolean))];
	let profileMap = /* @__PURE__ */ new Map();
	if (changedByIds.length) {
		const { data: profiles } = await sb.from("profiles").select("id, full_name, email").in("id", changedByIds);
		if (profiles) profileMap = new Map(profiles.map((p) => [p.id, p.full_name ?? p.email ?? "User"]));
	}
	return (data ?? []).map((row) => ({
		id: row.id,
		fromStatus: row.from_status,
		toStatus: row.to_status,
		changedBy: row.changed_by,
		changedByName: row.changed_by ? profileMap.get(row.changed_by) : null,
		notes: row.notes,
		createdAt: row.created_at
	}));
}
async function resolveReportWithEvidence({ reportId, file, notes }) {
	const sb = requireSupabase();
	const { data: sessionData } = await sb.auth.getSession();
	const userId = sessionData.session?.user?.id;
	if (!userId) throw new Error("You must be signed in as staff to resolve reports.");
	const { data: report, error: reportError } = await sb.from("reports").select("id, organization_id, status").eq("id", reportId).maybeSingle();
	if (reportError || !report) throw new Error("Report not found or access denied.");
	const storagePath = await uploadReportImage(report.organization_id, file);
	const { error: evidenceError } = await sb.from("issue_evidence").insert({
		report_id: reportId,
		storage_path: storagePath,
		uploaded_by: userId,
		content_type: file.type || "image/jpeg",
		notes: notes.trim()
	});
	if (evidenceError) {
		try {
			await removeReportImage(storagePath);
		} catch {}
		throw new Error(formatDbError(evidenceError.message, "Resolution evidence upload"));
	}
	const { error: updateError } = await sb.from("reports").update({
		status: "Resolved",
		resolved_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", reportId);
	if (updateError) throw new Error(formatDbError(updateError.message, "Report resolution update"));
	if (notes.trim()) try {
		const { data: history } = await sb.from("issue_status_history").select("id").eq("report_id", reportId).eq("to_status", "Resolved").order("created_at", { ascending: false }).limit(1).maybeSingle();
		if (history?.id) await sb.from("issue_status_history").update({ notes: notes.trim() }).eq("id", history.id);
	} catch {}
}
async function fetchReportEvidence(reportId) {
	const sb = requireSupabase();
	const { data, error } = await sb.from("issue_evidence").select("id, report_id, storage_path, public_url, content_type, uploaded_by, notes, created_at").eq("report_id", reportId).order("created_at", { ascending: false });
	if (error || !data || data.length === 0) return [];
	const uploaderIds = [...new Set(data.map((e) => e.uploaded_by).filter(Boolean))];
	let uploaderMap = /* @__PURE__ */ new Map();
	if (uploaderIds.length) {
		const { data: profiles } = await sb.from("profiles").select("id, full_name, email").in("id", uploaderIds);
		if (profiles) uploaderMap = new Map(profiles.map((p) => [p.id, p.full_name ?? p.email ?? "Staff"]));
	}
	const imageMap = await resolveImageUrlMap(sb, data.map((e) => e.storage_path));
	return data.map((row) => ({
		id: row.id,
		reportId: row.report_id,
		storagePath: row.storage_path,
		publicUrl: imageMap.get(row.storage_path) ?? row.public_url ?? null,
		contentType: row.content_type,
		uploadedBy: row.uploaded_by,
		uploaderName: row.uploaded_by ? uploaderMap.get(row.uploaded_by) : null,
		notes: row.notes,
		createdAt: row.created_at
	}));
}
var CATEGORIES = [
	"Pothole",
	"Garbage",
	"Fallen Tree",
	"Water Leakage",
	"Broken Street Light",
	"Road Damage",
	"Other"
];
var STATUSES = [
	"Pending",
	"In Progress",
	"Resolved",
	"Verified",
	"Closed",
	"Reopened"
];
var ROLE_LABELS = {
	citizen: "Reporter",
	ward_officer: "Staff",
	admin: "Admin",
	super_admin: "Super Admin"
};
function roleLabel(role) {
	return ROLE_LABELS[role] ?? role.replace(/_/g, " ");
}
function isStaffRole(role) {
	return role === "ward_officer" || role === "admin" || role === "super_admin";
}
function canManageReports(role) {
	return isStaffRole(role);
}
function canVerifyResolution(role) {
	return role === "admin" || role === "super_admin" || role === "ward_officer";
}
/** Citizens may verify issues they reported once staff marks them Resolved. */
function canVerifyReport(role, report, userId) {
	if (canVerifyResolution(role)) return true;
	if (!userId || report.status !== "Resolved") return false;
	return report.createdBy === userId || report.createdBy === null;
}
function isAwaitingCitizenVerification(status) {
	return status === "Resolved";
}
var REPORTS_KEY = ["reports"];
var AUTH_KEY = ["auth"];
var STAFF_KEY = ["staff"];
var ORG_KEY = ["organization"];
var SUBSCRIPTION_KEY = ["subscription"];
var HISTORY_KEY = ["issue-history"];
var EVIDENCE_KEY = ["issue-evidence"];
function useAuth() {
	const qc = useQueryClient();
	const configured = isSupabaseConfigured();
	const { data, isLoading } = useQuery({
		queryKey: AUTH_KEY,
		queryFn: getCurrentSession,
		staleTime: 3e4,
		enabled: configured
	});
	(0, import_react.useEffect)(() => {
		if (!configured) return;
		return onAuthStateChange(() => {
			qc.invalidateQueries({ queryKey: AUTH_KEY });
			qc.invalidateQueries({ queryKey: REPORTS_KEY });
			qc.invalidateQueries({ queryKey: STAFF_KEY });
			qc.invalidateQueries({ queryKey: SUBSCRIPTION_KEY });
		});
	}, [qc, configured]);
	return {
		session: data ?? null,
		user: data?.user ?? null,
		profile: data?.profile ?? null,
		loading: configured ? isLoading : false,
		isConfigured: configured,
		configError: getSupabaseConfigError()
	};
}
function useReports() {
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
			if (!orgId) throw new Error("Organization is not configured. Set VITE_DEFAULT_ORGANIZATION_ID in .env for citizen reporting.");
			return fetchReports(orgId);
		},
		enabled: configured && orgConfigured,
		refetchInterval: 3e4
	});
	const configErrorInstance = configError ? new Error(configError) : null;
	return {
		reports: configured ? query.data ?? [] : [],
		loading: configured && orgConfigured ? query.isLoading : false,
		error: configErrorInstance ?? query.error,
		refetch: query.refetch,
		isConfigured: configured,
		configError,
		orgId: orgId ?? null,
		orgMissing: citizenOrgMissing,
		staffOrgMissing
	};
}
function useOrganization(organizationId) {
	return useQuery({
		queryKey: [...ORG_KEY, organizationId],
		queryFn: () => fetchOrganization(organizationId),
		enabled: Boolean(organizationId) && isSupabaseConfigured()
	});
}
function useOrganizationSubscription(organizationId) {
	return useQuery({
		queryKey: [...SUBSCRIPTION_KEY, organizationId],
		queryFn: () => fetchOrganizationSubscription(organizationId),
		enabled: Boolean(organizationId) && isSupabaseConfigured()
	});
}
function useStaffMembers(organizationId) {
	return useQuery({
		queryKey: [...STAFF_KEY, organizationId],
		queryFn: () => fetchStaffMembers(organizationId),
		enabled: Boolean(organizationId) && isSupabaseConfigured()
	});
}
function useIssueStatusHistory(reportId) {
	return useQuery({
		queryKey: [...HISTORY_KEY, reportId],
		queryFn: () => fetchIssueStatusHistory(reportId),
		enabled: Boolean(reportId) && isSupabaseConfigured(),
		staleTime: 15e3
	});
}
function useIssueEvidence(reportId) {
	return useQuery({
		queryKey: [...EVIDENCE_KEY, reportId],
		queryFn: () => fetchReportEvidence(reportId),
		enabled: Boolean(reportId) && isSupabaseConfigured(),
		staleTime: 15e3
	});
}
function useReportMutations() {
	const qc = useQueryClient();
	const invalidate = () => {
		qc.invalidateQueries({ queryKey: REPORTS_KEY });
		qc.invalidateQueries({ queryKey: HISTORY_KEY });
		qc.invalidateQueries({ queryKey: EVIDENCE_KEY });
	};
	return {
		create: useMutation({
			mutationFn: (input) => createReport(input),
			onSuccess: invalidate
		}),
		update: useMutation({
			mutationFn: ({ id, patch }) => updateReport(id, patch),
			onSuccess: invalidate
		}),
		remove: useMutation({
			mutationFn: deleteReport,
			onSuccess: invalidate
		}),
		assign: useMutation({
			mutationFn: ({ reportId, assigneeId }) => assignReport(reportId, assigneeId),
			onSuccess: invalidate
		}),
		verify: useMutation({
			mutationFn: ({ reportId, approved, notes }) => verifyResolution(reportId, approved, notes),
			onSuccess: invalidate
		}),
		resolveWithEvidence: useMutation({
			mutationFn: ({ reportId, file, notes }) => resolveReportWithEvidence({
				reportId,
				file,
				notes
			}),
			onSuccess: invalidate
		})
	};
}
function useTheme() {
	const [dark, setDark] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
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
	return {
		dark,
		toggle
	};
}
function useCountUp(value, duration = 900) {
	const [display, setDisplay] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		let frame = 0;
		const start = performance.now();
		const tick = (now) => {
			const p = Math.min((now - start) / duration, 1);
			setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
			if (p < 1) frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [value, duration]);
	return display;
}
function useHydrated() {
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setHydrated(true), []);
	return hydrated;
}
//#endregion
export { useOrganizationSubscription as A, subscriptionStatusLabel as C, useIssueEvidence as D, useHydrated as E, useReports as M, useStaffMembers as N, useIssueStatusHistory as O, useTheme as P, submitOnboardingRequest as S, useCountUp as T, signIn as _, canManageReports as a, slaTimeRemaining as b, countByCategory as c, getPlan as d, isAwaitingCitizenVerification as f, roleLabel as g, isToday as h, STATUSES as i, useReportMutations as j, useOrganization as k, daysUntilTrialEnd as l, isStaffRole as m, PLANS as n, canVerifyReport as o, isSlaBreached as p, SALES_EMAIL as r, canVerifyResolution as s, CATEGORIES as t, formatInr as u, signOut as v, useAuth as w, submitDemoRequest as x, signUp as y };
