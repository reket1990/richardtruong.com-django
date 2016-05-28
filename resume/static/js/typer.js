// Initialize Typer
var Typer = function(element) {
	this.element = element;

	// Get strings
	var delim = element.dataset.delim || ",";
	var strings = element.dataset.strings || "sample string 1";
	this.strings = strings.split(delim).filter(function(v){ return v; }); // non empty strings

	// String tracking variables
	this.progress = { string: Math.floor(Math.random() * (this.strings.length)), char: 0, building: true, dupeIndex: 0 }; // Start on a random string
	this.typing = true;

	// Get delays
	this.delay = element.dataset.delay || 50;
	this.deleteDelay = element.dataset.deleteDelay || 1000;

	this.doTyping();
};

// Functions to start and stop typing
Typer.prototype.start = function() {
	if (!this.typing) {
		this.typing = true;
		this.doTyping();
	}
};
Typer.prototype.stop = function() {
	this.typing = false;
};

// Function that does the typing
Typer.prototype.doTyping = function() {
	var element = this.element;
	var progress = this.progress;
	var delay = this.delay;
	var currentString = this.strings[progress.string];

	// Add or remove a character
	if (progress.building) {
		if (progress.char == currentString.length) {
			progress.building = false;
			delay = this.deleteDelay;

			// Pick the next string and find the dupe index
			progress.string = Math.floor(Math.random() * (this.strings.length)); // Pick a random string
			progress.dupeIndex = Math.min(currentString.length, this.strings[progress.string].length);
			for (var i = 0; i < Math.min(currentString.length, this.strings[progress.string].length); i++) {
				if (currentString.charAt(i) !== this.strings[progress.string].charAt(i)) {
					progress.dupeIndex = i;
					break;
				}
			}
		} else {
			// Add a character
			element.innerHTML += currentString[progress.char];
			progress.char += 1;
		}
	} else {
		if (progress.char == progress.dupeIndex) {
			progress.building = true;
		} else {
			// Remove a character
			element.innerHTML = element.innerHTML.slice(0, -1);
			progress.char -= 1;
		}
	}

	// Loop the function with a delay
	var that = this;
	setTimeout(function() {
		if (that.typing) {
			that.doTyping();
		};
	}, delay);
};



// Initialize Cursor
var Cursor = function(element) {
	this.element = element;
	element.innerHTML = element.dataset.cursor || "_";
	element.style.transition = "all 0.1s";

	// Loop the function with a delay
	var that = this;
	setInterval(function() {
		that.updateBlinkState();
	}, 400);
}

// Function that does the blinking
Cursor.prototype.updateBlinkState = function() {
	if (this.element.style.opacity == "1") {
		this.element.style.opacity = "0";
	} else {
		this.element.style.opacity = "1";
	}
}



// Initialize the Typer once the window is loaded
window.onload = function() {
	typers = {};
	typerElements = document.getElementsByClassName("js-typer");
	for (var i = 0, e; e = typerElements[i++];) {
		typers[e.id] = new Typer(e);
	}

	cursorElements = document.getElementsByClassName("js-typer-cursor");
	for (var i = 0, e; e = cursorElements[i++];) {
		var t = new Cursor(e);
	}
};
