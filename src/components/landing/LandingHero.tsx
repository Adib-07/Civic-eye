import { Link } from "@tanstack/react-router";
import { FiArrowRight, FiCheckCircle, FiMapPin, FiShield, FiClock } from "react-icons/fi";

import { HeroProductPreview } from "@/components/landing/HeroProductPreview";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-[#07111f] pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Subtle background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(29,95,233,0.15),transparent_55%)]" aria-hidden />
      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(79,140,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(79,140,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black_20%,transparent_75%)]" aria-hidden />

      <div className="page-container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Turn reported issues into accountable,{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-200 to-sky-300 bg-clip-text text-transparent">
              verified resolution.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg lg:text-xl">
            CivicEye gives organizations one place to report issues, assign responsibility,
            track progress, capture evidence, and verify completed work.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/book-demo"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition-all hover:bg-blue-500 hover:translate-y-[-1px]"
            >
              Request a Demo
              <FiArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/for-organizations"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/85 transition-all hover:bg-white/[0.08] hover:border-white/22"
            >
              See How It Works
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-5 rounded-xl border border-white/10 bg-slate-900/60 px-5 py-3 backdrop-blur-sm text-xs font-medium text-slate-300">
            <span className="flex items-center gap-2">
              <FiMapPin className="h-4 w-4 text-blue-400" /> Geo-tagged reporting
            </span>
            <span className="text-white/20">&bull;</span>
            <span className="flex items-center gap-2">
              <FiCheckCircle className="h-4 w-4 text-emerald-400" /> Evidence-based resolution
            </span>
            <span className="text-white/20">&bull;</span>
            <span className="flex items-center gap-2">
              <FiShield className="h-4 w-4 text-indigo-400" /> Role-based access
            </span>
            <span className="text-white/20">&bull;</span>
            <span className="flex items-center gap-2">
              <FiClock className="h-4 w-4 text-amber-400" /> SLA tracking
            </span>
          </div>
        </div>

        <div className="mt-12 lg:mt-16">
          <HeroProductPreview />
        </div>
      </div>
    </section>
  );
}
