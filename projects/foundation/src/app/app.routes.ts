import { Routes } from '@angular/router';
import { ROUTES_PATHS } from './shared/utils/constants';

export const routes: Routes = [
  { path: '', redirectTo: ROUTES_PATHS.dashboard, pathMatch: 'full' },
  {
    path: ROUTES_PATHS.dashboard,
    pathMatch: 'prefix',
    loadChildren: () => import('./features/dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
  },
  { path: '**', redirectTo: ROUTES_PATHS.dashboard },
];
