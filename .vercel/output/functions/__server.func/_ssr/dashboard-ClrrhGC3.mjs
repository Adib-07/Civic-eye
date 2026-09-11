import { o as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { L as FiPlusCircle, Y as FiUserCheck, b as FiFileText, i as FiArrowRight, l as FiCheck, n as FiAlertTriangle, t as FiAlertCircle, u as FiCheckCircle } from "../_libs/react-icons.mjs";
import { c as resolveOrganizationId, t as getDefaultOrganizationId } from "./supabase-ET64mUQq.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as useOrganizationSubscription, C as subscriptionStatusLabel, M as useReports, T as useCountUp, c as countByCategory, d as getPlan, h as isToday, i as STATUSES, j as useReportMutations, k as useOrganization, l as daysUntilTrialEnd, p as isSlaBreached, s as canVerifyResolution, w as useAuth } from "./hooks-DzLqLLnN.mjs";
import { i as QueryError, n as EmptyState, r as Loader, t as AppShell } from "./AppShell-soJkEpQC.mjs";
import { n as VerifyDialog, t as ResolveIssueDialog } from "./VerifyDialog-CJ5bLmI4.mjs";
import { n as StatusBadge, t as SlaBadge } from "./StatusBadge-DKXcbmsb.mjs";
import { n as Pie, t as Bar } from "../_libs/react-chartjs-2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-ClrrhGC3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StatCard({ icon: Icon, label, value, suffix = "", decimals = 0, accent = "text-muted-foreground" }) {
	const factor = 10 ** decimals;
	const count = useCountUp(Math.round(value * factor)) / factor;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-panel p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("grid h-8 w-8 shrink-0 place-items-center rounded-md border border-border bg-secondary", accent),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 font-display text-3xl font-semibold tracking-tight tabular-nums",
			children: [count.toLocaleString("en-IN", {
				minimumFractionDigits: decimals,
				maximumFractionDigits: decimals
			}), suffix]
		})]
	});
}
function SubscriptionBanner({ subscription }) {
	const plan = getPlan(subscription.planTier);
	const trialDays = daysUntilTrialEnd(subscription);
	if (subscription.isActive && subscription.status === "pilot" && trialDays !== null && trialDays <= 14) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5 flex flex-col gap-3 rounded-2xl border border-warning/30 bg-warning/10 p-4 sm:flex-row sm:items-center sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAlertCircle, {
				className: "mt-0.5 h-5 w-5 shrink-0 text-warning",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm font-bold",
				children: [
					"Pilot ending in ",
					trialDays,
					" day",
					trialDays === 1 ? "" : "s"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Upgrade to keep staff workflows, assignments, and reporting active for your organization."
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/pricing",
			className: "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground",
			children: ["View plans ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, {
				className: "h-4 w-4",
				"aria-hidden": true
			})]
		})]
	});
	if (!subscription.isActive) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5 flex flex-col gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 sm:flex-row sm:items-center sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAlertCircle, {
				className: "mt-0.5 h-5 w-5 shrink-0 text-destructive",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-bold",
				children: subscriptionStatusLabel(subscription)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Staff actions and new issue intake may be restricted. Choose a plan to restore full access."
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/start",
			search: { plan: "community" },
			className: "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground",
			children: ["Upgrade ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, {
				className: "h-4 w-4",
				"aria-hidden": true
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-secondary/50 px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-bold text-foreground",
					children: plan.name
				}),
				" ·",
				" ",
				subscriptionStatusLabel(subscription),
				plan.limits.maxReportsPerMonth !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					" · Up to ",
					plan.limits.maxReportsPerMonth.toLocaleString(),
					" issues/month"
				] })
			]
		}), subscription.status === "pilot" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/pricing",
			className: "text-xs font-bold text-primary hover:underline",
			children: "Compare plans"
		})]
	});
}
var PALETTE = [
	"oklch(0.546 0.215 263)",
	"oklch(0.6 0.14 155)",
	"oklch(0.72 0.15 65)",
	"oklch(0.58 0.21 25)",
	"oklch(0.65 0.1 240)",
	"oklch(0.55 0.12 180)"
];
var STATUS_COLORS = [
	"oklch(0.72 0.15 65)",
	"oklch(0.546 0.215 263)",
	"oklch(0.65 0.1 240)",
	"oklch(0.6 0.14 155)",
	"oklch(0.55 0.02 258)"
];
function DashboardPage() {
	const { reports, loading, error, refetch, orgMissing, staffOrgMissing } = useReports();
	const { profile } = useAuth();
	const orgId = resolveOrganizationId(profile) ?? getDefaultOrganizationId();
	const { data: org } = useOrganization(orgId);
	const { data: subscription } = useOrganizationSubscription(orgId);
	const { update, verify, resolveWithEvidence } = useReportMutations();
	const [verifyTarget, setVerifyTarget] = (0, import_react.useState)(null);
	const [resolveTarget, setResolveTarget] = (0, import_react.useState)(null);
	const stats = (0, import_react.useMemo)(() => {
		const byCategory = countByCategory(reports);
		return {
			total: reports.length,
			pending: reports.filter((r) => r.status === "Pending").length,
			inProgress: reports.filter((r) => r.status === "In Progress").length,
			resolved: reports.filter((r) => r.status === "Resolved").length,
			verified: reports.filter((r) => r.status === "Verified").length,
			slaBreached: reports.filter((r) => r.slaBreached).length,
			unassigned: reports.filter((r) => !r.assignedTo && r.status === "Pending").length,
			assigned: reports.filter((r) => Boolean(r.assignedTo)).length,
			today: reports.filter((r) => isToday(r.createdAt)).length,
			byCategory,
			byStatus: STATUSES.map((s) => reports.filter((r) => r.status === s).length),
			awaitingVerification: reports.filter((r) => r.status === "Resolved"),
			openIssues: reports.filter((r) => r.status === "Pending" || r.status === "In Progress"),
			slaOverdue: reports.filter((r) => isSlaBreached(r) && r.status !== "Verified" && r.status !== "Closed"),
			recentlyClosed: reports.filter((r) => r.status === "Verified" || r.status === "Resolved").slice(0, 5),
			slaComplianceRate: reports.length > 0 ? Math.round((reports.length - reports.filter((r) => isSlaBreached(r) && r.status !== "Verified" && r.status !== "Closed").length) / reports.length * 100) : 100
		};
	}, [reports]);
	const canVerify = canVerifyResolution(profile?.role);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Operations dashboard",
		subtitle: org?.name ?? "Live Operations & SLA Intelligence",
		requireAuth: true,
		requireStaff: true,
		children: [
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Loading organization data" }) : staffOrgMissing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryError, {
				title: "Staff profile not linked",
				message: "Your Supabase profile must have organization_id set to your organization's UUID before you can access the dashboard."
			}) : orgMissing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryError, {
				title: "Organization not configured",
				message: "Set VITE_DEFAULT_ORGANIZATION_ID in your environment, or ensure your staff profile has an organization_id assigned."
			}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryError, {
				message: error instanceof Error ? error.message : "Failed to load dashboard data",
				onRetry: () => void refetch()
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5",
				children: [
					subscription ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubscriptionBanner, { subscription }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 rounded-2xl border border-warning/30 bg-warning/10 p-4 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-bold",
							children: "No subscription record found"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-muted-foreground",
							children: "Staff workflows may be restricted until a plan is activated for this organization."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								icon: FiFileText,
								label: "Open issues",
								value: stats.openIssues.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								icon: FiUserCheck,
								label: "Assigned",
								value: stats.assigned,
								accent: "text-primary",
								delay: .05
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								icon: FiAlertTriangle,
								label: "SLA overdue",
								value: stats.slaOverdue.length,
								accent: "text-destructive",
								delay: .1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								icon: FiCheckCircle,
								label: "SLA Compliance",
								value: stats.slaComplianceRate,
								suffix: "%",
								accent: "text-success",
								delay: .15
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "surface-panel p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
									children: "Pending intake"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-display text-3xl font-semibold tabular-nums",
									children: stats.pending
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "surface-panel p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
									children: "In progress"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-display text-3xl font-semibold tabular-nums",
									children: stats.inProgress
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "surface-panel p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
									children: "Reported today"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-display text-3xl font-semibold tabular-nums",
									children: stats.today
								})]
							})
						]
					}),
					(stats.slaOverdue.length > 0 || stats.unassigned > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-panel overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b border-border px-5 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "section-label",
									children: "Attention required"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "mt-1 flex items-center gap-2 text-sm font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAlertTriangle, {
										className: "text-destructive",
										"aria-hidden": true
									}), "Unassigned or SLA overdue"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: "Unassigned or past SLA — assign and update status to keep resolutions on track."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "divide-y divide-border",
							children: [...stats.slaOverdue, ...reports.filter((r) => !r.assignedTo && r.status === "Pending")].filter((r, i, arr) => arr.findIndex((x) => x.id === r.id) === i).slice(0, 6).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex flex-wrap items-center justify-between gap-3 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/reports",
									search: { overdue: true },
									className: "min-w-0 flex-1 hover:text-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-semibold",
										children: r.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: r.location
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlaBadge, { report: r }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status })]
								})]
							}, r.id))
						})]
					}),
					stats.total === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						title: "No data to analyse yet",
						description: "Submit your first report and the charts will populate automatically.",
						action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/report",
							className: "bg-brand inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-primary-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPlusCircle, {}), " New report"]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-5 lg:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "surface-panel p-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-semibold",
									children: "Reports by category"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 h-72",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
										data: {
											labels: Object.keys(stats.byCategory),
											datasets: [{
												data: Object.values(stats.byCategory),
												backgroundColor: PALETTE,
												borderWidth: 0
											}]
										},
										options: {
											maintainAspectRatio: false,
											plugins: { legend: {
												position: "bottom",
												labels: { boxWidth: 12 }
											} }
										}
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "surface-panel p-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-semibold",
									children: "Reports by status"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 h-72",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										data: {
											labels: [...STATUSES],
											datasets: [{
												label: "Reports",
												data: stats.byStatus,
												backgroundColor: STATUS_COLORS,
												borderRadius: 10
											}]
										},
										options: {
											maintainAspectRatio: false,
											plugins: { legend: { display: false } },
											scales: { y: {
												beginAtZero: true,
												ticks: { precision: 0 }
											} }
										}
									})
								})]
							})]
						}),
						stats.awaitingVerification.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface-panel overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-b border-border px-5 py-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "flex items-center gap-2 text-sm font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiUserCheck, { className: "text-primary" }), " Resolution verification queue"]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "divide-y divide-border",
								children: stats.awaitingVerification.slice(0, 5).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-3 p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate font-semibold",
											children: r.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: r.location
										})]
									}), canVerify && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setVerifyTarget(r),
										className: "rounded-xl bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground",
										children: "Verify"
									})]
								}, r.id))
							})]
						}),
						stats.recentlyClosed.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface-panel overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-b border-border px-5 py-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-semibold",
									children: "Recently resolved"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "divide-y divide-border",
								children: stats.recentlyClosed.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex flex-wrap items-center justify-between gap-3 p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate font-semibold",
											children: r.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: r.resolvedAt ? new Date(r.resolvedAt).toLocaleString() : new Date(r.updatedAt).toLocaleString()
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status })]
								}, r.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface-panel overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3 border-b border-border px-5 py-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-sm font-semibold",
										children: "Recent reports"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/reports",
										className: "text-xs font-medium text-primary hover:underline",
										children: "View all"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "hidden overflow-x-auto md:block",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
										className: "ops-table",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Title" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Assignee" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "SLA" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "text-right",
												children: "Action"
											})
										] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: reports.slice(0, 8).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "max-w-[200px] truncate font-medium",
												children: r.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "text-muted-foreground",
												children: r.assigneeName ?? "—"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlaBadge, { report: r }) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status }) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "text-right",
												children: r.status === "In Progress" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: () => setResolveTarget(r),
													className: "inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, {}), " Resolve"]
												}) : r.status === "Pending" && !r.assignedTo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: "/reports",
													className: "text-xs font-bold text-primary hover:underline",
													children: "Assign"
												}) : r.status === "Verified" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-bold text-success",
													children: "Verified"
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-muted-foreground",
													children: "—"
												})
											})
										] }, r.id)) })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "divide-y divide-border md:hidden",
									children: reports.slice(0, 8).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "space-y-2 p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-semibold leading-snug",
													children: r.title
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: r.assigneeName ? `Assigned: ${r.assigneeName}` : "Unassigned"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlaBadge, { report: r }), r.status === "In Progress" || r.status === "Reopened" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setResolveTarget(r),
													className: "rounded-xl border border-border px-3 py-1.5 text-xs font-bold",
													children: "Resolve"
												}) : r.status === "Pending" && !r.assignedTo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: "/reports",
													className: "text-xs font-bold text-primary",
													children: "Assign"
												}) : null]
											})
										]
									}, r.id))
								})
							]
						})
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResolveIssueDialog, {
				open: !!resolveTarget,
				report: resolveTarget,
				loading: resolveWithEvidence.isPending,
				onCancel: () => setResolveTarget(null),
				onSubmit: async (file, notes) => {
					if (!resolveTarget) return;
					try {
						await resolveWithEvidence.mutateAsync({
							reportId: resolveTarget.id,
							file,
							notes
						});
						toast.success("Resolution submitted successfully — pending reporter verification");
						setResolveTarget(null);
					} catch (e) {
						toast.error(e instanceof Error ? e.message : "Resolution submission failed");
					}
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifyDialog, {
				open: !!verifyTarget,
				title: verifyTarget?.title ?? "",
				loading: verify.isPending,
				onCancel: () => setVerifyTarget(null),
				onApprove: async (notes) => {
					if (!verifyTarget) return;
					try {
						await verify.mutateAsync({
							reportId: verifyTarget.id,
							approved: true,
							notes
						});
						toast.success("Resolution verified — status updated to VERIFIED");
						setVerifyTarget(null);
					} catch (e) {
						toast.error(e instanceof Error ? e.message : "Verification failed");
					}
				},
				onReject: async (notes) => {
					if (!verifyTarget) return;
					try {
						await verify.mutateAsync({
							reportId: verifyTarget.id,
							approved: false,
							notes
						});
						toast.info("Reported as still unresolved — status updated to REOPENED");
						setVerifyTarget(null);
					} catch (e) {
						toast.error(e instanceof Error ? e.message : "Verification failed");
					}
				}
			})
		]
	});
}
//#endregion
export { DashboardPage as component };
