//#region node_modules/.nitro/vite/services/ssr/assets/map-config-DNeTFeeJ.js
/**
* Map tile configuration. Override via environment variables for production.
*
* VITE_MAP_TILE_URL — raster tile template, e.g. https://tile.openstreetmap.org/{z}/{x}/{y}.png
* VITE_MAP_TILE_ATTRIBUTION — HTML attribution string for the tile layer
*/
var _mapEnv = {
	VITE_MAP_TILE_URL: void 0,
	VITE_MAP_TILE_ATTRIBUTION: void 0
};
function readEnv(key) {
	const value = _mapEnv[key];
	if (!value?.trim()) return void 0;
	return value.trim();
}
var MAP_TILE_URL = readEnv("VITE_MAP_TILE_URL") ?? "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
var MAP_TILE_ATTRIBUTION = readEnv("VITE_MAP_TILE_ATTRIBUTION") ?? "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors";
/** Default map center when no coordinates are available (New Delhi). */
var DEFAULT_MAP_CENTER = {
	lat: 28.6139,
	lng: 77.209
};
function isValidCoordinate(lat, lng) {
	return Number.isFinite(lat) && Number.isFinite(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}
//#endregion
export { isValidCoordinate as i, MAP_TILE_ATTRIBUTION as n, MAP_TILE_URL as r, DEFAULT_MAP_CENTER as t };
