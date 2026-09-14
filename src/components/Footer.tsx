import { Link } from "@tanstack/react-router";
import { FiEye } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="container grid grid-cols-2 gap-x-8 gap-y-10 py-14 md:grid-cols-4 lg:grid-cols-5">
        {/* Brand */}
        <div className="lg:col-span-2 animate-slide-up">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <FiEye className="h-4.5 w-4.5" />
            </span>
            <span className="font-display text-lg font-semibold">CivicEye</span>
          </div>
          <p className="mt-5 max-w-xs text-sm text-muted-foreground leading-relaxed">
            Operational issue management from report to verified resolution for facilities,
            campuses, and communities.
          </p>
        </div>

        {/* Product */}
        <div className="animate-slide-up stagger-1">
          <h4 className="caption">Product</h4>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li>
              <Link to="/for-organizations" className="transition-colors hover:text-foreground">
                Features
              </Link>
            </li>
            <li>
              <Link
                to="/for-organizations"
                hash="workflow"
                className="transition-colors hover:text-foreground"
              >
                How It Works
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="transition-colors hover:text-foreground">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/faq" className="transition-colors hover:text-foreground">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="animate-slide-up stagger-2">
          <h4 className="caption">Company</h4>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li>
              <Link to="/security" className="transition-colors hover:text-foreground">
                Security
              </Link>
            </li>
            <li>
              <Link to="/book-demo" className="transition-colors hover:text-foreground">
                Book a Demo
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="animate-slide-up stagger-3">
          <h4 className="caption">Legal</h4>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li>
              <Link to="/privacy" className="transition-colors hover:text-foreground">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="transition-colors hover:text-foreground">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border py-6">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground">
            © 2026 CivicEye. Issue management from report to verified resolution.
          </span>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>India</span>
            <span>•</span>
            <span>Made with care</span>
          </div>
        </div>
      </div>
    </footer>
  );
}