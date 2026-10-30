import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FiBell, FiCheck, FiChevronRight, FiInbox } from "react-icons/fi";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { EmptyState, Loader, QueryError } from "@/components/EmptyState";
import { useAuth, useNotifications } from "@/lib/hooks";
import { markAllNotificationsRead, markNotificationRead } from "@/lib/notifications";
import { requireSession } from "@/lib/route-guards";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
  beforeLoad: async ({ location }) => {
    await requireSession(location);
  },
  head: () => ({
    meta: [{ title: "Notifications — CivicEye" }],
  }),
  component: NotificationsPage,
});

function NotificationsPage() {
  const { profile } = useAuth();
  const { notifications, loading, error, refetch } = useNotifications();
  const qc = useQueryClient();

  const markRead = useMutation({
    mutationFn: markNotificationRead,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (e) =>
      toast.error(e instanceof Error ? e.message : "Could not update the notification."),
  });

  const markAll = useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("All notifications marked as read");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Could not update notifications."),
  });

  const unread = notifications.filter((n) => !n.readAt).length;

  return (
    <AppShell
      title="Notifications"
      subtitle={
        (profile?.fullName ?? profile?.email)
          ? `${unread} unread for ${profile.fullName ?? profile.email}`
          : `${unread} unread`
      }
      requireAuth
    >
      {loading ? (
        <Loader label="Loading notifications" />
      ) : error ? (
        <QueryError
          title="Could not load notifications"
          message={error instanceof Error ? error.message : "Please try again."}
          onRetry={() => void refetch()}
        />
      ) : notifications.length === 0 ? (
        <EmptyState
          icon={FiInbox}
          title="You are all caught up"
          description="Status changes, assignments and SLA warnings for your organization will show up here."
          action={
            <Link to="/issues" className="btn-primary inline-flex gap-2">
              Browse civic issues <FiChevronRight className="h-4 w-4" aria-hidden />
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => markAll.mutate()}
              disabled={unread === 0 || markAll.isPending}
              className="btn-secondary gap-2 text-xs disabled:opacity-50"
            >
              <FiCheck className="h-4 w-4" aria-hidden />
              {markAll.isPending ? "Updating…" : "Mark all as read"}
            </button>
          </div>

          <ul className="space-y-3">
            {notifications.map((notification) => {
              const isUnread = !notification.readAt;
              const body = (
                <div
                  className={cn(
                    "surface-panel flex items-start gap-3 p-4 transition-shadow",
                    isUnread && "border-primary/30 bg-primary/[0.04]",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg",
                      isUnread
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary text-muted-foreground",
                    )}
                    aria-hidden
                  >
                    <FiBell className="h-4 w-4" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p
                        className={cn(
                          "truncate text-sm",
                          isUnread ? "font-bold text-foreground" : "font-semibold text-foreground",
                        )}
                      >
                        {notification.subject ?? "CivicEye update"}
                      </p>
                      {isUnread && (
                        <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                          New
                        </span>
                      )}
                    </div>
                    {notification.body && (
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {notification.body}
                      </p>
                    )}
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {formatRelative(notification.createdAt)}
                      {isUnread ? " · unread" : ""}
                    </p>
                  </div>

                  {isUnread && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        markRead.mutate(notification.id);
                      }}
                      className="shrink-0 self-center rounded-lg border border-border px-2.5 py-1 text-[11px] font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground"
                    >
                      Mark read
                    </button>
                  )}
                </div>
              );

              return (
                <li key={notification.id}>
                  {notification.reportId ? (
                    <Link
                      to="/reports"
                      search={{ submitted: notification.reportId }}
                      onClick={() => {
                        if (isUnread) markRead.mutate(notification.id);
                      }}
                      className="block"
                    >
                      {body}
                    </Link>
                  ) : (
                    body
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </AppShell>
  );
}

function formatRelative(value: string): string {
  const then = new Date(value).getTime();
  if (Number.isNaN(then)) return value;
  const diff = Date.now() - then;
  const minutes = Math.round(diff / 60_000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  return new Date(value).toLocaleDateString();
}
