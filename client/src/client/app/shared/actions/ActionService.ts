import {PiStationModule} from "../../PiStationModule.interface";
import {Observable} from "rxjs/Observable";

export class ActionService {
    private socket : SocketIOClient.Socket;

    constructor() {
        this.socket = io('http://localhost:31415');
    }

    getAllActions() : Observable<PiStationModule[]> {
        this.socket.emit('getAllModules');
        return Observable.create(observer => {
            this.socket.on('defineAllModules', (data) => observer.next(data));
        });
    }
}