var express  = require('express.io');
var swig  = require('swig');
var dcr = require(__dirname + '/desktop-command-remote.js');

var app = express();
app.http().io();
var s = new dcr.Server(app);

app.configure(function(){
  app.use(express.cookieParser());
  app.use(express.bodyParser());
});

// port
port = 3000;

// get ip to print server internal location
require('dns').lookup(require('os').hostname(), function (err, addr, fam) {
  console.log("Web interface running at http://" + addr + ":" + port + "/");
});

s.config(__dirname + "/configure.js");
s.init(function(){
  app.listen(port, function(){
    console.log("Server is running on port: " + port);
    
  })
})