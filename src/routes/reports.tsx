import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import {
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiMapPin,
  FiPlusCircle,
  FiSave,
  FiX,
  FiUserPlus,
  FiCheckCircle,
  FiEye,
  FiCheck,
  FiClipboard,
} from "react-icons/fi";
import { toast } from "sonner";

import { AssignDialog } from "@/components/AssignDialog";
import { AppShell } from "@/components/AppShell";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { EmptyState, Loader, QueryError } from "@/components/EmptyState";
import { ImageModal } from "@/components/ImageModal";
import { IssueWorkflowBar } from "@/components/IssueWorkflowBar";
import { OnboardingBanner } from "@/components/OnboardingBanner";
import { SlaBadge } from "@/components/SlaBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { ReportImage } from "@/components/ReportImage";
import { VerifyDialog } from "@/components/VerifyDialog";
import { ReportMiniMap } from "@/components/ReportMiniMap";
import type { IssueStatusHistoryEntry } from "@/lib/reports";
import { getDefaultOrganizationId, isSlaBreached } from "@/lib/sla";
import {
  useAuth,
  useIssueStatusHistory,
  useReportMutations,
  useReports,
  useStaffMembers,
} from "@/lib/hooks";
import {
  canManageReports,
  canVerifyReport,
  CATEGORIES,
  isAwaitingCitizenVerification,
  STATUSES,
  type Category,
  type Report,
  type Status,
} from "@/lib/types";
import { cn } from "@/lib/utils";

const reportsSearchSchema = z.object({
  assigned: z.literal("me").optional(),
  overdue: z.boolean().optional(),
  submitted: z.string().optional(),
});

export const Route = createFileRoute("/reports")({
  validateSearch: (search: Record<string, unknown>) =>
    reportsSearchSchema.parse({
      assigned: search.assigned === "me" ? "me" : undefined,
      overdue: search.overdue === "1" || search.overdue === true ? true : undefined,
      submitted:
        typeof search.submitted === "string" && search.submitted.trim()
          ? search.submitted.trim()
          : undefined,
    }),
  head: () => ({
    meta: [
      { title: "Civic Reports — CivicEye" },
      {
        name: "description",
        content: "Browse and track civic issue reports — filter by category, status, and location.",
      },
    ],
  }),
  component: ReportsPage,
});

const PAGE_SIZE = 12;

function ReportsPage() {
  const {
    assigned: assignedSearch,
    overdue: overdueSearch,
    submitted: submittedId,
  } = useSearch({ from: "/reports" });
  const { reports, loading, error, refetch, isConfigured, orgMissing } = useReports();
  const { profile, user } = useAuth();
  const orgId = profile?.organizationId ?? getDefaultOrganizationId();
  const { data: staff = [] } = useStaffMembers(isConfigured ? orgId : null);
  const { update, remove, assign, verify } = useReportMutations();

  const isStaff = canManageReports(profile?.role);

  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<"All" | Category>("All");
  const [status, setStatus] = useState<"All" | Status>("All");
  const [assignment, setAssignment] = useState<"all" | "assigned" | "unassigned" | "me">(
    assignedSearch === "me" ? "me" : "all",
  );
  const [overdueOnly, setOverdueOnly] = useState(Boolean(overdueSearch));
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [toDelete, setToDelete] = useState<Report | null>(null);
  const [editing, setEditing] = useState<Report | null>(null);
  const [assignTarget, setAssignTarget] = useState<Report | null>(null);
  const [verifyTarget, setVerifyTarget] = useState<Report | null>(null);
  const [detail, setDetail] = useState<Report | null>(null);
  const [zoom, setZoom] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const list = reports.filter((r) => {
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q);
      const matchAssignment =
        assignment === "all"
          ? true
          : assignment === "me"
            ? r.assignedTo === user?.id
            : assignment === "assigned"
              ? Boolean(r.assignedTo)
              : !r.assignedTo;
      const matchOverdue =
        !overdueOnly || (isSlaBreached(r) && r.status !== "Verified" && r.status !== "Closed");
      return (
        matchQ &&
        matchAssignment &&
        matchOverdue &&
        (cat === "All" || r.category === cat) &&
        (status === "All" || r.status === status)
      );
    });
    return [...list].sort((a, b) => {
      const ta = new Date(a.createdAt).getTime();
      const tb = new Date(b.createdAt).getTime();
      return sort === "newest" ? tb - ta : ta - tb;
    });
  }, [reports, query, cat, status, assignment, overdueOnly, sort, user?.id]);

  useEffect(() => {
    if (assignedSearch === "me") setAssignment("me");
    if (overdueSearch) setOverdueOnly(true);
  }, [assignedSearch, overdueSearch]);

  const liveDetail = useMemo(
    () => (detail ? (reports.find((r) => r.id === detail.id) ?? detail) : null),
    [detail, reports],
  );

  const { data: statusHistory = [], isLoading: historyLoading } = useIssueStatusHistory(
    liveDetail?.id,
  );

  const visibleReports = filtered.slice(0, visibleCount);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, cat, status, assignment, overdueOnly, sort]);

  const field =
    "rounded-xl border border-border bg-card/60 px-3 py-2.5 text-sm outline-none focus:border-primary";

  return (
    <AppShell
      title={
        assignedSearch === "me"
          ? "Assigned to me"
          : overdueSearch
            ? "SLA / attention"
            : "All reports"
      }
      subtitle={
        isConfigured
          ? `${reports.length} issues in your organization`
          : `${reports.length} issues stored locally on this device`
      }
    >
      <OnboardingBanner />

      {submittedId && (
        <SubmissionConfirmation
          reportId={submittedId}
          report={reports.find((r) => r.id === submittedId) ?? null}
          loading={loading}
        />
      )}

      {orgMissing && (
        <div className="mb-4 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm">
          <p className="font-bold">Organization not configured</p>
          <p className="mt-1 text-muted-foreground">
            Set <code className="font-mono text-xs">VITE_DEFAULT_ORGANIZATION_ID</code> in your
            environment to load organization reports.
          </p>
        </div>
      )}

      <div className="glass grid gap-3 rounded-2xl p-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card/60 px-3 md:col-span-2 xl:col-span-3">
          <FiSearch className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, description or location"
            className="w-full bg-transparent py-2.5 text-sm outline-none"
          />
        </div>
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value as Category | "All")}
          className={field}
        >
          <option value="All">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Status | "All")}
          className={field}
        >
          <option value="All">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={assignment}
          onChange={(e) => setAssignment(e.target.value as typeof assignment)}
          className={field}
        >
          <option value="all">All assignments</option>
          <option value="me">Assigned to me</option>
          <option value="assigned">Assigned (anyone)</option>
          <option value="unassigned">Unassigned only</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className={field}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
        <label className="flex items-center gap-2 rounded-xl border border-border bg-card/60 px-3 py-2.5 text-sm">
          <input
            type="checkbox"
            checked={overdueOnly}
            onChange={(e) => setOverdueOnly(e.target.checked)}
            className="rounded border-border"
          />
          <span className="font-semibold">SLA overdue only</span>
        </label>
      </div>

      {loading ? (
        <Loader label="Loading reports" />
      ) : orgMissing ? (
        <QueryError
          title="Organization not configured"
          message="Set VITE_DEFAULT_ORGANIZATION_ID in your .env file to connect to your Supabase organization."
        />
      ) : error ? (
        <QueryError
          message={error instanceof Error ? error.message : "Failed to load reports"}
          onRetry={() => void refetch()}
        />
      ) : filtered.length === 0 ? (
        <div className="mt-5">
          <EmptyState
            title={reports.length ? "No matching reports" : "No reports yet"}
            description={
              reports.length
                ? "Try clearing the search box or switching the filters."
                : "Be the first to report a civic issue in your neighbourhood."
            }
            action={
              <Link
                to="/report"
                className="bg-brand inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-primary-foreground"
              >
                <FiPlusCircle /> New report
              </Link>
            }
          />
        </div>
      ) : (
        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence>
            {visibleReports.map((r) => (
              <motion.article
                key={r.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className={cn(
                  "glass card-hover overflow-hidden rounded-2xl",
                  submittedId === r.id && "ring-2 ring-success ring-offset-2 ring-offset-background",
                )}
              >
                {r.image ? (
                  <ReportImage
                    src={r.image}
                    alt={r.title}
                    onClick={() => setZoom(r.image)}
                    className="h-44 w-full cursor-zoom-in object-cover"
                    placeholderClassName="h-44 w-full"
                  />
                ) : (
                  <ReportImage
                    src={null}
                    alt=""
                    placeholderClassName="h-44 w-full rounded-none"
                    className="h-44 w-full"
                  />
                )}
                <div className="p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="truncate rounded-full bg-secondary px-2.5 py-1 text-xs font-bold text-primary">
                      {r.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <SlaBadge report={r} />
                      <StatusBadge status={r.status} />
                    </div>
                  </div>
                  <h3
                    className="mt-3 truncate text-lg font-bold hover:text-primary"
                    onClick={() => setDetail(r)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setDetail(r)}
                  >
                    {r.title}
                  </h3>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    #{r.id.slice(0, 8)} · {new Date(r.createdAt).toLocaleString()}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{r.description}</p>
                  <p className="mt-3 flex items-center gap-1.5 truncate text-xs text-muted-foreground">
                    <FiMapPin className="shrink-0" /> {r.location}
                  </p>
                  {r.assigneeName && (
                    <p className="mt-2 text-xs font-semibold text-primary">
                      Assigned: {r.assigneeName}
                    </p>
                  )}
                  {r.aiCategory && (
                    <p className="mt-2 text-xs font-semibold text-muted-foreground">
                      Suggested: {r.aiCategory} ({r.aiConfidence}%)
                    </p>
                  )}

                  {isStaff && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        onClick={() => setDetail(r)}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border py-2 text-xs font-bold hover:bg-secondary"
                      >
                        <FiEye /> Details
                      </button>
                      {!r.assignedTo && r.status === "Pending" && (
                        <button
                          onClick={() => setAssignTarget(r)}
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-primary/30 py-2 text-xs font-bold text-primary hover:bg-primary/5"
                        >
                          <FiUserPlus /> Assign
                        </button>
                      )}
                      {r.status === "In Progress" && (
                        <button
                          onClick={async () => {
                            try {
                              if (isConfigured) {
                                await update.mutateAsync({
                                  id: r.id,
                                  patch: { status: "Resolved" },
                                });
                              } else {
                                const { setStatus } = await import("@/lib/storage");
                                setStatus(r.id, "Resolved");
                                window.dispatchEvent(new Event("civiceye:reports"));
                              }
                              toast.success("Marked as resolved — awaiting verification");
                            } catch (e) {
                              toast.error(e instanceof Error ? e.message : "Resolution failed");
                            }
                          }}
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-success/30 py-2 text-xs font-bold text-success hover:bg-success/5"
                        >
                          <FiCheck /> Resolve
                        </button>
                      )}
                      {r.status === "Resolved" && canVerifyReport(profile?.role, r, user?.id) && (
                        <button
                          onClick={() => setVerifyTarget(r)}
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-success/30 py-2 text-xs font-bold text-success hover:bg-success/5"
                        >
                          <FiCheckCircle /> Verify
                        </button>
                      )}
                      <button
                        onClick={() => setEditing(r)}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border py-2 text-xs font-bold hover:bg-secondary"
                      >
                        <FiEdit2 /> Edit
                      </button>
                      <button
                        onClick={() => setToDelete(r)}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-destructive/40 py-2 text-xs font-bold text-destructive hover:bg-destructive/10"
                      >
                        <FiTrash2 /> Delete
                      </button>
                    </div>
                  )}

                  {!isStaff && canVerifyReport(profile?.role, r, user?.id) && (
                    <div className="mt-4">
                      <button
                        onClick={() => setVerifyTarget(r)}
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-primary/30 py-2 text-xs font-bold text-primary hover:bg-primary/5"
                      >
                        <FiCheckCircle /> Verify fix
                      </button>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}

      {!loading && filtered.length > visibleCount && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
            className="rounded-xl border border-border bg-card px-6 py-2.5 text-sm font-bold hover:bg-secondary"
          >
            Show more ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {filtered.length > 0 && !loading && (
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} reports
          {filtered.length !== reports.length && ` (${reports.length} total)`}
        </p>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Delete this report?"
        description={`"${toDelete?.title ?? ""}" will be permanently removed.`}
        onCancel={() => setToDelete(null)}
        onConfirm={async () => {
          if (!toDelete) return;
          try {
            if (isConfigured) {
              await remove.mutateAsync(toDelete.id);
            } else {
              const { deleteReport } = await import("@/lib/storage");
              deleteReport(toDelete.id);
            }
            toast.success("Report deleted");
          } catch (e) {
            toast.error(e instanceof Error ? e.message : "Delete failed");
          }
          setToDelete(null);
        }}
      />

      <AssignDialog
        open={!!assignTarget}
        staff={staff}
        loading={assign.isPending}
        onCancel={() => setAssignTarget(null)}
        onAssign={async (staffId) => {
          if (!assignTarget) return;
          try {
            await assign.mutateAsync({ reportId: assignTarget.id, assigneeId: staffId });
            toast.success("Issue assigned");
            setAssignTarget(null);
          } catch (e) {
            toast.error(e instanceof Error ? e.message : "Assignment failed");
          }
        }}
      />

      <VerifyDialog
        open={!!verifyTarget}
        title={verifyTarget?.title ?? ""}
        loading={verify.isPending}
        onCancel={() => setVerifyTarget(null)}
        onApprove={async (notes) => {
          if (!verifyTarget) return;
          try {
            if (isConfigured) {
              await verify.mutateAsync({ reportId: verifyTarget.id, approved: true, notes });
            } else {
              const { verifyReportLocal } = await import("@/lib/storage");
              verifyReportLocal(verifyTarget.id, true);
              window.dispatchEvent(new Event("civiceye:reports"));
            }
            toast.success("Resolution verified");
            setVerifyTarget(null);
          } catch (e) {
            toast.error(e instanceof Error ? e.message : "Verification failed");
          }
        }}
        onReject={async (notes) => {
          if (!verifyTarget) return;
          try {
            if (isConfigured) {
              await verify.mutateAsync({ reportId: verifyTarget.id, approved: false, notes });
            } else {
              const { verifyReportLocal } = await import("@/lib/storage");
              verifyReportLocal(verifyTarget.id, false);
              window.dispatchEvent(new Event("civiceye:reports"));
            }
            toast.info("Issue reopened — sent back to In Progress");
            setVerifyTarget(null);
          } catch (e) {
            toast.error(e instanceof Error ? e.message : "Verification failed");
          }
        }}
      />

      <IssueDetailDialog
        report={liveDetail}
        isStaff={isStaff}
        isConfigured={isConfigured}
        canVerify={liveDetail ? canVerifyReport(profile?.role, liveDetail, user?.id) : false}
        onClose={() => setDetail(null)}
        onAssign={() => {
          if (liveDetail) setAssignTarget(liveDetail);
          setDetail(null);
        }}
        onEdit={() => {
          if (liveDetail) setEditing(liveDetail);
          setDetail(null);
        }}
        onResolve={async () => {
          if (!liveDetail) return;
          try {
            if (isConfigured) {
              await update.mutateAsync({ id: liveDetail.id, patch: { status: "Resolved" } });
            } else {
              const { setStatus } = await import("@/lib/storage");
              setStatus(liveDetail.id, "Resolved");
              window.dispatchEvent(new Event("civiceye:reports"));
            }
            toast.success("Marked as resolved");
            setDetail(null);
          } catch (e) {
            toast.error(e instanceof Error ? e.message : "Resolution failed");
          }
        }}
        onVerify={() => {
          if (liveDetail) setVerifyTarget(liveDetail);
          setDetail(null);
        }}
        onZoomImage={setZoom}
        history={statusHistory}
        historyLoading={historyLoading}
      />

      <EditDialog
        report={editing}
        isConfigured={isConfigured}
        onSave={async (draft) => {
          try {
            if (isConfigured) {
              await update.mutateAsync({
                id: draft.id,
                patch: {
                  title: draft.title,
                  description: draft.description,
                  category: draft.category,
                  location: draft.location,
                  lat: draft.lat,
                  lng: draft.lng,
                  status: draft.status,
                },
              });
            } else {
              const { updateReport } = await import("@/lib/storage");
              updateReport(draft.id, {
                title: draft.title,
                description: draft.description,
                category: draft.category,
                location: draft.location,
                lat: draft.lat,
                lng: draft.lng,
                status: draft.status as "Pending" | "In Progress" | "Resolved",
              });
              window.dispatchEvent(new Event("civiceye:reports"));
            }
            toast.success("Report updated");
          } catch (e) {
            toast.error(e instanceof Error ? e.message : "Update failed");
          }
        }}
        onClose={() => setEditing(null)}
      />

      <ImageModal src={zoom} onClose={() => setZoom(null)} />
    </AppShell>
  );
}

function SubmissionConfirmation({
  reportId,
  report,
  loading,
}: {
  reportId: string;
  report: Report | null;
  loading: boolean;
}) {
  const ref = reportId.slice(0, 8).toUpperCase();

  const copyRef = async () => {
    try {
      await navigator.clipboard.writeText(reportId);
      toast.success("Reference copied");
    } catch {
      toast.error("Could not copy reference");
    }
  };

  return (
    <div
      className="mb-4 rounded-2xl border border-success/30 bg-success/10 p-4 sm:p-5"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-sm font-bold text-success">
            <FiCheckCircle aria-hidden /> Report submitted successfully
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Your reference is <span className="font-mono font-bold text-foreground">#{ref}</span>
            {report && !loading && (
              <span>
                {" "}
                — {report.category} · {report.status}
              </span>
            )}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Save this reference to track status. Your organization will review the report and update
            its progress.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void copyRef()}
          className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-bold hover:bg-secondary"
        >
          <FiClipboard aria-hidden /> Copy reference
        </button>
      </div>
    </div>
  );
}

function EditDialog({
  report,
  isConfigured,
  onSave,
  onClose,
}: {
  report: Report | null;
  isConfigured: boolean;
  onSave: (draft: Report) => Promise<void>;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<Report | null>(report);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDraft(report);
  }, [report]);

  const field =
    "mt-1.5 w-full rounded-xl border border-border bg-card/60 px-3 py-2.5 text-sm outline-none focus:border-primary";

  return (
    <AnimatePresence>
      {report && draft && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[1000] grid place-items-center overflow-y-auto bg-background/70 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, y: 14 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass my-8 w-full max-w-lg rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Edit report</h3>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-lg p-1 hover:bg-secondary"
              >
                <FiX />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <label className="block">
                <span className="text-xs font-bold text-muted-foreground">Title</span>
                <input
                  value={draft.title}
                  onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                  className={field}
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-muted-foreground">Description</span>
                <textarea
                  rows={3}
                  value={draft.description}
                  onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                  className={field}
                />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-bold text-muted-foreground">Category</span>
                  <select
                    value={draft.category}
                    onChange={(e) => setDraft({ ...draft, category: e.target.value as Category })}
                    className={field}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
                {isConfigured && (
                  <label className="block">
                    <span className="text-xs font-bold text-muted-foreground">Status</span>
                    <select
                      value={draft.status}
                      onChange={(e) => setDraft({ ...draft, status: e.target.value as Status })}
                      className={field}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
                <label className="block sm:col-span-2">
                  <span className="text-xs font-bold text-muted-foreground">Location</span>
                  <input
                    value={draft.location}
                    onChange={(e) => setDraft({ ...draft, location: e.target.value })}
                    className={field}
                  />
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={onClose}
                className="rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary"
              >
                Cancel
              </button>
              <button
                disabled={saving}
                onClick={async () => {
                  setSaving(true);
                  await onSave(draft);
                  setSaving(false);
                  onClose();
                }}
                className="bg-brand inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-primary-foreground disabled:opacity-60"
              >
                <FiSave /> Save changes
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function IssueDetailDialog({
  report,
  isStaff,
  isConfigured,
  canVerify,
  onClose,
  onAssign,
  onEdit,
  onResolve,
  onVerify,
  onZoomImage,
  history,
  historyLoading,
}: {
  report: Report | null;
  isStaff: boolean;
  isConfigured: boolean;
  canVerify: boolean;
  onClose: () => void;
  onAssign: () => void;
  onEdit: () => void;
  onResolve: () => void;
  onVerify: () => void;
  onZoomImage: (src: string) => void;
  history: IssueStatusHistoryEntry[];
  historyLoading: boolean;
}) {
  return (
    <AnimatePresence>
      {report && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[1000] grid place-items-center overflow-y-auto bg-background/70 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, y: 14 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="issue-detail-title"
            className="glass my-8 w-full max-w-4xl rounded-2xl p-0 sm:p-0"
          >
            {/* Header */}
            <div className="border-b border-border px-6 py-5 sm:px-8">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                    Issue #{report.id.slice(0, 8)}
                  </p>
                  <h3 id="issue-detail-title" className="mt-1 text-xl font-bold sm:text-2xl">
                    {report.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <StatusBadge status={report.status} />
                    <SlaBadge report={report} />
                    <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-bold">
                      {report.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="rounded-lg p-2 hover:bg-secondary"
                >
                  <FiX />
                </button>
              </div>

              <IssueWorkflowBar
                className="mt-4 rounded-xl border border-border bg-secondary/40 p-3"
                status={report.status}
                assigned={Boolean(report.assignedTo)}
              />

              <div className="mt-4 flex flex-wrap gap-2">
                {isStaff && !report.assignedTo && report.status === "Pending" && isConfigured && (
                  <button onClick={onAssign} className="btn-secondary text-sm">
                    Assign
                  </button>
                )}
                {isStaff && report.status === "In Progress" && (
                  <button
                    onClick={onResolve}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-success/30 px-4 py-2 text-sm font-bold text-success hover:bg-success/5"
                  >
                    Mark resolved
                  </button>
                )}
                {canVerify && isAwaitingCitizenVerification(report.status) && (
                  <button onClick={onVerify} className="btn-primary px-4 py-2 text-sm">
                    Verify resolution
                  </button>
                )}
                {isStaff && (
                  <button onClick={onEdit} className="btn-secondary text-sm">
                    Edit
                  </button>
                )}
              </div>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1fr_280px]">
              {/* Main content */}
              <div className="px-6 py-5 sm:px-8">
                <section>
                  <h4 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Description
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed">{report.description}</p>
                </section>

                <section className="mt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Evidence
                  </h4>
                  <ReportImage
                    src={report.image}
                    alt={report.title}
                    onClick={report.image ? () => onZoomImage(report.image!) : undefined}
                    className="mt-2 h-52 w-full rounded-xl object-cover sm:h-56"
                    placeholderClassName="mt-2 h-52 w-full rounded-xl sm:h-56"
                  />
                </section>

                <section className="mt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Location
                  </h4>
                  <p className="mt-2 flex items-center gap-1.5 text-sm">
                    <FiMapPin className="shrink-0" aria-hidden /> {report.location}
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {report.lat.toFixed(5)}, {report.lng.toFixed(5)}
                  </p>
                  <ReportMiniMap lat={report.lat} lng={report.lng} className="mt-3 h-48 w-full" />
                </section>

                <section className="mt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Activity
                  </h4>
                  {historyLoading ? (
                    <p className="mt-2 text-sm text-muted-foreground">Loading history…</p>
                  ) : history.length === 0 ? (
                    <p className="mt-2 text-sm text-muted-foreground">
                      No status changes recorded yet.
                    </p>
                  ) : (
                    <ul className="mt-3 space-y-2">
                      {history.map((entry) => (
                        <li
                          key={entry.id}
                          className="rounded-xl border border-border bg-secondary/40 px-3 py-2 text-sm"
                        >
                          <p className="font-semibold">
                            {entry.fromStatus ? `${entry.fromStatus} → ` : ""}
                            {entry.toStatus}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {new Date(entry.createdAt).toLocaleString()}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </div>

              {/* Sidebar */}
              <aside className="border-t border-border bg-secondary/30 px-6 py-5 lg:border-l lg:border-t-0 sm:px-6">
                <h4 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Details
                </h4>
                <dl className="mt-4 space-y-4 text-sm">
                  <div>
                    <dt className="text-xs font-bold text-muted-foreground">Category</dt>
                    <dd className="mt-1 font-semibold">{report.category}</dd>
                  </div>
                  {report.assigneeName && (
                    <div>
                      <dt className="text-xs font-bold text-muted-foreground">Assigned to</dt>
                      <dd className="mt-1">{report.assigneeName}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-xs font-bold text-muted-foreground">SLA</dt>
                    <dd className="mt-1">
                      <SlaBadge report={report} />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold text-muted-foreground">Created</dt>
                    <dd className="mt-1">{new Date(report.createdAt).toLocaleString()}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold text-muted-foreground">Updated</dt>
                    <dd className="mt-1">{new Date(report.updatedAt).toLocaleString()}</dd>
                  </div>
                  {report.resolvedAt && (
                    <div>
                      <dt className="text-xs font-bold text-muted-foreground">Resolved</dt>
                      <dd className="mt-1">{new Date(report.resolvedAt).toLocaleString()}</dd>
                    </div>
                  )}
                </dl>
              </aside>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
