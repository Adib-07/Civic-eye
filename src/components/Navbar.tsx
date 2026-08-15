import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { FiMenu, FiX, FiMoon, FiSun, FiEye, FiArrowRight } from "react-icons/fi";
import { useTheme } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const mainNavLinks = [
  { to: "/", hash: "workspace", label: "Product" },
  { to: "/onboarding", hash: undefined, label: "Solutions" },
  { to: "/reports", hash: undefined, label: "Operations Queue" },
  { to: "/map", hash: undefined, label: "Live Map" },
  { to: "/pricing", hash: undefined, label: "Pricing" },
] as const;

export function Navbar({ variant = "default" }: { variant?: "default" | "cinematic" }) {
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const cinematic = variant === "cinematic";

  const linkClass = (active: boolean) =>
    cn(
      "rounded-md px-3 py-1.5 text-xs font-semibold tracking-wide transition-colors",
      cinematic
        ? cn("text-slate-300 hover:text-white", active && "bg-white/10 text-white")
        : cn(
            "text-muted-foreground hover:text-foreground",
            active && "bg-secondary text-foreground",
          ),
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur-md transition-colors",
        cinematic
          ? "border-b border-white/10 bg-slate-950/85"
          : "border-b border-border bg-background/95",
      )}
    >
      <div className="page-container flex items-center justify-between py-3">
        {/* Logo */}
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <span
            className={cn(
              "grid h-8 w-8 shrink-0 place-items-center rounded-lg text-white shadow-sm",
              cinematic ? "bg-blue-600 ring-1 ring-blue-400/30" : "bg-primary",
            )}
          >
            <FiEye className="h-4 w-4" aria-hidden />
          </span>
          <span
            className={cn(
              "truncate font-display text-base font-bold tracking-tight",
              cinematic ? "text-white" : "text-foreground",
            )}
          >
            Civic<span className="text-blue-400">Eye</span>
            <span className="ml-2 rounded bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-mono font-medium text-blue-300 border border-blue-500/20 hidden sm:inline">
              OPERATIONS
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {mainNavLinks.map((l) => (
            <Link key={l.label} to={l.to} hash={l.hash} className={linkClass(pathname === l.to)}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex shrink-0 items-center gap-2.5">
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle dark mode"
            className={cn(
              "grid h-8 w-8 place-items-center rounded-lg border transition-colors",
              cinematic
                ? "border-white/15 text-slate-300 hover:bg-white/10 hover:text-white"
                : "border-border text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            {dark ? <FiSun className="h-3.5 w-3.5" /> : <FiMoon className="h-3.5 w-3.5" />}
          </button>

          <Link
            to="/login"
            className={cn(
              "hidden rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors sm:block",
              cinematic
                ? "border-white/15 text-slate-200 hover:bg-white/10 hover:text-white"
                : "border-border text-foreground hover:bg-secondary",
            )}
          >
            Sign in
          </Link>

          <Link
            to="/start"
            className={cn(
              "hidden items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold shadow-sm transition-all sm:flex",
              cinematic
                ? "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-900/40"
                : "bg-primary text-primary-foreground hover:bg-primary/90",
            )}
          >
            <span>Start a pilot</span>
            <FiArrowRight className="h-3.5 w-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
            className={cn(
              "grid h-8 w-8 place-items-center rounded-lg border lg:hidden",
              cinematic ? "border-white/15 text-white" : "border-border",
            )}
          >
            {open ? <FiX className="h-4 w-4" /> : <FiMenu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {open && (
        <nav
          id="mobile-nav"
          className={cn(
            "page-container flex flex-col border-t py-3 lg:hidden space-y-1.5",
            cinematic ? "border-white/10 bg-slate-950 text-white" : "border-border bg-card",
          )}
          aria-label="Mobile navigation"
        >
          {mainNavLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              hash={l.hash}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-lg px-3 py-2 text-xs font-semibold",
                cinematic
                  ? pathname === l.to
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                  : pathname === l.to
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-lg px-3 py-2 text-xs font-semibold text-center border border-white/15",
                cinematic ? "text-white" : "text-foreground",
              )}
            >
              Staff sign in
            </Link>
            <Link
              to="/start"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-xs font-semibold text-center bg-blue-600 text-white"
            >
              Start an organization pilot →
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
