import { o as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { C as FiImage, R as FiRefreshCw } from "../_libs/react-icons.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ReportImage-CuX88nI4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReportImage({ src, alt, className, onClick, placeholderClassName }) {
	const [loading, setLoading] = (0, import_react.useState)(Boolean(src));
	const [failed, setFailed] = (0, import_react.useState)(false);
	const [retryCount, setRetryCount] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		setLoading(Boolean(src));
		setFailed(false);
		setRetryCount(0);
	}, [src]);
	const displaySrc = src && retryCount > 0 ? `${src}${src.includes("?") ? "&" : "?"}retry=${retryCount}` : src;
	const retry = () => {
		setFailed(false);
		setLoading(true);
		setRetryCount((n) => n + 1);
	};
	if (!src || failed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid place-items-center bg-secondary text-muted-foreground", placeholderClassName ?? className),
		role: "img",
		"aria-label": failed ? "Evidence unavailable" : "No evidence attached",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-2 px-4 text-center text-xs font-semibold",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiImage, {
					className: "h-6 w-6 opacity-60",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: failed ? "Evidence unavailable" : "No evidence attached" }),
				failed && src && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: retry,
					className: "mt-1 inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1 text-[11px] font-bold text-foreground hover:bg-secondary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiRefreshCw, {
						className: "h-3 w-3",
						"aria-hidden": true
					}), "Retry"]
				})
			]
		})
	});
	const img = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: displaySrc ?? void 0,
		alt,
		loading: "lazy",
		decoding: "async",
		onLoad: () => setLoading(false),
		onError: () => {
			setFailed(true);
			setLoading(false);
		},
		className: cn(className, loading && "opacity-0")
	}, retryCount);
	if (onClick) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: cn("relative block overflow-hidden", className),
		"aria-label": `View evidence: ${alt}`,
		children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute inset-0 animate-pulse bg-secondary",
			"aria-hidden": true
		}), img]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative overflow-hidden", className),
		children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute inset-0 animate-pulse bg-secondary",
			"aria-hidden": true
		}), img]
	});
}
//#endregion
export { ReportImage as t };
