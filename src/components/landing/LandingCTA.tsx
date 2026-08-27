import { Link } from "@tanstack/react-router";
import { FiArrowRight } from "react-icons/fi";

export function LandingCTA() {
  return (
    <section className="cinematic-hero relative overflow-hidden">
      <div className="cinematic-hero-bg" aria-hidden />
      <div className="cinematic-hero-glow" aria-hidden />
      <div className="page-container relative z-10 py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to bring accountability to your operations?
          </h2>
          <p className="mt-4 max-w-xl text-base text-white/60 mx-auto">
            See how CivicEye can fit into your organization&apos;s existing issue-resolution
            workflow.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/book-demo" className="cinematic-btn-primary">
              Book a Demo <FiArrowRight aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
