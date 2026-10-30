import { getSupabase, requireSupabase } from "./supabase";
import type { AppNotification } from "./types";

type NotificationRow = {
  id: string;
  subject: string | null;
  body: string | null;
  channel: string;
  read_at: string | null;
  created_at: string;
  report_id: string | null;
};

/**
 * Notifications for the signed-in user.
 *
 * RLS restricts this to `user_id = auth.uid()` (or org staff reading their own
 * org feed). No organization id is accepted from the client.
 */
export async function fetchNotifications(limit = 50): Promise<AppNotification[]> {
  const sb = getSupabase();
  if (!sb) return [];

  const { data, error } = await sb
    .from("notifications")
    .select("id, subject, body, channel, read_at, created_at, payload")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return (data ?? []).map((row) => {
    const r = row as NotificationRow & { payload?: Record<string, unknown> | null };
    const reportId = r.payload?.report_id;
    return {
      id: r.id,
      subject: r.subject,
      body: r.body,
      channel: r.channel,
      readAt: r.read_at,
      createdAt: r.created_at,
      reportId: typeof reportId === "string" ? reportId : null,
    };
  });
}

export async function markNotificationRead(id: string): Promise<void> {
  const sb = requireSupabase();
  const { error } = await sb
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function markAllNotificationsRead(): Promise<void> {
  const sb = requireSupabase();
  const { error } = await sb
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .is("read_at", null);
  if (error) throw new Error(error.message);
}

export async function fetchUnreadCount(): Promise<number> {
  const sb = getSupabase();
  if (!sb) return 0;

  const { count, error } = await sb
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .is("read_at", null);

  if (error) return 0;
  return count ?? 0;
}
