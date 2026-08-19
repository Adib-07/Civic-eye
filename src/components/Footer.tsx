import { Link } from "@tanstack/react-router";
import { FiEye } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/40">
      <div className="page-container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
              <FiEye className="h-4 w-4" />
            </span>
            <span className="font-display text-base font-semibold">
              Civic<span className="text-primary">Eye</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Civic operations platform for communities, campuses, townships, and facility
            management teams.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Platform</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>
              <Link to="/for-organizations" className="transition-colors hover:text-foreground">
                Overview
              </Link>
            </li>
            <li>
              <Link to="/report" className="transition-colors hover:text-foreground">
                Report an Issue
              </Link>
            </li>
            <li>
              <Link to="/map" className="transition-colors hover:text-foreground">
                Live Map
              </Link>
            </li>
            <li>
              <Link to="/reports" className="transition-colors hover:text-foreground">
                Reports Queue
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Solutions</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>
              <Link to="/for-organizations" className="transition-colors hover:text-foreground">
                For Organizations
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="transition-colors hover:text-foreground">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/book-demo" className="transition-colors hover:text-foreground">
                Request a Demo
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Resources</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>
              <Link to="/faq" className="transition-colors hover:text-foreground">
                FAQ
              </Link>
            </li>
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
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} CivicEye. Civic operations, from report to verified resolution.
      </div>
    </footer>
  );
}
