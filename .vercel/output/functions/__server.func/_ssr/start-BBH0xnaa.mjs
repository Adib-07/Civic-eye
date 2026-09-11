import { o as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { V as FiSend, r as FiArrowLeft } from "../_libs/react-icons.mjs";
import { a as isSupabaseConfigured } from "./supabase-ET64mUQq.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { S as submitOnboardingRequest, d as getPlan, n as PLANS } from "./hooks-DzLqLLnN.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { n as Navbar, t as Footer } from "./Navbar-DYhFGqnu.mjs";
import { t as Route } from "./start-CujHPv9n.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/start-BBH0xnaa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ORG_TYPES = [
	{
		value: "campus",
		label: "Campus / institution"
	},
	{
		value: "housing",
		label: "Housing society / estate"
	},
	{
		value: "facility",
		label: "Facilities / operations team"
	},
	{
		value: "municipality",
		label: "Municipality / ward office"
	},
	{
		value: "other",
		label: "Other"
	}
];
var ORG_NAME_PLACEHOLDERS = {
	campus: "Block A Hostel Wing",
	housing: "Green Meadows RWA",
	facility: "Tower 2 Facility Ops",
	municipality: "Ward 14 Municipal Office",
	other: "Your Organization Name"
};
function StartPage() {
	const { plan: planParam } = Route.useSearch();
	const configured = isSupabaseConfigured();
	const [selectedPlan, setSelectedPlan] = (0, import_react.useState)(planParam ?? "pilot");
	const [orgName, setOrgName] = (0, import_react.useState)("");
	const [orgType, setOrgType] = (0, import_react.useState)("campus");
	const [adminName, setAdminName] = (0, import_react.useState)("");
	const [adminEmail, setAdminEmail] = (0, import_react.useState)("");
	const [teamSize, setTeamSize] = (0, import_react.useState)("");
	const [operationalArea, setOperationalArea] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const plan = getPlan(selectedPlan);
	const field = "mt-1.5 w-full rounded-xl border border-border bg-card/60 px-3 py-3 text-sm outline-none focus:border-primary";
	const submit = async (e) => {
		e.preventDefault();
		if (!configured) {
			toast.error("Supabase is not configured — cannot submit request yet.");
			return;
		}
		setBusy(true);
		try {
			await submitOnboardingRequest({
				orgName,
				orgType,
				adminName,
				adminEmail,
				teamSize: teamSize || void 0,
				operationalArea: operationalArea || void 0,
				selectedPlan
			});
			setSubmitted(true);
			toast.success("Request submitted");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Submission failed");
		} finally {
			setBusy(false);
		}
	};
	if (submitted) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto grid w-[min(560px,94vw)] place-items-center py-20 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 12
					},
					animate: {
						opacity: 1,
						y: 0
					},
					className: "glass rounded-2xl p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-2xl font-extrabold",
							children: "Request received"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted-foreground",
							children: [
								"Thank you for requesting the ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: plan.name }),
								" plan for",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: orgName }),
								". Our team will review your request and provision your organization workspace. No payment has been charged."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "rounded-xl border border-border px-4 py-2 text-sm font-semibold",
								children: "Back to home"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/pricing",
								className: "rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground",
								children: "View pricing"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto w-[min(640px,94vw)] py-10 sm:py-14",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/pricing",
						className: "inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowLeft, { "aria-hidden": true }), " Back to pricing"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-6 font-display text-2xl font-extrabold sm:text-3xl",
						children: selectedPlan === "pilot" ? "Start your pilot" : "Request a plan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Tell us about your organization. We'll set up your workspace — no online payment at this stage."
					}),
					!configured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 rounded-xl border border-warning/40 bg-warning/10 p-4 text-sm text-warning",
						children: "Supabase is not configured. Configure your environment before submitting a request."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submit,
						className: "glass mt-8 space-y-5 rounded-2xl p-6 sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-muted-foreground",
									children: "Plan"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: selectedPlan,
									onChange: (e) => setSelectedPlan(e.target.value),
									className: field,
									children: PLANS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: p.tier,
										children: p.name
									}, p.tier))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-muted-foreground",
									children: "Organization name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: orgName,
									onChange: (e) => setOrgName(e.target.value),
									required: true,
									placeholder: orgType ? ORG_NAME_PLACEHOLDERS[orgType] : ORG_NAME_PLACEHOLDERS.other,
									className: field
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-muted-foreground",
									children: "Organization type"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: orgType,
									onChange: (e) => setOrgType(e.target.value),
									className: field,
									children: ORG_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: t.value,
										children: t.label
									}, t.value))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-muted-foreground",
										children: "Administrator name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: adminName,
										onChange: (e) => setAdminName(e.target.value),
										required: true,
										className: field
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-muted-foreground",
										children: "Administrator email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										value: adminEmail,
										onChange: (e) => setAdminEmail(e.target.value),
										required: true,
										autoComplete: "email",
										className: field
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-muted-foreground",
									children: "Approximate team size (optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: teamSize,
									onChange: (e) => setTeamSize(e.target.value),
									placeholder: "e.g. 5–10 staff",
									className: field
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-muted-foreground",
									children: "Operational area (optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: operationalArea,
									onChange: (e) => setOperationalArea(e.target.value),
									placeholder: "e.g. North Ward, Campus Block A",
									className: field
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: busy || !configured,
								className: "bg-brand inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-primary-foreground disabled:opacity-60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSend, { "aria-hidden": true }), selectedPlan === "pilot" ? "Start pilot request" : "Submit plan request"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-center text-xs text-muted-foreground",
								children: "By submitting, you agree to be contacted about workspace setup. No payment is processed."
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { StartPage as component };
