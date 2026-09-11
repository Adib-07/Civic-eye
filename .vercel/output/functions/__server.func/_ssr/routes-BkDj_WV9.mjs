import { o as __toESM } from "../_runtime.mjs";
import { a as Trigger2, c as require_react, i as Root2, n as Header, r as Item, s as require_jsx_runtime, t as Content2 } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { B as FiSearch, F as FiMessageSquare, G as FiTool, H as FiShield, J as FiUser, M as FiMapPin, S as FiHelpCircle, W as FiTarget, Y as FiUserCheck, Z as FiUserX, a as FiBarChart2, b as FiFileText, c as FiCamera, d as FiChevronDown, et as FiXCircle, f as FiChevronLeft, g as FiDatabase, h as FiClock, i as FiArrowRight, j as FiMap, l as FiCheck, m as FiClipboard, o as FiBookOpen, p as FiChevronRight, q as FiUpload, s as FiBriefcase, u as FiCheckCircle, v as FiEye, x as FiGrid } from "../_libs/react-icons.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as PLANS, u as formatInr } from "./hooks-DzLqLLnN.mjs";
import { n as Navbar, t as Footer } from "./Navbar-DYhFGqnu.mjs";
import { t as ChevronDown } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BkDj_WV9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var statCards = [
	{
		label: "Open Issues",
		value: "24",
		color: "text-blue-400"
	},
	{
		label: "SLA On Track",
		value: "89%",
		color: "text-emerald-400"
	},
	{
		label: "Overdue",
		value: "4",
		color: "text-amber-400"
	},
	{
		label: "Resolved",
		value: "31",
		color: "text-slate-200"
	}
];
var issues = [
	{
		id: "CE-1042",
		title: "HVAC Unit 3 — Filter replacement overdue",
		status: "Open",
		sla: "3h 12m",
		badge: "bg-blue-500/15 text-blue-400 border-blue-500/20"
	},
	{
		id: "CE-1038",
		title: "Loading Dock B — Exterior light outage",
		status: "In Progress",
		sla: "Overdue",
		badge: "bg-amber-500/15 text-amber-400 border-amber-500/20"
	},
	{
		id: "CE-1035",
		title: "Parking L2 — Water leak near Bay 14",
		status: "In Review",
		sla: "1d 4h",
		badge: "bg-indigo-500/15 text-indigo-400 border-indigo-500/20"
	},
	{
		id: "CE-1031",
		title: "Main Lobby — Card reader malfunction",
		status: "Resolved",
		sla: "Done",
		badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
	}
];
function LandingHero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden cinematic-hero pt-14 pb-20 lg:pt-24 lg:pb-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "cinematic-hero-bg",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "cinematic-hero-grid",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "page-container relative z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center lg:text-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "cinematic-eyebrow inline-flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-1.5 w-1.5 rounded-full bg-hero-accent" }), "ISSUE OPERATIONS PLATFORM"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-4 font-display font-bold text-[2.75rem] sm:text-5xl lg:text-[3.75rem] leading-[1.05] tracking-tight text-white",
								children: [
									"Turn Every Operational Issue Into a",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-hero-accent",
										children: "Verified Resolution."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-xl text-[15px] sm:text-base lg:text-[17px] text-slate-400/80 mx-auto lg:mx-0",
								children: "CivicEye helps organizations receive, assign, track, resolve and verify operational issues across their physical sites."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/book-demo",
									className: cn("cinematic-btn-primary", "px-6 py-3 text-[15px]"),
									children: ["Book a Demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, { className: "h-4 w-4" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/for-organizations",
									className: "cinematic-btn-secondary",
									children: "See How It Works"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-xs text-slate-400/70",
								children: "Built for facilities, campuses and operations teams."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "cinematic-product-shell",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.03] px-4 py-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-red-400/70" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-amber-400/70" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-emerald-400/70" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-3 text-xs font-medium text-slate-400/80",
										children: "CivicEye Operations"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.015] px-4 py-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-1 items-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-[11px] text-slate-500",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSearch, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Search issues…" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-[10px] text-slate-400",
										children: "All"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-md border border-hero-accent/30 bg-hero-accent/10 px-2 py-1 text-[10px] font-medium text-hero-accent",
										children: "Assign"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 sm:p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-4 gap-2",
										children: statCards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] font-medium uppercase tracking-wider text-slate-500",
												children: card.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: cn("mt-1 text-lg font-bold", card.color),
												children: card.value
											})]
										}, card.label))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 overflow-x-auto rounded-lg border border-white/[0.06] bg-white/[0.02]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-semibold text-slate-200",
													children: "Live Issues"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1.5 text-[10px] text-slate-500",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" }), "Live"]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "border-b border-white/[0.06] px-4 py-2",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid grid-cols-[4.25rem_1fr_auto_auto] items-center gap-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ID" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Issue" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Status" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-right",
															children: "SLA"
														})
													]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "divide-y divide-white/[0.04]",
												children: issues.map((issue) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid grid-cols-[4.25rem_1fr_auto_auto] items-center gap-3 px-4 py-2.5",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-mono text-[11px] text-slate-500",
															children: issue.id
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "truncate text-[13px] text-slate-200/90",
															children: issue.title
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: cn("shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold", issue.badge),
															children: issue.status
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "shrink-0 text-right text-[11px] text-slate-400",
															children: issue.sla
														})
													]
												}, issue.id))
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 flex items-center justify-center gap-2 text-[10px] text-slate-500/60",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
												className: "h-4 w-4",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: 2,
												"aria-hidden": true,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 9l-7 7-7-7" })
											}), "Scroll"]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex items-center justify-between text-[11px] text-slate-500",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Showing 4 of 24 open issues" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Updated just now" })]
									})
								]
							})
						]
					})]
				})
			})
		]
	});
}
/** Illustrative demo data for marketing previews only — not live Supabase records. */
var DEMO_ISSUES = [
	{
		id: "a4f2b891",
		title: "Pothole — Main Access Road, near Gate 2",
		category: "Pothole",
		location: "MG Road Junction, Ward 12",
		status: "Pending",
		priority: "High",
		sla: "18h left",
		assignee: null,
		reported: "2h ago",
		mapX: 28,
		mapY: 62,
		markerColor: "#f59e0b"
	},
	{
		id: "c91d004a",
		title: "Streetlight outage — North perimeter",
		category: "Broken Street Light",
		location: "North perimeter, Sector 4",
		status: "In Progress",
		priority: "Medium",
		sla: "2d left",
		assignee: "Facilities Team A",
		reported: "6h ago",
		mapX: 72,
		mapY: 34,
		markerColor: "#2563eb"
	},
	{
		id: "e22b7710",
		title: "Overflowing waste bin — Ward 14",
		category: "Garbage",
		location: "Ward 14 market lane",
		status: "In Progress",
		priority: "Medium",
		sla: "1d left",
		assignee: "Sanitation Unit",
		reported: "Yesterday",
		mapX: 54,
		mapY: 78,
		markerColor: "#2563eb"
	},
	{
		id: "b8c3e112",
		title: "Water leak — Pump Station",
		category: "Water Leakage",
		location: "Pump Station, Block C",
		status: "Resolved",
		priority: "High",
		sla: "On track",
		assignee: "Water Works",
		reported: "2d ago",
		mapX: 38,
		mapY: 28,
		markerColor: "#16a34a"
	},
	{
		id: "d4a901fc",
		title: "Road damage — Service lane",
		category: "Road Damage",
		location: "East service lane",
		status: "Verified",
		priority: "Low",
		sla: "Closed",
		assignee: "Roads Dept.",
		reported: "4d ago",
		mapX: 82,
		mapY: 58,
		markerColor: "#16a34a"
	}
];
var STAGES = [
	{
		num: "01",
		name: "Report",
		description: "Anyone in the organization submits a geo-tagged photo report.",
		icon: FiCamera
	},
	{
		num: "02",
		name: "Assign",
		description: "Assign responsibility to the right team member — you choose who owns it.",
		icon: FiUserCheck
	},
	{
		num: "03",
		name: "Track",
		description: "SLA timers and status updates keep work visible.",
		icon: FiClock
	},
	{
		num: "04",
		name: "Resolve",
		description: "Staff upload photo evidence and completion notes.",
		icon: FiCheckCircle
	},
	{
		num: "05",
		name: "Verify",
		description: "Reporter or supervisor confirms the fix is real.",
		icon: FiEye
	}
];
var STATUS_COLORS = {
	Pending: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
	"In Progress": "bg-blue-500/15 text-blue-600 dark:text-blue-400",
	Resolved: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
	Verified: "bg-primary/15 text-primary"
};
var CATEGORY_COLORS = {
	Pothole: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
	"Broken Street Light": "bg-violet-500/10 text-violet-600 dark:text-violet-400",
	Garbage: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
	"Water Leakage": "bg-sky-500/10 text-sky-600 dark:text-sky-400",
	"Road Damage": "bg-rose-500/10 text-rose-600 dark:text-rose-400"
};
function ProductVisualSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-background py-16 lg:py-24 pb-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-container",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-label",
							children: "How It Works"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl",
							children: "One system for the complete issue lifecycle."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-base text-muted-foreground",
							children: "From first report to verified resolution — every step is tracked, assigned, and accountable."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-14 lg:mt-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden lg:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-5 left-[10%] right-[10%] h-px bg-border",
								"aria-hidden": true
							}), STAGES.map((stage) => {
								const Icon = stage.icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center text-center max-w-[140px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											className: "mb-3 h-4 w-4 text-muted-foreground/60",
											"aria-hidden": true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "relative z-10 grid h-10 w-10 place-items-center rounded-full border border-primary/30 bg-primary/10 text-sm font-bold text-primary",
											children: stage.num
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-3 text-sm font-bold",
											children: stage.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-1.5 text-xs leading-snug text-muted-foreground",
											children: stage.description
										})
									]
								}, stage.num);
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex flex-col gap-6 pl-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute left-[15px] top-5 bottom-5 w-px bg-border",
								"aria-hidden": true
							}), STAGES.map((stage) => {
								const Icon = stage.icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative flex items-start gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -left-8 top-0 grid h-10 w-10 place-items-center rounded-full border border-primary/30 bg-primary/10 text-sm font-bold text-primary",
										children: stage.num
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
												className: "h-3.5 w-3.5 text-muted-foreground/60",
												"aria-hidden": true
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-bold",
												children: stage.name
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs leading-snug text-muted-foreground",
											children: stage.description
										})]
									})]
								}, stage.num);
							})]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-14 lg:mt-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 max-w-2xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "section-label",
								children: "The Issues Workspace"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "The operational console where teams triage, filter, assign and track every report — with live SLA timers. This is the working tool staff use day to day, distinct from the high-level KPI snapshot in the hero above."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "product-frame",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "product-frame-header",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "product-frame-dot" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "product-frame-dot" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "product-frame-dot" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-2 flex-1 truncate text-[11px] font-medium text-muted-foreground",
											children: "app.civiceye.com/issues"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2 border-b border-border bg-secondary/40 px-4 py-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-md border border-border bg-background px-2 py-1 text-[10px] font-medium text-muted-foreground",
											children: "Filter: All"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-md border border-border bg-background px-2 py-1 text-[10px] font-medium text-muted-foreground",
											children: "Sort: SLA"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary",
											children: "Assign"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-x-auto pb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
										className: "w-full text-left text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "border-b border-border bg-secondary/50",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "px-4 py-2.5 font-semibold text-muted-foreground",
													children: "ID"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "px-4 py-2.5 font-semibold text-muted-foreground",
													children: "Title"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "hidden px-4 py-2.5 font-semibold text-muted-foreground sm:table-cell",
													children: "Category"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "hidden px-4 py-2.5 font-semibold text-muted-foreground md:table-cell",
													children: "Status"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "px-4 py-2.5 text-right font-semibold text-muted-foreground",
													children: "SLA"
												})
											]
										}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
											className: "divide-y divide-border",
											children: DEMO_ISSUES.map((issue) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
												className: "bg-background transition-colors hover:bg-secondary/30",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "px-4 py-2.5 font-mono text-[11px] text-muted-foreground",
														children: issue.id.slice(0, 8)
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "max-w-[200px] truncate px-4 py-2.5 font-medium",
														children: issue.title
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "hidden px-4 py-2.5 sm:table-cell",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: cn("inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold leading-4", CATEGORY_COLORS[issue.category] ?? "bg-secondary text-muted-foreground"),
															children: issue.category
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "hidden px-4 py-2.5 md:table-cell",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: cn("inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold leading-4", STATUS_COLORS[issue.status] ?? "bg-secondary text-muted-foreground"),
															children: issue.status
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "px-4 py-2.5 text-right font-mono text-[11px] text-muted-foreground",
														children: issue.sla
													})
												]
											}, issue.id))
										})]
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-center text-xs text-muted-foreground",
							children: [
								"Illustrative interface —",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/book-demo",
									className: "underline underline-offset-2 hover:text-foreground",
									children: "sign in"
								}),
								" ",
								"for your organization's live workspace"
							]
						})
					]
				})
			]
		})
	});
}
function ManageMock() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3 sm:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssignMock, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrackMock, {})]
	});
}
var TOUR_STEPS = [
	{
		key: "capture",
		number: "01",
		label: "Capture",
		description: "Anyone reports an issue in seconds with a photo and auto-detected location — no app install required.",
		mock: ReportMock
	},
	{
		key: "manage",
		number: "02",
		label: "Manage",
		description: "Issues route to the right team and stay visible with live SLA timers and logged status changes.",
		mock: ManageMock
	},
	{
		key: "resolve",
		number: "03",
		label: "Resolve",
		description: "Field staff close issues only after uploading photo evidence and completion notes — proof of work done.",
		mock: ResolveMock
	},
	{
		key: "verify",
		number: "04",
		label: "Verify",
		description: "Reporters or supervisors confirm the fix before the ticket is closed, closing the accountability loop.",
		mock: VerifyMock
	}
];
function ReportMock() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-4 shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiClipboard, {
				className: "h-4 w-4 text-primary",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-semibold",
				children: "Report an Issue"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] font-medium text-muted-foreground",
					children: "Photo Evidence"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 flex items-center justify-center h-16 rounded-lg border-2 border-dashed border-border bg-secondary/50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5 text-[10px] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCamera, {
							className: "h-3.5 w-3.5",
							"aria-hidden": true
						}), "Tap to capture or upload"]
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-medium text-muted-foreground",
						children: "Category"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 rounded-lg border border-border bg-background px-2.5 py-1.5 text-[10px]",
						children: "Pothole"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-medium text-muted-foreground",
						children: "Location"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 flex items-center gap-1 rounded-lg border border-border bg-background px-2.5 py-1.5 text-[10px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMapPin, {
							className: "h-3 w-3 text-primary",
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Auto-detected" })]
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] font-medium text-muted-foreground",
					children: "Description"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 rounded-lg border border-border bg-background px-2.5 py-1.5 text-[10px] text-muted-foreground",
					children: "Large pothole near main gate entrance…"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-lg bg-primary/5 border border-primary/10 px-2.5 py-1.5 text-[9px] text-primary/80 font-medium",
					children: "No app install required — works on any mobile browser"
				})
			]
		})]
	});
}
function AssignMock() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-4 shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTarget, {
						className: "h-4 w-4 text-primary",
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold",
						children: "Assign Issue"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-amber-600",
					children: "Pending"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border bg-background p-3 mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] font-semibold",
					children: "Pothole — Main Access Road, near Gate 2"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[9px] text-muted-foreground mt-0.5",
					children: "Ward 12 · High priority · SLA: 24 hours"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] font-medium text-muted-foreground",
					children: "Assign to team"
				}), [{
					name: "Roads & Infrastructure",
					active: true
				}, {
					name: "General Maintenance",
					active: false
				}].map((team) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `flex items-center gap-2 rounded-lg border px-3 py-2 text-[10px] ${team.active ? "border-primary/30 bg-primary/5 font-semibold text-primary" : "border-border bg-background text-muted-foreground"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiUser, {
						className: "h-3 w-3 shrink-0",
						"aria-hidden": true
					}), team.name]
				}, team.name))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center gap-2 text-[9px] text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiClock, {
					className: "h-3 w-3",
					"aria-hidden": true
				}), "Assignment creates SLA timer automatically"]
			})
		]
	});
}
function TrackMock() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-4 shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-between mb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiClock, {
						className: "h-4 w-4 text-primary",
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold",
						children: "SLA Tracking"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2.5",
				children: [
					{
						id: "CE-4821",
						title: "Pothole — MG Road",
						sla: "6h left",
						status: "In Progress",
						color: "bg-blue-500",
						pct: 75
					},
					{
						id: "CE-4820",
						title: "Streetlight outage",
						sla: "2d left",
						status: "In Progress",
						color: "bg-blue-500",
						pct: 40
					},
					{
						id: "CE-4818",
						title: "Water leak — Block C",
						sla: "Overdue",
						status: "Escalated",
						color: "bg-red-500",
						pct: 100
					}
				].map((issue) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-background p-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] font-semibold",
							children: issue.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[9px] text-muted-foreground",
							children: issue.id
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `rounded px-1.5 py-0.5 text-[9px] font-semibold text-white ${issue.color}`,
							children: issue.status
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 h-1 rounded-full bg-secondary overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `h-full rounded-full ${issue.sla === "Overdue" ? "bg-red-500" : "bg-primary"}`,
								style: { width: `${issue.pct}%` }
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `text-[9px] font-medium ${issue.sla === "Overdue" ? "text-red-500" : "text-muted-foreground"}`,
							children: issue.sla
						})]
					})]
				}, issue.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-[9px] text-muted-foreground",
				children: "Overdue issues surface automatically in the attention queue"
			})
		]
	});
}
function ResolveMock() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-4 shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheckCircle, {
						className: "h-4 w-4 text-emerald-500",
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold",
						children: "Resolution Evidence"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-600",
					children: "Resolved"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border bg-background p-3 mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] font-semibold",
					children: "CE-4821 · Pothole — MG Road"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[9px] text-muted-foreground mt-0.5",
					children: "Assigned to: Roads & Infrastructure"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] font-medium text-muted-foreground",
					children: "Evidence Photo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 flex items-center justify-center h-16 rounded-lg border border-emerald-500/20 bg-emerald-500/5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5 text-[10px] text-emerald-600 font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCamera, {
							className: "h-3.5 w-3.5",
							"aria-hidden": true
						}), "Resolution photo attached"]
					})
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] font-medium text-muted-foreground",
					children: "Completion Notes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 rounded-lg border border-border bg-background px-2.5 py-1.5 text-[10px] text-muted-foreground",
					children: "Pothole filled and surface levelled. Work completed at 14:32 IST."
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 px-2.5 py-1.5 text-[9px] text-emerald-700 font-medium",
				children: "Photo evidence required before marking resolved"
			})
		]
	});
}
function VerifyMock() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-4 shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEye, {
						className: "h-4 w-4 text-indigo-500",
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold",
						children: "Verification"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-indigo-600",
					children: "Awaiting Review"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border bg-background p-3 mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] font-semibold",
					children: "CE-4821 · Pothole — MG Road"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[9px] text-muted-foreground mt-0.5",
					children: "Resolved by: Rajesh M. · 14:32 IST"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border bg-background p-2.5 mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center h-12 rounded-lg border border-dashed border-border bg-secondary/50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] text-muted-foreground",
						children: "Before photo"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center h-12 mt-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] text-emerald-600 font-medium",
						children: "After photo"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 flex items-center justify-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/5 py-2 text-[10px] font-semibold text-emerald-600",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheckCircle, {
						className: "h-3 w-3",
						"aria-hidden": true
					}), "Confirm"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 flex items-center justify-center gap-1 rounded-lg border border-border bg-background py-2 text-[10px] font-semibold text-muted-foreground",
					children: "Reopen"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-[9px] text-muted-foreground",
				children: "Reporter or supervisor confirms actual resolution"
			})
		]
	});
}
var MOCKS = {
	capture: ReportMock,
	manage: ManageMock,
	resolve: ResolveMock,
	verify: VerifyMock
};
function ProductTour() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "workflow",
		className: "py-16 lg:py-24",
		"aria-labelledby": "tour-heading",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-2xl text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-label",
						children: "How It Works"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "tour-heading",
						className: "mt-2 section-title text-2xl sm:text-3xl",
						children: "Capture. Manage. Resolve. Verify."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base",
						children: "One accountable workflow takes every issue from first report to verified resolution."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 space-y-16",
				children: TOUR_STEPS.map((step, i) => {
					const MockComponent = MOCKS[step.key];
					const isEven = i % 2 === 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${isEven ? "" : "lg:[direction:rtl]"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: isEven ? "" : "lg:[direction:ltr]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-background font-mono text-xs font-bold text-primary",
										children: step.number
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold uppercase tracking-wider text-muted-foreground/60",
										children: step.label
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-lg font-semibold text-foreground sm:text-xl",
									children: [
										"Step ",
										step.number,
										": ",
										step.label
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base",
									children: step.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex items-center gap-2 text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary",
										children: i + 1
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"Step ",
										i + 1,
										" of ",
										TOUR_STEPS.length
									] })]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: isEven ? "" : "lg:[direction:ltr]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-secondary/30 p-3 sm:p-4",
								children: [MockComponent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MockComponent, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-center text-[10px] text-muted-foreground",
									children: "Illustrative UI preview — sign in to access your organization's live workspace"
								})]
							})
						})]
					}, step.key);
				})
			})]
		})
	});
}
var PROBLEM_STEPS = [
	{
		icon: FiMessageSquare,
		label: "Reported in a WhatsApp group"
	},
	{
		icon: FiUserX,
		label: "No one is assigned"
	},
	{
		icon: FiClock,
		label: "No deadline is tracked"
	},
	{
		icon: FiHelpCircle,
		label: "No one confirms it's fixed"
	},
	{
		icon: FiXCircle,
		label: "Closed without proof"
	}
];
function ProblemStorySection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-secondary/30 py-16 lg:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-2xl text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "section-label",
					children: "The Problem"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl",
					children: "An issue reported in a WhatsApp group rarely gets assigned, tracked, or closed with proof."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto mt-10 flex max-w-md flex-col items-start gap-0",
				children: PROBLEM_STEPS.map((step, i) => {
					const Icon = step.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("flex w-full items-center gap-3 rounded-lg p-3", "border border-red-200 bg-red-50/50 dark:border-red-900/40 dark:bg-red-950/20"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "h-4 w-4 shrink-0 text-red-500",
								"aria-hidden": true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted-foreground",
								children: step.label
							})]
						}), i < PROBLEM_STEPS.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronDown, {
							className: "my-1 h-5 w-5 text-red-300 dark:text-red-800",
							"aria-hidden": true
						})]
					}, step.label);
				})
			})]
		})
	});
}
var CAPABILITIES = [
	{
		icon: FiClock,
		title: "SLA Tracking",
		description: "Configurable resolution timelines per category with automatic breach alerts."
	},
	{
		icon: FiUserCheck,
		title: "Issue Assignment",
		description: "Route responsibility to the right team based on category and location."
	},
	{
		icon: FiCamera,
		title: "Evidence-Based Resolution",
		description: "Staff upload photo evidence and work notes before marking issues complete."
	},
	{
		icon: FiCheckCircle,
		title: "Resolution Verification",
		description: "Reporters and supervisors confirm or reject completed work — closing the accountability loop."
	},
	{
		icon: FiMapPin,
		title: "Location-Aware Issues",
		description: "Geo-tagged reports with interactive map view for precise field navigation."
	},
	{
		icon: FiBarChart2,
		title: "Operational Analytics",
		description: "Dashboard KPIs, category breakdowns, and compliance metrics for management visibility."
	}
];
function CapabilitiesSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-background py-16 lg:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-label",
						children: "CAPABILITIES"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl",
						children: "Built for the people responsible for getting things done"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-base text-muted-foreground",
						children: "CivicEye covers the complete operational workflow — from first report to verified resolution with evidence."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: CAPABILITIES.map((capability) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "landing-feature-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(capability.icon, {
								className: "h-4 w-4",
								"aria-hidden": true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 text-base font-semibold",
							children: capability.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted-foreground",
							children: capability.description
						})
					]
				}, capability.title))
			})]
		})
	});
}
var SOLUTIONS = [
	{
		title: "Facility Management",
		icon: FiTool,
		audience: "Facility managers and operations teams",
		description: "Manage resolution across every client site under contract. Keep a dated audit trail that proves each SLA was met at renewal.",
		color: "blue",
		image: "/assets/facility-1600.jpg"
	},
	{
		title: "Corporate & Technology Campuses",
		icon: FiBriefcase,
		audience: "Campus operations and workplace teams",
		description: "Employees report a broken HVAC or dead outlet from a single link. CivicEye routes it to the right vendor and shows every open ticket across all buildings.",
		color: "indigo",
		image: "/assets/corporate-1600.jpg"
	},
	{
		title: "Universities & Colleges",
		icon: FiBookOpen,
		audience: "University administration and maintenance",
		description: "Students and staff report issues with no app to install. Track them across academic blocks, hostels, labs, and sports facilities from one queue.",
		color: "sky",
		image: "/assets/university-1600.jpg"
	},
	{
		title: "Large Communities & Townships",
		icon: FiMap,
		audience: "RWA boards and township administrators",
		description: "Residents report potholes, outages, and water issues from their phones. See where problems cluster on a map and send the right crew.",
		color: "emerald",
		image: "/assets/township-1600.jpg"
	}
];
var ICON_STYLES = {
	blue: "bg-blue-500/5 border-blue-500/20 text-blue-600",
	indigo: "bg-indigo-500/5 border-indigo-500/20 text-indigo-600",
	sky: "bg-sky-500/5 border-sky-500/20 text-sky-600",
	emerald: "bg-emerald-500/5 border-emerald-500/20 text-emerald-600"
};
function SolutionsSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "solutions",
		className: "py-16 lg:py-24 bg-secondary/30 border-y border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-2xl text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-label",
						children: "SOLUTIONS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight",
						children: "Designed for teams responsible for real-world spaces"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted-foreground text-base max-w-2xl mx-auto",
						children: "CivicEye serves facility managers, campuses, communities, and operations teams."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5",
				children: SOLUTIONS.map((solution) => {
					const Icon = solution.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "solution-card group flex flex-col overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: solution.image,
								alt: solution.title,
								loading: "lazy",
								decoding: "async",
								className: "aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-border/40 via-transparent to-transparent",
								"aria-hidden": true
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 flex-col p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("grid h-12 w-12 shrink-0 place-items-center rounded-xl border", ICON_STYLES[solution.color]),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										className: "h-5 w-5",
										"aria-hidden": true
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-semibold mt-4",
									children: solution.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium text-primary/70 mt-1",
									children: solution.audience
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground mt-3 leading-relaxed",
									children: solution.description
								})
							]
						})]
					}, solution.title);
				})
			})]
		})
	});
}
var valueProps = [
	{
		icon: FiEye,
		bold: "Know what is open.",
		desc: "Every issue in one queue."
	},
	{
		icon: FiUserCheck,
		bold: "Know who owns it.",
		desc: "Explicit assignment per issue."
	},
	{
		icon: FiClock,
		bold: "Know what is overdue.",
		desc: "SLA timers surface breaches."
	},
	{
		icon: FiCheckCircle,
		bold: "Know what was resolved.",
		desc: "Evidence and verification required."
	}
];
function OperationalValueSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-background py-16 lg:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-container",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-2xl text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "section-label",
						children: "OPERATIONAL VALUE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight",
						children: "Give your operations team visibility from report to resolution."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2",
					children: valueProps.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(v.icon, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: v.bold
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-sm text-muted-foreground",
							children: v.desc
						})] })]
					}, v.bold))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/book-demo",
						className: "btn-primary inline-flex items-center gap-2",
						children: ["Book a Demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, { className: "h-4 w-4" })]
					})
				})
			]
		})
	});
}
function ProductFrameHeader({ title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "product-frame-header",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "product-frame-dot" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "product-frame-dot" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "product-frame-dot" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-1 text-xs font-medium text-muted-foreground",
				children: title
			})
		]
	});
}
function IssueReportingForm() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "product-frame",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductFrameHeader, { title: "Report an Issue" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center rounded-lg border-2 border-dashed border-border p-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiUpload, {
							className: "mx-auto h-6 w-6 text-muted-foreground",
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-xs text-muted-foreground",
							children: "Upload Photo"
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mb-1 block text-[10px] font-medium text-muted-foreground",
					children: "Category"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Select category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiGrid, {
						className: "h-3 w-3",
						"aria-hidden": true
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mb-1 block text-[10px] font-medium text-muted-foreground",
					children: "Location"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMapPin, {
						className: "h-3 w-3 text-muted-foreground",
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: "Enter location"
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mb-1 block text-[10px] font-medium text-muted-foreground",
					children: "Description"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-muted-foreground",
					children: "Describe the issue..."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "w-full rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground",
					children: "Submit Report"
				})
			]
		})]
	});
}
function OperationsDashboard() {
	const stats = [
		{
			label: "Open",
			value: "24",
			color: "text-blue-500"
		},
		{
			label: "In Progress",
			value: "12",
			color: "text-amber-500"
		},
		{
			label: "Resolved",
			value: "89",
			color: "text-emerald-500"
		},
		{
			label: "Overdue",
			value: "4",
			color: "text-red-500"
		}
	];
	const issues = [
		{
			id: "CE-4821",
			title: "Pothole near main gate",
			status: "In Progress"
		},
		{
			id: "CE-4820",
			title: "Streetlight outage",
			status: "Pending"
		},
		{
			id: "CE-4819",
			title: "Water leak — pump room",
			status: "Resolved"
		}
	];
	const statusColors = {
		"In Progress": "bg-blue-500",
		Pending: "bg-amber-500",
		Resolved: "bg-emerald-500"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "product-frame",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductFrameHeader, { title: "Operations Overview" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2",
				children: stats.map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-border bg-background p-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[9px] text-muted-foreground",
						children: stat.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("font-display text-base font-bold", stat.color),
						children: stat.value
					})]
				}, stat.label))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2.5 divide-y divide-border rounded-md border border-border",
				children: issues.map((issue) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 px-2.5 py-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-1.5 w-1.5 shrink-0 rounded-full", statusColors[issue.status] ?? "bg-muted-foreground") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-w-0 flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-[10px] font-medium",
								children: issue.title
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 text-[9px] text-muted-foreground",
							children: issue.status
						})
					]
				}, issue.id))
			})]
		})]
	});
}
function ResolutionVerification() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "product-frame",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductFrameHeader, { title: "Issue CE-4821" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-500 border border-blue-500/20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEye, {
						className: "h-2.5 w-2.5",
						"aria-hidden": true
					}), "In Progress"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md border border-border bg-background p-2 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCamera, {
							className: "mx-auto h-4 w-4 text-muted-foreground",
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[9px] text-muted-foreground",
							children: "Before"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md border border-border bg-background p-2 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheckCircle, {
							className: "mx-auto h-4 w-4 text-muted-foreground",
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[9px] text-muted-foreground",
							children: "After"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400",
						children: "Confirm"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex-1 rounded-md border border-border bg-background px-2 py-1 text-[10px] font-medium text-muted-foreground",
						children: "Reopen"
					})]
				})
			]
		})]
	});
}
function ProductShowcaseSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-secondary/30 border-y border-border py-16 lg:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-label",
						children: "PRODUCT"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight",
						children: "See CivicEye in action"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted-foreground text-base max-w-2xl mx-auto",
						children: "A complete issue management interface — from reporting to verified resolution."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCarousel, { screens: [
				{
					label: "Citizen Reporting",
					node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssueReportingForm, {})
				},
				{
					label: "Operations Dashboard",
					node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OperationsDashboard, {})
				},
				{
					label: "Resolution Verification",
					node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResolutionVerification, {})
				}
			] })]
		})
	});
}
function ProductCarousel({ screens }) {
	const [active, setActive] = (0, import_react.useState)(0);
	const go = (next) => setActive((next + screens.length) % screens.length);
	(0, import_react.useEffect)(() => {
		const id = setInterval(() => setActive((i) => (i + 1) % screens.length), 5e3);
		return () => clearInterval(id);
	}, [screens.length]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-12 product-frame overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "product-frame-header",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "product-frame-dot" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "product-frame-dot" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "product-frame-dot" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-1 text-xs font-medium text-muted-foreground",
						children: screens[active].label
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid aspect-video w-full place-items-center bg-gradient-to-br from-secondary/60 to-background p-4 sm:p-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full max-w-md",
							children: screens[active].node
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => go(active - 1),
						"aria-label": "Previous screen",
						className: "absolute left-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/80 text-foreground shadow-sm transition hover:bg-background",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronLeft, {
							className: "h-4 w-4",
							"aria-hidden": true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => go(active + 1),
						"aria-label": "Next screen",
						className: "absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/80 text-foreground shadow-sm transition hover:bg-background",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronRight, {
							className: "h-4 w-4",
							"aria-hidden": true
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-center gap-2 py-3",
				children: screens.map((screen, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setActive(i),
					"aria-label": `Show ${screen.label}`,
					"aria-current": i === active,
					className: cn("h-2 rounded-full transition-all", i === active ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted-foreground")
				}, screen.label))
			})
		]
	});
}
var TRUST_GROUPS = [
	{
		title: "Data isolation",
		icon: FiDatabase,
		items: [
			"Every organization's data is isolated at the database level",
			"Issues, files, and images are scoped to your organization only",
			"Access is further limited to each user's role"
		]
	},
	{
		title: "Access control",
		icon: FiShield,
		items: [
			"Role-based permissions enforced at the database level",
			"Staff sign in through secure authentication flows",
			"Every assignment is recorded explicitly, not inferred"
		]
	},
	{
		title: "Evidence & audit",
		icon: FiFileText,
		items: [
			"Photo proof and work notes are required before an issue is resolved",
			"A full audit trail records every status change and assignment",
			"Reporters or supervisors confirm the fix was real"
		]
	}
];
function TrustSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-y border-border bg-background py-16 lg:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-container",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-2xl text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-label",
							children: "Trust & Security"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl",
							children: "Security and accountability are built into the platform"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground sm:text-base",
							children: "Your data is isolated, scoped, and auditable by design — not added as an afterthought."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-8 sm:grid-cols-3",
					children: TRUST_GROUPS.map((group) => {
						const Icon = group.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "h-4 w-4 text-primary",
								"aria-hidden": true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-semibold text-foreground",
								children: group.title
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2",
							children: group.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, {
									className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-primary",
									"aria-hidden": true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted-foreground",
									children: item
								})]
							}, item))
						})] }, group.title);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/security",
						className: "btn-secondary inline-flex items-center gap-2 px-4 py-2 text-sm",
						children: ["Security Details ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, { "aria-hidden": true })]
					})
				})
			]
		})
	});
}
var DISPLAYED_PLANS = PLANS.filter((p) => p.tier !== "enterprise").slice(0, 3);
function LandingPricingTeaser() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-background py-16 lg:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-container",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-2xl text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-label",
							children: "Pricing"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl",
							children: "Plans for organizations, not reporters"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-3 max-w-2xl text-base text-muted-foreground",
							children: "Your organization subscribes. Staff operate the platform. Residents report issues for free."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid grid-cols-1 gap-5 md:grid-cols-3",
					children: DISPLAYED_PLANS.map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: `landing-feature-card flex flex-col p-6 ${plan.highlighted ? "ring-1 ring-primary/25" : ""}`,
						children: [
							plan.highlighted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-2 inline-block w-fit rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary",
								children: "Most Popular"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-semibold",
								children: plan.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: plan.tagline
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 font-display text-3xl font-bold",
								children: [plan.monthlyPriceInr === 0 ? "Free" : formatInr(plan.monthlyPriceInr), plan.monthlyPriceInr !== null && plan.monthlyPriceInr !== 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium text-muted-foreground",
									children: "/mo"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 flex-1 space-y-2 text-sm text-muted-foreground",
								children: plan.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, {
										className: "mt-0.5 h-4 w-4 shrink-0 text-success",
										"aria-hidden": true
									}), f]
								}, f))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/pricing",
									className: "btn-secondary inline-flex w-full items-center justify-center gap-2 px-5 py-2.5",
									children: [
										plan.cta,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, { "aria-hidden": true })
									]
								})
							})
						]
					}, plan.tier))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/pricing",
						className: "btn-secondary inline-flex items-center gap-2 px-5 py-2.5",
						children: ["View all plans ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, { "aria-hidden": true })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs text-muted-foreground",
						children: "Pricing reflects current commercial structure."
					})]
				})
			]
		})
	});
}
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
var FAQS = [
	{
		question: "What is CivicEye?",
		answer: "CivicEye is an operational issue management platform designed for facility managers, campuses, townships, and residential communities to report, assign, track, and verify local physical issues from one accountable workflow."
	},
	{
		question: "Who is CivicEye for?",
		answer: "CivicEye serves facility management companies, corporate and technology campuses, universities and colleges, large residential communities and townships, and public-sector operations teams."
	},
	{
		question: "Can we start with one site?",
		answer: "Yes. Organizations typically begin with a single site or building during the pilot period and expand as the workflow matures."
	},
	{
		question: "How does issue assignment work?",
		answer: "Administrators route issues to the appropriate team based on category, location, and availability. Ownership is explicit and recorded."
	},
	{
		question: "How does SLA tracking work?",
		answer: "Configurable resolution timelines per category with automatic breach alerts for overdue tasks."
	},
	{
		question: "Can issues include photos and location?",
		answer: "Yes. Reports include mandatory photo evidence and automatic GPS location capture via a lightweight web form."
	},
	{
		question: "How is resolution verified?",
		answer: "When staff resolve an issue, they upload photo evidence and completion notes. The reporter or supervisor then confirms or rejects the resolution."
	},
	{
		question: "How do we start a pilot?",
		answer: "Book a demo or contact our team. The free pilot includes up to 5 staff members and 100 issues per month for 30 days."
	}
];
function FaqSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-secondary/30 border-y border-border py-16 lg:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-container",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "section-label centered",
					children: "FAQ"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight centered",
					children: "Frequently asked questions"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-3xl mx-auto mt-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
						type: "multiple",
						defaultValue: FAQS.map((_, index) => `faq-${index}`),
						children: FAQS.map((faq, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
							value: `faq-${index}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
								className: "text-sm font-semibold",
								children: faq.question
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground leading-relaxed pb-4",
								children: faq.answer
							}) })]
						}, index))
					})
				})
			]
		})
	});
}
function LandingCTA() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "cinematic-hero relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "cinematic-hero-bg",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "cinematic-hero-glow",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "page-container relative z-10 py-20 lg:py-28",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-2xl text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl font-bold tracking-tight text-white sm:text-4xl",
							children: "Ready to bring accountability to your operations?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl text-base text-white/60 mx-auto",
							children: "See how CivicEye can fit into your organization's existing issue-resolution workflow."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/book-demo",
								className: "cinematic-btn-primary",
								children: ["Book a Demo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, { "aria-hidden": true })]
							})
						})
					]
				})
			})
		]
	});
}
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, { variant: "cinematic" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "main-content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingHero, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductVisualSection, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductTour, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProblemStorySection, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CapabilitiesSection, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SolutionsSection, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OperationalValueSection, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductShowcaseSection, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustSection, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingPricingTeaser, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqSection, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingCTA, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { Landing as component };
