import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { b as slaTimeRemaining, p as isSlaBreached } from "./hooks-DzLqLLnN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StatusBadge-DKXcbmsb.js
var import_jsx_runtime = require_jsx_runtime();
function SlaBadge({ report, className }) {
	if (!report.slaDueAt) return null;
	const breached = isSlaBreached(report);
	const remaining = slaTimeRemaining(report.slaDueAt);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		role: "status",
		"aria-label": breached ? "SLA breached" : `SLA: ${remaining}`,
		className: cn("inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold", breached ? "border-destructive/25 bg-destructive/8 text-destructive" : "border-warning/25 bg-warning/8 text-warning", className),
		children: breached ? "Overdue" : remaining
	});
}
var styles = {
	Pending: "bg-warning/10 text-warning border-warning/25",
	"In Progress": "bg-primary/8 text-primary border-primary/20",
	Resolved: "bg-accent text-accent-foreground border-border",
	Verified: "bg-success/10 text-success border-success/25",
	Closed: "bg-muted text-muted-foreground border-border",
	Reopened: "bg-destructive/10 text-destructive border-destructive/25"
};
function StatusBadge({ status, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		role: "status",
		"aria-label": `Status: ${status}`,
		className: cn("inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-semibold tracking-wide", styles[status], className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-current opacity-80" }), status]
	});
}
//#endregion
export { StatusBadge as n, SlaBadge as t };
