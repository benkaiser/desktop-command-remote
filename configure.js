commands = [];
cntr = 0;
module.exports = function(){
  // ***** ONLY EDIT AFTER HERE **** //////

  // volume control with amixer, using slider
  // requires all options. %s in command is where the number goes
  addCommand("slider", "Volume", "amixer sset Master %s%", {
    min: 0,
    max: 100,
    value: 0,
    step: 1
  });

  // send display to sleep
  addCommand("button", "Screen Sleep", "xset dpms force off");
  addCommand("button", "Screen Wake", "xset dpms force on;xset s reset;");
  // start screensaver
  addCommand("button", "Screensaver", "xscreensaver-command -activate");

  // suspend system
  addCommand("button", "Suspend System", "systemctl suspend", {
      buttonClass: "btn-danger" 
    });

  // ***** AND BEFORE HERE ***** ////

  return commands;
}

// volume with buttons
// addCommand("button", "Volume Up 2%", "amixer sset Master 2%+");
// addCommand("button", "Volume Down 2%", "amixer sset Master 2%-");
// addCommand("button", "Volume Up 10%", "amixer sset Master 10%+");
// addCommand("button", "Volume Down 10%", "amixer sset Master 10%-");

function addCommand(type, title, value, options){
  commands.push({
    id: cntr++,
    type: type,
    title: title,
    command: value,
    options: options
  });
}
