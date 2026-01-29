import { CommonModule } from '@angular/common';
import { Component, Injector } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BaseConsultaComponent } from '../../../shared/classes/base-consulta/base-consulta.component';
import { AddActionComponent } from '../../../shared/components/action-bar/add-action/add-action.component';
import { BackActionComponent } from '../../../shared/components/action-bar/back-action/back-action.component';
import { EmptyRowComponent } from '../../../shared/components/empty-row/empty-row.component';
import { FormFieldsListComponent } from '../../../shared/components/form-fields-list/form-fields-list.component';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { ProgressLoadingComponent } from '../../../shared/components/progress-loading/progress-loading/progress-loading.component';
import { EFieldType } from '../../../shared/enums/field-type.enum';
import { IFormField } from '../../../shared/interfaces/form-field.interface';
import { BoolToTextPipe } from '../../../shared/pipes/bool-to-text.pipe';
import { FormatIdPipe } from '../../../shared/pipes/format-id.pipe';
import { IProduto } from '../produto.interface';
import { ProdutoService } from '../produto.service';
import { FormatCodigoBarras } from '../../../shared/pipes/format-codigo-barras.pipe';
import { FormatRealPipe } from '../../../shared/pipes/format-real.pipe';

const actions = [BackActionComponent, AddActionComponent];
const table = [
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  EmptyRowComponent,
];
const pipes = [
  BoolToTextPipe,
  FormatIdPipe,
  FormatCodigoBarras,
  FormatRealPipe,
];
const form = [
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  ReactiveFormsModule,
  FormsModule,
  FormFieldsListComponent,
];
const imports = [
  ...actions,
  ...table,
  ...pipes,
  ...form,
  PageLayoutComponent,
  ProgressLoadingComponent,
  CommonModule,
];

@Component({
  selector: 'cl-produto-consulta',
  standalone: true,
  imports,
  templateUrl: './produto-consulta.component.html',
  styleUrl: './produto-consulta.component.scss',
})
export class ProdutoConsultaComponent extends BaseConsultaComponent<IProduto> {
  displayedColumns: string[] = [
    'id',
    'descricao',
    'precoCusto',
    'precoVenda',
    'codigoBarras',
    'acoes',
  ];

  filterFields: IFormField[] = [
    {
      type: EFieldType.INPUT,
      label: 'Código',
      formControlName: 'id',
      placeholder: 'Ex.: 10',
      class: 'grid-1',
    },
    {
      type: EFieldType.INPUT,
      label: 'Descrição',
      formControlName: 'descricao',
      placeholder: 'Ex.: Arroz',
      class: 'grid-2',
    },
    {
      type: EFieldType.INPUT,
      label: 'Preço de Custo',
      formControlName: 'precoCusto',
      placeholder: 'Ex.: 10.00',
      class: 'grid-2',
    },
    {
      type: EFieldType.INPUT,
      label: 'Preço de Venda',
      formControlName: 'precoVenda',
      placeholder: 'Ex.: 10.00',
      class: 'grid-2',
    },
    {
      type: EFieldType.INPUT,
      label: 'Código de Barras',
      formControlName: 'codigoBarras',
      placeholder: 'Ex.: 1234567890123',
      class: 'grid-2',
    },
  ];

  filterFormGroup = new FormGroup({
    id: new FormControl(null),
    descricao: new FormControl(null),
    precoCusto: new FormControl(null),
    precoVenda: new FormControl(null),
    codigoBarras: new FormControl(null),
  });

  constructor(
    private readonly _produtoService: ProdutoService,
    private readonly _injectorLocal: Injector,
  ) {
    super(_produtoService, _injectorLocal);
  }
}
