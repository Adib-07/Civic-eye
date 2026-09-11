import { o as __toESM } from "../_runtime.mjs";
import { n as MAP_TILE_ATTRIBUTION, r as MAP_TILE_URL, t as DEFAULT_MAP_CENTER } from "./map-config-DNeTFeeJ.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as require_leaflet_src } from "../_libs/leaflet.mjs";
import { a as useMap, i as MapContainer, n as Popup, r as Marker, t as TileLayer } from "../_libs/react-leaflet.mjs";
import { t as ReportImage } from "./ReportImage-CuX88nI4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/MapView-C4J0qpIH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_leaflet_src = /* @__PURE__ */ __toESM(require_leaflet_src());
var icon = (color, selected) => import_leaflet_src.default.divIcon({
	className: "",
	html: `<span style="display:grid;place-items:center;width:${selected ? 32 : 26}px;height:${selected ? 32 : 26}px;border-radius:999px;background:${color};box-shadow:0 2px 8px rgba(15,23,42,.25);border:2px solid ${selected ? "#fff" : "rgba(255,255,255,.9)"};${selected ? "outline:2px solid rgba(15,23,42,.35);outline-offset:2px;" : ""}"><span style="width:7px;height:7px;border-radius:999px;background:#fff"></span></span>`,
	iconSize: [selected ? 32 : 26, selected ? 32 : 26],
	iconAnchor: [selected ? 16 : 13, selected ? 16 : 13],
	popupAnchor: [0, selected ? -16 : -13]
});
var colors = {
	Pending: "#b45309",
	"In Progress": "#2563eb",
	Resolved: "#059669",
	Verified: "#16a34a",
	Closed: "#64748b"
};
function MapFitter({ reports }) {
	const map = useMap();
	(0, import_react.useEffect)(() => {
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
	(0, import_react.useEffect)(() => {
		if (!reports.length) return;
		const points = reports.map((r) => [r.lat, r.lng]);
		if (points.length === 1) {
			map.setView(points[0], 15);
			return;
		}
		map.fitBounds(import_leaflet_src.default.latLngBounds(points).pad(.25), {
			animate: false,
			maxZoom: 15
		});
	}, [map, reports]);
	return null;
}
function FlyToSelected({ report }) {
	const map = useMap();
	(0, import_react.useEffect)(() => {
		if (!report) return;
		map.flyTo([report.lat, report.lng], Math.max(map.getZoom(), 15), { duration: .6 });
	}, [map, report]);
	return null;
}
function MapView({ reports, selectedId }) {
	const center = reports.length ? [reports[0].lat, reports[0].lng] : [DEFAULT_MAP_CENTER.lat, DEFAULT_MAP_CENTER.lng];
	const selected = selectedId ? reports.find((r) => r.id === selectedId) ?? null : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MapContainer, {
		center,
		zoom: 12,
		minZoom: 3,
		maxZoom: 19,
		scrollWheelZoom: true,
		style: {
			height: "100%",
			width: "100%",
			background: "var(--muted)"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapFitter, { reports }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlyToSelected, { report: selected }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TileLayer, {
				attribution: MAP_TILE_ATTRIBUTION,
				url: MAP_TILE_URL,
				maxZoom: 19,
				crossOrigin: true
			}),
			reports.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marker, {
				position: [r.lat, r.lng],
				icon: icon(colors[r.status] ?? "#2563eb", r.id === selectedId),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popup, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						width: 200,
						maxWidth: "60vw"
					},
					children: [
						r.image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportImage, {
							src: r.image,
							alt: r.title,
							className: "mb-2 h-[100px] w-full rounded-md object-cover",
							placeholderClassName: "mb-2 h-[100px] w-full rounded-md"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								fontSize: 11,
								fontWeight: 600,
								color: colors[r.status]
							},
							children: [
								r.category,
								" · ",
								r.status
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: 14,
								fontWeight: 600,
								marginTop: 2
							},
							children: r.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: 12,
								opacity: .7,
								marginTop: 2
							},
							children: r.location
						})
					]
				}) })
			}, r.id))
		]
	});
}
//#endregion
export { MapView as default };
