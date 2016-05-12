import {PiStationModule} from "../../PiStationModule.interface";
export class ActionService {
    private socket : SocketIOClient.Socket;

    constructor() {
        this.socket = io('http://localhost:31415');
        this.getAllActions();

        this.socket.on('defineAllActions', (data : PiStationModule) => {

        });
    }

    private getAllActions() {
        return this.socket.emit('getAllActions');
    }
}