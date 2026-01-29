import { CommonModule } from '@angular/common';
import { Component, Injector } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
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
import {
  IFormField,
  ILabelValue,
} from '../../../shared/interfaces/form-field.interface';
import { BoolToTextPipe } from '../../../shared/pipes/bool-to-text.pipe';
import { FormatIdPipe } from '../../../shared/pipes/format-id.pipe';
import { IVenda } from '../venda.interface';
import { VendaService } from '../venda.service';
import {
  EFormaPagamento,
  EFormaPagamentoDescricao,
} from '../../../shared/enums/forma-pagamento.enum';
import { FormatRealPipe } from '../../../shared/pipes/format-real.pipe';
import { FormatFormaPagamentoPipe } from '../../../shared/pipes/format-forma-pagamento.pipe';

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
  FormatRealPipe,
  FormatFormaPagamentoPipe,
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
  selector: 'cl-venda-consulta',
  standalone: true,
  imports,
  templateUrl: './venda-consulta.component.html',
  styleUrl: './venda-consulta.component.scss',
})
export class VendaConsultaComponent extends BaseConsultaComponent<IVenda> {
  displayedColumns: string[] = [
    'id',
    'idPessoa',
    'idUsuarioLancamento',
    'valorTotal',
    'formaPagamento',
    'dataHora',
    'acoes',
  ];

  formaPagamentoOptions: ILabelValue[] = [
    {
      label: 'Todos',
      value: 0,
    },
    {
      label: EFormaPagamentoDescricao.DINHEIRO,
      value: EFormaPagamento.DINHEIRO,
    },
    {
      label: EFormaPagamentoDescricao.CARTAO_DEBITO,
      value: EFormaPagamento.CARTAO_DEBITO,
    },
    {
      label: EFormaPagamentoDescricao.CARTAO_CREDITO,
      value: EFormaPagamento.CARTAO_CREDITO,
    },
    {
      label: EFormaPagamentoDescricao.PIX,
      value: EFormaPagamento.PIX,
    },
    {
      label: EFormaPagamentoDescricao.BOLETO,
      value: EFormaPagamento.BOLETO,
    },
    {
      label: EFormaPagamentoDescricao.CHEQUE,
      value: EFormaPagamento.CHEQUE,
    },
    {
      label: EFormaPagamentoDescricao.TRANSFERENCIA,
      value: EFormaPagamento.TRANSFERENCIA,
    },
    {
      label: EFormaPagamentoDescricao.OUTROS,
      value: EFormaPagamento.OUTROS,
    },
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
      label: 'Pessoa',
      formControlName: 'id',
      placeholder: 'Ex.: 10',
      class: 'grid-1',
    },
    {
      type: EFieldType.INPUT,
      label: 'Usuário',
      formControlName: 'id',
      placeholder: 'Ex.: 10',
      class: 'grid-1',
    },
    {
      type: EFieldType.INPUT,
      label: 'Valor Total',
      formControlName: 'valorTotal',
      placeholder: 'Ex.: 10.00',
      class: 'grid-2',
    },
    {
      type: EFieldType.SELECT,
      label: 'Forma de Pagamento',
      formControlName: 'formaPagamento',
      placeholder: 'Ex.: Dinheiro',
      class: 'grid-2',
      options: Promise.resolve(this.formaPagamentoOptions),
    },
  ];

  filterFormGroup = new FormGroup({
    id: new FormControl(null),
    idPessoa: new FormControl(null),
    idUsuarioLancamento: new FormControl(null),
    valorTotal: new FormControl(null),
    formaPagamento: new FormControl(0),
    dataHora: new FormControl(null),
  });

  constructor(
    private readonly _vendaService: VendaService,
    private readonly _injectorLocal: Injector,
  ) {
    super(_vendaService, _injectorLocal);
  }
}
