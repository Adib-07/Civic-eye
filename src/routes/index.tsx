import { createFileRoute } from "@tanstack/react-router";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { LandingCTA } from "@/components/landing/LandingCTA";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingPricingTeaser } from "@/components/landing/LandingPricingTeaser";
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
      { title: "CivicEye — Issue Management & Verified Resolution Platform" },
      {
        name: "description",
        content:
          "CivicEye helps organizations report issues, assign responsibility, track progress, and verify completed work from one accountable workflow.",
      },
      {
        property: "og:title",
        content: "CivicEye — Issue Management & Verified Resolution Platform",
      },
      {
        property: "og:description",
        content:
          "One platform for organizations to report, assign, track, and verify local issues with photo evidence and SLA accountability.",
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
        <ProductPreviewSection />
        <WorkflowSection />
        <OperationsSection />
        <PlatformFeaturesSection />
        <TrustSecuritySection />
        <LandingPricingTeaser />
        <LandingCTA />
      </main>

      <Footer />
    </div>
  );
}
