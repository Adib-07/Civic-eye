import { o as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { A as FiMail, O as FiLock, r as FiArrowLeft, v as FiEye, y as FiEyeOff } from "../_libs/react-icons.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { w as useAuth, y as signUp } from "./hooks-DzLqLLnN.mjs";
import { a as stringType, i as objectType, o as ZodError } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signup-CnIsn2mw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var signupSchema = objectType({
	fullName: stringType().min(1, "Full name is required"),
	email: stringType().email("Valid email is required"),
	password: stringType().min(6, "Password must be at least 6 characters"),
	confirmPassword: stringType().min(1, "Confirm password is required")
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords don't match",
	path: ["confirmPassword"]
});
function SignupPage() {
	const [form, setForm] = (0, import_react.useState)({
		fullName: "",
		email: "",
		password: "",
		confirmPassword: ""
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [showConfirmPassword, setShowConfirmPassword] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const { session, profile, loading, isConfigured } = useAuth();
	(0, import_react.useEffect)(() => {
		if (!loading && session) navigate({ to: "/reports" });
	}, [
		loading,
		session,
		navigate
	]);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: value
		}));
	};
	const submit = async (e) => {
		e.preventDefault();
		if (!isConfigured) {
			toast.error("Supabase is not configured. Add credentials to your .env file.");
			return;
		}
		setErrors({});
		setBusy(true);
		try {
			const validated = signupSchema.parse(form);
			if ((await signUp(validated.email, validated.password, { fullName: validated.fullName })).profile) {
				toast.success("Account created successfully");
				navigate({ to: "/login" });
			} else toast.error("Account created but profile could not be loaded");
		} catch (err) {
			if (err instanceof ZodError) {
				setErrors(err.flatten().fieldErrors);
				setBusy(false);
				return;
			}
			const message = err instanceof Error ? err.message : "Sign up failed";
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
					to: "/login",
					className: "inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowLeft, { "aria-hidden": true }), " Back to sign in"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiLock, {
							className: "h-4 w-4",
							"aria-hidden": true
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-xl font-semibold",
						children: "Create account"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Get started with CivicEye admin access"
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
								children: "Full name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1.5 flex items-center gap-2 rounded-md border border-border bg-card px-3 focus-within:border-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: form.fullName,
									onChange: handleChange,
									name: "fullName",
									placeholder: "Your full name",
									className: "w-full bg-transparent py-2.5 text-sm outline-none",
									required: true,
									autoComplete: "name"
								})
							})]
						}),
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
									value: form.email,
									onChange: handleChange,
									name: "email",
									placeholder: "you@yourorganization.com",
									className: "w-full bg-transparent py-2.5 text-sm outline-none",
									required: true,
									autoComplete: "email"
								})]
							})]
						}),
						showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium text-muted-foreground",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1.5 flex items-center gap-2 rounded-md border border-border bg-card px-3 focus-within:border-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: form.password,
									onChange: handleChange,
									className: "w-full bg-transparent py-2.5 text-sm outline-none",
									required: true,
									autoComplete: "new-password"
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
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium text-muted-foreground",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1.5 flex items-center gap-2 rounded-md border border-border bg-card px-3 focus-within:border-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiLock, {
									className: "h-4 w-4 shrink-0 text-muted-foreground",
									"aria-hidden": true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									value: form.password,
									onChange: handleChange,
									name: "password",
									placeholder: "••••••••",
									className: "w-full bg-transparent py-2.5 text-sm outline-none",
									required: true,
									autoComplete: "new-password"
								})]
							})]
						}),
						showConfirmPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium text-muted-foreground",
								children: "Confirm password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1.5 flex items-center gap-2 rounded-md border border-border bg-card px-3 focus-within:border-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: form.confirmPassword,
									onChange: handleChange,
									className: "w-full bg-transparent py-2.5 text-sm outline-none",
									required: true,
									autoComplete: "new-password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "rounded-md bg-transparent p-1 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors",
									"aria-label": showConfirmPassword ? "Hide password" : "Show password",
									onClick: () => setShowConfirmPassword((prev) => !prev),
									children: showConfirmPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEyeOff, {
										className: "h-4 w-4",
										"aria-hidden": true
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEye, {
										className: "h-4 w-4",
										"aria-hidden": true
									})
								})]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium text-muted-foreground",
								children: "Confirm password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1.5 flex items-center gap-2 rounded-md border border-border bg-card px-3 focus-within:border-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiLock, {
									className: "h-4 w-4 shrink-0 text-muted-foreground",
									"aria-hidden": true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									value: form.confirmPassword,
									onChange: handleChange,
									name: "confirmPassword",
									placeholder: "••••••••",
									className: "w-full bg-transparent py-2.5 text-sm outline-none",
									required: true,
									autoComplete: "new-password"
								})]
							})]
						}),
						errors.fullName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-warning",
							children: errors.fullName[0]
						}),
						errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-warning",
							children: errors.email[0]
						}),
						errors.password && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-warning",
							children: errors.password[0]
						}),
						errors.confirmPassword && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-warning",
							children: errors.confirmPassword[0]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: busy || !isConfigured,
							className: "btn-primary w-full py-2.5",
							children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" }), busy ? "Creating account" : "Create account"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-center text-xs leading-relaxed text-muted-foreground",
					children: ["Already have an account? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "font-medium transition-colors hover:text-foreground",
						children: "Sign in"
					})]
				})
			]
		})
	});
}
//#endregion
export { SignupPage as component };
