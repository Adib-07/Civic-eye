import { o as __toESM } from "../_runtime.mjs";
import { n as MAP_TILE_ATTRIBUTION, r as MAP_TILE_URL } from "./map-config-DNeTFeeJ.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as require_leaflet_src } from "../_libs/leaflet.mjs";
import { a as useMap, i as MapContainer, o as useMapEvents, r as Marker, t as TileLayer } from "../_libs/react-leaflet.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/LocationPicker-BgF18Zad.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var markerIcon = (/* @__PURE__ */ __toESM(require_leaflet_src())).default.divIcon({
	className: "",
	html: `<span style="display:grid;place-items:center;width:32px;height:32px;border-radius:999px;background:#2aa5b8;box-shadow:0 6px 18px rgba(0,0,0,.35);border:3px solid #fff"><span style="width:10px;height:10px;border-radius:999px;background:#fff"></span></span>`,
	iconSize: [32, 32],
	iconAnchor: [16, 16]
});
function MapEvents({ onPick }) {
	useMapEvents({ click(e) {
		onPick(e.latlng.lat, e.latlng.lng);
	} });
	return null;
}
function MapResizer() {
	const map = useMap();
	(0, import_react.useEffect)(() => {
		const resize = () => map.invalidateSize();
		const t = window.setTimeout(resize, 0);
		window.addEventListener("resize", resize);
		return () => {
			window.clearTimeout(t);
			window.removeEventListener("resize", resize);
		};
	}, [map]);
	return null;
}
/** Centers the map once on mount — avoids fighting user pan/zoom after interaction. */
function MapInitialCenter({ lat, lng }) {
	const map = useMap();
	const initialized = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!initialized.current) {
			map.setView([lat, lng], 15);
			initialized.current = true;
		}
	}, [
		lat,
		lng,
		map
	]);
	return null;
}
function LocationPicker({ lat, lng, onChange, interactive = true, className = "h-52 w-full rounded-xl overflow-hidden" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MapContainer, {
			center: [lat, lng],
			zoom: 15,
			minZoom: 3,
			maxZoom: 19,
			scrollWheelZoom: interactive,
			dragging: interactive,
			touchZoom: interactive,
			doubleClickZoom: interactive,
			style: {
				height: "100%",
				width: "100%",
				background: "#e8eef7"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapResizer, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapInitialCenter, {
					lat,
					lng
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TileLayer, {
					attribution: MAP_TILE_ATTRIBUTION,
					url: MAP_TILE_URL,
					maxZoom: 19,
					crossOrigin: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marker, {
					position: [lat, lng],
					icon: markerIcon,
					draggable: interactive,
					eventHandlers: interactive && onChange ? { dragend: (e) => {
						const pos = e.target.getLatLng();
						onChange(pos.lat, pos.lng);
					} } : void 0
				}),
				interactive && onChange && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapEvents, { onPick: onChange })
			]
		})
	});
}
//#endregion
export { LocationPicker as default };
