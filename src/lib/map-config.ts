/**
 * Map tile configuration. Override via environment variables for production.
 *
 * VITE_MAP_TILE_URL — raster tile template, e.g. https://tile.openstreetmap.org/{z}/{x}/{y}.png
 * VITE_MAP_TILE_ATTRIBUTION — HTML attribution string for the tile layer
 */

function readEnv(key: string): string | undefined {
  const value = import.meta.env[key] as string | undefined;
  if (!value?.trim()) return undefined;
  return value.trim();
}

export const MAP_TILE_URL =
  readEnv("VITE_MAP_TILE_URL") ?? "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

export const MAP_TILE_ATTRIBUTION =
  readEnv("VITE_MAP_TILE_ATTRIBUTION") ??
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

/** Default map center when no coordinates are available (New Delhi). */
export const DEFAULT_MAP_CENTER = { lat: 28.6139, lng: 77.209 } as const;

export function isValidCoordinate(lat: number, lng: number): boolean {
  return (
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
}
