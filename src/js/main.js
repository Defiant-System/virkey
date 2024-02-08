
@import "./modules/test.js"


const virkey = {
	init() {
		// fast references
		this.content = window.find("content");

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
			case "window.keydown":
				console.log(event);
				window.find(`li[data-key="${event.keyCode}"]`).addClass("down");
				if (event.keyCode === 13) window.find(`li[data-sub="${event.keyCode}"]`).addClass("down");
				break;
			case "window.keyup":
				window.find(`li[data-key="${event.keyCode}"]`).removeClass("down");
				if (event.keyCode === 13) window.find(`li[data-sub="${event.keyCode}"]`).removeClass("down");
				break;
			// custom events
			case "set-keyboard-mode":
				break;
			case "set-keyboard-skin":
				Self.content.data({ skin: event.arg });
				break;
			case "set-keyboard-layout":
				break;
			case "open-help":
				karaqu.shell("fs -u '~/help/index.md'");
				break;
		}
	}
};

window.exports = virkey;
