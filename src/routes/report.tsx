import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import {
  FiUploadCloud,
  FiMapPin,
  FiSend,
  FiAlertCircle,
  FiCheck,
  FiChevronDown,
  FiCamera,
} from "react-icons/fi";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Loader } from "@/components/EmptyState";
import { ImageModal } from "@/components/ImageModal";
import { predictCategory } from "@/lib/ai";
import { getDefaultOrganizationId, isSupabaseConfigured } from "@/lib/env";
import { useHydrated, useReportMutations } from "@/lib/hooks";
import {
  buildQuickReportPayload,
  requestDeviceLocation,
  suggestDescription,
  suggestTitle,
  type GeoStatus,
} from "@/lib/report-quick";
import { addReport } from "@/lib/storage";
import { CATEGORIES, type Category } from "@/lib/types";
import { cn } from "@/lib/utils";

const LocationPicker = lazy(() => import("@/components/LocationPicker"));

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const DEFAULT_LAT = 28.6139;
const DEFAULT_LNG = 77.209;

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Report a City Issue — CivicEye" },
      {
        name: "description",
        content:
          "Snap a photo, confirm the issue type, and submit a geo-tagged report in under 30 seconds.",
      },
    ],
  }),
  component: ReportPage,
});

function ReportPage() {
  const navigate = useNavigate();
  const { create } = useReportMutations();
  const configured = isSupabaseConfigured();
  const orgMissing = configured && !getDefaultOrganizationId();
  const hydrated = useHydrated();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [zoom, setZoom] = useState<string | null>(null);
  const [ai, setAi] = useState<{ category: Category; confidence: number } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadPhase, setUploadPhase] = useState<"idle" | "uploading" | "saving">("idle");
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const [category, setCategory] = useState<Category>("Pothole");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [geoStatus, setGeoStatus] = useState<GeoStatus>("idle");

  const captureLocation = useCallback(async (silent = false) => {
    setGeoStatus("loading");
    try {
      const coords = await requestDeviceLocation();
      setLat(coords.lat);
      setLng(coords.lng);
      setGeoStatus("ready");
      if (!silent) toast.success("Location captured");
    } catch (err) {
      const code = err instanceof GeolocationPositionError ? err.code : null;
      if (code === 1) {
        setGeoStatus("denied");
        if (!silent) toast.error("Location permission denied — enter details manually");
      } else if (String(err).includes("unsupported")) {
        setGeoStatus("unsupported");
      } else {
        setGeoStatus("denied");
        if (!silent) toast.error("Could not get your location");
      }
      setLat(DEFAULT_LAT);
      setLng(DEFAULT_LNG);
    }
  }, []);

  useEffect(() => {
    void captureLocation(true);
  }, [captureLocation]);

  const applyCategory = (next: Category, fromAi = false) => {
    setCategory(next);
    if (!title.trim() || fromAi) setTitle(suggestTitle(next));
    if (!description.trim() || fromAi) setDescription(suggestDescription(next));
  };

  const onFile = (file?: File) => {
    if (!file) return;
    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("Please select a JPEG, PNG, or WebP image.");
      toast.error("Invalid file type");
      return;
    }

    if (file.size > MAX_IMAGE_BYTES) {
      setError(`Image must be under ${MAX_IMAGE_BYTES / (1024 * 1024)} MB.`);
      toast.error("Image too large");
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onerror = () => {
      setError("Could not read the selected image.");
      toast.error("Failed to read image");
    };
    reader.onload = () => {
      setImagePreview(reader.result as string);
      const result = predictCategory(file.name);
      setAi(result);
      applyCategory(result.category, true);
    };
    reader.readAsDataURL(file);
  };

  const readyToSubmit =
    lat !== null && lng !== null && !submitting && !orgMissing && geoStatus !== "loading";

  const handleLocationPick = (nextLat: number, nextLng: number) => {
    setLat(nextLat);
    setLng(nextLng);
    setGeoStatus("ready");
  };

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);

    if (lat === null || lng === null) {
      toast.error("Waiting for location — tap Retry or add coordinates in details");
      return;
    }

    setSubmitting(true);
    setUploadPhase(imageFile && configured ? "uploading" : "saving");

    try {
      const payload = buildQuickReportPayload({
        category,
        lat,
        lng,
        title,
        description,
        location,
      });

      if (configured) {
        if (imageFile) setUploadPhase("uploading");
        await create.mutateAsync({
          ...payload,
          imageFile,
          aiCategory: ai?.category ?? null,
          aiConfidence: ai?.confidence ?? null,
        });
      } else {
        if (imageFile && imageFile.size > 800_000) {
          throw new Error(
            "Offline mode: image too large for local storage. Use a smaller photo or configure Supabase.",
          );
        }
        addReport({
          ...payload,
          image: imagePreview,
          aiCategory: ai?.category ?? null,
          aiConfidence: ai?.confidence ?? null,
        });
      }

      toast.success("Report submitted — thank you!");
      navigate({ to: "/reports" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Submission failed";
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
      setUploadPhase("idle");
    }
  };

  const submitLabel =
    uploadPhase === "uploading"
      ? "Uploading photo…"
      : uploadPhase === "saving"
        ? "Submitting…"
        : "Submit report";

  const field =
    "mt-1.5 w-full rounded-xl border border-border bg-card/60 px-3 py-3 text-sm outline-none focus:border-primary";

  return (
    <AppShell title="Report an issue" subtitle="Photo → category → submit (under 30 seconds)">
      {!configured && (
        <div className="mb-4 flex items-start gap-3 rounded-2xl border border-warning/30 bg-warning/10 p-3 text-sm">
          <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
          <p className="text-muted-foreground">
            Offline demo mode — reports save to this device only.
          </p>
        </div>
      )}

      {orgMissing && (
        <div className="mb-4 flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-3 text-sm">
          <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
          <p>
            <span className="font-bold">Organization not configured.</span> Set{" "}
            <code className="font-mono text-xs">VITE_DEFAULT_ORGANIZATION_ID</code> in your{" "}
            <code className="font-mono text-xs">.env</code> file before submitting reports to
            production.
          </p>
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-2xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="pb-24 lg:pb-0">
        {/* 1 — Photo (primary action) */}
        <section className="glass rounded-2xl p-4 sm:p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">Step 1 · Photo</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            capture="environment"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0])}
          />

          {imagePreview ? (
            <button
              type="button"
              onClick={() => setZoom(imagePreview)}
              className="mt-3 block w-full overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <img
                src={imagePreview}
                alt="Your report photo"
                className="h-48 w-full object-cover sm:h-56"
              />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-3 flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 px-4 py-10 transition-colors hover:border-primary hover:bg-primary/10 active:scale-[0.99]"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground">
                <FiCamera className="h-7 w-7" />
              </span>
              <span className="text-base font-bold">Tap to take or upload a photo</span>
              <span className="text-xs text-muted-foreground">Camera works best on your phone</span>
            </button>
          )}

          {imagePreview && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 text-xs font-semibold text-primary hover:underline"
            >
              Change photo
            </button>
          )}
        </section>

        {/* 2 — Category chips */}
        <section className="glass mt-4 rounded-2xl p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-bold uppercase tracking-wide text-primary">
              Step 2 · Issue type
            </p>
            {ai && (
              <span className="text-[11px] font-semibold text-success">
                Suggested · {ai.confidence}%
              </span>
            )}
          </div>
          <div className="mt-3 -mx-1 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => applyCategory(c)}
                className={cn(
                  "shrink-0 rounded-full border px-3.5 py-2 text-xs font-bold transition-colors",
                  category === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:bg-secondary",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        {/* 3 — Location status */}
        <section className="glass mt-4 rounded-2xl p-4 sm:p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">
            Step 3 · Location
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm">
              {geoStatus === "loading" && (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-primary" />
                  <span className="text-muted-foreground">Getting GPS…</span>
                </>
              )}
              {geoStatus === "ready" && (
                <>
                  <FiCheck className="h-4 w-4 text-success" />
                  <span className="font-semibold text-success">Location ready</span>
                  {lat !== null && lng !== null && (
                    <span className="text-xs text-muted-foreground">
                      {lat.toFixed(4)}, {lng.toFixed(4)}
                    </span>
                  )}
                </>
              )}
              {(geoStatus === "denied" || geoStatus === "unsupported") && (
                <>
                  <FiAlertCircle className="h-4 w-4 text-warning" />
                  <span className="text-sm text-muted-foreground">
                    GPS unavailable — check details below
                  </span>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={() => void captureLocation(false)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 text-xs font-bold hover:bg-secondary"
            >
              <FiMapPin className="h-3.5 w-3.5" /> Use my location
            </button>
          </div>

          {lat !== null && lng !== null && hydrated && (
            <div className="mt-4">
              <p className="mb-2 text-xs text-muted-foreground">
                Tap the map or drag the pin to adjust the issue location.
              </p>
              <Suspense fallback={<Loader label="Loading map" />}>
                <LocationPicker
                  lat={lat}
                  lng={lng}
                  onChange={handleLocationPick}
                  className="h-52 w-full overflow-hidden rounded-xl border border-border sm:h-56"
                />
              </Suspense>
            </div>
          )}
        </section>

        {/* Optional details (collapsed by default) */}
        <section className="glass mt-4 overflow-hidden rounded-2xl">
          <button
            type="button"
            onClick={() => setShowDetails((v) => !v)}
            className="flex w-full items-center justify-between px-4 py-4 text-left sm:px-5"
          >
            <span className="text-sm font-bold">Add more details (optional)</span>
            <FiChevronDown
              className={cn("h-4 w-4 transition-transform", showDetails && "rotate-180")}
            />
          </button>
          <AnimatePresence initial={false}>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-border"
              >
                <div className="space-y-3 px-4 pb-5 pt-3 sm:px-5">
                  <label className="block">
                    <span className="text-xs font-bold text-muted-foreground">Title</span>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder={suggestTitle(category)}
                      className={field}
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold text-muted-foreground">Description</span>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={2}
                      placeholder={suggestDescription(category)}
                      className={field}
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold text-muted-foreground">Place name</span>
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. MG Road junction"
                      className={field}
                    />
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="text-xs font-bold text-muted-foreground">Latitude</span>
                      <input
                        value={lat ?? ""}
                        onChange={(e) => setLat(Number(e.target.value) || null)}
                        className={field}
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold text-muted-foreground">Longitude</span>
                      <input
                        value={lng ?? ""}
                        onChange={(e) => setLng(Number(e.target.value) || null)}
                        className={field}
                      />
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Desktop submit */}
        <button
          type="submit"
          disabled={!readyToSubmit}
          className="bg-brand mt-5 hidden w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-primary-foreground disabled:opacity-50 lg:flex"
        >
          {submitting ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
          ) : (
            <FiSend />
          )}
          {submitLabel}
        </button>
      </form>

      {/* Mobile sticky submit */}
      <div className="fixed inset-x-0 bottom-0 z-[850] border-t border-border bg-background/95 p-4 backdrop-blur-lg lg:hidden">
        <button
          type="button"
          disabled={!readyToSubmit}
          onClick={() => void submit()}
          className="bg-brand flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-primary-foreground shadow-lg disabled:opacity-50"
        >
          {submitting ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
          ) : (
            <FiSend />
          )}
          {submitLabel}
        </button>
      </div>

      <ImageModal src={zoom} onClose={() => setZoom(null)} />
    </AppShell>
  );
}
