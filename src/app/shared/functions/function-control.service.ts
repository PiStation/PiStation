import { Injectable }   from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {Argument} from 'pistation-definitions/PiStation';

@Injectable()
export class FunctionControlService {
    constructor(private fb:FormBuilder){ }

    argumentsToControlGroup(args : Argument<any>[]) : FormGroup {
        let group = {};

        args.forEach(argument => {
            group[argument.key] = argument.required ? [argument.value || '', Validators.required] : [argument.value || ''];
        });
        return this.fb.group(group);
    }
}
