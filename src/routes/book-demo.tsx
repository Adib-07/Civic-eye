import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  FiCheckCircle,
  FiSend,
  FiShield,
  FiClock,
  FiAlertCircle,
  FiMail,
  FiArrowLeft,
} from "react-icons/fi";

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
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-destructive">
      <FiAlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
      <span>{message}</span>
    </p>
  );
}

export function BookDemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
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
      return;
    }

    if (!isSupabaseConfigured()) {
      setSubmitError(
        "Database is not configured yet. Please configure your environment credentials or email us directly at demo@civiceye.com.",
      );
      return;
    }

    setLoading(true);
    setSubmitError(null);

    try {
      await submitDemoRequest({
        fullName: formData.fullName,
        workEmail: formData.workEmail,
        organization: formData.organization,
        role: formData.role,
        orgType: formData.orgType,
        siteCount: formData.siteCount,
        message: formData.message,
      });
      setSubmittedEmail(formData.workEmail);
      setLoading(false);
      setSubmitted(true);
    } catch {
      setSubmitError(
        "We could not record your demo request online. You can retry in a moment, or reach our operations team directly at demo@civiceye.com.",
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="cinematic" />

      <main className="page-container py-14 sm:py-20">
        <div className="max-w-4xl mx-auto grid gap-12 lg:grid-cols-12 items-start">
          {/* Left information column */}
          <div className="lg:col-span-5 space-y-7">
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mb-5"
              >
                <FiArrowLeft className="h-3.5 w-3.5" />
                Back to home
              </Link>
              <p className="caption">Schedule a Walkthrough</p>
              <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl text-foreground tracking-tight font-display">
                See how CivicEye powers facilities & campuses
              </h1>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Join operational leaders using CivicEye for verified incident resolution, SLA
                tracking, and field staff dispatch.
              </p>
            </div>

            <div className="space-y-5 pt-5 border-t border-border">
              <div className="flex items-start gap-4 text-sm">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 grid place-items-center shrink-0 border border-emerald-500/20">
                  <FiCheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <strong className="text-foreground text-sm font-bold">
                    Tailored to your organization
                  </strong>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Campuses, communities, townships, and commercial facilities.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-sm">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-500 grid place-items-center shrink-0 border border-blue-500/20">
                  <FiShield className="h-5 w-5" />
                </div>
                <div>
                  <strong className="text-foreground text-sm font-bold">No-obligation pilot</strong>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Test live workflows with up to 5 staff members free for 30 days.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-sm">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-500 grid place-items-center shrink-0 border border-amber-500/20">
                  <FiClock className="h-5 w-5" />
                </div>
                <div>
                  <strong className="text-foreground text-sm font-bold">Prompt scheduling</strong>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Our team will confirm a 15-minute slot tailored to your schedule.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border/70 bg-card/40 p-5 text-xs text-muted-foreground space-y-2">
              <div className="flex items-center gap-2 text-foreground font-bold">
                <FiMail className="h-4 w-4 text-primary" />
                <span>Need urgent assistance?</span>
              </div>
              <p>
                For direct enterprise inquiries, email us at{" "}
                <a
                  href="mailto:demo@civiceye.com?subject=CivicEye%20Enterprise%20Inquiry"
                  className="text-primary hover:underline font-bold"
                >
                  demo@civiceye.com
                </a>
                .
              </p>
            </div>
          </div>

          {/* Right form card column */}
          <div className="lg:col-span-7">
            <div className="surface-panel p-7 sm:p-9 rounded-2xl shadow-lg border border-border/80">
              {submitted ? (
                <div className="text-center py-10 space-y-5" role="status" aria-live="polite">
                  <div className="h-18 w-18 rounded-2xl bg-emerald-500/10 text-emerald-500 grid place-items-center mx-auto border border-emerald-500/20">
                    <FiCheckCircle className="h-9 w-9" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-foreground font-display">
                      Demo request received!
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto mt-3 leading-relaxed">
                      Thank you for your interest. We will review your requirements and reach out to{" "}
                      <span className="font-bold text-foreground">{submittedEmail}</span> shortly
                      with schedule options.
                    </p>
                  </div>
                  <div className="pt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link
                      to="/"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                    >
                      Back to home
                    </Link>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData(INITIAL_FORM);
                        setErrors({});
                        setTouched({});
                        setSubmitError(null);
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
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
                  <div className="pb-4 border-b border-border">
                    <h2 className="text-lg font-extrabold text-foreground font-display">
                      Request a 15-Minute Walkthrough
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Fill out the details below and our team will get in touch.
                    </p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="field-fullName" className="label">
                        Full Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="field-fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        onBlur={() => handleBlur("fullName")}
                        placeholder="e.g. Aditi Sharma"
                        className={cn(
                          "w-full rounded-lg border bg-card px-4 py-3 min-h-[48px] text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 font-medium",
                          touched.fullName && errors.fullName
                            ? "border-destructive focus:ring-destructive/20"
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
                      <label htmlFor="field-workEmail" className="label">
                        Work Email <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="field-workEmail"
                        type="email"
                        value={formData.workEmail}
                        onChange={(e) => updateField("workEmail", e.target.value)}
                        onBlur={() => handleBlur("workEmail")}
                        placeholder="you@organization.com"
                        className={cn(
                          "w-full rounded-lg border bg-card px-4 py-3 min-h-[48px] text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 font-medium",
                          touched.workEmail && errors.workEmail
                            ? "border-destructive focus:ring-destructive/20"
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
                    <label htmlFor="field-org" className="label">
                      Organization Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="field-org"
                      type="text"
                      value={formData.organization}
                      onChange={(e) => updateField("organization", e.target.value)}
                      onBlur={() => handleBlur("organization")}
                      placeholder="e.g. Apex Facilities or Metro University"
                      className={cn(
                        "w-full rounded-lg border bg-card px-4 py-3 min-h-[48px] text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 font-medium",
                        touched.organization && errors.organization
                          ? "border-destructive focus:ring-destructive/20"
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

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="field-role" className="label">
                        Your Role
                      </label>
                      <select
                        id="field-role"
                        value={formData.role}
                        onChange={(e) =>
                          updateField("role", e.target.value as (typeof ROLE_OPTIONS)[number])
                        }
                        className="w-full rounded-lg border border-border bg-card px-4 py-3 min-h-[48px] text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer font-medium"
                      >
                        {ROLE_OPTIONS.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="field-orgType" className="label">
                        Organization Type
                      </label>
                      <select
                        id="field-orgType"
                        value={formData.orgType}
                        onChange={(e) =>
                          updateField("orgType", e.target.value as (typeof ORG_TYPES)[number])
                        }
                        className="w-full rounded-lg border border-border bg-card px-4 py-3 min-h-[48px] text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer font-medium"
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
                    <label htmlFor="field-siteCount" className="label">
                      Number of Sites Managed
                    </label>
                    <select
                      id="field-siteCount"
                      value={formData.siteCount}
                      onChange={(e) =>
                        updateField("siteCount", e.target.value as (typeof SITE_COUNTS)[number])
                      }
                      className="w-full rounded-lg border border-border bg-card px-4 py-3 min-h-[48px] text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer font-medium"
                    >
                      {SITE_COUNTS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="field-message" className="label">
                      Current Operations Challenge{" "}
                      <span className="text-muted-foreground font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="field-message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder="e.g. Managing 8 facility locations and need automated dispatch with resolution photos..."
                      className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none font-medium"
                    />
                  </div>

                  {submitError && (
                    <div
                      role="alert"
                      className="rounded-xl bg-destructive/10 border border-destructive/20 p-5 text-xs text-foreground space-y-3"
                    >
                      <div className="flex items-start gap-2.5">
                        <FiAlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{submitError}</span>
                      </div>
                      <div className="flex items-center gap-3 pt-1">
                        <a
                          href={`mailto:demo@civiceye.com?subject=CivicEye%20Demo%20Request%20-%20${encodeURIComponent(formData.organization || "Inquiry")}`}
                          className="inline-flex items-center gap-1 font-bold text-primary hover:underline"
                        >
                          <FiMail className="h-3 w-3" /> Email demo@civiceye.com directly
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 min-h-[48px] text-sm font-bold text-white shadow-sm transition-all hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          <span>Submitting request...</span>
                        </>
                      ) : (
                        <>
                          <FiSend className="h-4 w-4" />
                          <span>Schedule Demo</span>
                        </>
                      )}
                    </button>
                    <p className="mt-3 text-center text-[11px] text-muted-foreground font-medium">
                      No credit card required. Free 30-day pilot included.
                    </p>
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
