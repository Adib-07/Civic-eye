import { createFileRoute } from "@tanstack/react-router";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { LandingHero } from "@/components/landing/LandingHero";
import { ProductVisualSection } from "@/components/landing/ProductVisualSection";
import { ProductTour } from "@/components/landing/ProductTour";
import { ProblemStorySection } from "@/components/landing/ProblemStorySection";
import { CapabilitiesSection } from "@/components/landing/CapabilitiesSection";
import { SolutionsSection } from "@/components/landing/SolutionsSection";
import { OperationalValueSection } from "@/components/landing/OperationalValueSection";
import { ProductShowcaseSection } from "@/components/landing/ProductShowcaseSection";
import { TrustSection } from "@/components/landing/TrustSection";
import { LandingPricingTeaser } from "@/components/landing/LandingPricingTeaser";
import { FaqSection } from "@/components/landing/FaqSection";
import { LandingCTA } from "@/components/landing/LandingCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CivicEye — Issue Operations Platform" },
      {
        name: "description",
        content:
          "CivicEye helps organizations receive, assign, track, resolve and verify operational issues with SLA visibility and evidence-backed workflows.",
      },
      {
        property: "og:title",
        content: "CivicEye — Issue Operations Platform",
      },
      {
        property: "og:description",
        content:
          "One platform for facility and operations teams to manage the complete issue lifecycle — from report to verified resolution.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "CivicEye" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "CivicEye — Issue Operations Platform",
      },
      {
        name: "twitter:description",
        content:
          "Helps organizations receive, assign, track, resolve and verify operational issues with SLA visibility.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="cinematic" />

      <main id="main-content">
        <LandingHero />
        <ProductVisualSection />
        <ProductTour />
        <ProblemStorySection />
        <CapabilitiesSection />
        <SolutionsSection />
        <OperationalValueSection />
        <ProductShowcaseSection />
        <TrustSection />
        <LandingPricingTeaser />
        <FaqSection />
        <LandingCTA />
      </main>

      <Footer />
    </div>
  );
}
