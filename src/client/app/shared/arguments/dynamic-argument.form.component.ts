import { Component, Input } from '@angular/core';
import { ControlGroup }     from '@angular/common';
import * as PiStation from 'pistation-definitions/PiStation';

@Component({
    selector:'argument',
    templateUrl:'/app/shared/arguments/dynamic-argument-form.component.html'
})
export class DynamicArgumentFormComponent {
    @Input() argument:PiStation.Argument<any>;
    @Input() form:ControlGroup;
    get isValid() { return this.form.controls[this.argument.key].valid; }
}