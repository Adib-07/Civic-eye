import { Link } from "@tanstack/react-router";
import { FiArrowRight, FiShield, FiCheckCircle, FiActivity } from "react-icons/fi";

import { HeroProductPreview } from "@/components/landing/HeroProductPreview";

export function LandingHero() {
  return (
    <section className="cinematic-hero relative overflow-hidden pt-6 pb-16 lg:pt-10 lg:pb-24">
      <div className="cinematic-hero-bg" aria-hidden />
      <div className="cinematic-hero-grid" aria-hidden />
      <div className="cinematic-hero-glow" aria-hidden />

      <div className="page-container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-200/90">
              Enterprise Civic Infrastructure Layer
            </span>
            <span className="hidden text-white/30 sm:inline">•</span>
            <span className="hidden text-xs text-white/70 sm:inline">v2.4 Live Intake Engine</span>
          </div>

          {/* Main Headline */}
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-[4rem]">
            Turn civic problems into{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">
              accountable action.
            </span>
          </h1>

          {/* Supporting Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg lg:text-xl">
            CivicEye gives organizations one operational layer for reporting, assigning, tracking
            and resolving real-world issues with location, photo evidence, and SLA accountability.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/start" className="cinematic-btn-primary group">
              <span>Start organization pilot</span>
              <FiArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
            <Link to="/report" className="cinematic-btn-secondary">
              Submit test report
            </Link>
            <Link to="/reports" className="cinematic-btn-secondary">
              View live queue
            </Link>
          </div>

          {/* Trust badges strip */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <FiShield className="h-4 w-4 text-blue-400" /> Organization Data Isolation
            </span>
            <span className="flex items-center gap-1.5">
              <FiCheckCircle className="h-4 w-4 text-emerald-400" /> Photo &amp; Geolocation
              Verification
            </span>
            <span className="flex items-center gap-1.5">
              <FiActivity className="h-4 w-4 text-amber-400" /> Automated SLA Tracking
            </span>
          </div>
        </div>

        {/* Product Visualization Mockup */}
        <div className="mt-12 lg:mt-16 cinematic-reveal">
          <HeroProductPreview />
        </div>
      </div>
    </section>
  );
}
