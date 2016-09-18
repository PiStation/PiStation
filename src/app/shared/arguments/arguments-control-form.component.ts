import { Component, Input, OnInit, EventEmitter, Output}  from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as PiStation from '../../../../node_modules/pistation-definitions/PiStation';
import { DynamicArgumentFormComponent } from './dynamic-argument.form.component.ts';
import {FunctionControlService} from "./../functions/function-control.service.ts";

@Component({
    selector:'arguments-control-form',
    templateUrl:'arguments-control-form.component.html'
})
export class ArgumentsControlFormComponent {
    @Input('arguments') arguments: PiStation.Argument<any>[];
    @Output('onFunctionCall') submitStream : EventEmitter<any> = new EventEmitter<any>();

    form: FormGroup;
    payLoad : string;

    constructor(private fcs: FunctionControlService) {  }
    ngOnInit(){
        this.form = this.fcs.argumentsToControlGroup(this.arguments);
    }
    onSubmit() {
        this.payLoad = JSON.stringify(this.form.value);
        this.submitStream.emit(this.form.value);
    }
}
