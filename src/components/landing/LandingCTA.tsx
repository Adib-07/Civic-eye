import { Link } from "@tanstack/react-router";
import { FiArrowRight } from "react-icons/fi";

export function LandingCTA() {
  return (
    <section className="cinematic-hero relative overflow-hidden">
      <div className="cinematic-hero-bg" aria-hidden />
      <div className="cinematic-hero-glow" aria-hidden />
      <div className="page-container relative z-10 py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Ready to bring accountability to your operations?
          </h2>
          <p className="mt-4 text-base text-white/60 max-w-xl mx-auto">
            See how CivicEye can fit into your organization&apos;s existing issue-resolution
            workflow.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/book-demo" className="cinematic-btn-primary">
              Book a Demo <FiArrowRight aria-hidden />
            </Link>
            <Link to="/for-organizations" className="cinematic-btn-secondary">
              Explore the Product
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
