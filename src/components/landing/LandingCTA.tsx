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
            Start a pilot workspace or request a walkthrough with our product team.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/book-demo" className="cinematic-btn-primary">
              Request a Demo <FiArrowRight aria-hidden />
            </Link>
            <Link to="/start" className="cinematic-btn-secondary">
              Start Pilot
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
