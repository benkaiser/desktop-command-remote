commands = [];
cntr = 0;
module.exports = function(){
  // ***** PUT IN CUSTOM EDITS HERE **** //////

  // change this to the name of another name in the configurations folder, or remove for complete custom config
  loadSampleConfigFile("archlinux");

  // add custom config here

  // ***** AND BEFORE HERE ***** ////
  console.log(JSON.stringify(commands));
  return commands;
}

// **** EXAMPLE USAGE TO ADD YOUR OWN COMMANDS **** //

// example of a slider
// addCommand("slider", "Volume", "amixer sset Master %s%", {
//   min: 0,
//   max: 100,
//   value: 0,
//   step: 1
// });

// example of a button
// addCommand("button", "Screen Sleep", "xset dpms force off");

// example of a button with different styling and confirmation dialogue
// addCommand("button", "Suspend System", "systemctl suspend", {
//     buttonClass: "btn-danger",
//     confirm: true
//  });

// add the needed input, examples above.
function addCommand(type, title, value, options){
  commands.push({
    id: cntr++,
    type: type,
    title: title,
    command: value,
    options: options
  });
}

// function to load pre-built configurations for certain environments
function loadSampleConfigFile(name){
  file = __dirname + "/configurations/" + name + ".json";
  data = require(file);
  for (var i = 0; i < data.length; i++) {
    data[i]["id"] = cntr++;
    commands.push(data[i]);
  }
}