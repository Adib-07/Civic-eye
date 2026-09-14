import { Link } from "@tanstack/react-router";
import { FiArrowRight } from "react-icons/fi";

export function LandingCTA() {
  return (
    <section className="relative overflow-hidden cinematic-hero">
      <div className="cinematic-hero-bg" aria-hidden />
      <div className="cinematic-hero-glow" aria-hidden />
      <div className="container relative z-10 py-24 lg:py-32">
        <div className="mx-auto max-w-3xl text-center animate-slide-up">
          <h2 className="headline-1 text-white">
            Ready to bring accountability to your operations?
          </h2>
          <p className="mt-5 body-lg text-white/70 max-w-xl mx-auto">
            See how CivicEye can fit into your organization&apos;s existing issue-resolution
            workflow.
          </p>
          <div className="mt-10 flex justify-center">
            <Link to="/book-demo" className="btn-cinematic-primary px-8 py-4 text-base">
              Book a Demo
              <FiArrowRight aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}