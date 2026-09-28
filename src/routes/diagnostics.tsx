import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  FiActivity,
  FiAlertCircle,
  FiCheckCircle,
  FiCopy,
  FiRefreshCw,
  FiTool,
} from "react-icons/fi";

import { Loader } from "@/components/EmptyState";
import { runAuthDiagnostics, type DiagnosticLevel, type DiagnosticResult } from "@/lib/diagnostics";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/diagnostics")({
  head: () => ({
    meta: [
      { title: "Auth diagnostics — CivicEye" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DiagnosticsPage,
});

const ICON: Record<DiagnosticLevel, typeof FiCheckCircle> = {
  pass: FiCheckCircle,
  warn: FiAlertCircle,
  fail: FiAlertCircle,
};

const TONE: Record<DiagnosticLevel, string> = {
  pass: "border-success/30 bg-success/5 text-success",
  warn: "border-warning/30 bg-warning/5 text-warning",
  fail: "border-destructive/40 bg-destructive/5 text-destructive",
};

function DiagnosticsPage() {
  const [results, setResults] = useState<DiagnosticResult[] | null>(null);
  const [running, setRunning] = useState(false);

  const run = async () => {
    setRunning(true);
    setResults(null);
    try {
      setResults(await runAuthDiagnostics());
    } finally {
      setRunning(false);
    }
  };

  const copyReport = async () => {
    const text = [
      "CivicEye auth diagnostics",
      new Date().toISOString(),
      "",
      ...(results ?? []).map(
        (r) =>
          `[${r.level.toUpperCase()}] ${r.label}\n  ${r.detail}${r.fix ? `\n  FIX: ${r.fix}` : ""}`,
      ),
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* clipboard may be blocked */
    }
  };

  const failures = (results ?? []).filter((r) => r.level === "fail");

  return (
    <main className="hero-bg min-h-screen bg-background px-4 py-12">
      <div className="mx-auto w-[min(760px,94vw)]">
        <Link to="/" className="mb-8 inline-flex items-center gap-2.5" aria-label="CivicEye home">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
            <FiTool className="h-4.5 w-4.5" aria-hidden />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight">
            Civic<span className="text-primary">Eye</span>
          </span>
        </Link>

        <h1 className="font-display text-2xl font-extrabold sm:text-3xl">Auth diagnostics</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Runs entirely in your browser against this exact deployment. It checks configuration,
          connectivity, the database schema, and performs a real sign-in with a throwaway account.
          No password you type is ever sent or stored.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => void run()}
            disabled={running}
            className="btn-primary inline-flex items-center gap-2 disabled:opacity-60"
          >
            {running ? (
              <>
                <FiRefreshCw className="h-4 w-4 animate-spin" aria-hidden /> Running…
              </>
            ) : (
              <>
                <FiActivity className="h-4 w-4" aria-hidden /> Run diagnostics
              </>
            )}
          </button>
          {results && (
            <button type="button" onClick={() => void copyReport()} className="btn-secondary gap-2">
              <FiCopy className="h-4 w-4" aria-hidden /> Copy report
            </button>
          )}
        </div>

        <div className="mt-6">
          {running ? (
            <Loader label="Testing each auth layer" />
          ) : !results ? (
            <div className="card p-6 text-sm text-muted-foreground">
              Press <strong className="text-foreground">Run diagnostics</strong> to test.
            </div>
          ) : (
            <div className="space-y-3">
              {failures.length > 0 && (
                <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
                  <p className="text-sm font-bold text-destructive">
                    {failures.length} check{failures.length === 1 ? "" : "s"} failed
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    The fix is shown under each failing check. Copy this report and include it if
                    you ask for help.
                  </p>
                </div>
              )}

              {results.map((result) => {
                const Icon = ICON[result.level];
                return (
                  <div key={result.id} className={cn("card p-5", TONE[result.level])}>
                    <div className="flex items-start gap-3">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-foreground">{result.label}</p>
                        <p className="mt-1 break-words text-sm text-muted-foreground">
                          {result.detail}
                        </p>
                        {result.fix && (
                          <p className="mt-2 rounded-lg border border-border bg-background p-3 text-sm text-foreground">
                            <strong className="mr-1.5">Fix:</strong>
                            {result.fix}
                          </p>
                        )}
                        {result.raw !== undefined && result.raw !== null && (
                          <details className="mt-2">
                            <summary className="cursor-pointer text-xs font-semibold text-muted-foreground hover:text-foreground">
                              Raw provider response
                            </summary>
                            <pre className="mt-2 max-h-40 overflow-auto rounded-lg border border-border bg-background p-3 text-[11px] leading-relaxed text-muted-foreground">
                              {JSON.stringify(result.raw, null, 2)}
                            </pre>
                          </details>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="card mt-8 p-5">
          <p className="text-sm font-bold">If everything passes but sign-in still fails</p>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            <li>· The wrong password, or a different email than you think.</li>
            <li>
              · Email confirmation is on and the account is unconfirmed — this blocks sign-in even
              when the password is right. Supabase &gt; Authentication &gt; Providers &gt; Email
              &gt; Confirm email.
            </li>
            <li>
              · You changed an env var but did not redeploy. VITE_ variables are inlined at build
              time.
            </li>
          </ul>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
