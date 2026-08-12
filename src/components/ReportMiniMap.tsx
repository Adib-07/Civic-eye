import { lazy, Suspense } from "react";

const LocationPicker = lazy(() => import("./LocationPicker"));

export function ReportMiniMap({
  lat,
  lng,
  className,
}: {
  lat: number;
  lng: number;
  className?: string;
}) {
  return (
    <Suspense
      fallback={
        <div
          className={
            className ?? "h-40 w-full animate-pulse rounded-xl border border-border bg-secondary"
          }
        />
      }
    >
      <LocationPicker
        lat={lat}
        lng={lng}
        interactive={false}
        className={className ?? "h-40 w-full rounded-xl overflow-hidden border border-border"}
      />
    </Suspense>
  );
}
