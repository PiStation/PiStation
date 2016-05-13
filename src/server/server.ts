/// <reference path="node.d.ts" />

import * as PiStation from '../PiStation.ts';

var io = require("socket.io").listen(31415);

io.sockets.on("connection", function (socket) {
    console.log('A Client has Connected to this Server');

    socket.on("getAllModules", function (data) {
        console.log('Asking all actions!', data);
        var mockModules = [
            new PiStation.Module(
                'kakuLights',
                [
                    new PiStation.Function('powerControl', [new PiStation.Argument('enabled', 'bool')]),
                    new PiStation.Function('dim', [new PiStation.Argument('dimmingLevel', 'bit')])
                ]
            )
        ];
        console.log('Returning:', mockModules);
        socket.emit('defineAllModules', mockModules);
    });

    socket.on("disconnect", function (data) {
        console.log("disconnecting ", data);
    });
});

