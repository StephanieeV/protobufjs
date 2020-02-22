var protobuf = require("protobufjs");


protobuf.load("./proto/messages_robocup_ssl_wrapper.proto", function(err, root) {
    if (err)
        throw err;

    // Obtain a message type
    var RobotMessage = root.lookupType("SSL_WrapperPacket");

    // Exemplary payload
    var payload = { 
        detection: field,
        geometry:field
     };

    // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
    var errMsg = RobotMessage.verify(payload);
    if (errMsg)
        throw Error(errMsg);

    // Create a new message
    var message = RobotMessage.create(payload); // or use .fromObject if conversion is necessary

    // Encode a message to an Uint8Array (browser) or Buffer (node)
    var buffer = RobotMessage.encode(message).finish();
    // ... do something with buffer
    console.log(buffer)

    // Decode an Uint8Array (browser) or Buffer (node) to a message
    var message = RobotMessage.decode(buffer);
    // ... do something with message
    console.log(message)

    // If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.

    // Maybe convert the message back to a plain object
    var object = RobotMessage.toObject(message, {
        longs: String,
        enums: String,
        bytes: String,
        // see ConversionOptions
    });
});
