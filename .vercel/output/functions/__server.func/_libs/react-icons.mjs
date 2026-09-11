import { o as __toESM } from "../_runtime.mjs";
import { c as require_react } from "./@radix-ui/react-accordion+[...].mjs";
//#region node_modules/react-icons/lib/iconContext.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var DefaultContext = {
	color: void 0,
	size: void 0,
	className: void 0,
	style: void 0,
	attr: void 0
};
var IconContext = import_react.createContext && /*#__PURE__*/ import_react.createContext(DefaultContext);
//#endregion
//#region node_modules/react-icons/lib/iconBase.mjs
var _excluded = [
	"attr",
	"size",
	"title"
];
function _objectWithoutProperties(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function _extends() {
	return _extends = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends.apply(null, arguments);
}
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty(e, r, t) {
	return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey(t) {
	var i = _toPrimitive(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function Tree2Element(tree) {
	return tree && tree.map((node, i) => /*#__PURE__*/ import_react.createElement(node.tag, _objectSpread({ key: i }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
	return (props) => /*#__PURE__*/ import_react.createElement(IconBase, _extends({ attr: _objectSpread({}, data.attr) }, props), Tree2Element(data.child));
}
function IconBase(props) {
	var elem = (conf) => {
		var attr = props.attr, size = props.size, title = props.title, svgProps = _objectWithoutProperties(props, _excluded);
		var computedSize = size || conf.size || "1em";
		var className;
		if (conf.className) className = conf.className;
		if (props.className) className = (className ? className + " " : "") + props.className;
		return /*#__PURE__*/ import_react.createElement("svg", _extends({
			stroke: "currentColor",
			fill: "currentColor",
			strokeWidth: "0"
		}, conf.attr, attr, svgProps, {
			className,
			style: _objectSpread(_objectSpread({ color: props.color || conf.color }, conf.style), props.style),
			height: computedSize,
			width: computedSize,
			xmlns: "http://www.w3.org/2000/svg"
		}), title && /*#__PURE__*/ import_react.createElement("title", null, title), props.children);
	};
	return IconContext !== void 0 ? /*#__PURE__*/ import_react.createElement(IconContext.Consumer, null, (conf) => elem(conf)) : elem(DefaultContext);
}
//#endregion
//#region node_modules/react-icons/fi/index.mjs
function FiX(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "line",
			"attr": {
				"x1": "18",
				"y1": "6",
				"x2": "6",
				"y2": "18"
			},
			"child": []
		}, {
			"tag": "line",
			"attr": {
				"x1": "6",
				"y1": "6",
				"x2": "18",
				"y2": "18"
			},
			"child": []
		}]
	})(props);
}
function FiXCircle(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "circle",
				"attr": {
					"cx": "12",
					"cy": "12",
					"r": "10"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "15",
					"y1": "9",
					"x2": "9",
					"y2": "15"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "9",
					"y1": "9",
					"x2": "15",
					"y2": "15"
				},
				"child": []
			}
		]
	})(props);
}
function FiUsers(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "path",
				"attr": { "d": "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" },
				"child": []
			},
			{
				"tag": "circle",
				"attr": {
					"cx": "9",
					"cy": "7",
					"r": "4"
				},
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "M23 21v-2a4 4 0 0 0-3-3.87" },
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "M16 3.13a4 4 0 0 1 0 7.75" },
				"child": []
			}
		]
	})(props);
}
function FiUser(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" },
			"child": []
		}, {
			"tag": "circle",
			"attr": {
				"cx": "12",
				"cy": "7",
				"r": "4"
			},
			"child": []
		}]
	})(props);
}
function FiUserX(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "path",
				"attr": { "d": "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" },
				"child": []
			},
			{
				"tag": "circle",
				"attr": {
					"cx": "8.5",
					"cy": "7",
					"r": "4"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "18",
					"y1": "8",
					"x2": "23",
					"y2": "13"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "23",
					"y1": "8",
					"x2": "18",
					"y2": "13"
				},
				"child": []
			}
		]
	})(props);
}
function FiUserPlus(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "path",
				"attr": { "d": "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" },
				"child": []
			},
			{
				"tag": "circle",
				"attr": {
					"cx": "8.5",
					"cy": "7",
					"r": "4"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "20",
					"y1": "8",
					"x2": "20",
					"y2": "14"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "23",
					"y1": "11",
					"x2": "17",
					"y2": "11"
				},
				"child": []
			}
		]
	})(props);
}
function FiUserCheck(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "path",
				"attr": { "d": "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" },
				"child": []
			},
			{
				"tag": "circle",
				"attr": {
					"cx": "8.5",
					"cy": "7",
					"r": "4"
				},
				"child": []
			},
			{
				"tag": "polyline",
				"attr": { "points": "17 11 19 13 23 9" },
				"child": []
			}
		]
	})(props);
}
function FiUpload(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "path",
				"attr": { "d": "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" },
				"child": []
			},
			{
				"tag": "polyline",
				"attr": { "points": "17 8 12 3 7 8" },
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "12",
					"y1": "3",
					"x2": "12",
					"y2": "15"
				},
				"child": []
			}
		]
	})(props);
}
function FiTrash2(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "polyline",
				"attr": { "points": "3 6 5 6 21 6" },
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" },
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "10",
					"y1": "11",
					"x2": "10",
					"y2": "17"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "14",
					"y1": "11",
					"x2": "14",
					"y2": "17"
				},
				"child": []
			}
		]
	})(props);
}
function FiTool(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" },
			"child": []
		}]
	})(props);
}
function FiTarget(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "circle",
				"attr": {
					"cx": "12",
					"cy": "12",
					"r": "10"
				},
				"child": []
			},
			{
				"tag": "circle",
				"attr": {
					"cx": "12",
					"cy": "12",
					"r": "6"
				},
				"child": []
			},
			{
				"tag": "circle",
				"attr": {
					"cx": "12",
					"cy": "12",
					"r": "2"
				},
				"child": []
			}
		]
	})(props);
}
function FiSun(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "circle",
				"attr": {
					"cx": "12",
					"cy": "12",
					"r": "5"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "12",
					"y1": "1",
					"x2": "12",
					"y2": "3"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "12",
					"y1": "21",
					"x2": "12",
					"y2": "23"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "4.22",
					"y1": "4.22",
					"x2": "5.64",
					"y2": "5.64"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "18.36",
					"y1": "18.36",
					"x2": "19.78",
					"y2": "19.78"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "1",
					"y1": "12",
					"x2": "3",
					"y2": "12"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "21",
					"y1": "12",
					"x2": "23",
					"y2": "12"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "4.22",
					"y1": "19.78",
					"x2": "5.64",
					"y2": "18.36"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "18.36",
					"y1": "5.64",
					"x2": "19.78",
					"y2": "4.22"
				},
				"child": []
			}
		]
	})(props);
}
function FiShield(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
			"child": []
		}]
	})(props);
}
function FiSend(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "line",
			"attr": {
				"x1": "22",
				"y1": "2",
				"x2": "11",
				"y2": "13"
			},
			"child": []
		}, {
			"tag": "polygon",
			"attr": { "points": "22 2 15 22 11 13 2 9 22 2" },
			"child": []
		}]
	})(props);
}
function FiSearch(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "circle",
			"attr": {
				"cx": "11",
				"cy": "11",
				"r": "8"
			},
			"child": []
		}, {
			"tag": "line",
			"attr": {
				"x1": "21",
				"y1": "21",
				"x2": "16.65",
				"y2": "16.65"
			},
			"child": []
		}]
	})(props);
}
function FiSave(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "path",
				"attr": { "d": "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" },
				"child": []
			},
			{
				"tag": "polyline",
				"attr": { "points": "17 21 17 13 7 13 7 21" },
				"child": []
			},
			{
				"tag": "polyline",
				"attr": { "points": "7 3 7 8 15 8" },
				"child": []
			}
		]
	})(props);
}
function FiRefreshCw(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "polyline",
				"attr": { "points": "23 4 23 10 17 10" },
				"child": []
			},
			{
				"tag": "polyline",
				"attr": { "points": "1 20 1 14 7 14" },
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" },
				"child": []
			}
		]
	})(props);
}
function FiPlusCircle(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "circle",
				"attr": {
					"cx": "12",
					"cy": "12",
					"r": "10"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "12",
					"y1": "8",
					"x2": "12",
					"y2": "16"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "8",
					"y1": "12",
					"x2": "16",
					"y2": "12"
				},
				"child": []
			}
		]
	})(props);
}
function FiMoon(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" },
			"child": []
		}]
	})(props);
}
function FiMessageSquare(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
			"child": []
		}]
	})(props);
}
function FiMessageCircle(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" },
			"child": []
		}]
	})(props);
}
function FiMenu(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "line",
				"attr": {
					"x1": "3",
					"y1": "12",
					"x2": "21",
					"y2": "12"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "3",
					"y1": "6",
					"x2": "21",
					"y2": "6"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "3",
					"y1": "18",
					"x2": "21",
					"y2": "18"
				},
				"child": []
			}
		]
	})(props);
}
function FiMap(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "polygon",
				"attr": { "points": "1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" },
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "8",
					"y1": "2",
					"x2": "8",
					"y2": "18"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "16",
					"y1": "6",
					"x2": "16",
					"y2": "22"
				},
				"child": []
			}
		]
	})(props);
}
function FiMapPin(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" },
			"child": []
		}, {
			"tag": "circle",
			"attr": {
				"cx": "12",
				"cy": "10",
				"r": "3"
			},
			"child": []
		}]
	})(props);
}
function FiMail(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" },
			"child": []
		}, {
			"tag": "polyline",
			"attr": { "points": "22,6 12,13 2,6" },
			"child": []
		}]
	})(props);
}
function FiLogOut(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "path",
				"attr": { "d": "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" },
				"child": []
			},
			{
				"tag": "polyline",
				"attr": { "points": "16 17 21 12 16 7" },
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "21",
					"y1": "12",
					"x2": "9",
					"y2": "12"
				},
				"child": []
			}
		]
	})(props);
}
function FiLock(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "rect",
			"attr": {
				"x": "3",
				"y": "11",
				"width": "18",
				"height": "11",
				"rx": "2",
				"ry": "2"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M7 11V7a5 5 0 0 1 10 0v4" },
			"child": []
		}]
	})(props);
}
function FiList(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "line",
				"attr": {
					"x1": "8",
					"y1": "6",
					"x2": "21",
					"y2": "6"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "8",
					"y1": "12",
					"x2": "21",
					"y2": "12"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "8",
					"y1": "18",
					"x2": "21",
					"y2": "18"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "3",
					"y1": "6",
					"x2": "3.01",
					"y2": "6"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "3",
					"y1": "12",
					"x2": "3.01",
					"y2": "12"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "3",
					"y1": "18",
					"x2": "3.01",
					"y2": "18"
				},
				"child": []
			}
		]
	})(props);
}
function FiKey(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" },
			"child": []
		}]
	})(props);
}
function FiInfo(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "circle",
				"attr": {
					"cx": "12",
					"cy": "12",
					"r": "10"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "12",
					"y1": "16",
					"x2": "12",
					"y2": "12"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "12",
					"y1": "8",
					"x2": "12.01",
					"y2": "8"
				},
				"child": []
			}
		]
	})(props);
}
function FiInbox(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "polyline",
			"attr": { "points": "22 12 16 12 14 15 10 15 8 12 2 12" },
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" },
			"child": []
		}]
	})(props);
}
function FiImage(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "rect",
				"attr": {
					"x": "3",
					"y": "3",
					"width": "18",
					"height": "18",
					"rx": "2",
					"ry": "2"
				},
				"child": []
			},
			{
				"tag": "circle",
				"attr": {
					"cx": "8.5",
					"cy": "8.5",
					"r": "1.5"
				},
				"child": []
			},
			{
				"tag": "polyline",
				"attr": { "points": "21 15 16 10 5 21" },
				"child": []
			}
		]
	})(props);
}
function FiHelpCircle(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "circle",
				"attr": {
					"cx": "12",
					"cy": "12",
					"r": "10"
				},
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" },
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "12",
					"y1": "17",
					"x2": "12.01",
					"y2": "17"
				},
				"child": []
			}
		]
	})(props);
}
function FiGrid(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "rect",
				"attr": {
					"x": "3",
					"y": "3",
					"width": "7",
					"height": "7"
				},
				"child": []
			},
			{
				"tag": "rect",
				"attr": {
					"x": "14",
					"y": "3",
					"width": "7",
					"height": "7"
				},
				"child": []
			},
			{
				"tag": "rect",
				"attr": {
					"x": "14",
					"y": "14",
					"width": "7",
					"height": "7"
				},
				"child": []
			},
			{
				"tag": "rect",
				"attr": {
					"x": "3",
					"y": "14",
					"width": "7",
					"height": "7"
				},
				"child": []
			}
		]
	})(props);
}
function FiFileText(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "path",
				"attr": { "d": "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" },
				"child": []
			},
			{
				"tag": "polyline",
				"attr": { "points": "14 2 14 8 20 8" },
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "16",
					"y1": "13",
					"x2": "8",
					"y2": "13"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "16",
					"y1": "17",
					"x2": "8",
					"y2": "17"
				},
				"child": []
			},
			{
				"tag": "polyline",
				"attr": { "points": "10 9 9 9 8 9" },
				"child": []
			}
		]
	})(props);
}
function FiEye(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" },
			"child": []
		}, {
			"tag": "circle",
			"attr": {
				"cx": "12",
				"cy": "12",
				"r": "3"
			},
			"child": []
		}]
	})(props);
}
function FiEyeOff(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" },
			"child": []
		}, {
			"tag": "line",
			"attr": {
				"x1": "1",
				"y1": "1",
				"x2": "23",
				"y2": "23"
			},
			"child": []
		}]
	})(props);
}
function FiEdit2(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" },
			"child": []
		}]
	})(props);
}
function FiDatabase(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "ellipse",
				"attr": {
					"cx": "12",
					"cy": "5",
					"rx": "9",
					"ry": "3"
				},
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" },
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" },
				"child": []
			}
		]
	})(props);
}
function FiClock(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "circle",
			"attr": {
				"cx": "12",
				"cy": "12",
				"r": "10"
			},
			"child": []
		}, {
			"tag": "polyline",
			"attr": { "points": "12 6 12 12 16 14" },
			"child": []
		}]
	})(props);
}
function FiClipboard(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" },
			"child": []
		}, {
			"tag": "rect",
			"attr": {
				"x": "8",
				"y": "2",
				"width": "8",
				"height": "4",
				"rx": "1",
				"ry": "1"
			},
			"child": []
		}]
	})(props);
}
function FiChevronRight(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "polyline",
			"attr": { "points": "9 18 15 12 9 6" },
			"child": []
		}]
	})(props);
}
function FiChevronLeft(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "polyline",
			"attr": { "points": "15 18 9 12 15 6" },
			"child": []
		}]
	})(props);
}
function FiChevronDown(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "polyline",
			"attr": { "points": "6 9 12 15 18 9" },
			"child": []
		}]
	})(props);
}
function FiCheck(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "polyline",
			"attr": { "points": "20 6 9 17 4 12" },
			"child": []
		}]
	})(props);
}
function FiCheckCircle(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M22 11.08V12a10 10 0 1 1-5.93-9.14" },
			"child": []
		}, {
			"tag": "polyline",
			"attr": { "points": "22 4 12 14.01 9 11.01" },
			"child": []
		}]
	})(props);
}
function FiCamera(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" },
			"child": []
		}, {
			"tag": "circle",
			"attr": {
				"cx": "12",
				"cy": "13",
				"r": "4"
			},
			"child": []
		}]
	})(props);
}
function FiBriefcase(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "rect",
			"attr": {
				"x": "2",
				"y": "7",
				"width": "20",
				"height": "14",
				"rx": "2",
				"ry": "2"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" },
			"child": []
		}]
	})(props);
}
function FiBookOpen(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" },
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" },
			"child": []
		}]
	})(props);
}
function FiBarChart2(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "line",
				"attr": {
					"x1": "18",
					"y1": "20",
					"x2": "18",
					"y2": "10"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "12",
					"y1": "20",
					"x2": "12",
					"y2": "4"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "6",
					"y1": "20",
					"x2": "6",
					"y2": "14"
				},
				"child": []
			}
		]
	})(props);
}
function FiArrowRight(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "line",
			"attr": {
				"x1": "5",
				"y1": "12",
				"x2": "19",
				"y2": "12"
			},
			"child": []
		}, {
			"tag": "polyline",
			"attr": { "points": "12 5 19 12 12 19" },
			"child": []
		}]
	})(props);
}
function FiArrowLeft(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "line",
			"attr": {
				"x1": "19",
				"y1": "12",
				"x2": "5",
				"y2": "12"
			},
			"child": []
		}, {
			"tag": "polyline",
			"attr": { "points": "12 19 5 12 12 5" },
			"child": []
		}]
	})(props);
}
function FiAlertTriangle(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "path",
				"attr": { "d": "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" },
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "12",
					"y1": "9",
					"x2": "12",
					"y2": "13"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "12",
					"y1": "17",
					"x2": "12.01",
					"y2": "17"
				},
				"child": []
			}
		]
	})(props);
}
function FiAlertCircle(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "circle",
				"attr": {
					"cx": "12",
					"cy": "12",
					"r": "10"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "12",
					"y1": "8",
					"x2": "12",
					"y2": "12"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "12",
					"y1": "16",
					"x2": "12.01",
					"y2": "16"
				},
				"child": []
			}
		]
	})(props);
}
//#endregion
export { FiX as $, FiMail as A, FiSearch as B, FiImage as C, FiList as D, FiKey as E, FiMessageSquare as F, FiTool as G, FiShield as H, FiMoon as I, FiUser as J, FiTrash2 as K, FiPlusCircle as L, FiMapPin as M, FiMenu as N, FiLock as O, FiMessageCircle as P, FiUsers as Q, FiRefreshCw as R, FiHelpCircle as S, FiInfo as T, FiSun as U, FiSend as V, FiTarget as W, FiUserPlus as X, FiUserCheck as Y, FiUserX as Z, FiEdit2 as _, FiBarChart2 as a, FiFileText as b, FiCamera as c, FiChevronDown as d, FiXCircle as et, FiChevronLeft as f, FiDatabase as g, FiClock as h, FiArrowRight as i, FiMap as j, FiLogOut as k, FiCheck as l, FiClipboard as m, FiAlertTriangle as n, FiBookOpen as o, FiChevronRight as p, FiUpload as q, FiArrowLeft as r, FiBriefcase as s, FiAlertCircle as t, FiCheckCircle as u, FiEye as v, FiInbox as w, FiGrid as x, FiEyeOff as y, FiSave as z };
