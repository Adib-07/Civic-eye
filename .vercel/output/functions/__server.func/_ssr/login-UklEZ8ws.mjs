import { o as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { A as FiMail, r as FiArrowLeft, v as FiEye, y as FiEyeOff } from "../_libs/react-icons.mjs";
import { n as getSupabase } from "./supabase-ET64mUQq.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as signIn, m as isStaffRole, w as useAuth } from "./hooks-DzLqLLnN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-UklEZ8ws.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const { session, profile, loading, isConfigured } = useAuth();
	(0, import_react.useEffect)(() => {
		if (!loading && session) navigate({ to: isStaffRole(profile?.role) ? "/dashboard" : "/reports" });
	}, [
		loading,
		session,
		profile,
		navigate
	]);
	const submit = async (e) => {
		e.preventDefault();
		if (!isConfigured) {
			toast.error("Supabase is not configured. Add credentials to your .env file.");
			return;
		}
		setBusy(true);
		try {
			const result = await signIn(email.trim(), password);
			toast.success("Signed in successfully");
			navigate({ to: isStaffRole(result.profile?.role) ? "/dashboard" : "/reports" });
		} catch (err) {
			if (err instanceof Error && err.message.includes("Email not confirmed") || err?.code === "email_not_confirmed") {
				setBusy(false);
				if (window.confirm("Please confirm your email before signing in. Resend confirmation email?")) getSupabase()?.auth.resend({
					type: "signup",
					email: email.trim()
				}).then(() => toast.success("Confirmation email resent"), (resendError) => toast.error(resendError instanceof Error ? resendError.message : "Failed to resend confirmation email"));
				else toast.error("Sign in aborted");
				return;
			}
			const message = err instanceof Error ? err.message : "Sign in failed";
			toast.error(message);
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "hero-bg grid min-h-screen place-items-center p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-panel w-full max-w-md p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowLeft, { "aria-hidden": true }), " Back to home"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEye, {
							className: "h-4 w-4",
							"aria-hidden": true
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-xl font-semibold",
						children: "Staff sign in"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Organization operations access"
					})] })]
				}),
				!isConfigured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 rounded-md border border-warning/30 bg-warning/8 p-4 text-sm text-muted-foreground",
					children: [
						"Supabase is not configured. Copy ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "font-mono text-xs",
							children: ".env.example"
						}),
						" ",
						"to ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "font-mono text-xs",
							children: ".env"
						}),
						" and set your organization credentials."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "mt-8 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium text-muted-foreground",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1.5 flex items-center gap-2 rounded-md border border-border bg-card px-3 focus-within:border-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMail, {
									className: "h-4 w-4 shrink-0 text-muted-foreground",
									"aria-hidden": true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									placeholder: "you@yourorganization.com",
									className: "w-full bg-transparent py-2.5 text-sm outline-none",
									required: true,
									autoComplete: "email"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium text-muted-foreground",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1.5 flex items-center gap-2 rounded-md border border-border bg-card px-3 focus-within:border-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: showPassword ? "text" : "password",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									className: "w-full bg-transparent py-2.5 text-sm outline-none",
									required: true,
									autoComplete: "current-password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "rounded-md bg-transparent p-1 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors",
									"aria-label": showPassword ? "Hide password" : "Show password",
									onClick: () => setShowPassword((prev) => !prev),
									children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEyeOff, {
										className: "h-4 w-4",
										"aria-hidden": true
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEye, {
										className: "h-4 w-4",
										"aria-hidden": true
									})
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: busy || !isConfigured,
							className: "btn-primary w-full py-2.5",
							children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" }), busy ? "Signing in" : "Sign in"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-center text-xs leading-relaxed text-muted-foreground",
					children: "Staff and admins are provisioned by your organization administrator"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-center text-xs font-medium text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/signup",
						className: "transition-colors hover:underline",
						children: "Don't have an account? Sign up"
					})
				})
			]
		})
	});
}
//#endregion
export { LoginPage as component };
