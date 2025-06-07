
let Test = {
	init(APP) {
		APP.dispatch({ type: "set-keyboard-skin", arg: "mech" });
		APP.dispatch({ type: "set-keyboard-mode", arg: "full" });
		// setTimeout(() => APP.dispatch({ type: "set-keyboard-skin", arg: "metal" }), 500);
		// setTimeout(() => APP.dispatch({ type: "set-keyboard-mode", arg: "extended" }), 1500);
	}
};
