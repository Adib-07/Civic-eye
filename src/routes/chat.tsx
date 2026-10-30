import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FiAlertCircle,
  FiCopy,
  FiCornerDownLeft,
  FiMessageSquare,
  FiRefreshCw,
  FiSend,
  FiTrash2,
  FiUser,
} from "react-icons/fi";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { askCivicEyeAssistant, getAssistantStatus, type ChatRole } from "@/lib/ai";
import { useAuth, useOrganization, useReports } from "@/lib/hooks";
import { getDefaultOrganizationId, resolveOrganizationId } from "@/lib/env";
import { isStaffRole, roleLabel } from "@/lib/types";
import { cn } from "@/lib/utils";
import { requireSession } from "@/lib/route-guards";

export const Route = createFileRoute("/chat")({
  beforeLoad: async ({ location }) => {
    await requireSession(location);
  },
  head: () => ({
    meta: [
      { title: "AI Assistant — CivicEye" },
      {
        name: "description",
        content:
          "Ask the CivicEye assistant about reporting, triage, SLA, verification, and your organization workspace.",
      },
    ],
  }),
  component: ChatPage,
});

type UiMessage = {
  id: string;
  role: ChatRole;
  content: string;
  provider?: string;
  offline?: boolean;
};

const SUGGESTIONS = [
  "How do I report an issue?",
  "What is SLA tracking?",
  "How do I invite a teammate?",
  "How does verification work?",
  "What plan are we on?",
];

const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `m-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

function ChatPage() {
  const { profile, user } = useAuth();
  const { reports } = useReports();
  const orgId = resolveOrganizationId(profile) ?? getDefaultOrganizationId();
  const { data: org } = useOrganization(orgId);

  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [provider, setProvider] = useState<string | null>(null);
  const [providerConfigured, setProviderConfigured] = useState<boolean | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    getAssistantStatus()
      .then((status) => {
        setProvider(status.provider);
        setProviderConfigured(status.configured);
      })
      .catch(() => {
        setProvider("CivicEye knowledge base");
        setProviderConfigured(false);
      });
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  const context = useMemo(() => {
    const open = reports.filter(
      (r) => r.status === "Pending" || r.status === "In Progress" || r.status === "Reopened",
    ).length;
    const counts = reports.reduce<Record<string, number>>((acc, r) => {
      acc[r.category] = (acc[r.category] ?? 0) + 1;
      return acc;
    }, {});

    return {
      fullName: profile?.fullName ?? profile?.email ?? null,
      role: roleLabel(profile?.role ?? "citizen"),
      organizationName: org?.name ?? null,
      openIssues: open,
      pendingIssues: reports.filter((r) => r.status === "Pending").length,
      inProgressIssues: reports.filter((r) => r.status === "In Progress").length,
      resolvedIssues: reports.filter((r) => r.status === "Resolved").length,
      slaBreached: reports.filter((r) => r.slaBreached).length,
      topCategories: Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([name]) => name),
    };
  }, [reports, profile, org?.name]);

  const send = async (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text || pending) return;

    const userMessage: UiMessage = { id: uid(), role: "user", content: text };
    const history = messages
      .filter((m) => m.content.trim().length > 0)
      .map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setPending(true);

    try {
      const result = await askCivicEyeAssistant({
        data: { message: text, history, context },
      });
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "assistant",
          content: result.reply,
          provider: result.provider,
          offline: result.offline,
        },
      ]);
      if (result.offline) setProvider(result.provider);
    } catch {
      // A failed server function must never take the page down.
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "assistant",
          content:
            "The AI assistant is temporarily unavailable right now. Please try again in a moment — the rest of CivicEye is unaffected.",
          provider: "CivicEye",
        },
      ]);
    } finally {
      setPending(false);
      inputRef.current?.focus();
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void send();
    }
  };

  const copyAnswer = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Could not copy the answer");
    }
  };

  const isStaff = isStaffRole(profile?.role);

  return (
    <AppShell
      title="AI Assistant"
      subtitle={
        org?.name
          ? `Grounded in your ${org.name} workspace`
          : "Answers about reporting, triage, SLA and verification"
      }
      requireAuth
    >
      <div className="flex h-[calc(100vh-13rem)] min-h-[520px] flex-col overflow-hidden rounded-2xl border border-border bg-card">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <FiMessageSquare className="h-4.5 w-4.5" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">CivicEye Assistant</p>
              <p className="truncate text-xs text-muted-foreground">
                {providerConfigured === null
                  ? "Checking availability…"
                  : providerConfigured
                    ? `Powered by ${provider}`
                    : "Running on the CivicEye knowledge base"}
              </p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              type="button"
              onClick={() => setMessages([])}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <FiTrash2 className="h-3.5 w-3.5" aria-hidden />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
          {messages.length === 0 ? (
            <div className="mx-auto flex h-full max-w-xl flex-col items-center justify-center text-center">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
                <FiMessageSquare className="h-6 w-6" aria-hidden />
              </span>
              <h2 className="mt-4 text-lg font-bold">Ask anything about CivicEye</h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {isStaff
                  ? "I can explain triage, SLA rules and verification, and I can read your live workspace numbers."
                  : "I can explain how to report an issue, track it on the map, and verify a resolution."}
              </p>
              <div className="mt-6 flex w-full flex-col gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void send(s)}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-secondary"
                  >
                    <span>{s}</span>
                    <FiCornerDownLeft className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto flex max-w-3xl flex-col gap-4">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn("flex gap-3", message.role === "user" && "flex-row-reverse")}
                  >
                    <span
                      className={cn(
                        "grid h-8 w-8 shrink-0 place-items-center rounded-lg",
                        message.role === "user"
                          ? "bg-secondary text-muted-foreground"
                          : "bg-primary/10 text-primary",
                      )}
                      aria-hidden
                    >
                      {message.role === "user" ? (
                        <FiUser className="h-4 w-4" />
                      ) : (
                        <FiMessageSquare className="h-4 w-4" />
                      )}
                    </span>

                    <div
                      className={cn(
                        "min-w-0 max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[75%]",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "border border-border bg-secondary/60 text-foreground",
                      )}
                    >
                      <p className="whitespace-pre-wrap break-words">{message.content}</p>

                      {message.role === "assistant" && (
                        <div className="mt-2.5 flex items-center gap-2 border-t border-border/60 pt-2">
                          {message.provider && (
                            <span className="truncate text-[11px] font-medium text-muted-foreground">
                              {message.offline ? "CivicEye knowledge base" : message.provider}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => void copyAnswer(message.content)}
                            aria-label="Copy answer to clipboard"
                            className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-foreground"
                          >
                            <FiCopy className="h-3 w-3" aria-hidden /> Copy
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {pending && (
                <div className="flex gap-3">
                  <span
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"
                    aria-hidden
                  >
                    <FiMessageSquare className="h-4 w-4" />
                  </span>
                  <div
                    className="flex items-center gap-1.5 rounded-2xl border border-border bg-secondary/60 px-4 py-3"
                    role="status"
                    aria-live="polite"
                  >
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
                    <span className="sr-only">The assistant is thinking…</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Composer */}
        <div className="border-t border-border p-3 sm:p-4">
          <div className="flex items-end gap-2">
            <label htmlFor="chat-input" className="sr-only">
              Message the CivicEye assistant
            </label>
            <textarea
              id="chat-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={1}
              maxLength={2000}
              placeholder="Ask about reporting, SLA, verification, your team…"
              disabled={pending}
              className="max-h-40 min-h-[44px] flex-1 resize-none rounded-xl border border-border bg-background px-3.5 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => void send()}
              disabled={pending || input.trim().length === 0}
              className="btn-primary h-11 shrink-0 px-4 disabled:opacity-50"
              aria-label="Send message"
            >
              {pending ? (
                <FiRefreshCw className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <FiSend className="h-4 w-4" aria-hidden />
              )}
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>

          <p className="mt-2 flex items-start gap-1.5 text-[11px] leading-relaxed text-muted-foreground">
            <FiAlertCircle className="mt-0.5 h-3 w-3 shrink-0" aria-hidden />
            <span>
              Press Enter to send, Shift + Enter for a new line. Answers are generated by AI and can
              be wrong — verify anything important against the issue record.
              {user ? ` Signed in as ${profile?.fullName ?? user.email}.` : null}
            </span>
          </p>
        </div>
      </div>
    </AppShell>
  );
}
