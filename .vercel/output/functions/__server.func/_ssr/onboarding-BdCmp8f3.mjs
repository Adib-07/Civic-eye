import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { Q as FiUsers, c as FiCamera, i as FiArrowRight, j as FiMap, u as FiCheckCircle } from "../_libs/react-icons.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { t as AppShell } from "./AppShell-soJkEpQC.mjs";
import { n as dismissOnboarding } from "./OnboardingBanner-xf1m4EX0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-BdCmp8f3.js
var import_jsx_runtime = require_jsx_runtime();
var steps = [
	{
		icon: FiCamera,
		title: "Report with a photo",
		text: "Open Report Issue, upload a photo, and confirm the suggested category. Your team receives a geo-tagged record instantly.",
		to: "/report",
		cta: "Try reporting"
	},
	{
		icon: FiMap,
		title: "Track on the live map",
		text: "Every submitted issue appears on the OpenStreetMap view with its status, category, and location pin.",
		to: "/map",
		cta: "Open map"
	},
	{
		icon: FiUsers,
		title: "Staff assign and resolve",
		text: "Staff sign in, assign issues from the queue, mark work complete, and verify fixes before closing.",
		to: "/login",
		cta: "Staff sign in"
	},
	{
		icon: FiCheckCircle,
		title: "SLA tracking built in",
		text: "The organization dashboard shows SLA deadlines, breaches, and a verification queue so nothing slips through.",
		to: "/dashboard",
		cta: "View dashboard"
	}
];
function OnboardingPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Quick tour",
		subtitle: "Get started with CivicEye in four steps",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-5 sm:grid-cols-2",
			children: steps.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
				initial: {
					opacity: 0,
					y: 16
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { delay: i * .08 },
				className: "glass card-hover flex flex-col rounded-2xl p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(step.icon, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 text-lg font-bold",
						children: step.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 flex-1 text-sm leading-relaxed text-muted-foreground",
						children: step.text
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: step.to,
						onClick: dismissOnboarding,
						className: "mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline",
						children: [
							step.cta,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, { className: "h-4 w-4" })
						]
					})
				]
			}, step.title))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: dismissOnboarding,
				className: "text-sm font-semibold text-muted-foreground hover:text-foreground",
				children: "Got it — hide this tour"
			})
		})]
	});
}
//#endregion
export { OnboardingPage as component };
