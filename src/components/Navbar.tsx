import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiMenu, FiX, FiMoon, FiSun, FiEye } from "react-icons/fi";
import { useTheme } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/report", label: "Report Issue" },
  { to: "/reports", label: "Reports" },
  { to: "/map", label: "Map" },
  { to: "/dashboard", label: "Dashboard" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-[min(1200px,94vw)] items-center justify-between py-3">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
            <FiEye className="h-5 w-5" />
          </span>
          <span className="truncate font-display text-lg font-extrabold tracking-tight">
            Civic<span className="text-primary">Eye</span>
          </span>
        </Link>


        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "rounded-xl px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                pathname === l.to && "bg-secondary text-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card/60 text-foreground transition-colors hover:bg-secondary"
          >
            {dark ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
          </button>
          <Link
            to="/login"
            className="bg-brand hidden rounded-xl px-4 py-2 text-sm font-bold text-primary-foreground shadow-lg transition-transform hover:scale-[1.03] sm:block"
          >
            Sign in
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="grid h-9 w-9 place-items-center rounded-xl border border-border lg:hidden"
          >
            {open ? <FiX className="h-4 w-4" /> : <FiMenu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass mx-auto mt-2 flex w-[min(1200px,94vw)] flex-col rounded-2xl p-2 lg:hidden"
        >
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-xl px-3 py-2 text-sm font-bold text-primary"
          >
            Sign in
          </Link>
        </motion.nav>
      )}
    </header>
  );
}
