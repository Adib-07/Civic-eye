import { o as __toESM } from "../_runtime.mjs";
import { c as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as getSupabase } from "./supabase-ET64mUQq.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/callback-4CXsXlyu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function AuthCallback() {
	const navigate = useNavigate();
	const sb = getSupabase();
	(0, import_react.useEffect)(() => {
		if (!sb) {
			toast.error("Supabase is not configured.");
			navigate({ to: "/" });
			return;
		}
		const url = new URL(window.location.href);
		const code = url.searchParams.get("code");
		const error = url.searchParams.get("error");
		if (error) {
			toast.error(`Auth callback error: ${error}`);
			navigate({ to: "/" });
			return;
		}
		if (code) sb.auth.exchangeCodeForSession(code).then(({ data, error }) => {
			if (error) {
				toast.error(`Session exchange failed: ${error.message}`);
				navigate({ to: "/" });
				return;
			}
			if (data?.session?.user) navigate({ to: "/dashboard" });
			else {
				toast.error("No session obtained");
				navigate({ to: "/" });
			}
		});
		else {
			toast.error("No auth code found in callback URL");
			navigate({ to: "/" });
		}
	}, [sb, navigate]);
	return null;
}
//#endregion
export { AuthCallback as component };
