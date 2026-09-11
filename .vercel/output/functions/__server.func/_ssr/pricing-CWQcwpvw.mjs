import { o as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { S as FiHelpCircle, i as FiArrowRight, l as FiCheck } from "../_libs/react-icons.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as PLANS, r as SALES_EMAIL, u as formatInr } from "./hooks-DzLqLLnN.mjs";
import { n as Navbar, t as Footer } from "./Navbar-DYhFGqnu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pricing-CWQcwpvw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PRICING_FAQS = [
	{
		q: "Can we start with one site?",
		a: "Yes. The Free Pilot and Community plans are designed for single-site deployments. As your operations grow, you can upgrade to handle additional sites and higher issue volumes."
	},
	{
		q: "Can different teams use CivicEye?",
		a: "Yes. Each organization can create departments or wards, assign staff to specific areas, and manage role-based access so teams only see what they are authorized to manage."
	},
	{
		q: "Can organizations track SLAs?",
		a: "Yes. Every plan includes SLA tracking. Higher-tier plans support custom SLA rules, priority-based timelines, and automated breach alerts for overdue issues."
	},
	{
		q: "How does pricing depend on organization size?",
		a: "Pricing scales with staff count, issue volume, and number of departments. Enterprise plans include custom SLA policies, dedicated onboarding, and flexible billing."
	},
	{
		q: "Is there a discount for annual billing?",
		a: "Yes. Community and Growth plans offer approximately two months free with annual billing. Enterprise billing is negotiated per contract."
	},
	{
		q: "What happens when my pilot ends?",
		a: "At the end of the 30-day pilot, you can choose a paid plan that fits your needs. Your pilot data and configuration are preserved during the transition."
	}
];
function PricingPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "page-container py-14 sm:py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "section-label",
								children: "Pricing"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 section-title text-3xl sm:text-4xl",
								children: "Plans for organizations, not reporters"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base",
								children: "Your organization subscribes. Staff operate the platform. Residents and community members report issues for free. All plans include organization-scoped data isolation and role-based staff access."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs text-muted-foreground leading-relaxed",
								children: "Pricing shown reflects our current early-stage commercial structure. Final pricing may vary based on organization size, number of sites, staff users, issue volume, and required integrations."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid gap-5 lg:grid-cols-3",
						children: PLANS.filter((p) => p.tier !== "growth").map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingCard, { plan }, plan.tier))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "surface-panel mt-14 p-6 sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "section-title text-xl",
								children: "How billing works"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-4 space-y-2.5 text-sm text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, {
											className: "mt-0.5 h-4 w-4 shrink-0 text-success",
											"aria-hidden": true
										}), "Organizations subscribe; end users never pay to report an issue."]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, {
											className: "mt-0.5 h-4 w-4 shrink-0 text-success",
											"aria-hidden": true
										}), "The Free Pilot is available for 30 days with plan limits enforced — no credit card required."]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, {
											className: "mt-0.5 h-4 w-4 shrink-0 text-success",
											"aria-hidden": true
										}), "Paid plans are activated once online checkout is connected. Until then, contact us to get started."]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, {
											className: "mt-0.5 h-4 w-4 shrink-0 text-success",
											"aria-hidden": true
										}), "No payment data is stored in the browser — billing runs server-side."]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, {
											className: "mt-0.5 h-4 w-4 shrink-0 text-success",
											"aria-hidden": true
										}), "Pricing may depend on organization size, number of sites, staff, issue volume, and required integrations."]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-5 text-sm",
								children: [
									"Questions about pricing?",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: `mailto:${SALES_EMAIL}`,
										className: "font-medium text-primary hover:underline",
										children: SALES_EMAIL
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-16",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-2xl text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "section-label",
								children: "Pricing FAQ"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 section-title text-2xl sm:text-3xl",
								children: "Common questions about plans"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 mx-auto max-w-3xl space-y-3",
							children: PRICING_FAQS.map((faq, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingFaqItem, { faq }, i))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function PricingCard({ plan }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("surface-panel flex flex-col p-6", plan.highlighted && "ring-1 ring-primary/30"),
		children: [
			plan.highlighted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-3 inline-flex w-fit rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary",
				children: "Recommended"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-semibold",
				children: plan.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 min-h-[2.5rem] text-sm text-muted-foreground",
				children: plan.tagline
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-5 font-display text-3xl font-semibold tabular-nums",
				children: [formatInr(plan.monthlyPriceInr), plan.monthlyPriceInr !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-medium text-muted-foreground",
					children: "/month"
				})]
			}),
			plan.annualPriceInr !== null && plan.annualPriceInr > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: [
					"or ",
					formatInr(plan.annualPriceInr),
					"/year (annual billing)"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 flex-1 space-y-2.5 text-sm",
				children: plan.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, {
						className: "mt-0.5 h-4 w-4 shrink-0 text-success",
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: f })]
				}, f))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanCta, {
				tier: plan.tier,
				label: plan.cta,
				highlighted: plan.highlighted
			})
		]
	});
}
function PlanCta({ tier, label, highlighted }) {
	const className = cn("mt-6 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors", highlighted || tier === "pilot" ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-border bg-background hover:bg-secondary");
	if (tier === "enterprise") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/book-demo",
		className,
		children: [
			label,
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, {
				className: "h-4 w-4",
				"aria-hidden": true
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/start",
		search: { plan: tier },
		className,
		children: [
			label,
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, {
				className: "h-4 w-4",
				"aria-hidden": true
			})
		]
	});
}
function PricingFaqItem({ faq }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-panel overflow-hidden border border-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setOpen((o) => !o),
			"aria-expanded": open,
			className: "w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-foreground hover:bg-secondary/40 transition-colors",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-3 pr-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiHelpCircle, { className: "h-4 w-4 text-primary shrink-0" }), faq.q]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, { className: cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-90") })]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-5 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border/50 bg-secondary/20",
			children: faq.a
		})]
	});
}
//#endregion
export { PricingPage as component };
