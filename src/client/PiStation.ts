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

export class Events {
    static CLIENT_CONNECTED = 'connection';
    static CLIENT_DISCONNECTED = 'disconnect';
    static GET_ALL_MODULES = 'getAllModules';
}

