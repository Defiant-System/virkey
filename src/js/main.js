
@import "./modules/test.js"


// default settings
const defaultSettings = {
	mode: "basic",
	skin: "light",
	layout: "sv-SE",
};

const widths = {
	basic: 798,
	extended: 973,
	full: 1201
};


const virkey = {
	init() {
		// fast references
		this.content = window.find("content");

		this.dispatch({ type: "init-settings" });

		// DEV-ONLY-START
		Test.init(this);
		// DEV-ONLY-END
	},
	dispatch(event) {
		let Self = virkey,
			el;
		// console.log(event);
		switch (event.type) {
			// system events
			case "window.init":
				break;
			case "window.close":
				// save settings
				window.settings.setItem("settings", Self.settings);
				break;
			case "window.keydown":
				// console.log(event);
				window.find(`li[data-key="${event.keyCode}"]`).addClass("down");
				if (event.keyCode === 13) window.find(`li[data-sub="${event.keyCode}"]`).addClass("down");
				if (event.keyCode === 20) window.find(`li[data-key="${event.keyCode}"]`).addClass("active").removeClass("down");
				break;
			case "window.keyup":
				window.find(`li[data-key="${event.keyCode}"]`).removeClass("down");
				if (event.keyCode === 13) window.find(`li[data-sub="${event.keyCode}"]`).removeClass("down");
				if (event.keyCode === 20) window.find(`li[data-key="${event.keyCode}"]`).removeClass("active down");
				break;
			// custom events
			case "init-settings":
				// get settings, if any
				Self.settings = window.settings.getItem("settings") || defaultSettings;
				// apply settings
				for (let key in Self.settings) {
					let type = "set-keyboard-"+ key,
						arg = Self.settings[key];
					// call dispatch
					Self.dispatch({ type, arg });
					// update menus
					window.bluePrint.selectNodes(`//*[@check-group="board-${key}"]`).map(xMenu => {
						if (xMenu.getAttribute("arg") === arg) xMenu.setAttribute("is-checked", "1");
						else xMenu.removeAttribute("is-checked");
					});
				}
				// allow animation transitions
				setTimeout(() => Self.content.parent().addClass("ready"));
				break;
			case "set-keyboard-mode":
				// resize window
				window.body.css({ width: widths[event.arg] });
				// set content attribute
				Self.content.data({ mode: event.arg });
				// update settings
				Self.settings.mode = event.arg;
				break;
			case "set-keyboard-skin":
				Self.content.data({ skin: event.arg });
				// update settings
				Self.settings.skin = event.arg;
				break;
			case "set-keyboard-layout":
				// update settings
				Self.settings.layout = event.arg;

				let xLayout = window.bluePrint.selectSingleNode(`//Layout[@id="${event.arg}"]`),
					rows = $(`<span>${xLayout.textContent}</span>`).find("ul");
				rows.map((row, i) => Self.content.find(`.main ul:nth(${i+1})`).replace(row));
				break;
			case "open-help":
				karaqu.shell("fs -u '~/help/index.md'");
				break;
		}
	}
};

window.exports = virkey;
