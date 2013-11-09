commands = [];
cntr = 0;
module.exports = function(){
  // ***** ONLY EDIT AFTER HERE **** //////

  /* Mac OS */ addCommand("slider", "Volume", 'osascript -e "set volume output volume %s --100%"', {
  // volume control with amixer, using slider
  // requires all options. %s in command is where the number goes
  /* Ubuntu */ // addCommand("slider", "Volume", "amixer sset Master %s%", {
    min: 0,
    max: 100,
    value: 0,
    step: 1
  });

  // send display to sleep
  // addCommand("button", "Screen Sleep", "xset dpms force off");
  // addCommand("button", "Screen Wake", "xset dpms force on;xset s reset;");

  // start screensaver
  /* Mac OS */ addCommand("button", "Screensaver", "open -a /System/Library/Frameworks/ScreenSaver.framework//Versions/A/Resources/ScreenSaverEngine.app");
  /* Ubuntu */ // addCommand("button", "Screensaver", "xscreensaver-command -activate");

  // suspend system (note the confirm option, to make sure the user does not accidentally press the button)
  /* Mac OS */ addCommand("button", "Suspend System", "pmset sleepnow", {
  /* Ubuntu */ // addCommand("button", "Suspend System", "systemctl suspend", {
      buttonClass: "btn-danger",
      confirm: true
    });

// volume with buttons
/* Mac OS */ addCommand("button", "Volume Up 2%", 'osascript -e "set volume output volume (output volume of (get volume settings) + 2) --100%"');
/* Ubuntu */ // addCommand("button", "Volume Up 2%", "amixer sset Master 2%+");
/* Mac OS */ addCommand("button", "Volume Down 2%", 'osascript -e "set volume output volume (output volume of (get volume settings) - 2) --100%"');
/* Ubuntu */ // addCommand("button", "Volume Down 2%", "amixer sset Master 2%-");
/* Mac OS */ addCommand("button", "Volume Up 10%", 'osascript -e "set volume output volume (output volume of (get volume settings) + 10) --100%"');
/* Ubuntu */ // addCommand("button", "Volume Up 10%", "amixer sset Master 10%+");
/* Mac OS */ addCommand("button", "Volume Down 10%", 'osascript -e "set volume output volume (output volume of (get volume settings) - 10) --100%"');
/* Ubuntu */ // addCommand("button", "Volume Down 10%", "amixer sset Master 10%-");

/* Mac OS */ // needed if want the slider to update with volume
addCommand("button", "Get Volume", 'osascript -e  "output volume of (get volume settings)"');

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
