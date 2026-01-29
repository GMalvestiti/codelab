import { Routes } from '@angular/router';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PagesComponent } from './pages/pages.component';
import { pagesRoutes } from './pages/pages.routes';
import { authGuard } from './shared/guards/auth.guard';
import { RecuperacaoSenhaComponent } from './recuperacao-senha/recuperacao-senha.component';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: pagesRoutes,
    canActivateChild: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'acesso-negado',
    component: AccessDeniedComponent,
  },
  {
    path: 'recuperacao-senha',
    component: RecuperacaoSenhaComponent,
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];
