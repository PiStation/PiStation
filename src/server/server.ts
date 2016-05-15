import * as PiStation from '../client/PiStation.ts';
var io = require("socket.io").listen(31415);

io.sockets.on("connection", function (socket: any) {
    console.log('A Client has Connected to this Server');

    socket.on(PiStation.Events.GET_ALL_MODULES, function (data: any) {
        console.log('Asking all modules!', data);
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
        socket.emit(PiStation.Events.GET_ALL_MODULES, mockModules);
    });

    socket.on("disconnect", function (data: any) {
        console.log("disconnecting ", data);
    });
});
