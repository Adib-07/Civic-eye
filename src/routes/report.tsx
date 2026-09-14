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
import {
  getDefaultOrganizationId,
  getSupabaseConfigError,
  getSupabaseConfigSummary,
  isSupabaseConfigured,
} from "@/lib/env";
import { useHydrated, useReportMutations } from "@/lib/hooks";
import { DEFAULT_MAP_CENTER, isValidCoordinate } from "@/lib/map-config";
import {
  buildQuickReportPayload,
  requestDeviceLocation,
  suggestDescription,
  suggestTitle,
  type GeoStatus,
} from "@/lib/report-quick";
import { CATEGORIES, OTHER_CATEGORY, type Category } from "@/lib/types";
import { cn } from "@/lib/utils";

const LocationPicker = lazy(() => import("@/components/LocationPicker"));

const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8MB

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Report a Civic Issue — CivicEye" },
      {
        name: "description",
        content: "Report a city issue with photo evidence, GPS pin location, and category suggestion.",
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
  const [customCategory, setCustomCategory] = useState("");
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
    if (next !== OTHER_CATEGORY && (!title.trim() || fromAi)) setTitle(suggestTitle(next));
    if (next !== OTHER_CATEGORY && (!description.trim() || fromAi))
      setDescription(suggestDescription(next));
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
    geoStatus !== "loading" &&
    (category !== OTHER_CATEGORY || customCategory.trim().length > 0);

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

    const resolvedCategory: Category =
      category === OTHER_CATEGORY && customCategory.trim() ? customCategory.trim() : category;

    if (category === OTHER_CATEGORY && !customCategory.trim()) {
      setError("Please describe the issue category when selecting Other.");
      toast.error("Custom category description is required");
      return;
    }

    setSubmitting(true);
    setUploadPhase(imageFile && configured ? "uploading" : "saving");

    try {
      const payload = buildQuickReportPayload({
        category: resolvedCategory,
        lat,
        lng,
        title,
        description,
        location,
      });

      if (!configured) {
        throw new Error(
          "Report submission is unavailable — Supabase is not configured. Please contact your administrator.",
        );
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

  return (
    <AppShell
      title="Report a Civic Issue"
      subtitle="Photo → Category → Location → Accountable Action"
    >
      <div className="mx-auto max-w-3xl">
        {!configured && (
          <div className="mb-6 card p-4 border-warning/30 bg-warning/10 animate-slide-up">
            <div className="flex items-start gap-3">
              <FiAlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
              <div>
                <p className="font-bold text-foreground">Database Not Configured</p>
                <p className="mt-1 body-sm text-muted-foreground">
                  Supabase environment variables are not set for this deployment. Report submission
                  requires database access.
                </p>
                <div className="mt-2 card p-3 text-xs font-mono space-y-1">
                  {(() => {
                    const s = getSupabaseConfigSummary();
                    return (
                      <>
                        <p className={s.urlPresent ? "text-emerald-500" : "text-destructive"}>
                          {s.urlPresent ? "✓" : "✗"} VITE_SUPABASE_URL —{" "}
                          {s.urlPresent ? "detected" : "missing or placeholder"}
                        </p>
                        <p className={s.keyPresent ? "text-emerald-500" : "text-destructive"}>
                          {s.keyPresent ? "✓" : "✗"} VITE_SUPABASE_ANON_KEY —{" "}
                          {s.keyPresent ? "detected" : "missing or placeholder"}
                        </p>
                        <p className={s.orgPresent ? "text-emerald-500" : "text-destructive"}>
                          {s.orgPresent ? "✓" : "✗"} VITE_DEFAULT_ORGANIZATION_ID —{" "}
                          {s.orgPresent ? "detected" : "missing"}
                        </p>
                      </>
                    );
                  })()}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Copy <code className="font-mono font-semibold">.env.example</code> to{" "}
                  <code className="font-mono font-semibold">.env</code> and set the variables above
                  with your Supabase project credentials.
                </p>
              </div>
            </div>
          </div>
        )}

        {orgMissing && (
          <div className="mb-6 card p-4 border-warning/30 bg-warning/10 animate-slide-up">
            <FiAlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
            <div className="ml-3">
              <p className="font-bold text-foreground">Configuration Required</p>
              <p className="mt-1 body-sm text-muted-foreground">
                The default organization is not configured. Please contact your administrator to
                complete environment setup before submitting reports.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 card p-4 border-destructive/30 bg-destructive/10 animate-slide-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiAlertCircle className="h-4 w-4 shrink-0 text-destructive" />
                <span className="body-sm text-destructive">{error}</span>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-xs font-semibold hover:underline text-muted-foreground"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Step 5 Confirmation Screen */}
        {step === 5 && submittedReportId ? (
          <div className="card p-6 sm:p-8 text-center space-y-6 animate-scale-in">
            <div className="icon-wrapper-xl bg-emerald-500/10 text-emerald-500 border-emerald-500/30 mx-auto">
              <FiCheckCircle className="h-8 w-8" />
            </div>

            <div>
              <span className="caption text-emerald-500">Intake Confirmed</span>
              <h2 className="mt-2 headline-3">Report Submitted Successfully</h2>
              <p className="mt-2 body-sm text-muted-foreground max-w-md mx-auto">
                Your report has been received and routed to your organization's operations dashboard
                for staff assignment and SLA tracking.
              </p>
            </div>

            {/* Reference Card */}
            <div className="card mx-auto max-w-md p-4 text-left space-y-3">
              <div className="flex items-center justify-between">
                <span className="caption">Reference ID</span>
                <button
                  type="button"
                  onClick={() => void copyRef()}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  <FiClipboard /> Copy ID
                </button>
              </div>
              <p className="font-mono text-2xl font-bold text-foreground tracking-wide">
                #{submittedReportId.slice(0, 8).toUpperCase()}
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-border">
                <div>
                  <span className="text-muted-foreground block caption">Category</span>
                  <span className="font-semibold">
                    {category === OTHER_CATEGORY ? customCategory.trim() || "Other" : category}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block caption">Status</span>
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
                  setCustomCategory("");
                  setSubmittedReportId(null);
                }}
                className="btn-secondary px-6 py-3"
              >
                <FiRefreshCw /> Submit another report
              </button>
              <Link
                to="/reports"
                search={{ submitted: submittedReportId }}
                className="btn-primary px-7 py-3"
              >
                View in reports queue <FiArrowRight />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="pb-24 lg:pb-0">
            {/* Step Wizard Navigation Header */}
            <nav aria-label="Report wizard steps" className="mb-6 grid grid-cols-4 gap-2 animate-slide-up">
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
                    "flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all duration-150",
                    step === n
                      ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary/30"
                      : step > n
                      ? "border-emerald-500/30 bg-emerald-500/5 text-foreground"
                      : "border-border bg-card text-muted-foreground hover:bg-secondary",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-7 w-7 place-items-center rounded-full text-xs font-semibold transition-colors",
                      step === n
                        ? "bg-primary text-primary-foreground"
                        : step > n
                        ? "bg-emerald-500 text-white"
                        : "bg-secondary text-muted-foreground",
                    )}
                  >
                    {step > n ? <FiCheck className="h-4 w-4" /> : n}
                  </span>
                  <span className="caption">{label}</span>
                  <span className="hidden text-[10px] text-muted-foreground sm:inline">{desc}</span>
                </button>
              ))}
            </nav>

            {/* STEP 1: Photo Evidence */}
            <section className={cn("card p-5 sm:p-6 animate-slide-up", step !== 1 && "hidden lg:block")}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="caption text-primary">Step 1 of 4</p>
                  <h2 className="headline-4">Photo Evidence</h2>
                </div>
                {imagePreview && (
                  <span className="badge badge-success">
                    Photo Attached
                  </span>
                )}
              </div>
              <p className="body-sm text-muted-foreground mb-4">
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
                <div className="space-y-3">
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
                      className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
                    >
                      <FiRefreshCw className="h-3.5 w-3.5" /> Change Photo
                    </button>
                    <button
                      type="button"
                      onClick={clearImage}
                      className="text-sm font-semibold text-destructive hover:underline flex items-center gap-1"
                    >
                      <FiX className="h-3.5 w-3.5" /> Remove Photo
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4 flex w-full flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-border bg-secondary/40 px-4 py-12 transition-all hover:border-primary/50 hover:bg-secondary"
                >
                  <span className="icon-wrapper-xl bg-primary text-primary-foreground shadow-md">
                    <FiCamera className="h-7 w-7" />
                  </span>
                  <div className="text-center">
                    <span className="font-semibold">Snap or Upload Photo Evidence</span>
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
                "card mt-5 p-5 sm:p-6 animate-slide-up",
                step !== 2 && step !== 1 && "hidden lg:block",
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="caption text-primary">Step 2 of 4</p>
                  <h2 className="headline-4">Select Category</h2>
                </div>
                {ai && (
                  <span className="badge badge-primary">
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
                      onClick={() => {
                        applyCategory(c);
                        if (c !== OTHER_CATEGORY) setCustomCategory("");
                      }}
                      className={cn(
                        "flex items-center justify-between rounded-xl border p-3 text-left transition-all text-xs font-bold",
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border bg-card hover:bg-secondary text-foreground",
                      )}
                    >
                      <span>{c === OTHER_CATEGORY ? "Other / Describe your issue" : c}</span>
                      {isSelected && <FiCheck className="h-4 w-4 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {category === OTHER_CATEGORY && (
                <div className="mt-4 space-y-2">
                  <label className="label">Describe the issue category</label>
                  <textarea
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="e.g. Broken water pipeline, Park bench vandalism, Noise complaint…"
                    rows={3}
                    className="input min-h-[80px] resize-none"
                    autoFocus
                  />
                  <p className="form-hint">
                    Type a short description of the issue category so staff can triage it correctly.
                  </p>
                </div>
              )}

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
                "card mt-5 p-5 sm:p-6 animate-slide-up",
                step !== 3 && step < 3 && "hidden lg:block",
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <p className="caption text-primary">Step 3 of 4</p>
                  <h2 className="headline-4">Issue Location</h2>
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
              <div className="mb-4 flex items-center gap-2 text-xs">
                {geoStatus === "loading" && (
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
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
                <div className="space-y-2">
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
                  Review & Submit <FiArrowRight />
                </button>
              )}
            </section>

            {/* STEP 4: Review & Additional Details */}
            {(step === 4 || step === 3) && (
              <section
                className={cn("card mt-5 p-5 sm:p-6 animate-slide-up", step !== 4 && "hidden lg:block")}
              >
                <p className="caption text-primary">Step 4 of 4</p>
                <h2 className="headline-4 mb-4">Review Report</h2>

                <div className="card p-4 space-y-3 text-xs sm:text-sm mb-6">
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-semibold">
                      {category === OTHER_CATEGORY ? customCategory.trim() || "Other" : category}
                    </span>
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
                <div className="border-t border-border pt-4">
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
                        <div className="form-field">
                          <label className="label">Report Title</label>
                          <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={suggestTitle(category)}
                            className="input"
                          />
                        </div>
                        <div className="form-field">
                          <label className="label">Detailed Description</label>
                          <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            placeholder={suggestDescription(category)}
                            className="input min-h-[80px] resize-none"
                          />
                        </div>
                        <div className="form-field">
                          <label className="label">Landmark / Place Name</label>
                          <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g. Near Main Gate entrance"
                            className="input"
                          />
                        </div>
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

        {/* Mobile Sticky Submit Footer */}
        {step !== 5 && (
          <div className="fixed inset-x-0 bottom-0 z-[850] border-t border-border bg-background/95 p-4 backdrop-blur-lg lg:hidden animate-slide-up">
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

      </div>

      <ImageModal src={zoom} onClose={() => setZoom(null)} />
    </AppShell>
  );
}