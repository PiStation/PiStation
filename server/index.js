var io = require("socket.io").listen(31415);

io.sockets.on("connection", function (socket) {
    console.log('A Client has Connected to this Server');

    socket.on("message", function (data) {
        console.log('Message!', data);
    });

    socket.on("disconnect", function (data) {
        console.log("disconnecting ", data);
    });
});