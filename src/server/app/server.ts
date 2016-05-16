import * as io from "socket.io";
import * as PiStation from "../../client/PiStation";
import * as  Rx from 'rxjs/Rx';
const RxNode = require('rx-node');
export interface PiStationServerEvent {
    socket: SocketIO.Socket;
    data: any;
}

export class PiStationServer {
    private socketServer:SocketIO.Server;
    private modules:PiStation.Module[] = [];
    private listeners:string[];

    public clientConnections:Rx.Observable<SocketIO.Socket>;

    constructor(private port:number = 31415) {
        this.socketServer = io(port);
        this.clientConnections = Rx.Observable.create((observer : any) => this.socketServer.on(`${PiStation.Events.ClientConnected}`,(socket : any) => observer.next(socket)));

        this.clientConnections
            .forEach((socket : SocketIO.Socket) => console.log('New Connection'));
    }

    addModule(module:PiStation.Module) {
       return this.modules.push(module);
    }

    on(event:string):Rx.Observable<PiStationServerEvent> {
        return this.clientConnections
            .flatMap((socket : SocketIO.Socket) =>
                Rx.Observable.fromEvent(socket, event)
                    .map((data: any) => <PiStationServerEvent>{data: data, socket: socket}));
    }

}