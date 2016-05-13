import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';

import { AboutComponent } from './+about/index';
import { HomeComponent } from './+home/index';
import { NameListService, NavbarComponent, ToolbarComponent, ActionService} from './shared/index';

@Component({
  selector: 'sd-app',
  viewProviders: [NameListService, ActionService],
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
  }
])
export class AppComponent {
  constructor(){

  }
}
