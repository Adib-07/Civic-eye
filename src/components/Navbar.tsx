import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { FiMenu, FiX, FiMoon, FiSun, FiEye, FiArrowRight } from "react-icons/fi";
import { useTheme } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const marketingNavLinks = [
  { to: "/for-organizations", hash: undefined, label: "Product" },
  { to: "/solutions", hash: undefined, label: "Solutions" },
  { to: "/how-it-works", hash: undefined, label: "How It Works" },
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
      "rounded-lg px-3.5 py-2 text-[13px] font-semibold tracking-wide transition-all duration-150",
      cinematic
        ? cn(
            "text-slate-300/80 hover:text-white hover:bg-white/5",
            active && !hasHash && "bg-white/10 text-white",
          )
        : cn(
            "text-muted-foreground hover:text-foreground hover:bg-secondary/80",
            active && !hasHash && "bg-secondary text-foreground",
          ),
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur-xl transition-all duration-200",
        cinematic
          ? "border-b border-white/[0.08] bg-slate-950/85 shadow-lg shadow-black/10"
          : "border-b border-border bg-background/95 shadow-sm",
      )}
    >
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label="CivicEye home">
          <span
            className={cn(
              "grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white shadow-sm",
              cinematic ? "bg-hero-accent ring-1 ring-hero-accent/30" : "bg-primary",
            )}
          >
            <FiEye className="h-4.5 w-4.5" aria-hidden />
          </span>
          <span
            className={cn(
              "font-display text-lg font-extrabold tracking-tight",
              cinematic ? "text-white" : "text-foreground",
            )}
          >
            Civic<span className="text-primary">Eye</span>
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

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle dark mode"
            className={cn(
              "grid h-9 w-9 place-items-center rounded-lg border transition-all duration-150",
              cinematic
                ? "border-white/15 text-slate-300 hover:bg-white/10 hover:text-white"
                : "border-border text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            {dark ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
          </button>

          <Link
            to="/login"
            className={cn(
              "hidden rounded-lg border px-4 py-2 text-sm font-semibold transition-all duration-150 sm:block",
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
              "hidden items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold shadow-sm transition-all duration-150 sm:flex",
              cinematic
                ? "bg-hero-accent text-white hover:bg-hero-accent-strong shadow-hero-accent/30"
                : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
            )}
          >
            <span>Book a Demo</span>
            <FiArrowRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(
              "grid h-9 w-9 place-items-center rounded-lg border lg:hidden transition-all duration-150",
              cinematic
                ? "border-white/15 text-white hover:bg-white/10"
                : "border-border hover:bg-secondary",
            )}
          >
            {open ? <FiX className="h-4.5 w-4.5" /> : <FiMenu className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 top-[64px] z-40 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-200",
            open ? "opacity-100" : "opacity-0",
            cinematic ? "bg-black/60 backdrop-blur-sm" : "bg-black/40 backdrop-blur-sm",
          )}
          onClick={closeMenu}
        />

        <nav
          id="mobile-nav"
          className={cn(
            "absolute right-0 top-0 flex h-full w-80 flex-col overflow-y-auto border-l transition-all duration-300 ease-out",
            open ? "translate-x-0" : "translate-x-full",
            cinematic
              ? "border-white/10 bg-slate-950 text-white shadow-2xl shadow-black/40"
              : "border-border bg-card text-foreground shadow-2xl",
          )}
          aria-label="Mobile navigation"
        >
          <div className="space-y-1 p-4 pt-6">
            {marketingNavLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                hash={l.hash}
                onClick={closeMenu}
                className={cn(
                  "block rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-150",
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
              "mt-auto flex flex-col gap-3 border-t p-4",
              cinematic ? "border-white/10" : "border-border",
            )}
          >
            <Link
              to="/login"
              onClick={closeMenu}
              className={cn(
                "rounded-xl px-4 py-3 text-center text-sm font-semibold border transition-all duration-150",
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
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-all duration-150 hover:bg-primary/90 shadow-sm"
            >
              <span>Book a Demo</span>
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
