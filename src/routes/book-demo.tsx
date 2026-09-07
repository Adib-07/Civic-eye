import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FiCheckCircle, FiSend, FiShield, FiClock, FiUsers, FiAlertCircle } from "react-icons/fi";
import { toast } from "sonner";

import { isSupabaseConfigured } from "@/lib/env";
import { submitDemoRequest } from "@/lib/subscription";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/book-demo")({
  head: () => ({
    meta: [
      { title: "Book a Demo — CivicEye for Organizations" },
      {
        name: "description",
        content:
          "Schedule a live product demonstration of CivicEye for your facility management, campus, township, or community operations team.",
      },
    ],
  }),
  component: BookDemoPage,
});

const ORG_TYPES = [
  "Facility Management",
  "Corporate / Technology Campus",
  "University / College",
  "Residential Community / RWA",
  "Township / Large Estate",
  "Public-Sector / Municipal",
  "Other",
] as const;

const SITE_COUNTS = ["1 site", "2–5 sites", "6–15 sites", "16–50 sites", "50+ sites"] as const;

const ROLE_OPTIONS = [
  "Administrator",
  "Facility Manager",
  "Operations Lead",
  "Maintenance Head",
  "IT / Technical",
  "Other",
] as const;

type FormData = {
  fullName: string;
  workEmail: string;
  organization: string;
  role: (typeof ROLE_OPTIONS)[number];
  orgType: (typeof ORG_TYPES)[number];
  siteCount: (typeof SITE_COUNTS)[number];
  message: string;
};

type FieldErrors = Partial<Record<keyof FormData, string>>;

const INITIAL_FORM: FormData = {
  fullName: "",
  workEmail: "",
  organization: "",
  role: ROLE_OPTIONS[0],
  orgType: ORG_TYPES[0],
  siteCount: SITE_COUNTS[0],
  message: "",
};

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validate(form: FormData): FieldErrors {
  const errors: FieldErrors = {};

  if (!form.fullName.trim()) {
    errors.fullName = "Full name is required.";
  } else if (form.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }

  if (!form.workEmail.trim()) {
    errors.workEmail = "Work email is required.";
  } else if (!validateEmail(form.workEmail)) {
    errors.workEmail = "Please enter a valid email address.";
  }

  if (!form.organization.trim()) {
    errors.organization = "Organization name is required.";
  } else if (form.organization.trim().length < 2) {
    errors.organization = "Please enter your organization name.";
  }

  return errors;
}

function FieldError({ message, id }: { message?: string; id?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1 flex items-center gap-1 text-[11px] text-destructive">
      <FiAlertCircle className="h-3 w-3 shrink-0" aria-hidden />
      {message}
    </p>
  );
}

export function BookDemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleBlur = (key: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    const fieldErrors = validate(formData);
    if (fieldErrors[key]) {
      setErrors((prev) => ({ ...prev, [key]: fieldErrors[key] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched({
      fullName: true,
      workEmail: true,
      organization: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    if (!isSupabaseConfigured()) {
      toast.error("Supabase is not configured — cannot submit request yet.");
      return;
    }

    setLoading(true);

    try {
      await submitDemoRequest(formData.fullName, formData.workEmail, formData.organization);
      setLoading(false);
      setSubmitted(true);
      toast.success("Demo request submitted successfully.");
    } catch (err) {
      setSubmitError("Something went wrong submitting your request — please try again or email us directly");
      toast.error("Something went wrong submitting your request — please try again or email us directly");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="cinematic" />

      <main className="page-container py-12 sm:py-16">
        <div className="max-w-4xl mx-auto grid gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="section-label">Schedule a Walkthrough</p>
              <h1 className="mt-2 text-3xl font-bold sm:text-4xl text-foreground">
                See how CivicEye works for your team
              </h1>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Request a 15-minute product demonstration. We will walk you through photo reporting,
                staff dispatch, SLA tracking, and resolution verification for your organization.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <FiCheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground">Tailored to your organization type</strong>
                  <p className="text-muted-foreground">
                    Campuses, communities, townships, and facility operations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <FiShield className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground">No-obligation free pilot</strong>
                  <p className="text-muted-foreground">
                    Test live workflows with up to 5 staff members at no cost.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <FiClock className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground">Quick response</strong>
                  <p className="text-muted-foreground">
                    We will confirm your demonstration slot promptly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="surface-panel p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-8 space-y-4" role="status" aria-live="polite">
                  <div className="h-14 w-14 rounded-full bg-emerald-500/15 text-emerald-500 grid place-items-center mx-auto">
                    <FiCheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    Thanks — your demo request has been received.
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Our team will review your requirements and follow up to schedule a demonstration
                    that fits your organization&apos;s workflow.
                  </p>
                  <div className="pt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
                    <Link
                      to="/"
                      className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
                    >
                      Back to home
                    </Link>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData(INITIAL_FORM);
                        setErrors({});
                        setTouched({});
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      Submit another request
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  noValidate
                  aria-label="Book a Demo request form"
                >
                  <h3 className="text-lg font-bold text-foreground pb-2 border-b border-border">
                    Book a Demo
                  </h3>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1">
                        Full Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        onBlur={() => handleBlur("fullName")}
                        placeholder="e.g. Aditi Sharma"
className={cn(
 "w-full rounded-lg border bg-card/60 px-3.5 py-2.5 min-h-[44px] text-sm outline-none transition-colors focus:border-primary",
 touched.fullName && errors.fullName
   ? "border-destructive"
   : "border-border",
)}
                        autoComplete="name"
                        aria-invalid={!!(touched.fullName && errors.fullName)}
                        aria-describedby={
                          touched.fullName && errors.fullName ? "err-fullName" : undefined
                        }
                      />
                      <FieldError
                        message={touched.fullName ? errors.fullName : undefined}
                        id="err-fullName"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1">
                        Work Email <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.workEmail}
                        onChange={(e) => updateField("workEmail", e.target.value)}
                        onBlur={() => handleBlur("workEmail")}
                        placeholder="you@organization.com"
className={cn(
 "w-full rounded-lg border bg-card/60 px-3.5 py-2.5 min-h-[44px] text-sm outline-none transition-colors focus:border-primary",
 touched.workEmail && errors.workEmail
   ? "border-destructive"
   : "border-border",
)}
                        autoComplete="email"
                        aria-invalid={!!(touched.workEmail && errors.workEmail)}
                        aria-describedby={
                          touched.workEmail && errors.workEmail ? "err-workEmail" : undefined
                        }
                      />
                      <FieldError
                        message={touched.workEmail ? errors.workEmail : undefined}
                        id="err-workEmail"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1">
                      Organization <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => updateField("organization", e.target.value)}
                      onBlur={() => handleBlur("organization")}
                      placeholder="e.g. Acme Facilities"
className={cn(
 "w-full rounded-lg border bg-card/60 px-3.5 py-2.5 min-h-[44px] text-sm outline-none transition-colors focus:border-primary",
 touched.organization && errors.organization
   ? "border-destructive"
   : "border-border",
)}
                      autoComplete="organization"
                      aria-invalid={!!(touched.organization && errors.organization)}
                      aria-describedby={
                        touched.organization && errors.organization ? "err-organization" : undefined
                      }
                    />
                    <FieldError
                      message={touched.organization ? errors.organization : undefined}
                      id="err-organization"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1">
                        Your Role <span className="text-destructive">*</span>
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) =>
                          updateField("role", e.target.value as (typeof ROLE_OPTIONS)[number])
                        }
                        className="w-full rounded-lg border border-border bg-card/60 px-3.5 py-2.5 min-h-[44px] text-sm outline-none transition-colors focus:border-primary"
                      >
                        {ROLE_OPTIONS.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1">
                        Organization Type <span className="text-destructive">*</span>
                      </label>
                      <select
                        value={formData.orgType}
                        onChange={(e) =>
                          updateField("orgType", e.target.value as (typeof ORG_TYPES)[number])
                        }
                        className="w-full rounded-lg border border-border bg-card/60 px-3.5 py-2.5 min-h-[44px] text-sm outline-none transition-colors focus:border-primary"
                      >
                        {ORG_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1">
                      Number of Sites
                    </label>
                    <select
                      value={formData.siteCount}
                      onChange={(e) =>
                        updateField("siteCount", e.target.value as (typeof SITE_COUNTS)[number])
                      }
                      className="w-full rounded-lg border border-border bg-card/60 px-3.5 py-2.5 min-h-[44px] text-sm outline-none transition-colors focus:border-primary"
                    >
                      {SITE_COUNTS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1">
                      Current Challenge or Question{" "}
                      <span className="text-muted-foreground font-normal">(optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder="e.g. We manage 12 campus buildings and need SLA tracking for maintenance..."
                      className="w-full rounded-lg border border-border bg-card/60 px-3.5 py-2.5 min-h-[44px] text-sm outline-none transition-colors focus:border-primary"
                    />
                  </div>

                  <div className="pt-1">
                    {submitError && (
                      <div
                        role="alert"
                        className="mt-2 flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2 text-sm text-red-500"
                      >
                        <FiAlertCircle className="h-4 w-4 shrink-0" aria-hidden />
                        <span>{submitError}</span>
                        <button
                          onClick={() => setSubmitError(null)}
                          className="ml-2 hover:text-red-500"
                          aria-label="Dismiss error"
                        >
                          ×
                        </button>
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 min-h-[44px] text-sm font-bold text-white shadow-md transition-all hover:bg-blue-500 disabled:opacity-60"
                    >
                      {loading ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      ) : (
                        <FiSend className="h-4 w-4" />
                      )}
                      Book a Demo
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
