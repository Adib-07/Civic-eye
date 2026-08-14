import { Link, useRouterState } from "@tanstack/react-router";
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

export function Navbar({ variant = "default" }: { variant?: "default" | "cinematic" }) {
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const cinematic = variant === "cinematic";

  const linkClass = (active: boolean) =>
    cn(
      "rounded-md px-3 py-2 text-sm font-medium transition-colors",
      cinematic
        ? cn("text-white/65 hover:text-white", active && "bg-white/10 text-white")
        : cn(
            "text-muted-foreground hover:text-foreground",
            active && "bg-secondary text-foreground",
          ),
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur-sm",
        cinematic
          ? "border-b border-white/10 bg-[#07111F]/85"
          : "border-b border-border bg-background/95",
      )}
    >
      <div className="page-container flex items-center justify-between py-3">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <span
            className={cn(
              "grid h-8 w-8 shrink-0 place-items-center rounded-md text-primary-foreground",
              cinematic ? "bg-[#2563EB]" : "bg-primary",
            )}
          >
            <FiEye className="h-4 w-4" aria-hidden />
          </span>
          <span
            className={cn(
              "truncate font-display text-base font-semibold tracking-tight",
              cinematic && "text-white",
            )}
          >
            Civic<span className={cinematic ? "text-[#4F8CFF]" : "text-primary"}>Eye</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
          {citizenLinks.map((l) => (
            <Link key={l.to} to={l.to} className={linkClass(pathname === l.to)}>
              {l.label}
            </Link>
          ))}
          <span
            className={cn("mx-2 h-4 w-px", cinematic ? "bg-white/15" : "bg-border")}
            aria-hidden
          />
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
            className={cn(
              "grid h-8 w-8 place-items-center rounded-md border transition-colors",
              cinematic
                ? "border-white/15 text-white/70 hover:bg-white/10 hover:text-white"
                : "border-border text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            {dark ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
          </button>
          <Link
            to="/login"
            className={cn(
              "hidden rounded-md border px-3 py-1.5 text-sm font-medium transition-colors sm:block",
              cinematic
                ? "border-white/15 text-white/80 hover:bg-white/10 hover:text-white"
                : "border-border text-foreground hover:bg-secondary",
            )}
          >
            Staff sign in
          </Link>
          <Link
            to="/report"
            className={cn(
              "hidden rounded-md px-3 py-1.5 text-sm font-medium transition-colors md:block",
              cinematic
                ? "bg-[#2563EB] text-white hover:bg-[#1D5FE9]"
                : "bg-primary text-primary-foreground hover:bg-primary/90",
            )}
          >
            Report issue
          </Link>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
            className={cn(
              "grid h-8 w-8 place-items-center rounded-md border lg:hidden",
              cinematic ? "border-white/15 text-white" : "border-border",
            )}
          >
            {open ? <FiX className="h-4 w-4" /> : <FiMenu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className={cn(
            "page-container flex flex-col border-t py-2 lg:hidden",
            cinematic ? "border-white/10 bg-[#07111F]" : "border-border",
          )}
          aria-label="Mobile navigation"
        >
          <p className={cn("px-3 py-1.5 section-label", cinematic && "text-white/50")}>Citizens</p>
          {citizenLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-md px-3 py-2.5 text-sm font-medium",
                cinematic
                  ? pathname === l.to
                    ? "bg-white/10 text-white"
                    : "text-white/65 hover:bg-white/10 hover:text-white"
                  : pathname === l.to
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
          <p className={cn("mt-2 px-3 py-1.5 section-label", cinematic && "text-white/50")}>
            Organization staff
          </p>
          {staffLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-md px-3 py-2.5 text-sm font-medium",
                cinematic
                  ? "text-white/65 hover:bg-white/10 hover:text-white"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className={cn(
              "mt-2 rounded-md px-3 py-2.5 text-sm font-medium",
              cinematic ? "text-white" : "text-foreground",
            )}
          >
            Staff sign in
          </Link>
          <Link
            to="/report"
            onClick={() => setOpen(false)}
            className={cn(
              "mt-1 rounded-md px-3 py-2.5 text-sm font-medium",
              cinematic ? "bg-[#2563EB] text-white" : "bg-primary text-primary-foreground",
            )}
          >
            Report an issue
          </Link>
        </nav>
      )}
    </header>
  );
}
