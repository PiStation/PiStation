import { Component, Input } from '@angular/core';
import { FormGroup }     from '@angular/forms';
import * as PiStation from 'pistation-definitions/PiStation';

@Component({
    selector:'argument',
    templateUrl:'dynamic-argument-form.component.html'
})
export class DynamicArgumentFormComponent {
    @Input() argument:PiStation.Argument<any>;
    @Input() form:FormGroup;
    get isValid() { return this.form.controls[this.argument.key].valid; }
}
