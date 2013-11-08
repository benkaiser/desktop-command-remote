Desktop Command Remote
======================

This simple application allows you to run a web server that lists certain terminal commands you would like to run on your desktop.

I use this application to control my volume and sleep my monitors (from my couch / bed). You can use it to play music, open applications, the possibilities are only limited by your command-line-fu and imagination!

Instructions
------------

* Clone this repo with `git clone git@github.com:benkaiser/desktop-command-remote.git`
* Move into the cloned directory `cd desktop-command-remote`
* Run `npm install` to install the required packages.
* Edit the file `configure.js` with the commands you want.
* Run the server with: `node server.js`
![Image](./screenshots/server_running.png?raw=true)
* Visit the url given to you somewhere in the console output.
![Image](./screenshots/android_screenshot_thumbnail.png?raw=true)

Running the Server in the Background
------------------------------------
To run the server in the background, use a tool such as pm2. The following command will install pm2:

```
sudo npm install -g pm2
```
And then you can run the server with:
```
pm2 start server.js
```

To stop pm2 run: `pm2 stop all` and `pm2 kill`. This will stop all pm2's child processes and disable it.

Documentation for editing the configure.js file
-----------------------------------------------
The current commands in there are the ones I use so you can simply delete any of those ones if you don't like them / they don't work on your machine. This is the function parameters for runCommand: `addCommand(type, title, command, options)`. The `type` string should always be set to button (until I add features for other types like input).  `title` is a string for the label of the command you want to appear on the command 'button', in other words it is what you call your command. `command` is a string containing the command you want to execute in the shell (terminal). `options` is an object that is optional, all it is used for now is changing the buttonType to a different bootstrap type, I use it on my suspend button to indicate danger (because my system will shut off wifi if I suspend).

Changes / Feature Requests / Issues
-----------------------------------

If you want more functionality, you can either submit an issue and I will give you a 'yay' or 'nay' as to wether I have time / want to implement it or not. Or you can submit a pull request and there is a much higher likelihood it will end up in the final code-base.