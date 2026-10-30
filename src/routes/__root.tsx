import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useMemo, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { Toaster } from "../components/ui/sonner";
import { AuthGate } from "../components/AuthGate";
import { HelpWidget } from "../components/HelpWidget";
import { useAuth } from "../lib/hooks";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  const { session, loading } = useAuth();

  return (
    <div className="hero-bg flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-lg text-center">
        <p className="font-display text-7xl font-extrabold text-muted-foreground/40 sm:text-8xl">
          404
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
          We could not find that page
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
          The link may be out of date, or the page may have moved. Everything in CivicEye is one
          click away from here.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/dashboard"
            className="btn-primary inline-flex items-center justify-center gap-2 px-5 py-3"
          >
            Go to dashboard
          </Link>
          <Link to="/" className="btn-secondary inline-flex justify-center px-5 py-3">
            Back to home
          </Link>
        </div>

        {!loading && (
          <div className="mt-10 text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Popular destinations
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {(session
                ? ([
                    { to: "/issues", label: "Civic issues" },
                    { to: "/map", label: "Live map" },
                    { to: "/chat", label: "AI Assistant" },
                    { to: "/reports", label: "Operations queue" },
                  ] as const)
                : ([
                    { to: "/how-it-works", label: "How it works" },
                    { to: "/pricing", label: "Pricing" },
                    { to: "/book-demo", label: "Book a demo" },
                    { to: "/login", label: "Sign in" },
                  ] as const)
              ).map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="flex items-center justify-between gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                  >
                    {item.label}
                    <span aria-hidden className="text-muted-foreground">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  const err = useMemo(
    () =>
      error instanceof Error
        ? error
        : new Error(typeof error === "string" ? error : "Unknown error"),
    [error],
  );
  console.error(err);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(err, { boundary: "tanstack_root_error_component" });
  }, [err]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CivicEye — Issue Management & Verified Resolution Platform" },
      {
        name: "description",
        content:
          "CivicEye helps organizations receive, assign, track, resolve and verify operational issues with SLA visibility and evidence-backed workflows.",
      },
      {
        property: "og:title",
        content: "CivicEye — Issue Management & Verified Resolution Platform",
      },
      {
        property: "og:description",
        content:
          "One platform for facility and operations teams to manage the complete issue lifecycle — from report to verified resolution.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "CivicEye" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "CivicEye — Issue Management & Verified Resolution Platform",
      },
      {
        name: "twitter:description",
        content:
          "Helps organizations receive, assign, track, resolve and verify operational issues with SLA visibility.",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to main content
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <AuthGate>
        <Outlet />
      </AuthGate>
      <Toaster position="bottom-right" closeButton />
      <HelpWidget />
    </QueryClientProvider>
  );
}
