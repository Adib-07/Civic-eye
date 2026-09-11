import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { E as FiKey, H as FiShield, O as FiLock, Q as FiUsers, b as FiFileText, g as FiDatabase, v as FiEye } from "../_libs/react-icons.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Navbar, t as Footer } from "./Navbar-DYhFGqnu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/security-CFAuMtbl.js
var import_jsx_runtime = require_jsx_runtime();
var SECURITY_SECTIONS = [
	{
		icon: FiKey,
		title: "Authentication",
		description: "Staff access is protected with encrypted authentication and secure credential storage. Authentication tokens are handled server-side and never exposed in the browser."
	},
	{
		icon: FiUsers,
		title: "Role-Based Access Control",
		description: "Each staff member is assigned a role (administrator, staff member, or reporter) that determines what they can view, edit, and resolve. Roles are enforced at the database level — not just the user interface."
	},
	{
		icon: FiDatabase,
		title: "Organization Data Isolation",
		description: "Every organization's issues, staff profiles, and files are strictly isolated using database-level Row Level Security (RLS) policies. One organization's data is never accessible to another."
	},
	{
		icon: FiLock,
		title: "Database Security",
		description: "CivicEye uses a hardened relational database with Row Level Security enforced at the database engine level. Queries that attempt to cross organization boundaries are rejected before data leaves the database."
	},
	{
		icon: FiEye,
		title: "File & Image Security",
		description: "Uploaded issue images and evidence files are stored in organization-scoped storage buckets with private signed URLs. Files are not publicly accessible without valid, time-limited credentials."
	},
	{
		icon: FiFileText,
		title: "Auditability",
		description: "Every status change, assignment, resolution, and verification is recorded with timestamps and actor information. This creates a complete audit trail for every issue from report to verified resolution."
	},
	{
		icon: FiShield,
		title: "Data Handling",
		description: "Issue reports, photo evidence, and location data are used exclusively for operational maintenance workflows. CivicEye does not sell, share, or provide organization data to third parties."
	}
];
function SecurityPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "page-container py-12 sm:py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-3xl mx-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-label",
							children: "Security & Trust"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 text-3xl font-bold sm:text-4xl text-foreground",
							children: "Security built into the architecture"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base max-w-2xl",
							children: "CivicEye is designed so that organization data isolation, role enforcement, and audit accountability are structural properties — not optional configurations."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 space-y-6",
							children: SECURITY_SECTIONS.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "surface-panel p-5 sm:p-6 flex items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-background text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(section.icon, {
										className: "h-4 w-4",
										"aria-hidden": true
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-base font-semibold",
									children: section.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-sm leading-relaxed text-muted-foreground",
									children: section.description
								})] })]
							}, section.title))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mt-12 surface-panel p-6 sm:p-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "section-title text-xl",
								children: "What we do not claim"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-4 space-y-2.5 text-sm text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground/50 mt-0.5 shrink-0",
											children: "•"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "We do not claim \"bank-grade\" or \"military-grade\" security. Our security posture is based on proven managed database and authentication infrastructure and standard best practices." })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground/50 mt-0.5 shrink-0",
											children: "•"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "We do not currently offer automated backups or real-time monitoring dashboards. These are planned as the platform matures." })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground/50 mt-0.5 shrink-0",
											children: "•"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "We do not store payment data. Billing is handled through external payment processors." })]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-12 text-center space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-bold text-foreground",
									children: "Questions about security?"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Contact us to discuss how CivicEye fits your organization's security requirements."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/book-demo",
										className: "btn-primary inline-flex px-5 py-2.5 text-sm",
										children: "Book a Demo"
									})
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { SecurityPage as component };
