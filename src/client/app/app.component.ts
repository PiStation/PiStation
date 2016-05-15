import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';

import { AboutComponent } from './+about/index';
import { HomeComponent } from './+home/index';
import { NameListService, NavbarComponent, ToolbarComponent, ModuleService} from './shared/index';
import {ModuleListComponent} from "./+modules/module-list.component";

@Component({
  selector: 'sd-app',
  viewProviders: [NameListService, ModuleService],
  templateUrl: 'app/app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent, ToolbarComponent]
})
@Routes([
  {
    path: '/',
    component: HomeComponent
  },
  {
    path: '/about',
    component: AboutComponent
  },
  {
    path: '/modules',
    component: ModuleListComponent
  }
])
export class AppComponent {
  constructor(){
  }
}
