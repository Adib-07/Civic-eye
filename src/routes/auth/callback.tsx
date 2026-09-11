import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { getSupabase } from "@/lib/supabase";

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallback,
});

function AuthCallback() {
  const navigate = useNavigate();
  const sb = getSupabase();

  useEffect(() => {
    if (!sb) {
      toast.error("Supabase is not configured.");
      navigate({ to: "/" });
      return;
    }

    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");

    if (error) {
      toast.error(`Auth callback error: ${error}`);
      navigate({ to: "/" });
      return;
    }

    if (code) {
      sb.auth.exchangeCodeForSession(code).then(
        ({ data, error }) => {
          if (error) {
            toast.error(`Session exchange failed: ${error.message}`);
            navigate({ to: "/" });
            return;
          }
          if (data?.session?.user) {
            navigate({ to: "/dashboard" });
          } else {
            toast.error("No session obtained");
            navigate({ to: "/" });
          }
        }
      );
    } else {
      toast.error("No auth code found in callback URL");
      navigate({ to: "/" });
    }
  }, [sb, navigate]);

  return null;
}