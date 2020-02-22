
//const gamepad=require("./gamepad.js");

//const gamepad = new Gamepad();

var gamepad = require("gamepad");
 
// Initialize the library
gamepad.init()
//console.log("ok")
console.log("il y a "+gamepad.numDevices()+" manette(s) connectées")
console.log(gamepad.processEvents())

gamepad.on('connect', e => {
    console.log(`controller ${e.index} connected!`);
});

gamepad.on("move", function (id, axis, value) {
    console.log("move", {
      id: id,
      axis: axis,
      value: value,
    });
  });


gamepad.on('disconnect', e => {
    console.log(`controller ${e.index} disconnected!`);
});