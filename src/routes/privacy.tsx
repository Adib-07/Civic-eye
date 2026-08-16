import { createFileRoute } from "@tanstack/react-router";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — CivicEye" },
      { name: "description", content: "CivicEye Privacy Policy describing how organization and citizen issue report data is collected and processed." },
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

        <div className="mt-8 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">1. Data Collection</h2>
            <p>
              CivicEye collects information necessary to facilitate civic issue reporting and resolution tracking, including geo-location coordinates, photo evidence attachments, issue descriptions, and user profile information.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">2. Organization Isolation</h2>
            <p>
              All organization issue data, staff profile records, and resolution history are strictly isolated at the database level using Row Level Security (RLS) policies and organization-scoped storage buckets.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">3. Photo Evidence & Location Data</h2>
            <p>
              Uploaded issue images and location coordinates are used exclusively for maintenance routing, staff dispatch, and citizen resolution verification.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">4. Contact Us</h2>
            <p>
              For privacy inquiries or data requests, contact support at <a href="mailto:privacy@civiceye.in" className="text-primary hover:underline">privacy@civiceye.in</a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
