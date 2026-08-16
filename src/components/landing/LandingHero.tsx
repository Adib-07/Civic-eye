import { Link } from "@tanstack/react-router";
import { FiArrowRight, FiMapPin, FiShield, FiClock, FiDatabase } from "react-icons/fi";

import { HeroProductPreview } from "@/components/landing/HeroProductPreview";

export function LandingHero() {
  return (
    <section className="cinematic-hero relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      <div className="cinematic-hero-bg" aria-hidden />
      <div className="cinematic-hero-grid" aria-hidden />
      <div className="cinematic-hero-glow" aria-hidden />

      <div className="page-container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-950/40 px-3.5 py-1.5 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-200 font-mono">
              CIVICEYE · CIVIC OPERATIONS PLATFORM
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-[4.25rem]">
            Turn civic complaints into{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-200 to-sky-300 bg-clip-text text-transparent">
              verified resolutions.
            </span>
          </h1>

          {/* Supporting Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg lg:text-xl">
            CivicEye helps communities and organizations report, assign, track and verify local issues from one platform.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/report" className="cinematic-btn-primary group shadow-lg shadow-blue-900/30">
              <span>Report an Issue →</span>
            </Link>
            <Link to="/for-organizations" className="cinematic-btn-secondary">
              For Organizations
            </Link>
            <Link to="/book-demo" className="rounded-xl border border-blue-500/40 bg-blue-600/20 px-5 py-3 text-sm font-semibold text-blue-200 hover:bg-blue-600/30 transition-all">
              Book a Demo
            </Link>
          </div>

          {/* Trust / Value Row */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 backdrop-blur-sm text-xs font-medium text-slate-300">
            <span className="flex items-center gap-2">
              <FiMapPin className="h-4 w-4 text-blue-400" /> Geo-tagged reporting
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-2">
              <FiShield className="h-4 w-4 text-indigo-400" /> Role-based access
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-2">
              <FiClock className="h-4 w-4 text-amber-400" /> SLA tracking
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-2">
              <FiDatabase className="h-4 w-4 text-emerald-400" /> Organization-isolated data
            </span>
          </div>
        </div>

        {/* Product Demo Centerpiece */}
        <div className="mt-12 lg:mt-16 cinematic-reveal">
          <HeroProductPreview />
        </div>
      </div>
    </section>
  );
}
