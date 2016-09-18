import { Routes, RouterModule } from '@angular/router';
import { Home } from './home';
import { About } from './about';
import { NoContent } from './no-content';
import { ModuleListComponent } from './+modules/module-list.component'

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: Home },
  { path: 'home',  component: Home },
  { path: 'about', component: About },
  { path: 'modules', component: ModuleListComponent },
  {
    path: 'detail', loadChildren: () => System.import('./+detail')
  },
  { path: '**',    component: NoContent },
];
