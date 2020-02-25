var protobuf = require("protobufjs");

//const message = require('./testtest')

const dgram = require('dgram');
const server = dgram.createSocket({ type: 'udp4', reuseAddr: true })
const address = '224.5.23.2';
const port = '10020'

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

//server.on('message', (msg, rinfo) => {
  //console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
//});




/* --------------------------------------------------------------------------------------------- */
/*
var gamepad = require("gamepad");
 
// Initialize the library
gamepad.init()
//console.log("ok")
console.log("il y a "+gamepad.numDevices()+" manette(s) connectées")
//console.log(gamepad.processEvents())
//console.log(gamepad.detectDevices())

for (var i = 0, l = gamepad.numDevices(); i < l; i++) {
  console.log(i, gamepad.deviceAtIndex());
}
 
// Create a game loop and poll for events
setInterval(gamepad.processEvents, 16);
// Scan for new gamepads as a slower rate
setInterval(gamepad.detectDevices, 500);

// Listen for move events on all gamepads
gamepad.on("move", function (id, axis, value) {
    console.log("move", {
      id: id,
      axis: axis,
      value: value,
    });
  });


// Listen for button up events on all gamepads
gamepad.on("up", function (id, num) {
  console.log("up", {
    id: id,
    num: num,
  });
});
 
// Listen for button down events on all gamepads
gamepad.on("down", function (id, num) {
  console.log("down", {
    id: id,
    num: num,
  });
});
*/

/* ------------------------------------------------------------------------------------------------ */


protobuf.load("./proto/grSim_Packet.proto", function(err, root) {
    if (err)
        throw err;

    // Obtain a message type
    var RobotReplacementMessage = root.lookupType("grSim_RobotReplacement");
    var RobotPacketMessage = root.lookupType("grSim_Packet");

    // Exemplary payload
    var payloadRobotReplacement = { 
      x: 2,
      y:2,
      dir:2,
      id:2,
      yellowteam: true, 
      turnon: false };


var payloadPacket = {
  commands: {
    timestamp: Date.now(),
    isteamyellow: true,
    robotCommands: [
      {
        id: 1,
        kickspeedx: 2,
        kickspeedz: 2,
        spinner: true,
        velnormal: 1,
        velangular: 1,
        veltangent: 1,
        wheelsspeed: false,
      },
    ],
  },
  replacement:{
    robots: [{ 
      x: 1.2,
      y:2.2,
      dir:1,
      id:1,
      yellowteam: true, 
      turnon: true,
    }],
    ball: [{
      x:1,
      y:1,
      vx:1,
      vy:1
    }]

  }
  
}

    // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
    var errMsg = RobotReplacementMessage.verify(payloadRobotReplacement);
    if (errMsg)
        throw Error(errMsg);

        var errMsg2 = RobotPacketMessage.verify(payloadPacket);
        if (errMsg2)
            throw Error(errMsg2);

    // Create a new message
    var messageReplacement = RobotReplacementMessage.create(payloadRobotReplacement); // or use .fromObject if conversion is necessary
    var messagePacket = RobotPacketMessage.create(payloadPacket);

    // Encode a message to an Uint8Array (browser) or Buffer (node)
    var buffer = RobotReplacementMessage.encode(messageReplacement).finish();
    var buffer2 = RobotPacketMessage.encode(messagePacket).finish();
    // ... do something with buffer
    console.log(buffer)
    console.log(buffer2)
    server.send(
      buffer2,
      port,
      address,
    )

    // Decode an Uint8Array (browser) or Buffer (node) to a message
    //var message = RobotReplacementMessage.decode(buffer);
    // ... do something with message
    //console.log(message)


    // If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.

    // Maybe convert the message back to a plain object
    var object = RobotReplacementMessage.toObject(messageReplacement, {
        longs: String,
        enums: String,
        bytes: String,
        double: String,
        bool: String
        // see ConversionOptions
    });

    var object = RobotPacketMessage.toObject(messagePacket, {
      longs: String,
      enums: String,
      bytes: String,
      double: String,
      bool: String
      // see ConversionOptions
  });

});

server.bind(port, address, ()=> {
  console.log(`server listeningg ${address}:${port} `);
  
});