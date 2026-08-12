import L from "leaflet";
import { useEffect, useRef } from "react";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";

import { MAP_TILE_ATTRIBUTION, MAP_TILE_URL } from "@/lib/map-config";

const markerIcon = L.divIcon({
  className: "",
  html: `<span style="display:grid;place-items:center;width:32px;height:32px;border-radius:999px;background:#2aa5b8;box-shadow:0 6px 18px rgba(0,0,0,.35);border:3px solid #fff"><span style="width:10px;height:10px;border-radius:999px;background:#fff"></span></span>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

function MapEvents({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function MapResizer() {
  const map = useMap();
  useEffect(() => {
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
function MapInitialCenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current) {
      map.setView([lat, lng], 15);
      initialized.current = true;
    }
  }, [lat, lng, map]);
  return null;
}

export default function LocationPicker({
  lat,
  lng,
  onChange,
  interactive = true,
  className = "h-52 w-full rounded-xl overflow-hidden",
}: {
  lat: number;
  lng: number;
  onChange?: (lat: number, lng: number) => void;
  interactive?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        minZoom={3}
        maxZoom={19}
        scrollWheelZoom={interactive}
        dragging={interactive}
        touchZoom={interactive}
        doubleClickZoom={interactive}
        style={{ height: "100%", width: "100%", background: "#e8eef7" }}
      >
        <MapResizer />
        <MapInitialCenter lat={lat} lng={lng} />
        <TileLayer attribution={MAP_TILE_ATTRIBUTION} url={MAP_TILE_URL} maxZoom={19} crossOrigin />
        <Marker
          position={[lat, lng]}
          icon={markerIcon}
          draggable={interactive}
          eventHandlers={
            interactive && onChange
              ? {
                  dragend: (e) => {
                    const pos = e.target.getLatLng();
                    onChange(pos.lat, pos.lng);
                  },
                }
              : undefined
          }
        />
        {interactive && onChange && <MapEvents onPick={onChange} />}
      </MapContainer>
    </div>
  );
}
