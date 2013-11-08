commands = [];
cntr = 0;

var sys = require("os").platform() == "darwin" ? "os" : "ubuntu";

var commandLine = {
	ubuntu:{
		// volume control with amixer, using slider
		// requires all options. %s in command is where the number goes
		moveVol : "amixer sset Master %s%",
		screenSleep: "xset dpms force off",
		screenWake : "xset dpms force on;xset s reset;",
		screensaver: "xscreensaver-command -activate",
		suspendSystem: "systemctl suspend",
		volumeUp2: "amixer sset Master 2%+",
		volumeDown2: "amixer sset Master 2%-",
		volumeUp10: "amixer sset Master 10%+",
		volumeDown10: "amixer sset Master 10%-"
	},
	os:{
		moveVol : 'osascript -e "set volume output volume %s --100%"',
		screensaver: "open -a /System/Library/Frameworks/ScreenSaver.framework//Versions/A/Resources/ScreenSaverEngine.app",
		suspendSystem: "pmset sleepnow",
		volumeUp2: 'osascript -e "set volume output volume (output volume of (get volume settings) + 2) --100%"',
		volumeDown2: 'osascript -e "set volume output volume (output volume of (get volume settings) - 2) --100%"',
		volumeUp10: 'osascript -e "set volume output volume (output volume of (get volume settings) + 10) --100%"',
		volumeDown10: 'osascript -e "set volume output volume (output volume of (get volume settings) - 10) --100%"',
	}
}

var checker = function(sys){
	return function(command){
		return commandLine[sys][command];
	}
}
checker = checker(sys);
module.exports = function(){
	// ***** ONLY EDIT AFTER HERE **** //////

	if(checker("moveVol"))
		addCommand("slider", "Volume", checker("moveVol"), {
			min: 0,
			max: 100,
			value: 0,
			step: 1
		});

	// send display to sleep
	if(checker("screenSleep"))
		addCommand("button", "Screen Sleep", checker("screenSleep"));
	if(checker("screenWake"))
		addCommand("button", "Screen Wake", checker("screenWake"));
	// start screensaver
	if(checker("screensaver"))
		addCommand("button", "Screensaver", checker("screensaver"));

	// suspend system (note the confirm option, to make sure the user does not accidentally press the button)
	if(checker("suspendSystem"))
		addCommand("button", "Suspend System", checker("suspendSystem"), {
			buttonClass: "btn-danger",
			confirm: true
		});

	// volume with buttons
	if(checker("volumeUp2"))
		addCommand("button", "Volume Up 2%", checker("volumeUp2"));
	if(checker("volumeDown2"))
		addCommand("button", "Volume Down 2%", checker("volumeDown2"));
	if(checker("volumeUp10"))
		addCommand("button", "Volume Up 10%", checker("volumeUp10"));
	if(checker("volumeUp10"))
		addCommand("button", "Volume Down 10%", checker("volumeDown10"));

	// ***** AND BEFORE HERE ***** ////

	return commands;
}


function addCommand(type, title, value, options){
	commands.push({
		id: cntr++,
		type: type,
		title: title,
		command: value,
		options: options
	});
}
