import {PiStationServer} from "../server/app/server";
import * as Rx from 'rxjs/Rx';
export interface AbstractModule {
    register(app : PiStationServer) : PiStationServer;
    toString() : string
}
export class Module implements AbstractModule {
    name: string;
    functions: Function[];
    functionCallStream : Rx.Observable<Function>;

    constructor(name: string, functionArray: Function[] = []) {
        this.name = name;
        this.functions = functionArray;
    }

    registerFunctionUpdatesForClient(clientSocket : SocketIO.Socket){
        return this.functionCallStream = Rx.Observable
            .mergeAll(
                this.functions
                    .map((func:Function) =>
                        Rx.Observable
                            .fromEvent(clientSocket, `${func.eventName}`)
                            .map((functionArguments) => <Argument[]>functionArguments)));
    }

    register(app:PiStationServer):PiStationServer {
        return app;
    }


    toString() : string {
        return this.name;
    }

    addFunction(func: Function) {
        func.module = this;
        this.functions.push(func);
    }
}

export class Function {
    arguments: Argument[];
    name: string;
    module : Module;
    callStream : Rx.Observable<Argument[]>;

    constructor(name: string, argumentArray: Argument[] = []) {
        this.name = name;
        this.arguments = argumentArray;
    }

    addArguments(arg: Argument) {
        this.arguments.push(arg);
    }

    toString() : string {
        return this.name;
    }

    get eventName() : string {
        return `${this.module || 'AnonymousFunction'}:${this.name}`;
    }
}

export class Argument {
    type: string;
    name: string;

    constructor(type: string, name:string) {
        this.type = type;
        this.name = name;
    }
}
export class ServerEvent {
    name: string;
    constructor(name : string) {
        this.name = name;
    }
    toString(){
        return this.name;
    }
}

export class SystemEvent extends ServerEvent {
    constructor(name : string){
        super(name);
    }
}

export class ModuleEvent extends ServerEvent {
    constructor(private moduleName : Module | string,
                private functionName : string){
        super(`${moduleName}:${functionName}`);
    }

    static fromEventName(eventName : string) : ModuleEvent{
        let [moduleName,functionName] = name.split(':') || [name, 'start'];
        return new ModuleEvent(moduleName, functionName);
    }

    getModuleName():string{
        return `${this.moduleName}`;
    }
    getFunctionName():string {
        return this.functionName;
    }
}

export class Events {
    static CLIENT_CONNECTED = new ServerEvent('connection');
    static CLIENT_DISCONNECTED = new ServerEvent('disconnect');
    static GET_ALL_MODULES = new SystemEvent('getAllModules');
}