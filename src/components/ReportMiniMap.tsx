import { lazy, Suspense } from "react";
import { FiMapPin } from "react-icons/fi";
import { isValidCoordinate } from "@/lib/map-config";
import { cn } from "@/lib/utils";

const LocationPicker = lazy(() => import("./LocationPicker"));

function MapUnavailable({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid place-items-center rounded-xl border border-border bg-secondary px-4 text-center",
        className,
      )}
      role="img"
      aria-label="Location map unavailable"
    >
      <div className="flex flex-col items-center gap-2 py-6">
        <FiMapPin className="h-6 w-6 text-muted-foreground" aria-hidden />
        <p className="text-xs font-semibold text-muted-foreground">
          Location coordinates unavailable
        </p>
      </div>
    </div>
  );
}

export function ReportMiniMap({
  lat,
  lng,
  className,
}: {
  lat: number;
  lng: number;
  className?: string;
}) {
  const resolvedClass = className ?? "h-40 w-full rounded-xl overflow-hidden border border-border";

  if (!isValidCoordinate(lat, lng)) {
    return <MapUnavailable className={resolvedClass} />;
  }

  return (
    <Suspense
      fallback={<div className={cn(resolvedClass, "animate-pulse bg-secondary")} aria-hidden />}
    >
      <LocationPicker lat={lat} lng={lng} interactive={false} className={resolvedClass} />
    </Suspense>
  );
}
