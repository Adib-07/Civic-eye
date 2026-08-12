import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiMenu, FiX, FiMoon, FiSun, FiEye } from "react-icons/fi";
import { useTheme } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const citizenLinks = [
  { to: "/", label: "Home" },
  { to: "/report", label: "Report Issue" },
  { to: "/reports", label: "Reports" },
  { to: "/map", label: "Map" },
  { to: "/pricing", label: "Pricing" },
] as const;

const staffLinks = [{ to: "/dashboard", label: "Dashboard" }] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const linkClass = (active: boolean) =>
    cn(
      "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
      active && "bg-accent font-semibold text-primary",
    );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-[min(1200px,94vw)] items-center justify-between py-3">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
            <FiEye className="h-5 w-5" aria-hidden />
          </span>
          <span className="truncate font-display text-lg font-extrabold tracking-tight">
            Civic<span className="text-primary">Eye</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {citizenLinks.map((l) => (
            <Link key={l.to} to={l.to} className={linkClass(pathname === l.to)}>
              {l.label}
            </Link>
          ))}
          <span className="mx-2 h-5 w-px bg-border" aria-hidden />
          {staffLinks.map((l) => (
            <Link key={l.to} to={l.to} className={linkClass(pathname === l.to)}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            {dark ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
          </button>
          <Link
            to="/login"
            className="hidden rounded-lg border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10 sm:block"
          >
            Staff sign in
          </Link>
          <Link
            to="/report"
            className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 md:block"
          >
            Report issue
          </Link>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
            className="grid h-9 w-9 place-items-center rounded-xl border border-border lg:hidden"
          >
            {open ? <FiX className="h-4 w-4" /> : <FiMenu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.nav
          id="mobile-nav"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto flex w-[min(1200px,94vw)] flex-col border-t border-border py-2 lg:hidden"
          aria-label="Mobile navigation"
        >
          <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
            Citizens
          </p>
          {citizenLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <p className="mt-2 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
            Organization staff
          </p>
          {staffLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-xl px-3 py-2.5 text-sm font-bold text-primary"
          >
            Staff sign in
          </Link>
          <Link
            to="/report"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-xl bg-primary px-3 py-2.5 text-sm font-bold text-primary-foreground"
          >
            Report an issue
          </Link>
        </motion.nav>
      )}
    </header>
  );
}
