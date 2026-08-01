import { Link } from "@tanstack/react-router";
import { FiEye, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-secondary/50 sm:mt-24">
      <div className="mx-auto grid w-[min(1200px,94vw)] gap-8 py-12 sm:grid-cols-2 sm:gap-10 sm:py-14 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <FiEye className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-extrabold">
              Civic<span className="text-primary">Eye</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Photo-first civic issue reporting for residents and municipal ward teams across Indian
            cities.
          </p>
        </div>


        <div>
          <h4 className="text-sm font-bold">Product</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/report" className="hover:text-foreground">
                Report an issue
              </Link>
            </li>
            <li>
              <Link to="/reports" className="hover:text-foreground">
                Browse reports
              </Link>
            </li>
            <li>
              <Link to="/map" className="hover:text-foreground">
                Live map
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold">Team</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/dashboard" className="hover:text-foreground">
                Admin dashboard
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-foreground">
                Sign in
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
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
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} CivicEye. Built for cleaner, safer streets in every ward.
      </div>
    </footer>

  );
}
