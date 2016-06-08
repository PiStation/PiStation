import {Component} from '@angular/core';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';

import {ModuleService} from "../shared/index";
import * as PiStation from "pistation-definitions/PiStation";
import {Observable} from "rxjs/Observable";
import {MdSlideToggle} from '@angular2-material/slide-toggle';
import {ArgumentsControlFormComponent} from "../shared/arguments/arguments-control-form.component";

@Component({
    selector : 'module-list',
    directives: [MD_LIST_DIRECTIVES, MdSlideToggle, ArgumentsControlFormComponent],
	templateUrl: 'app/+modules/module-list.component.html'
})
export class ModuleListComponent {
    public modules : Observable<PiStation.Module[]>;

	constructor(private moduleService : ModuleService) {
        this.modules = this.moduleService.getAllModules();
        this.modules.forEach((module) => {
            console.log('getting module: ', module);
        })
	}

    callFunction(func){
        this.moduleService.callModuleFunction(func);
    }
}
