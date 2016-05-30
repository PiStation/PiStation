import {Injectable} from '@angular/core';
import * as PiStation from 'pistation-definitions/PiStation';
import * as Rx from 'rxjs/Rx';

import {fromEvent} from 'rxjs/Observable/fromEvent';
import Observable = Rx.Observable;

@Injectable() export class ModuleService {
    private socket : SocketIOClient.Socket = io.connect('http://localhost:31415');

    getAllModules() : Rx.Observable<PiStation.Module[]> {
        this.socket.emit(`${PiStation.Events.GET_ALL_MODULES}`);

        return Observable.fromEvent(this.socket, `${PiStation.Events.GET_ALL_MODULES}`)
            .map((modulesJSON : any[]) => modulesJSON.map(module => new PiStation.Module(module.name, module.functions)));
    }

    callModuleFunction(module : PiStation.Module, func : PiStation.Function, args: PiStation.Argument[] = []) {
        console.log(`Sending ${func.eventName} with arguments : ${args}`);
        this.socket.emit(func.eventName, args);
    }
}
