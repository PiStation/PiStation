/// <reference path="node.d.ts" />
var io = require("socket.io").listen(31415);

io.sockets.on("connection", function (socket) {
    console.log('A Client has Connected to this Server');

    socket.on("getAllModules", function (data) {
        console.log('Asking all actions!', data);
        socket.emit('defineAllModules',
            [
                {
                    name: 'kakuLights',
                    functions: [
                        {
                            name: 'powerControl',
                            arguments: [{type:'bool', name:'enabled'}]
                        },
                        {
                            name: 'dim',
                            arguments: [{type:'bit', name:'dimmingLevel'}]
                        }
                    ]
                }
            ]
        );
    });

    socket.on("disconnect", function (data) {
        console.log("disconnecting ", data);
    });
});

