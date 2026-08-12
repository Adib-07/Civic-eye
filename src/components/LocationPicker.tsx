import L from "leaflet";
import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";

const markerIcon = L.divIcon({
  className: "",
  html: `<span style="display:grid;place-items:center;width:32px;height:32px;border-radius:999px;background:#2aa5b8;box-shadow:0 6px 18px rgba(0,0,0,.35);border:3px solid #fff"><span style="width:10px;height:10px;border-radius:999px;background:#fff"></span></span>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

function MapEvents({
  onPick,
  draggable,
}: {
  onPick: (lat: number, lng: number) => void;
  draggable: boolean;
}) {
  useMapEvents({
    click(e) {
      if (!draggable) onPick(e.latlng.lat, e.latlng.lng);
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

function MapRecenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], Math.max(map.getZoom(), 15), { animate: true });
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
        style={{ height: "100%", width: "100%", background: "#e8eef7" }}
      >
        <MapResizer />
        <MapRecenter lat={lat} lng={lng} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
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
        {interactive && onChange && <MapEvents onPick={onChange} draggable={interactive} />}
      </MapContainer>
    </div>
  );
}
