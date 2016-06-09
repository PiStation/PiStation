import {Injectable} from '@angular/core';
import * as PiStation from 'pistation-definitions/PiStation';
import * as Rx from 'rxjs/Rx';

import Observable = Rx.Observable;

@Injectable() export class ModuleService {
    private socket : SocketIOClient.Socket = io.connect('http://localhost:31415');

    getAllModules() : Rx.Observable<PiStation.Module[]> {
        this.socket.emit(`${PiStation.Events.GET_ALL_MODULES}`);

        return Rx.Observable.fromEvent(this.socket, `${PiStation.Events.GET_ALL_MODULES}`)
            .map((modulesJSON : any[]) => modulesJSON.map(module => new PiStation.Module(module.name, module.functions)));
    }
    callModuleFunction(func : PiStation.Function, args: any) {
        console.log(`Sending ${func.eventName} with arguments : ${func.arguments.map(arg => arg.value + ', ')}`);

        const updateStream = Rx.Observable.create(observer => {
            this.socket.on(func.eventName, (data) => observer.next(data));
            this.socket.on(`${func.completedEventName}`,()=>observer.complete());
            this.socket.on(`${func.errorEventName}`, (error)=> observer.error(error));
        }); //create observable with function update stream to UI

        this.socket.emit(func.eventName,args);
        return updateStream;

    }
}
