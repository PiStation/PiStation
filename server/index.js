var io = require("socket.io").listen(31415);

io.sockets.on("connection", function (socket) {
    console.log('A Client has Connected to this Server');

    socket.on("getAllActions", function (data) {
        console.log('Asking all actions!', data);
        socket.emit('defineAllActions',
            { actions:
                [
                    {
                        name: 'lights',
                        functions: {
                            powerControl: {
                                arguments: 1,
                                argumentDefinition: [
                                    {
                                        type: 'bool',
                                        name: 'enabled'
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        );
    });

    socket.on("disconnect", function (data) {
        console.log("disconnecting ", data);
    });
});