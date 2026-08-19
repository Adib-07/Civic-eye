import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FiCheckCircle, FiSend, FiShield, FiClock, FiUsers } from "react-icons/fi";
import { toast } from "sonner";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/book-demo")({
  head: () => ({
    meta: [
      { title: "Request a Demo — CivicEye for Organizations" },
      {
        name: "description",
        content:
          "Schedule a live product demonstration of CivicEye for your RWA, university campus, township, or facility management team.",
      },
    ],
  }),
  component: BookDemoPage,
});

const ORG_TYPES = [
  "Residential Community / RWA",
  "University / College",
  "Corporate Campus",
  "Township",
  "Facility Management",
  "Public-Sector / Municipal",
  "Other",
] as const;

export function BookDemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    organization: string;
    email: string;
    orgType: (typeof ORG_TYPES)[number];
    phone: string;
    message: string;
  }>({
    name: "",
    organization: "",
    email: "",
    orgType: ORG_TYPES[0],
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.organization.trim() || !formData.email.trim()) {
      toast.error("Please fill in your name, organization, and work email.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Demo request recorded successfully!");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="cinematic" />

      <main className="page-container py-12 sm:py-16">
        <div className="max-w-4xl mx-auto grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Column — Value Prop */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="section-label">Schedule a Walkthrough</p>
              <h1 className="mt-2 text-3xl font-bold sm:text-4xl text-foreground">
                See how CivicEye works for your team
              </h1>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Request a 15-minute product demonstration. We will show you how to capture photo reports,
                manage staff dispatch, track SLAs, and enforce resolution verification.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <FiCheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground">Tailored for your organization type</strong>
                  <p className="text-muted-foreground">RWAs, campuses, townships, and facilities management.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <FiShield className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground">No-obligation pilot workspace</strong>
                  <p className="text-muted-foreground">Test live workflows with up to 5 staff members free.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <FiClock className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground">Response within one business day</strong>
                  <p className="text-muted-foreground">Our product team will confirm your slot within 24 hours.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Form */}
          <div className="lg:col-span-7">
            <div className="surface-panel p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="h-14 w-14 rounded-full bg-emerald-500/15 text-emerald-500 grid place-items-center mx-auto">
                    <FiCheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Demo Request Received</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Thank you. Your request has been recorded and will be reviewed by the CivicEye team.
                    We will contact you at <strong>{formData.email}</strong> within one business day.
                  </p>
                  <div className="pt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
                    <Link
                      to="/"
                      className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold"
                    >
                      Back to home
                    </Link>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                    >
                      Submit another request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold text-foreground pb-2 border-b border-border">
                    Request a Demo
                  </h3>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1">
                        Full Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Aditi Sharma"
                        className="w-full rounded-lg border border-border bg-card/60 px-3.5 py-2.5 text-sm outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1">
                        Organization <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="e.g. Green Valley RWA / IIT Campus"
                        className="w-full rounded-lg border border-border bg-card/60 px-3.5 py-2.5 text-sm outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1">
                        Work Email <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@organization.com"
                        className="w-full rounded-lg border border-border bg-card/60 px-3.5 py-2.5 text-sm outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1">
                        Organization Type <span className="text-destructive">*</span>
                      </label>
                      <select
                        value={formData.orgType}
                        onChange={(e) => setFormData({ ...formData, orgType: e.target.value as (typeof ORG_TYPES)[number] })}
                        className="w-full rounded-lg border border-border bg-card/60 px-3.5 py-2.5 text-sm outline-none focus:border-primary"
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
                      Phone <span className="text-muted-foreground font-normal">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-lg border border-border bg-card/60 px-3.5 py-2.5 text-sm outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1">
                      What would you like to manage? <span className="text-muted-foreground font-normal">(optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Campus facility maintenance, township infrastructure, community issue tracking..."
                      className="w-full rounded-lg border border-border bg-card/60 px-3.5 py-2.5 text-sm outline-none focus:border-primary"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-500 disabled:opacity-60"
                    >
                      {loading ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      ) : (
                        <FiSend className="h-4 w-4" />
                      )}
                      Request a Demo
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
