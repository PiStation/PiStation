/// <reference path="../../../socket.io.d.ts"/>
import * as PiStation from '../../../../PiStation.ts';
import {Observable} from 'rxjs/Observable';

export class ActionService {
    private socket : SocketIOClient.Socket;

    constructor() {
        this.socket = io('http://localhost:31415');
        //console.log(new PiStation.Argument('bla', 'bloe'));
    }

    getAllModules() : Observable<PiStation.Module[]> {
        this.socket.emit('getAllModules');
        return Observable.create((observer : any) => {
            this.socket.on('defineAllModules', (data : PiStation.Module[]) => observer.next(data));
        });
    }
}
