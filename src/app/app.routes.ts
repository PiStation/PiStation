import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';
import { ModuleListComponent } from './+modules/module-list.component'

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: 'modules', component: ModuleListComponent },
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'detail', loadChildren: () => System.import('./+detail')
  },
  { path: '**',    component: NoContentComponent },
];
