import * as io from "socket.io";
import * as PiStation from "../../client/PiStation";
import * as  Rx from 'rxjs/Rx';
import Socket = SocketIO.Socket;

export interface PiStationServerEvent {
    socket: SocketIO.Socket;
    data: any;
}

export class PiStationServer {
    private socketServer:SocketIO.Server;
    private modules:PiStation.AbstractModule[] = [];
    private listeners:string[];

    public clientConnections:Rx.Observable<SocketIO.Socket>;
    //private moduleFunctionCallStream: Rx.Observable<PiStation.Argument[]>;

    constructor(private port:number = 31415) {
        this.socketServer = io(port);
        this.clientConnections = Rx.Observable.create((observer : any) => this.socketServer.on(`${PiStation.Events.CLIENT_CONNECTED}`,(socket : any) => observer.next(socket)));

        this.clientConnections
            .forEach((socket : SocketIO.Socket) => console.log(`New client connection | ID: ${socket.client.id} IP address: ${socket.client.conn.remoteAddress}`));
        this.clientConnections
            .forEach((socket : SocketIO.Socket) => this.registerEventsForClient(socket));

        //this.moduleFunctionCallStream = this.clientConnections
        //    .flatMap((socket : SocketIO.Socket) =>
        //        Rx.Observable.merge<>(...this.registerEventsForClient(socket));
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

    private registerEventsForClient(socket:SocketIO.Socket){
        this.modules
            .forEach((module : PiStation.Module) => module.registerFunctionUpdatesForClient(socket));
    }
}