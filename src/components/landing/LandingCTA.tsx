import { Link } from "@tanstack/react-router";
import { FiArrowRight } from "react-icons/fi";

export function LandingCTA() {
  return (
    <section className="relative overflow-hidden cinematic-hero">
      <div className="absolute inset-0">
        <img
          src="/assets/corporate-1600.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-15"
        />
        <div className="hero-image-overlay" aria-hidden />
      </div>
      <div className="cinematic-hero-bg" aria-hidden />
      <div className="cinematic-hero-glow" aria-hidden />
      <div className="container relative z-10 py-28 lg:py-36">
        <div className="mx-auto max-w-3xl text-center animate-slide-up">
          <h2 className="headline-1 text-white">
            Ready to bring accountability to your operations?
          </h2>
          <p className="mt-6 body-lg text-white/70 max-w-xl mx-auto">
            See how CivicEye can fit into your organization&apos;s existing issue-resolution
            workflow.
          </p>
          <div className="mt-11 flex justify-center">
            <Link to="/book-demo" className="btn-cinematic-primary">
              Book a Demo
              <FiArrowRight aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
