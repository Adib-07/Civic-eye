import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiArrowLeft, FiSend } from "react-icons/fi";
import { toast } from "sonner";
import { z } from "zod";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { isSupabaseConfigured } from "@/lib/env";
import { getPlan, PLANS, type PlanTier } from "@/lib/plans";
import { submitOnboardingRequest } from "@/lib/subscription";

const startSearchSchema = z.object({
  plan: z.enum(["pilot", "community", "growth", "enterprise"]).optional(),
});

export const Route = createFileRoute("/start")({
  validateSearch: (search) => startSearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Start with CivicEye — Organization Setup" },
      {
        name: "description",
        content:
          "Request a CivicEye pilot or paid plan for your organization. No payment required to apply.",
      },
    ],
  }),
  component: StartPage,
});

const ORG_TYPES = [
  { value: "campus", label: "Campus / institution" },
  { value: "housing", label: "Housing society / estate" },
  { value: "facility", label: "Facilities / operations team" },
  { value: "municipality", label: "Municipality / ward office" },
  { value: "other", label: "Other" },
] as const;

const ORG_NAME_PLACEHOLDERS: Record<(typeof ORG_TYPES)[number]["value"], string> = {
  campus: "e.g. Sunrise Institute of Technology",
  housing: "e.g. Greenview Residency",
  facility: "e.g. Skyline Business Park Facilities",
  municipality: "e.g. Ward 14 Municipal Office",
  other: "e.g. Your organization name",
};

function StartPage() {
  const { plan: planParam } = Route.useSearch();
  const configured = isSupabaseConfigured();

  const [selectedPlan, setSelectedPlan] = useState<PlanTier>(planParam ?? "pilot");
  const [orgName, setOrgName] = useState("");
  const [orgType, setOrgType] = useState<(typeof ORG_TYPES)[number]["value"]>("campus");
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [operationalArea, setOperationalArea] = useState("");
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const plan = getPlan(selectedPlan);
  const field =
    "mt-1.5 w-full rounded-xl border border-border bg-card/60 px-3 py-3 text-sm outline-none focus:border-primary";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!configured) {
      toast.error("Supabase is not configured — cannot submit request yet.");
      return;
    }

    setBusy(true);
    try {
      await submitOnboardingRequest({
        orgName,
        orgType,
        adminName,
        adminEmail,
        teamSize: teamSize || undefined,
        operationalArea: operationalArea || undefined,
        selectedPlan,
      });
      setSubmitted(true);
      toast.success("Request submitted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setBusy(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto grid w-[min(560px,94vw)] place-items-center py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-8"
          >
            <h1 className="font-display text-2xl font-extrabold">Request received</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Thank you for requesting the <strong>{plan.name}</strong> plan for{" "}
              <strong>{orgName}</strong>. Our team will review your request and provision your
              organization workspace. No payment has been charged.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Link
                to="/"
                className="rounded-xl border border-border px-4 py-2 text-sm font-semibold"
              >
                Back to home
              </Link>
              <Link
                to="/pricing"
                className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
              >
                View pricing
              </Link>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto w-[min(640px,94vw)] py-10 sm:py-14">
        <Link
          to="/pricing"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
        >
          <FiArrowLeft aria-hidden /> Back to pricing
        </Link>

        <h1 className="mt-6 font-display text-2xl font-extrabold sm:text-3xl">
          {selectedPlan === "pilot" ? "Start your pilot" : "Request a plan"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Tell us about your organization. We&apos;ll set up your workspace — no online payment at
          this stage.
        </p>

        {!configured && (
          <p className="mt-4 rounded-xl border border-warning/40 bg-warning/10 p-4 text-sm text-warning">
            Supabase is not configured. Configure your environment before submitting a request.
          </p>
        )}

        <form onSubmit={submit} className="glass mt-8 space-y-5 rounded-2xl p-6 sm:p-8">
          <label className="block">
            <span className="text-xs font-bold text-muted-foreground">Plan</span>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value as PlanTier)}
              className={field}
            >
              {PLANS.map((p) => (
                <option key={p.tier} value={p.tier}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-xs font-bold text-muted-foreground">Organization name</span>
            <input
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              required
              placeholder={ORG_NAME_PLACEHOLDERS[orgType]}
              className={field}
            />
          </label>

          <label className="block">
            <span className="text-xs font-bold text-muted-foreground">Organization type</span>
            <select
              value={orgType}
              onChange={(e) => setOrgType(e.target.value as typeof orgType)}
              className={field}
            >
              {ORG_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-bold text-muted-foreground">Administrator name</span>
              <input
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                required
                className={field}
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold text-muted-foreground">Administrator email</span>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
                autoComplete="email"
                className={field}
              />
            </label>
          </div>

          <label className="block">
            <span className="text-xs font-bold text-muted-foreground">
              Approximate team size (optional)
            </span>
            <input
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              placeholder="e.g. 5–10 staff"
              className={field}
            />
          </label>

          <label className="block">
            <span className="text-xs font-bold text-muted-foreground">
              Operational area (optional)
            </span>
            <input
              value={operationalArea}
              onChange={(e) => setOperationalArea(e.target.value)}
              placeholder="e.g. North Ward, Campus Block A"
              className={field}
            />
          </label>

          <button
            type="submit"
            disabled={busy || !configured}
            className="bg-brand inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-primary-foreground disabled:opacity-60"
          >
            <FiSend aria-hidden />
            {selectedPlan === "pilot" ? "Start pilot request" : "Submit plan request"}
          </button>

          <p className="text-center text-xs text-muted-foreground">
            By submitting, you agree to be contacted about workspace setup. No payment is processed.
          </p>
        </form>
      </main>

      <Footer />
    </div>
  );
}
