var express  = require('express.io');
var swig  = require('swig');
var fs = require('fs');
var util = require('util');
var sockets = [];

// runs a system command
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { 
  // console.log(error); 
  // console.log(stderr);
  // console.log("Command Output:" + stdout.trim());
}

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
      sockets.push(socket);
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
    var config = require(configFile);
    self.options = config.init();
    self.getVolume = config.getVolume;
  }
  self.runCommand = function(data){
    var callback = puts;
    if(data.title.indexOf("Volume") >= 0 && self.getVolume){
      callback = function(error, stdout, stderr){
        puts(error, stdout, stderr);
        exec(self.getVolume, function(error, stdout, stderr) {
          sockets.forEach(function(socket){
            socket.emit("updateSlider", {value: stdout.trim()});
          });
        });
      }
    }

    switch(data.type){
      case 'button':
        exec(data.command, callback);
        break;
      case 'slider':
        // compile value of slider into command
        command = util.format(data.command, data.value);
        exec(command, callback);
        break;    
    }
  }
}