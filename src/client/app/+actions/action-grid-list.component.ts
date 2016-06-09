import {Component} from "@angular/core";
import {MD_GRID_LIST_DIRECTIVES} from "@angular2-material/grid-list"
import * as PiStation from "pistation-definitions/PiStation";
@Component({
    selector: 'action-grid-list',
    directives: [MD_GRID_LIST_DIRECTIVES],
    templateUrl: '/app/+actions/action-grid-list.component.html'
})
export class ActionGridListComponent {
    tiles: PiStation.Action[] = [
        {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
        {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
        {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
        {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
    ];
    AfterContentChecked(){

    }
}