// Initialize Typer
var Typer = function(element) {
	this.element = element;

	// Get strings
	var delim = element.dataset.delim || ",";
	var strings = element.dataset.strings || "sample string 1,sample string 2";
	this.strings = strings.split(delim).filter(function(v){ return v; }); // non empty strings

	// String tracking variables
	this.progress = { string: 0, char: 0, building: true };
	this.typing = true;

	// Get delays
	this.delay = element.dataset.delay || 100;
	this.deleteDelay = element.dataset.deleteDelay || 800;

	// Get colors
	var colors = element.dataset.colors || "white";
	this.colors = colors.split(",");

	// Color tracking variable and initialization
	this.colorIndex = 0;
	this.element.style.color = this.colors[0];

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

	// Add or remove a character
	if (progress.building) {
		// Add a character
		element.innerHTML += this.strings[progress.string][progress.char];
		progress.char += 1;
		if (progress.char == this.strings[progress.string].length) {
			progress.building = false;
		}
	} else {
		// Remove a character
		element.innerHTML = element.innerHTML.slice(0, -1);
		progress.char -= 1;
		if (!this.element.innerHTML) {
			progress.building = true;
			progress.string = (progress.string + 1) % this.strings.length;
			this.colorIndex = (this.colorIndex + 1) % this.colors.length;
			this.element.style.color = this.colors[this.colorIndex];
		}
	}

	// Loop the function with a delay
	var that = this;
	setTimeout(function() {
		if (that.typing) {
			that.doTyping();
		};
	}, (progress.char == this.strings[progress.string].length) ? this.deleteDelay : this.delay);
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
	elements = document.getElementsByClassName("js-typer");
	for (var i = 0, e; e = elements[i++];) {
		typers[e.id] = new Typer(e);
	}

	elements2 = document.getElementsByClassName("js-typer-cursor");
	for (var i = 0, e; e = elements2[i++];) {
		var t = new Cursor(e);
		t.owner.cursor = t;
	}
};
