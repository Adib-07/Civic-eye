import { Link } from "@tanstack/react-router";
import { FiEye } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container grid grid-cols-2 gap-x-8 gap-y-12 py-16 md:grid-cols-4 lg:grid-cols-5">
        {/* Brand */}
        <div className="lg:col-span-2 animate-slide-up">
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <FiEye className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight">CivicEye</span>
          </div>
          <p className="mt-5 max-w-xs text-sm text-muted-foreground leading-relaxed">
            Operational issue management from report to verified resolution for facilities,
            campuses, and communities.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Platform Live
            </span>
          </div>
        </div>

        {/* Product */}
        <div className="animate-slide-up stagger-1">
          <h4 className="caption mb-5">Product</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link
                to="/for-organizations"
                className="transition-colors hover:text-foreground font-medium"
              >
                Features
              </Link>
            </li>
            <li>
              <Link to="/solutions" className="transition-colors hover:text-foreground font-medium">
                Solutions
              </Link>
            </li>
            <li>
              <Link
                to="/how-it-works"
                className="transition-colors hover:text-foreground font-medium"
              >
                How It Works
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="transition-colors hover:text-foreground font-medium">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/faq" className="transition-colors hover:text-foreground font-medium">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="animate-slide-up stagger-2">
          <h4 className="caption mb-5">Company</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link to="/security" className="transition-colors hover:text-foreground font-medium">
                Security
              </Link>
            </li>
            <li>
              <Link to="/book-demo" className="transition-colors hover:text-foreground font-medium">
                Book a Demo
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="animate-slide-up stagger-3">
          <h4 className="caption mb-5">Legal</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link to="/privacy" className="transition-colors hover:text-foreground font-medium">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="transition-colors hover:text-foreground font-medium">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border py-6">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground font-medium">
            &copy; 2026 CivicEye. Issue management from report to verified resolution.
          </span>
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
            <span>India</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
            <span>Made with care</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
