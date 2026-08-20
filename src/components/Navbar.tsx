import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { FiMenu, FiX, FiMoon, FiSun, FiEye, FiArrowRight } from "react-icons/fi";
import { useTheme } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const marketingNavLinks = [
  { to: "/for-organizations", hash: undefined, label: "Product" },
  { to: "/for-organizations", hash: "solutions", label: "Solutions" },
  { to: "/for-organizations", hash: "workflow", label: "How It Works" },
  { to: "/pricing", hash: undefined, label: "Pricing" },
  { to: "/security", hash: undefined, label: "Security" },
] as const;

export function Navbar({ variant = "default" }: { variant?: "default" | "cinematic" }) {
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const cinematic = variant === "cinematic";

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass = (active: boolean, hasHash?: boolean) =>
    cn(
      "rounded-md px-3 py-1.5 text-[13px] font-medium tracking-wide transition-colors",
      cinematic
        ? cn("text-slate-300/80 hover:text-white", active && !hasHash && "bg-white/10 text-white")
        : cn(
            "text-muted-foreground hover:text-foreground",
            active && !hasHash && "bg-secondary text-foreground",
          ),
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur-md transition-colors",
        cinematic
          ? "border-b border-white/10 bg-slate-900/90"
          : "border-b border-border bg-background/95",
      )}
    >
      <div className="page-container flex items-center justify-between py-2.5">
        <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label="CivicEye home">
          <span
            className={cn(
              "grid h-8 w-8 shrink-0 place-items-center rounded-full text-white shadow-sm",
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
            Civic<span className="text-blue-500">Eye</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {marketingNavLinks.map((l) => (
            <Link
              key={`${l.to}-${l.hash ?? ""}`}
              to={l.to}
              hash={l.hash}
              className={linkClass(pathname === l.to, !!l.hash)}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
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
              "hidden rounded-lg border px-3 py-1.5 text-[13px] font-medium transition-colors sm:block",
              cinematic
                ? "border-white/15 text-slate-200 hover:bg-white/10 hover:text-white"
                : "border-border text-foreground hover:bg-secondary",
            )}
          >
            Sign In
          </Link>

          <Link
            to="/book-demo"
            className={cn(
              "hidden items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-semibold shadow-sm transition-all sm:flex",
              cinematic
                ? "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-900/40"
                : "bg-primary text-primary-foreground hover:bg-primary/90",
            )}
          >
            <span>Book a Demo</span>
            <FiArrowRight className="h-3.5 w-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(
              "grid h-8 w-8 place-items-center rounded-lg border lg:hidden",
              cinematic ? "border-white/15 text-white" : "border-border",
            )}
          >
            {open ? <FiX className="h-4 w-4" /> : <FiMenu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 top-[53px] z-40 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-200",
            open ? "opacity-100" : "opacity-0",
            cinematic ? "bg-black/60" : "bg-black/40",
          )}
          onClick={closeMenu}
        />

        <nav
          id="mobile-nav"
          className={cn(
            "absolute right-0 top-0 flex h-full w-72 flex-col overflow-y-auto border-l transition-all duration-200 ease-out",
            open ? "translate-x-0" : "translate-x-full",
            cinematic
              ? "border-white/10 bg-slate-950 text-white"
              : "border-border bg-card text-foreground",
          )}
          aria-label="Mobile navigation"
        >
          <div className="space-y-1 p-4">
            {marketingNavLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                hash={l.hash}
                onClick={closeMenu}
                className={cn(
                  "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
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
          </div>
          <div
            className={cn(
              "mt-auto flex flex-col gap-2 border-t p-4",
              cinematic ? "border-white/10" : "border-border",
            )}
          >
            <Link
              to="/login"
              onClick={closeMenu}
              className={cn(
                "rounded-lg px-3 py-2.5 text-center text-sm font-medium border transition-colors",
                cinematic
                  ? "border-white/15 text-white hover:bg-white/10"
                  : "border-border text-foreground hover:bg-secondary",
              )}
            >
              Sign In
            </Link>
            <Link
              to="/book-demo"
              onClick={closeMenu}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              <span>Book a Demo</span>
              <FiArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
