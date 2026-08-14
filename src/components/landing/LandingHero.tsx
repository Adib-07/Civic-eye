import { Link } from "@tanstack/react-router";
import { FiArrowRight } from "react-icons/fi";

import { HeroProductPreview } from "@/components/landing/HeroProductPreview";

export function LandingHero() {
  return (
    <section className="cinematic-hero relative overflow-hidden">
      <div className="cinematic-hero-bg" aria-hidden />
      <div className="cinematic-hero-grid" aria-hidden />
      <div className="cinematic-hero-glow" aria-hidden />

      <div className="page-container relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-xl lg:text-left">
          <p className="cinematic-eyebrow">Civic operations platform</p>
          <h1 className="mt-4 font-display text-[2rem] font-semibold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
            See every civic issue.
            <span className="mt-1 block text-white/90">Move every resolution forward.</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">
            CivicEye gives organizations one operational system to collect, assign, track and verify
            real-world issues — with location, evidence and accountability built in.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link to="/start" className="cinematic-btn-primary">
              Start organization pilot <FiArrowRight aria-hidden />
            </Link>
            <Link to="/report" className="cinematic-btn-secondary">
              Submit a test report
            </Link>
          </div>
          <p className="mt-4 text-sm text-white/50">
            For municipalities, campuses, townships, housing societies &amp; facility operators
          </p>
        </div>

        <div className="mt-12 lg:mt-14 cinematic-reveal">
          <HeroProductPreview />
        </div>
      </div>
    </section>
  );
}
