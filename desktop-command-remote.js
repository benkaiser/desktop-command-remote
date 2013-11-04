var express  = require('express.io');
var swig  = require('swig');
var fs = require('fs');
var util = require('util');

// runs a system command
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { console.log("Command Output:" + stdout.trim()) }

exports.Server = function(app, ext){
  var self = this;
  self.app = app || "error";
  self.ext = ext || "";
  // create the app and connect to the database
  self.init = function(callback){
    // create the app and the routes
    self.createRoutes();
    // static pages
    self.app.use("/static", express.static(__dirname + '/static'));
    callback();
  }
  // create all the routes for the server
  self.createRoutes = function(callback){
    self.app.get(self.ext + "/", function(req, res){
      user = req.params.user;
      res.send(swig.renderFile(__dirname + "/templates/controls.html", {user: user}));
    });
    // api and socket functions
    self.app.io.sockets.on('connection', function(socket){
      // recieve from controller
      socket.on('control', function(data){
        self.runCommand(data);
      });
      socket.on('init_controls', function(data){
        socket.emit("init_controls", self.options);
      });
    });
    // test function
    self.app.get(self.ext + "/:user/api/test", function(req, res){
      user = req.params.user;
      res.send(swig.renderFile(__dirname + "/templates/test.html", {user: user}));
    });
  }
  self.config = function(configFile){
    self.options = require(configFile)();
  }
  self.runCommand = function(data){
    switch(data.type){
      case 'button':
        exec(data.command, puts);
        break;
      case 'slider':
        // compile value of slider into command
        command = util.format(data.command, data.value);
        exec(command, puts);
        break;    
    }
  }
}