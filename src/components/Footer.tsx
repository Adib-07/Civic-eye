import { Link } from "@tanstack/react-router";
import { FiEye } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="mt-0 border-t border-border bg-secondary/40">
      <div className="page-container grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 py-14">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
              <FiEye className="h-4 w-4" />
            </span>
            <span className="font-display text-base font-semibold">CivicEye</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Operational issue management from report to verified resolution for facilities,
            campuses, and communities.
          </p>
        </div>

        {/* Product */}
        <div>
          <h4 className="text-sm font-semibold">Product</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
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

        {/* Solutions */}
        <div>
          <h4 className="text-sm font-semibold">Solutions</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>
              <Link
                to="/for-organizations"
                hash="solutions"
                className="transition-colors hover:text-foreground"
              >
                Facility Management
              </Link>
            </li>
            <li>
              <Link
                to="/for-organizations"
                hash="solutions"
                className="transition-colors hover:text-foreground"
              >
                Campuses
              </Link>
            </li>
            <li>
              <Link
                to="/for-organizations"
                hash="solutions"
                className="transition-colors hover:text-foreground"
              >
                Communities
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
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
            <li>
              <Link to="/book-demo" className="transition-colors hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-sm font-semibold">Legal</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
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
      <div className="border-t border-border py-4">
        <div className="page-container flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground">
            © 2026 CivicEye. Issue management from report to verified resolution.
          </span>
          <div className="flex gap-4">
            <Link
              to="/privacy"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <Link
              to="/security"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
