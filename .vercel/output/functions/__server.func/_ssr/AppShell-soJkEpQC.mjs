import { o as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { $ as FiX, D as FiList, I as FiMoon, J as FiUser, L as FiPlusCircle, N as FiMenu, O as FiLock, U as FiSun, i as FiArrowRight, j as FiMap, k as FiLogOut, n as FiAlertTriangle, v as FiEye, w as FiInbox, x as FiGrid } from "../_libs/react-icons.mjs";
import { c as resolveOrganizationId, t as getDefaultOrganizationId } from "./supabase-ET64mUQq.mjs";
import { _ as useNavigate, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { A as useOrganizationSubscription, P as useTheme, g as roleLabel, m as isStaffRole, v as signOut, w as useAuth } from "./hooks-DzLqLLnN.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-soJkEpQC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EmptyState({ icon: Icon = FiInbox, title, description, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 8
		},
		animate: {
			opacity: 1,
			y: 0
		},
		className: "surface-panel grid place-items-center px-6 py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-12 w-12 place-items-center rounded-lg border border-border bg-secondary text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-4 text-base font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground",
				children: description
			}),
			action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: action
			})
		]
	});
}
function Loader({ label = "Loading" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid place-items-center gap-3 py-20",
		role: "status",
		"aria-live": "polite",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm font-medium text-muted-foreground",
			children: [label, "…"]
		})]
	});
}
function QueryError({ title = "Could not load data", message, onRetry }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-panel border-destructive/30 bg-destructive/5 p-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-base font-semibold text-destructive",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted-foreground",
				children: message
			}),
			onRetry && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onRetry,
				className: "btn-primary mt-4",
				children: "Try again"
			})
		]
	});
}
var nav = [
	{
		to: "/dashboard",
		label: "Overview",
		icon: FiGrid,
		staffOnly: true
	},
	{
		to: "/reports",
		label: "All reports",
		icon: FiList,
		staffOnly: true
	},
	{
		to: "/reports",
		label: "Assigned to me",
		icon: FiUser,
		staffOnly: true,
		search: { assigned: "me" }
	},
	{
		to: "/reports",
		label: "SLA / attention",
		icon: FiAlertTriangle,
		staffOnly: true,
		search: { overdue: "1" }
	},
	{
		to: "/report",
		label: "Report issue",
		icon: FiPlusCircle,
		staffOnly: false
	},
	{
		to: "/map",
		label: "Map",
		icon: FiMap,
		staffOnly: false
	}
];
function AppShell({ title, subtitle, children, requireAuth = false, requireStaff = false }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(!requireAuth && !requireStaff);
	const navigate = useNavigate();
	const { dark, toggle } = useTheme();
	const { session, profile, loading: authLoading } = useAuth();
	const qc = useQueryClient();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const search = useRouterState({ select: (s) => s.location.search });
	const orgId = resolveOrganizationId(profile) ?? getDefaultOrganizationId();
	const { data: subscription } = useOrganizationSubscription(requireStaff && isStaffRole(profile?.role) ? orgId : null);
	(0, import_react.useEffect)(() => {
		if (authLoading) return;
		if (requireAuth && !session) {
			toast.error("Please sign in to continue");
			navigate({ to: "/login" });
			return;
		}
		if (requireStaff && !isStaffRole(profile?.role)) {
			toast.error("Staff access required");
			navigate({ to: "/login" });
			return;
		}
		setReady(true);
	}, [
		requireAuth,
		requireStaff,
		session,
		profile,
		authLoading,
		navigate
	]);
	const visibleNav = nav.filter((item) => !item.staffOnly || isStaffRole(profile?.role));
	const staffNav = visibleNav.filter((item) => item.staffOnly);
	const publicNav = visibleNav.filter((item) => !item.staffOnly);
	const isActive = (item) => {
		if (pathname !== item.to) return false;
		if (!item.search) return !search.assigned && !search.overdue;
		if (item.search.assigned === "me") return search.assigned === "me";
		if (item.search.overdue === "1") return search.overdue === "1" || search.overdue === true;
		return true;
	};
	const NavLink = ({ item }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: item.to,
		search: item.search,
		onClick: () => setOpen(false),
		className: cn("flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground", isActive(item) && "bg-secondary font-medium text-foreground ring-1 ring-inset ring-border"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
			className: "h-4 w-4 shrink-0 opacity-70",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate",
			children: item.label
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "hero-bg min-h-screen",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-[min(1280px,96vw)] gap-5 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: cn("surface-panel fixed inset-y-0 left-0 z-[900] flex w-60 shrink-0 flex-col p-3 transition-transform lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-2.5 px-2 py-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-8 w-8 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEye, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-display text-base font-semibold",
								children: ["Civic", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "Eye"
								})]
							})]
						}),
						profile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 truncate px-2 text-xs text-muted-foreground",
							children: [
								profile.fullName ?? profile.email,
								" · ",
								roleLabel(profile.role)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "mt-5 flex flex-1 flex-col gap-0.5",
							children: [
								staffNav.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "px-3 py-1.5 section-label",
									children: "Operations"
								}), staffNav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, { item }, `${item.to}-${item.label}`))] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 px-3 py-1.5 section-label",
									children: "Public"
								}),
								publicNav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, { item }, item.to))
							]
						}),
						session ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: async () => {
								await signOut();
								qc.invalidateQueries({ queryKey: ["auth"] });
								qc.invalidateQueries({ queryKey: ["reports"] });
								qc.invalidateQueries({ queryKey: ["staff"] });
								toast.success("Signed out");
								navigate({ to: "/" });
							},
							className: "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-destructive",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiLogOut, { className: "h-4 w-4" }), " Sign out"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-primary hover:bg-secondary",
							children: "Staff sign in"
						})
					]
				}),
				open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-0 z-[800] bg-background/60 backdrop-blur-sm lg:hidden",
					onClick: () => setOpen(false)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "surface-panel flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setOpen((o) => !o),
								"aria-label": "Toggle sidebar",
								className: "grid h-8 w-8 shrink-0 place-items-center rounded-md border border-border lg:hidden",
								children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMenu, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "truncate font-display text-lg font-semibold sm:text-xl",
									children: title
								}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs text-muted-foreground sm:text-sm",
									children: subtitle
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: toggle,
								"aria-label": "Toggle dark mode",
								className: "grid h-8 w-8 place-items-center rounded-md border border-border hover:bg-secondary",
								children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSun, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMoon, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/report",
								className: "btn-primary hidden px-3 py-1.5 text-sm sm:inline-flex",
								children: "New report"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							y: 8
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { duration: .25 },
						className: "mt-4 pb-16",
						children: ready ? requireStaff && subscription && !subscription.isActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubscriptionPaywall, { subscription }) : children : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Checking session" })
					})]
				})
			]
		})
	});
}
function SubscriptionPaywall({ subscription }) {
	const isExpired = subscription.status === "expired" || subscription.status === "cancelled" || subscription.trialEndsAt && new Date(subscription.trialEndsAt).getTime() < Date.now();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-panel mx-auto max-w-lg p-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid h-14 w-14 place-items-center rounded-full bg-destructive/10 text-destructive",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiLock, { className: "h-7 w-7" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-4 font-display text-xl font-bold",
				children: "Subscription inactive"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: isExpired ? `Your ${subscription.planName} plan has expired. Contact your organization administrator to renew.` : `Your ${subscription.planName} plan is not currently active. Staff actions are restricted until the subscription is restored.`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/pricing",
					className: "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground",
					children: ["View plans ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, { className: "h-4 w-4" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "inline-flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold",
					children: "Back to home"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-muted-foreground",
				children: "Read-only access may still be available. Contact support if you believe this is an error."
			})
		]
	});
}
//#endregion
export { QueryError as i, EmptyState as n, Loader as r, AppShell as t };
