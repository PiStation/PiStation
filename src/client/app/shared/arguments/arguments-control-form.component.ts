import { Component, Input, OnInit, EventEmitter, Output}  from '@angular/core';
import { ControlGroup }              from '@angular/common';
import * as PiStation from '../../../../../node_modules/pistation-definitions/PiStation';
import { DynamicArgumentFormComponent } from './dynamic-argument.form.component';
import {FunctionControlService} from "./../functions/function-control.service";

@Component({
    selector:'arguments-control-form',
    templateUrl:'app/shared/arguments/arguments-control-form.component.html',
    directives: [DynamicArgumentFormComponent],
    providers:  [FunctionControlService]
})
export class ArgumentsControlFormComponent {
    @Input('arguments') arguments: PiStation.Argument<any>[];
    @Output('submit') submitStream : EventEmitter = new EventEmitter();

    form: ControlGroup;
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