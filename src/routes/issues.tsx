import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import {
  FiAlertCircle,
  FiChevronRight,
  FiFilter,
  FiMap,
  FiPlusCircle,
  FiSearch,
} from "react-icons/fi";

import { AppShell } from "@/components/AppShell";
import { EmptyState, Loader, QueryError } from "@/components/EmptyState";
import { ReportImage } from "@/components/ReportImage";
import { SlaBadge } from "@/components/SlaBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { useAuth, useOrganization, useReports } from "@/lib/hooks";
import { getDefaultOrganizationId, resolveOrganizationId } from "@/lib/env";
import { canManageReports, CATEGORIES, STATUSES, type Report } from "@/lib/types";
import { isSlaBreached } from "@/lib/sla";
import { requireSession } from "@/lib/route-guards";
import { cn } from "@/lib/utils";

const issuesSearchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  status: z.string().optional(),
  assigned: z.enum(["all", "me", "unassigned"]).optional(),
});

export const Route = createFileRoute("/issues")({
  validateSearch: (search: Record<string, unknown>) =>
    issuesSearchSchema.parse({
      q: typeof search.q === "string" && search.q.trim() ? search.q.trim() : undefined,
      category: typeof search.category === "string" ? search.category : undefined,
      status: typeof search.status === "string" ? search.status : undefined,
      assigned:
        search.assigned === "me" || search.assigned === "unassigned" ? search.assigned : undefined,
    }),
  beforeLoad: async ({ location }) => {
    await requireSession(location);
  },
  head: () => ({
    meta: [
      { title: "Civic Issues — CivicEye" },
      {
        name: "description",
        content:
          "Every civic issue in your organization — filter by status, category and ownership.",
      },
    ],
  }),
  component: IssuesPage,
});

function IssuesPage() {
  const { profile } = useAuth();
  const { reports, loading, error, refetch, orgMissing, staffOrgMissing } = useReports();
  const orgId = resolveOrganizationId(profile) ?? getDefaultOrganizationId();
  const { data: org } = useOrganization(orgId);
  const navigate = useNavigate();

  const search = Route.useSearch();
  const [query, setQuery] = useState(search.q ?? "");
  const [selected, setSelected] = useState<Report | null>(null);

  const isStaff = canManageReports(profile?.role);

  // Keep the input in sync when the URL changes (e.g. clearing filters).
  useEffect(() => {
    setQuery(search.q ?? "");
  }, [search.q]);

  const applySearch = (
    next: Partial<{
      q: string | undefined;
      category: string | undefined;
      status: string | undefined;
      assigned: "me" | "unassigned" | undefined;
    }>,
  ) => {
    const trimmed = (next.q ?? "").trim();
    void navigate({
      to: "/issues",
      search: {
        q: trimmed || undefined,
        category: next.category,
        status: next.status,
        assigned: next.assigned,
      },
      replace: true,
    });
  };

  const clearFilters = () => {
    setQuery("");
    void navigate({ to: "/issues", search: {}, replace: true });
  };

  const filtered = useMemo(() => {
    const q = (search.q ?? "").toLowerCase();
    return reports
      .filter((r) => {
        if (search.category && search.category !== "All" && r.category !== search.category) {
          return false;
        }
        if (search.status && search.status !== "All" && r.status !== search.status) return false;
        if (search.assigned === "me" && r.assignedTo !== profile?.id) return false;
        if (search.assigned === "unassigned" && r.assignedTo) return false;
        if (!q) return true;
        return (
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  }, [reports, search, profile?.id]);

  const openCount = reports.filter(
    (r) => r.status === "Pending" || r.status === "In Progress" || r.status === "Reopened",
  ).length;

  return (
    <AppShell
      title="Civic issues"
      subtitle={org?.name ? `${org.name} · ${openCount} open` : `${openCount} open`}
      requireAuth
    >
      {loading ? (
        <Loader label="Loading civic issues" />
      ) : staffOrgMissing || orgMissing ? (
        <QueryError
          title="No organization in scope"
          message="Your account is not attached to an organization, so there is no issue feed to show. Ask your administrator for an invitation."
        />
      ) : error ? (
        <QueryError
          message={error instanceof Error ? error.message : "Could not load issues"}
          onRetry={() => void refetch()}
        />
      ) : (
        <div className="space-y-5">
          {/* Filters */}
          <div className="surface-panel space-y-4 p-5">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <FiSearch
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <label htmlFor="issues-search" className="sr-only">
                  Search issues
                </label>
                <input
                  id="issues-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") applySearch({ q: query });
                  }}
                  onBlur={() => {
                    if ((search.q ?? "") !== query.trim()) applySearch({ q: query });
                  }}
                  placeholder="Search title, description or location…"
                  className="input-lg pl-10"
                />
              </div>
              <Link to="/map" className="btn-secondary justify-center gap-2 sm:w-auto">
                <FiMap className="h-4 w-4" aria-hidden /> Open map
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <FiFilter className="h-3.5 w-3.5" aria-hidden /> Filters
              </span>

              <FilterChip
                label="All categories"
                value={search.category}
                options={["All", ...CATEGORIES]}
                onChange={(v) => applySearch({ category: v === "All" ? undefined : v })}
              />
              <FilterChip
                label="All statuses"
                value={search.status}
                options={["All", ...STATUSES]}
                onChange={(v) => applySearch({ status: v === "All" ? undefined : v })}
              />
              {isStaff && (
                <FilterChip
                  label="Everyone"
                  value={search.assigned}
                  options={["all", "me", "unassigned"]}
                  display={{ all: "Everyone", me: "Assigned to me", unassigned: "Unassigned" }}
                  onChange={(v) =>
                    applySearch({ assigned: v === "all" ? undefined : (v as "me" | "unassigned") })
                  }
                />
              )}
            </div>
          </div>

          {/* List */}
          {filtered.length === 0 ? (
            <EmptyState
              icon={FiAlertCircle}
              title={
                reports.length === 0 ? "No issues reported yet" : "No issues match these filters"
              }
              description={
                reports.length === 0
                  ? "Once someone reports an issue it will appear here with its status, owner and SLA deadline."
                  : "Try clearing a filter or searching for a different location."
              }
              action={
                reports.length === 0 ? (
                  <Link to="/report" className="btn-primary inline-flex gap-2">
                    <FiPlusCircle className="h-4 w-4" aria-hidden /> Report the first issue
                  </Link>
                ) : (
                  <button type="button" onClick={clearFilters} className="btn-secondary">
                    Clear filters
                  </button>
                )
              }
            />
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                Showing <strong className="text-foreground">{filtered.length}</strong> of{" "}
                {reports.length} issues
              </p>

              <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((report) => (
                  <li key={report.id}>
                    <button
                      type="button"
                      onClick={() => setSelected(report)}
                      className="surface-panel flex h-full w-full flex-col overflow-hidden text-left transition-shadow hover:shadow-md"
                    >
                      <ReportImage
                        src={report.image}
                        alt={`Evidence for ${report.title}`}
                        className="h-36 w-full"
                        placeholderClassName="h-36 w-full"
                      />
                      <div className="flex flex-1 flex-col p-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <StatusBadge status={report.status} />
                          <span className="rounded-md border border-border bg-secondary px-2 py-0.5 text-[11px] font-semibold">
                            {report.category}
                          </span>
                          {isSlaBreached(report) && report.status !== "Verified" && (
                            <SlaBadge report={report} />
                          )}
                        </div>
                        <h3 className="mt-2.5 line-clamp-2 text-sm font-semibold">
                          {report.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                          {report.description}
                        </p>
                        <p className="mt-2 truncate text-xs text-muted-foreground">
                          {report.location}
                        </p>
                        <div className="mt-auto flex items-center justify-between gap-2 pt-3 text-[11px] text-muted-foreground">
                          <span>
                            {report.assigneeName
                              ? `Assigned to ${report.assigneeName}`
                              : "Unassigned"}
                          </span>
                          <FiChevronRight className="h-3.5 w-3.5" aria-hidden />
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      <IssueDetailDialog report={selected} onClose={() => setSelected(null)} canManage={isStaff} />
    </AppShell>
  );
}

function FilterChip({
  label,
  value,
  options,
  display,
  onChange,
}: {
  label: string;
  value?: string;
  options: readonly string[];
  display?: Record<string, string>;
  onChange: (value: string) => void;
}) {
  const active = Boolean(value && value !== "All" && value !== "all");
  const [open, setOpen] = useState(false);
  const current = value && value !== "All" && value !== "all" ? value : null;
  const text = current ? (display?.[current] ?? current) : label;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors",
          active
            ? "border-primary/40 bg-primary/10 text-primary"
            : "border-border text-muted-foreground hover:bg-secondary hover:text-foreground",
        )}
      >
        {text}
        <span aria-hidden>▾</span>
      </button>
      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
            aria-label="Close filter menu"
          />
          <div className="absolute left-0 z-20 mt-1 min-w-[10rem] overflow-hidden rounded-xl border border-border bg-card py-1 shadow-lg">
            {options.map((option) => {
              const isCurrent = (value ?? "All") === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onChange(option);
                  }}
                  className={cn(
                    "block w-full px-3 py-2 text-left text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                    isCurrent && "bg-secondary text-foreground",
                  )}
                >
                  {display?.[option] ?? option}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function IssueDetailDialog({
  report,
  onClose,
  canManage,
}: {
  report: Report | null;
  onClose: () => void;
  canManage: boolean;
}) {
  if (!report) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] grid place-items-center bg-background/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={report.title}
      onClick={onClose}
    >
      <div
        className="card max-h-[88vh] w-full max-w-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <ReportImage
          src={report.image}
          alt={`Evidence for ${report.title}`}
          className="h-52 w-full"
          placeholderClassName="h-52 w-full"
        />
        <div className="space-y-4 p-6">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={report.status} />
            <span className="rounded-md border border-border bg-secondary px-2 py-0.5 text-[11px] font-semibold">
              {report.category}
            </span>
            <SlaBadge report={report} />
          </div>

          <div>
            <h2 className="font-display text-xl font-bold">{report.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {report.description}
            </p>
          </div>

          <dl className="grid gap-4 border-t border-border pt-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Location
              </dt>
              <dd className="mt-1 text-sm">{report.location}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Assigned to
              </dt>
              <dd className="mt-1 text-sm">{report.assigneeName ?? "Unassigned"}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Reported
              </dt>
              <dd className="mt-1 text-sm">{formatDate(report.createdAt)}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                SLA deadline
              </dt>
              <dd className="mt-1 text-sm">
                {report.slaDueAt ? formatDate(report.slaDueAt) : "No SLA policy"}
              </dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-2 border-t border-border pt-4">
            {canManage ? (
              <Link
                to="/reports"
                search={{ assigned: "me" }}
                className="btn-primary justify-center gap-2"
                onClick={onClose}
              >
                Work this in Operations
              </Link>
            ) : (
              <Link to="/reports" className="btn-secondary justify-center" onClick={onClose}>
                View in Operations
              </Link>
            )}
            <Link to="/map" className="btn-secondary justify-center" onClick={onClose}>
              Show on map
            </Link>
            <button type="button" onClick={onClose} className="btn-secondary justify-center">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDate(value: string): string {
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}
