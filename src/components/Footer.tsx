import { Link } from "@tanstack/react-router";
import { FiEye, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

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
            Civic issue intake and resolution for municipalities, campuses, townships, and
            facility-management teams.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Product</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>
              <Link to="/report" className="transition-colors hover:text-foreground">
                Report an issue
              </Link>
            </li>
            <li>
              <Link to="/reports" className="transition-colors hover:text-foreground">
                Browse reports
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="transition-colors hover:text-foreground">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/map" className="transition-colors hover:text-foreground">
                Live map
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Product</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>
              <Link to="/report" className="transition-colors hover:text-foreground">
                Report an issue
              </Link>
            </li>
            <li>
              <Link to="/reports" className="transition-colors hover:text-foreground">
                Browse reports
              </Link>
            </li>
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
              <Link to="/map" className="transition-colors hover:text-foreground">
                Live map
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Organization & Legal</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>
              <Link to="/book-demo" className="transition-colors hover:text-foreground">
                Book a Demo
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="transition-colors hover:text-foreground">
                Operations dashboard
              </Link>
            </li>
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

        <div>
          <h4 className="text-sm font-semibold">Contact</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <FiMail className="h-4 w-4 shrink-0" />
              <a href="mailto:support@civiceye.in" className="truncate hover:text-foreground">
                support@civiceye.in
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FiPhone className="h-4 w-4 shrink-0" />
              <a href="tel:+918000000000" className="hover:text-foreground">
                +91 80000 00000
              </a>
            </li>
            <li className="flex items-start gap-2">
              <FiMapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>Mon–Sat, 10 am – 6 pm IST</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} CivicEye. Built for accountable civic operations.
      </div>
    </footer>
  );
}
