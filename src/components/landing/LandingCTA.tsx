import { Link } from "@tanstack/react-router";
import { FiArrowRight } from "react-icons/fi";

export function LandingCTA() {
  return (
    <section className="cinematic-hero relative overflow-hidden">
      <div className="cinematic-hero-bg opacity-90" aria-hidden />
      <div className="page-container relative z-10 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Ready to run civic operations with accountability?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            Start a pilot workspace, submit a test report, or sign in to triage live issues for your
            organization.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/start" className="cinematic-btn-primary">
              Start pilot <FiArrowRight aria-hidden />
            </Link>
            <Link to="/login" className="cinematic-btn-secondary">
              Staff sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
