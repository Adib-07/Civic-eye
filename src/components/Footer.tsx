import { Link } from "@tanstack/react-router";
import { FiEye, FiGithub, FiTwitter, FiMail } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/40">
      <div className="mx-auto grid w-[min(1200px,94vw)] gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-brand grid h-9 w-9 place-items-center rounded-xl text-primary-foreground">
              <FiEye className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-extrabold">
              Civic<span className="text-gradient">Eye</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            AI-assisted civic issue reporting. Snap it, send it, and watch your city fix it.
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
          <h4 className="text-sm font-bold">Connect</h4>
          <div className="mt-4 flex gap-3">
            {[FiGithub, FiTwitter, FiMail].map((Icon, i) => (
              <span
                key={i}
                className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card/60 text-muted-foreground"
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} CivicEye. Built for cleaner, safer streets.
      </div>
    </footer>
  );
}
