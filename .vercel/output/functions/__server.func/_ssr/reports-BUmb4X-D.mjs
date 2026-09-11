import { o as __toESM } from "../_runtime.mjs";
import { i as isValidCoordinate } from "./map-config-DNeTFeeJ.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { $ as FiX, B as FiSearch, K as FiTrash2, L as FiPlusCircle, M as FiMapPin, X as FiUserPlus, Y as FiUserCheck, _ as FiEdit2, l as FiCheck, m as FiClipboard, n as FiAlertTriangle, u as FiCheckCircle, v as FiEye, z as FiSave } from "../_libs/react-icons.mjs";
import { t as ReportImage } from "./ReportImage-CuX88nI4.mjs";
import { t as getDefaultOrganizationId } from "./supabase-ET64mUQq.mjs";
import { g as Link, v as useSearch } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as useIssueEvidence, M as useReports, N as useStaffMembers, O as useIssueStatusHistory, a as canManageReports, f as isAwaitingCitizenVerification, g as roleLabel, i as STATUSES, j as useReportMutations, o as canVerifyReport, p as isSlaBreached, t as CATEGORIES, w as useAuth } from "./hooks-DzLqLLnN.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { i as QueryError, n as EmptyState, r as Loader, t as AppShell } from "./AppShell-soJkEpQC.mjs";
import { n as VerifyDialog, t as ResolveIssueDialog } from "./VerifyDialog-CJ5bLmI4.mjs";
import { n as StatusBadge, t as SlaBadge } from "./StatusBadge-DKXcbmsb.mjs";
import { t as OnboardingBanner } from "./OnboardingBanner-xf1m4EX0.mjs";
import { t as ImageModal } from "./ImageModal-CHZ2-3eF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-BUmb4X-D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AssignDialog({ open, staff, loading, category, onAssign, onCancel }) {
	const sortedStaff = (0, import_react.useMemo)(() => {
		if (!category) return staff;
		const isSuggested = (m) => Array.isArray(m.categories) && m.categories.includes(category);
		return [...staff].sort((a, b) => Number(isSuggested(b)) - Number(isSuggested(a)));
	}, [staff, category]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-[1000] grid place-items-center bg-background/70 p-4 backdrop-blur-sm",
		onClick: onCancel,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .95,
				y: 12
			},
			animate: {
				scale: 1,
				y: 0
			},
			exit: {
				scale: .95,
				opacity: 0
			},
			onClick: (e) => e.stopPropagation(),
			className: "glass w-full max-w-md rounded-2xl p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiUserCheck, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold",
						children: "Assign issue"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Select a staff member or admin"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-5 max-h-64 space-y-2 overflow-y-auto",
					children: [staff.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground",
						children: "No staff members found for this organization."
					}), sortedStaff.map((member) => {
						const suggested = !!category && Array.isArray(member.categories) && member.categories.includes(category);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: loading,
							onClick: () => onAssign(member.id),
							className: "flex w-full items-center justify-between rounded-xl border border-border px-4 py-3 text-left text-sm transition-colors hover:bg-secondary disabled:opacity-60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2 font-semibold",
								children: [member.fullName ?? member.email, suggested && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary",
									children: "Suggested"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: roleLabel(member.role)
							})]
						}) }, member.id);
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onCancel,
						className: "rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary",
						children: "Cancel"
					})
				})
			]
		})
	}) });
}
function ConfirmDialog({ open, title, description, confirmLabel = "Delete", onConfirm, onCancel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-[1000] grid place-items-center bg-background/70 p-4 backdrop-blur-sm",
		onClick: onCancel,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .94,
				y: 12
			},
			animate: {
				scale: 1,
				y: 0
			},
			exit: {
				scale: .94,
				opacity: 0
			},
			onClick: (e) => e.stopPropagation(),
			className: "glass w-full max-w-md rounded-2xl p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-destructive/15 text-destructive",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAlertTriangle, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: description
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex justify-end gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onCancel,
					className: "rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary",
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onConfirm,
					className: "rounded-xl bg-destructive px-4 py-2 text-sm font-bold text-destructive-foreground hover:opacity-90",
					children: confirmLabel
				})]
			})]
		})
	}) });
}
var STEPS = [
	"Reported",
	"Assigned",
	"In progress",
	"Resolved",
	"Verified"
];
function activeStepIndex(status, assigned) {
	if (status === "Verified" || status === "Closed") return 4;
	if (status === "Resolved") return 3;
	if (status === "In Progress" || status === "Reopened") return 2;
	if (status === "Pending" && assigned) return 1;
	return 0;
}
function IssueWorkflowBar({ status, assigned, className }) {
	const active = activeStepIndex(status, assigned);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: cn("flex flex-wrap gap-1 sm:gap-0", className),
		"aria-label": "Issue workflow progress",
		children: STEPS.map((label, i) => {
			const done = i < active;
			const current = i === active;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: cn("flex min-w-0 flex-1 items-center gap-1 text-[10px] font-semibold uppercase tracking-wide sm:text-[11px]", i < STEPS.length - 1 && "sm:pr-1"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px]", done && "border-success/40 bg-success/15 text-success", current && "border-primary bg-primary/15 text-primary", !done && !current && "border-border bg-secondary text-muted-foreground"),
					"aria-current": current ? "step" : void 0,
					children: i + 1
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("hidden truncate sm:inline", current ? "text-foreground" : "text-muted-foreground"),
					children: label
				})]
			}, label);
		})
	});
}
var LocationPicker = (0, import_react.lazy)(() => import("./LocationPicker-BgF18Zad.mjs"));
function MapUnavailable({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid place-items-center rounded-xl border border-border bg-secondary px-4 text-center", className),
		role: "img",
		"aria-label": "Location map unavailable",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-2 py-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMapPin, {
				className: "h-6 w-6 text-muted-foreground",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold text-muted-foreground",
				children: "Location coordinates unavailable"
			})]
		})
	});
}
function ReportMiniMap({ lat, lng, className }) {
	const resolvedClass = className ?? "h-40 w-full rounded-xl overflow-hidden border border-border";
	if (!isValidCoordinate(lat, lng)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapUnavailable, { className: resolvedClass });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn(resolvedClass, "animate-pulse bg-secondary"),
			"aria-hidden": true
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocationPicker, {
			lat,
			lng,
			interactive: false,
			className: resolvedClass
		})
	});
}
var PAGE_SIZE = 12;
function ReportsPage() {
	const { assigned: assignedSearch, overdue: overdueSearch, submitted: submittedId } = useSearch({ from: "/reports" });
	const { reports, loading, error, refetch, isConfigured, configError, orgMissing, staffOrgMissing } = useReports();
	const { profile, user } = useAuth();
	const orgId = profile?.organizationId ?? getDefaultOrganizationId();
	const { data: staff = [] } = useStaffMembers(isConfigured ? orgId : null);
	const { update, remove, assign, verify, resolveWithEvidence } = useReportMutations();
	const isStaff = canManageReports(profile?.role);
	const [query, setQuery] = (0, import_react.useState)("");
	const [cat, setCat] = (0, import_react.useState)("All");
	const [status, setStatus] = (0, import_react.useState)("All");
	const [assignment, setAssignment] = (0, import_react.useState)(assignedSearch === "me" ? "me" : "all");
	const [overdueOnly, setOverdueOnly] = (0, import_react.useState)(Boolean(overdueSearch));
	const [sort, setSort] = (0, import_react.useState)("newest");
	const [toDelete, setToDelete] = (0, import_react.useState)(null);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [assignTarget, setAssignTarget] = (0, import_react.useState)(null);
	const [resolveTarget, setResolveTarget] = (0, import_react.useState)(null);
	const [verifyTarget, setVerifyTarget] = (0, import_react.useState)(null);
	const [detail, setDetail] = (0, import_react.useState)(null);
	const [zoom, setZoom] = (0, import_react.useState)(null);
	const [visibleCount, setVisibleCount] = (0, import_react.useState)(PAGE_SIZE);
	const filtered = (0, import_react.useMemo)(() => {
		return [...reports.filter((r) => {
			const q = query.trim().toLowerCase();
			const matchQ = !q || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || r.location.toLowerCase().includes(q);
			const matchAssignment = assignment === "all" ? true : assignment === "me" ? r.assignedTo === user?.id : assignment === "assigned" ? Boolean(r.assignedTo) : !r.assignedTo;
			const matchOverdue = !overdueOnly || isSlaBreached(r) && r.status !== "Verified" && r.status !== "Closed";
			return matchQ && matchAssignment && matchOverdue && (cat === "All" || r.category === cat) && (status === "All" || r.status === status);
		})].sort((a, b) => {
			const ta = new Date(a.createdAt).getTime();
			const tb = new Date(b.createdAt).getTime();
			return sort === "newest" ? tb - ta : ta - tb;
		});
	}, [
		reports,
		query,
		cat,
		status,
		assignment,
		overdueOnly,
		sort,
		user?.id
	]);
	(0, import_react.useEffect)(() => {
		if (assignedSearch === "me") setAssignment("me");
		if (overdueSearch) setOverdueOnly(true);
	}, [assignedSearch, overdueSearch]);
	const liveDetail = (0, import_react.useMemo)(() => detail ? reports.find((r) => r.id === detail.id) ?? detail : null, [detail, reports]);
	const { data: statusHistory = [], isLoading: historyLoading } = useIssueStatusHistory(liveDetail?.id);
	const visibleReports = filtered.slice(0, visibleCount);
	(0, import_react.useEffect)(() => {
		setVisibleCount(PAGE_SIZE);
	}, [
		query,
		cat,
		status,
		assignment,
		overdueOnly,
		sort
	]);
	const field = "rounded-md border border-border bg-card px-3 py-2 text-sm outline-none transition-colors focus:border-primary";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: assignedSearch === "me" ? "Assigned to me" : overdueSearch ? "SLA / attention" : "All reports",
		subtitle: !isConfigured && configError ? "Supabase configuration required" : `${reports.length} issues in your organization`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OnboardingBanner, {}),
			submittedId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmissionConfirmation, {
				reportId: submittedId,
				report: reports.find((r) => r.id === submittedId) ?? null,
				loading
			}),
			!isConfigured && configError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-bold text-destructive",
					children: "Supabase not configured"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-muted-foreground",
					children: configError
				})]
			}),
			orgMissing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-bold",
					children: "Organization not configured"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-muted-foreground",
					children: [
						"Set ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "font-mono text-xs",
							children: "VITE_DEFAULT_ORGANIZATION_ID"
						}),
						" in your environment to load organization reports."
					]
				})]
			}),
			reports.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 grid gap-3 grid-cols-1 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setOverdueOnly(true),
						className: "surface-panel p-3.5 text-left border-l-4 border-l-destructive hover:border-destructive/80 transition-all cursor-pointer",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] font-mono font-semibold uppercase tracking-wider text-destructive flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SLA Overdue" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-destructive animate-ping" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-2xl font-bold tabular-nums text-foreground",
								children: reports.filter((r) => isSlaBreached(r) && r.status !== "Verified" && r.status !== "Closed").length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground mt-0.5",
								children: "Click to view overdue queue"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							setAssignment("unassigned");
							setStatus("Pending");
							setOverdueOnly(false);
						},
						className: "surface-panel p-3.5 text-left border-l-4 border-l-amber-500 hover:border-amber-400 transition-all cursor-pointer",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-500",
								children: "Unassigned Intake"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-2xl font-bold tabular-nums text-foreground",
								children: reports.filter((r) => !r.assignedTo && r.status === "Pending").length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground mt-0.5",
								children: "Awaiting staff assignment"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							setStatus("Resolved");
							setOverdueOnly(false);
						},
						className: "surface-panel p-3.5 text-left border-l-4 border-l-emerald-500 hover:border-emerald-400 transition-all cursor-pointer",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-500",
								children: "Awaiting Verification"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-2xl font-bold tabular-nums text-foreground",
								children: reports.filter((r) => r.status === "Resolved").length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground mt-0.5",
								children: "Staff resolved — ready for sign-off"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-panel space-y-3 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 rounded-md border border-border bg-background px-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSearch, { className: "h-4 w-4 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Search title, description, location, or reference ID",
						className: "w-full bg-transparent py-2 text-sm outline-none"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: cat,
							onChange: (e) => setCat(e.target.value),
							className: field,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "All",
								children: "All categories"
							}), CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c,
								children: c
							}, c))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: status,
							onChange: (e) => setStatus(e.target.value),
							className: field,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "All",
								children: "All statuses"
							}), STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s,
								children: s
							}, s))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: assignment,
							onChange: (e) => setAssignment(e.target.value),
							className: field,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "All assignments"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "me",
									children: "Assigned to me"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "assigned",
									children: "Assigned (anyone)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "unassigned",
									children: "Unassigned only"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: sort,
							onChange: (e) => setSort(e.target.value),
							className: field,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "newest",
								children: "Newest first"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "oldest",
								children: "Oldest first"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm xl:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: overdueOnly,
								onChange: (e) => setOverdueOnly(e.target.checked),
								className: "rounded border-border"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: "SLA overdue only"
							})]
						})
					]
				})]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Loading reports" }) : orgMissing || staffOrgMissing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryError, {
				title: staffOrgMissing ? "Staff profile not linked" : "Organization not configured",
				message: staffOrgMissing ? "Your Supabase profile must have organization_id set before you can view reports." : "Set VITE_DEFAULT_ORGANIZATION_ID in your .env file to connect to your Supabase organization."
			}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryError, {
				message: error instanceof Error ? error.message : "Failed to load reports",
				onRetry: () => void refetch()
			}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: reports.length ? "No matching reports" : "No reports yet",
					description: reports.length ? "Try clearing the search box or switching the filters." : "Be the first to report a civic issue in your neighbourhood.",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/report",
						className: "bg-brand inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-primary-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPlusCircle, {}), " New report"]
					})
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-center justify-between gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-muted-foreground",
					children: [
						"Showing",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-foreground",
							children: Math.min(visibleCount, filtered.length)
						}),
						" ",
						"of ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-foreground",
							children: filtered.length
						}),
						" matching",
						filtered.length !== reports.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							" ",
							"(",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground",
								children: reports.length
							}),
							" total)"
						] })
					]
				}), (assignment !== "all" || overdueOnly || cat !== "All" || status !== "All" || query) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setQuery("");
						setCat("All");
						setStatus("All");
						setAssignment("all");
						setOverdueOnly(false);
					},
					className: "text-xs font-medium text-primary hover:underline",
					children: "Clear filters"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 surface-panel overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden border-b border-border bg-secondary/80 md:grid md:grid-cols-[72px_minmax(0,1fr)_140px_120px_100px] md:gap-4 md:px-4 md:py-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "section-label",
							children: "Evidence"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "section-label",
							children: "Issue"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "section-label",
							children: "Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "section-label",
							children: "SLA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "section-label text-right",
							children: "Actions"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: visibleReports.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
					layout: true,
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					exit: { opacity: 0 },
					className: cn("border-b border-border transition-colors hover:bg-secondary/40", submittedId === r.id && "bg-success/5 ring-1 ring-inset ring-success/20"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden md:grid md:grid-cols-[72px_minmax(0,1fr)_140px_120px_100px] md:items-center md:gap-4 md:px-4 md:py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => r.image ? setZoom(r.image) : setDetail(r),
								className: "h-14 w-14 overflow-hidden rounded-md border border-border bg-secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportImage, {
									src: r.image,
									alt: r.title,
									className: "h-full w-full object-cover",
									placeholderClassName: "h-full w-full rounded-none"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setDetail(r),
										className: "truncate text-left text-sm font-semibold hover:text-primary",
										children: r.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-0.5 truncate text-xs text-muted-foreground",
										children: [
											"#",
											r.id.slice(0, 8).toUpperCase(),
											" · ",
											r.category,
											" ·",
											" ",
											new Date(r.createdAt).toLocaleDateString()
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 flex items-center gap-1 truncate text-xs text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMapPin, { className: "shrink-0" }),
											" ",
											r.location || `${r.lat.toFixed(4)}, ${r.lng.toFixed(4)}`
										]
									}),
									r.assigneeName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: ["Assigned: ", r.assigneeName]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlaBadge, { report: r }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setDetail(r),
									className: "rounded-md border border-border px-2 py-1 text-xs font-medium hover:bg-secondary",
									children: "View"
								}), isStaff && !r.assignedTo && r.status === "Pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setAssignTarget(r),
									className: "rounded-md border border-border px-2 py-1 text-xs font-medium hover:bg-secondary",
									children: "Assign"
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 md:hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => r.image ? setZoom(r.image) : setDetail(r),
									className: "h-16 w-16 shrink-0 overflow-hidden rounded-md border border-border",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportImage, {
										src: r.image,
										alt: r.title,
										className: "h-full w-full object-cover",
										placeholderClassName: "h-full w-full"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-start justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setDetail(r),
												className: "text-left text-sm font-semibold leading-snug",
												children: r.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 text-[11px] font-medium text-muted-foreground",
											children: [
												"#",
												r.id.slice(0, 8).toUpperCase(),
												" ·",
												" ",
												new Date(r.createdAt).toLocaleString()
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 line-clamp-2 text-xs text-muted-foreground",
											children: r.description
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 flex flex-wrap items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlaBadge, { report: r }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-md border border-border bg-secondary px-2 py-0.5 text-[11px] font-medium",
												children: r.category
											})]
										})
									]
								})]
							}),
							isStaff && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setDetail(r),
										className: "btn-secondary flex-1 py-2 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEye, {}), " Details"]
									}),
									!r.assignedTo && r.status === "Pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setAssignTarget(r),
										className: "btn-secondary flex-1 py-2 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiUserPlus, {}), " Assign"]
									}),
									(r.status === "In Progress" || r.status === "Reopened") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setResolveTarget(r),
										className: "btn-secondary flex-1 py-2 text-xs text-success",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, {}), " Resolve"]
									}),
									r.status === "Resolved" && canVerifyReport(profile?.role, r, user?.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setVerifyTarget(r),
										className: "btn-secondary flex-1 py-2 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheckCircle, {}), " Verify"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setEditing(r),
										className: "btn-secondary flex-1 py-2 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEdit2, {}), " Edit"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setToDelete(r),
										className: "btn-secondary flex-1 py-2 text-xs text-destructive",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, {}), " Delete"]
									})
								]
							}),
							!isStaff && canVerifyReport(profile?.role, r, user?.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setVerifyTarget(r),
									className: "btn-secondary w-full py-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheckCircle, {}), " Verify fix"]
								})
							})
						]
					})]
				}, r.id)) })]
			})] }),
			!loading && filtered.length > visibleCount && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setVisibleCount((n) => n + PAGE_SIZE),
					className: "rounded-xl border border-border bg-card px-6 py-2.5 text-sm font-bold hover:bg-secondary",
					children: [
						"Show more (",
						filtered.length - visibleCount,
						" remaining)"
					]
				})
			}),
			filtered.length > 0 && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-center text-xs text-muted-foreground",
				children: "Click a row to view full details, evidence, and status history."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: !!toDelete,
				title: "Delete this report?",
				description: `"${toDelete?.title ?? ""}" will be permanently removed.`,
				onCancel: () => setToDelete(null),
				onConfirm: async () => {
					if (!toDelete) return;
					try {
						await remove.mutateAsync(toDelete.id);
						toast.success("Report deleted");
					} catch (e) {
						toast.error(e instanceof Error ? e.message : "Delete failed");
					}
					setToDelete(null);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssignDialog, {
				open: !!assignTarget,
				staff,
				loading: assign.isPending,
				category: assignTarget?.category,
				onCancel: () => setAssignTarget(null),
				onAssign: async (staffId) => {
					if (!assignTarget) return;
					try {
						await assign.mutateAsync({
							reportId: assignTarget.id,
							assigneeId: staffId
						});
						toast.success("Issue assigned");
						setAssignTarget(null);
					} catch (e) {
						toast.error(e instanceof Error ? e.message : "Assignment failed");
					}
				}
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
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssueDetailDialog, {
				report: liveDetail,
				isStaff,
				isConfigured,
				canVerify: liveDetail ? canVerifyReport(profile?.role, liveDetail, user?.id) : false,
				onClose: () => setDetail(null),
				onAssign: () => {
					if (liveDetail) setAssignTarget(liveDetail);
					setDetail(null);
				},
				onEdit: () => {
					if (liveDetail) setEditing(liveDetail);
					setDetail(null);
				},
				onResolve: () => {
					if (liveDetail) setResolveTarget(liveDetail);
					setDetail(null);
				},
				onVerify: () => {
					if (liveDetail) setVerifyTarget(liveDetail);
					setDetail(null);
				},
				onZoomImage: setZoom,
				history: statusHistory,
				historyLoading
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditDialog, {
				report: editing,
				isConfigured,
				onSave: async (draft) => {
					try {
						await update.mutateAsync({
							id: draft.id,
							patch: {
								title: draft.title,
								description: draft.description,
								category: draft.category,
								location: draft.location,
								lat: draft.lat,
								lng: draft.lng,
								status: draft.status
							}
						});
						toast.success("Report updated");
					} catch (e) {
						toast.error(e instanceof Error ? e.message : "Update failed");
					}
				},
				onClose: () => setEditing(null)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageModal, {
				src: zoom,
				onClose: () => setZoom(null)
			})
		]
	});
}
function SubmissionConfirmation({ reportId, report, loading }) {
	const ref = reportId.slice(0, 8).toUpperCase();
	const copyRef = async () => {
		try {
			await navigator.clipboard.writeText(reportId);
			toast.success("Reference copied");
		} catch {
			toast.error("Could not copy reference");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-4 surface-panel border-success/30 bg-success/5 p-4 sm:p-5",
		role: "status",
		"aria-live": "polite",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 text-sm font-bold text-success",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheckCircle, { "aria-hidden": true }), " Report submitted successfully"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						"Your reference is ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono font-bold text-foreground",
							children: ["#", ref]
						}),
						report && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							" ",
							"— ",
							report.category,
							" · ",
							report.status
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: "Save this reference to track status. Your organization will review the report and update its progress."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => void copyRef(),
				className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-bold hover:bg-secondary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiClipboard, { "aria-hidden": true }), " Copy reference"]
			})]
		})
	});
}
function EditDialog({ report, isConfigured, onSave, onClose }) {
	const [draft, setDraft] = (0, import_react.useState)(report);
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setDraft(report);
	}, [report]);
	const field = "mt-1.5 w-full rounded-xl border border-border bg-card/60 px-3 py-2.5 text-sm outline-none focus:border-primary";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: report && draft && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		onClick: onClose,
		className: "fixed inset-0 z-[1000] grid place-items-center overflow-y-auto bg-background/70 p-4 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .95,
				y: 14
			},
			animate: {
				scale: 1,
				y: 0
			},
			exit: {
				scale: .95,
				opacity: 0
			},
			onClick: (e) => e.stopPropagation(),
			className: "glass my-8 w-full max-w-lg rounded-2xl p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold",
						children: "Edit report"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						"aria-label": "Close",
						className: "rounded-lg p-1 hover:bg-secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, {})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-muted-foreground",
								children: "Title"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: draft.title,
								onChange: (e) => setDraft({
									...draft,
									title: e.target.value
								}),
								className: field
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-muted-foreground",
								children: "Description"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 3,
								value: draft.description,
								onChange: (e) => setDraft({
									...draft,
									description: e.target.value
								}),
								className: field
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-muted-foreground",
										children: "Category"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: draft.category,
										onChange: (e) => setDraft({
											...draft,
											category: e.target.value
										}),
										className: field,
										children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: c,
											children: c
										}, c))
									})]
								}),
								isConfigured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-muted-foreground",
										children: "Status"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: draft.status,
										onChange: (e) => setDraft({
											...draft,
											status: e.target.value
										}),
										className: field,
										children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: s,
											children: s
										}, s))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-muted-foreground",
										children: "Location"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: draft.location,
										onChange: (e) => setDraft({
											...draft,
											location: e.target.value
										}),
										className: field
									})]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary",
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						disabled: saving,
						onClick: async () => {
							setSaving(true);
							await onSave(draft);
							setSaving(false);
							onClose();
						},
						className: "bg-brand inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-primary-foreground disabled:opacity-60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSave, {}), " Save changes"]
					})]
				})
			]
		})
	}) });
}
function IssueDetailDialog({ report, isStaff, isConfigured, canVerify, onClose, onAssign, onEdit, onResolve, onVerify, onZoomImage, history, historyLoading }) {
	const { data: evidences = [], isLoading: evidenceLoading } = useIssueEvidence(report?.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: report && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		onClick: onClose,
		className: "fixed inset-0 z-[1000] grid place-items-center overflow-y-auto bg-background/70 p-4 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .95,
				y: 14
			},
			animate: {
				scale: 1,
				y: 0
			},
			exit: {
				scale: .95,
				opacity: 0
			},
			onClick: (e) => e.stopPropagation(),
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "issue-detail-title",
			className: "glass my-8 w-full max-w-4xl rounded-2xl p-0 sm:p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border px-6 py-5 sm:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10px] font-bold uppercase tracking-wide text-muted-foreground",
									children: ["Issue #", report.id.slice(0, 8)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									id: "issue-detail-title",
									className: "mt-1 text-xl font-bold sm:text-2xl",
									children: report.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: report.status }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlaBadge, { report }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-secondary px-2.5 py-1 text-xs font-bold",
											children: report.category
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onClose,
							"aria-label": "Close",
							className: "rounded-lg p-2 hover:bg-secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, {})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssueWorkflowBar, {
						className: "mt-4 rounded-xl border border-border bg-secondary/40 p-3",
						status: report.status,
						assigned: Boolean(report.assignedTo)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [
							isStaff && !report.assignedTo && report.status === "Pending" && isConfigured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: onAssign,
								className: "btn-secondary text-sm",
								children: "Assign"
							}),
							isStaff && (report.status === "In Progress" || report.status === "Reopened") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: onResolve,
								className: "inline-flex items-center gap-1.5 rounded-xl border border-success/30 px-4 py-2 text-sm font-bold text-success hover:bg-success/5",
								children: "Resolve issue"
							}),
							canVerify && isAwaitingCitizenVerification(report.status) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: onVerify,
								className: "btn-primary px-4 py-2 text-sm",
								children: "Verify resolution"
							}),
							isStaff && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: onEdit,
								className: "btn-secondary text-sm",
								children: "Edit"
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-0 lg:grid-cols-[1fr_280px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-6 py-5 sm:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-xs font-bold uppercase tracking-wide text-muted-foreground",
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed",
							children: report.description
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-xs font-bold uppercase tracking-wide text-muted-foreground",
								children: "Evidence Comparison (Before & After)"
							}), evidenceLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Loading resolution evidence…"
							}) : evidences.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid gap-4 md:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border bg-card p-3.5 space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] font-bold uppercase tracking-wider text-amber-500",
												children: "1. Original Report"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-muted-foreground",
												children: new Date(report.createdAt).toLocaleDateString()
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportImage, {
											src: report.image,
											alt: report.title,
											onClick: report.image ? () => onZoomImage(report.image) : void 0,
											className: "h-40 w-full rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity",
											placeholderClassName: "h-40 w-full rounded-lg"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground line-clamp-2",
											children: report.description
										})
									]
								}), evidences.map((ev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3.5 space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[11px] font-bold uppercase tracking-wider text-emerald-500 flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheckCircle, {}), " 2. Staff Resolution"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-muted-foreground",
												children: new Date(ev.createdAt).toLocaleDateString()
											})]
										}),
										ev.publicUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportImage, {
											src: ev.publicUrl,
											alt: "Staff resolution evidence",
											onClick: () => onZoomImage(ev.publicUrl),
											className: "h-40 w-full rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity",
											placeholderClassName: "h-40 w-full rounded-lg"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-40 w-full rounded-lg bg-secondary grid place-items-center text-xs text-muted-foreground",
											children: "No resolution image"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs font-semibold text-foreground",
											children: ["By: ", ev.uploaderName ?? "Staff Member"]
										}), ev.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 text-xs text-muted-foreground bg-background/60 rounded-md p-2 border border-border/60",
											children: [
												"\"",
												ev.notes,
												"\""
											]
										})] })
									]
								}, ev.id))]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mb-1.5",
									children: "Original issue photo:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportImage, {
									src: report.image,
									alt: report.title,
									onClick: report.image ? () => onZoomImage(report.image) : void 0,
									className: "h-52 w-full rounded-xl object-cover sm:h-56 cursor-pointer",
									placeholderClassName: "h-52 w-full rounded-xl sm:h-56"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mt-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-xs font-bold uppercase tracking-wide text-muted-foreground",
									children: "Location"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 flex items-center gap-1.5 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMapPin, {
											className: "shrink-0",
											"aria-hidden": true
										}),
										" ",
										report.location
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 font-mono text-xs text-muted-foreground",
									children: [
										report.lat.toFixed(5),
										", ",
										report.lng.toFixed(5)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportMiniMap, {
									lat: report.lat,
									lng: report.lng,
									className: "mt-3 h-48 w-full"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-xs font-bold uppercase tracking-wide text-muted-foreground",
								children: "Activity"
							}), historyLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Loading history…"
							}) : history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "No status changes recorded yet."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 space-y-2.5",
								children: history.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "rounded-xl border border-border bg-secondary/40 px-3.5 py-2.5 text-sm space-y-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "font-semibold text-foreground flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: entry.fromStatus ? `${entry.fromStatus} → ` : "Status set: " }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: entry.toStatus === "Verified" ? "text-emerald-500 font-bold" : entry.toStatus === "Reopened" ? "text-rose-500 font-bold" : entry.toStatus === "Resolved" ? "text-amber-500 font-bold" : "",
													children: entry.toStatus
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-muted-foreground font-mono",
												children: new Date(entry.createdAt).toLocaleString()
											})]
										}),
										entry.changedByName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground",
											children: ["Actor: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-foreground",
												children: entry.changedByName
											})]
										}),
										entry.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground bg-background/50 rounded-md p-2 border border-border/40 mt-1",
											children: [
												"“",
												entry.notes,
												"”"
											]
										})
									]
								}, entry.id))
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "border-t border-border bg-secondary/30 px-6 py-5 lg:border-l lg:border-t-0 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-xs font-bold uppercase tracking-wide text-muted-foreground",
						children: "Details"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 space-y-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs font-bold text-muted-foreground",
								children: "Category"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 font-semibold",
								children: report.category
							})] }),
							report.assigneeName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs font-bold text-muted-foreground",
								children: "Assigned to"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1",
								children: report.assigneeName
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs font-bold text-muted-foreground",
								children: "SLA"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlaBadge, { report })
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs font-bold text-muted-foreground",
								children: "Created"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1",
								children: new Date(report.createdAt).toLocaleString()
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs font-bold text-muted-foreground",
								children: "Updated"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1",
								children: new Date(report.updatedAt).toLocaleString()
							})] }),
							report.resolvedAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs font-bold text-muted-foreground",
								children: "Resolved"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1",
								children: new Date(report.resolvedAt).toLocaleString()
							})] })
						]
					})]
				})]
			})]
		})
	}) });
}
//#endregion
export { ReportsPage as component };
