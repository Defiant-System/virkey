
@import "./modules/test.js"


// default settings
const defaultSettings = {
	"mode": "full",
	"skin": "light",
	"layout": "sv-SE",
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
				break;
			case "window.keyup":
				window.find(`li[data-key="${event.keyCode}"]`).removeClass("down");
				if (event.keyCode === 13) window.find(`li[data-sub="${event.keyCode}"]`).removeClass("down");
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
				}
				break;
			case "set-keyboard-mode":
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
				break;
			case "open-help":
				karaqu.shell("fs -u '~/help/index.md'");
				break;
		}
	}
};

window.exports = virkey;
