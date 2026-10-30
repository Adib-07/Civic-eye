import L from "leaflet";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { ReportImage } from "@/components/ReportImage";
import { MAP_TILE_ATTRIBUTION, MAP_TILE_URL, DEFAULT_MAP_CENTER } from "@/lib/map-config";
import type { Report } from "@/lib/types";

const icon = (color: string, selected: boolean) =>
  L.divIcon({
    className: "",
    html: `<span style="display:grid;place-items:center;width:${selected ? 32 : 26}px;height:${selected ? 32 : 26}px;border-radius:999px;background:${color};box-shadow:0 2px 8px rgba(15,23,42,.25);border:2px solid ${selected ? "#fff" : "rgba(255,255,255,.9)"};${selected ? "outline:2px solid rgba(15,23,42,.35);outline-offset:2px;" : ""}"><span style="width:7px;height:7px;border-radius:999px;background:#fff"></span></span>`,
    iconSize: [selected ? 32 : 26, selected ? 32 : 26],
    iconAnchor: [selected ? 16 : 13, selected ? 16 : 13],
    popupAnchor: [0, selected ? -16 : -13],
  });

const colors: Record<string, string> = {
  Pending: "#b45309",
  "In Progress": "#2563eb",
  Resolved: "#059669",
  Verified: "#16a34a",
  Closed: "#64748b",
};

function MapFitter({ reports }: { reports: Report[] }) {
  const map = useMap();

  useEffect(() => {
    const resize = () => map.invalidateSize();
    const t1 = window.setTimeout(resize, 0);
    const t2 = window.setTimeout(resize, 300);

    const container = map.getContainer();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    ro?.observe(container);
    window.addEventListener("resize", resize);
    window.addEventListener("orientationchange", resize);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      ro?.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", resize);
    };
  }, [map]);

  useEffect(() => {
    if (!reports.length) return;
    const points = reports.map((r) => [r.lat, r.lng] as [number, number]);
    if (points.length === 1) {
      map.setView(points[0], 15);
      return;
    }
    map.fitBounds(L.latLngBounds(points).pad(0.25), { animate: false, maxZoom: 15 });
  }, [map, reports]);

  return null;
}

function FlyToSelected({ report }: { report: Report | null }) {
  const map = useMap();
  useEffect(() => {
    if (!report) return;
    map.flyTo([report.lat, report.lng], Math.max(map.getZoom(), 15), { duration: 0.6 });
  }, [map, report]);
  return null;
}

export default function MapView({
  reports,
  selectedId,
}: {
  reports: Report[];
  selectedId?: string | null;
}) {
  const center: [number, number] = reports.length
    ? [reports[0].lat, reports[0].lng]
    : [DEFAULT_MAP_CENTER.lat, DEFAULT_MAP_CENTER.lng];

  const selected = selectedId ? (reports.find((r) => r.id === selectedId) ?? null) : null;

  return (
    <MapContainer
      center={center}
      zoom={12}
      minZoom={3}
      maxZoom={19}
      scrollWheelZoom
      style={{ height: "100%", width: "100%", background: "var(--muted)" }}
    >
      <MapFitter reports={reports} />
      <FlyToSelected report={selected} />
      <TileLayer attribution={MAP_TILE_ATTRIBUTION} url={MAP_TILE_URL} maxZoom={19} crossOrigin />
      {reports.map((r) => (
        <Marker
          key={r.id}
          position={[r.lat, r.lng]}
          icon={icon(colors[r.status] ?? "#2563eb", r.id === selectedId)}
        >
          <Popup>
            <div style={{ width: 200, maxWidth: "60vw" }}>
              {r.image && (
                <ReportImage
                  src={r.image}
                  alt={r.title}
                  className="mb-2 h-[100px] w-full rounded-md object-cover"
                  placeholderClassName="mb-2 h-[100px] w-full rounded-md"
                />
              )}
              <div style={{ fontSize: 11, fontWeight: 600, color: colors[r.status] }}>
                {r.category} · {r.status}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{r.title}</div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>{r.location}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
