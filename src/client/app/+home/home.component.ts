import { FORM_DIRECTIVES } from '@angular/common';
import { Component } from '@angular/core';

import { NameListService } from '../shared/index';
import {ModuleService} from "../shared/index";
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
@Component({
  selector: 'sd-home',
  templateUrl: 'app/+home/home.component.html',
  styleUrls: ['app/+home/home.component.css'],
  directives: [FORM_DIRECTIVES, MD_BUTTON_DIRECTIVES]
})
export class HomeComponent {
  newName: string;
  constructor(public nameListService: NameListService, actionService : ModuleService) {

  }

  /*
   * @param newname  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    this.nameListService.add(this.newName);
    this.newName = '';
    return false;
  }
}
