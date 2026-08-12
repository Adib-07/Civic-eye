import L from "leaflet";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { ReportImage } from "@/components/ReportImage";
import { MAP_TILE_ATTRIBUTION, MAP_TILE_URL, DEFAULT_MAP_CENTER } from "@/lib/map-config";
import type { Report } from "@/lib/types";

const icon = (color: string) =>
  L.divIcon({
    className: "",
    html: `<span style="display:grid;place-items:center;width:28px;height:28px;border-radius:999px;background:${color};box-shadow:0 6px 18px rgba(0,0,0,.35);border:2px solid rgba(255,255,255,.85)"><span style="width:8px;height:8px;border-radius:999px;background:#fff"></span></span>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });

const colors: Record<string, string> = {
  Pending: "#e0a325",
  "In Progress": "#2aa5b8",
  Resolved: "#2fae76",
  Verified: "#22c55e",
  Closed: "#94a3b8",
};

/** Keeps Leaflet's canvas in sync with its container and frames every marker. */
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

export default function MapView({ reports }: { reports: Report[] }) {
  const center: [number, number] = reports.length
    ? [reports[0].lat, reports[0].lng]
    : [DEFAULT_MAP_CENTER.lat, DEFAULT_MAP_CENTER.lng];

  return (
    <MapContainer
      center={center}
      zoom={12}
      minZoom={3}
      maxZoom={19}
      scrollWheelZoom
      style={{ height: "100%", width: "100%", background: "#e8eef7" }}
    >
      <MapFitter reports={reports} />
      <TileLayer attribution={MAP_TILE_ATTRIBUTION} url={MAP_TILE_URL} maxZoom={19} crossOrigin />
      {reports.map((r) => (
        <Marker key={r.id} position={[r.lat, r.lng]} icon={icon(colors[r.status] ?? "#2aa5b8")}>
          <Popup>
            <div style={{ width: 200, maxWidth: "60vw" }}>
              {r.image && (
                <ReportImage
                  src={r.image}
                  alt={r.title}
                  className="mb-2 h-[100px] w-full rounded-[10px] object-cover"
                  placeholderClassName="mb-2 h-[100px] w-full rounded-[10px]"
                />
              )}
              <div style={{ fontSize: 11, fontWeight: 800, color: colors[r.status] }}>
                {r.category} · {r.status}
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, marginTop: 2 }}>{r.title}</div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>📍 {r.location}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
