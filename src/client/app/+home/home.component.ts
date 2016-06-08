import { FORM_DIRECTIVES } from '@angular/common';
import { Component } from '@angular/core';

import { NameListService } from '../shared/index';
import {ModuleService} from "../shared/index";
import {MdButton} from '@angular2-material/button';
@Component({
  selector: 'sd-home',
  templateUrl: 'app/+home/home.component.html',
  styleUrls: ['app/+home/home.component.css'],
  directives: [FORM_DIRECTIVES, MdButton]
})
export class HomeComponent {
  newName: string;
  constructor(actionService : ModuleService) {

  }
  /*
   * @param newname  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    this.newName = '';
    return false;
  }
}
