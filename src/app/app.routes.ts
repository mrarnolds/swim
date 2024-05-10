import { Routes } from '@angular/router';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { ModalComponent } from './components/modal/modal.component';

export const routes: Routes = [
  { path: '', component: StartPageComponent },
  {
    path: 'table',
    outlet: 'modal',
    component: ModalComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/table-page/table-page.component').then(
            (mod) => mod.TablePageComponent
          ),
      },
    ],
  },
];
