import { createFileRoute } from "@tanstack/react-router";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { DashboardPreviewSection } from "@/components/landing/DashboardPreviewSection";
import { EvidenceSection } from "@/components/landing/EvidenceSection";
import { LandingCTA } from "@/components/landing/LandingCTA";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingPricingTeaser } from "@/components/landing/LandingPricingTeaser";
import { MapPreviewSection } from "@/components/landing/MapPreviewSection";
import { OperationsSection } from "@/components/landing/OperationsSection";
import {
  PlatformFeaturesSection,
  TrustSecuritySection,
} from "@/components/landing/PlatformFeaturesSection";
import { ProductPreviewSection } from "@/components/landing/ProductPreviewSection";
import { TrustStrip } from "@/components/landing/TrustStrip";
import { WorkflowSection } from "@/components/landing/WorkflowSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CivicEye — Civic Operations Platform" },
      {
        name: "description",
        content:
          "CivicEye helps communities and organizations report, assign, track, and verify local issues from one accountable workflow.",
      },
      {
        property: "og:title",
        content: "CivicEye — Civic Operations Platform",
      },
      {
        property: "og:description",
        content:
          "Civic operations, from report to verified resolution. Report issues, assign responsibility, track progress, and verify completed work.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="cinematic" />

      <main>
        <LandingHero />
        <TrustStrip />
        <WorkflowSection />
        <ProductPreviewSection />
        <MapPreviewSection />
        <EvidenceSection />
        <OperationsSection />
        <DashboardPreviewSection />
        <PlatformFeaturesSection />
        <TrustSecuritySection />
        <LandingPricingTeaser />
        <LandingCTA />
      </main>

      <Footer />
    </div>
  );
}
