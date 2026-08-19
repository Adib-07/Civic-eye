import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
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
  FiCheckCircle,
  FiClipboard,
  FiArrowRight,
  FiRefreshCw,
  FiInfo,
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

const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8MB

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Report a Civic Issue — CivicEye" },
      {
        name: "description",
        content:
          "Report a city issue with photo evidence, GPS pin location, and category suggestion.",
      },
    ],
  }),
  component: ReportPage,
});

export function ReportPage() {
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
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [submittedReportId, setSubmittedReportId] = useState<string | null>(null);

  const captureLocation = useCallback(async (silent = false) => {
    setGeoStatus("loading");
    setUsingFallbackLocation(false);
    try {
      const coords = await requestDeviceLocation();
      setLat(coords.lat);
      setLng(coords.lng);
      setGeoStatus("ready");
      if (!silent) toast.success("GPS Location captured successfully");
    } catch (err) {
      const code = err instanceof GeolocationPositionError ? err.code : null;
      if (code === 1) {
        setGeoStatus("denied");
        if (!silent) toast.error("GPS permission denied — pick a spot on the interactive map");
      } else if (String(err).includes("unsupported")) {
        setGeoStatus("unsupported");
        if (!silent) toast.error("Geolocation not supported on this browser — pick map pin");
      } else {
        setGeoStatus("denied");
        if (!silent) toast.error("Could not capture GPS — pick location on map below");
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
      setError("Please select a valid image file (JPEG, PNG, or WebP).");
      toast.error("Invalid file type");
      return;
    }

    if (file.size > MAX_IMAGE_BYTES) {
      setError(`Image size must be under ${MAX_IMAGE_BYTES / (1024 * 1024)} MB.`);
      toast.error("Image too large");
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onerror = () => {
      setError("Could not read the selected photo.");
      toast.error("Failed to read image");
    };
    reader.onload = () => {
      setImagePreview(reader.result as string);
      const result = predictCategory(file.name);
      setAi(result);
      applyCategory(result.category, true);
      toast.success(`Photo attached — suggested category: "${result.category}"`);
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
      toast.error("Invalid coordinates — please select a valid location on map");
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
      toast.error("Location required — select location on map or request GPS");
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
        throw new Error("Report submission is unavailable. The database connection is not configured for this environment.");
      }

      if (imageFile) setUploadPhase("uploading");
      const created = await create.mutateAsync({
        ...payload,
        imageFile,
        aiCategory: ai?.category ?? null,
        aiConfidence: ai?.confidence ?? null,
      });

      setSubmittedReportId(created.id);
      setStep(5); // Confirmation Step
      toast.success("Report submitted successfully to operations queue");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Submission failed";
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
      setUploadPhase("idle");
    }
  };

  const copyRef = async () => {
    if (!submittedReportId) return;
    try {
      await navigator.clipboard.writeText(submittedReportId);
      toast.success("Reference ID copied to clipboard");
    } catch {
      toast.error("Could not copy reference ID");
    }
  };

  const submitLabel =
    uploadPhase === "uploading"
      ? "Uploading photo evidence…"
      : uploadPhase === "saving"
        ? "Submitting report…"
        : "Submit report to operations";

  const fieldClass =
    "mt-1.5 w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary";

  return (
    <AppShell
      title="Report a Civic Issue"
      subtitle="Photo → Category → Location → Accountable Action"
    >
      <div className="mx-auto max-w-3xl">
        {/* Supabase / Env Config Warnings */}
        {!configured && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm">
            <FiAlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
            <div>
              <p className="font-bold text-destructive">Service Unavailable</p>
              <p className="mt-1 text-muted-foreground">
                Database connection is not configured for this environment.
                Report submission is temporarily unavailable. Please try again later.
              </p>
            </div>
          </div>
        )}

        {orgMissing && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
            <FiAlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
            <div>
              <p className="font-bold text-amber-500">Configuration Required</p>
              <p className="mt-1 text-muted-foreground">
                The default organization is not configured. Please contact your administrator
                to complete environment setup before submitting reports.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            <div className="flex items-center gap-2">
              <FiAlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-xs font-semibold hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Step 5 Confirmation Screen */}
        {step === 5 && submittedReportId ? (
          <div className="surface-panel p-6 sm:p-8 text-center space-y-6 cinematic-reveal">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-500">
              <FiCheckCircle className="h-8 w-8" />
            </div>

            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-500">
                Intake Confirmed
              </span>
              <h2 className="mt-2 text-2xl font-bold">Report Submitted Successfully</h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                Your report has been received and routed to your organization's operations dashboard
                for staff assignment and SLA tracking.
              </p>
            </div>

            {/* Reference Card */}
            <div className="mx-auto max-w-md rounded-xl border border-border bg-secondary/50 p-4 text-left space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">Reference ID</span>
                <button
                  type="button"
                  onClick={() => void copyRef()}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  <FiClipboard /> Copy ID
                </button>
              </div>
              <p className="font-mono text-lg font-bold text-foreground tracking-wide">
                #{submittedReportId.slice(0, 8).toUpperCase()}
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-border">
                <div>
                  <span className="text-muted-foreground block">Category</span>
                  <span className="font-semibold">{category}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Status</span>
                  <span className="font-semibold text-amber-500">Pending Intake</span>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setImagePreview(null);
                  setImageFile(null);
                  setTitle("");
                  setDescription("");
                  setSubmittedReportId(null);
                }}
                className="btn-secondary px-5 py-2.5"
              >
                <FiRefreshCw /> Submit another report
              </button>
              <Link
                to="/reports"
                search={{ submitted: submittedReportId }}
                className="btn-primary px-6 py-2.5"
              >
                View in reports queue <FiArrowRight />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="pb-24 lg:pb-0">
            {/* Step Wizard Navigation Header */}
            <nav aria-label="Report wizard steps" className="mb-6 grid grid-cols-4 gap-2">
              {(
                [
                  { n: 1, label: "Evidence", desc: "Photo" },
                  { n: 2, label: "Category", desc: "Type" },
                  { n: 3, label: "Location", desc: "Map/GPS" },
                  { n: 4, label: "Review", desc: "Submit" },
                ] as const
              ).map(({ n, label, desc }) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setStep(n)}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-xl border p-3 text-center transition-all duration-150",
                    step === n
                      ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary/30"
                      : step > n
                        ? "border-emerald-500/30 bg-emerald-500/5 text-foreground"
                        : "border-border bg-card text-muted-foreground hover:bg-secondary",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-6 w-6 place-items-center rounded-full text-xs font-semibold transition-colors",
                      step === n
                        ? "bg-primary text-primary-foreground"
                        : step > n
                          ? "bg-emerald-500 text-white"
                          : "bg-secondary text-muted-foreground",
                    )}
                  >
                    {step > n ? <FiCheck className="h-3.5 w-3.5" /> : n}
                  </span>
                  <span className="text-xs font-semibold">{label}</span>
                  <span className="hidden text-[10px] text-muted-foreground sm:inline">{desc}</span>
                </button>
              ))}
            </nav>

            {/* STEP 1: Photo Evidence */}
            <section className={cn("surface-panel p-5 sm:p-6", step !== 1 && "hidden lg:block")}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
                    Step 1 of 4
                  </p>
                  <h2 className="text-lg font-bold">Photo Evidence</h2>
                </div>
                {imagePreview && (
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500 border border-emerald-500/20">
                    Photo Attached
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Attach a clear photo of the issue. Camera capture recommended on mobile devices.
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                capture="environment"
                className="hidden"
                onChange={(e) => onFile(e.target.files?.[0])}
              />

              {imagePreview ? (
                <div className="mt-4 space-y-3">
                  <div className="relative overflow-hidden rounded-xl border border-border group">
                    <img
                      src={imagePreview}
                      alt="Selected report photo preview"
                      className="h-56 w-full object-cover sm:h-64 cursor-pointer"
                      onClick={() => setZoom(imagePreview)}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => setZoom(imagePreview)}
                        className="rounded-lg bg-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md hover:bg-white/30"
                      >
                        View Fullscreen
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                    >
                      <FiRefreshCw className="h-3 w-3" /> Change Photo
                    </button>
                    <button
                      type="button"
                      onClick={clearImage}
                      className="text-xs font-semibold text-destructive hover:underline flex items-center gap-1"
                    >
                      <FiX className="h-3.5 w-3.5" /> Remove Photo
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4 flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-secondary/40 px-4 py-12 transition-all hover:border-primary/50 hover:bg-secondary"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-md">
                    <FiCamera className="h-7 w-7" />
                  </span>
                  <div className="text-center">
                    <span className="text-sm font-bold">Snap or Upload Photo Evidence</span>
                    <p className="mt-1 text-xs text-muted-foreground">
                      JPG, PNG, or WebP up to 8MB
                    </p>
                  </div>
                </button>
              )}

              {step === 1 && (
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-primary mt-6 w-full lg:hidden"
                >
                  Continue to Category <FiArrowRight />
                </button>
              )}
            </section>

            {/* STEP 2: Issue Category */}
            <section
              className={cn(
                "surface-panel mt-5 p-5 sm:p-6",
                step !== 2 && step !== 1 && "hidden lg:block",
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
                    Step 2 of 4
                  </p>
                  <h2 className="text-lg font-bold">Select Category</h2>
                </div>
                {ai && (
                    <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20">
                    Suggested: {ai.category} ({ai.confidence}%)
                  </span>
                )}
              </div>

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {CATEGORIES.map((c) => {
                  const isSelected = category === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => applyCategory(c)}
                      className={cn(
                        "flex items-center justify-between rounded-xl border p-3 text-left transition-all text-xs font-bold",
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border bg-card hover:bg-secondary text-foreground",
                      )}
                    >
                      <span>{c}</span>
                      {isSelected && <FiCheck className="h-4 w-4 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="btn-primary mt-6 w-full lg:hidden"
                >
                  Continue to Location <FiArrowRight />
                </button>
              )}
            </section>

            {/* STEP 3: Location Pin & GPS */}
            <section
              className={cn(
                "surface-panel mt-5 p-5 sm:p-6",
                step !== 3 && step < 3 && "hidden lg:block",
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
                    Step 3 of 4
                  </p>
                  <h2 className="text-lg font-bold">Issue Location</h2>
                </div>
                <button
                  type="button"
                  onClick={() => void captureLocation(false)}
                  className="btn-secondary text-xs"
                >
                  <FiMapPin className="h-3.5 w-3.5" /> Re-detect GPS
                </button>
              </div>

              {/* Status Banner */}
              <div className="mt-3 flex items-center gap-2 text-xs">
                {geoStatus === "loading" && (
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    Fetching GPS location…
                  </span>
                )}
                {geoStatus === "ready" && lat !== null && lng !== null && (
                  <span className="text-emerald-500 font-semibold flex items-center gap-1.5">
                    <FiCheck className="h-4 w-4" /> Location Locked: {lat.toFixed(4)},{" "}
                    {lng.toFixed(4)}
                  </span>
                )}
                {usingFallbackLocation && (
                  <span className="text-amber-500 flex items-center gap-1.5">
                    <FiInfo className="h-4 w-4" /> Approximate location — drag pin on map below
                  </span>
                )}
              </div>

              {/* Leaflet Location Picker */}
              {lat !== null && lng !== null && hydrated && (
                <div className="mt-4 space-y-2">
                  <Suspense fallback={<Loader label="Loading interactive map" />}>
                    <LocationPicker
                      lat={lat}
                      lng={lng}
                      onChange={handleLocationPick}
                      className="h-56 w-full overflow-hidden rounded-xl border border-border sm:h-64"
                    />
                  </Suspense>
                  <p className="text-[11px] text-muted-foreground">
                    Tap anywhere on the map or drag the pin to set exact coordinates.
                  </p>
                </div>
              )}

              {step === 3 && (
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="btn-primary mt-6 w-full lg:hidden"
                >
                  Review &amp; Submit <FiArrowRight />
                </button>
              )}
            </section>

            {/* STEP 4: Review & Additional Details */}
            {(step === 4 || step === 3) && (
              <section
                className={cn("surface-panel mt-5 p-5 sm:p-6", step !== 4 && "hidden lg:block")}
              >
                <p className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
                  Step 4 of 4
                </p>
                <h2 className="text-lg font-bold">Review Report</h2>

                <div className="mt-4 rounded-xl border border-border bg-secondary/40 p-4 space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-semibold">{category}</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Coordinates</span>
                    <span className="font-mono font-semibold">
                      {lat?.toFixed(5)}, {lng?.toFixed(5)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Photo Attached</span>
                    <span className="font-semibold text-emerald-500">
                      {imagePreview ? "Yes" : "None"}
                    </span>
                  </div>
                </div>

                {/* Collapsible Details */}
                <div className="mt-5 border-t border-border pt-4">
                  <button
                    type="button"
                    onClick={() => setShowDetails((v) => !v)}
                    className="flex w-full items-center justify-between text-left text-xs font-bold text-muted-foreground hover:text-foreground"
                  >
                    <span>Add title, description, or landmark (Optional)</span>
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
                        className="overflow-hidden space-y-3 pt-3"
                      >
                        <label className="block">
                          <span className="text-xs font-semibold text-muted-foreground">
                            Report Title
                          </span>
                          <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={suggestTitle(category)}
                            className={fieldClass}
                          />
                        </label>
                        <label className="block">
                          <span className="text-xs font-semibold text-muted-foreground">
                            Detailed Description
                          </span>
                          <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            placeholder={suggestDescription(category)}
                            className={fieldClass}
                          />
                        </label>
                        <label className="block">
                          <span className="text-xs font-semibold text-muted-foreground">
                            Landmark / Place Name
                          </span>
                          <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g. Near Main Gate entrance"
                            className={fieldClass}
                          />
                        </label>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </section>
            )}

            {/* Desktop Submit Button */}
            <button
              type="submit"
              disabled={!readyToSubmit}
              className="btn-primary mt-6 hidden w-full lg:flex justify-center py-3 text-base shadow-md"
            >
              {submitting ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
              ) : (
                <FiSend className="h-5 w-5" />
              )}
              {submitLabel}
            </button>
          </form>
        )}
      </div>

      {/* Mobile Sticky Submit Footer */}
      {step !== 5 && (
        <div className="fixed inset-x-0 bottom-0 z-[850] border-t border-border bg-background/95 p-4 backdrop-blur-lg lg:hidden">
          <button
            type="button"
            disabled={!readyToSubmit}
            onClick={() => void submit()}
            className="btn-primary w-full shadow-lg py-3 text-sm"
          >
            {submitting ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
            ) : (
              <FiSend />
            )}
            {submitLabel}
          </button>
        </div>
      )}

      <ImageModal src={zoom} onClose={() => setZoom(null)} />
    </AppShell>
  );
}
