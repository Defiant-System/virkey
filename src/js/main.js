
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
				window.find(`li[data-key="${event.keyCode}"]`).addClass("down");
				if (event.keyCode === 13) window.find(`li[data-sub="${event.keyCode}"]`).addClass("down");
				break;
			case "window.keyup":
				window.find(`li[data-key="${event.keyCode}"]`).removeClass("down");
				if (event.keyCode === 13) window.find(`li[data-sub="${event.keyCode}"]`).removeClass("down");
				break;
			// custom events
			case "open-help":
				karaqu.shell("fs -u '~/help/index.md'");
				break;
		}
	}
};

window.exports = virkey;
