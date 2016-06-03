import {ArgumentInput} from "./argument-input";

export class ArgumentInputDropdown extends ArgumentInput<string>{
    controlType = 'dropdown';
    options:{key:string, value:string}[] = [];

    constructor(options:{} = {}){
        super(options);
        this.options = options['options'] || [];
    }
}