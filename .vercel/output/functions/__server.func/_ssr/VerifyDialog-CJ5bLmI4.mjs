import { o as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { $ as FiX, R as FiRefreshCw, c as FiCamera, l as FiCheck, u as FiCheckCircle } from "../_libs/react-icons.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/VerifyDialog-CJ5bLmI4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAX_IMAGE_BYTES = 8 * 1024 * 1024;
function ResolveIssueDialog({ open, report, loading, onCancel, onSubmit }) {
	const fileInputRef = (0, import_react.useRef)(null);
	const [imageFile, setImageFile] = (0, import_react.useState)(null);
	const [imagePreview, setImagePreview] = (0, import_react.useState)(null);
	const [notes, setNotes] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const resetForm = () => {
		setImageFile(null);
		setImagePreview(null);
		setNotes("");
		if (fileInputRef.current) fileInputRef.current.value = "";
	};
	const handleClose = () => {
		resetForm();
		onCancel();
	};
	const handleFileChange = (file) => {
		if (!file) return;
		if (!file.type.startsWith("image/")) {
			toast.error("Please select a valid image file (JPEG, PNG, or WebP).");
			return;
		}
		if (file.size > MAX_IMAGE_BYTES) {
			toast.error("Resolution image size must be under 8MB.");
			return;
		}
		setImageFile(file);
		const reader = new FileReader();
		reader.onload = () => {
			setImagePreview(reader.result);
		};
		reader.readAsDataURL(file);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!imageFile) {
			toast.error("Resolution photo evidence is required before marking resolved.");
			return;
		}
		if (!notes.trim()) {
			toast.error("Please provide a description of the resolution work done.");
			return;
		}
		setSubmitting(true);
		try {
			await onSubmit(imageFile, notes.trim());
			resetForm();
		} catch {} finally {
			setSubmitting(false);
		}
	};
	const isFormValid = Boolean(imageFile && notes.trim() && !loading && !submitting);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && report && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		onClick: handleClose,
		className: "fixed inset-0 z-[1000] grid place-items-center overflow-y-auto bg-background/70 p-4 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .95,
				y: 14
			},
			animate: {
				scale: 1,
				y: 0
			},
			exit: {
				scale: .95,
				opacity: 0
			},
			onClick: (e) => e.stopPropagation(),
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "resolve-dialog-title",
			className: "glass my-8 w-full max-w-lg rounded-2xl p-6 shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-mono font-semibold uppercase tracking-wider text-emerald-500",
						children: "Staff Resolution Submission"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						id: "resolve-dialog-title",
						className: "text-lg font-bold text-foreground",
						children: "Submit Resolution Evidence"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: handleClose,
						"aria-label": "Close dialog",
						className: "rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { className: "h-5 w-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-xs text-muted-foreground",
					children: [
						"Attach photo evidence demonstrating that ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
							"\"",
							report.title,
							"\""
						] }),
						" has been repaired or cleaned. This evidence will be shown to reporters for verification."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "mt-4 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-xs font-bold text-foreground mb-1.5",
								children: ["Resolution Photo Evidence ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-destructive",
									children: "*"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileInputRef,
								type: "file",
								accept: "image/jpeg,image/png,image/webp",
								capture: "environment",
								className: "hidden",
								onChange: (e) => handleFileChange(e.target.files?.[0])
							}),
							imagePreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative overflow-hidden rounded-xl border border-border",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: imagePreview,
										alt: "Resolution evidence preview",
										className: "h-48 w-full object-cover"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => fileInputRef.current?.click(),
										className: "font-semibold text-primary hover:underline flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiRefreshCw, { className: "h-3 w-3" }), " Change Photo"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											setImageFile(null);
											setImagePreview(null);
											if (fileInputRef.current) fileInputRef.current.value = "";
										},
										className: "font-semibold text-destructive hover:underline flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { className: "h-3.5 w-3.5" }), " Remove"]
									})]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => fileInputRef.current?.click(),
								className: "flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-secondary/30 px-4 py-8 transition-all hover:border-emerald-500/50 hover:bg-secondary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-12 w-12 place-items-center rounded-full bg-emerald-500/15 text-emerald-500",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCamera, { className: "h-6 w-6" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-foreground",
										children: "Upload or Snap After-Fix Evidence Photo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-muted-foreground",
										children: "JPEG, PNG, WebP up to 8MB"
									})
								]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-xs font-bold text-foreground mb-1.5",
							children: ["Resolution Work Details ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-destructive",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 3,
							value: notes,
							onChange: (e) => setNotes(e.target.value),
							placeholder: "Describe the corrective action taken (e.g., filled pothole with cold mix asphalt, replaced light bulb, cleared waste container)...",
							className: "w-full rounded-xl border border-border bg-card/60 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary",
							required: true
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-end gap-2 pt-2 border-t border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleClose,
								className: "rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: !isFormValid,
								className: "inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-sm font-bold text-white shadow-md transition-all hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed",
								children: [loading || submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, { className: "h-4 w-4" }), "Submit Resolution"]
							})]
						})
					]
				})
			]
		})
	}) });
}
function VerifyDialog({ open, title, loading, onApprove, onReject, onCancel }) {
	const [notes, setNotes] = (0, import_react.useState)("");
	const handleClose = () => {
		setNotes("");
		onCancel();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-[1000] grid place-items-center bg-background/70 p-4 backdrop-blur-sm",
		onClick: handleClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .95,
				y: 12
			},
			animate: {
				scale: 1,
				y: 0
			},
			exit: {
				scale: .95,
				opacity: 0
			},
			onClick: (e) => e.stopPropagation(),
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "verify-dialog-title",
			className: "glass w-full max-w-md rounded-2xl p-6 shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-mono font-semibold uppercase tracking-wider text-primary",
						children: "Resolution Verification"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						id: "verify-dialog-title",
						className: "text-lg font-bold text-foreground",
						children: "Has this issue been resolved?"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: handleClose,
						"aria-label": "Close dialog",
						className: "rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { className: "h-5 w-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: [
						"Confirm whether ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
							"“",
							title,
							"”"
						] }),
						" was fixed on the ground."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-bold text-foreground",
						children: "Verification Notes (optional)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: notes,
						onChange: (e) => setNotes(e.target.value),
						rows: 3,
						placeholder: "Describe what you verified on site or why it is still unresolved...",
						className: "mt-1.5 w-full rounded-xl border border-border bg-card/60 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-end",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: handleClose,
							className: "rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary",
							children: "Cancel"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: loading,
							onClick: () => {
								onReject(notes);
								setNotes("");
							},
							className: "inline-flex items-center justify-center gap-2 rounded-xl border border-destructive/50 bg-destructive/10 px-4 py-2 text-sm font-bold text-destructive hover:bg-destructive/20 disabled:opacity-60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiRefreshCw, { className: "h-4 w-4" }), " Report Still Unresolved"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: loading,
							onClick: () => {
								onApprove(notes);
								setNotes("");
							},
							className: "inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-sm font-bold text-white shadow-md transition-all hover:bg-emerald-500 disabled:opacity-60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheckCircle, { className: "h-4 w-4" }), " Confirm Resolution"]
						})
					]
				})
			]
		})
	}) });
}
//#endregion
export { VerifyDialog as n, ResolveIssueDialog as t };
