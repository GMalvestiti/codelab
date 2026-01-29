import { Routes } from '@angular/router';
import { EMenuPermissao } from '../../shared/enums/menu-permissao.enum';
import { pendingChangesGuard } from '../../shared/guards/pending-changes.guard';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuarioConsultaComponent } from './usuario-consulta/usuario-consulta.component';

export const usuarioRoutes: Routes = [
  {
    path: 'usuario',
    data: {
      modulo: EMenuPermissao.USUARIO,
    },
    children: [
      {
        path: 'consulta',
        component: UsuarioConsultaComponent,
      },
      {
        path: 'cadastro',
        component: UsuarioCadastroComponent,
        canDeactivate: [pendingChangesGuard],
      },
      {
        path: 'editar/:id',
        component: UsuarioCadastroComponent,
        canDeactivate: [pendingChangesGuard],
      },
      {
        path: '**',
        redirectTo: 'consulta',
        pathMatch: 'full',
      },
    ],
  },
];
