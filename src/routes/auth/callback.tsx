import { useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { toast } from "sonner";

import { Loader } from "@/components/EmptyState";
import { getSupabase } from "@/lib/supabase";
import { ensureAuthInitialized } from "@/lib/auth-store";
import { POST_LOGIN_PATH, sanitizeRedirect } from "@/lib/route-guards";

export const Route = createFileRoute("/auth/callback")({
  head: () => ({
    meta: [{ title: "Completing sign in — CivicEye" }],
  }),
  component: AuthCallback,
});

/**
 * PKCE / email-confirmation callback.
 *
 * The Supabase client is configured with `detectSessionInUrl: false` so this
 * route is the single place that exchanges the code, reports failures, and
 * decides where the user lands. Exchange runs exactly once even under React
 * StrictMode double-effects.
 */
function AuthCallback() {
  const navigate = useNavigate();
  const started = useRef(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const run = async () => {
      const sb = getSupabase();
      if (!sb) {
        setError("Supabase is not configured on this deployment.");
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const providerError = params.get("error");
      const description = params.get("error_description");
      const nextPath = sanitizeRedirect(params.get("next"));

      if (providerError) {
        setError(description || `Authentication failed: ${providerError}`);
        return;
      }

      if (code) {
        const { data, error: exchangeError } = await sb.auth.exchangeCodeForSession(code);
        if (exchangeError) {
          setError(
            "We could not complete your sign in. The link may have expired — request a new one and try again.",
          );
          return;
        }
        if (!data.session) {
          setError("No session was returned. Please request a new sign-in link.");
          return;
        }
      }

      // No code: a hash-fragment session (implicit flow) may already be present.
      await ensureAuthInitialized();
      const {
        data: { session },
      } = await sb.auth.getSession();

      if (!session) {
        setError("This sign-in link is no longer valid. Request a new one and try again.");
        return;
      }

      toast.success("Signed in");
      await navigate({ to: nextPath ?? POST_LOGIN_PATH, replace: true });
    };

    void run();
  }, [navigate]);

  if (error) {
    return (
      <main className="hero-bg grid min-h-screen place-items-center p-4">
        <div className="card w-full max-w-md p-8 text-center animate-scale-in">
          <div className="icon-wrapper-xl mx-auto mb-5 border-destructive/25 bg-destructive/10 text-destructive">
            <FiAlertCircle className="h-6 w-6" aria-hidden />
          </div>
          <h1 className="headline-2">Sign in failed</h1>
          <p className="body-sm mt-3 text-muted-foreground">{error}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a href="/login" className="btn-primary px-6 py-3">
              Back to sign in
            </a>
            <a href="/" className="btn-secondary px-6 py-3">
              Go home
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="hero-bg grid min-h-screen place-items-center p-4">
      <div className="card w-full max-w-md p-8 text-center">
        <div className="icon-wrapper-xl icon-wrapper-primary mx-auto mb-5">
          <FiCheckCircle className="h-6 w-6" aria-hidden />
        </div>
        <h1 className="headline-2">Completing sign in</h1>
        <div className="mt-6">
          <Loader label="Verifying your session" />
        </div>
      </div>
    </main>
  );
}
