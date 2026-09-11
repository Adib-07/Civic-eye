import { o as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { B as FiSearch, L as FiPlusCircle, M as FiMapPin } from "../_libs/react-icons.mjs";
import { t as ReportImage } from "./ReportImage-CuX88nI4.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as useHydrated, M as useReports, i as STATUSES, t as CATEGORIES } from "./hooks-DzLqLLnN.mjs";
import { r as Loader, t as AppShell } from "./AppShell-soJkEpQC.mjs";
import { n as StatusBadge, t as SlaBadge } from "./StatusBadge-DKXcbmsb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/map-A3VTXo38.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MapView = (0, import_react.lazy)(() => import("./MapView-C4J0qpIH.mjs"));
function MapPage() {
	const { reports, loading } = useReports();
	const hydrated = useHydrated();
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const [query, setQuery] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("All");
	const [catFilter, setCatFilter] = (0, import_react.useState)("All");
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return reports.filter((r) => {
			const matchQ = !q || r.title.toLowerCase().includes(q) || r.location.toLowerCase().includes(q) || r.category.toLowerCase().includes(q);
			const matchStatus = statusFilter === "All" || r.status === statusFilter;
			const matchCat = catFilter === "All" || r.category === catFilter;
			return matchQ && matchStatus && matchCat;
		});
	}, [
		reports,
		query,
		statusFilter,
		catFilter
	]);
	const selected = selectedId ? filtered.find((r) => r.id === selectedId) ?? null : null;
	const field = "rounded-md border border-border bg-card px-2.5 py-2 text-sm outline-none focus:border-primary";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Issue map",
		subtitle: `${filtered.length} geo-tagged report${filtered.length === 1 ? "" : "s"} on map`,
		children: loading || !hydrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Loading issue map" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-[1fr_340px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-panel overflow-hidden p-1 relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-[50vh] min-h-[300px] w-full overflow-hidden rounded-md sm:h-[58vh] lg:h-[calc(100vh-12rem)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Preparing map" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapView, {
							reports: filtered,
							selectedId
						})
					})
				}), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-4 pointer-events-none flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pointer-events-auto max-w-sm rounded-xl border border-border bg-card/95 p-5 text-center shadow-lg backdrop-blur-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMapPin, { className: "mx-auto h-8 w-8 text-primary mb-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-bold text-foreground",
								children: "Interactive Map Ready"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "No reports match your current filters. Submit a new report to place a live marker on this map."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/report",
								className: "btn-primary mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPlusCircle, {}), " Submit a report"]
							})
						]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 lg:max-h-[calc(100vh-12rem)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-panel space-y-3 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 rounded-md border border-border bg-background px-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSearch, { className: "h-4 w-4 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (e) => setQuery(e.target.value),
								placeholder: "Search issues…",
								className: "w-full bg-transparent py-2 text-sm outline-none"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: catFilter,
								onChange: (e) => setCatFilter(e.target.value),
								className: field,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "All",
									children: "All categories"
								}), CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c,
									children: c
								}, c))]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: statusFilter,
								onChange: (e) => setStatusFilter(e.target.value),
								className: field,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "All",
									children: "All statuses"
								}), STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s,
									children: s
								}, s))]
							})]
						})]
					}),
					selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-panel overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "section-label",
										children: "Selected issue"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-1 text-base font-semibold",
										children: selected.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex flex-wrap gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: selected.status }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlaBadge, { report: selected }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-md border border-border bg-secondary px-2 py-0.5 text-xs font-medium",
												children: selected.category
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportImage, {
								src: selected.image,
								alt: selected.title,
								className: "h-36 w-full object-cover",
								placeholderClassName: "h-36 w-full rounded-none border-y border-border"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 p-4 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "leading-relaxed text-muted-foreground",
										children: selected.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "flex items-start gap-1.5 text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMapPin, {
											className: "mt-0.5 h-4 w-4 shrink-0",
											"aria-hidden": true
										}), selected.location || "No place name"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-mono text-xs text-muted-foreground",
										children: [
											selected.lat.toFixed(5),
											", ",
											selected.lng.toFixed(5)
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											"Ref #",
											selected.id.slice(0, 8).toUpperCase(),
											" ·",
											" ",
											new Date(selected.createdAt).toLocaleString()
										]
									}),
									selected.assigneeName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs font-medium",
										children: ["Assigned: ", selected.assigneeName]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-panel min-h-0 flex-1 overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-b border-border px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-sm font-semibold",
								children: [
									"Issues (",
									filtered.length,
									")"
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "max-h-[40vh] overflow-y-auto lg:max-h-none lg:flex-1",
							children: filtered.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setSelectedId(r.id),
								className: cn("w-full border-b border-border px-4 py-3 text-left transition-colors hover:bg-secondary/60", selectedId === r.id && "bg-secondary"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium leading-snug",
										children: r.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 truncate text-xs text-muted-foreground",
									children: [
										r.category,
										" · ",
										r.location
									]
								})]
							}) }, r.id))
						})]
					})
				]
			})]
		})
	});
}
//#endregion
export { MapPage as component };
