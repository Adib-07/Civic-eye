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
  FiX,
} from "react-icons/fi";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Loader } from "@/components/EmptyState";
import { ImageModal } from "@/components/ImageModal";
import { predictCategory } from "@/lib/ai";
import { getDefaultOrganizationId, getSupabaseConfigError, isSupabaseConfigured } from "@/lib/env";
import { useHydrated, useReportMutations } from "@/lib/hooks";
import { DEFAULT_MAP_CENTER, isValidCoordinate } from "@/lib/map-config";
import {
  buildQuickReportPayload,
  requestDeviceLocation,
  suggestDescription,
  suggestTitle,
  type GeoStatus,
} from "@/lib/report-quick";
import { CATEGORIES, type Category } from "@/lib/types";
import { cn } from "@/lib/utils";

const LocationPicker = lazy(() => import("@/components/LocationPicker"));

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Report an Issue — CivicEye" },
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
  const configError = getSupabaseConfigError();
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
  const [usingFallbackLocation, setUsingFallbackLocation] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const captureLocation = useCallback(async (silent = false) => {
    setGeoStatus("loading");
    setUsingFallbackLocation(false);
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
        if (!silent) toast.error("Location permission denied — pick a spot on the map");
      } else if (String(err).includes("unsupported")) {
        setGeoStatus("unsupported");
        if (!silent) toast.error("Geolocation not supported — pick a spot on the map");
      } else {
        setGeoStatus("denied");
        if (!silent) toast.error("Could not get your location — pick a spot on the map");
      }
      setLat(DEFAULT_MAP_CENTER.lat);
      setLng(DEFAULT_MAP_CENTER.lng);
      setUsingFallbackLocation(true);
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
    lat !== null &&
    lng !== null &&
    !submitting &&
    configured &&
    !orgMissing &&
    geoStatus !== "loading";

  const handleLocationPick = (nextLat: number, nextLng: number) => {
    if (!isValidCoordinate(nextLat, nextLng)) {
      toast.error("Invalid coordinates — please pick another spot");
      return;
    }
    setLat(nextLat);
    setLng(nextLng);
    setGeoStatus("ready");
    setUsingFallbackLocation(false);
  };

  const clearImage = () => {
    setImagePreview(null);
    setImageFile(null);
    setAi(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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

      if (!configured) {
        throw new Error(configError ?? "Supabase is not configured for report submission.");
      }

      if (imageFile) setUploadPhase("uploading");
      const created = await create.mutateAsync({
        ...payload,
        imageFile,
        aiCategory: ai?.category ?? null,
        aiConfidence: ai?.confidence ?? null,
      });
      const reportId = created.id;

      toast.success("Report submitted successfully");
      navigate({
        to: "/reports",
        search: { submitted: reportId },
      });
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
    "mt-1.5 w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary";

  return (
    <AppShell title="Report an issue" subtitle="Photo → location → category → submit">
      <div className="surface-panel mb-4 p-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          <span className="font-medium text-foreground">Required:</span> issue category and location
          (GPS or map pin).
        </p>
        <p className="mt-1">
          <span className="font-medium text-foreground">Optional:</span> photo evidence, title,
          description, and place name.
        </p>
        <p className="mt-1">
          <span className="font-medium text-foreground">After submit:</span> you&apos;ll receive a
          reference ID and your organization will review the report in their operations queue.
        </p>
      </div>

      {!configured && configError && (
        <div className="mb-4 flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-3 text-sm">
          <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
          <p>{configError}</p>
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
        {/* Progress indicator */}
        <nav aria-label="Report progress" className="mb-5 grid grid-cols-4 gap-2">
          {(
            [
              { n: 1, label: "Evidence" },
              { n: 2, label: "Category" },
              { n: 3, label: "Location" },
              { n: 4, label: "Review" },
            ] as const
          ).map(({ n, label }) => (
            <button
              key={n}
              type="button"
              onClick={() => setStep(n)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-md border px-2 py-2.5 text-center transition-colors",
                step === n
                  ? "border-primary bg-primary/5 text-foreground"
                  : "border-border bg-card text-muted-foreground hover:bg-secondary",
              )}
            >
              <span
                className={cn(
                  "grid h-6 w-6 place-items-center rounded-full text-xs font-semibold",
                  step >= n ? "bg-primary text-primary-foreground" : "bg-secondary",
                )}
              >
                {n}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wide">{label}</span>
            </button>
          ))}
        </nav>

        {/* 1 — Photo (primary action) */}
        <section className={cn("surface-panel p-4 sm:p-5", step !== 1 && "hidden lg:block")}>
          <p className="section-label">Step 1 · Photo evidence</p>
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
              className="mt-3 flex w-full flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed border-border bg-secondary/50 px-4 py-10 transition-colors hover:border-primary/40 hover:bg-secondary"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground">
                <FiCamera className="h-6 w-6" />
              </span>
              <span className="text-sm font-semibold">Take or upload a photo</span>
              <span className="text-xs text-muted-foreground">Camera works best on your phone</span>
            </button>
          )}

          {imagePreview && (
            <div className="mt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Change photo
              </button>
              <button
                type="button"
                onClick={clearImage}
                className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-destructive"
              >
                <FiX className="h-3 w-3" /> Remove
              </button>
            </div>
          )}

          {step === 1 && (
            <button
              type="button"
              onClick={() => setStep(2)}
              className="btn-primary mt-4 w-full lg:hidden"
            >
              Continue to location
            </button>
          )}
        </section>

        {/* 2 — Category chips */}
        <section
          className={cn(
            "surface-panel mt-4 p-4 sm:p-5",
            step !== 2 && step !== 1 && "hidden lg:block",
          )}
        >
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
          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(3)}
              className="btn-primary mt-4 w-full lg:hidden"
            >
              Continue to location
            </button>
          )}
        </section>

        {/* 3 — Location status */}
        <section
          className={cn(
            "surface-panel mt-4 p-4 sm:p-5",
            step !== 3 && step < 3 && "hidden lg:block",
          )}
        >
          <p className="text-xs font-bold uppercase tracking-wide text-primary">
            Step 3 · Where is it?
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
                    GPS unavailable — tap the map to set location
                  </span>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={() => void captureLocation(false)}
              className="btn-secondary text-xs"
            >
              <FiMapPin className="h-3.5 w-3.5" /> Use my location
            </button>
          </div>

          {usingFallbackLocation && (
            <div className="mt-3 rounded-xl border border-warning/30 bg-warning/10 px-3 py-2 text-xs text-muted-foreground">
              <strong className="text-warning-foreground">Approximate location.</strong> GPS was
              unavailable — please tap the map or drag the pin to mark where the issue is.
            </div>
          )}

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

          {step === 3 && (
            <button
              type="button"
              onClick={() => setStep(4)}
              className="btn-primary mt-4 w-full lg:hidden"
            >
              Review & submit
            </button>
          )}
        </section>

        {/* Step 4 — Review summary (mobile) */}
        {(step === 4 || step === 3) && (
          <section className={cn("surface-panel mt-4 p-4 sm:p-5", step !== 4 && "hidden lg:block")}>
            <p className="text-xs font-bold uppercase tracking-wide text-primary">
              Step 4 · Review
            </p>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Category</dt>
                <dd className="font-semibold">{category}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Location</dt>
                <dd className="font-mono text-xs">
                  {lat?.toFixed(4)}, {lng?.toFixed(4)}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Photo</dt>
                <dd className="font-semibold">{imagePreview ? "Attached" : "None"}</dd>
              </div>
            </dl>
          </section>
        )}

        {/* Optional details (collapsed by default) */}
        <section className="surface-panel mt-4 overflow-hidden">
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
          className="btn-primary mt-5 hidden w-full lg:flex"
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
          className="btn-primary w-full shadow-lg"
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
