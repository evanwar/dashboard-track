import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    title: 'Dashboard · Nexo',
    loadComponent: () =>
      import('./features/dashboard/dashboard-page.component').then((module) => module.DashboardPageComponent),
  },
  {
    path: 'dispositivos',
    title: 'Dispositivos · Nexo',
    data: { module: 'devices' },
    loadComponent: () =>
      import('./features/modules/module-page.component').then((module) => module.ModulePageComponent),
  },
  {
    path: 'usuarios/desbloqueo',
    title: 'Usuarios · Nexo',
    data: { module: 'users' },
    loadComponent: () =>
      import('./features/modules/module-page.component').then((module) => module.ModulePageComponent),
  },
  {
    path: 'cuentas/saldo',
    title: 'Saldo de cuentas · Nexo',
    data: { module: 'balance' },
    loadComponent: () =>
      import('./features/modules/module-page.component').then((module) => module.ModulePageComponent),
  },
  {
    path: 'cuentas/eliminacion',
    title: 'Eliminación de cuentas · Nexo',
    data: { module: 'deletion' },
    loadComponent: () =>
      import('./features/modules/module-page.component').then((module) => module.ModulePageComponent),
  },
  {
    path: 'cuentas/autorizacion',
    title: 'Autorización de cuentas · Nexo',
    data: { module: 'authorization' },
    loadComponent: () =>
      import('./features/modules/module-page.component').then((module) => module.ModulePageComponent),
  },
  {
    path: 'logs/apis',
    title: 'Logs de APIs · Nexo',
    data: { module: 'logs' },
    loadComponent: () =>
      import('./features/modules/module-page.component').then((module) => module.ModulePageComponent),
  },
  { path: '**', redirectTo: 'dashboard' },
];
