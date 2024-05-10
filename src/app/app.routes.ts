import { Routes } from '@angular/router';
import { StartPageComponent } from './pages/start-page/start-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: StartPageComponent },
];
