import { createFileRoute } from "@tanstack/react-router";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — CivicEye" },
      {
        name: "description",
        content:
          "CivicEye Privacy Policy describing how organization data, issue reports, and photo evidence are collected, used, and protected.",
      },
    ],
  }),
  component: PrivacyPage,
});

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="page-container py-12 max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
        <p className="mt-2 text-xs font-mono text-muted-foreground">Last updated: August 2026</p>
        <p className="mt-2 text-xs text-muted-foreground">
          This policy describes how CivicEye collects, uses, and protects data. If you need legal
          review of this policy, please contact us.
        </p>

        <div className="mt-8 space-y-8 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-foreground">1. Data We Collect</h2>
            <p>CivicEye collects information necessary to operate the issue management platform:</p>
            <ul className="ml-4 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground/50 mt-0.5 shrink-0">&bull;</span>
                <span>
                  <strong className="text-foreground">Issue reports:</strong> descriptions,
                  categories, photo evidence, and location coordinates submitted by reporters.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground/50 mt-0.5 shrink-0">&bull;</span>
                <span>
                  <strong className="text-foreground">Staff profiles:</strong> names, email
                  addresses, and role assignments managed by organization administrators.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground/50 mt-0.5 shrink-0">&bull;</span>
                <span>
                  <strong className="text-foreground">Operational data:</strong> assignment records,
                  status changes, resolution notes, and verification actions.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground/50 mt-0.5 shrink-0">&bull;</span>
                <span>
                  <strong className="text-foreground">Demo requests:</strong> name, email,
                  organization, and role information submitted through the Book a Demo form.
                </span>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-foreground">2. How We Use Data</h2>
            <p>All collected data is used exclusively for operating the CivicEye platform:</p>
            <ul className="ml-4 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground/50 mt-0.5 shrink-0">&bull;</span>
                <span>
                  Issue reports and photo evidence are used for maintenance routing, staff dispatch,
                  and resolution verification.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground/50 mt-0.5 shrink-0">&bull;</span>
                <span>
                  Staff profile data is used for authentication, role enforcement, and audit trails.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground/50 mt-0.5 shrink-0">&bull;</span>
                <span>
                  Demo request information is used to schedule and conduct product demonstrations.
                </span>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-foreground">3. Organization Data Isolation</h2>
            <p>
              All organization data — issues, staff records, files, and resolution history — is
              strictly isolated at the database level using Row Level Security (RLS) policies and
              organization-scoped storage buckets. One organization&apos;s data is never accessible
              to another.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-foreground">
              4. Photo Evidence & Location Data
            </h2>
            <p>
              Uploaded issue images and GPS coordinates are stored in private, organization-scoped
              storage buckets. These are used exclusively for maintenance routing, staff dispatch,
              and reporter resolution verification. Images are not publicly accessible.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-foreground">5. Data Sharing</h2>
            <p>
              CivicEye does not sell, rent, or share organization data with third parties.
              Infrastructure is provided by Supabase (hosted PostgreSQL), which operates under their
              own security and privacy policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-foreground">6. Data Retention</h2>
            <p>
              Organization data is retained for as long as the organization maintains an active
              account. Demo request information is retained for follow-up purposes. We do not
              currently offer automated data export or deletion — contact us to request either.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-foreground">7. Contact Us</h2>
            <p>
              For privacy inquiries, data access requests, or deletion requests, contact us at{" "}
              <a href="mailto:privacy@civiceye.in" className="text-primary hover:underline">
                privacy@civiceye.in
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
