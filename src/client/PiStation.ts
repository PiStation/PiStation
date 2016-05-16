export class Module {
    functions: Function[];
    name: string;

    constructor(name: string, functionArray: Function[]) {
        this.name = name;
        this.functions = functionArray;
    }

    addFunction(func: Function) {
        this.functions.push(func);
    }

}

export class Function {
    arguments: Argument[];
    name: string;

    constructor(name: string, argumentArray: Argument[]) {
        this.name = name;
        this.arguments = argumentArray;
    }

    addFunction(arg: Argument) {
        this.arguments.push(arg);
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
    private moduleName : string;
    private functionName:string;

    constructor(name : string){
        super(name);
        [this.moduleName,this.functionName] = name.split(':') || [name, 'start'];
    }
    getModuleName():string{
        return this.moduleName;
    }
    getFunctionName():string {
        return this.functionName;
    }
}
export class Events {
    static ClientConnected = new ServerEvent('connection');
    static ClientDisconnected = new ServerEvent('disconnect');
    static GetAllModules = new SystemEvent('getAllModules');
}