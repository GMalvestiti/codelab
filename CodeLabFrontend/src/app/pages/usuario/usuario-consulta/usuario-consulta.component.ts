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
import { IUsuario } from '../usuario.interface';
import { UsuarioService } from '../usuario.service';

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
  selector: 'cl-usuario-consulta',
  standalone: true,
  imports,
  templateUrl: './usuario-consulta.component.html',
  styleUrl: './usuario-consulta.component.scss',
})
export class UsuarioConsultaComponent extends BaseConsultaComponent<IUsuario> {
  displayedColumns: string[] = ['id', 'nome', 'email', 'admin', 'acoes'];

  adminOptions: ILabelValue[] = [
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
      label: 'Nome',
      formControlName: 'nome',
      placeholder: 'Ex.: José',
      class: 'grid-2',
    },
    {
      type: EFieldType.INPUT,
      label: 'Email',
      formControlName: 'email',
      placeholder: 'Ex.: jose@gmail.com',
      class: 'grid-2',
    },
    {
      type: EFieldType.SELECT,
      label: 'Admin',
      formControlName: 'admin',
      placeholder: '',
      class: 'grid-1',
      options: Promise.resolve(this.adminOptions),
    },
  ];

  filterFormGroup = new FormGroup({
    id: new FormControl(null),
    nome: new FormControl(null),
    email: new FormControl(null),
    admin: new FormControl(0),
  });

  constructor(
    private readonly _usuarioService: UsuarioService,
    private readonly _injectorLocal: Injector,
  ) {
    super(_usuarioService, _injectorLocal);
  }
}
