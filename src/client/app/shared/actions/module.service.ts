import {Injectable} from '@angular/core';
import * as PiStation from '../../../PiStation';
import * as Rx from 'rxjs/Rx';

@Injectable() export class ModuleService {
    private socket : SocketIOClient.Socket;

    constructor() {
        this.socket = io('http://localhost:31415');
        //console.log(new PiStation.Argument('bla', 'bloe'));
    }

    getAllModules() : Rx.Observable<PiStation.Module[]> {
        this.socket.emit(PiStation.Events.GET_ALL_MODULES);
        return Rx.Observable.fromEvent<PiStation.Module[]>(this.socket, PiStation.Events.GET_ALL_MODULES);
    }
}

