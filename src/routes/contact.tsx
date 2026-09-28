import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { FiAlertCircle, FiArrowRight, FiCheckCircle, FiMail, FiSend } from "react-icons/fi";
import { toast } from "sonner";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { isSupabaseConfigured } from "@/lib/env";
import { mailtoLink } from "@/lib/plans";
import { submitDemoRequest } from "@/lib/subscription";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact CivicEye" },
      {
        name: "description",
        content: "Talk to the CivicEye team about a pilot, a deployment, or a security review.",
      },
    ],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Please tell us your name"),
  email: z.string().trim().email("Enter a valid email address"),
  organization: z.string().trim().min(2, "Tell us which organization you are with"),
  message: z.string().trim().min(10, "Please add a little more detail (10 characters minimum)"),
});

const TOPICS = [
  "Start a pilot",
  "Book a demo",
  "Security review",
  "Pricing question",
  "Partnership",
  "Something else",
] as const;

function ContactPage() {
  const configured = isSupabaseConfigured();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    organization: "",
    topic: TOPICS[0],
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const field =
    "mt-1.5 w-full rounded-xl border border-border bg-card/60 px-3 py-3 text-sm outline-none focus:border-primary";

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFieldErrors({});
    setSubmitError(null);

    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!errors[key]) errors[key] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }

    if (!configured) {
      setSubmitError(
        "This deployment is not connected to a database yet. Email us directly instead — see the contact details above.",
      );
      return;
    }

    setBusy(true);
    try {
      await submitDemoRequest({
        fullName: parsed.data.fullName,
        workEmail: parsed.data.email,
        organization: parsed.data.organization,
        role: form.topic,
        message: parsed.data.message,
      });
      setSent(true);
      toast.success("Message sent");
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "We could not send your message. Please try again or email us directly.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main id="main-content" className="container grid gap-10 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Contact</p>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight">
            Talk to a human.
          </h1>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
            Tell us what you are trying to run and we will show you the workflow on your own
            scenario — a housing society, a campus, or a facilities portfolio.
          </p>

          <div className="mt-8 space-y-4">
            <div className="surface-panel flex items-start gap-4 p-5">
              <span className="icon-wrapper-lg icon-wrapper-primary shrink-0">
                <FiMail className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h2 className="text-sm font-semibold">Email</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  <a
                    href={mailtoLink("sales@civiceye.in", "CivicEye enquiry")}
                    className="font-semibold text-primary hover:underline"
                  >
                    sales@civiceye.in
                  </a>{" "}
                  — we reply within one business day.
                </p>
              </div>
            </div>

            <div className="surface-panel flex items-start gap-4 p-5">
              <span className="icon-wrapper-lg icon-wrapper-primary shrink-0">
                <FiArrowRight className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h2 className="text-sm font-semibold">Just want access?</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Skip the form and{" "}
                  <Link to="/start" className="font-semibold text-primary hover:underline">
                    request a free pilot
                  </Link>
                  . Your organization workspace is provisioned from there.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="surface-panel p-6 sm:p-8">
          {sent ? (
            <div className="py-10 text-center">
              <div className="icon-wrapper-xl mx-auto mb-5 border-success/25 bg-success/10 text-success">
                <FiCheckCircle className="h-6 w-6" aria-hidden />
              </div>
              <h2 className="font-display text-xl font-bold">Message received</h2>
              <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                Thanks {form.fullName.split(" ")[0]} — we have your note about{" "}
                <strong>{form.topic.toLowerCase()}</strong> and will get back to {form.email}.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link to="/book-demo" className="btn-primary px-5 py-3">
                  Book a demo
                </Link>
                <Link to="/" className="btn-secondary px-5 py-3">
                  Back to home
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5" noValidate>
              <div>
                <h2 className="font-display text-xl font-bold">Send us a message</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  We only use this to reply to you.
                </p>
              </div>

              {submitError && (
                <div
                  role="alert"
                  className="card flex items-start gap-2.5 border-destructive/30 bg-destructive/10 p-4"
                >
                  <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden />
                  <span className="body-sm">{submitError}</span>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="form-field">
                  <label htmlFor="contact-name" className="label">
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    className={field}
                    autoComplete="name"
                    required
                  />
                  {fieldErrors.fullName && <FieldError message={fieldErrors.fullName} />}
                </div>

                <div className="form-field">
                  <label htmlFor="contact-email" className="label">
                    Work email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={field}
                    autoComplete="email"
                    required
                  />
                  {fieldErrors.email && <FieldError message={fieldErrors.email} />}
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="contact-org" className="label">
                  Organization
                </label>
                <input
                  id="contact-org"
                  value={form.organization}
                  onChange={(e) => update("organization", e.target.value)}
                  placeholder="e.g. Green Meadows RWA"
                  className={field}
                  autoComplete="organization"
                  required
                />
                {fieldErrors.organization && <FieldError message={fieldErrors.organization} />}
              </div>

              <div className="form-field">
                <label htmlFor="contact-topic" className="label">
                  Topic
                </label>
                <select
                  id="contact-topic"
                  value={form.topic}
                  onChange={(e) => update("topic", e.target.value)}
                  className={field}
                >
                  {TOPICS.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="contact-message" className="label">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Tell us about your sites, your team, and the problem you are trying to solve."
                  className={`${field} resize-y`}
                  required
                />
                {fieldErrors.message && <FieldError message={fieldErrors.message} />}
              </div>

              <button
                type="submit"
                disabled={busy}
                className="btn-primary w-full justify-center gap-2 py-3.5 disabled:opacity-60"
              >
                {busy ? (
                  "Sending…"
                ) : (
                  <>
                    <FiSend className="h-4 w-4" aria-hidden /> Send message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <p className="form-error">
      <FiAlertCircle className="h-3.5 w-3.5" aria-hidden />
      <span>{message}</span>
    </p>
  );
}
