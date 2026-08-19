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
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-[4.25rem]">
            Civic operations, from report to{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-200 to-sky-300 bg-clip-text text-transparent">
              verified resolution.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg lg:text-xl">
            Give communities and operational teams one accountable workflow to report issues,
            assign responsibility, track progress, and verify completed work.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/report" className="cinematic-btn-primary group shadow-lg shadow-blue-900/30">
              <span>Report an Issue</span>
            </Link>
            <Link to="/for-organizations" className="cinematic-btn-secondary">
              See How It Works
            </Link>
            <Link to="/book-demo" className="cinematic-btn-secondary">
              <span>Request a Demo</span>
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 backdrop-blur-sm text-xs font-medium text-slate-300">
            <span className="flex items-center gap-2">
              <FiMapPin className="h-4 w-4 text-blue-400" /> Geo-tagged reporting
            </span>
            <span className="text-white/20">&bull;</span>
            <span className="flex items-center gap-2">
              <FiShield className="h-4 w-4 text-indigo-400" /> Role-based access
            </span>
            <span className="text-white/20">&bull;</span>
            <span className="flex items-center gap-2">
              <FiClock className="h-4 w-4 text-amber-400" /> SLA tracking
            </span>
            <span className="text-white/20">&bull;</span>
            <span className="flex items-center gap-2">
              <FiDatabase className="h-4 w-4 text-emerald-400" /> Organization-isolated data
            </span>
          </div>
        </div>

        <div className="mt-12 lg:mt-16 cinematic-reveal">
          <HeroProductPreview />
        </div>
      </div>
    </section>
  );
}
