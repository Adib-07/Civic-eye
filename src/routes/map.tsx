import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useMemo, useState } from "react";
import { FiMapPin, FiPlusCircle, FiSearch } from "react-icons/fi";
import { AppShell } from "@/components/AppShell";
import { EmptyState, Loader } from "@/components/EmptyState";
import { ReportImage } from "@/components/ReportImage";
import { SlaBadge } from "@/components/SlaBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { CATEGORIES, STATUSES, type Category, type Status } from "@/lib/types";
import { useHydrated, useReports } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const MapView = lazy(() => import("@/components/MapView"));

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Live Issue Map — CivicEye" },
      {
        name: "description",
        content:
          "See every reported city problem plotted on an interactive OpenStreetMap with photos, categories and live status.",
      },
      { property: "og:title", content: "Live Issue Map — CivicEye" },
      { property: "og:description", content: "Interactive map of civic issues across the city." },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const { reports, loading } = useReports();
  const hydrated = useHydrated();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | Status>("All");
  const [catFilter, setCatFilter] = useState<"All" | Category>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reports.filter((r) => {
      const matchQ =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q);
      const matchStatus = statusFilter === "All" || r.status === statusFilter;
      const matchCat = catFilter === "All" || r.category === catFilter;
      return matchQ && matchStatus && matchCat;
    });
  }, [reports, query, statusFilter, catFilter]);

  const selected = selectedId ? (filtered.find((r) => r.id === selectedId) ?? null) : null;

  const field =
    "rounded-md border border-border bg-card px-2.5 py-2 text-sm outline-none focus:border-primary";

  return (
    <AppShell
      title="Issue map"
      subtitle={`${filtered.length} geo-tagged report${filtered.length === 1 ? "" : "s"} on map`}
    >
      {loading || !hydrated ? (
        <Loader label="Loading issue map" />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
          <div className="surface-panel overflow-hidden p-1 relative">
            <div className="h-[50vh] min-h-[300px] w-full overflow-hidden rounded-md sm:h-[58vh] lg:h-[calc(100vh-12rem)]">
              <Suspense fallback={<Loader label="Preparing map" />}>
                <MapView reports={filtered} selectedId={selectedId} />
              </Suspense>
            </div>
            {filtered.length === 0 && (
              <div className="absolute inset-4 pointer-events-none flex items-center justify-center">
                <div className="pointer-events-auto max-w-sm rounded-xl border border-border bg-card/95 p-5 text-center shadow-lg backdrop-blur-md">
                  <FiMapPin className="mx-auto h-8 w-8 text-primary mb-2" />
                  <h3 className="text-base font-bold text-foreground">Interactive Map Ready</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    No reports match your current filters. Submit a new report to place a live
                    marker on this map.
                  </p>
                  <Link
                    to="/report"
                    className="btn-primary mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-xs"
                  >
                    <FiPlusCircle /> Submit a report
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 lg:max-h-[calc(100vh-12rem)]">
            <div className="surface-panel space-y-3 p-4">
              <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3">
                <FiSearch className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search issues…"
                  className="w-full bg-transparent py-2 text-sm outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={catFilter}
                  onChange={(e) => setCatFilter(e.target.value as Category | "All")}
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
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as Status | "All")}
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
            </div>

            {selected && (
              <div className="surface-panel overflow-hidden">
                <div className="p-4">
                  <p className="section-label">Selected issue</p>
                  <h2 className="mt-1 text-base font-semibold">{selected.title}</h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <StatusBadge status={selected.status} />
                    <SlaBadge report={selected} />
                    <span className="rounded-md border border-border bg-secondary px-2 py-0.5 text-xs font-medium">
                      {selected.category}
                    </span>
                  </div>
                </div>
                <ReportImage
                  src={selected.image}
                  alt={selected.title}
                  className="h-36 w-full object-cover"
                  placeholderClassName="h-36 w-full rounded-none border-y border-border"
                />
                <div className="space-y-2 p-4 text-sm">
                  <p className="leading-relaxed text-muted-foreground">{selected.description}</p>
                  <p className="flex items-start gap-1.5 text-muted-foreground">
                    <FiMapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                    {selected.location || "No place name"}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground">
                    {selected.lat.toFixed(5)}, {selected.lng.toFixed(5)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Ref #{selected.id.slice(0, 8).toUpperCase()} ·{" "}
                    {new Date(selected.createdAt).toLocaleString()}
                  </p>
                  {selected.assigneeName && (
                    <p className="text-xs font-medium">Assigned: {selected.assigneeName}</p>
                  )}
                </div>
              </div>
            )}

            <div className="surface-panel min-h-0 flex-1 overflow-hidden">
              <div className="border-b border-border px-4 py-3">
                <h2 className="text-sm font-semibold">Issues ({filtered.length})</h2>
              </div>
              <ul className="max-h-[40vh] overflow-y-auto lg:max-h-none lg:flex-1">
                {filtered.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(r.id)}
                      className={cn(
                        "w-full border-b border-border px-4 py-3 text-left transition-colors hover:bg-secondary/60",
                        selectedId === r.id && "bg-secondary",
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-medium leading-snug">{r.title}</span>
                        <StatusBadge status={r.status} />
                      </div>
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {r.category} · {r.location}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
