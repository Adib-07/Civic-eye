import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
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
};

export default function MapView({ reports }: { reports: Report[] }) {
  const center: [number, number] = reports.length
    ? [reports[0].lat, reports[0].lng]
    : [28.6139, 77.209];

  return (
    <MapContainer
      center={center}
      zoom={12}
      scrollWheelZoom
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {reports.map((r) => (
        <Marker key={r.id} position={[r.lat, r.lng]} icon={icon(colors[r.status] ?? "#2aa5b8")}>
          <Popup>
            <div style={{ width: 220 }}>
              {r.image && (
                <img
                  src={r.image}
                  alt={r.title}
                  style={{
                    width: "100%",
                    height: 110,
                    objectFit: "cover",
                    borderRadius: 10,
                    marginBottom: 8,
                  }}
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
