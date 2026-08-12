import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
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
import { VerifyDialog } from "@/components/VerifyDialog";
import { getDefaultOrganizationId } from "@/lib/sla";
import { useAuth, useReportMutations, useReports, useStaffMembers } from "@/lib/hooks";
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

export const Route = createFileRoute("/reports")({
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

function ReportsPage() {
  const { reports, loading, error, refetch, isConfigured } = useReports();
  const { profile, user } = useAuth();
  const orgId = profile?.organizationId ?? getDefaultOrganizationId();
  const { data: staff = [] } = useStaffMembers(isConfigured ? orgId : null);
  const { update, remove, assign, verify } = useReportMutations();

  const isStaff = canManageReports(profile?.role);

  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<"All" | Category>("All");
  const [status, setStatus] = useState<"All" | Status>("All");
  const [toDelete, setToDelete] = useState<Report | null>(null);
  const [editing, setEditing] = useState<Report | null>(null);
  const [assignTarget, setAssignTarget] = useState<Report | null>(null);
  const [verifyTarget, setVerifyTarget] = useState<Report | null>(null);
  const [detail, setDetail] = useState<Report | null>(null);
  const [zoom, setZoom] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      reports.filter((r) => {
        const q = query.trim().toLowerCase();
        const matchQ =
          !q ||
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q);
        return (
          matchQ &&
          (cat === "All" || r.category === cat) &&
          (status === "All" || r.status === status)
        );
      }),
    [reports, query, cat, status],
  );

  const field =
    "rounded-xl border border-border bg-card/60 px-3 py-2.5 text-sm outline-none focus:border-primary";

  return (
    <AppShell
      title="All reports"
      subtitle={
        isConfigured
          ? `${reports.length} issues in your organization`
          : `${reports.length} issues stored locally on this device`
      }
    >
      <OnboardingBanner />

      <div className="glass grid gap-3 rounded-2xl p-4 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card/60 px-3">
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
      </div>

      {loading ? (
        <Loader label="Loading reports" />
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
            {filtered.map((r) => (
              <motion.article
                key={r.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="glass card-hover overflow-hidden rounded-2xl"
              >
                {r.image ? (
                  <img
                    src={r.image}
                    alt={r.title}
                    onClick={() => setZoom(r.image)}
                    className="h-44 w-full cursor-zoom-in object-cover"
                  />
                ) : (
                  <div className="grid h-44 w-full place-items-center bg-secondary text-xs font-semibold text-muted-foreground">
                    No photo attached
                  </div>
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
        report={detail}
        isStaff={isStaff}
        isConfigured={isConfigured}
        canVerify={detail ? canVerifyReport(profile?.role, detail, user?.id) : false}
        onClose={() => setDetail(null)}
        onAssign={() => {
          if (detail) setAssignTarget(detail);
          setDetail(null);
        }}
        onEdit={() => {
          if (detail) setEditing(detail);
          setDetail(null);
        }}
        onResolve={async () => {
          if (!detail) return;
          try {
            if (isConfigured) {
              await update.mutateAsync({ id: detail.id, patch: { status: "Resolved" } });
            } else {
              const { setStatus } = await import("@/lib/storage");
              setStatus(detail.id, "Resolved");
              window.dispatchEvent(new Event("civiceye:reports"));
            }
            toast.success("Marked as resolved");
            setDetail(null);
          } catch (e) {
            toast.error(e instanceof Error ? e.message : "Resolution failed");
          }
        }}
        onVerify={() => {
          if (detail) setVerifyTarget(detail);
          setDetail(null);
        }}
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
            className="glass my-8 w-full max-w-lg rounded-2xl p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                  Issue #{report.id.slice(0, 8)}
                </p>
                <h3 id="issue-detail-title" className="mt-1 text-lg font-bold">
                  {report.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-lg p-1 hover:bg-secondary"
              >
                <FiX />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <StatusBadge status={report.status} />
              <SlaBadge report={report} />
              <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-bold">
                {report.category}
              </span>
            </div>

            <IssueWorkflowBar
              className="mt-4 rounded-xl border border-border bg-secondary/40 p-3"
              status={report.status}
              assigned={Boolean(report.assignedTo)}
            />

            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-xs font-bold text-muted-foreground">Description</dt>
                <dd className="mt-1">{report.description}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold text-muted-foreground">Location</dt>
                <dd className="mt-1 flex items-center gap-1.5">
                  <FiMapPin className="shrink-0" aria-hidden /> {report.location}
                </dd>
                <dd className="mt-1 text-xs text-muted-foreground">
                  {report.lat.toFixed(5)}, {report.lng.toFixed(5)}
                </dd>
              </div>
              {report.assigneeName && (
                <div>
                  <dt className="text-xs font-bold text-muted-foreground">Assigned to</dt>
                  <dd className="mt-1">{report.assigneeName}</dd>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <dt className="text-xs font-bold text-muted-foreground">Created</dt>
                  <dd className="mt-1">{new Date(report.createdAt).toLocaleString()}</dd>
                </div>
                {report.resolvedAt && (
                  <div>
                    <dt className="text-xs font-bold text-muted-foreground">Resolved</dt>
                    <dd className="mt-1">{new Date(report.resolvedAt).toLocaleString()}</dd>
                  </div>
                )}
              </div>
            </dl>

            {report.image && (
              <img
                src={report.image}
                alt={report.title}
                className="mt-4 h-44 w-full rounded-xl object-cover"
              />
            )}

            <div className="mt-6 flex flex-wrap justify-end gap-2">
              {isStaff && !report.assignedTo && report.status === "Pending" && isConfigured && (
                <button
                  onClick={onAssign}
                  className="rounded-xl border border-primary/30 px-4 py-2 text-sm font-bold text-primary hover:bg-primary/5"
                >
                  Assign
                </button>
              )}
              {isStaff && report.status === "In Progress" && (
                <button
                  onClick={onResolve}
                  className="rounded-xl border border-success/30 px-4 py-2 text-sm font-bold text-success hover:bg-success/5"
                >
                  Mark resolved
                </button>
              )}
              {canVerify && isAwaitingCitizenVerification(report.status) && (
                <button
                  onClick={onVerify}
                  className="bg-brand rounded-xl px-4 py-2 text-sm font-bold text-primary-foreground"
                >
                  Verify resolution
                </button>
              )}
              {isStaff && (
                <button
                  onClick={onEdit}
                  className="rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary"
                >
                  Edit
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
