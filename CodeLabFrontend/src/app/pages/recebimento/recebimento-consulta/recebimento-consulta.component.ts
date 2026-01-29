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
import { IContaReceber } from '../recebimento.interface';
import { RecebimentoService } from '../recebimento.service';
import { FormatRealPipe } from '../../../shared/pipes/format-real.pipe';

const actions = [BackActionComponent, AddActionComponent];
const table = [
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  EmptyRowComponent,
];
const pipes = [BoolToTextPipe, FormatIdPipe, FormatRealPipe];
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
  selector: 'cl-recebimento-consulta',
  standalone: true,
  imports,
  templateUrl: './recebimento-consulta.component.html',
  styleUrl: './recebimento-consulta.component.scss',
})
export class RecebimentoConsultaComponent extends BaseConsultaComponent<IContaReceber> {
  displayedColumns: string[] = ['id', 'pessoa', 'valorTotal', 'pago', 'acoes'];

  pagoOptions: ILabelValue[] = [
    {
      label: 'Todos',
      value: 0,
    },
    {
      label: 'Sim',
      value: true,
    },
    {
      label: 'Não',
      value: false,
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
      formControlName: 'pessoa',
      placeholder: 'Ex.: João',
      class: 'grid-2',
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
      label: 'Pago',
      formControlName: 'pago',
      placeholder: '',
      class: 'grid-1',
      options: Promise.resolve(this.pagoOptions),
    },
  ];

  filterFormGroup = new FormGroup({
    id: new FormControl(null),
    idPessoa: new FormControl(null),
    pessoa: new FormControl(null),
    idUsuarioLancamento: new FormControl(null),
    valorTotal: new FormControl(null),
    dataHora: new FormControl(null),
    pago: new FormControl(0),
  });

  constructor(
    private readonly _recebimentoService: RecebimentoService,
    private readonly _injectorLocal: Injector,
  ) {
    super(_recebimentoService, _injectorLocal);
  }
}
