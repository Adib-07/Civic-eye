import { o as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { $ as FiX, i as FiArrowRight } from "../_libs/react-icons.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/OnboardingBanner-xf1m4EX0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ONBOARDING_KEY = "civiceye_onboarding_dismissed";
function OnboardingBanner() {
	const [dismissed, setDismissed] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return true;
		return localStorage.getItem(ONBOARDING_KEY) === "1";
	});
	if (dismissed) return null;
	const dismiss = () => {
		localStorage.setItem(ONBOARDING_KEY, "1");
		setDismissed(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: -8
		},
		animate: {
			opacity: 1,
			y: 0
		},
		className: "mb-5 overflow-hidden rounded-2xl border border-primary/25 bg-primary/5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-bold text-foreground",
					children: "Welcome to CivicEye"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Report an issue with a photo, track it on the map, and let your ward team assign, resolve, and verify fixes — all in one place."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/onboarding",
					className: "inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground",
					children: ["Quick tour ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, { className: "h-3.5 w-3.5" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: dismiss,
					"aria-label": "Dismiss onboarding",
					className: "grid h-9 w-9 place-items-center rounded-xl border border-border hover:bg-secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { className: "h-4 w-4" })
				})]
			})]
		})
	});
}
function dismissOnboarding() {
	localStorage.setItem(ONBOARDING_KEY, "1");
}
//#endregion
export { dismissOnboarding as n, OnboardingBanner as t };
