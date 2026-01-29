import { Routes } from '@angular/router';
import { EMenuPermissao } from '../../shared/enums/menu-permissao.enum';
import { pendingChangesGuard } from '../../shared/guards/pending-changes.guard';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoaConsultaComponent } from './pessoa-consulta/pessoa-consulta.component';

export const pessoaRoutes: Routes = [
  {
    path: 'pessoa',
    data: {
      modulo: EMenuPermissao.PESSOA,
    },
    children: [
      {
        path: 'consulta',
        component: PessoaConsultaComponent,
      },
      {
        path: 'cadastro',
        component: PessoaCadastroComponent,
        canDeactivate: [pendingChangesGuard],
      },
      {
        path: 'editar/:id',
        component: PessoaCadastroComponent,
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
