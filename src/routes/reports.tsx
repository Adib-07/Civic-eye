import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { FiSearch, FiEdit2, FiTrash2, FiMapPin, FiPlusCircle, FiSave, FiX } from "react-icons/fi";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { EmptyState, Loader } from "@/components/EmptyState";
import { ImageModal } from "@/components/ImageModal";
import { StatusBadge } from "@/components/StatusBadge";
import { useReports } from "@/lib/hooks";
import { deleteReport, updateReport } from "@/lib/storage";
import { CATEGORIES, STATUSES, type Category, type Report, type Status } from "@/lib/types";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "All Civic Reports — CivicEye" },
      {
        name: "description",
        content:
          "Search, filter, edit and resolve every civic issue reported in your city, from potholes to broken street lights.",
      },
      { property: "og:title", content: "All Civic Reports — CivicEye" },
      {
        property: "og:description",
        content: "Browse and manage the full list of reported city problems.",
      },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  const { reports, loading } = useReports();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<"All" | Category>("All");
  const [status, setStatus] = useState<"All" | Status>("All");
  const [toDelete, setToDelete] = useState<Report | null>(null);
  const [editing, setEditing] = useState<Report | null>(null);
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
        return matchQ && (cat === "All" || r.category === cat) && (status === "All" || r.status === status);
      }),
    [reports, query, cat, status],
  );

  const field = "rounded-xl border border-border bg-card/60 px-3 py-2.5 text-sm outline-none focus:border-primary";

  return (
    <AppShell title="All reports" subtitle={`${reports.length} issues stored locally on this device`}>
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
        <select value={cat} onChange={(e) => setCat(e.target.value as Category | "All")} className={field}>
          <option value="All">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value as Status | "All")} className={field}>
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
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate rounded-full bg-secondary px-2.5 py-1 text-xs font-bold text-primary">
                      {r.category}
                    </span>
                    <StatusBadge status={r.status} />
                  </div>
                  <h3 className="mt-3 truncate text-lg font-bold">{r.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{r.description}</p>
                  <p className="mt-3 flex items-center gap-1.5 truncate text-xs text-muted-foreground">
                    <FiMapPin className="shrink-0" /> {r.location} · {r.lat.toFixed(3)},{" "}
                    {r.lng.toFixed(3)}
                  </p>
                  {r.aiCategory && (
                    <p className="mt-2 text-xs font-semibold text-accent">
                      AI: {r.aiCategory} ({r.aiConfidence}%)
                    </p>
                  )}
                  <div className="mt-4 flex gap-2">
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
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Delete this report?"
        description={`“${toDelete?.title ?? ""}” will be permanently removed from this device.`}
        onCancel={() => setToDelete(null)}
        onConfirm={() => {
          if (toDelete) deleteReport(toDelete.id);
          setToDelete(null);
          toast.success("Report deleted");
        }}
      />

      <EditDialog report={editing} onClose={() => setEditing(null)} />
      <ImageModal src={zoom} onClose={() => setZoom(null)} />
    </AppShell>
  );
}

function EditDialog({ report, onClose }: { report: Report | null; onClose: () => void }) {
  const [draft, setDraft] = useState<Report | null>(report);

  if (report && (!draft || draft.id !== report.id)) setDraft(report);

  const field = "mt-1.5 w-full rounded-xl border border-border bg-card/60 px-3 py-2.5 text-sm outline-none focus:border-primary";

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
              <button onClick={onClose} aria-label="Close" className="rounded-lg p-1 hover:bg-secondary">
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
                <label className="block">
                  <span className="text-xs font-bold text-muted-foreground">Location</span>
                  <input
                    value={draft.location}
                    onChange={(e) => setDraft({ ...draft, location: e.target.value })}
                    className={field}
                  />
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-xs font-bold text-muted-foreground">Lat</span>
                    <input
                      value={draft.lat}
                      onChange={(e) => setDraft({ ...draft, lat: Number(e.target.value) })}
                      className={field}
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold text-muted-foreground">Lng</span>
                    <input
                      value={draft.lng}
                      onChange={(e) => setDraft({ ...draft, lng: Number(e.target.value) })}
                      className={field}
                    />
                  </label>
                </div>
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
                onClick={() => {
                  if (Number.isNaN(draft.lat) || Number.isNaN(draft.lng)) {
                    toast.error("Coordinates must be numbers");
                    return;
                  }
                  updateReport(draft.id, draft);
                  toast.success("Report updated");
                  onClose();
                }}
                className="bg-brand inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-primary-foreground"
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
