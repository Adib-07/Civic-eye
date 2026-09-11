import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as objectType, n as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/start-CujHPv9n.js
var $$splitComponentImporter = () => import("./start-BBH0xnaa.mjs");
var startSearchSchema = objectType({ plan: enumType([
	"pilot",
	"community",
	"growth",
	"enterprise"
]).optional() });
var Route = createFileRoute("/start")({
	validateSearch: (search) => startSearchSchema.parse(search),
	head: () => ({ meta: [{ title: "Start with CivicEye — Organization Setup" }, {
		name: "description",
		content: "Request a CivicEye pilot or paid plan for your organization. No payment required to apply."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
