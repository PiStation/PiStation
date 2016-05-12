import {PiStationModule} from "../../PiStationModule.interface";
import * as Rx from "rxjs/Rx";

export class ActionService {
    private socket : SocketIOClient.Socket;

    constructor() {
        this.socket = io('http://localhost:31415');
        this.socket.on('defineAllModules', (test) => {
            console.log('hier wel?', test);
        });
    }

    getAllActions() : Rx.Observable<PiStationModule[]> {
        this.socket.emit('getAllActions');
        return Rx.Observable.create(observer => {
            this.socket.on('defineAllModules', (data) => observer.onNext(data));
        });
    }
}