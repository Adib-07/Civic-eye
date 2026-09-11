import { o as __toESM } from "../_runtime.mjs";
import { i as isValidCoordinate, t as DEFAULT_MAP_CENTER } from "./map-config-DNeTFeeJ.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { $ as FiX, B as FiSearch, H as FiShield, M as FiMapPin, P as FiMessageCircle, R as FiRefreshCw, S as FiHelpCircle, T as FiInfo, V as FiSend, c as FiCamera, d as FiChevronDown, h as FiClock, i as FiArrowRight, l as FiCheck, m as FiClipboard, t as FiAlertCircle, u as FiCheckCircle } from "../_libs/react-icons.mjs";
import { a as isSupabaseConfigured, i as getSupabaseConfigSummary, r as getSupabaseConfigError, t as getDefaultOrganizationId } from "./supabase-ET64mUQq.mjs";
import { _ as useNavigate, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { E as useHydrated, j as useReportMutations, t as CATEGORIES, x as submitDemoRequest } from "./hooks-DzLqLLnN.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { r as Loader, t as AppShell } from "./AppShell-soJkEpQC.mjs";
import { a as Chart, c as plugin_legend, i as CategoryScale, l as plugin_tooltip, o as LinearScale, r as BarElement, t as ArcElement } from "../_libs/chart.js.mjs";
import { n as Navbar, t as Footer } from "./Navbar-DYhFGqnu.mjs";
import { t as ImageModal } from "./ImageModal-CHZ2-3eF.mjs";
import { a as stringType, i as objectType, r as literalType, t as booleanType } from "../_libs/zod.mjs";
import { t as Route$17 } from "./start-CujHPv9n.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DZaeZjL5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-KFFBFpnU.css";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function HelpWidget() {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-8 right-6 z-50",
		role: "complementary",
		"aria-label": "Help and support",
		children: [open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 surface-panel shadow-lg border border-border p-4 w-64 space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold text-foreground",
						children: "Need help?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setOpen(false),
						className: "text-muted-foreground hover:text-foreground transition-colors",
						"aria-label": "Close help widget",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground leading-relaxed",
					children: "Get a quick walkthrough or speak with our product team."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/book-demo",
						className: "btn-primary w-full justify-center text-xs py-2",
						onClick: () => setOpen(false),
						children: "Book a Demo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/faq",
						className: "btn-secondary w-full justify-center text-xs py-2",
						onClick: () => setOpen(false),
						children: "View FAQ"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => setOpen((o) => !o),
			className: cn("grid h-12 w-12 place-items-center rounded-full shadow-lg transition-all", "bg-primary text-primary-foreground hover:bg-primary/90", open && "bg-secondary text-secondary-foreground hover:bg-secondary/80"),
			"aria-label": open ? "Close help menu" : "Open help menu",
			children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMessageCircle, { className: "h-5 w-5" })
		})]
	});
}
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$16 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "CivicEye — Issue Management & Verified Resolution Platform" },
			{
				name: "description",
				content: "CivicEye helps organizations receive, assign, track, resolve and verify operational issues with SLA visibility and evidence-backed workflows."
			},
			{
				property: "og:title",
				content: "CivicEye — Issue Management & Verified Resolution Platform"
			},
			{
				property: "og:description",
				content: "One platform for facility and operations teams to manage the complete issue lifecycle — from report to verified resolution."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:site_name",
				content: "CivicEye"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "CivicEye — Issue Management & Verified Resolution Platform"
			},
			{
				name: "twitter:description",
				content: "Helps organizations receive, assign, track, resolve and verify operational issues with SLA visibility."
			},
			{
				name: "robots",
				content: "index, follow"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main-content",
				className: "sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
				children: "Skip to main content"
			}),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$16.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
				position: "top-right",
				richColors: true,
				closeButton: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpWidget, {})
		]
	});
}
var $$splitComponentImporter$9 = () => import("./routes-BkDj_WV9.mjs");
var Route$15 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "CivicEye — Issue Operations Platform" },
		{
			name: "description",
			content: "CivicEye helps organizations receive, assign, track, resolve and verify operational issues with SLA visibility and evidence-backed workflows."
		},
		{
			property: "og:title",
			content: "CivicEye — Issue Operations Platform"
		},
		{
			property: "og:description",
			content: "One platform for facility and operations teams to manage the complete issue lifecycle — from report to verified resolution."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			property: "og:site_name",
			content: "CivicEye"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "twitter:title",
			content: "CivicEye — Issue Operations Platform"
		},
		{
			name: "twitter:description",
			content: "Helps organizations receive, assign, track, resolve and verify operational issues with SLA visibility."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var Route$14 = createFileRoute("/book-demo")({
	head: () => ({ meta: [{ title: "Book a Demo — CivicEye for Organizations" }, {
		name: "description",
		content: "Schedule a live product demonstration of CivicEye for your facility management, campus, township, or community operations team."
	}] }),
	component: BookDemoPage
});
var ORG_TYPES = [
	"Facility Management",
	"Corporate / Technology Campus",
	"University / College",
	"Residential Community / RWA",
	"Township / Large Estate",
	"Public-Sector / Municipal",
	"Other"
];
var SITE_COUNTS = [
	"1 site",
	"2–5 sites",
	"6–15 sites",
	"16–50 sites",
	"50+ sites"
];
var ROLE_OPTIONS = [
	"Administrator",
	"Facility Manager",
	"Operations Lead",
	"Maintenance Head",
	"IT / Technical",
	"Other"
];
var INITIAL_FORM = {
	fullName: "",
	workEmail: "",
	organization: "",
	role: ROLE_OPTIONS[0],
	orgType: ORG_TYPES[0],
	siteCount: SITE_COUNTS[0],
	message: ""
};
function validateEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validate(form) {
	const errors = {};
	if (!form.fullName.trim()) errors.fullName = "Full name is required.";
	else if (form.fullName.trim().length < 2) errors.fullName = "Please enter your full name.";
	if (!form.workEmail.trim()) errors.workEmail = "Work email is required.";
	else if (!validateEmail(form.workEmail)) errors.workEmail = "Please enter a valid email address.";
	if (!form.organization.trim()) errors.organization = "Organization name is required.";
	else if (form.organization.trim().length < 2) errors.organization = "Please enter your organization name.";
	return errors;
}
function FieldError({ message, id }) {
	if (!message) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		id,
		role: "alert",
		className: "mt-1 flex items-center gap-1 text-[11px] text-destructive",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAlertCircle, {
			className: "h-3 w-3 shrink-0",
			"aria-hidden": true
		}), message]
	});
}
function BookDemoPage() {
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)(INITIAL_FORM);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [touched, setTouched] = (0, import_react.useState)({});
	const [submitError, setSubmitError] = (0, import_react.useState)(null);
	const updateField = (key, value) => {
		setFormData((prev) => ({
			...prev,
			[key]: value
		}));
		if (errors[key]) setErrors((prev) => {
			const next = { ...prev };
			delete next[key];
			return next;
		});
	};
	const handleBlur = (key) => {
		setTouched((prev) => ({
			...prev,
			[key]: true
		}));
		const fieldErrors = validate(formData);
		if (fieldErrors[key]) setErrors((prev) => ({
			...prev,
			[key]: fieldErrors[key]
		}));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const validationErrors = validate(formData);
		setErrors(validationErrors);
		setTouched({
			fullName: true,
			workEmail: true,
			organization: true
		});
		if (Object.keys(validationErrors).length > 0) {
			toast.error("Please fix the highlighted fields.");
			return;
		}
		if (!isSupabaseConfigured()) {
			toast.error("Supabase is not configured — cannot submit request yet.");
			return;
		}
		setLoading(true);
		try {
			await submitDemoRequest(formData.fullName, formData.workEmail, formData.organization);
			setLoading(false);
			setSubmitted(true);
			toast.success("Demo request submitted successfully.");
		} catch (err) {
			setSubmitError("Something went wrong submitting your request — please try again or email us directly");
			toast.error("Something went wrong submitting your request — please try again or email us directly");
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, { variant: "cinematic" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "page-container py-12 sm:py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-4xl mx-auto grid gap-12 lg:grid-cols-12 items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-5 space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "section-label",
								children: "Schedule a Walkthrough"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 text-3xl font-bold sm:text-4xl text-foreground",
								children: "See how CivicEye works for your team"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm text-muted-foreground leading-relaxed",
								children: "Request a 15-minute product demonstration. We will walk you through photo reporting, staff dispatch, SLA tracking, and resolution verification for your organization."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 pt-4 border-t border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3 text-xs sm:text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheckCircle, { className: "h-5 w-5 text-emerald-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: "Tailored to your organization type"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground",
										children: "Campuses, communities, townships, and facility operations."
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3 text-xs sm:text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiShield, { className: "h-5 w-5 text-blue-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: "No-obligation free pilot"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground",
										children: "Test live workflows with up to 5 staff members at no cost."
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3 text-xs sm:text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiClock, { className: "h-5 w-5 text-amber-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: "Quick response"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground",
										children: "We will confirm your demonstration slot promptly."
									})] })]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "surface-panel p-6 sm:p-8",
							children: submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center py-8 space-y-4",
								role: "status",
								"aria-live": "polite",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-14 w-14 rounded-full bg-emerald-500/15 text-emerald-500 grid place-items-center mx-auto",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheckCircle, { className: "h-8 w-8" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xl font-bold text-foreground",
										children: "Thanks — your demo request has been received."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground max-w-md mx-auto",
										children: "Our team will review your requirements and follow up to schedule a demonstration that fits your organization's workflow."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pt-4 flex flex-col gap-2 sm:flex-row sm:justify-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/",
											className: "inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary",
											children: "Back to home"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => {
												setSubmitted(false);
												setFormData(INITIAL_FORM);
												setErrors({});
												setTouched({});
											},
											className: "inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
											children: "Submit another request"
										})]
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleSubmit,
								className: "space-y-5",
								noValidate: true,
								"aria-label": "Book a Demo request form",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-lg font-bold text-foreground pb-2 border-b border-border",
										children: "Book a Demo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "block text-xs font-bold text-foreground mb-1",
												children: ["Full Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-destructive",
													children: "*"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: formData.fullName,
												onChange: (e) => updateField("fullName", e.target.value),
												onBlur: () => handleBlur("fullName"),
												placeholder: "e.g. Aditi Sharma",
												className: cn("w-full rounded-lg border bg-card/60 px-3.5 py-2.5 min-h-[44px] text-sm outline-none transition-colors focus:border-primary", touched.fullName && errors.fullName ? "border-destructive" : "border-border"),
												autoComplete: "name",
												"aria-invalid": !!(touched.fullName && errors.fullName),
												"aria-describedby": touched.fullName && errors.fullName ? "err-fullName" : void 0
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, {
												message: touched.fullName ? errors.fullName : void 0,
												id: "err-fullName"
											})
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "block text-xs font-bold text-foreground mb-1",
												children: ["Work Email ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-destructive",
													children: "*"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "email",
												value: formData.workEmail,
												onChange: (e) => updateField("workEmail", e.target.value),
												onBlur: () => handleBlur("workEmail"),
												placeholder: "you@organization.com",
												className: cn("w-full rounded-lg border bg-card/60 px-3.5 py-2.5 min-h-[44px] text-sm outline-none transition-colors focus:border-primary", touched.workEmail && errors.workEmail ? "border-destructive" : "border-border"),
												autoComplete: "email",
												"aria-invalid": !!(touched.workEmail && errors.workEmail),
												"aria-describedby": touched.workEmail && errors.workEmail ? "err-workEmail" : void 0
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, {
												message: touched.workEmail ? errors.workEmail : void 0,
												id: "err-workEmail"
											})
										] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "block text-xs font-bold text-foreground mb-1",
											children: ["Organization ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-destructive",
												children: "*"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: formData.organization,
											onChange: (e) => updateField("organization", e.target.value),
											onBlur: () => handleBlur("organization"),
											placeholder: "e.g. Acme Facilities",
											className: cn("w-full rounded-lg border bg-card/60 px-3.5 py-2.5 min-h-[44px] text-sm outline-none transition-colors focus:border-primary", touched.organization && errors.organization ? "border-destructive" : "border-border"),
											autoComplete: "organization",
											"aria-invalid": !!(touched.organization && errors.organization),
											"aria-describedby": touched.organization && errors.organization ? "err-organization" : void 0
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, {
											message: touched.organization ? errors.organization : void 0,
											id: "err-organization"
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "block text-xs font-bold text-foreground mb-1",
											children: ["Your Role ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-destructive",
												children: "*"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											value: formData.role,
											onChange: (e) => updateField("role", e.target.value),
											className: "w-full rounded-lg border border-border bg-card/60 px-3.5 py-2.5 min-h-[44px] text-sm outline-none transition-colors focus:border-primary",
											children: ROLE_OPTIONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: r,
												children: r
											}, r))
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "block text-xs font-bold text-foreground mb-1",
											children: ["Organization Type ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-destructive",
												children: "*"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											value: formData.orgType,
											onChange: (e) => updateField("orgType", e.target.value),
											className: "w-full rounded-lg border border-border bg-card/60 px-3.5 py-2.5 min-h-[44px] text-sm outline-none transition-colors focus:border-primary",
											children: ORG_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: t,
												children: t
											}, t))
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-bold text-foreground mb-1",
										children: "Number of Sites"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: formData.siteCount,
										onChange: (e) => updateField("siteCount", e.target.value),
										className: "w-full rounded-lg border border-border bg-card/60 px-3.5 py-2.5 min-h-[44px] text-sm outline-none transition-colors focus:border-primary",
										children: SITE_COUNTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: s,
											children: s
										}, s))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs font-bold text-foreground mb-1",
										children: [
											"Current Challenge or Question",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground font-normal",
												children: "(optional)"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 3,
										value: formData.message,
										onChange: (e) => updateField("message", e.target.value),
										placeholder: "e.g. We manage 12 campus buildings and need SLA tracking for maintenance...",
										className: "w-full rounded-lg border border-border bg-card/60 px-3.5 py-2.5 min-h-[44px] text-sm outline-none transition-colors focus:border-primary"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pt-1",
										children: [submitError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											role: "alert",
											className: "mt-2 flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2 text-sm text-red-500",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAlertCircle, {
													className: "h-4 w-4 shrink-0",
													"aria-hidden": true
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: submitError }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setSubmitError(null),
													className: "ml-2 hover:text-red-500",
													"aria-label": "Dismiss error",
													children: "×"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "submit",
											disabled: loading,
											className: "w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 min-h-[44px] text-sm font-bold text-white shadow-md transition-all hover:bg-blue-500 disabled:opacity-60",
											children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSend, { className: "h-4 w-4" }), "Book a Demo"]
										})]
									})
								]
							})
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
var $$splitComponentImporter$8 = () => import("./dashboard-ClrrhGC3.mjs");
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, plugin_tooltip, plugin_legend);
var Route$13 = createFileRoute("/dashboard")({
	head: () => ({ meta: [{ title: "Operations Dashboard — CivicEye" }, {
		name: "description",
		content: "Organization dashboard for open civic issues, SLA tracking, assignments, and resolution verification."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var Route$12 = createFileRoute("/faq")({
	head: () => ({ meta: [{ title: "Frequently Asked Questions — CivicEye" }, {
		name: "description",
		content: "Answers about CivicEye issue management, SLA tracking, resolution verification, pricing, organization pilots, and data security."
	}] }),
	component: FaqPage
});
var FAQ_SECTIONS = [
	{
		title: "Product & Capabilities",
		items: [
			{
				q: "What is CivicEye?",
				a: "CivicEye is an operational issue management platform designed for facility management companies, campuses, communities, and operations teams. It provides a single workflow for reporting, assigning, tracking, resolving, and verifying physical-space issues."
			},
			{
				q: "Who is CivicEye for?",
				a: "CivicEye serves facility management companies, corporate and technology campuses, universities and colleges, large residential communities and townships, and public-sector operations teams. It is not a consumer complaint app."
			},
			{
				q: "Why not use WhatsApp?",
				a: "WhatsApp is useful for quick communication but lacks structured ownership, SLA tracking, evidence requirements, and verification workflows. CivicEye provides a systematic process where every issue gets an owner, a deadline, evidence, and a verifiable resolution — things spreadsheets and chat threads cannot enforce."
			},
			{
				q: "Can CivicEye work alongside our existing tools?",
				a: "Yes. CivicEye can complement your existing operations tools. It provides structured intake, SLA tracking, and verification that messaging apps and spreadsheets do not offer. Many organizations use CivicEye as their primary issue-management system while keeping other tools for different purposes."
			}
		]
	},
	{
		title: "Getting Started",
		items: [
			{
				q: "Can we start with one site?",
				a: "Yes. The Free Pilot is designed for single-site deployments. You can evaluate CivicEye with up to 5 staff members and 100 issues per month at no cost. As your operations grow, you can expand to additional sites."
			},
			{
				q: "How does the free pilot work?",
				a: "Organizations can start a free 30-day pilot with up to 5 staff members and 100 issue reports per month. No credit card is required. The pilot includes all core features — reporting, assignment, SLA tracking, evidence capture, and resolution verification."
			},
			{
				q: "How does onboarding work?",
				a: "After requesting a demo, we walk you through the platform and help configure your organization, staff roles, and issue categories. Most organizations are operational within a few hours of setup."
			},
			{
				q: "How can we request a pilot?",
				a: "Click 'Book a Demo' on our website, fill in your organization details, and our team will follow up to schedule a demonstration and set up your pilot workspace."
			}
		]
	},
	{
		title: "Workflow & Operations",
		items: [
			{
				q: "How are issues assigned?",
				a: "Administrators assign issues to specific staff members or teams based on category, location, or department. The assignee receives notification and is responsible for resolution within the configured SLA."
			},
			{
				q: "How is resolution verified?",
				a: "When staff resolve an issue, they must upload photo evidence and completion notes. The reporter or a supervisor then inspects the evidence and confirms resolution or reports it as still unresolved. This ensures work is actually completed — not just marked done."
			},
			{
				q: "Can managers monitor SLA performance?",
				a: "Yes. The operations dashboard shows open issues, SLA status (on track, approaching deadline, overdue), assigned teams, and resolution metrics. Managers can identify bottlenecks and track team performance."
			},
			{
				q: "What happens when an issue becomes overdue?",
				a: "CivicEye tracks SLA timers per issue category. When an issue approaches or exceeds its resolution deadline, the system flags it for attention. Overdue issues are visible in the dashboard and can be escalated."
			},
			{
				q: "Can issues include photos and location?",
				a: "Yes. Photo evidence is mandatory for resolution. Location coordinates are captured automatically via GPS when a reporter submits an issue. Both are visible to assigned staff and managers."
			},
			{
				q: "Can different teams use CivicEye?",
				a: "Yes. Each organization can create departments or wards, assign staff to specific areas, and manage role-based access so teams only see what they are authorized to manage."
			}
		]
	},
	{
		title: "Security & Data",
		items: [
			{
				q: "Is organization data kept isolated?",
				a: "Yes. All organization data, staff profiles, and issue reports are isolated using database-level Row Level Security (RLS) policies and organization-scoped storage buckets. One organization's data is never accessible to another."
			},
			{
				q: "Can users verify resolutions?",
				a: "Yes. Reporters and supervisors can confirm or reject completed work based on the photo evidence provided. This closes the accountability loop and prevents unverified closures."
			},
			{
				q: "Can CivicEye support multiple sites?",
				a: "Yes. Community and Growth plans support multiple departments or wards within a single organization. Enterprise plans support custom configurations for multi-site deployments."
			},
			{
				q: "Where can I learn more about security?",
				a: "Visit our Security page for details on authentication, role-based access, data isolation, database security, and file handling."
			}
		]
	}
];
function FaqPage() {
	const [openKey, setOpenKey] = (0, import_react.useState)("product-0");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "page-container py-12 max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "section-label",
								children: "Help & Answers"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-3xl font-bold sm:text-4xl text-foreground",
								children: "Frequently Asked Questions"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Everything you need to know about CivicEye for your organization."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 space-y-8",
						children: FAQ_SECTIONS.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-bold text-foreground mb-3",
							children: section.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: section.items.map((faq, i) => {
								const key = `${section.title.toLowerCase().replace(/\s+/g, "-")}-${i}`;
								const isOpen = openKey === key;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "surface-panel overflow-hidden border border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setOpenKey(isOpen ? null : key),
										"aria-expanded": isOpen,
										className: "w-full flex items-center justify-between p-4 text-left text-sm font-semibold text-foreground hover:bg-secondary/40 transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-2.5 pr-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiHelpCircle, { className: "h-4 w-4 text-primary shrink-0" }), faq.q]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronDown, { className: cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-180") })]
									}), isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "px-4 pb-4 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border/50 bg-secondary/20",
										children: faq.a
									})]
								}, faq.q);
							})
						})] }, section.title))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-12 text-center surface-panel p-8 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-bold text-foreground",
								children: "Still have questions?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground max-w-md mx-auto",
								children: "Book a 15-minute live demonstration or speak directly with our product team."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2 flex justify-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/book-demo",
									className: "btn-primary px-5 py-2.5 text-sm",
									children: "Book a Demo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/pricing",
									className: "btn-secondary px-5 py-2.5 text-sm",
									children: "View Pricing"
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
var heroStats = [
	{
		label: "Open",
		value: "24",
		color: "text-blue-400"
	},
	{
		label: "On Track",
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
var heroIssues = [
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
function HeroDashboardMock() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "cinematic-product-shell mt-12 mx-auto max-w-3xl text-left",
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
						children: heroStats.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
						className: "mt-4 overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02]",
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
								children: heroIssues.map((issue) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
											className: cn("shrink-0 text-right text-[11px]", issue.sla === "Overdue" ? "text-amber-400" : "text-slate-400"),
											children: issue.sla
										})
									]
								}, issue.id))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center justify-between text-[11px] text-slate-500",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Showing 4 of 24 open issues" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Updated just now" })]
					})
				]
			})
		]
	});
}
var Route$11 = createFileRoute("/for-organizations")({
	head: () => ({ meta: [{ title: "CivicEye for Organizations — Civic Operations Platform" }, {
		name: "description",
		content: "CivicEye helps RWAs, universities, townships, campuses, and facility managers report, assign, track, and verify local issues from one platform."
	}] }),
	component: ForOrganizationsPage
});
var TARGET_ORGS = [
	{
		title: "Residential Communities & RWAs",
		desc: "Empower residents with a 30-second issue reporting link. Track pothole repairs, waste collection, and lighting outages with full accountability.",
		image: "/assets/residential-1600.jpg",
		featured: true
	},
	{
		title: "Universities & Campuses",
		desc: "Streamline campus maintenance across academic blocks, hostels, and sports facilities with automated staff routing and SLA visibility.",
		image: "/assets/university-campus-india.svg",
		featured: false
	},
	{
		title: "Corporate & Tech Campuses",
		desc: "Keep multi-building office parks operational. Assign facility tickets instantly and verify completion with mandatory photo evidence.",
		image: "/assets/corporate-1600.jpg",
		featured: false
	},
	{
		title: "Integrated Townships & Estates",
		desc: "Centralize infrastructure maintenance across large residential townships. Monitor problem hotspots on interactive maps.",
		image: "/assets/township-1600.jpg",
		featured: false
	},
	{
		title: "Facility Management Companies",
		desc: "Manage client SLA commitments, track vendor resolution times, and maintain a tamper-proof digital audit history of all repairs.",
		image: "/assets/facility-1600.jpg",
		featured: false
	}
];
var WORKFLOW_STAGES = [
	{
		step: "01",
		title: "Report",
		text: "Capture the issue with photo and location."
	},
	{
		step: "02",
		title: "Assign",
		text: "Route responsibility to the appropriate team."
	},
	{
		step: "03",
		title: "Track",
		text: "Monitor progress and SLA timelines."
	},
	{
		step: "04",
		title: "Resolve",
		text: "Require evidence and work notes."
	},
	{
		step: "05",
		title: "Verify",
		text: "Let the reporter confirm whether the issue was actually resolved."
	}
];
function ForOrganizationsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, { variant: "cinematic" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "cinematic-hero relative overflow-hidden py-16 lg:py-24",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "cinematic-hero-bg",
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "page-container relative z-10 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl max-w-4xl mx-auto",
									children: [
										"Operational issues,",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "bg-gradient-to-r from-blue-400 via-indigo-200 to-sky-300 bg-clip-text text-transparent",
											children: "from report to verified resolution."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 text-slate-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed",
									children: "Give organizations and communities one accountable workflow to report issues, assign responsibility, track progress, and verify completed work."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 flex flex-wrap items-center justify-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/book-demo",
										className: "cinematic-btn-primary group shadow-lg shadow-blue-900/30",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Book a Demo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, { className: "h-4 w-4" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/pricing",
										className: "cinematic-btn-secondary",
										children: "View Pricing"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroDashboardMock, {})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "solutions",
						className: "py-16 bg-background",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "page-container",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center max-w-2xl mx-auto",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "section-label",
										children: "The Problem"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-2 text-3xl font-bold sm:text-4xl text-foreground",
										children: "Most civic operations still run on WhatsApp and spreadsheets"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm text-muted-foreground sm:text-base",
										children: "Complaints get lost in email threads. There is no SLA tracking. Nobody knows who is responsible. Issues get marked \"done\" without verification. There is no audit trail."
									})
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "py-16 bg-secondary/30 border-y border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "page-container",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center max-w-2xl mx-auto",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "section-label",
									children: "Solutions"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 text-3xl font-bold sm:text-4xl text-foreground",
									children: "Built for teams responsible for real-world spaces"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-6",
								children: TARGET_ORGS.map((org) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: cn("solution-card group flex flex-col overflow-hidden", org.featured ? "lg:col-span-6" : "lg:col-span-3"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative overflow-hidden",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: org.image,
											alt: org.title,
											loading: "lazy",
											decoding: "async",
											className: "aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent",
											"aria-hidden": true
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-1 flex-col p-6",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-lg font-bold tracking-tight text-foreground sm:text-xl",
												children: org.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-sm leading-relaxed text-muted-foreground",
												children: org.desc
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/book-demo",
												className: "mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-primary transition-colors hover:text-primary/80",
												children: ["Explore solution", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, { className: "h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" })]
											})
										]
									})]
								}, org.title))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "workflow",
						className: "py-16 bg-background",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "page-container",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center max-w-2xl mx-auto",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "section-label",
										children: "How It Works"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-2 text-3xl font-bold sm:text-4xl text-foreground",
										children: "The CivicEye operational workflow"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm text-muted-foreground",
										children: "End-to-end operational clarity from the second a problem is spotted until reporter verification."
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5",
								children: WORKFLOW_STAGES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "landing-workflow-card",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-mono font-bold text-primary",
											children: s.step
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-2 text-base font-bold text-foreground",
											children: s.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-xs text-muted-foreground leading-relaxed",
											children: s.text
										})
									]
								}, s.step))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "py-16 bg-secondary/30 border-y border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "page-container space-y-12",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid md:grid-cols-2 gap-8 items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "section-label",
										children: "Evidence & Accountability"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-2 text-2xl font-bold sm:text-3xl text-foreground",
										children: "No ticket is closed without verified evidence"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm text-muted-foreground leading-relaxed",
										children: "Field staff cannot mark an issue resolved without attaching photo evidence. Reporters verify the work on-site, ensuring true operational accountability."
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "surface-panel p-6 space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3 text-sm font-semibold",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheckCircle, { className: "text-emerald-500 h-5 w-5" }), " Mandatory after-fix photo upload"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3 text-sm font-semibold",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheckCircle, { className: "text-emerald-500 h-5 w-5" }), " Reporter confirm / reopen flow"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3 text-sm font-semibold",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheckCircle, { className: "text-emerald-500 h-5 w-5" }), " Complete audit trail history"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3 text-sm font-semibold",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheckCircle, { className: "text-emerald-500 h-5 w-5" }), " SLA timers and breach alerts"]
										})
									]
								})]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "py-16 bg-background",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "page-container",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center max-w-2xl mx-auto",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "section-label",
										children: "Security"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-2 text-3xl font-bold sm:text-4xl text-foreground",
										children: "Organization-isolated by design"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm text-muted-foreground sm:text-base",
										children: "Each organization's data, staff, and files are isolated at the database level. Role-based access ensures staff only see what they are authorized to manage."
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-10 grid gap-4 sm:grid-cols-3",
								children: [
									{
										icon: FiShield,
										title: "Row Level Security",
										text: "Database-enforced data isolation between organizations."
									},
									{
										icon: FiClock,
										title: "Role-Based Access",
										text: "Staff members, admins, and reporters have distinct capabilities."
									},
									{
										icon: FiMapPin,
										title: "Location-Aware",
										text: "Geo-tagged reports with interactive map visualization."
									}
								].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "landing-feature-card p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-primary",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
												className: "h-4 w-4",
												"aria-hidden": true
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-4 text-base font-semibold",
											children: item.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm leading-relaxed text-muted-foreground",
											children: item.text
										})
									]
								}, item.title))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "py-16 bg-slate-950 text-white border-t border-white/10 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "page-container max-w-3xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-3xl font-bold sm:text-4xl",
									children: "Ready to pilot CivicEye in your organization?"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-slate-300 text-sm sm:text-base",
									children: "Set up your organization workspace in minutes. Request a walkthrough with our product team."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 flex flex-wrap items-center justify-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/book-demo",
										className: "cinematic-btn-primary",
										children: ["Book a Demo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, {})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/pricing",
										className: "cinematic-btn-secondary",
										children: "View Pricing"
									})]
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
var $$splitComponentImporter$7 = () => import("./login-UklEZ8ws.mjs");
var Route$10 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Sign in — CivicEye Admin" }, {
		name: "description",
		content: "Sign in to the CivicEye admin console to triage and resolve city issue reports."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./map-A3VTXo38.mjs");
var Route$9 = createFileRoute("/map")({
	head: () => ({ meta: [
		{ title: "Live Issue Map — CivicEye" },
		{
			name: "description",
			content: "See every reported city problem plotted on an interactive OpenStreetMap with photos, categories and live status."
		},
		{
			property: "og:title",
			content: "Live Issue Map — CivicEye"
		},
		{
			property: "og:description",
			content: "Interactive map of civic issues across the city."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./onboarding-BdCmp8f3.mjs");
var Route$8 = createFileRoute("/onboarding")({
	head: () => ({ meta: [{ title: "Quick Tour — CivicEye" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./pricing-CWQcwpvw.mjs");
var Route$7 = createFileRoute("/pricing")({
	head: () => ({ meta: [{ title: "Pricing — CivicEye" }, {
		name: "description",
		content: "Organization-based pricing for CivicEye. Start a free pilot or choose a plan that fits your operations."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var Route$6 = createFileRoute("/privacy")({
	head: () => ({ meta: [{ title: "Privacy Policy — CivicEye" }, {
		name: "description",
		content: "CivicEye Privacy Policy describing how organization data, issue reports, and photo evidence are collected, used, and protected."
	}] }),
	component: PrivacyPage
});
function PrivacyPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "page-container py-12 max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-bold text-foreground",
						children: "Privacy Policy"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs font-mono text-muted-foreground",
						children: "Last updated: August 2026"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: "This policy describes how CivicEye collects, uses, and protects data. If you need legal review of this policy, please contact us."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 space-y-8 text-sm text-muted-foreground leading-relaxed",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-base font-bold text-foreground",
										children: "1. Data We Collect"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "CivicEye collects information necessary to operate the issue management platform:" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
										className: "ml-4 space-y-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-start gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground/50 mt-0.5 shrink-0",
													children: "•"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-foreground",
													children: "Issue reports:"
												}), " descriptions, categories, photo evidence, and location coordinates submitted by reporters."] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-start gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground/50 mt-0.5 shrink-0",
													children: "•"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-foreground",
													children: "Staff profiles:"
												}), " names, email addresses, and role assignments managed by organization administrators."] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-start gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground/50 mt-0.5 shrink-0",
													children: "•"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-foreground",
													children: "Operational data:"
												}), " assignment records, status changes, resolution notes, and verification actions."] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-start gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground/50 mt-0.5 shrink-0",
													children: "•"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-foreground",
													children: "Demo requests:"
												}), " name, email, organization, and role information submitted through the Book a Demo form."] })]
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-base font-bold text-foreground",
										children: "2. How We Use Data"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "All collected data is used exclusively for operating the CivicEye platform:" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
										className: "ml-4 space-y-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-start gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground/50 mt-0.5 shrink-0",
													children: "•"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Issue reports and photo evidence are used for maintenance routing, staff dispatch, and resolution verification." })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-start gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground/50 mt-0.5 shrink-0",
													children: "•"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Staff profile data is used for authentication, role enforcement, and audit trails." })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-start gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground/50 mt-0.5 shrink-0",
													children: "•"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Demo request information is used to schedule and conduct product demonstrations." })]
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-base font-bold text-foreground",
									children: "3. Organization Data Isolation"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "All organization data — issues, staff records, files, and resolution history — is strictly isolated at the database level using Row Level Security (RLS) policies and organization-scoped storage buckets. One organization's data is never accessible to another." })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-base font-bold text-foreground",
									children: "4. Photo Evidence & Location Data"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Uploaded issue images and GPS coordinates are stored in private, organization-scoped storage buckets. These are used exclusively for maintenance routing, staff dispatch, and reporter resolution verification. Images are not publicly accessible." })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-base font-bold text-foreground",
									children: "5. Data Sharing"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "CivicEye does not sell, rent, or share organization data with third parties. Infrastructure is provided by Supabase (hosted PostgreSQL), which operates under their own security and privacy policies." })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-base font-bold text-foreground",
									children: "6. Data Retention"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Organization data is retained for as long as the organization maintains an active account. Demo request information is retained for follow-up purposes. We do not currently offer automated data export or deletion — contact us to request either." })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-base font-bold text-foreground",
									children: "7. Contact Us"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"For privacy inquiries, data access requests, or deletion requests, contact us at",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "mailto:privacy@civiceye.in",
										className: "text-primary hover:underline",
										children: "privacy@civiceye.in"
									}),
									"."
								] })]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
/** Filename-keyword classifier (P3 will replace with real vision API). */
function predictCategory(filename) {
	const name = filename.toLowerCase();
	if (name.includes("pothole")) return {
		category: "Pothole",
		confidence: 96
	};
	if (name.includes("garbage")) return {
		category: "Garbage",
		confidence: 95
	};
	if (name.includes("tree")) return {
		category: "Fallen Tree",
		confidence: 94
	};
	if (name.includes("water")) return {
		category: "Water Leakage",
		confidence: 93
	};
	if (name.includes("light")) return {
		category: "Broken Street Light",
		confidence: 97
	};
	return {
		category: "Road Damage",
		confidence: 90
	};
}
var TITLE_TEMPLATES = {
	Pothole: "Pothole on the road",
	Garbage: "Garbage / waste issue",
	"Fallen Tree": "Fallen tree blocking the way",
	"Water Leakage": "Water leak or flooding",
	"Broken Street Light": "Street light not working",
	"Road Damage": "Road damage or broken surface"
};
var DESCRIPTION_TEMPLATES = {
	Pothole: "A pothole was spotted and needs repair. It may be unsafe for vehicles and pedestrians.",
	Garbage: "Waste or an overflowing bin needs collection. There may be smell or hygiene concerns.",
	"Fallen Tree": "A fallen tree or branch is blocking the road or footpath.",
	"Water Leakage": "Water is leaking or pooling on the street and needs urgent attention.",
	"Broken Street Light": "Street lighting is out, making the area unsafe after dark.",
	"Road Damage": "The road surface is damaged and may cause accidents."
};
function suggestTitle(category) {
	return TITLE_TEMPLATES[category] ?? category;
}
function suggestDescription(category) {
	return DESCRIPTION_TEMPLATES[category] ?? `Issue related to: ${category}`;
}
function suggestLocationLabel() {
	return "Near my current location";
}
/** Minimum fields needed for a valid quick report. */
function buildQuickReportPayload(input) {
	const catLabel = input.category;
	return {
		title: input.title?.trim() || suggestTitle(catLabel),
		description: input.description?.trim() || suggestDescription(catLabel),
		location: input.location?.trim() || suggestLocationLabel(),
		lat: input.lat,
		lng: input.lng,
		category: catLabel
	};
}
function requestDeviceLocation() {
	return new Promise((resolve, reject) => {
		if (!navigator.geolocation) {
			reject(/* @__PURE__ */ new Error("unsupported"));
			return;
		}
		navigator.geolocation.getCurrentPosition((pos) => resolve({
			lat: pos.coords.latitude,
			lng: pos.coords.longitude
		}), (err) => reject(err), {
			enableHighAccuracy: true,
			timeout: 12e3,
			maximumAge: 6e4
		});
	});
}
var LocationPicker = (0, import_react.lazy)(() => import("./LocationPicker-BgF18Zad.mjs"));
var MAX_IMAGE_BYTES = 8 * 1024 * 1024;
var Route$5 = createFileRoute("/report")({
	head: () => ({ meta: [{ title: "Report a Civic Issue — CivicEye" }, {
		name: "description",
		content: "Report a city issue with photo evidence, GPS pin location, and category suggestion."
	}] }),
	component: ReportPage
});
function ReportPage() {
	useNavigate();
	const { create } = useReportMutations();
	const configured = isSupabaseConfigured();
	getSupabaseConfigError();
	const orgMissing = configured && !getDefaultOrganizationId();
	const hydrated = useHydrated();
	const fileInputRef = (0, import_react.useRef)(null);
	const [imagePreview, setImagePreview] = (0, import_react.useState)(null);
	const [imageFile, setImageFile] = (0, import_react.useState)(null);
	const [zoom, setZoom] = (0, import_react.useState)(null);
	const [ai, setAi] = (0, import_react.useState)(null);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [uploadPhase, setUploadPhase] = (0, import_react.useState)("idle");
	const [error, setError] = (0, import_react.useState)(null);
	const [showDetails, setShowDetails] = (0, import_react.useState)(false);
	const [category, setCategory] = (0, import_react.useState)("Pothole");
	const [customCategory, setCustomCategory] = (0, import_react.useState)("");
	const [title, setTitle] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [location, setLocation] = (0, import_react.useState)("");
	const [lat, setLat] = (0, import_react.useState)(null);
	const [lng, setLng] = (0, import_react.useState)(null);
	const [geoStatus, setGeoStatus] = (0, import_react.useState)("idle");
	const [usingFallbackLocation, setUsingFallbackLocation] = (0, import_react.useState)(false);
	const [step, setStep] = (0, import_react.useState)(1);
	const [submittedReportId, setSubmittedReportId] = (0, import_react.useState)(null);
	const captureLocation = (0, import_react.useCallback)(async (silent = false) => {
		setGeoStatus("loading");
		setUsingFallbackLocation(false);
		try {
			const coords = await requestDeviceLocation();
			setLat(coords.lat);
			setLng(coords.lng);
			setGeoStatus("ready");
			if (!silent) toast.success("GPS Location captured successfully");
		} catch (err) {
			if ((err instanceof GeolocationPositionError ? err.code : null) === 1) {
				setGeoStatus("denied");
				if (!silent) toast.error("GPS permission denied — pick a spot on the interactive map");
			} else if (String(err).includes("unsupported")) {
				setGeoStatus("unsupported");
				if (!silent) toast.error("Geolocation not supported on this browser — pick map pin");
			} else {
				setGeoStatus("denied");
				if (!silent) toast.error("Could not capture GPS — pick location on map below");
			}
			setLat(DEFAULT_MAP_CENTER.lat);
			setLng(DEFAULT_MAP_CENTER.lng);
			setUsingFallbackLocation(true);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		captureLocation(true);
	}, [captureLocation]);
	const applyCategory = (next, fromAi = false) => {
		setCategory(next);
		if (next !== "Other" && (!title.trim() || fromAi)) setTitle(suggestTitle(next));
		if (next !== "Other" && (!description.trim() || fromAi)) setDescription(suggestDescription(next));
	};
	const onFile = (file) => {
		if (!file) return;
		setError(null);
		if (!file.type.startsWith("image/")) {
			setError("Please select a valid image file (JPEG, PNG, or WebP).");
			toast.error("Invalid file type");
			return;
		}
		if (file.size > MAX_IMAGE_BYTES) {
			setError(`Image size must be under ${MAX_IMAGE_BYTES / (1024 * 1024)} MB.`);
			toast.error("Image too large");
			return;
		}
		setImageFile(file);
		const reader = new FileReader();
		reader.onerror = () => {
			setError("Could not read the selected photo.");
			toast.error("Failed to read image");
		};
		reader.onload = () => {
			setImagePreview(reader.result);
			const result = predictCategory(file.name);
			setAi(result);
			applyCategory(result.category, true);
			toast.success(`Photo attached — suggested category: "${result.category}"`);
		};
		reader.readAsDataURL(file);
	};
	const readyToSubmit = lat !== null && lng !== null && !submitting && configured && !orgMissing && geoStatus !== "loading" && (category !== "Other" || customCategory.trim().length > 0);
	const handleLocationPick = (nextLat, nextLng) => {
		if (!isValidCoordinate(nextLat, nextLng)) {
			toast.error("Invalid coordinates — please select a valid location on map");
			return;
		}
		setLat(nextLat);
		setLng(nextLng);
		setGeoStatus("ready");
		setUsingFallbackLocation(false);
	};
	const clearImage = () => {
		setImagePreview(null);
		setImageFile(null);
		setAi(null);
		if (fileInputRef.current) fileInputRef.current.value = "";
	};
	const submit = async (e) => {
		e?.preventDefault();
		setError(null);
		if (lat === null || lng === null) {
			toast.error("Location required — select location on map or request GPS");
			return;
		}
		const resolvedCategory = category === "Other" && customCategory.trim() ? customCategory.trim() : category;
		if (category === "Other" && !customCategory.trim()) {
			setError("Please describe the issue category when selecting Other.");
			toast.error("Custom category description is required");
			return;
		}
		setSubmitting(true);
		setUploadPhase(imageFile && configured ? "uploading" : "saving");
		try {
			const payload = buildQuickReportPayload({
				category: resolvedCategory,
				lat,
				lng,
				title,
				description,
				location
			});
			if (!configured) throw new Error("Report submission is unavailable — Supabase is not configured. Please contact your administrator.");
			if (imageFile) setUploadPhase("uploading");
			const created = await create.mutateAsync({
				...payload,
				imageFile,
				aiCategory: ai?.category ?? null,
				aiConfidence: ai?.confidence ?? null
			});
			setSubmittedReportId(created.id);
			setStep(5);
			toast.success("Report submitted successfully to operations queue");
		} catch (err) {
			const message = err instanceof Error ? err.message : "Submission failed";
			setError(message);
			toast.error(message);
		} finally {
			setSubmitting(false);
			setUploadPhase("idle");
		}
	};
	const copyRef = async () => {
		if (!submittedReportId) return;
		try {
			await navigator.clipboard.writeText(submittedReportId);
			toast.success("Reference ID copied to clipboard");
		} catch {
			toast.error("Could not copy reference ID");
		}
	};
	const submitLabel = uploadPhase === "uploading" ? "Uploading photo evidence…" : uploadPhase === "saving" ? "Submitting report…" : "Submit report to operations";
	const fieldClass = "mt-1.5 w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Report a Civic Issue",
		subtitle: "Photo → Category → Location → Accountable Action",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl",
				children: [
					!configured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAlertCircle, { className: "mt-0.5 h-5 w-5 shrink-0 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold text-amber-600 dark:text-amber-400",
									children: "Database Not Configured"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-muted-foreground",
									children: "Supabase environment variables are not set for this deployment. Report submission requires database access."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 rounded-lg border border-amber-500/20 bg-background/50 p-3 text-xs font-mono space-y-1",
									children: (() => {
										const s = getSupabaseConfigSummary();
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: s.urlPresent ? "text-emerald-500" : "text-destructive",
												children: [
													s.urlPresent ? "✓" : "✗",
													" VITE_SUPABASE_URL —",
													" ",
													s.urlPresent ? "detected" : "missing or placeholder"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: s.keyPresent ? "text-emerald-500" : "text-destructive",
												children: [
													s.keyPresent ? "✓" : "✗",
													" VITE_SUPABASE_ANON_KEY —",
													" ",
													s.keyPresent ? "detected" : "missing or placeholder"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: s.orgPresent ? "text-emerald-500" : "text-destructive",
												children: [
													s.orgPresent ? "✓" : "✗",
													" VITE_DEFAULT_ORGANIZATION_ID —",
													" ",
													s.orgPresent ? "detected" : "missing"
												]
											})
										] });
									})()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-xs text-muted-foreground",
									children: [
										"Copy ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
											className: "font-mono font-semibold",
											children: ".env.example"
										}),
										" to",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
											className: "font-mono font-semibold",
											children: ".env"
										}),
										" and set the variables above with your Supabase project credentials."
									]
								})
							] })]
						})
					}),
					orgMissing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAlertCircle, { className: "mt-0.5 h-5 w-5 shrink-0 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-bold text-amber-500",
							children: "Configuration Required"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-muted-foreground",
							children: "The default organization is not configured. Please contact your administrator to complete environment setup before submitting reports."
						})] })]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex items-center justify-between rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAlertCircle, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setError(null),
							className: "text-xs font-semibold hover:underline",
							children: "Dismiss"
						})]
					}),
					step === 5 && submittedReportId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-panel p-6 sm:p-8 text-center space-y-6 cinematic-reveal",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-500",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheckCircle, { className: "h-8 w-8" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-mono font-semibold uppercase tracking-wider text-emerald-500",
									children: "Intake Confirmed"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 text-2xl font-bold",
									children: "Report Submitted Successfully"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground max-w-md mx-auto",
									children: "Your report has been received and routed to your organization's operations dashboard for staff assignment and SLA tracking."
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mx-auto max-w-md rounded-xl border border-border bg-secondary/50 p-4 text-left space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground font-medium",
											children: "Reference ID"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => void copyRef(),
											className: "inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiClipboard, {}), " Copy ID"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-mono text-lg font-bold text-foreground tracking-wide",
										children: ["#", submittedReportId.slice(0, 8).toUpperCase()]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-2 text-xs pt-2 border-t border-border",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground block",
											children: "Category"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold",
											children: category === "Other" ? customCategory.trim() || "Other" : category
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground block",
											children: "Status"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-amber-500",
											children: "Pending Intake"
										})] })]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-center gap-3 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										setStep(1);
										setImagePreview(null);
										setImageFile(null);
										setTitle("");
										setDescription("");
										setCustomCategory("");
										setSubmittedReportId(null);
									},
									className: "btn-secondary px-5 py-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiRefreshCw, {}), " Submit another report"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/reports",
									search: { submitted: submittedReportId },
									className: "btn-primary px-6 py-2.5",
									children: ["View in reports queue ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, {})]
								})]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submit,
						className: "pb-24 lg:pb-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
								"aria-label": "Report wizard steps",
								className: "mb-6 grid grid-cols-4 gap-2",
								children: [
									{
										n: 1,
										label: "Evidence",
										desc: "Photo"
									},
									{
										n: 2,
										label: "Category",
										desc: "Type"
									},
									{
										n: 3,
										label: "Location",
										desc: "Map/GPS"
									},
									{
										n: 4,
										label: "Review",
										desc: "Submit"
									}
								].map(({ n, label, desc }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setStep(n),
									className: cn("flex flex-col items-center gap-1 rounded-xl border p-3 text-center transition-all duration-150", step === n ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary/30" : step > n ? "border-emerald-500/30 bg-emerald-500/5 text-foreground" : "border-border bg-card text-muted-foreground hover:bg-secondary"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("grid h-6 w-6 place-items-center rounded-full text-xs font-semibold transition-colors", step === n ? "bg-primary text-primary-foreground" : step > n ? "bg-emerald-500 text-white" : "bg-secondary text-muted-foreground"),
											children: step > n ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, { className: "h-3.5 w-3.5" }) : n
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold",
											children: label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden text-[10px] text-muted-foreground sm:inline",
											children: desc
										})
									]
								}, n))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: cn("surface-panel p-5 sm:p-6", step !== 1 && "hidden lg:block"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-mono font-semibold uppercase tracking-wider text-primary",
											children: "Step 1 of 4"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-lg font-bold",
											children: "Photo Evidence"
										})] }), imagePreview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500 border border-emerald-500/20",
											children: "Photo Attached"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: "Attach a clear photo of the issue. Camera capture recommended on mobile devices."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										ref: fileInputRef,
										type: "file",
										accept: "image/jpeg,image/png,image/webp",
										capture: "environment",
										className: "hidden",
										onChange: (e) => onFile(e.target.files?.[0])
									}),
									imagePreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 space-y-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative overflow-hidden rounded-xl border border-border group",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: imagePreview,
												alt: "Selected report photo preview",
												className: "h-56 w-full object-cover sm:h-64 cursor-pointer",
												onClick: () => setZoom(imagePreview)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setZoom(imagePreview),
													className: "rounded-lg bg-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md hover:bg-white/30",
													children: "View Fullscreen"
												})
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => fileInputRef.current?.click(),
												className: "text-xs font-semibold text-primary hover:underline flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiRefreshCw, { className: "h-3 w-3" }), " Change Photo"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: clearImage,
												className: "text-xs font-semibold text-destructive hover:underline flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { className: "h-3.5 w-3.5" }), " Remove Photo"]
											})]
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => fileInputRef.current?.click(),
										className: "mt-4 flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-secondary/40 px-4 py-12 transition-all hover:border-primary/50 hover:bg-secondary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-md",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCamera, { className: "h-7 w-7" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-bold",
												children: "Snap or Upload Photo Evidence"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-xs text-muted-foreground",
												children: "JPG, PNG, or WebP up to 8MB"
											})]
										})]
									}),
									step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setStep(2),
										className: "btn-primary mt-6 w-full lg:hidden",
										children: ["Continue to Category ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, {})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: cn("surface-panel mt-5 p-5 sm:p-6", step !== 2 && step !== 1 && "hidden lg:block"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-mono font-semibold uppercase tracking-wider text-primary",
											children: "Step 2 of 4"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-lg font-bold",
											children: "Select Category"
										})] }), ai && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20",
											children: [
												"Suggested: ",
												ai.category,
												" (",
												ai.confidence,
												"%)"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5",
										children: CATEGORIES.map((c) => {
											const isSelected = category === c;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => {
													applyCategory(c);
													if (c !== "Other") setCustomCategory("");
												},
												className: cn("flex items-center justify-between rounded-xl border p-3 text-left transition-all text-xs font-bold", isSelected ? "border-primary bg-primary text-primary-foreground shadow-sm" : "border-border bg-card hover:bg-secondary text-foreground"),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c === "Other" ? "Other / Describe your issue" : c }), isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, { className: "h-4 w-4 shrink-0" })]
											}, c);
										})
									}),
									category === "Other" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-sm font-semibold text-foreground",
												children: "Describe the issue category"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												value: customCategory,
												onChange: (e) => setCustomCategory(e.target.value),
												placeholder: "e.g. Broken water pipeline, Park bench vandalism, Noise complaint…",
												rows: 3,
												className: fieldClass,
												autoFocus: true
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: "Type a short description of the issue category so staff can triage it correctly."
											})
										]
									}),
									step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setStep(3),
										className: "btn-primary mt-6 w-full lg:hidden",
										children: ["Continue to Location ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, {})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: cn("surface-panel mt-5 p-5 sm:p-6", step !== 3 && step < 3 && "hidden lg:block"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-mono font-semibold uppercase tracking-wider text-primary",
											children: "Step 3 of 4"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-lg font-bold",
											children: "Issue Location"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => void captureLocation(false),
											className: "btn-secondary text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMapPin, { className: "h-3.5 w-3.5" }), " Re-detect GPS"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex items-center gap-2 text-xs",
										children: [
											geoStatus === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-muted-foreground flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary border-t-transparent" }), "Fetching GPS location…"]
											}),
											geoStatus === "ready" && lat !== null && lng !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-emerald-500 font-semibold flex items-center gap-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, { className: "h-4 w-4" }),
													" Location Locked: ",
													lat.toFixed(4),
													",",
													" ",
													lng.toFixed(4)
												]
											}),
											usingFallbackLocation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-amber-500 flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiInfo, { className: "h-4 w-4" }), " Approximate location — drag pin on map below"]
											})
										]
									}),
									lat !== null && lng !== null && hydrated && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
											fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Loading interactive map" }),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocationPicker, {
												lat,
												lng,
												onChange: handleLocationPick,
												className: "h-56 w-full overflow-hidden rounded-xl border border-border sm:h-64"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-muted-foreground",
											children: "Tap anywhere on the map or drag the pin to set exact coordinates."
										})]
									}),
									step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setStep(4),
										className: "btn-primary mt-6 w-full lg:hidden",
										children: ["Review & Submit ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, {})]
									})
								]
							}),
							(step === 4 || step === 3) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: cn("surface-panel mt-5 p-5 sm:p-6", step !== 4 && "hidden lg:block"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-mono font-semibold uppercase tracking-wider text-primary",
										children: "Step 4 of 4"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-lg font-bold",
										children: "Review Report"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 rounded-xl border border-border bg-secondary/40 p-4 space-y-3 text-xs sm:text-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between border-b border-border pb-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "Category"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold",
													children: category === "Other" ? customCategory.trim() || "Other" : category
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between border-b border-border pb-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "Coordinates"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-mono font-semibold",
													children: [
														lat?.toFixed(5),
														", ",
														lng?.toFixed(5)
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "Photo Attached"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-emerald-500",
													children: imagePreview ? "Yes" : "None"
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-5 border-t border-border pt-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setShowDetails((v) => !v),
											className: "flex w-full items-center justify-between text-left text-xs font-bold text-muted-foreground hover:text-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Add title, description, or landmark (Optional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronDown, { className: cn("h-4 w-4 transition-transform", showDetails && "rotate-180") })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
											initial: false,
											children: showDetails && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
												initial: {
													height: 0,
													opacity: 0
												},
												animate: {
													height: "auto",
													opacity: 1
												},
												exit: {
													height: 0,
													opacity: 0
												},
												className: "overflow-hidden space-y-3 pt-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
														className: "block",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-xs font-semibold text-muted-foreground",
															children: "Report Title"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															value: title,
															onChange: (e) => setTitle(e.target.value),
															placeholder: suggestTitle(category),
															className: fieldClass
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
														className: "block",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-xs font-semibold text-muted-foreground",
															children: "Detailed Description"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
															value: description,
															onChange: (e) => setDescription(e.target.value),
															rows: 3,
															placeholder: suggestDescription(category),
															className: fieldClass
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
														className: "block",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-xs font-semibold text-muted-foreground",
															children: "Landmark / Place Name"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															value: location,
															onChange: (e) => setLocation(e.target.value),
															placeholder: "e.g. Near Main Gate entrance",
															className: fieldClass
														})]
													})
												]
											})
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: !readyToSubmit,
								className: "btn-primary mt-6 hidden w-full lg:flex justify-center py-3 text-base shadow-md",
								children: [submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSend, { className: "h-5 w-5" }), submitLabel]
							})
						]
					})
				]
			}),
			step !== 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-x-0 bottom-0 z-[850] border-t border-border bg-background/95 p-4 backdrop-blur-lg lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: !readyToSubmit,
					onClick: () => void submit(),
					className: "btn-primary w-full shadow-lg py-3 text-sm",
					children: [submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSend, {}), submitLabel]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageModal, {
				src: zoom,
				onClose: () => setZoom(null)
			})
		]
	});
}
var $$splitComponentImporter$3 = () => import("./reports-BUmb4X-D.mjs");
var reportsSearchSchema = objectType({
	assigned: literalType("me").optional(),
	overdue: booleanType().optional(),
	submitted: stringType().optional()
});
var Route$4 = createFileRoute("/reports")({
	validateSearch: (search) => reportsSearchSchema.parse({
		assigned: search.assigned === "me" ? "me" : void 0,
		overdue: search.overdue === "1" || search.overdue === true ? true : void 0,
		submitted: typeof search.submitted === "string" && search.submitted.trim() ? search.submitted.trim() : void 0
	}),
	head: () => ({ meta: [{ title: "Civic Reports — CivicEye" }, {
		name: "description",
		content: "Browse and track civic issue reports — filter by category, status, and location."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./security-CFAuMtbl.mjs");
var Route$3 = createFileRoute("/security")({
	head: () => ({ meta: [{ title: "Security & Trust — CivicEye" }, {
		name: "description",
		content: "How CivicEye protects organization data with database-level isolation, role-based access, and evidence-backed workflows."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./signup-CnIsn2mw.mjs");
var Route$2 = createFileRoute("/signup")({
	head: () => ({ meta: [{ title: "Sign up — CivicEye Admin" }, {
		name: "description",
		content: "Create an account to access the CivicEye admin console."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var Route$1 = createFileRoute("/terms")({
	head: () => ({ meta: [{ title: "Terms of Service — CivicEye" }, {
		name: "description",
		content: "CivicEye Terms of Service governing platform usage for subscribing organizations and their staff and community members."
	}] }),
	component: TermsPage
});
function TermsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "page-container py-12 max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-bold text-foreground",
						children: "Terms of Service"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs font-mono text-muted-foreground",
						children: "Last updated: August 2026"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: "These terms govern your use of the CivicEye platform. If you need legal review, please contact us."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 space-y-8 text-sm text-muted-foreground leading-relaxed",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-base font-bold text-foreground",
									children: "1. Acceptance of Terms"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "By accessing or using the CivicEye platform, you agree to comply with these Terms of Service. CivicEye provides issue management software for facility management companies, campuses, communities, and operations teams." })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-base font-bold text-foreground",
										children: "2. Organization Responsibilities"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Subscribing organizations are responsible for:" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
										className: "ml-4 space-y-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-start gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground/50 mt-0.5 shrink-0",
													children: "•"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Managing staff access and role assignments within the platform." })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-start gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground/50 mt-0.5 shrink-0",
													children: "•"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ensuring accurate maintenance assignments and timely resolution of reported issues." })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-start gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground/50 mt-0.5 shrink-0",
													children: "•"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Maintaining appropriate operational SLAs for their community, campus, or facility." })]
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-base font-bold text-foreground",
									children: "3. User Conduct"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Users must provide honest issue reports with accurate photo evidence and location information. Submitting fraudulent, offensive, or malicious content is strictly prohibited." })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-base font-bold text-foreground",
									children: "4. Service Availability"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "CivicEye strives for high availability but does not guarantee uninterrupted service. Scheduled maintenance windows and platform updates may temporarily affect availability. We will communicate planned maintenance in advance." })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-base font-bold text-foreground",
									children: "5. Limitation of Liability"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "CivicEye is provided as-is for operational issue management. We are not liable for any damages arising from use of the platform. Organizations are responsible for their own operational decisions and maintenance outcomes." })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-base font-bold text-foreground",
									children: "6. Changes to Terms"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We may update these terms as the platform evolves. Material changes will be communicated to subscribed organizations. Continued use of the platform after changes constitutes acceptance of the updated terms." })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-base font-bold text-foreground",
									children: "7. Contact Information"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"Questions regarding these terms should be directed to",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "mailto:support@civiceye.in",
										className: "text-primary hover:underline",
										children: "support@civiceye.in"
									}),
									"."
								] })]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
var $$splitComponentImporter = () => import("./callback-4CXsXlyu.mjs");
var Route = createFileRoute("/auth/callback")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$15.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$16
	}),
	BookDemoRoute: Route$14.update({
		id: "/book-demo",
		path: "/book-demo",
		getParentRoute: () => Route$16
	}),
	DashboardRoute: Route$13.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => Route$16
	}),
	FaqRoute: Route$12.update({
		id: "/faq",
		path: "/faq",
		getParentRoute: () => Route$16
	}),
	ForOrganizationsRoute: Route$11.update({
		id: "/for-organizations",
		path: "/for-organizations",
		getParentRoute: () => Route$16
	}),
	LoginRoute: Route$10.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$16
	}),
	MapRoute: Route$9.update({
		id: "/map",
		path: "/map",
		getParentRoute: () => Route$16
	}),
	OnboardingRoute: Route$8.update({
		id: "/onboarding",
		path: "/onboarding",
		getParentRoute: () => Route$16
	}),
	PricingRoute: Route$7.update({
		id: "/pricing",
		path: "/pricing",
		getParentRoute: () => Route$16
	}),
	PrivacyRoute: Route$6.update({
		id: "/privacy",
		path: "/privacy",
		getParentRoute: () => Route$16
	}),
	ReportRoute: Route$5.update({
		id: "/report",
		path: "/report",
		getParentRoute: () => Route$16
	}),
	ReportsRoute: Route$4.update({
		id: "/reports",
		path: "/reports",
		getParentRoute: () => Route$16
	}),
	SecurityRoute: Route$3.update({
		id: "/security",
		path: "/security",
		getParentRoute: () => Route$16
	}),
	SignupRoute: Route$2.update({
		id: "/signup",
		path: "/signup",
		getParentRoute: () => Route$16
	}),
	StartRoute: Route$17.update({
		id: "/start",
		path: "/start",
		getParentRoute: () => Route$16
	}),
	TermsRoute: Route$1.update({
		id: "/terms",
		path: "/terms",
		getParentRoute: () => Route$16
	}),
	AuthCallbackRoute: Route.update({
		id: "/auth/callback",
		path: "/auth/callback",
		getParentRoute: () => Route$16
	})
};
var routeTree = Route$16._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
