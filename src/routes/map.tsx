import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { FiMapPin, FiPlusCircle } from "react-icons/fi";
import { AppShell } from "@/components/AppShell";
import { EmptyState, Loader } from "@/components/EmptyState";
import { StatusBadge } from "@/components/StatusBadge";
import { useHydrated, useReports } from "@/lib/hooks";

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

  return (
    <AppShell title="Interactive map" subtitle="Every report pinned on OpenStreetMap">
      {loading || !hydrated ? (
        <Loader label="Loading map" />
      ) : reports.length === 0 ? (
        <EmptyState
          icon={FiMapPin}
          title="Nothing on the map yet"
          description="Once reports are submitted with coordinates, they show up here as live markers."
          action={
            <Link
              to="/report"
              className="bg-brand inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-primary-foreground"
            >
              <FiPlusCircle /> New report
            </Link>
          }
        />
      ) : (
        <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
          <div className="glass overflow-hidden rounded-2xl p-1.5">
            <div className="h-[55vh] min-h-[320px] w-full overflow-hidden rounded-2xl sm:h-[60vh] lg:h-[70vh]">
              <Suspense fallback={<Loader label="Preparing map" />}>
                <MapView reports={reports} />
              </Suspense>
            </div>
          </div>

          <div className="glass max-h-[60vh] overflow-y-auto rounded-2xl p-4 sm:p-5 lg:max-h-[70vh]">
            <h2 className="text-sm font-bold">Pinned reports ({reports.length})</h2>
            <ul className="mt-4 space-y-3">
              {reports.map((r) => (
                <li key={r.id} className="rounded-xl border border-border bg-card/50 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-bold">{r.title}</span>
                    <StatusBadge status={r.status} />
                  </div>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {r.category} · {r.location}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {r.lat.toFixed(4)}, {r.lng.toFixed(4)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </AppShell>
  );
}
