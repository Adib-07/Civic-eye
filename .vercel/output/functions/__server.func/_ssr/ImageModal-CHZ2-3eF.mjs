import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { $ as FiX } from "../_libs/react-icons.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ImageModal-CHZ2-3eF.js
var import_jsx_runtime = require_jsx_runtime();
function ImageModal({ src, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: src && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		onClick: onClose,
		className: "fixed inset-0 z-[1000] grid place-items-center bg-background/85 p-4 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: onClose,
			"aria-label": "Close image",
			className: "absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-xl border border-border bg-card/70",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { className: "h-5 w-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
			initial: { scale: .92 },
			animate: { scale: 1 },
			exit: {
				scale: .92,
				opacity: 0
			},
			src,
			alt: "Reported civic issue",
			onClick: (e) => e.stopPropagation(),
			className: "max-h-[85vh] w-auto max-w-full rounded-2xl border border-border object-contain shadow-2xl"
		})]
	}) });
}
//#endregion
export { ImageModal as t };
