import {Injectable} from '@angular/core';
import * as PiStation from 'pistation-definitions/PiStation';
import * as Rx from 'rxjs/Rx';

import Observable = Rx.Observable;

@Injectable() export class ActionService {

    getAllActions() {
        return <PiStation.Action[]>[
            {
                text: 'Test Action',
                cols: 2,
                rows: 1,
                color: 'lightblue'
            }
        ]
    }
}
