import { createFileRoute } from "@tanstack/react-router";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — CivicEye" },
      {
        name: "description",
        content:
          "CivicEye Terms of Service governing platform usage for subscribing organizations and their staff and community members.",
      },
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
        <p className="mt-2 text-xs text-muted-foreground">
          These terms govern your use of the CivicEye platform. If you need legal review, please
          contact us.
        </p>

        <div className="mt-8 space-y-8 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-foreground">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the CivicEye platform, you agree to comply with these Terms of
              Service. CivicEye provides issue management software for facility management
              companies, campuses, communities, and operations teams.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-foreground">
              2. Organization Responsibilities
            </h2>
            <p>Subscribing organizations are responsible for:</p>
            <ul className="ml-4 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground/50 mt-0.5 shrink-0">&bull;</span>
                <span>Managing staff access and role assignments within the platform.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground/50 mt-0.5 shrink-0">&bull;</span>
                <span>
                  Ensuring accurate maintenance assignments and timely resolution of reported
                  issues.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground/50 mt-0.5 shrink-0">&bull;</span>
                <span>
                  Maintaining appropriate operational SLAs for their community, campus, or facility.
                </span>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-foreground">3. User Conduct</h2>
            <p>
              Users must provide honest issue reports with accurate photo evidence and location
              information. Submitting fraudulent, offensive, or malicious content is strictly
              prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-foreground">4. Service Availability</h2>
            <p>
              CivicEye strives for high availability but does not guarantee uninterrupted service.
              Scheduled maintenance windows and platform updates may temporarily affect
              availability. We will communicate planned maintenance in advance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-foreground">5. Limitation of Liability</h2>
            <p>
              CivicEye is provided as-is for operational issue management. We are not liable for any
              damages arising from use of the platform. Organizations are responsible for their own
              operational decisions and maintenance outcomes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-foreground">6. Changes to Terms</h2>
            <p>
              We may update these terms as the platform evolves. Material changes will be
              communicated to subscribed organizations. Continued use of the platform after changes
              constitutes acceptance of the updated terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-foreground">7. Contact Information</h2>
            <p>
              Questions regarding these terms should be directed to{" "}
              <a href="mailto:support@civiceye.in" className="text-primary hover:underline">
                support@civiceye.in
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
