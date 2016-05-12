declare var io : any;
export class ActionService {
    private socket : any;
    constructor() {
        this.socket = io('http://localhost:31415');
    }
}