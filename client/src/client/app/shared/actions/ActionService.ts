import {Observable} from "rxjs/Observable";
import "../../../../../PiStation.ts"

export class ActionService {
    private socket : SocketIOClient.Socket;

    constructor() {
        this.socket = io('http://localhost:31415');
        //console.log(new PiStation.Argument('bla', 'bloe'));
    }

    getAllActions() : Observable<PiStation.Module[]> {
        this.socket.emit('getAllModules');
        return Observable.create(observer => {
            this.socket.on('defineAllModules', (data) => observer.next(data));
        });
    }
}
