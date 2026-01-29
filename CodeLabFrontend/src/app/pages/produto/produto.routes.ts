import { Routes } from '@angular/router';
import { EMenuPermissao } from '../../shared/enums/menu-permissao.enum';
import { pendingChangesGuard } from '../../shared/guards/pending-changes.guard';
import { ProdutoConsultaComponent } from './produto-consulta/produto-consulta.component';
import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';

export const produtoRoutes: Routes = [
  {
    path: 'produto',
    data: {
      modulo: EMenuPermissao.PRODUTO,
    },
    children: [
      {
        path: 'consulta',
        component: ProdutoConsultaComponent,
      },
      {
        path: 'cadastro',
        component: ProdutoCadastroComponent,
        canDeactivate: [pendingChangesGuard],
      },
      {
        path: 'editar/:id',
        component: ProdutoCadastroComponent,
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
