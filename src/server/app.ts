/// <reference path="./typings/main" />
import * as PiStation from '../client/PiStation.ts';
import {PiStationServer, PiStationServerEvent} from './app/server';

const app = new PiStationServer();

const module =   new PiStation.Module(
    'kakuLights',
    [
        new PiStation.Function('powerControl', [new PiStation.Argument('enabled', 'bool')]),
        new PiStation.Function('dim', [new PiStation.Argument('dimmingLevel', 'bit')])
    ]
);

app.addModule(module);


app.on(`${PiStation.Events.GET_ALL_MODULES}`).subscribe(function (event : PiStationServerEvent) {
    console.log('Asking all modules!', event);
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
    event.socket.emit(`${PiStation.Events.GET_ALL_MODULES}`, mockModules);
});

app.on(`${PiStation.Events.CLIENT_DISCONNECTED}`).subscribe(function (event : PiStationServerEvent) {
    console.log("disconnecting");
});