import { createFileRoute } from "@tanstack/react-router";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — CivicEye" },
      { name: "description", content: "CivicEye Terms of Service governing platform usage for citizens and subscribing organizations." },
    ],
  }),
  component: TermsPage,
});

export function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="page-container py-12 max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground">Terms of Service</h1>
        <p className="mt-2 text-xs font-mono text-muted-foreground">Last updated: August 2026</p>

        <div className="mt-8 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the CivicEye platform, you agree to comply with these Terms of Service. CivicEye provides issue management software for residential communities, campuses, townships, and facility organizations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">2. Organization Responsibilities</h2>
            <p>
              Subscribing organizations are responsible for staff access management, accurate maintenance assignments, and timely resolution of reported civic issues according to their operational SLAs.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">3. User Conduct</h2>
            <p>
              Users must provide honest issue reports and photo evidence. Submitting fraudulent, offensive, or malicious content is strictly prohibited.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">4. Contact Information</h2>
            <p>
              Questions regarding service terms should be directed to <a href="mailto:support@civiceye.in" className="text-primary hover:underline">support@civiceye.in</a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
