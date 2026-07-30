import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiUploadCloud, FiCpu, FiMapPin, FiSend, FiImage } from "react-icons/fi";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { ImageModal } from "@/components/ImageModal";
import { predictCategory } from "@/lib/auth";
import { addReport } from "@/lib/storage";
import { CATEGORIES, type Category } from "@/lib/types";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Report a City Issue — CivicEye" },
      {
        name: "description",
        content:
          "Upload a photo, let CivicEye's AI predict the category, and submit a geo-tagged civic issue report in under a minute.",
      },
      { property: "og:title", content: "Report a City Issue — CivicEye" },
      {
        property: "og:description",
        content: "Photo-first civic reporting with instant AI category prediction.",
      },
    ],
  }),
  component: ReportPage,
});

function ReportPage() {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [ai, setAi] = useState<{ category: Category; confidence: number } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("Pothole");
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState("28.6139");
  const [lng, setLng] = useState("77.2090");

  const onFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setAnalyzing(true);
      setAi(null);
      setTimeout(() => {
        const result = predictCategory(file.name);
        setAi(result);
        setCategory(result.category);
        setAnalyzing(false);
        toast.success(`AI detected: ${result.category} (${result.confidence}%)`);
      }, 1100);
    };
    reader.readAsDataURL(file);
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) return toast.error("Geolocation is not supported here");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude.toFixed(6));
        setLng(pos.coords.longitude.toFixed(6));
        toast.success("Coordinates captured");
      },
      () => toast.error("Could not get your location"),
    );
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const latN = Number(lat);
    const lngN = Number(lng);
    if (Number.isNaN(latN) || Number.isNaN(lngN)) return toast.error("Enter valid coordinates");

    setSubmitting(true);
    setTimeout(() => {
      addReport({
        title,
        description,
        category,
        location,
        lat: latN,
        lng: lngN,
        image,
        aiCategory: ai?.category ?? null,
        aiConfidence: ai?.confidence ?? null,
      });
      toast.success("Report submitted successfully");
      navigate({ to: "/reports" });
    }, 700);
  };

  const field =
    "mt-1.5 w-full rounded-xl border border-border bg-card/60 px-3 py-3 text-sm outline-none focus:border-primary";

  return (
    <AppShell title="Report an issue" subtitle="Photo, details and AI-assisted classification">
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={submit} className="glass space-y-4 rounded-2xl p-6">
          <div>
            <span className="text-xs font-bold text-muted-foreground">Photo of the issue</span>
            <label className="mt-1.5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-card/40 px-4 py-8 text-center transition-colors hover:border-primary">
              <FiUploadCloud className="h-7 w-7 text-primary" />
              <span className="text-sm font-semibold">Click to upload an image</span>
              <span className="text-xs text-muted-foreground">
                Tip: filenames like “pothole.jpg” or “garbage.png” drive the AI prediction
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onFile(e.target.files?.[0])}
              />
            </label>
          </div>

          <label className="block">
            <span className="text-xs font-bold text-muted-foreground">Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Deep pothole near market crossing"
              className={field}
            />
          </label>

          <label className="block">
            <span className="text-xs font-bold text-muted-foreground">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              placeholder="Describe what you saw, how long it's been there and why it's a risk."
              className={field}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-bold text-muted-foreground">Category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className={field}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-xs font-bold text-muted-foreground">Location name</span>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                placeholder="MG Road Junction"
                className={field}
              />
            </label>

            <label className="block">
              <span className="text-xs font-bold text-muted-foreground">Latitude</span>
              <input value={lat} onChange={(e) => setLat(e.target.value)} required className={field} />
            </label>

            <label className="block">
              <span className="text-xs font-bold text-muted-foreground">Longitude</span>
              <input value={lng} onChange={(e) => setLng(e.target.value)} required className={field} />
            </label>
          </div>

          <button
            type="button"
            onClick={useMyLocation}
            className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-xs font-bold hover:bg-secondary"
          >
            <FiMapPin /> Use my current location
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="bg-brand flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-primary-foreground disabled:opacity-70"
          >
            {submitting ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
            ) : (
              <FiSend />
            )}
            {submitting ? "Submitting" : "Submit report"}
          </button>
        </form>

        <div className="space-y-5">
          <div className="glass rounded-2xl p-6">
            <h2 className="flex items-center gap-2 text-sm font-bold">
              <FiImage className="text-primary" /> Image preview
            </h2>
            {image ? (
              <img
                src={image}
                alt="Preview of the reported issue"
                onClick={() => setZoom(image)}
                className="mt-4 h-56 w-full cursor-zoom-in rounded-2xl object-cover"
              />
            ) : (
              <div className="mt-4 grid h-56 place-items-center rounded-2xl bg-secondary text-sm text-muted-foreground">
                No image uploaded yet
              </div>
            )}
          </div>

          <div className="glass rounded-2xl p-6">
            <h2 className="flex items-center gap-2 text-sm font-bold">
              <FiCpu className="text-accent" /> AI analysis
            </h2>

            {analyzing && (
              <div className="mt-6 flex items-center gap-3">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-primary" />
                <p className="text-sm text-muted-foreground">Analyzing image…</p>
              </div>
            )}

            {!analyzing && ai && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                <p className="text-xs font-bold text-muted-foreground">Predicted category</p>
                <p className="text-gradient font-display text-2xl font-extrabold">{ai.category}</p>
                <div className="mt-4 flex items-center justify-between text-xs font-bold">
                  <span className="text-muted-foreground">Confidence</span>
                  <span className="text-success">{ai.confidence}%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${ai.confidence}%` }}
                    transition={{ duration: 0.8 }}
                    className="bg-brand h-full rounded-full"
                  />
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Category auto-applied to the form. You can override it any time.
                </p>
              </motion.div>
            )}

            {!analyzing && !ai && (
              <p className="mt-4 text-sm text-muted-foreground">
                Upload a photo to get an instant category prediction with a confidence score.
              </p>
            )}
          </div>
        </div>
      </div>

      <ImageModal src={zoom} onClose={() => setZoom(null)} />
    </AppShell>
  );
}
