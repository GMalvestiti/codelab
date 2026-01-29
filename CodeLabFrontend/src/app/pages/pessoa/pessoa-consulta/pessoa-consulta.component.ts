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
import { IPessoa } from '../pessoa.interface';
import { PessoaService } from '../pessoa.service';

const actions = [BackActionComponent, AddActionComponent];
const table = [
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  EmptyRowComponent,
];
const pipes = [BoolToTextPipe, FormatIdPipe];
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
  selector: 'cl-pessoa-consulta',
  standalone: true,
  imports,
  templateUrl: './pessoa-consulta.component.html',
  styleUrl: './pessoa-consulta.component.scss',
})
export class PessoaConsultaComponent extends BaseConsultaComponent<IPessoa> {
  displayedColumns: string[] = [
    'id',
    'nome',
    'documento',
    'cep',
    'endereco',
    'telefone',
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
      label: 'Nome',
      formControlName: 'nome',
      placeholder: 'Ex.: José',
      class: 'grid-2',
    },
    {
      type: EFieldType.INPUT,
      label: 'Documento',
      formControlName: 'documento',
      placeholder: 'Ex.: 123.456.789-00',
      class: 'grid-2',
    },
    {
      type: EFieldType.INPUT,
      label: 'CEP',
      formControlName: 'cep',
      placeholder: 'Ex.: 12345-678',
      class: 'grid-1',
    },
    {
      type: EFieldType.INPUT,
      label: 'Endereço',
      formControlName: 'endereco',
      placeholder: 'Ex.: Rua João Oliveira, 123',
      class: 'grid-2',
    },
    {
      type: EFieldType.INPUT,
      label: 'Telefone',
      formControlName: 'telefone',
      placeholder: 'Ex.: 199 18521516',
      class: 'grid-2',
    },
  ];

  filterFormGroup = new FormGroup({
    id: new FormControl(null),
    nome: new FormControl<string | null>(null),
    documento: new FormControl(null),
    cep: new FormControl(null),
    endereco: new FormControl(null),
    telefone: new FormControl(null),
  });

  constructor(
    private readonly _pessoaService: PessoaService,
    private readonly _injectorLocal: Injector,
  ) {
    super(_pessoaService, _injectorLocal);
  }
}
