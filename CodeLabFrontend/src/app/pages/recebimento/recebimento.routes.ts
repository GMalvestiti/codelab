import { Routes } from '@angular/router';
import { EMenuPermissao } from '../../shared/enums/menu-permissao.enum';
import { pendingChangesGuard } from '../../shared/guards/pending-changes.guard';
import { RecebimentoConsultaComponent } from './recebimento-consulta/recebimento-consulta.component';
import { RecebimentoCadastroComponent } from './recebimento-cadastro/recebimento-cadastro.component';

export const recebimentoRoutes: Routes = [
  {
    path: 'recebimento',
    data: {
      modulo: EMenuPermissao.RECEBIMENTO,
    },
    children: [
      {
        path: 'consulta',
        component: RecebimentoConsultaComponent,
      },
      {
        path: 'cadastro',
        component: RecebimentoCadastroComponent,
        canDeactivate: [pendingChangesGuard],
      },
      {
        path: 'editar/:id',
        component: RecebimentoCadastroComponent,
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
