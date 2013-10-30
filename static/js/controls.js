// Setup messenger
Messenger.options = {
    extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
    theme: 'air'
}
// Command array
var commands = [];
// soccet connection and events
var socket = io.connect('http://'+window.location.hostname+':3000');
socket.on('connect', function(){
  console.log("requesting commands");
  socket.emit('init_controls');
});
socket.on('init_controls', function(data){
  console.log("received commands");
  // set the commands
  commands = data;
  // draw the view
  commandView = new CommandView();
  RemoteControllerApp.commandRegion.show(commandView);
});

$(document).ready(function(){
  
});

function sendRequest(data, human_readable){
  human_readable = human_readable || "Sending control.";
  socket.emit("control", data);
  Messenger().post({
    message: human_readable,
    type: 'success'
  });
}


// View Controls
RemoteControllerApp = new Backbone.Marionette.Application();

RemoteControllerApp.addRegions({
  commandRegion: "#command_block"
});

RemoteControllerApp.addInitializer(function(options){
  Backbone.history.start();
});

var CommandView = Backbone.View.extend({
  template: "#command_template",
  render: function(){
    this.$el.html(render(this.template, {data: commands}));
  },
  events: {
    "click .commandbtn": "command_clicked"
  },
  command_clicked: function(event){
    // TODO: Get ID
    id = $(event.currentTarget).attr("data-id");
    command = commands[id];
    sendRequest(command, command.title);
  }
});

// finally start the app (call all the initializers)
RemoteControllerApp.start();

/*** util functions ***/
function render(template, data){
  return Mustache.render($(template).html(), data);
}