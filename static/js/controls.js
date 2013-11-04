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
  // set the commands
  commands = filterCommands(data);
  // draw the view
  commandView = new CommandView();
  RemoteControllerApp.commandRegion.show(commandView);
});

function filterCommands(data){
  for (var i = data.length - 1; i >= 0; i--) {
    data[i][data[i].type] = true;
  }
  return data;
}

$(document).ready(function(){
  
});

function sendRequest(data, human_readable){
  human_readable = human_readable || "Sending control.";
  socket.emit("control", data);
  Messenger().post({
    message: human_readable,
    type: 'success',
    id: "force_only_one",
    hideAfter: 2,
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
    _.defer(function() {
      $(".commandSlider").slider().on('slideStop', updateValueSlider);
      $(".slider").css("width", "99%");
    });
  },
  events: {
    "click .commandbtn": "command_clicked"
  },
  command_clicked: function(ev){
    // TODO: Get ID
    id = idFromEvent(ev);
    command = commands[id];
    if(command.options !== undefined 
      && command.options.confirm !== undefined 
      && command.options.confirm == true){
      confirmDialogue(command);    
    } else {
      sendRequest(command, command.title);
    }
  }
});
function updateValueSlider(ev){
  id = idFromEvent(ev);
  val = $("[data-id='"+id+"']").val();
  command = commands[id];
  command.value = val;
  sendRequest(command, command.title + ":" + val);
}
function confirmDialogue(command){
  // show confirm dialogue for action
  bootbox.confirm("Are you sure you want to " + command.title + "?", function(result) {
    if(result){
      sendRequest(command, command.title);
    } else {
      // show cancellation message
      Messenger().post({
        message: "Event cancelled.",
        type: 'error',
        id: "force_only_one"
      });
    }
  }); 
}

// finally start the app (call all the initializers)
RemoteControllerApp.start();

/*** util functions ***/
function render(template, data){
  return Mustache.render($(template).html(), data);
}
function idFromEvent(ev){
  return $(ev.currentTarget).attr("data-id");
}