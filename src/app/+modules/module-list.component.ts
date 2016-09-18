import {Component} from '@angular/core';
import * as Rx from "rxjs/Rx";
import {ModuleService} from "../shared/module.service";
import * as PiStation from "pistation-definitions/PiStation";
import {Observable} from "rxjs/Rx";
import {ArgumentsControlFormComponent} from "../shared/arguments/arguments-control-form.component";

@Component({
    selector : 'module-list',
	templateUrl: './module-list.component.html'
})
export class ModuleListComponent {
    public modules : Rx.Observable<PiStation.Module[]>;

	constructor(private moduleService : ModuleService) {
        this.modules = this.moduleService.getAllModules();
        this.modules.forEach((module) => {
            console.log('getting module: ', module);
        })
	}

    callFunction(func : PiStation.Function, args){
        func.updateStream = this.moduleService.callModuleFunction(func, args);
        func.updateStream.subscribe(update => {
            console.log('function got call update: ', update);
        },
            (err)=> console.log('function error', err), () => console.log('function completed'));
    }
}
