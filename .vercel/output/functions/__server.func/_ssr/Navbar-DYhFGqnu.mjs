import { o as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { $ as FiX, I as FiMoon, N as FiMenu, U as FiSun, i as FiArrowRight, v as FiEye } from "../_libs/react-icons.mjs";
import { g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as useTheme } from "./hooks-DzLqLLnN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Navbar-DYhFGqnu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-border bg-secondary/40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-container grid grid-cols-2 gap-x-8 gap-y-10 py-14 md:grid-cols-4 lg:grid-cols-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEye, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-base font-semibold",
							children: "CivicEye"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xs text-sm text-muted-foreground",
						children: "Operational issue management from report to verified resolution for facilities, campuses, and communities."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-sm font-semibold text-foreground",
					children: "Product"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2.5 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/for-organizations",
							className: "transition-colors hover:text-foreground",
							children: "Features"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/for-organizations",
							hash: "workflow",
							className: "transition-colors hover:text-foreground",
							children: "How It Works"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/pricing",
							className: "transition-colors hover:text-foreground",
							children: "Pricing"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/faq",
							className: "transition-colors hover:text-foreground",
							children: "FAQ"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-sm font-semibold text-foreground",
					children: "Company"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2.5 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/security",
						className: "transition-colors hover:text-foreground",
						children: "Security"
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/book-demo",
						className: "transition-colors hover:text-foreground",
						children: "Book a Demo"
					}) })]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-sm font-semibold text-foreground",
					children: "Legal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2.5 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/privacy",
						className: "transition-colors hover:text-foreground",
						children: "Privacy Policy"
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/terms",
						className: "transition-colors hover:text-foreground",
						children: "Terms of Service"
					}) })]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border py-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "page-container",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: "© 2026 CivicEye. Issue management from report to verified resolution."
				})
			})
		})]
	});
}
var marketingNavLinks = [
	{
		to: "/for-organizations",
		hash: void 0,
		label: "Product"
	},
	{
		to: "/for-organizations",
		hash: "solutions",
		label: "Solutions"
	},
	{
		to: "/for-organizations",
		hash: "workflow",
		label: "How It Works"
	},
	{
		to: "/pricing",
		hash: void 0,
		label: "Pricing"
	},
	{
		to: "/security",
		hash: void 0,
		label: "Security"
	}
];
function Navbar({ variant = "default" }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const { dark, toggle } = useTheme();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const cinematic = variant === "cinematic";
	const closeMenu = (0, import_react.useCallback)(() => setOpen(false), []);
	(0, import_react.useEffect)(() => {
		if (open) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	const linkClass = (active, hasHash) => cn("rounded-md px-3 py-1.5 text-[13px] font-medium tracking-wide transition-colors", cinematic ? cn("text-slate-300/80 hover:text-white", active && !hasHash && "bg-white/10 text-white") : cn("text-muted-foreground hover:text-foreground", active && !hasHash && "bg-secondary text-foreground"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("sticky top-0 z-50 w-full backdrop-blur-md transition-colors", cinematic ? "border-b border-white/10 bg-slate-900/90" : "border-b border-border bg-background/95"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-container flex items-center justify-between py-2.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex min-w-0 items-center gap-2.5",
					"aria-label": "CivicEye home",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("grid h-8 w-8 shrink-0 place-items-center rounded-full text-white shadow-sm", cinematic ? "bg-blue-600 ring-1 ring-blue-400/30" : "bg-primary"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEye, {
							className: "h-4 w-4",
							"aria-hidden": true
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: cn("truncate font-display text-base font-bold tracking-tight", cinematic ? "text-white" : "text-foreground"),
						children: ["Civic", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-blue-500",
							children: "Eye"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 lg:flex",
					"aria-label": "Main navigation",
					children: marketingNavLinks.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						hash: l.hash,
						className: linkClass(pathname === l.to, !!l.hash),
						children: l.label
					}, `${l.to}-${l.hash ?? ""}`))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: toggle,
							"aria-label": "Toggle dark mode",
							className: cn("grid h-8 w-8 place-items-center rounded-lg border transition-colors", cinematic ? "border-white/15 text-slate-300 hover:bg-white/10 hover:text-white" : "border-border text-muted-foreground hover:bg-secondary hover:text-foreground"),
							children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSun, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMoon, { className: "h-3.5 w-3.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: cn("hidden rounded-md border px-3 py-1.5 text-[13px] font-medium transition-colors sm:block", cinematic ? "border-white/15 text-slate-200 hover:bg-white/10 hover:text-white" : "border-border text-foreground hover:bg-secondary"),
							children: "Sign In"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/book-demo",
							className: cn("hidden items-center gap-1.5 rounded-md px-4 py-2 text-[13px] font-semibold shadow-sm transition-all sm:flex", cinematic ? "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-900/40" : "bg-primary text-primary-foreground hover:bg-primary/90"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Book a Demo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, { className: "h-3.5 w-3.5" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setOpen((o) => !o),
							"aria-expanded": open,
							"aria-controls": "mobile-nav",
							"aria-label": open ? "Close menu" : "Open menu",
							className: cn("grid h-8 w-8 place-items-center rounded-lg border lg:hidden", cinematic ? "border-white/15 text-white" : "border-border"),
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMenu, { className: "h-4 w-4" })
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("fixed inset-0 top-[53px] z-40 lg:hidden", open ? "pointer-events-auto" : "pointer-events-none"),
			"aria-hidden": !open,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("absolute inset-0 transition-opacity duration-200", open ? "opacity-100" : "opacity-0", cinematic ? "bg-black/60" : "bg-black/40"),
				onClick: closeMenu
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				id: "mobile-nav",
				className: cn("absolute right-0 top-0 flex h-full w-72 flex-col overflow-y-auto border-l transition-all duration-200 ease-out", open ? "translate-x-0" : "translate-x-full", cinematic ? "border-white/10 bg-slate-950 text-white" : "border-border bg-card text-foreground"),
				"aria-label": "Mobile navigation",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-1 p-4",
					children: marketingNavLinks.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						hash: l.hash,
						onClick: closeMenu,
						className: cn("block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors", cinematic ? pathname === l.to ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/10 hover:text-white" : pathname === l.to ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"),
						children: l.label
					}, l.label))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("mt-auto flex flex-col gap-2 border-t p-4", cinematic ? "border-white/10" : "border-border"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						onClick: closeMenu,
						className: cn("rounded-lg px-3 py-2.5 text-center text-sm font-medium border transition-colors", cinematic ? "border-white/15 text-white hover:bg-white/10" : "border-border text-foreground hover:bg-secondary"),
						children: "Sign In"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/book-demo",
						onClick: closeMenu,
						className: "flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Book a Demo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, { className: "h-3.5 w-3.5" })]
					})]
				})]
			})]
		})]
	});
}
//#endregion
export { Navbar as n, Footer as t };
